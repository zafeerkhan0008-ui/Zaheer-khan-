import React, { useState } from 'react';
import { X, Cloud, Terminal, CheckCircle2, AlertTriangle, ExternalLink, Copy, Check, Sparkles } from 'lucide-react';

interface DeploymentGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeploymentGuideModal: React.FC<DeploymentGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg transition"
          aria-label="Close Guide"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="text-xs uppercase tracking-wider text-indigo-400 font-semibold flex items-center gap-1.5">
            <Cloud className="w-3.5 h-3.5" /> Zero-Cost Hosting Architecture
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
            How to Deploy ZK Web Studio on Cloudflare Pages
          </h2>
          <p className="text-xs text-slate-300">
            Complete production deployment instructions to host this website forever on the free tier with zero recurring hosting bills.
          </p>
        </div>

        {/* Status Distinction Callout */}
        <div className="bg-amber-950/40 border border-amber-500/30 rounded-xl p-4 text-xs space-y-2">
          <div className="font-semibold text-amber-300 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
            Distinction: Immediate Features vs External Connections
          </div>
          <ul className="text-slate-300 space-y-1 list-disc list-inside">
            <li><strong className="text-white">Works Immediately:</strong> All UI routing, interactive demos, client WhatsApp pre-filled generation, responsiveness, and sitemap.</li>
            <li><strong className="text-white">Requires External Connection:</strong> Hosting on a custom domain (e.g. <code>yourbusiness.com</code>) requires you to push this code to your own GitHub repository and link it to Cloudflare Pages.</li>
          </ul>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="space-y-5 text-xs text-slate-300">
          
          {/* Step 1 */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <div className="font-bold text-white text-sm flex items-center justify-between">
              <span>Step 1: Export & Push to Your GitHub Account</span>
              <span className="text-[11px] font-mono text-indigo-400">Git Setup</span>
            </div>
            <p className="text-slate-400">
              Initialize a new repository in your local folder or push directly from AI Studio:
            </p>
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-[11px] flex items-center justify-between text-indigo-300">
              <span>git init && git add . && git commit -m "feat: initial ZK Web Studio release"</span>
              <button
                onClick={() => copyToClipboard('git init && git add . && git commit -m "feat: initial ZK Web Studio release"', 'git1')}
                className="text-slate-400 hover:text-white p-1"
                title="Copy Command"
              >
                {copiedCode === 'git1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <div className="font-bold text-white text-sm flex items-center justify-between">
              <span>Step 2: Sign Up for Cloudflare Pages (100% Free)</span>
              <span className="text-[11px] font-mono text-emerald-400">Free Tier</span>
            </div>
            <p className="text-slate-400">
              Go to <a href="https://dash.cloudflare.com" target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline">dash.cloudflare.com</a>, navigate to <strong>Workers & Pages</strong> &gt; <strong>Create Application</strong> &gt; <strong>Pages</strong> &gt; <strong>Connect to Git</strong>.
            </p>
          </div>

          {/* Step 3 */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <div className="font-bold text-white text-sm flex items-center justify-between">
              <span>Step 3: Configure Build Settings</span>
              <span className="text-[11px] font-mono text-indigo-400">Vite Config</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="bg-slate-950 p-2 rounded border border-slate-800">
                <span className="text-slate-500">Framework Preset:</span>
                <div className="text-white font-semibold">Vite</div>
              </div>
              <div className="bg-slate-950 p-2 rounded border border-slate-800">
                <span className="text-slate-500">Build Command:</span>
                <div className="text-emerald-400 font-semibold">npm run build</div>
              </div>
              <div className="bg-slate-950 p-2 rounded border border-slate-800">
                <span className="text-slate-500">Build Output Directory:</span>
                <div className="text-emerald-400 font-semibold">dist</div>
              </div>
              <div className="bg-slate-950 p-2 rounded border border-slate-800">
                <span className="text-slate-500">Node.js Version:</span>
                <div className="text-white font-semibold">18 or 20</div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <div className="font-bold text-white text-sm flex items-center justify-between">
              <span>Step 4: Attach Custom Domain & SSL</span>
              <span className="text-[11px] font-mono text-indigo-400">DNS Setup</span>
            </div>
            <p className="text-slate-400">
              Under your Cloudflare project, click <strong>Custom Domains</strong> &gt; <strong>Set up a domain</strong>. Cloudflare will automatically provision a free universal SSL certificate and route global traffic via their edge network with zero latency.
            </p>
          </div>

          {/* Step 5 */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <div className="font-bold text-white text-sm flex items-center justify-between">
              <span>Step 5: Updating Your Contact Info</span>
              <span className="text-[11px] font-mono text-indigo-400">Customization</span>
            </div>
            <p className="text-slate-400">
              To change the studio's WhatsApp number, email, or prices for your own business, simply edit <code className="text-indigo-300 bg-slate-950 px-1 py-0.5 rounded">src/config/siteConfig.ts</code>. Every change pushed to your main branch deploys automatically within 60 seconds!
            </p>
          </div>

        </div>

        {/* Footer actions */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">Tested and validated for Vite 8 + React 19</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition"
          >
            Got It
          </button>
        </div>

      </div>
    </div>
  );
};
