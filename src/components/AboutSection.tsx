import React from 'react';
import { ShieldCheck, UserCheck, Code2, Zap, HeartHandshake, CheckCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/src/config/siteConfig';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-[#0B1120] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">
            About Our Studio
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
            A Focused Independent Studio for Indian Small Businesses
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Founded by independent web designer & engineer ZK, we build clean, modern, and affordable websites without agency markups or complex retainer contracts.
          </p>
        </div>

        {/* Content Bento Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Main Story Box (Col Span 2) */}
          <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white font-display">
                Why ZK Web Studio Exists
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Most small businesses in India face two frustrating extremes when trying to get a website:
              </p>
              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="text-xs font-bold text-rose-400">Extreme 1: Bloated Agencies</div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Charge ₹25,000 to ₹50,000+ for simple websites, take months to deliver, and hand off communication to junior account managers.
                  </p>
                </div>
                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="text-xs font-bold text-rose-400">Extreme 2: Buggy Page Builders</div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Slow, bloated templates that take 8+ seconds to load on mobile phones, break easily, and lock you into hefty monthly subscription fees.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 space-y-3">
              <h4 className="text-sm font-bold text-indigo-300">
                Our Middle Way: Clean Code, Fixed Rates & Direct Partnership
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                At ZK Web Studio, you speak directly with the engineer building your site. We use lightweight modern web technologies (React, Vite, and Tailwind CSS) that load in under 1.5 seconds even on 4G mobile connections. You receive clean code, full ownership of your domain, and zero surprise bills.
              </p>
            </div>

            {/* Core Values */}
            <div className="pt-4 border-t border-slate-800 grid sm:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1">
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-indigo-400" /> 100% Honest Proof
                </div>
                <p className="text-slate-400 text-[11px]">
                  No fake testimonials or fabricated 5-star badges. What you see in our demo previews is exact code quality.
                </p>
              </div>

              <div className="space-y-1">
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-indigo-400" /> Direct Communication
                </div>
                <p className="text-slate-400 text-[11px]">
                  Direct WhatsApp access to the founder. Fast answers, clear updates, and no bureaucratic red tape.
                </p>
              </div>

              <div className="space-y-1">
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-indigo-400" /> Zero Hostage Lock-In
                </div>
                <p className="text-slate-400 text-[11px]">
                  You own your domain and complete source code. Never locked in to high recurring hosting fees.
                </p>
              </div>
            </div>
          </div>

          {/* Side Info Box */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white font-display">
                Studio Factsheet
              </h3>

              <div className="space-y-3 text-xs divide-y divide-slate-800">
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-400">Founder & Lead:</span>
                  <span className="text-white font-medium">{SITE_CONFIG.ownerName}</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-400">Location:</span>
                  <span className="text-white font-medium">{SITE_CONFIG.location}</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-400">Working Hours:</span>
                  <span className="text-white font-medium">{SITE_CONFIG.workingHours}</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-400">Turnaround:</span>
                  <span className="text-white font-medium">48h to 7 days</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-400">Tech Stack:</span>
                  <span className="text-indigo-300 font-mono">React, TS, Tailwind</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-400">Indicative Pricing:</span>
                  <span className="text-emerald-400 font-mono font-bold">₹999 – ₹4,999+</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-indigo-950/40 border border-indigo-500/20 rounded-xl space-y-1.5">
              <div className="text-xs font-bold text-indigo-300">
                Monthly Capacity Limit
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                To maintain high attention to detail and personal quality, we accept a maximum of 4 to 6 new website projects each month.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
