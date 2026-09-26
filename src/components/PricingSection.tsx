import React, { useState, useEffect } from 'react';
import { Check, X, ArrowRight, ShieldCheck, HelpCircle, AlertCircle, Info } from 'lucide-react';
import { SITE_CONFIG, PricingTier } from '@/src/config/siteConfig';
import { apiFetch } from '@/src/utils/apiClient';

interface PricingSectionProps {
  onSelectPlan: (planId: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const [activeTab, setActiveTab] = useState<'packages' | 'policies'>('packages');
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>(SITE_CONFIG.pricingTiers);

  useEffect(() => {
    const fetchContent = async () => {
      const res = await apiFetch<any>('/api/public/content');
      if (res.ok && res.data?.pricingTiers && res.data.pricingTiers.length > 0) {
        setPricingTiers(res.data.pricingTiers);
      }
    };
    fetchContent();
  }, []);

  return (
    <section id="pricing" className="py-20 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 space-y-3">
          <div className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">
            Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
            Honest, Affordable Rates for Growing Businesses
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            No agency overheads, no recurring monthly lock-ins, and no surprise charges. Compare our indicative packages below.
          </p>
        </div>

        {/* Prominent Indicative Disclaimer Notice */}
        <div className="bg-amber-950/40 border border-amber-500/30 rounded-xl p-4 mb-10 text-xs text-amber-200 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-white">Important Notice on Introductory Pricing:</span>
            <p className="text-amber-200/90 leading-relaxed">
              {SITE_CONFIG.pricingDisclaimer} Third-party services (such as domain registration fee ~₹800/yr paid directly to Namecheap/GoDaddy or optional paid business emails) are owned and paid for directly by you, ensuring you retain 100% control over your digital assets.
            </p>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {pricingTiers.map((tier: PricingTier) => (
            <div
              key={tier.id}
              className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition relative ${
                tier.popular
                  ? 'bg-slate-900 border-2 border-indigo-500 shadow-xl shadow-indigo-950/50'
                  : 'bg-slate-900/60 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-indigo-600 text-white px-3 py-1 rounded-full shadow-md">
                    {tier.badge}
                  </span>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white font-display">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {tier.shortDesc}
                  </p>
                </div>

                <div className="border-t border-b border-slate-800 py-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
                      {tier.priceDisplay}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {tier.subPrice} · Turnaround: <strong className="text-slate-300">{tier.turnaround}</strong>
                  </div>
                </div>

                {/* What's Included */}
                <div className="space-y-2.5">
                  <div className="text-xs font-semibold text-white uppercase tracking-wider">
                    What is Included:
                  </div>
                  <ul className="space-y-2">
                    {tier.included.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What is Excluded */}
                <div className="space-y-2.5 pt-2">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Not Included (Transparent Scope):
                  </div>
                  <ul className="space-y-2">
                    {tier.excluded.map((exc, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                        <X className="w-3.5 h-3.5 text-rose-400/80 shrink-0 mt-0.5" />
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-[11px] text-slate-400 pt-1">
                  <strong className="text-slate-300">Recommended for:</strong> {tier.recommendedFor}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-8">
                <button
                  onClick={() => onSelectPlan(tier.id)}
                  className={`w-full py-3 text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 cursor-pointer ${
                    tier.popular
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  <span>Select {tier.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Clear Policies Section (Revisions, Maintenance, Domain, Hosting) */}
        <div className="mt-16 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <div className="max-w-2xl mb-6">
            <h3 className="text-lg font-bold text-white font-display">
              Clear Client Policies & Work Standards
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              We believe in crystal-clear communication so you never encounter hidden surprises or false agency marketing.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {SITE_CONFIG.policies.map((pol, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-indigo-300">
                  <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>{pol.title}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {pol.summary}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
            <div>
              Have specific custom requirements or an existing website to revamp?
            </div>
            <button
              onClick={() => onSelectPlan('custom')}
              className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              Request a Custom Written Quote <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
