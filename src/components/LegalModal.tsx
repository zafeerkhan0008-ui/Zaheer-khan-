import React, { useState } from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';
import { SITE_CONFIG } from '@/src/config/siteConfig';

interface LegalModalProps {
  isOpen: boolean;
  initialTab?: 'terms' | 'privacy';
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  initialTab = 'terms',
  onClose
}) => {
  const [tab, setTab] = useState<'terms' | 'privacy'>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl space-y-5 max-h-[85vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg transition"
          aria-label="Close Legal Document"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setTab('terms')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
              tab === 'terms' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Terms of Service</span>
          </button>
          <button
            onClick={() => setTab('privacy')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
              tab === 'privacy' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Privacy Policy</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="overflow-y-auto text-xs text-slate-300 space-y-4 pr-2 leading-relaxed">
          {tab === 'terms' ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white mb-1">1. Scope of Independent Web Design Services</h3>
                <p>
                  ZK Web Studio provides freelance web design, frontend development, and website launch guidance for small businesses and independent professionals in India. All project scopes, timelines, deliverables, and fees are agreed upon in writing prior to commencing work.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white mb-1">2. Payment Milestones & Deliverables</h3>
                <p>
                  Unless otherwise specified in a custom written quotation, standard projects require a 50% initial advance payment to confirm the project slot and begin development. The remaining 50% milestone balance is payable upon the client reviewing and approving the staging preview, prior to final source code handover and live custom domain DNS connection.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white mb-1">3. Revision Scope & Exclusions</h3>
                <p>
                  To maintain fair schedules for all clients, Starter packages include 1 round of revisions, while Standard and Premium packages include 2 to 3 structured rounds of revisions. Revisions include adjustments to styling, typography, colors, layout order, and client-supplied text/images. Major architectural pivots or new feature additions not in the original scope are quoted separately.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white mb-1">4. Intellectual Property & Domain Ownership</h3>
                <p>
                  Upon settlement of the final payment milestone, the client retains 100% intellectual property rights to their customized website codebase, assets, and branding. The client maintains complete direct ownership of their domain name and DNS credentials. ZK Web Studio never holds domain names hostage or charges recurring proprietary release fees.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white mb-1">5. Third-Party Services & Hosting</h3>
                <p>
                  Third-party services (such as annual domain renewals from GoDaddy/Namecheap, paid Google Workspace email, payment gateway commissions, or specialized SMS gateways) are separate agreements between the client and those third parties. We do not promise 'lifetime hosting'; rather, we configure your website on reputable free-tier platforms (e.g. Cloudflare Pages) where recurring hosting costs can be legally zero under standard traffic volumes.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white mb-1">1. Information We Collect</h3>
                <p>
                  ZK Web Studio collects only the project information voluntarily submitted via our website enquiry form (such as your name, business name, phone number or WhatsApp handle, and project brief). We do not run invasive behavioral tracking scripts or sell your contact information to marketing brokers.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white mb-1">2. WhatsApp Direct Inquiry Mechanism</h3>
                <p>
                  Our project enquiry form operates by preparing your chosen project preferences into a structured, human-readable WhatsApp message string. You have full transparency over what data is sent because the message opens directly in your own WhatsApp application, and you choose whether to hit Send.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white mb-1">3. How We Use Your Information</h3>
                <p>
                  Your information is strictly used to evaluate your web design project requirements, generate a fixed quotation, and communicate with you during the development and launch phases.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white mb-1">4. Client Confidentiality</h3>
                <p>
                  Any proprietary business details, customer databases, or commercial trade materials shared with ZK Web Studio for the purpose of website development remain strictly confidential.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white mb-1">5. Contact Regarding Privacy</h3>
                <p>
                  For any questions regarding your data, you can contact us directly at <span className="text-white font-mono">{SITE_CONFIG.email}</span>.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
