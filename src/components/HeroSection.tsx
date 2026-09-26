import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, MessageCircle, Phone, Sparkles, Smartphone, ShieldCheck, Zap } from 'lucide-react';
import { SITE_CONFIG } from '@/src/config/siteConfig';
import heroImg from '@/src/assets/images/hero_web_agency_1790413955259.jpg';

interface HeroSectionProps {
  onViewWork: () => void;
  onRequestWebsite: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onViewWork, onRequestWebsite }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <section id="home" className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden">
      {/* Background glow radial accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Headline & Proposition */}
        <div className="max-w-3xl mx-auto text-center space-y-6">
          
          {/* Subtle text kicker (unboxed, no static pill) */}
          <div className="text-xs uppercase tracking-widest text-indigo-400 font-semibold flex items-center justify-center gap-2">
            <span>Independent Web Design Studio in India</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">Direct Founder Communication</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display [text-wrap:balance] leading-[1.12]">
            We Build Websites That Help Your Business Grow
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto [text-wrap:balance]">
            Affordable, ultra-fast websites designed for small businesses, coaching institutes, clothing stores, restaurants, photographers, tutors, and local service providers in India.
          </p>

          {/* Working Primary & Secondary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onRequestWebsite}
              className="w-full sm:w-auto px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-xl transition shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Request a Website</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onViewWork}
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-semibold text-sm rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>View Our Work & Demos</span>
            </button>

            <a
              href={`${SITE_CONFIG.whatsappBaseUrl}?text=Hello%20ZK%20Web%20Studio%2C%20I%20would%20like%20to%20discuss%20a%20website%20for%20my%20business.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3.5 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 font-semibold text-sm rounded-xl transition flex items-center justify-center gap-2"
              title="Chat on WhatsApp (+91 8960937954)"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp: +91 8960937954</span>
            </a>
          </div>

          {/* Clean unboxed proof metadata with typographic bullet separators */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-y-2 gap-x-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Zap className="w-3.5 h-3.5 text-indigo-400" />
              <span>Starting at ₹999</span>
            </div>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <div className="flex items-center gap-1.5 text-slate-300">
              <Smartphone className="w-3.5 h-3.5 text-indigo-400" />
              <span>100% Mobile Responsive</span>
            </div>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <div className="flex items-center gap-1.5 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-indigo-400" />
              <a href={SITE_CONFIG.phoneCallUrl} className="hover:text-white font-mono">Direct Call: {SITE_CONFIG.whatsappDisplay}</a>
            </div>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <div className="flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>100% Client Ownership</span>
            </div>
          </div>
        </div>

        {/* Marquee Visual Carrier (16:9 Showcase Frame) */}
        <div className="mt-12 lg:mt-16 max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 shadow-2xl p-2 sm:p-3">
            
            {/* Window title bar mockup */}
            <div className="flex items-center justify-between px-3 py-2 bg-slate-950/80 rounded-t-xl border-b border-slate-800/80 text-xs text-slate-400 mb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" />
                <span className="text-[11px] text-slate-400 ml-2 font-mono">zkwebstudio.com · India</span>
              </div>
              <div className="text-[11px] text-slate-400 hidden sm:block">
                Direct Contact: +91 8960937954 (IST)
              </div>
            </div>

            {/* Visual Canvas with graceful fallback */}
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center">
              {!imageError ? (
                <img
                  src={heroImg}
                  alt="ZK Web Studio workspace showing responsive web interfaces on modern displays"
                  className="w-full h-full object-cover transition-opacity duration-500"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-slate-950 via-indigo-950/30 to-slate-900 flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-display">Modern Responsive Websites</h3>
                  <p className="text-xs text-slate-400 max-w-md mt-2">
                    Engineered for high performance, seamless mobile navigation, and instant customer conversions in India.
                  </p>
                </div>
              )}

              {/* Scrim Overlay & Floating Metric Highlights */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="bg-slate-900/85 backdrop-blur-md border border-slate-700/80 px-4 py-2.5 rounded-xl shadow-lg">
                  <div className="text-[11px] text-slate-400">Average Turnaround</div>
                  <div className="text-sm font-bold text-white font-mono">48 Hours to 7 Days (IST)</div>
                </div>

                <div className="bg-slate-900/85 backdrop-blur-md border border-slate-700/80 px-4 py-2.5 rounded-xl shadow-lg">
                  <div className="text-[11px] text-slate-400">Official Contact & WhatsApp</div>
                  <div className="text-sm font-bold text-emerald-400 font-mono">+91 8960937954</div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
