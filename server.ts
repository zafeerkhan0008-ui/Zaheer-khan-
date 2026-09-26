import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const JWT_SECRET = process.env.JWT_SECRET || 'zk_studio_secure_jwt_secret_token_2026';
const DATA_FILE = path.resolve(process.cwd(), 'data', 'store.json');
const UPLOADS_DIR = path.resolve(process.cwd(), 'public', 'uploads');

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Support JSON bodies up to 10mb for image uploads
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve uploaded public assets
app.use('/uploads', express.static(UPLOADS_DIR));

// ======================== DATA TYPES ========================
export interface UserRecord {
  id: string;
  email: string;
  passwordHash: string;
  salt: string;
  name: string;
  role: 'owner' | 'admin' | 'customer';
  createdAt: string;
}

export interface EnquiryRecord {
  id: string;
  customerName: string;
  businessName: string;
  contactMethod: 'whatsapp' | 'call' | 'email';
  contactInfo: string;
  businessCategory: string;
  desiredPages: string;
  designStyle: string;
  features: string[];
  budget: string;
  deadline: string;
  projectDescription: string;
  status: 'new' | 'reviewed' | 'quoted' | 'in_progress' | 'in_review' | 'delivered' | 'completed' | 'cancelled';
  quoteAmount?: number;
  advancePaid?: number;
  balanceDue?: number;
  paymentStatus?: 'pending' | 'advance_received' | 'fully_paid';
  transactionRef?: string;
  deliveryDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioRecord {
  id: string;
  title: string;
  clientType: string;
  category: 'coaching' | 'retail' | 'restaurant' | 'business' | 'portfolio';
  tagline: string;
  description: string;
  image: string;
  tags: string[];
  features: string[];
  metrics: string;
  hasInteractiveDemo: boolean;
  demoKey?: 'zenith' | 'vogue' | 'spicecraft';
  turnaroundTime: string;
}

export interface StoreData {
  users: UserRecord[];
  enquiries: EnquiryRecord[];
  services: any[];
  pricingTiers: any[];
  portfolioProjects: PortfolioRecord[];
  settings: {
    businessName: string;
    logoText?: string;
    heroHeadline?: string;
    heroSubtitle?: string;
    phone: string;
    whatsapp: string;
    email: string;
    location: string;
    workingHours: string;
    upiId: string;
    canonicalUrl: string;
    currency: string;
    timezone: string;
  };
}

function loadStore(): StoreData {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error loading store.json:', err);
  }

  const defaultStore: StoreData = {
    users: [],
    enquiries: [],
    services: [],
    pricingTiers: [],
    portfolioProjects: [],
    settings: {
      businessName: 'ZK Web Studio',
      logoText: 'ZK Web Studio',
      heroHeadline: 'We Build Websites That Help Your Business Grow',
      heroSubtitle: 'Affordable, high-performance modern websites for small businesses, coaching centres, clothing stores, restaurants, photographers, and local service providers in India.',
      phone: '+91 8960937954',
      whatsapp: '+91 8960937954',
      email: 'contact@zkwebstudio.com',
      location: 'India (Serving clients nationwide & remotely)',
      workingHours: 'Monday – Saturday: 10:00 AM – 7:00 PM IST',
      upiId: 'zkwebstudio@upi',
      canonicalUrl: 'https://zkwebstudio.com',
      currency: 'INR (₹)',
      timezone: 'India Standard Time (IST, UTC+5:30)'
    }
  };

  saveStore(defaultStore);
  return defaultStore;
}

function saveStore(data: StoreData) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving store.json:', err);
  }
}

// ======================== AUTH & CRYPTO ========================
function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
}

function generateToken(user: { id: string; email: string; role: string }): string {
  const payload = Buffer.from(JSON.stringify({
    id: user.id,
    email: user.email,
    role: user.role,
    exp: Date.now() + 14 * 24 * 60 * 60 * 1000 // 14 days
  })).toString('base64url');

  const signature = crypto.createHmac('sha256', JWT_SECRET).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

function verifyToken(token: string): { id: string; email: string; role: string } | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    const [payloadB64, signature] = parts;
    const expectedSig = crypto.createHmac('sha256', JWT_SECRET).update(payloadB64).digest('base64url');
    if (signature !== expectedSig) return null;

    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf-8'));
    if (payload.exp && payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: 'owner' | 'admin' | 'customer';
  };
}

function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const token = authHeader.split(' ')[1];
  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({ error: 'Invalid or expired session token. Please log in again.' });
  }

  // Double-verify against persistent store for revoked roles
  const store = loadStore();
  const dbUser = store.users.find(u => u.id === payload.id);
  if (!dbUser) {
    return res.status(401).json({ error: 'User account no longer exists.' });
  }

  req.user = {
    id: dbUser.id,
    email: dbUser.email,
    role: dbUser.role
  };
  next();
}

function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  requireAuth(req, res, () => {
    if (!req.user || (req.user.role !== 'owner' && req.user.role !== 'admin')) {
      return res.status(403).json({ error: 'Access denied: Admin or Owner privileges required' });
    }
    next();
  });
}

function requireOwner(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  requireAuth(req, res, () => {
    if (!req.user || req.user.role !== 'owner') {
      return res.status(403).json({ error: 'Access denied: Sole Owner / Super Admin privileges required' });
    }
    next();
  });
}

// ======================== API ROUTES ========================

// 1. Auth Status: Tells frontend whether an owner account already exists
app.get('/api/auth/status', (_req: Request, res: Response) => {
  const store = loadStore();
  const owner = store.users.find(u => u.role === 'owner');
  res.json({
    ownerConfigured: !!owner,
    ownerEmail: owner ? owner.email : null,
    ownerName: owner ? owner.name : null,
    authBackend: 'server-jwt',
    serverTimeIST: new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'medium'
    }).format(new Date())
  });
});

// 2. Sole Owner Setup: ONLY WORKS ONCE when no owner exists in the database
const handleInitOwner = (req: Request, res: Response) => {
  const store = loadStore();
  const existingOwner = store.users.find(u => u.role === 'owner');

  if (existingOwner) {
    return res.status(403).json({
      error: 'The Sole Owner account has already been set up. Public owner registration is permanently closed.'
    });
  }

  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Full name, email address, and password are required.' });
  }

  const normalizedEmail = email.toLowerCase().trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
  }

  const salt = crypto.randomBytes(16).toString('hex');
  const passwordHash = hashPassword(password, salt);

  const newOwner: UserRecord = {
    id: `owner-${Date.now()}`,
    email: normalizedEmail,
    passwordHash,
    salt,
    name: name.trim(),
    role: 'owner', // Strictly backend-assigned!
    createdAt: new Date().toISOString()
  };

  // Remove any conflicting registration with this email
  store.users = store.users.filter(u => u.email.toLowerCase() !== normalizedEmail);
  store.users.push(newOwner);
  saveStore(store);

  const token = generateToken(newOwner);
  res.status(201).json({
    message: 'Sole Owner account successfully created with Super Admin privileges.',
    token,
    user: {
      id: newOwner.id,
      email: newOwner.email,
      name: newOwner.name,
      role: newOwner.role
    }
  });
};

app.post('/api/auth/setup-owner', handleInitOwner);
app.post('/api/auth/init-owner', handleInitOwner);

// 3. User Login
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const normalizedEmail = email.toLowerCase().trim();
  const store = loadStore();
  const user = store.users.find(u => u.email.toLowerCase() === normalizedEmail);

  if (!user) {
    const hasAnyOwner = store.users.some(u => u.role === 'owner');
    if (!hasAnyOwner) {
      return res.status(400).json({
        error: 'No Owner account has been configured yet. Please use "Create My Owner Account" to complete setup.'
      });
    }
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const testHash = hashPassword(password, user.salt);
  if (testHash !== user.passwordHash) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = generateToken(user);
  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    }
  });
});

// 4. Public Customer Registration: ALWAYS assigns 'customer' role
app.post('/api/auth/register', (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Full name, email, and password are required' });
  }

  const normalizedEmail = email.toLowerCase().trim();
  const store = loadStore();

  if (store.users.some(u => u.email.toLowerCase() === normalizedEmail)) {
    return res.status(400).json({ error: 'An account with this email already exists. Please log in.' });
  }

  const salt = crypto.randomBytes(16).toString('hex');
  const passwordHash = hashPassword(password, salt);

  const newUser: UserRecord = {
    id: `cust-${Date.now()}`,
    email: normalizedEmail,
    passwordHash,
    salt,
    name: name.trim(),
    role: 'customer', // Strictly customer!
    createdAt: new Date().toISOString()
  };

  store.users.push(newUser);
  saveStore(store);

  const token = generateToken(newUser);
  res.status(201).json({
    token,
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role
    }
  });
});

// 5. Current Authenticated Profile
app.get('/api/auth/me', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const store = loadStore();
  const user = store.users.find(u => u.id === req.user?.id);
  if (!user) {
    return res.status(404).json({ error: 'User profile not found' });
  }
  res.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    }
  });
});

// 6. Public: Submit Customer Enquiry
app.post('/api/enquiries', (req: Request, res: Response) => {
  const {
    customerName,
    businessName,
    contactMethod,
    contactInfo,
    businessCategory,
    desiredPages,
    designStyle,
    features,
    budget,
    deadline,
    projectDescription
  } = req.body;

  if (!customerName || !businessName || !contactInfo || !projectDescription) {
    return res.status(400).json({ error: 'Please provide customer name, business name, contact information, and project description.' });
  }

  const store = loadStore();
  const newEnquiry: EnquiryRecord = {
    id: `enq-${Date.now()}`,
    customerName: customerName.trim(),
    businessName: businessName.trim(),
    contactMethod: contactMethod || 'whatsapp',
    contactInfo: contactInfo.trim(),
    businessCategory: businessCategory || 'General Business',
    desiredPages: desiredPages || 'Standard Business',
    designStyle: designStyle || 'Modern Dark Navy & Violet',
    features: Array.isArray(features) ? features : [],
    budget: budget || '₹1,999 – ₹2,999',
    deadline: deadline || 'Flexible',
    projectDescription: projectDescription.trim(),
    status: 'new',
    paymentStatus: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  store.enquiries.unshift(newEnquiry);
  saveStore(store);

  res.status(201).json({
    message: 'Your enquiry has been received and logged successfully.',
    enquiry: newEnquiry
  });
});

// 7. Public: Dynamic Content (Services, Pricing, Portfolio, Settings)
app.get('/api/public/content', (_req: Request, res: Response) => {
  const store = loadStore();
  res.json({
    services: store.services,
    pricingTiers: store.pricingTiers,
    portfolioProjects: store.portfolioProjects || [],
    settings: store.settings
  });
});

// ======================== ADMIN ENDPOINTS ========================

// Enquiries List
app.get('/api/admin/enquiries', requireAdmin, (_req: Request, res: Response) => {
  const store = loadStore();
  res.json({ enquiries: store.enquiries });
});

// Update Enquiry Status & Quotations
app.put('/api/admin/enquiries/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const store = loadStore();
  const index = store.enquiries.findIndex(e => e.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Enquiry not found' });
  }

  const existing = store.enquiries[index];
  const updated: EnquiryRecord = {
    ...existing,
    ...req.body,
    id: existing.id,
    createdAt: existing.createdAt,
    updatedAt: new Date().toISOString()
  };

  store.enquiries[index] = updated;
  saveStore(store);
  res.json({ message: 'Order updated successfully', enquiry: updated });
});

// Delete Enquiry
app.delete('/api/admin/enquiries/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const store = loadStore();
  store.enquiries = store.enquiries.filter(e => e.id !== id);
  saveStore(store);
  res.json({ message: 'Enquiry deleted' });
});

// Portfolio Projects Management
app.get('/api/admin/portfolio', requireAdmin, (_req: Request, res: Response) => {
  const store = loadStore();
  res.json({ portfolioProjects: store.portfolioProjects || [] });
});

app.post('/api/admin/portfolio', requireAdmin, (req: Request, res: Response) => {
  const { title, clientType, category, tagline, description, image, tags, features, metrics, hasInteractiveDemo, demoKey, turnaroundTime } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  const store = loadStore();
  if (!store.portfolioProjects) store.portfolioProjects = [];

  const newProject: PortfolioRecord = {
    id: `proj-${Date.now()}`,
    title: title.trim(),
    clientType: clientType || 'Client Project',
    category: category || 'business',
    tagline: tagline || '',
    description: description.trim(),
    image: image || '/src/assets/images/demo_coaching_institute_1790413969016.jpg',
    tags: Array.isArray(tags) ? tags : typeof tags === 'string' ? tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
    features: Array.isArray(features) ? features : typeof features === 'string' ? features.split(',').map((f: string) => f.trim()).filter(Boolean) : [],
    metrics: metrics || '',
    hasInteractiveDemo: !!hasInteractiveDemo,
    demoKey: demoKey || undefined,
    turnaroundTime: turnaroundTime || '4 Days build time'
  };

  store.portfolioProjects.unshift(newProject);
  saveStore(store);
  res.status(201).json({ message: 'Portfolio project added successfully', project: newProject });
});

app.put('/api/admin/portfolio/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const store = loadStore();
  if (!store.portfolioProjects) store.portfolioProjects = [];

  const index = store.portfolioProjects.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: 'Project not found' });

  const existing = store.portfolioProjects[index];
  const updated: PortfolioRecord = {
    ...existing,
    ...req.body,
    id: existing.id
  };

  store.portfolioProjects[index] = updated;
  saveStore(store);
  res.json({ message: 'Project updated successfully', project: updated });
});

app.delete('/api/admin/portfolio/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const store = loadStore();
  if (!store.portfolioProjects) store.portfolioProjects = [];
  store.portfolioProjects = store.portfolioProjects.filter(p => p.id !== id);
  saveStore(store);
  res.json({ message: 'Project removed from portfolio' });
});

// Services Management
app.get('/api/admin/services', requireAdmin, (_req: Request, res: Response) => {
  const store = loadStore();
  res.json({ services: store.services });
});

app.post('/api/admin/services', requireAdmin, (req: Request, res: Response) => {
  const { title, subtitle, category, description, idealFor, deliverables, timeline, priceGuide } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  const store = loadStore();
  const newService = {
    id: `svc-${Date.now()}`,
    title: title.trim(),
    subtitle: subtitle || '',
    category: category || 'Custom Service',
    description: description.trim(),
    idealFor: idealFor || 'Growing businesses',
    deliverables: Array.isArray(deliverables) ? deliverables : typeof deliverables === 'string' ? deliverables.split('\n').filter(Boolean) : [],
    timeline: timeline || '3–5 days',
    priceGuide: priceGuide || 'Starting at ₹1,999'
  };

  store.services.push(newService);
  saveStore(store);
  res.status(201).json({ message: 'Service added successfully', service: newService });
});

app.put('/api/admin/services/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const store = loadStore();
  const index = store.services.findIndex(s => s.id === id);
  if (index === -1) return res.status(404).json({ error: 'Service not found' });

  store.services[index] = { ...store.services[index], ...req.body, id };
  saveStore(store);
  res.json({ message: 'Service updated', service: store.services[index] });
});

app.delete('/api/admin/services/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const store = loadStore();
  store.services = store.services.filter(s => s.id !== id);
  saveStore(store);
  res.json({ message: 'Service deleted' });
});

// Pricing Tiers Management
app.get('/api/admin/pricing', requireAdmin, (_req: Request, res: Response) => {
  const store = loadStore();
  res.json({ pricingTiers: store.pricingTiers });
});

app.put('/api/admin/pricing/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const store = loadStore();
  const index = store.pricingTiers.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: 'Pricing tier not found' });

  store.pricingTiers[index] = { ...store.pricingTiers[index], ...req.body, id };
  saveStore(store);
  res.json({ message: 'Pricing tier updated', tier: store.pricingTiers[index] });
});

// Business Settings Management
app.get('/api/admin/settings', requireAdmin, (_req: Request, res: Response) => {
  const store = loadStore();
  res.json({ settings: store.settings });
});

app.put('/api/admin/settings', requireAdmin, (req: Request, res: Response) => {
  const store = loadStore();
  store.settings = { ...store.settings, ...req.body };
  saveStore(store);
  res.json({ message: 'Business settings updated', settings: store.settings });
});

// Team / Sub-Admin Management (Owner Only)
app.get('/api/admin/users', requireOwner, (_req: Request, res: Response) => {
  const store = loadStore();
  const safeUsers = store.users.map(u => ({
    id: u.id,
    email: u.email,
    name: u.name,
    role: u.role,
    createdAt: u.createdAt
  }));
  res.json({ users: safeUsers });
});

app.post('/api/admin/users/role', requireOwner, (req: AuthenticatedRequest, res: Response) => {
  const { userId, newRole } = req.body;
  if (!userId || !newRole || !['admin', 'customer'].includes(newRole)) {
    return res.status(400).json({ error: 'Valid userId and role (admin or customer) required' });
  }

  const store = loadStore();
  const targetUser = store.users.find(u => u.id === userId);
  if (!targetUser) return res.status(404).json({ error: 'User not found' });

  if (targetUser.role === 'owner') {
    return res.status(403).json({ error: 'Cannot modify permissions of the Sole Owner' });
  }

  targetUser.role = newRole;
  saveStore(store);
  res.json({ message: `User role updated to ${newRole}`, user: { id: targetUser.id, role: targetUser.role } });
});

// Image Upload Endpoint (For project screenshots and logos)
app.post('/api/admin/upload-image', requireAdmin, (req: Request, res: Response) => {
  try {
    const { dataUrl, filename } = req.body;
    if (!dataUrl || !filename) {
      return res.status(400).json({ error: 'Image data and filename are required' });
    }

    const matches = dataUrl.match(/^data:image\/([a-zA-Z0-9.+]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ error: 'Invalid base64 image data URL' });
    }

    const ext = matches[1].replace('jpeg', 'jpg');
    const base64Data = matches[2];
    const safeName = `${Date.now()}_${filename.replace(/[^a-zA-Z0-9_-]/g, '')}.${ext}`;
    const filePath = path.join(UPLOADS_DIR, safeName);

    fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));

    res.json({
      message: 'Image uploaded successfully',
      url: `/uploads/${safeName}`
    });
  } catch (err: any) {
    console.error('Image upload failed:', err);
    res.status(500).json({ error: 'Failed to process image upload' });
  }
});

// ======================== API 404 & ERROR HANDLING ========================
// CRITICAL: Ensure any unhandled /api/* request returns pure JSON, NEVER HTML!
app.all('/api/*', (req: Request, res: Response) => {
  res.status(404).json({ error: `API route ${req.method} ${req.path} not found` });
});

// Express error handler for API routes
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('[API Server Error]', err);
  if (req.path.startsWith('/api/')) {
    return res.status(500).json({ error: err?.message || 'Internal Server Error' });
  }
  next(err);
});

// ======================== VITE MIDDLEWARE & SERVER START ========================
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve('dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[ZK Web Studio] Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
