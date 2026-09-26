import React, { useState } from 'react';
import { MessageCircle, Mail, Clock, MapPin, ChevronDown, ChevronUp, ArrowRight, Phone } from 'lucide-react';
import { SITE_CONFIG } from '@/src/config/siteConfig';

export const ContactSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "Why are your prices starting at ₹999? Is there any catch?",
      a: "No catches. The ₹999 plan is an introductory single-page web card designed for solo tutors, small shops, and freelancers who only need a clean online presence with a WhatsApp button and Google Map. Multi-page sites with catalogues or customized inquiry systems cost ₹1,999 to ₹4,999+. We keep prices affordable by maintaining zero corporate agency overheads and working directly with business owners."
    },
    {
      q: "Do I have to pay for a domain name and web hosting?",
      a: "For domain names: Yes. A .com or .in domain costs approximately ₹600–₹900 per year in INR, paid directly to registrars like Namecheap, GoDaddy, or Cloudflare. We guide you through purchasing it in your own name so you own 100% of your domain. For hosting: We help you deploy to Cloudflare Pages, Netlify, or Vercel, which offer robust 100% free hosting tiers with free SSL certificates and global CDN, saving you thousands every year in recurring hosting charges."
    },
    {
      q: "How many revisions are included in my project?",
      a: "Our Starter package includes 1 round of revisions, while our Standard and Premium packages include 2 to 3 structured rounds of feedback. We do not promise 'unlimited revisions' because vague promises lead to endless delays. Having structured review rounds ensures your project launches quickly and stays focused."
    },
    {
      q: "How does payment work?",
      a: "Our standard milestone structure is 50% advance to confirm your project slot and start development, and the remaining 50% upon final delivery and client approval before connecting your custom domain. Payments are accepted via UPI or direct bank transfer."
    },
    {
      q: "Can I update the website content in the future?",
      a: "Yes. All configuration files (such as contact numbers, service lists, prices, and links) are neatly separated and documented. We also provide 30 days of complimentary minor text/photo update support with our Premium packages."
    },
    {
      q: "How does WhatsApp ordering work without an expensive e-commerce store?",
      a: "When a customer browses your catalogue or food menu and clicks 'Order via WhatsApp', our system automatically formats a prefilled message containing the item name, selected size, and price. All the customer does is hit 'Send' to chat directly with +91 8960937954. You can then accept UPI/Cash-on-Delivery payment without paying 2–3% transaction commissions to third-party payment gateways."
    }
  ];

  return (
    <section id="contact" className="py-20 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">
            Get in Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
            Direct Contact & Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Have questions before requesting a project? Call or message us directly on <strong className="text-white font-mono">+91 8960937954</strong> or check our transparent answers below.
          </p>
        </div>

        {/* Contact Information Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          
          {/* Direct Phone Call Card */}
          <a
            href={SITE_CONFIG.phoneCallUrl}
            className="bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 p-5 rounded-2xl transition group"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-950/80 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-105 transition">
              <Phone className="w-5 h-5" />
            </div>
            <div className="text-xs text-slate-400 font-medium">Direct Phone Call</div>
            <div className="text-sm font-bold text-white mt-0.5 font-mono">{SITE_CONFIG.whatsappDisplay}</div>
            <div className="text-[11px] text-indigo-400 mt-2 flex items-center gap-1">
              <span>Click to Call Directly</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </a>

          {/* WhatsApp Card */}
          <a
            href={`${SITE_CONFIG.whatsappBaseUrl}?text=Hello%20ZK%20Web%20Studio%2C%20I%20have%20a%20question%20about%20a%20website%20project.`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 p-5 rounded-2xl transition group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-105 transition">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="text-xs text-slate-400 font-medium">WhatsApp Consultation</div>
            <div className="text-sm font-bold text-white mt-0.5 font-mono">{SITE_CONFIG.whatsappDisplay}</div>
            <div className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1">
              <span>Chat on WhatsApp</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </a>

          {/* Email Card */}
          <a
            href={`mailto:${SITE_CONFIG.email}?subject=Website%20Inquiry%20-%20ZK%20Web%20Studio`}
            className="bg-slate-900/60 border border-slate-800 hover:border-violet-500/50 p-5 rounded-2xl transition group"
          >
            <div className="w-10 h-10 rounded-xl bg-violet-950/80 border border-violet-500/30 text-violet-400 flex items-center justify-center mb-3 group-hover:scale-105 transition">
              <Mail className="w-5 h-5" />
            </div>
            <div className="text-xs text-slate-400 font-medium">Email Consultation</div>
            <div className="text-sm font-bold text-white mt-0.5 truncate">{SITE_CONFIG.email}</div>
            <div className="text-[11px] text-violet-400 mt-2 flex items-center gap-1">
              <span>Send an Email</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </a>

          {/* Hours Card */}
          <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-xs text-slate-400 font-medium">Working Hours (IST)</div>
            <div className="text-sm font-bold text-white mt-0.5">{SITE_CONFIG.workingHours}</div>
            <div className="text-[11px] text-slate-400 mt-2">{SITE_CONFIG.responseTime}</div>
          </div>

        </div>

        {/* FAQs Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-white font-display">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Everything you need to know about our workflow, prices in INR, and technical handoff.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="bg-slate-900/70 border border-slate-800 rounded-xl overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 text-sm font-semibold text-white hover:text-indigo-300 transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-indigo-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
