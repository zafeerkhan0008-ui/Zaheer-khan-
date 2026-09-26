import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, Clock, Tag } from 'lucide-react';
import { SITE_CONFIG, ServiceItem } from '@/src/config/siteConfig';
import { apiFetch } from '@/src/utils/apiClient';

interface ServicesSectionProps {
  onSelectService: (serviceCategory: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [services, setServices] = useState<ServiceItem[]>(SITE_CONFIG.services);

  useEffect(() => {
    const fetchContent = async () => {
      const res = await apiFetch<any>('/api/public/content');
      if (res.ok && res.data?.services && res.data.services.length > 0) {
        setServices(res.data.services);
      }
    };
    fetchContent();
  }, []);

  return (
    <section id="services" className="py-20 bg-slate-950 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">
            Tailored Web Solutions
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
            Specialized Websites Engineered for Your Industry
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Every business model has different goals. A restaurant needs an instant menu and reservation button; a coaching centre needs batch schedules and admission forms. We tailor every page to your real customer flow.
          </p>
        </div>

        {/* Services Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc: ServiceItem, idx: number) => {
            const editorialNumber = (idx + 1).toString().padStart(2, '0');

            return (
              <div
                key={svc.id}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-slate-700 transition duration-200 group"
              >
                <div className="space-y-4">
                  {/* Clean Editorial Numbering (NO mechanical comments //) */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-medium text-indigo-400 tracking-wider">
                      {editorialNumber}. {svc.category}
                    </span>
                    <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      {svc.timeline}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition font-display">
                      {svc.title}
                    </h3>
                    <p className="text-xs text-indigo-300/80 font-medium mt-0.5">
                      {svc.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {svc.description}
                  </p>

                  <div className="pt-2 text-[11px] text-slate-400">
                    <strong className="text-slate-300">Ideal for:</strong> {svc.idealFor}
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="pt-3 border-t border-slate-800/80 space-y-2">
                    <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                      Key Deliverables:
                    </div>
                    {svc.deliverables.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action & Price Guide */}
                <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider">Indicative Pricing</div>
                    <div className="text-xs font-bold text-white font-mono">{svc.priceGuide}</div>
                  </div>

                  <button
                    onClick={() => onSelectService(svc.id)}
                    className="px-3.5 py-1.5 bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white text-xs font-semibold rounded-lg transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Enquire Now</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
