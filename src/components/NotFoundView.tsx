import React from 'react';
import { Home, ArrowLeft, AlertCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/src/config/siteConfig';

interface NotFoundViewProps {
  onGoHome: () => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ onGoHome }) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 bg-slate-900/60 border border-slate-800 rounded-2xl p-8">
        <div className="w-16 h-16 rounded-2xl bg-indigo-950/80 border border-indigo-500/30 text-indigo-400 mx-auto flex items-center justify-center font-mono text-xl font-bold">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white font-display">
            Page Not Found
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            The page you are looking for doesn't exist or may have been relocated. Return to the main page to explore our portfolio and services.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onGoHome}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};
