import React from 'react';
import { MessageCircle, Mail, Phone, ShieldCheck, Terminal, Clock, Lock } from 'lucide-react';
import { SITE_CONFIG } from '@/src/config/siteConfig';
import { useAuth } from '@/src/context/AuthContext';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenDeployGuide: () => void;
  onOpenLegal: (tab: 'terms' | 'privacy') => void;
  onOpenAuth: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenDeployGuide,
  onOpenLegal,
  onOpenAuth,
  onOpenAdmin
}) => {
  const { user, isAdmin, isOwner, ownerConfigured } = useAuth();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-lg font-bold text-white font-display block">
              {SITE_CONFIG.name}
            </span>
            <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
              Affordable, responsive web design and frontend engineering for small businesses, coaching institutes, clothing stores, restaurants, and local services in India.
            </p>

            {/* Direct Mobile Click-to-Call and WhatsApp Links */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={SITE_CONFIG.phoneCallUrl}
                className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-indigo-300 hover:text-white hover:border-indigo-500/50 transition flex items-center gap-1.5"
                title="Call Directly"
              >
                <Phone className="w-3.5 h-3.5 text-indigo-400" />
                <span className="font-mono">Call: {SITE_CONFIG.whatsappDisplay}</span>
              </a>

              <a
                href={`${SITE_CONFIG.whatsappBaseUrl}?text=Hello%20ZK%20Web%20Studio%2C%20I%20would%20like%20to%20discuss%20a%20website%20for%20my%20business.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-emerald-400 hover:text-white hover:border-emerald-500/50 transition flex items-center gap-1.5"
                title="Chat on WhatsApp (+91 8960937954)"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="font-mono">WhatsApp: {SITE_CONFIG.whatsappDisplay}</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Navigation
            </div>
            <ul className="space-y-2 text-xs">
              {['portfolio', 'services', 'pricing', 'workflow', 'about', 'enquiry', 'contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onNavigate(item)}
                    className="hover:text-white capitalize transition cursor-pointer"
                  >
                    {item === 'enquiry' ? 'Request a Website' : item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal, Hours & Owner Access */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Transparency & Admin
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenDeployGuide}
                  className="hover:text-indigo-400 text-indigo-300 font-medium transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Free Deployment Guide</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('terms')}
                  className="hover:text-white transition cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('privacy')}
                  className="hover:text-white transition cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li className="pt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>{SITE_CONFIG.workingHours}</span>
              </li>
              <li className="pt-2 border-t border-slate-900">
                {isAdmin ? (
                  <button
                    onClick={onOpenAdmin}
                    className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{isOwner ? 'Owner Dashboard (Super Admin)' : 'Admin Dashboard'}</span>
                  </button>
                ) : !ownerConfigured ? (
                  <button
                    onClick={onOpenAuth}
                    className="text-indigo-400 hover:text-indigo-300 font-medium transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Create My Owner Account</span>
                  </button>
                ) : (
                  <button
                    onClick={onOpenAuth}
                    className="text-slate-400 hover:text-white transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5 text-slate-500" />
                    <span>Owner & Admin Portal</span>
                  </button>
                )}
              </li>
            </ul>
          </div>

        </div>

        {/* Honest Business Declaration */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>
              <strong>Authenticity Pledge:</strong> ZK Web Studio never invents fake customer reviews or fictional testimonials. Direct owner consultation via WhatsApp +91 8960937954.
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span>© {new Date().getFullYear()} {SITE_CONFIG.name}. India. All rights reserved.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
