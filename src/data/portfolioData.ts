/**
 * Portfolio projects data for ZK Web Studio
 * All projects are explicitly labeled as concept/demo projects to maintain 100% honesty.
 */

import coachingImg from '@/src/assets/images/demo_coaching_institute_1790413969016.jpg';
import clothingImg from '@/src/assets/images/demo_fashion_clothing_1790413982001.jpg';
import restaurantImg from '@/src/assets/images/demo_artisan_restaurant_1790413994437.jpg';

export interface PortfolioItem {
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

export const PORTFOLIO_PROJECTS: PortfolioItem[] = [
  {
    id: "zenith-academy",
    title: "Zenith Academy",
    clientType: "Competitive Coaching Institute",
    category: "coaching",
    tagline: "High-conversion student admissions & course enquiry portal",
    description: "A comprehensive coaching institute website featuring interactive course syllabus explorer, faculty qualification credentials, upcoming batch schedules, and an instant Free Demo Class registration flow.",
    image: coachingImg,
    tags: ["React", "TypeScript", "Tailwind CSS", "WhatsApp Lead Engine"],
    features: ["Class 9-12 & NEET/JEE Modules", "Batch Schedule Viewer", "Faculty Bios & Credentials", "Interactive Free Demo Booking"],
    metrics: "Designed for 3x faster course inquiries",
    hasInteractiveDemo: true,
    demoKey: "zenith",
    turnaroundTime: "5 Days build time"
  },
  {
    id: "vogue-atelier",
    title: "VogueVibe Atelier",
    clientType: "Boutique Fashion & Ethnic Wear",
    category: "retail",
    tagline: "Mobile-first lookbook & 1-click WhatsApp checkout catalogue",
    description: "Designed for boutique apparel businesses in India who want to display their seasonal collections and allow customers to inquire and purchase individual pieces via WhatsApp without expensive payment gateways.",
    image: clothingImg,
    tags: ["Product Catalog", "Filterable Collections", "Size Guide", "WhatsApp Pre-fill"],
    features: ["Category Filtering (Festive, Casual, Saree)", "High-res Fabric Detail Modal", "Instant Pre-filled WhatsApp Order Link", "No Payment Gateway Commission"],
    metrics: "Zero cart abandonment via WhatsApp ordering",
    hasInteractiveDemo: true,
    demoKey: "vogue",
    turnaroundTime: "6 Days build time"
  },
  {
    id: "spicecraft-bistro",
    title: "SpiceCraft Bistro",
    clientType: "Artisan Indian Dining & Café",
    category: "restaurant",
    tagline: "Appetizing mobile menu & instant table booking system",
    description: "A polished restaurant website showcasing a categorized visual menu with dietary indicators (Veg/Non-veg/Spicy), today's chef specials, Google Maps navigation, and table reservation flow.",
    image: restaurantImg,
    tags: ["Categorized Menu", "Table Booking", "Google Maps Directions", "Mobile First"],
    features: ["Tabbed Digital Menu (Starters to Desserts)", "Chef Special Highlights", "Direct Table Reservation Modal", "Working Hours & Directions"],
    metrics: "Instant mobile menu access via QR code",
    hasInteractiveDemo: true,
    demoKey: "spicecraft",
    turnaroundTime: "4 Days build time"
  },
  {
    id: "apex-physio",
    title: "Apex Physio & Sports Rehab",
    clientType: "Healthcare & Physio Clinic",
    category: "business",
    tagline: "Trust-building clinic website with appointment enquiry",
    description: "Clean, professional website for a local healthcare clinic with doctor qualifications, treatment services, patient consultation fees, and emergency contact details.",
    image: coachingImg, // fallback clean image
    tags: ["Healthcare", "Clinic Services", "Appointment Form", "Local SEO"],
    features: ["Specialized Treatment Cards", "Doctor Bio & Certifications", "Patient Care FAQs", "Google Map Location Embed"],
    metrics: "Optimized for local area search rankings",
    hasInteractiveDemo: false,
    turnaroundTime: "4 Days build time"
  },
  {
    id: "shuttercraft-weddings",
    title: "ShutterCraft Visuals",
    clientType: "Candid Wedding & Portrait Studio",
    category: "portfolio",
    tagline: "High-speed photo portfolio with album galleries",
    description: "Sleek portfolio built for wedding photographers to showcase high-resolution client albums with zero lag, clear package pricing, and an event booking calendar enquiry.",
    image: clothingImg,
    tags: ["Photography", "Masonry Gallery", "Rate Card", "Direct Inquiry"],
    features: ["Fast-loading Image Grids", "Wedding / Pre-Wedding Albums", "Package Deliverables Breakdown", "Date Availability Check"],
    metrics: "Ultra-fast image loading with lazy optimization",
    hasInteractiveDemo: false,
    turnaroundTime: "3 Days build time"
  },
  {
    id: "urbanfix-services",
    title: "UrbanFix Maintenance",
    clientType: "Home Electrical & HVAC Services",
    category: "business",
    tagline: "Local trade business landing page for quick emergency calls",
    description: "High-converting single-page landing site with prominent click-to-call buttons, transparent service charge rate card, and technician coverage areas.",
    image: restaurantImg,
    tags: ["Local Services", "One-Page Starter", "Click-to-Call", "Transparent Rates"],
    features: ["Emergency 1-Hour Call Button", "Clear Pricing per Service", "Service Areas List", "Customer Assurance Checklist"],
    metrics: "90% mobile conversion focus",
    hasInteractiveDemo: false,
    turnaroundTime: "2 Days build time"
  }
];
