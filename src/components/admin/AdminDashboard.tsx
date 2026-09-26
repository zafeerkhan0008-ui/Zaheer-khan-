import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Users,
  Briefcase,
  DollarSign,
  Clock,
  Settings,
  LogOut,
  ArrowLeft,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  FileText,
  Search,
  MessageCircle,
  Phone,
  Mail,
  Calendar,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Save,
  Key,
  Image as ImageIcon,
  Upload,
  Sparkles,
  Layers
} from 'lucide-react';
import { useAuth } from '@/src/context/AuthContext';
import { formatISTDateTime, formatISTDate, formatINR } from '@/src/utils/formatters';
import { apiFetch } from '@/src/utils/apiClient';

interface AdminDashboardProps {
  onExit: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onExit }) => {
  const { user, logout, isOwner } = useAuth();
  const [activeTab, setActiveTab] = useState<'orders' | 'services' | 'pricing' | 'portfolio' | 'settings' | 'team' | 'security'>('orders');

  // Enquiries & Orders State
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<any | null>(null);

  // Edit Enquiry Modal State
  const [editEnquiryModal, setEditEnquiryModal] = useState<any | null>(null);

  // Services State
  const [services, setServices] = useState<any[]>([]);
  const [pricingTiers, setPricingTiers] = useState<any[]>([]);
  const [editingService, setEditingService] = useState<any | null>(null);
  const [isNewService, setIsNewService] = useState(false);

  // Pricing Tiers State
  const [editingPricingTier, setEditingPricingTier] = useState<any | null>(null);

  // Portfolio Projects State
  const [portfolioProjects, setPortfolioProjects] = useState<any[]>([]);
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Settings State
  const [settings, setSettings] = useState<any>({
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
  });
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Team State
  const [teamUsers, setTeamUsers] = useState<any[]>([]);

  // Clock in IST
  const [istTime, setIstTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setIstTime(
        new Intl.DateTimeFormat('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        }).format(now) + ' IST'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch all admin data using safe apiFetch
  const fetchData = async () => {
    try {
      // 1. Fetch enquiries
      const enqRes = await apiFetch<{ enquiries: any[] }>('/api/admin/enquiries');
      if (enqRes.ok && enqRes.data) {
        setEnquiries(enqRes.data.enquiries || []);
      }

      // 2. Fetch public content (services, pricing, portfolio, settings)
      const pubRes = await apiFetch<any>('/api/public/content');
      if (pubRes.ok && pubRes.data) {
        setServices(pubRes.data.services || []);
        setPricingTiers(pubRes.data.pricingTiers || []);
        setPortfolioProjects(pubRes.data.portfolioProjects || []);
        if (pubRes.data.settings) setSettings(pubRes.data.settings);
      }

      // 3. Fetch team if owner
      if (isOwner) {
        const teamRes = await apiFetch<{ users: any[] }>('/api/admin/users');
        if (teamRes.ok && teamRes.data) {
          setTeamUsers(teamRes.data.users || []);
        }
      }
    } catch (e) {
      console.error('Error fetching admin data', e);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isOwner]);

  // Order status update
  const handleUpdateOrderStatus = async (enquiryId: string, updates: Partial<any>) => {
    const res = await apiFetch<{ enquiry: any }>(`/api/admin/enquiries/${enquiryId}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });

    if (res.ok && res.data?.enquiry) {
      const updated = res.data.enquiry;
      setEnquiries(prev => prev.map(e => (e.id === enquiryId ? updated : e)));
      if (selectedEnquiry && selectedEnquiry.id === enquiryId) {
        setSelectedEnquiry(updated);
      }
      if (editEnquiryModal && editEnquiryModal.id === enquiryId) {
        setEditEnquiryModal(null);
      }
    }
  };

  const handleDeleteEnquiry = async (enquiryId: string) => {
    if (!window.confirm('Are you sure you want to delete this enquiry? This action cannot be undone.')) return;
    const res = await apiFetch(`/api/admin/enquiries/${enquiryId}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      setEnquiries(prev => prev.filter(e => e.id !== enquiryId));
      if (selectedEnquiry?.id === enquiryId) setSelectedEnquiry(null);
    }
  };

  // Service Save & Delete
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    const method = isNewService ? 'POST' : 'PUT';
    const endpoint = isNewService ? '/api/admin/services' : `/api/admin/services/${editingService.id}`;

    const res = await apiFetch<{ service: any }>(endpoint, {
      method,
      body: JSON.stringify(editingService)
    });

    if (res.ok && res.data?.service) {
      if (isNewService) {
        setServices(prev => [...prev, res.data!.service]);
      } else {
        setServices(prev => prev.map(s => (s.id === res.data!.service.id ? res.data!.service : s)));
      }
      setEditingService(null);
      setIsNewService(false);
    }
  };

  const handleDeleteService = async (serviceId: string) => {
    if (!window.confirm('Are you sure you want to delete this service package?')) return;
    const res = await apiFetch(`/api/admin/services/${serviceId}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      setServices(prev => prev.filter(s => s.id !== serviceId));
    }
  };

  // Pricing Tier Save
  const handleSavePricingTier = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPricingTier) return;

    const res = await apiFetch<{ tier: any }>(`/api/admin/pricing/${editingPricingTier.id}`, {
      method: 'PUT',
      body: JSON.stringify(editingPricingTier)
    });

    if (res.ok && res.data?.tier) {
      setPricingTiers(prev => prev.map(t => (t.id === res.data!.tier.id ? res.data!.tier : t)));
      setEditingPricingTier(null);
    }
  };

  // Portfolio Project Save & Delete & Image Upload
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    const method = isNewProject ? 'POST' : 'PUT';
    const endpoint = isNewProject ? '/api/admin/portfolio' : `/api/admin/portfolio/${editingProject.id}`;

    const res = await apiFetch<{ project: any }>(endpoint, {
      method,
      body: JSON.stringify(editingProject)
    });

    if (res.ok && res.data?.project) {
      if (isNewProject) {
        setPortfolioProjects(prev => [res.data!.project, ...prev]);
      } else {
        setPortfolioProjects(prev => prev.map(p => (p.id === res.data!.project.id ? res.data!.project : p)));
      }
      setEditingProject(null);
      setIsNewProject(false);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!window.confirm('Delete this project from your portfolio showcase?')) return;
    const res = await apiFetch(`/api/admin/portfolio/${projectId}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      setPortfolioProjects(prev => prev.filter(p => p.id !== projectId));
    }
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      const res = await apiFetch<{ url: string }>('/api/admin/upload-image', {
        method: 'POST',
        body: JSON.stringify({
          dataUrl,
          filename: file.name
        })
      });

      setUploadingImage(false);
      if (res.ok && res.data?.url) {
        setEditingProject((prev: any) => ({ ...prev, image: res.data!.url }));
      } else {
        alert(res.error || 'Failed to upload image');
      }
    };
    reader.readAsDataURL(file);
  };

  // Settings Save
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await apiFetch<{ settings: any }>('/api/admin/settings', {
      method: 'PUT',
      body: JSON.stringify(settings)
    });

    if (res.ok) {
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 3500);
    }
  };

  // Team Role update (Owner only)
  const handleUpdateRole = async (userId: string, newRole: 'admin' | 'customer') => {
    const res = await apiFetch<{ user: any }>('/api/admin/users/role', {
      method: 'POST',
      body: JSON.stringify({ userId, newRole })
    });

    if (res.ok) {
      setTeamUsers(prev => prev.map(u => (u.id === userId ? { ...u, role: newRole } : u)));
    }
  };

  // Filtered enquiries
  const filteredEnquiries = enquiries.filter(enq => {
    const matchesStatus = statusFilter === 'all' || enq.status === statusFilter;
    const matchesSearch =
      !searchQuery ||
      enq.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enq.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enq.contactInfo.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  // Financial aggregates
  const totalRevenue = enquiries.reduce((acc, curr) => acc + (curr.quoteAmount || 0), 0);
  const totalAdvance = enquiries.reduce((acc, curr) => acc + (curr.advancePaid || 0), 0);
  const totalBalanceDue = enquiries.reduce((acc, curr) => acc + (curr.balanceDue || 0), 0);
  const activeOrdersCount = enquiries.filter(e => ['new', 'reviewed', 'quoted', 'in_progress', 'in_review'].includes(e.status)).length;

  return (
    <div className="min-h-screen bg-[#070D18] text-slate-100 flex flex-col font-sans">
      
      {/* Top Admin Control Bar */}
      <header className="bg-slate-950 border-b border-slate-800 px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 shadow-xl">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-xl bg-indigo-600 text-white font-bold text-sm shadow-md shadow-indigo-600/30">
            ZK
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-base tracking-tight font-display">
                {settings.businessName || 'ZK Web Studio'}
              </span>
              <span className="text-[10px] font-semibold bg-indigo-950 text-indigo-300 border border-indigo-500/40 px-2 py-0.5 rounded-full uppercase tracking-wider">
                {user?.role === 'owner' ? 'Sole Owner / Super Admin' : 'Admin'}
              </span>
            </div>
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <span className="text-indigo-300 font-medium">{user?.name}</span>
              <span className="text-slate-600">·</span>
              <span className="font-mono text-slate-400">{user?.email}</span>
              <span className="text-slate-600">·</span>
              <span className="text-indigo-400 font-mono flex items-center gap-1">
                <Clock className="w-3 h-3" /> {istTime}
              </span>
            </div>
          </div>
        </div>

        {/* Top Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Website</span>
          </button>

          <button
            onClick={logout}
            className="px-3.5 py-1.5 bg-rose-950/70 hover:bg-rose-900 border border-rose-500/30 text-rose-300 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-slate-900/90 border-b border-slate-800 px-4 sm:px-6 py-2 flex items-center gap-2 overflow-x-auto text-xs font-medium">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
            activeTab === 'orders' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Customer Enquiries & Orders ({enquiries.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('services')}
          className={`px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
            activeTab === 'services' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Services ({services.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('pricing')}
          className={`px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
            activeTab === 'pricing' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span>Pricing Packages ({pricingTiers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('portfolio')}
          className={`px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
            activeTab === 'portfolio' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Portfolio Projects ({portfolioProjects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
            activeTab === 'settings' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Branding & Contact Settings</span>
        </button>

        {isOwner && (
          <button
            onClick={() => setActiveTab('team')}
            className={`px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'team' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Admin Accounts</span>
          </button>
        )}

        <button
          onClick={() => setActiveTab('security')}
          className={`px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
            activeTab === 'security' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Key className="w-3.5 h-3.5" />
          <span>Security Architecture</span>
        </button>
      </div>

      {/* Main Dashboard Stage */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
        
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2">
            <div className="text-xs text-slate-400 flex items-center justify-between">
              <span>Total Customer Enquiries</span>
              <Briefcase className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">{enquiries.length}</div>
            <div className="text-[11px] text-emerald-400">{activeOrdersCount} active in pipeline</div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2">
            <div className="text-xs text-slate-400 flex items-center justify-between">
              <span>Quoted Value</span>
              <DollarSign className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">{formatINR(totalRevenue)}</div>
            <div className="text-[11px] text-slate-400">Currency: INR (₹)</div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2">
            <div className="text-xs text-slate-400 flex items-center justify-between">
              <span>Advance Collected</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-emerald-400 font-mono">{formatINR(totalAdvance)}</div>
            <div className="text-[11px] text-slate-400">Received via UPI / Bank</div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2">
            <div className="text-xs text-slate-400 flex items-center justify-between">
              <span>Balance Due</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-amber-400 font-mono">{formatINR(totalBalanceDue)}</div>
            <div className="text-[11px] text-slate-400">Due upon completion</div>
          </div>
        </div>

        {/* TAB 1: Customer Enquiries & Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            
            {/* Filter and Search Bar */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto text-xs">
                {['all', 'new', 'reviewed', 'quoted', 'in_progress', 'completed'].map(status => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-lg capitalize transition cursor-pointer ${
                      statusFilter === status
                        ? 'bg-indigo-600 text-white font-semibold'
                        : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search client or business..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 text-[11px] uppercase tracking-wider font-mono">
                    <tr>
                      <th className="py-3 px-4">Client & Business</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Contact</th>
                      <th className="py-3 px-4">Budget & Quote</th>
                      <th className="py-3 px-4">Payment</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Date (IST)</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {filteredEnquiries.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-slate-400 space-y-2">
                          <Briefcase className="w-8 h-8 text-slate-600 mx-auto" />
                          <div className="text-sm font-semibold text-slate-300">No customer enquiries logged yet</div>
                          <p className="text-xs text-slate-500">
                            When potential clients submit the Project Enquiry form on your website, their genuine project brief, budget, and requirements will appear here in real-time.
                          </p>
                        </td>
                      </tr>
                    ) : (
                      filteredEnquiries.map(enq => (
                        <tr key={enq.id} className="hover:bg-slate-800/40 transition">
                          <td className="py-3 px-4">
                            <div className="font-bold text-white">{enq.customerName}</div>
                            <div className="text-[11px] text-indigo-300">{enq.businessName}</div>
                          </td>
                          <td className="py-3 px-4 text-slate-300">
                            {enq.businessCategory}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1.5">
                              {enq.contactMethod === 'whatsapp' ? (
                                <a
                                  href={`https://wa.me/${enq.contactInfo.replace(/[^0-9]/g, '')}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-emerald-400 hover:underline flex items-center gap-1"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                  <span>{enq.contactInfo}</span>
                                </a>
                              ) : enq.contactMethod === 'email' ? (
                                <a href={`mailto:${enq.contactInfo}`} className="text-violet-300 hover:underline flex items-center gap-1">
                                  <Mail className="w-3.5 h-3.5" />
                                  <span>{enq.contactInfo}</span>
                                </a>
                              ) : (
                                <a href={`tel:${enq.contactInfo}`} className="text-indigo-300 hover:underline flex items-center gap-1">
                                  <Phone className="w-3.5 h-3.5" />
                                  <span>{enq.contactInfo}</span>
                                </a>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-slate-300">{enq.budget}</div>
                            {enq.quoteAmount && (
                              <div className="text-[11px] font-bold text-emerald-400 font-mono">
                                Quoted: {formatINR(enq.quoteAmount)}
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                              enq.paymentStatus === 'fully_paid'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                                : enq.paymentStatus === 'advance_received'
                                ? 'bg-indigo-950 text-indigo-300 border border-indigo-500/30'
                                : 'bg-slate-800 text-slate-400'
                            }`}>
                              {enq.paymentStatus === 'fully_paid' ? 'Fully Paid' : enq.paymentStatus === 'advance_received' ? '50% Advance' : 'Pending'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={enq.status}
                              onChange={e => handleUpdateOrderStatus(enq.id, { status: e.target.value })}
                              className="px-2 py-1 bg-slate-950 border border-slate-700 rounded text-[11px] text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                            >
                              <option value="new">New</option>
                              <option value="reviewed">Reviewed</option>
                              <option value="quoted">Quoted</option>
                              <option value="in_progress">In Progress</option>
                              <option value="in_review">In Review</option>
                              <option value="delivered">Delivered</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">
                            {formatISTDate(enq.createdAt)}
                          </td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <button
                              onClick={() => setSelectedEnquiry(selectedEnquiry?.id === enq.id ? null : enq)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
                              title="View Full Brief"
                            >
                              <FileText className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setEditEnquiryModal({ ...enq })}
                              className="p-1.5 rounded-lg bg-indigo-950 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-900 transition"
                              title="Edit Quotation & Payments"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteEnquiry(enq.id)}
                              className="p-1.5 rounded-lg bg-rose-950 border border-rose-500/30 text-rose-300 hover:bg-rose-900 transition"
                              title="Delete Enquiry"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Expanded Detailed View for Selected Enquiry */}
            {selectedEnquiry && (
              <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Project Brief: {selectedEnquiry.businessName} ({selectedEnquiry.customerName})
                    </h3>
                    <p className="text-xs text-slate-400">
                      Submitted on {formatISTDateTime(selectedEnquiry.createdAt)}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedEnquiry(null)}
                    className="text-xs text-slate-400 hover:text-white cursor-pointer"
                  >
                    Close Brief
                  </button>
                </div>

                <div className="grid sm:grid-cols-3 gap-4 text-xs">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block mb-1">Target Scope & Pages:</span>
                    <strong className="text-white">{selectedEnquiry.desiredPages}</strong>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block mb-1">Visual Design Style:</span>
                    <strong className="text-white">{selectedEnquiry.designStyle}</strong>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block mb-1">Target Deadline:</span>
                    <strong className="text-white">{selectedEnquiry.deadline}</strong>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
                  <div className="font-semibold text-slate-300">Customer Project Description:</div>
                  <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">
                    {selectedEnquiry.projectDescription}
                  </p>
                </div>

                {selectedEnquiry.features && selectedEnquiry.features.length > 0 && (
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-slate-400">Requested Features:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedEnquiry.features.map((f: string) => (
                        <span key={f} className="text-[11px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedEnquiry.notes && (
                  <div className="p-3 bg-amber-950/40 border border-amber-500/30 rounded-xl text-xs text-amber-200">
                    <strong>Admin Internal Notes:</strong> {selectedEnquiry.notes}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Modal: Edit Quotation / Payment */}
        {editEnquiryModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 relative shadow-2xl space-y-4">
              <h3 className="text-base font-bold text-white font-display">
                Manage Quotation & Payment: {editEnquiryModal.businessName}
              </h3>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Quote Amount (INR ₹)</label>
                    <input
                      type="number"
                      value={editEnquiryModal.quoteAmount || ''}
                      onChange={e => {
                        const quote = parseFloat(e.target.value) || 0;
                        const adv = editEnquiryModal.advancePaid || 0;
                        setEditEnquiryModal({
                          ...editEnquiryModal,
                          quoteAmount: quote,
                          balanceDue: Math.max(0, quote - adv)
                        });
                      }}
                      placeholder="e.g. 2999"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Advance Paid (INR ₹)</label>
                    <input
                      type="number"
                      value={editEnquiryModal.advancePaid || ''}
                      onChange={e => {
                        const adv = parseFloat(e.target.value) || 0;
                        const quote = editEnquiryModal.quoteAmount || 0;
                        setEditEnquiryModal({
                          ...editEnquiryModal,
                          advancePaid: adv,
                          balanceDue: Math.max(0, quote - adv)
                        });
                      }}
                      placeholder="e.g. 1500"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Balance Due (INR ₹)</label>
                    <input
                      type="number"
                      disabled
                      value={editEnquiryModal.balanceDue || 0}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-amber-400 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Payment Status</label>
                    <select
                      value={editEnquiryModal.paymentStatus || 'pending'}
                      onChange={e => setEditEnquiryModal({ ...editEnquiryModal, paymentStatus: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white"
                    >
                      <option value="pending">Pending</option>
                      <option value="advance_received">Advance Received (50%)</option>
                      <option value="fully_paid">Fully Paid (100%)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Transaction Ref (UPI / Bank)</label>
                  <input
                    type="text"
                    value={editEnquiryModal.transactionRef || ''}
                    onChange={e => setEditEnquiryModal({ ...editEnquiryModal, transactionRef: e.target.value })}
                    placeholder="e.g. UPI/2026/89402941"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Agreed Delivery Date</label>
                  <input
                    type="date"
                    value={editEnquiryModal.deliveryDate || ''}
                    onChange={e => setEditEnquiryModal({ ...editEnquiryModal, deliveryDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Admin Internal Notes</label>
                  <textarea
                    rows={3}
                    value={editEnquiryModal.notes || ''}
                    onChange={e => setEditEnquiryModal({ ...editEnquiryModal, notes: e.target.value })}
                    placeholder="Private notes regarding milestones, client feedback, or scope revisions..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  onClick={() => setEditEnquiryModal(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleUpdateOrderStatus(editEnquiryModal.id, editEnquiryModal)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white rounded cursor-pointer"
                >
                  Save Quotation & Details
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Services Management */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white font-display">Manage Website Services</h3>
                <p className="text-xs text-slate-400">Add, edit, or adjust services displayed on the public site.</p>
              </div>
              <button
                onClick={() => {
                  setEditingService({
                    title: '',
                    subtitle: '',
                    category: 'Service Providers',
                    description: '',
                    idealFor: '',
                    deliverables: ['Custom responsive design', 'WhatsApp button embed'],
                    timeline: '3–5 days',
                    priceGuide: '₹1,999 – ₹2,999'
                  });
                  setIsNewService(true);
                }}
                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Service</span>
              </button>
            </div>

            {/* Services List */}
            <div className="grid md:grid-cols-2 gap-4">
              {services.map(svc => (
                <div key={svc.id} className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-indigo-400 font-semibold">{svc.category}</span>
                      <span className="text-xs font-bold text-emerald-400 font-mono">{svc.priceGuide}</span>
                    </div>
                    <h4 className="text-base font-bold text-white">{svc.title}</h4>
                    <p className="text-xs text-slate-300">{svc.description}</p>
                    <div className="text-[11px] text-slate-400"><strong>Timeline:</strong> {svc.timeline}</div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingService({ ...svc });
                        setIsNewService(false);
                      }}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 rounded flex items-center gap-1 cursor-pointer"
                    >
                      <Edit2 className="w-3 h-3" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteService(svc.id)}
                      className="px-3 py-1.5 bg-rose-950/60 hover:bg-rose-900 text-xs text-rose-300 rounded flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Edit / Add Service Modal */}
            {editingService && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                <form onSubmit={handleSaveService} className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                  <h3 className="text-base font-bold text-white font-display">
                    {isNewService ? 'Add New Service Package' : `Edit Service: ${editingService.title}`}
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Service Title *</label>
                      <input
                        type="text"
                        required
                        value={editingService.title}
                        onChange={e => setEditingService({ ...editingService, title: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Category</label>
                      <input
                        type="text"
                        value={editingService.category}
                        onChange={e => setEditingService({ ...editingService, category: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Description *</label>
                      <textarea
                        rows={3}
                        required
                        value={editingService.description}
                        onChange={e => setEditingService({ ...editingService, description: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Timeline</label>
                        <input
                          type="text"
                          value={editingService.timeline}
                          onChange={e => setEditingService({ ...editingService, timeline: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Indicative Price (INR ₹)</label>
                        <input
                          type="text"
                          value={editingService.priceGuide}
                          onChange={e => setEditingService({ ...editingService, priceGuide: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setEditingService(null)}
                      className="px-4 py-2 bg-slate-800 text-slate-300 text-xs rounded cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded cursor-pointer"
                    >
                      Save Service
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Pricing Packages Management */}
        {activeTab === 'pricing' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white font-display">Manage Website Pricing Packages</h3>
              <p className="text-xs text-slate-400">
                Update introductory packages (Starter ₹999, Standard ₹1,999–₹2,999, Premium starting at ₹4,999).
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {pricingTiers.map(tier => (
                <div key={tier.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-bold text-white">{tier.name}</h4>
                      {tier.badge && (
                        <span className="text-[10px] font-semibold bg-indigo-950 border border-indigo-500/40 text-indigo-300 px-2 py-0.5 rounded-full">
                          {tier.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-2xl font-bold text-white font-mono">{tier.priceDisplay}</div>
                    <p className="text-xs text-slate-300">{tier.shortDesc}</p>
                    <div className="text-xs text-indigo-400 font-medium">Turnaround: {tier.turnaround}</div>

                    <div className="text-xs space-y-1 pt-2 border-t border-slate-800">
                      <div className="font-semibold text-slate-400 text-[11px] uppercase">Included Features ({tier.included?.length}):</div>
                      <ul className="list-disc list-inside text-slate-300 text-[11px] space-y-0.5">
                        {tier.included?.slice(0, 3).map((inc: string, idx: number) => (
                          <li key={idx} className="truncate">{inc}</li>
                        ))}
                        {tier.included?.length > 3 && (
                          <li className="text-slate-500">+{tier.included.length - 3} more items</li>
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800">
                    <button
                      onClick={() => setEditingPricingTier({ ...tier })}
                      className="w-full py-2 bg-indigo-950 hover:bg-indigo-900 border border-indigo-500/40 text-indigo-300 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit Package & Pricing</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Edit Pricing Tier Modal */}
            {editingPricingTier && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                <form onSubmit={handleSavePricingTier} className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                  <h3 className="text-base font-bold text-white font-display">
                    Edit Package: {editingPricingTier.name}
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Package Name *</label>
                        <input
                          type="text"
                          required
                          value={editingPricingTier.name}
                          onChange={e => setEditingPricingTier({ ...editingPricingTier, name: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Price Display (INR ₹) *</label>
                        <input
                          type="text"
                          required
                          value={editingPricingTier.priceDisplay}
                          onChange={e => setEditingPricingTier({ ...editingPricingTier, priceDisplay: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Short Description *</label>
                      <textarea
                        rows={2}
                        required
                        value={editingPricingTier.shortDesc}
                        onChange={e => setEditingPricingTier({ ...editingPricingTier, shortDesc: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Estimated Turnaround</label>
                      <input
                        type="text"
                        value={editingPricingTier.turnaround}
                        onChange={e => setEditingPricingTier({ ...editingPricingTier, turnaround: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setEditingPricingTier(null)}
                      className="px-4 py-2 bg-slate-800 text-slate-300 text-xs rounded cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded cursor-pointer"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: Portfolio Projects Management */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white font-display">Manage Portfolio Projects</h3>
                <p className="text-xs text-slate-400">Add, edit, remove, and showcase real concept demo projects or client works.</p>
              </div>
              <button
                onClick={() => {
                  setEditingProject({
                    title: '',
                    clientType: 'Local Business',
                    category: 'business',
                    tagline: '',
                    description: '',
                    image: '/src/assets/images/demo_coaching_institute_1790413969016.jpg',
                    tags: ['Responsive Design', 'WhatsApp Integration'],
                    features: ['Mobile Navigation', 'Fast Loading'],
                    metrics: '',
                    hasInteractiveDemo: false,
                    turnaroundTime: '4 Days build time'
                  });
                  setIsNewProject(true);
                }}
                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Portfolio Project</span>
              </button>
            </div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {portfolioProjects.map(proj => (
                <div key={proj.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="h-44 w-full bg-slate-950 relative overflow-hidden">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover"
                        onError={(e: any) => {
                          e.target.src = '/src/assets/images/demo_coaching_institute_1790413969016.jpg';
                        }}
                      />
                      <div className="absolute top-2.5 left-2.5 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-indigo-300 border border-slate-800">
                        {proj.category}
                      </div>
                      {proj.hasInteractiveDemo && (
                        <div className="absolute top-2.5 right-2.5 bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded text-[10px] font-semibold flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          <span>Interactive Demo</span>
                        </div>
                      )}
                    </div>

                    <div className="p-4 space-y-2">
                      <div className="text-[11px] text-slate-400 font-mono">{proj.clientType}</div>
                      <h4 className="text-base font-bold text-white">{proj.title}</h4>
                      <p className="text-xs text-slate-300 line-clamp-2">{proj.description}</p>
                      <div className="text-[11px] text-indigo-400 font-medium">{proj.turnaroundTime}</div>
                    </div>
                  </div>

                  <div className="p-4 pt-0 border-t border-slate-800/80 flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingProject({ ...proj });
                        setIsNewProject(false);
                      }}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 rounded flex items-center gap-1 cursor-pointer"
                    >
                      <Edit2 className="w-3 h-3" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProject(proj.id)}
                      className="px-3 py-1.5 bg-rose-950/60 hover:bg-rose-900 text-xs text-rose-300 rounded flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Edit / Add Portfolio Project Modal */}
            {editingProject && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                <form onSubmit={handleSaveProject} className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                  <h3 className="text-base font-bold text-white font-display">
                    {isNewProject ? 'Add New Portfolio Project' : `Edit Project: ${editingProject.title}`}
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Project Title *</label>
                        <input
                          type="text"
                          required
                          value={editingProject.title}
                          onChange={e => setEditingProject({ ...editingProject, title: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Client / Business Type</label>
                        <input
                          type="text"
                          value={editingProject.clientType}
                          onChange={e => setEditingProject({ ...editingProject, clientType: e.target.value })}
                          placeholder="e.g. Competitive Coaching Institute"
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Category</label>
                        <select
                          value={editingProject.category}
                          onChange={e => setEditingProject({ ...editingProject, category: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white"
                        >
                          <option value="coaching">Coaching</option>
                          <option value="retail">Retail / Fashion</option>
                          <option value="restaurant">Restaurant & Café</option>
                          <option value="business">Business</option>
                          <option value="portfolio">Portfolio</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Turnaround Time</label>
                        <input
                          type="text"
                          value={editingProject.turnaroundTime}
                          onChange={e => setEditingProject({ ...editingProject, turnaroundTime: e.target.value })}
                          placeholder="e.g. 5 Days build time"
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Description *</label>
                      <textarea
                        rows={3}
                        required
                        value={editingProject.description}
                        onChange={e => setEditingProject({ ...editingProject, description: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white"
                      />
                    </div>

                    {/* Image URL or Upload */}
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Project Screenshot Image</label>
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={editingProject.image || ''}
                          onChange={e => setEditingProject({ ...editingProject, image: e.target.value })}
                          placeholder="/src/assets/images/... or https://..."
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white"
                        />
                        <div className="flex items-center gap-2">
                          <label className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded cursor-pointer flex items-center gap-1.5 text-xs">
                            <Upload className="w-3.5 h-3.5" />
                            <span>{uploadingImage ? 'Uploading...' : 'Upload Image File'}</span>
                            <input
                              type="file"
                              accept="image/*"
                              disabled={uploadingImage}
                              onChange={handleImageFileChange}
                              className="hidden"
                            />
                          </label>
                          <span className="text-[11px] text-slate-500">Supports PNG, JPG, WebP</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Tags (comma separated)</label>
                      <input
                        type="text"
                        value={Array.isArray(editingProject.tags) ? editingProject.tags.join(', ') : editingProject.tags || ''}
                        onChange={e => setEditingProject({ ...editingProject, tags: e.target.value.split(',').map(s => s.trim()) })}
                        placeholder="React, Tailwind, WhatsApp Lead Engine"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setEditingProject(null)}
                      className="px-4 py-2 bg-slate-800 text-slate-300 text-xs rounded cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded cursor-pointer"
                    >
                      Save Project
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: Business Branding & Settings */}
        {activeTab === 'settings' && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white font-display">Website Branding & Contact Details</h3>
              <p className="text-xs text-slate-400">
                Update the official business name, WhatsApp number, phone number, working hours, and homepage copy.
              </p>
            </div>

            {settingsSaved && (
              <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Website branding & contact details updated and saved successfully!</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-4 max-w-3xl text-xs">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Business Name</label>
                  <input
                    type="text"
                    value={settings.businessName || ''}
                    onChange={e => setSettings({ ...settings, businessName: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Header Wordmark / Logo Text</label>
                  <input
                    type="text"
                    value={settings.logoText || 'ZK Web Studio'}
                    onChange={e => setSettings({ ...settings, logoText: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Homepage Hero Headline</label>
                <input
                  type="text"
                  value={settings.heroHeadline || 'We Build Websites That Help Your Business Grow'}
                  onChange={e => setSettings({ ...settings, heroHeadline: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Homepage Hero Subtitle</label>
                <textarea
                  rows={2}
                  value={settings.heroSubtitle || ''}
                  onChange={e => setSettings({ ...settings, heroSubtitle: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Official Contact Phone (Click-to-Call)</label>
                  <input
                    type="text"
                    value={settings.phone || '+91 8960937954'}
                    onChange={e => setSettings({ ...settings, phone: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Official WhatsApp Number</label>
                  <input
                    type="text"
                    value={settings.whatsapp || '+91 8960937954'}
                    onChange={e => setSettings({ ...settings, whatsapp: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Official Email</label>
                  <input
                    type="email"
                    value={settings.email || ''}
                    onChange={e => setSettings({ ...settings, email: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Working Hours (IST)</label>
                  <input
                    type="text"
                    value={settings.workingHours || ''}
                    onChange={e => setSettings({ ...settings, workingHours: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">UPI ID (For Client Payments)</label>
                  <input
                    type="text"
                    value={settings.upiId || ''}
                    onChange={e => setSettings({ ...settings, upiId: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Location & Coverage</label>
                  <input
                    type="text"
                    value={settings.location || 'India (Serving clients nationwide & remotely)'}
                    onChange={e => setSettings({ ...settings, location: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg flex items-center gap-2 transition cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Website Settings</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 6: Admin Accounts Management (Owner only) */}
        {activeTab === 'team' && isOwner && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white font-display">Manage Team & Admin Accounts</h3>
              <p className="text-xs text-slate-400">
                As the Sole Owner, you hold exclusive Super Admin access. You can view registered users and grant or revoke sub-admin roles.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 text-[11px] uppercase font-mono">
                  <tr>
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Registered (IST)</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {teamUsers.map(u => (
                    <tr key={u.id} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-white">{u.name}</td>
                      <td className="py-3 px-4 text-slate-300 font-mono">{u.email}</td>
                      <td className="py-3 px-4">
                        <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                          u.role === 'owner'
                            ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                            : u.role === 'admin'
                            ? 'bg-indigo-950 text-indigo-300 border border-indigo-500/40'
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          {u.role === 'owner' ? 'Sole Owner / Super Admin' : u.role === 'admin' ? 'Sub-Admin' : 'Customer'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">
                        {formatISTDate(u.createdAt)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        {u.role === 'owner' ? (
                          <span className="text-[11px] text-amber-400 font-semibold">Protected Sole Owner</span>
                        ) : u.role === 'admin' ? (
                          <button
                            onClick={() => handleUpdateRole(u.id, 'customer')}
                            className="px-2.5 py-1 bg-rose-950/60 hover:bg-rose-900 border border-rose-500/30 text-rose-300 rounded text-[11px] cursor-pointer"
                          >
                            Revoke Admin
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUpdateRole(u.id, 'admin')}
                            className="px-2.5 py-1 bg-indigo-950 hover:bg-indigo-900 border border-indigo-500/30 text-indigo-300 rounded text-[11px] cursor-pointer"
                          >
                            Grant Admin
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 7: Security Architecture */}
        {activeTab === 'security' && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white font-display">
                Owner Authentication & System Security Architecture
              </h3>
              <p className="text-xs text-slate-400">
                Transparent verification of how administrative rights and backend roles are protected.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Backend Role Enforcement</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  The Sole Owner role is established during the one-time owner setup and locked in the backend database. Every administrative API route strictly verifies cryptographic HMAC tokens against the database. No frontend modification or localStorage edits can grant unauthorized access.
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Key className="w-4 h-4 text-indigo-400" />
                  <span>Public Registration Boundary</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  All public registrations through the client portal are forced to the <code className="text-slate-200 bg-slate-900 px-1 py-0.5 rounded">customer</code> role. Public owner registration is permanently disabled once initialized.
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="font-bold text-white">Current Active Sole Owner</div>
              <div className="flex items-center gap-3">
                <span className="text-slate-400">Name: <strong className="text-white">{user?.name}</strong></span>
                <span className="text-slate-400">Email: <strong className="text-indigo-300">{user?.email}</strong></span>
                <span className="text-slate-400">Role: <strong className="text-emerald-400 font-mono">owner (Super Admin)</strong></span>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
