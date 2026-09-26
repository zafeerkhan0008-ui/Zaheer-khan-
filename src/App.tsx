/**
 * ZK Web Studio - Main Application Component
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { PricingSection } from './components/PricingSection';
import { WorkflowSection } from './components/WorkflowSection';
import { EnquiryFormSection } from './components/EnquiryFormSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { InteractiveDemoViewer } from './components/demos/InteractiveDemoViewer';
import { DeploymentGuideModal } from './components/DeploymentGuideModal';
import { LegalModal } from './components/LegalModal';
import { NotFoundView } from './components/NotFoundView';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AuthModal } from './components/admin/AuthModal';
import { MessageCircle, Phone } from 'lucide-react';
import { SITE_CONFIG } from './config/siteConfig';

function MainApp() {
  const { user, isAdmin, isOwner, ownerConfigured } = useAuth();

  const [activeDemo, setActiveDemo] = useState<'zenith' | 'vogue' | 'spicecraft' | null>(null);
  const [isDeployGuideOpen, setIsDeployGuideOpen] = useState(false);
  const [legalModalState, setLegalModalState] = useState<{ isOpen: boolean; tab: 'terms' | 'privacy' }>({
    isOpen: false,
    tab: 'terms'
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);
  const [is404, setIs404] = useState(false);

  // Enquiry Form Pre-select State
  const [enquiryCategory, setEnquiryCategory] = useState<string>('Coaching & Tuition Centre');
  const [enquiryPlan, setEnquiryPlan] = useState<string>('standard');

  const scrollToSection = (sectionId: string) => {
    setIs404(false);
    setIsAdminView(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectService = (category: string) => {
    setEnquiryCategory(category);
    scrollToSection('enquiry');
  };

  const handleSelectPlan = (planId: string) => {
    setEnquiryPlan(planId);
    scrollToSection('enquiry');
  };

  const handleOpenDemo = (demoKey: 'zenith' | 'vogue' | 'spicecraft') => {
    setActiveDemo(demoKey);
  };

  const handleRequestSimilar = (category: string) => {
    setActiveDemo(null);
    setEnquiryCategory(category);
    scrollToSection('enquiry');
  };

  const handleOpenAdminView = () => {
    if (isAdmin) {
      setIsAdminView(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsAuthModalOpen(true);
    }
  };

  // Sync hash on URL changes
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'admin' || hash === 'dashboard') {
        if (isAdmin) {
          setIsAdminView(true);
        } else {
          setIsAuthModalOpen(true);
        }
      } else if (hash === '404') {
        setIs404(true);
      } else if (hash && document.getElementById(hash)) {
        setIs404(false);
        setIsAdminView(false);
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, [isAdmin]);

  // If Admin View is active and user is admin or owner
  if (isAdminView && isAdmin) {
    return <AdminDashboard onExit={() => setIsAdminView(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 flex flex-col selection:bg-indigo-600 selection:text-white">
      
      {/* Top Bar Navigation */}
      <Navbar
        onNavigate={scrollToSection}
        onRequestQuote={() => scrollToSection('enquiry')}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenAdmin={handleOpenAdminView}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {is404 ? (
          <NotFoundView onGoHome={() => scrollToSection('home')} />
        ) : (
          <>
            <HeroSection
              onViewWork={() => scrollToSection('portfolio')}
              onRequestWebsite={() => scrollToSection('enquiry')}
            />

            <PortfolioSection
              onOpenDemo={handleOpenDemo}
              onRequestCategory={(category) => {
                setEnquiryCategory(category);
                scrollToSection('enquiry');
              }}
            />

            <ServicesSection
              onSelectService={handleSelectService}
            />

            <PricingSection
              onSelectPlan={handleSelectPlan}
            />

            <WorkflowSection
              onStartEnquiry={() => scrollToSection('enquiry')}
            />

            <EnquiryFormSection
              initialCategory={enquiryCategory}
              initialPlan={enquiryPlan}
            />

            <AboutSection />

            <ContactSection />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={scrollToSection}
        onOpenDeployGuide={() => setIsDeployGuideOpen(true)}
        onOpenLegal={(tab) => setLegalModalState({ isOpen: true, tab })}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenAdmin={handleOpenAdminView}
      />

      {/* Interactive Demo Preview Modal */}
      <InteractiveDemoViewer
        demoKey={activeDemo}
        onClose={() => setActiveDemo(null)}
        onRequestSimilar={handleRequestSimilar}
      />

      {/* Cloudflare Pages / GitHub Zero-Cost Deployment Guide Modal */}
      <DeploymentGuideModal
        isOpen={isDeployGuideOpen}
        onClose={() => setIsDeployGuideOpen(false)}
      />

      {/* Transparent Legal / Terms & Privacy Modal */}
      <LegalModal
        isOpen={legalModalState.isOpen}
        initialTab={legalModalState.tab}
        onClose={() => setLegalModalState({ isOpen: false, tab: 'terms' })}
      />

      {/* Owner & Client Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={!ownerConfigured ? 'owner_setup' : 'login'}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {
          setIsAdminView(true);
        }}
      />

      {/* Discrete Floating WhatsApp & Call Buttons (Adheres to 15% mobile sticky height cap) */}
      <aside aria-label="Quick WhatsApp and Phone Contact" className="fixed bottom-5 right-5 z-30 flex items-center gap-2">
        <a
          href={SITE_CONFIG.phoneCallUrl}
          className="p-3 bg-slate-900 hover:bg-slate-800 text-indigo-400 border border-slate-700 rounded-full shadow-xl transition hover:scale-105"
          title="Direct Phone Call: +91 8960937954"
        >
          <Phone className="w-4 h-4" />
        </a>

        <a
          href={`${SITE_CONFIG.whatsappBaseUrl}?text=Hello%20ZK%20Web%20Studio%2C%20I%20would%20like%20to%20discuss%20a%20website%20for%20my%20business.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-full shadow-xl shadow-emerald-950/60 transition hover:scale-105"
          title="Direct WhatsApp Chat: +91 8960937954"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="hidden sm:inline">WhatsApp +91 8960937954</span>
        </a>
      </aside>

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
