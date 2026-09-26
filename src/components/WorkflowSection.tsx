import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '@/src/config/siteConfig';

interface WorkflowSectionProps {
  onStartEnquiry: () => void;
}

export const WorkflowSection: React.FC<WorkflowSectionProps> = ({ onStartEnquiry }) => {
  return (
    <section id="workflow" className="py-20 bg-[#0B1120] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">
            Simple 6-Step Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
            How We Work Together from Concept to Launch
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            A structured, predictable workflow designed to respect your time, protect your investment, and deliver a website you are proud of.
          </p>
        </div>

        {/* 6 Steps Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SITE_CONFIG.workflowSteps.map((step) => (
            <div
              key={step.step}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold font-mono text-indigo-400">
                    {step.step}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-indigo-500/60" />
                </div>

                <h3 className="text-base font-bold text-white font-display">
                  {step.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Transparent milestone verified</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA banner */}
        <div className="mt-12 bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-950 border border-indigo-500/20 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold text-white font-display">
              Ready to start your project with complete clarity?
            </h3>
            <p className="text-xs text-slate-300">
              Submit your enquiry in under 2 minutes. We reply with a detailed written scope and fixed quote.
            </p>
          </div>

          <button
            onClick={onStartEnquiry}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl transition flex items-center gap-2 shrink-0 cursor-pointer shadow-lg shadow-indigo-600/20"
          >
            <span>Start Step 1: Submit Enquiry</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
