import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, MessageCircle, Copy, Check, ArrowRight, Sparkles, Phone, Mail } from 'lucide-react';
import { SITE_CONFIG } from '@/src/config/siteConfig';
import { apiFetch } from '@/src/utils/apiClient';

interface EnquiryFormSectionProps {
  initialCategory?: string;
  initialPlan?: string;
}

export const EnquiryFormSection: React.FC<EnquiryFormSectionProps> = ({
  initialCategory,
  initialPlan
}) => {
  const [customerName, setCustomerName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [contactMethod, setContactMethod] = useState<'whatsapp' | 'call' | 'email'>('whatsapp');
  const [contactInfo, setContactInfo] = useState('');
  const [businessCategory, setBusinessCategory] = useState(initialCategory || 'Coaching & Tuition Centre');
  const [desiredPages, setDesiredPages] = useState('3-5 Pages (Standard Business)');
  const [designStyle, setDesignStyle] = useState('Modern Dark Navy & Violet');
  const [features, setFeatures] = useState<string[]>([
    'Direct WhatsApp Chat Button',
    'Mobile Responsive Layout',
    'Google Maps Location'
  ]);
  const [budget, setBudget] = useState(
    initialPlan === 'starter' ? '₹999 (Starter Web Card)' :
    initialPlan === 'premium' ? 'Starting at ₹4,999 (Premium Dynamic)' :
    '₹1,999 – ₹2,999 (Standard Business)'
  );
  const [deadline, setDeadline] = useState('Within 1 week');
  const [projectDescription, setProjectDescription] = useState('');

  // Form State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [generatedWhatsAppUrl, setGeneratedWhatsAppUrl] = useState('');

  // Update category / budget if prop changes
  useEffect(() => {
    if (initialCategory) {
      setBusinessCategory(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    if (initialPlan === 'starter') setBudget('₹999 (Starter Web Card)');
    else if (initialPlan === 'standard') setBudget('₹1,999 – ₹2,999 (Standard Business)');
    else if (initialPlan === 'premium') setBudget('Starting at ₹4,999 (Premium Dynamic)');
  }, [initialPlan]);

  const featureOptions = [
    'Direct WhatsApp Chat Button',
    'Mobile Responsive Layout',
    'Google Maps Location',
    'Photo / Portfolio Gallery',
    'Digital Menu / Catalogue Showcase',
    'Interactive Contact Form',
    'PDF Syllabus / Brochure Download',
    'Table or Class Booking Flow',
    'Local SEO Optimization'
  ];

  const handleToggleFeature = (feat: string) => {
    setFeatures(prev => 
      prev.includes(feat) ? prev.filter(f => f !== feat) : [...prev, feat]
    );
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!customerName.trim()) {
      errs.customerName = 'Please provide your full name.';
    }
    if (!businessName.trim()) {
      errs.businessName = 'Please enter your business or project name.';
    }
    if (!contactInfo.trim()) {
      errs.contactInfo = contactMethod === 'email' 
        ? 'Please enter a valid email address.' 
        : 'Please enter your phone/WhatsApp number.';
    } else if (contactMethod === 'email' && !/\S+@\S+\.\S+/.test(contactInfo)) {
      errs.contactInfo = 'Please enter a valid email format (e.g. name@domain.com).';
    } else if ((contactMethod === 'whatsapp' || contactMethod === 'call') && contactInfo.replace(/[^0-9]/g, '').length < 10) {
      errs.contactInfo = 'Please enter at least 10 digits for your phone number.';
    }
    if (!projectDescription.trim() || projectDescription.trim().length < 15) {
      errs.projectDescription = 'Please provide a brief description (at least 15 characters) of what you need.';
    }
    return errs;
  };

  const constructProjectSummary = () => {
    return `*New Project Enquiry — ZK Web Studio*\n\n` +
      `*Client:* ${customerName}\n` +
      `*Business Name:* ${businessName}\n` +
      `*Contact Method:* ${contactMethod.toUpperCase()} (${contactInfo})\n` +
      `*Category:* ${businessCategory}\n` +
      `*Scope / Pages:* ${desiredPages}\n` +
      `*Design Style:* ${designStyle}\n` +
      `*Approx. Budget:* ${budget}\n` +
      `*Target Deadline:* ${deadline}\n` +
      `*Selected Features:* ${features.join(', ')}\n\n` +
      `*Project Brief:* ${projectDescription}\n\n` +
      `_Sent to ZK Web Studio (+91 8960937954)_`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    // Save to server database
    try {
      await apiFetch('/api/enquiries', {
        method: 'POST',
        body: JSON.stringify({
          customerName,
          businessName,
          contactMethod,
          contactInfo,
          businessCategory,
          desiredPages,
          designStyle,
          features,
          budget,
          deadline,
          projectDescription
        })
      });
    } catch (err) {
      console.error('Failed to save enquiry to backend', err);
    } finally {
      setIsSubmitting(false);
    }

    const summary = constructProjectSummary();
    const waUrl = `${SITE_CONFIG.whatsappBaseUrl}?text=${encodeURIComponent(summary)}`;
    setGeneratedWhatsAppUrl(waUrl);
    setIsSubmitted(true);
  };

  const handleCopySummary = () => {
    const summary = constructProjectSummary();
    navigator.clipboard.writeText(summary);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 3000);
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setCustomerName('');
    setBusinessName('');
    setContactInfo('');
    setProjectDescription('');
    setErrors({});
  };

  return (
    <section id="enquiry" className="py-20 bg-slate-950 border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">
            Start Your Project
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
            Request a Website Quotation
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Fill in your project requirements below. Your enquiry is saved directly to our studio dashboard and prepared for instant connection on WhatsApp with <strong className="text-white font-mono">{SITE_CONFIG.whatsappDisplay}</strong>.
          </p>

          <div className="flex items-center justify-center gap-3 pt-1 text-xs text-slate-400">
            <span>Direct WhatsApp: <a href={SITE_CONFIG.whatsappBaseUrl} className="text-emerald-400 hover:underline font-mono">{SITE_CONFIG.whatsappDisplay}</a></span>
            <span>·</span>
            <span>Direct Phone: <a href={SITE_CONFIG.phoneCallUrl} className="text-indigo-400 hover:underline font-mono">{SITE_CONFIG.whatsappDisplay}</a></span>
          </div>
        </div>

        {/* Confirmation State Card (Only shown upon valid submission) */}
        {isSubmitted ? (
          <div className="bg-slate-900 border border-indigo-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center gap-3 text-emerald-400">
              <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-display">
                  Project Enquiry Recorded Successfully!
                </h3>
                <p className="text-xs text-slate-300">
                  Your requirements for <strong className="text-white">{businessName}</strong> have been recorded in our studio system and formatted for WhatsApp.
                </p>
              </div>
            </div>

            {/* Structured Summary Box */}
            <div className="bg-slate-950/90 rounded-xl p-4 sm:p-5 border border-slate-800 text-xs font-mono text-slate-300 space-y-1.5 whitespace-pre-line leading-relaxed max-h-60 overflow-y-auto">
              {constructProjectSummary()}
            </div>

            {/* WhatsApp Dispatch Notice */}
            <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-xl p-4 text-xs text-indigo-200 space-y-2">
              <div className="font-semibold text-white flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                Step 2 of 2: Click Below to Open WhatsApp (+91 8960937954) & Send
              </div>
              <p className="text-slate-300 leading-relaxed">
                Clicking the button opens WhatsApp with this exact summary prefilled. You simply click <strong>Send</strong> to chat directly with ZK Web Studio at <strong className="text-white font-mono">{SITE_CONFIG.whatsappDisplay}</strong>!
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <a
                href={generatedWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open WhatsApp & Send Enquiry</span>
              </a>

              <button
                onClick={handleCopySummary}
                className="w-full sm:w-auto px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
              >
                {copiedSummary ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedSummary ? 'Copied to Clipboard!' : 'Copy Summary'}</span>
              </button>

              <button
                onClick={handleResetForm}
                className="w-full sm:w-auto px-4 py-3.5 text-xs text-slate-400 hover:text-white transition cursor-pointer"
              >
                Edit Form
              </button>
            </div>
          </div>
        ) : (
          /* Real Validated Form */
          <form onSubmit={handleSubmit} className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            
            {/* Row 1: Names */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                  Your Full Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Kumar"
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                    if (errors.customerName) setErrors({ ...errors, customerName: '' });
                  }}
                  className={`w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition ${
                    errors.customerName ? 'border-rose-500 focus:ring-1 focus:ring-rose-500' : 'border-slate-800 focus:border-indigo-500'
                  }`}
                />
                {errors.customerName && (
                  <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" /> {errors.customerName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                  Business / Store / Brand Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Royal Sweets & Bakery"
                  value={businessName}
                  onChange={(e) => {
                    setBusinessName(e.target.value);
                    if (errors.businessName) setErrors({ ...errors, businessName: '' });
                  }}
                  className={`w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition ${
                    errors.businessName ? 'border-rose-500 focus:ring-1 focus:ring-rose-500' : 'border-slate-800 focus:border-indigo-500'
                  }`}
                />
                {errors.businessName && (
                  <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" /> {errors.businessName}
                  </p>
                )}
              </div>
            </div>

            {/* Row 2: Contact Method & Info */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                  Preferred Contact Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setContactMethod('whatsapp')}
                    className={`py-2 px-2 text-xs font-medium rounded-lg border transition flex items-center justify-center gap-1 cursor-pointer ${
                      contactMethod === 'whatsapp'
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                  </button>

                  <button
                    type="button"
                    onClick={() => setContactMethod('call')}
                    className={`py-2 px-2 text-xs font-medium rounded-lg border transition flex items-center justify-center gap-1 cursor-pointer ${
                      contactMethod === 'call'
                        ? 'bg-indigo-950/80 border-indigo-500 text-indigo-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Phone className="w-3.5 h-3.5" /> Call
                  </button>

                  <button
                    type="button"
                    onClick={() => setContactMethod('email')}
                    className={`py-2 px-2 text-xs font-medium rounded-lg border transition flex items-center justify-center gap-1 cursor-pointer ${
                      contactMethod === 'email'
                        ? 'bg-violet-950/80 border-violet-500 text-violet-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5" /> Email
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                  {contactMethod === 'email' ? 'Email Address' : 'Phone / WhatsApp Number'}{' '}
                  <span className="text-rose-400">*</span>
                </label>
                <input
                  type={contactMethod === 'email' ? 'email' : 'tel'}
                  placeholder={contactMethod === 'email' ? 'e.g. name@mybusiness.com' : 'e.g. 98765 43210'}
                  value={contactInfo}
                  onChange={(e) => {
                    setContactInfo(e.target.value);
                    if (errors.contactInfo) setErrors({ ...errors, contactInfo: '' });
                  }}
                  className={`w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition ${
                    errors.contactInfo ? 'border-rose-500 focus:ring-1 focus:ring-rose-500' : 'border-slate-800 focus:border-indigo-500'
                  }`}
                />
                {errors.contactInfo && (
                  <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" /> {errors.contactInfo}
                  </p>
                )}
              </div>
            </div>

            {/* Row 3: Category & Pages */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                  Business Industry / Category
                </label>
                <select
                  value={businessCategory}
                  onChange={(e) => setBusinessCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Coaching & Tuition Centre">Coaching & Tuition Centre</option>
                  <option value="Clothing Store & Boutique">Clothing Store & Fashion Boutique</option>
                  <option value="Restaurant, Café & Bakery">Restaurant, Café & Bakery</option>
                  <option value="Local Trade (Electrician, Plumber, AC)">Local Trade & Home Services</option>
                  <option value="Doctor & Healthcare Clinic">Doctor & Healthcare Clinic</option>
                  <option value="Photographer & Creative Artist">Photographer & Creative Artist</option>
                  <option value="Consultant & Corporate Agency">Consultant & Professional Services</option>
                  <option value="Other Small Business">Other Small Business</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                  Desired Number of Pages
                </label>
                <select
                  value={desiredPages}
                  onChange={(e) => setDesiredPages(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Single Page Starter (Visiting Card Presence)">Single Page Starter (Web Card)</option>
                  <option value="3-5 Pages (Standard Business)">3 to 5 Pages (Standard Business)</option>
                  <option value="6-10+ Pages (Premium Catalogue / Multi-Page)">6 to 10+ Pages (Premium / Dynamic)</option>
                  <option value="Not sure yet (Need recommendation)">Not sure yet (Need guidance)</option>
                </select>
              </div>
            </div>

            {/* Row 4: Design Style & Budget in INR */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                  Preferred Visual Style
                </label>
                <select
                  value={designStyle}
                  onChange={(e) => setDesignStyle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Modern Dark Navy & Violet">Modern Dark Navy & Violet (High Tech / Premium)</option>
                  <option value="Clean Minimalist Light">Clean Minimalist Light (Crisp, Elegant)</option>
                  <option value="Vibrant & Colorful">Vibrant & Colorful (Friendly, High Energy)</option>
                  <option value="Warm Luxury & Earthy">Warm Luxury & Earthy (Boutique, Hospitality)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                  Approximate Budget Target (INR ₹)
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="₹999 (Starter Web Card)">₹999 (Starter Web Card)</option>
                  <option value="₹1,999 – ₹2,999 (Standard Business)">₹1,999 – ₹2,999 (Standard Business)</option>
                  <option value="Starting at ₹4,999 (Premium Dynamic)">Starting at ₹4,999 (Premium Dynamic)</option>
                  <option value="Custom Scope Discussion">Custom Scope / Specific Budget Discussion</option>
                </select>
              </div>
            </div>

            {/* Row 5: Target Deadline */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                Target Launch Deadline
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {['Within 48 hours', 'Within 1 week', 'Within 2–3 weeks', 'Flexible timing'].map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setDeadline(time)}
                    className={`py-2 px-3 rounded-lg border text-center transition cursor-pointer ${
                      deadline === time
                        ? 'bg-indigo-600 text-white border-indigo-500 font-semibold'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Row 6: Features Needed (Checkboxes) */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-200">
                Key Features Required:
              </label>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {featureOptions.map((feat) => {
                  const isChecked = features.includes(feat);
                  return (
                    <button
                      key={feat}
                      type="button"
                      onClick={() => handleToggleFeature(feat)}
                      className={`text-left p-2.5 rounded-xl border text-xs flex items-center gap-2 transition cursor-pointer ${
                        isChecked
                          ? 'bg-indigo-950/60 border-indigo-500/80 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                        isChecked ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-slate-700'
                      }`}>
                        {isChecked && <Check className="w-3 h-3" />}
                      </div>
                      <span className="truncate">{feat}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Row 7: Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                Brief Project Description & Specific Goals <span className="text-rose-400">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="Tell us what your business does, reference links you like, and what you want customers to do on your website (e.g. call you, order on WhatsApp, or book a free trial)."
                value={projectDescription}
                onChange={(e) => {
                  setProjectDescription(e.target.value);
                  if (errors.projectDescription) setErrors({ ...errors, projectDescription: '' });
                }}
                className={`w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition ${
                  errors.projectDescription ? 'border-rose-500 focus:ring-1 focus:ring-rose-500' : 'border-slate-800 focus:border-indigo-500'
                }`}
              />
              {errors.projectDescription && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" /> {errors.projectDescription}
                </p>
              )}
            </div>

            {/* Transparency Note */}
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>
                Enquiries are saved directly to our studio management system. Direct founder review by ZK at +91 8960937954.
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl transition shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <span>{isSubmitting ? 'Recording Enquiry...' : 'Submit Project Enquiry & Generate Scope'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>
        )}

      </div>
    </section>
  );
};
