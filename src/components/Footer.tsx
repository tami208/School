import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Facebook, Twitter, Instagram, Linkedin, GraduationCap, CheckCircle2 } from 'lucide-react';
import { SCHOOL_INFO } from '../data';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1000);
  };

  const handleQuickLink = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-blue text-white pt-16 pb-8 border-t-4 border-brand-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: School Brand Profile */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-brand-gold text-brand-blue p-2 rounded-lg">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-xl font-extrabold tracking-tight font-display">
                SEED <span className="text-brand-gold font-normal">ACADEMY</span>
              </span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed font-sans">
              Seed Academy prepares the next cohort of critical leaders. We combine rigorous global standards with character grooming from early age.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a 
                href={SCHOOL_INFO.socials.facebook} 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 flex items-center justify-center rounded-full bg-brand-blue-light text-gray-300 hover:text-brand-gold hover:scale-110 transition duration-150"
                aria-label="Facebook link"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href={SCHOOL_INFO.socials.twitter} 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 flex items-center justify-center rounded-full bg-brand-blue-light text-gray-300 hover:text-brand-gold hover:scale-110 transition duration-150"
                aria-label="Twitter link"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href={SCHOOL_INFO.socials.instagram} 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 flex items-center justify-center rounded-full bg-brand-blue-light text-gray-300 hover:text-brand-gold hover:scale-110 transition duration-150"
                aria-label="Instagram link"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href={SCHOOL_INFO.socials.linkedin} 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 flex items-center justify-center rounded-full bg-brand-blue-light text-gray-300 hover:text-brand-gold hover:scale-110 transition duration-150"
                aria-label="LinkedIn link"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h3 className="text-brand-gold font-bold text-lg uppercase tracking-wider mb-6 font-display">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm text-gray-300 font-sans">
              <li>
                <button onClick={() => handleQuickLink('home')} className="hover:text-brand-gold hover:translate-x-1.5 transition duration-200">
                  Homepage Portal
                </button>
              </li>
              <li>
                <button onClick={() => handleQuickLink('about')} className="hover:text-brand-gold hover:translate-x-1.5 transition duration-200">
                  History & Core Values
                </button>
              </li>
              <li>
                <button onClick={() => handleQuickLink('academics')} className="hover:text-brand-gold hover:translate-x-1.5 transition duration-200">
                  Undergraduate & K-12 Syllabus
                </button>
              </li>
              <li>
                <button onClick={() => handleQuickLink('admissions')} className="hover:text-brand-gold hover:translate-x-1.5 transition duration-200">
                  Tuition Fees & Admission Forms
                </button>
              </li>
              <li>
                <button onClick={() => handleQuickLink('student-life')} className="hover:text-brand-gold hover:translate-x-1.5 transition duration-200">
                  Clubs, Sports & Activity Gallery
                </button>
              </li>
              <li>
                <button onClick={() => handleQuickLink('contact')} className="hover:text-brand-gold hover:translate-x-1.5 transition duration-200">
                  Contact Office & Help Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Channels */}
          <div>
            <h3 className="text-brand-gold font-bold text-lg uppercase tracking-wider mb-6 font-display">
              Contact Desk
            </h3>
            <ul className="space-y-4 text-sm text-gray-300 font-sans">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <span>{SCHOOL_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-gold shrink-0" />
                <span>{SCHOOL_INFO.generalPhone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-gold shrink-0" />
                <a href={`mailto:${SCHOOL_INFO.inquiryEmail}`} className="hover:text-brand-gold transition">
                  {SCHOOL_INFO.inquiryEmail}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Subscription */}
          <div>
            <h3 className="text-brand-gold font-bold text-lg uppercase tracking-wider mb-6 font-display">
              Newsletter
            </h3>
            <p className="text-sm text-gray-300 mb-4 leading-relaxed font-sans">
              Get weekly educational advice, sports tournament match highlights, and admission slot notifications.
            </p>
            {status === 'success' ? (
              <div className="bg-emerald-800/40 border border-emerald-500/50 p-4 rounded-lg flex items-start gap-2.5 text-xs text-emerald-200 animate-in fade-in duration-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-white">Successfully Subscribed!</span>
                  Welcome to Goldbridge Dispatch list.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your primary email address"
                    className="w-full bg-brand-blue-light hover:bg-brand-blue-light/85 border border-brand-blue-light focus:border-brand-gold text-white placeholder-gray-400 text-sm py-3 pl-4 pr-11 rounded-lg outline-none transition"
                    required
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-brand-gold hover:text-white transition cursor-pointer disabled:opacity-50"
                    aria-label="Subscribe"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                {status === 'error' && (
                  <p className="text-rose-400 text-xs font-semibold">Please enter a valid academic email.</p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Legal and Copyright bar */}
        <div className="pt-8 mt-12 border-t border-brand-blue-light/70 text-center text-xs text-gray-400 font-sans flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Seed Academy. All rights reserved. Registered Educational Inst.</p>
          <div className="flex space-x-6">
            <span className="hover:text-brand-gold cursor-pointer">Privacy Charter</span>
            <span className="hover:text-brand-gold cursor-pointer">Education Guidelines</span>
            <span className="hover:text-brand-gold cursor-pointer">Standard Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
