import React, { useState } from 'react';
import { Monitor, Tablet, Smartphone, X, ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react';
import { ZenithCoachingDemo } from './ZenithCoachingDemo';
import { VogueClothingDemo } from './VogueClothingDemo';
import { SpiceCraftRestaurantDemo } from './SpiceCraftRestaurantDemo';

interface InteractiveDemoViewerProps {
  demoKey: 'zenith' | 'vogue' | 'spicecraft' | null;
  onClose: () => void;
  onRequestSimilar: (category: string) => void;
}

export const InteractiveDemoViewer: React.FC<InteractiveDemoViewerProps> = ({
  demoKey,
  onClose,
  onRequestSimilar
}) => {
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  if (!demoKey) return null;

  const demoMeta = {
    zenith: {
      title: 'Zenith Academy',
      type: 'Coaching Institute Demo',
      category: 'coaching',
      component: <ZenithCoachingDemo />,
      budgetRange: '₹2,499 – ₹4,999'
    },
    vogue: {
      title: 'VogueVibe Atelier',
      type: 'Clothing & Boutique Catalogue Demo',
      category: 'clothing',
      component: <VogueClothingDemo />,
      budgetRange: '₹2,999 – ₹4,999'
    },
    spicecraft: {
      title: 'SpiceCraft Bistro',
      type: 'Restaurant & Café Demo',
      category: 'restaurant',
      component: <SpiceCraftRestaurantDemo />,
      budgetRange: '₹1,999 – ₹3,499'
    }
  }[demoKey];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col">
      {/* Top Controller Bar */}
      <div className="bg-slate-950 border-b border-slate-800 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Interactive Demo</span>
          </div>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <div className="text-xs text-slate-300">
            <span className="font-bold text-white">{demoMeta.title}</span>
            <span className="hidden md:inline text-slate-400"> ({demoMeta.type})</span>
          </div>
        </div>

        {/* Viewport switch buttons */}
        <div className="flex items-center bg-slate-900 border border-slate-800 p-0.5 rounded-lg text-xs">
          <button 
            onClick={() => setViewport('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition ${viewport === 'desktop' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'}`}
            title="Full Desktop View"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>
          <button 
            onClick={() => setViewport('tablet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition ${viewport === 'tablet' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'}`}
            title="Tablet View (768px)"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tablet</span>
          </button>
          <button 
            onClick={() => setViewport('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition ${viewport === 'mobile' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'}`}
            title="Mobile View (390px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              onClose();
              onRequestSimilar(demoMeta.category);
            }}
            className="px-3.5 py-1.5 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white text-xs font-semibold rounded-lg shadow-sm transition flex items-center gap-1.5"
          >
            <span>Request Similar Website</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button 
            onClick={onClose}
            aria-label="Close demo preview"
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Honest Disclaimer Banner */}
      <div className="bg-slate-900/90 border-b border-slate-800/80 px-4 py-1.5 text-center text-[11px] text-slate-400 flex items-center justify-center gap-2">
        <ShieldCheck className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
        <span>
          <strong>Honest Business Standard:</strong> This is a working demo website created by ZK Web Studio to demonstrate speed, layout, and client conversion flow. We do not invent real clients or fake testimonials.
        </span>
      </div>

      {/* Simulated Viewport Stage */}
      <div className="flex-1 bg-slate-950 p-2 sm:p-4 overflow-auto flex items-start justify-center">
        <div 
          className={`transition-all duration-300 bg-slate-900 border border-slate-800 shadow-2xl overflow-y-auto ${
            viewport === 'desktop' ? 'w-full h-full rounded-lg' :
            viewport === 'tablet' ? 'w-[768px] h-[92vh] rounded-2xl border-4 border-slate-700' :
            'w-[390px] h-[85vh] rounded-3xl border-8 border-slate-700'
          }`}
          style={{ maxHeight: viewport === 'desktop' ? '100%' : undefined }}
        >
          {demoMeta.component}
        </div>
      </div>
    </div>
  );
};
