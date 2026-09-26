/**
 * ZK Web Studio - Central Configuration
 * All business details are fully manageable by the Owner through the Admin Dashboard.
 */

export interface PricingTier {
  id: string;
  name: string;
  priceDisplay: string;
  subPrice?: string;
  badge?: string;
  shortDesc: string;
  turnaround: string;
  included: string[];
  excluded: string[];
  recommendedFor: string;
  popular?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  idealFor: string;
  deliverables: string[];
  timeline: string;
  priceGuide: string;
}

export const SITE_CONFIG = {
  name: "ZK Web Studio",
  tagline: "We Build Websites That Help Your Business Grow",
  description: "Affordable, responsive, high-performance websites for small businesses, coaching institutes, clothing stores, restaurants, photographers, and local service providers in India.",
  ownerName: "ZK",
  country: "India",
  countryCode: "+91",
  location: "India (Serving clients nationwide & remotely)",
  
  // Public verified contact number
  phoneRaw: "+918960937954",
  phoneDigitsOnly: "918960937954",
  whatsappNumber: "+918960937954",
  whatsappDisplay: "+91 8960937954",
  phoneCallUrl: "tel:+918960937954",
  whatsappBaseUrl: "https://wa.me/918960937954",
  
  email: "contact@zkwebstudio.com",
  currency: "INR (₹)",
  timezone: "India Standard Time (IST, UTC+5:30)",
  workingHours: "Monday – Saturday: 10:00 AM – 7:00 PM IST",
  responseTime: "Within 2–4 hours during business hours (IST)",
  canonicalUrl: "https://zkwebstudio.com",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
  },
  
  pricingDisclaimer: "All prices are introductory and indicative in INR (₹). Final pricing depends on project scope, custom requirements, and a formal written quotation.",

  pricingTiers: [
    {
      id: "starter",
      name: "Starter Web Card",
      priceDisplay: "₹999",
      subPrice: "One-time indicative fee (INR)",
      shortDesc: "Clean, high-speed single-page website to give your business an instant online presence and Google visibility.",
      turnaround: "48 – 72 Hours",
      recommendedFor: "Solo tutors, local repair shops, freelance photographers, visiting card replacements.",
      popular: false,
      included: [
        "Single-page responsive layout (Mobile, Tablet, Desktop)",
        "Direct 1-Click WhatsApp Enquiry button (+91 8960937954)",
        "Click-to-Call direct phone button",
        "Google Maps business location embed",
        "About business, services list & pricing overview",
        "Photo gallery (up to 6 photos)",
        "Social media profile links",
        "Fast page load optimization (< 1.5s)",
        "Free deployment assistance on Cloudflare Pages"
      ],
      excluded: [
        "Multiple distinct sub-pages",
        "Complex dynamic forms or user logins",
        "Domain registration fee (purchased in your own name)",
        "More than 2 revision rounds"
      ]
    },
    {
      id: "standard",
      name: "Standard Business",
      priceDisplay: "₹1,999 – ₹2,999",
      subPrice: "Indicative scope-based fee (INR)",
      badge: "Most Popular",
      shortDesc: "Complete multi-page professional website built to convert visitors into phone calls and WhatsApp orders.",
      turnaround: "4 – 7 Days",
      recommendedFor: "Coaching centres, clothing stores, restaurants, clinics, consulting firms, home salons.",
      popular: true,
      included: [
        "3 to 5 custom responsive pages (Home, About, Services, Gallery/Menu, Contact)",
        "Mobile-first navigation bar & sticky contact CTA",
        "Custom enquiry form with WhatsApp/Email forwarding",
        "Digital menu / Product catalogue showcase (up to 20 items)",
        "Interactive Google Maps and Business Timings section (IST)",
        "Local SEO meta tags, OpenGraph share preview cards",
        "Fast image compression & responsive lazy-loading",
        "2 rounds of structured revisions",
        "Complete source code handover & DNS setup support"
      ],
      excluded: [
        "Automated credit card payment gateway integration",
        "Custom database login or user accounts",
        "Continuous content writing (text/photos provided by client)",
        "Domain name & third-party subscription fees"
      ]
    },
    {
      id: "premium",
      name: "Premium Dynamic",
      priceDisplay: "Starting at ₹4,999",
      subPrice: "Tailored to detailed scope (INR)",
      shortDesc: "Tailored website with product filters, advanced catalogues, downloadable brochures, and rich interactions.",
      turnaround: "7 – 14 Days",
      recommendedFor: "Growing retail stores, multi-branch coaching institutes, high-end dining, boutique hotels.",
      popular: false,
      included: [
        "6 to 10+ custom responsive pages or dynamic catalog views",
        "Interactive product catalogue with search and category filters",
        "Instant WhatsApp order generation with prefilled item details",
        "Course syllabus download / PDF brochure integration",
        "Table reservation or appointment booking modal flow",
        "Advanced SEO setup (JSON-LD Schema, Sitemap.xml, Robots.txt)",
        "Custom animations and premium visual styling",
        "3 structured rounds of revisions",
        "30-day post-launch support for text/photo adjustments"
      ],
      excluded: [
        "Complex multi-vendor marketplace engines",
        "Ongoing monthly digital ad spend management",
        "Third-party paid SMS / WhatsApp Business API charges"
      ]
    }
  ] as PricingTier[],

  services: [
    {
      id: "business",
      title: "Business & Corporate Websites",
      subtitle: "For consultants, agencies, local repairers, and service firms",
      category: "Service Providers",
      description: "Establish instant credibility with a sharp, lightning-fast website that tells clients who you are, what you solve, and how to reach you immediately.",
      idealFor: "Accountants, real estate consultants, technicians, local contractors, interior designers.",
      deliverables: ["Responsive corporate layout", "Services breakdown with pricing guide", "Trust badges & licensing info", "Contact form & Google Map location"],
      timeline: "3–6 days",
      priceGuide: "₹1,999 – ₹2,999"
    },
    {
      id: "coaching",
      title: "Coaching & Institute Portals",
      subtitle: "For private tutors, NEET/JEE institutes, schools & academies",
      category: "Education",
      description: "Showcase course curricula, faculty qualifications, batch schedules, previous year results, and capture student admission enquiries effortlessly.",
      idealFor: "Competitive exam coaching, language tutors, music academies, coding bootcamps.",
      deliverables: ["Course details & syllabus download", "Upcoming batch schedule table (IST)", "Faculty bios & verified credentials", "Demo class registration flow"],
      timeline: "5–8 days",
      priceGuide: "₹2,499 – ₹4,999"
    },
    {
      id: "restaurant",
      title: "Restaurant & Café Websites",
      subtitle: "For bistros, bakeries, cloud kitchens, and fine dining",
      category: "Food & Beverage",
      description: "A mouth-watering digital presence featuring an easy-to-read mobile menu, opening hours, chef's specials, and direct WhatsApp table reservation.",
      idealFor: "Cafes, family restaurants, bakeries, cloud kitchens, food trucks.",
      deliverables: ["Mobile-optimized categorical food menu", "Direct WhatsApp table booking link", "Dietary badges (Veg/Non-Veg/Spicy)", "Location map with directions"],
      timeline: "4–7 days",
      priceGuide: "₹1,999 – ₹3,499"
    },
    {
      id: "clothing",
      title: "Clothing & Boutique Catalogues",
      subtitle: "For fashion boutiques, ethnic wear, jewelry & apparel",
      category: "Retail & Fashion",
      description: "Display your latest lookbooks, collections, and fabric details with a clean catalogue where shoppers can click to order any outfit directly on WhatsApp.",
      idealFor: "Ethnic wear stores, designer boutiques, custom tailoring, streetwear labels.",
      deliverables: ["Filterable collection lookbook", "High-res garment image gallery", "Size charts & fabric specifications", "1-Click WhatsApp purchase button with item name"],
      timeline: "5–10 days",
      priceGuide: "₹2,999 – ₹4,999"
    },
    {
      id: "portfolio",
      title: "Portfolio Websites",
      subtitle: "For photographers, architects, creators, and freelancers",
      category: "Creative Showcase",
      description: "High-impact visual portfolios that let your craftsmanship shine without slow loading times, weird clutter, or distraction.",
      idealFor: "Wedding photographers, architects, visual artists, freelance writers.",
      deliverables: ["Fast photo/project masonry grids", "Case study breakdown view", "Equipment/skills list", "Booking & rate inquiry form"],
      timeline: "3–6 days",
      priceGuide: "₹1,999 – ₹2,999"
    },
    {
      id: "landing",
      title: "High-Conversion Landing Pages",
      subtitle: "For ad campaigns, product launches & special offers",
      category: "Direct Response",
      description: "Focused single-page destinations built specifically to turn paid ad clicks or social media traffic into qualified phone calls and leads.",
      idealFor: "Upcoming events, webinars, seasonal festival offers, new store openings.",
      deliverables: ["Compelling single-screen hero CTA", "Clear benefit breakdown", "FAQ section & objection handling", "Instant lead capture link"],
      timeline: "2–4 days",
      priceGuide: "₹999 – ₹1,999"
    }
  ] as ServiceItem[],

  workflowSteps: [
    {
      step: "01",
      title: "Submit Project Enquiry",
      desc: "Fill our simple enquiry form or message us on WhatsApp (+91 8960937954) with your business details, required pages, and reference websites you like."
    },
    {
      step: "02",
      title: "Written Scope & Quotation",
      desc: "We discuss your exact requirements and send you a transparent written proposal listing exact deliverables, fixed price in INR (₹), and deadline."
    },
    {
      step: "03",
      title: "Milestone Agreement",
      desc: "Once you approve the quotation and milestones (typically 50% advance to initiate work, 50% upon final delivery), development starts."
    },
    {
      step: "04",
      title: "Development & Live Staging",
      desc: "We build your website and provide a private live staging link where you can test everything on your own smartphone and computer."
    },
    {
      step: "05",
      title: "Feedback & Revisions Round",
      desc: "You review the staging site and request structured text, color, or photo adjustments included in your chosen package."
    },
    {
      step: "06",
      title: "Final Handover & Launch",
      desc: "After final approval and payment settlement, we connect your custom domain, optimize SEO, and hand over 100% of the project files."
    }
  ],

  policies: [
    {
      title: "Domain Ownership",
      summary: "You own 100% of your domain name. We guide you to register it in your own name on Namecheap, GoDaddy, or Cloudflare so you are never locked in."
    },
    {
      title: "Hosting & Zero-Cost Setup",
      summary: "We help deploy your site to reliable static hosting providers (such as Cloudflare Pages or Netlify) that offer generous free tiers with fast global CDN and free SSL certificates."
    },
    {
      title: "Honest Revision Policy",
      summary: "We include 2–3 structured revision rounds depending on your package. We do not make false claims of 'unlimited revisions', as professional projects require focused collaboration."
    },
    {
      title: "Third-Party & Maintenance Costs",
      summary: "External costs (e.g. domain renewal, WhatsApp Business API, payment gateway commission) are paid directly to the respective providers without any hidden markup from us."
    }
  ]
};
