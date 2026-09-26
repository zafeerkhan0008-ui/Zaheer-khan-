import React, { useState } from 'react';
import { Menu, X, ArrowRight, MessageCircle, Phone, ShieldCheck, User } from 'lucide-react';
import { SITE_CONFIG } from '@/src/config/siteConfig';
import { useAuth } from '@/src/context/AuthContext';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onRequestQuote: () => void;
  onOpenAuth: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  onRequestQuote,
  onOpenAuth,
  onOpenAdmin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAdmin, isOwner, ownerConfigured } = useAuth();

  const navLinks = [
    { label: 'Work', target: 'portfolio' },
    { label: 'Services', target: 'services' },
    { label: 'Pricing', target: 'pricing' },
    { label: 'Workflow', target: 'workflow' },
    { label: 'About', target: 'about' },
    { label: 'Contact', target: 'contact' },
  ];

  const handleLinkClick = (target: string) => {
    onNavigate(target);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0B1120]/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Single text element Brand Wordmark (Strict Top Bar Contract) */}
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); handleLinkClick('home'); }}
          className="text-lg sm:text-xl font-bold tracking-tight text-white hover:text-indigo-300 transition font-display"
        >
          {SITE_CONFIG.name}
        </a>

        {/* Zone 2: Clean 4–6 text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <button
              key={link.target}
              onClick={() => handleLinkClick(link.target)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Direct Phone Call, WhatsApp, Admin Dashboard / Auth, and Request CTA */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Clickable Mobile Phone Link */}
          <a
            href={SITE_CONFIG.phoneCallUrl}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition"
            title="Call Us Directly"
          >
            <Phone className="w-3.5 h-3.5 text-indigo-400" />
            <span className="font-mono">{SITE_CONFIG.whatsappDisplay}</span>
          </a>

          {/* Working WhatsApp Link with Correct International Format */}
          <a
            href={`${SITE_CONFIG.whatsappBaseUrl}?text=Hello%20ZK%20Web%20Studio%2C%20I%20would%20like%20to%20discuss%20a%20website%20for%20my%20business.`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-300 hover:text-emerald-400 rounded-lg hover:bg-slate-800/60 transition"
            title="Chat on WhatsApp (+91 8960937954)"
            aria-label="Direct WhatsApp Chat"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
          </a>

          {/* Admin / Owner Button or Setup Button */}
          {isAdmin ? (
            <button
              onClick={onOpenAdmin}
              className="px-2.5 py-1.5 text-xs font-semibold bg-indigo-950 border border-indigo-500/40 text-indigo-300 hover:bg-indigo-900 rounded-lg transition flex items-center gap-1 cursor-pointer"
              title="Open Admin Dashboard"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>{isOwner ? 'Owner Dashboard' : 'Admin'}</span>
            </button>
          ) : !ownerConfigured ? (
            <button
              onClick={onOpenAuth}
              className="px-2.5 py-1.5 text-xs font-semibold bg-indigo-950 border border-indigo-500/50 text-indigo-300 hover:bg-indigo-900 rounded-lg transition flex items-center gap-1.5 cursor-pointer shadow-sm shadow-indigo-600/30 animate-pulse"
              title="Click to create your Sole Owner account"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Create Owner Account</span>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition cursor-pointer"
              title="Owner & Client Login"
              aria-label="Account Login"
            >
              <User className="w-4 h-4" />
            </button>
          )}

          {/* Primary Action Button */}
          <button
            onClick={onRequestQuote}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors whitespace-nowrap shadow-sm shadow-indigo-600/30 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Request a Website</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          {/* Quick Click-to-Call on Mobile */}
          <a
            href={SITE_CONFIG.phoneCallUrl}
            className="p-2 text-indigo-400 hover:text-white"
            title="Call Us"
          >
            <Phone className="w-4 h-4" />
          </a>

          {/* Quick WhatsApp on Mobile */}
          <a
            href={`${SITE_CONFIG.whatsappBaseUrl}?text=Hello%20ZK%20Web%20Studio%2C%20I%20would%20like%20to%20discuss%20a%20website%20for%20my%20business.`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-emerald-400"
            title="WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => handleLinkClick(link.target)}
                className="text-left px-3 py-2 text-slate-200 hover:bg-slate-900 rounded-lg font-medium"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <a
              href={SITE_CONFIG.phoneCallUrl}
              className="w-full py-2.5 bg-slate-900 border border-slate-800 text-indigo-300 text-xs font-semibold rounded-lg flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call Direct: {SITE_CONFIG.whatsappDisplay}</span>
            </a>

            <a
              href={`${SITE_CONFIG.whatsappBaseUrl}?text=Hello%20ZK%20Web%20Studio%2C%20I%20would%20like%20to%20discuss%20a%20website%20for%20my%20business.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold rounded-lg flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp (+91 8960937954)</span>
            </a>

            <button
              onClick={() => { onRequestQuote(); setMobileMenuOpen(false); }}
              className="w-full py-2.5 bg-indigo-600 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2"
            >
              <span>Request a Website</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {isAdmin ? (
              <button
                onClick={() => { onOpenAdmin(); setMobileMenuOpen(false); }}
                className="w-full py-2 bg-slate-900 border border-indigo-500/40 text-indigo-300 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Open {isOwner ? 'Owner Dashboard' : 'Admin Dashboard'}</span>
              </button>
            ) : !ownerConfigured ? (
              <button
                onClick={() => { onOpenAuth(); setMobileMenuOpen(false); }}
                className="w-full py-2 bg-indigo-950 border border-indigo-500/50 text-indigo-300 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Create My Owner Account</span>
              </button>
            ) : (
              <button
                onClick={() => { onOpenAuth(); setMobileMenuOpen(false); }}
                className="w-full py-2 text-slate-400 hover:text-white text-xs font-medium cursor-pointer"
              >
                Owner & Client Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
