import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Eye, Sparkles, ShieldCheck, Check, Smartphone } from 'lucide-react';
import { PORTFOLIO_PROJECTS, PortfolioItem } from '@/src/data/portfolioData';
import { apiFetch } from '@/src/utils/apiClient';

interface PortfolioSectionProps {
  onOpenDemo: (demoKey: 'zenith' | 'vogue' | 'spicecraft') => void;
  onRequestCategory: (category: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  onOpenDemo,
  onRequestCategory
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [projects, setProjects] = useState<PortfolioItem[]>(PORTFOLIO_PROJECTS);

  useEffect(() => {
    const fetchContent = async () => {
      const res = await apiFetch<any>('/api/public/content');
      if (res.ok && res.data?.portfolioProjects && res.data.portfolioProjects.length > 0) {
        setProjects(res.data.portfolioProjects);
      }
    };
    fetchContent();
  }, []);

  const filterTabs = [
    { id: 'all', label: 'All Projects' },
    { id: 'coaching', label: 'Coaching & Education' },
    { id: 'retail', label: 'Clothing & Retail' },
    { id: 'restaurant', label: 'Restaurant & Dining' },
    { id: 'business', label: 'Business & Services' },
    { id: 'portfolio', label: 'Creative Portfolio' },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="portfolio" className="py-20 bg-[#0B1120] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 space-y-3">
          <div className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">
            Work & Capability Demos
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
            Sample Projects & Interactive Demos
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Test the live layouts, responsive navigation, and conversion features. Every demo is built with clean, production-grade code ready to be adapted for your business.
          </p>
        </div>

        {/* Honest Business Transparency Banner */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 sm:p-5 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-indigo-950 border border-indigo-500/30 text-indigo-400 shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">
                Honest Transparency Standard
              </div>
              <div className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                All sample websites below are functional concept demos engineered by ZK Web Studio to showcase real speed, layout options, and customer workflows. We never invent fake client logos or fabricate customer testimonials.
              </div>
            </div>
          </div>
          <div className="shrink-0 text-xs text-indigo-300 font-mono bg-indigo-950/60 border border-indigo-500/30 px-3 py-1.5 rounded-lg">
            100% Real Demo Code
          </div>
        </div>

        {/* Interactive Segmented Filter Controls */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project: PortfolioItem) => (
            <div
              key={project.id}
              className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition flex flex-col justify-between group"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden">
                <img
                  src={project.image}
                  alt={`${project.title} - Sample Website by ZK Web Studio`}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                {/* Concept Demo Badge (Explicitly labeled) */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="text-[11px] font-semibold bg-slate-950/85 text-indigo-300 border border-indigo-500/30 px-2.5 py-1 rounded-md backdrop-blur-sm">
                    Concept Demo Project
                  </span>
                </div>

                {project.hasInteractiveDemo && (
                  <div className="absolute top-3 right-3 z-10">
                    <span className="text-[11px] font-semibold bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded backdrop-blur-sm flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-400" /> Live Interactive
                    </span>
                  </div>
                )}

                {/* Bottom Card Title Overlay */}
                <div className="absolute bottom-3 left-3 right-3 z-10">
                  <div className="text-base font-bold text-white font-display">
                    {project.title}
                  </div>
                  <div className="text-xs text-indigo-200">
                    {project.clientType}
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-200">
                    {project.tagline}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Features list */}
                  <div className="pt-2 space-y-1.5">
                    {project.features.map((feat, i) => (
                      <div key={i} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technologies (Clean unboxed tags) */}
                  <div className="pt-3 flex flex-wrap items-center gap-1 text-[11px] text-slate-400 font-mono">
                    {project.tags.map((t, idx) => (
                      <React.Fragment key={t}>
                        <span>{t}</span>
                        {idx < project.tags.length - 1 && <span className="text-slate-600">·</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Card Action Controls */}
                <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                  {project.hasInteractiveDemo && project.demoKey ? (
                    <button
                      onClick={() => onOpenDemo(project.demoKey!)}
                      className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Launch Working Demo</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onRequestCategory(project.category)}
                      className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Request Similar Layout</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
