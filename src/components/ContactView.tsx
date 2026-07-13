import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldAlert, 
  Send, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  CheckCircle2, 
  Clock, 
  MessageSquare,
  Compass
} from 'lucide-react';
import { SCHOOL_INFO } from '../data';
import InteractiveMap from './InteractiveMap';

export default function ContactView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');
    
    try {
      const response = await fetch('https://formspree.io/f/mrenglqa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          subject: subject,
          message: message
        })
      });

      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        const data = await response.json();
        setErrorMessage(data.errors?.map((err: any) => err.message).join(', ') || 'Submission failed. Please try again.');
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  };

  return (
    <div className="w-full font-sans text-brand-blue bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Head */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-brand-gold font-bold uppercase tracking-wider text-[11px] font-mono block">
            Always Available For parents
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-blue tracking-tight leading-none font-display">
            Contact Help Desk
          </h1>
          <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
            Have questions about student registration, timetables, or sport rosters? Write, call, or chat with our administrative secretaries.
          </p>
        </div>

        {/* 1. CONTACT INFO BLOCKS & FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-6">
          
          {/* Left panel contact info detail blocks - col span 5 */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-mono font-bold text-brand-gold">Physical Coordinates</span>
              <h2 className="text-2xl font-extrabold tracking-tight font-display text-brand-blue uppercase">
                Primary Campus Office
              </h2>
            </div>

            {/* Address cards */}
            <div className="space-y-5">
              <div className="flex gap-4 p-5 rounded-2xl bg-brand-gray border border-gray-150">
                <MapPin className="w-6 h-6 text-brand-gold shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-brand-blue text-sm uppercase font-mono">Lagos Secretariat Address</h4>
                  <p className="text-xs md:text-sm text-gray-650 leading-relaxed font-sans">{SCHOOL_INFO.address}</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 rounded-2xl bg-brand-gray border border-gray-150">
                <Phone className="w-6 h-6 text-brand-gold shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-brand-blue text-sm uppercase font-mono">General Communications Desktop</h4>
                  <p className="text-xs md:text-sm text-gray-650 leading-relaxed font-sans">{SCHOOL_INFO.generalPhone}</p>
                  <p className="text-[10px] text-gray-400 font-mono">Available 8:00 AM – 4:00 PM (Monday-Friday)</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 rounded-2xl bg-brand-gray border border-gray-150">
                <Mail className="w-6 h-6 text-brand-gold shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-brand-blue text-sm uppercase font-mono">Admin Email Registry</h4>
                  <a href={`mailto:${SCHOOL_INFO.adminEmail}`} className="text-xs md:text-sm font-semibold hover:text-brand-gold transition font-sans">{SCHOOL_INFO.adminEmail}</a>
                  <p className="text-[10px] text-gray-400 block font-mono">Inquiries: {SCHOOL_INFO.inquiryEmail}</p>
                </div>
              </div>

              {/* EMERGENCY CONTACT PANEL */}
              <div className="bg-rose-50 text-rose-950 p-5 rounded-2xl border border-rose-200 shadow-sm space-y-3">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
                  <h4 className="font-extrabold text-xs sm:text-sm uppercase tracking-wide">
                    Emergency Contact Line
                  </h4>
                </div>
                <p className="text-xs text-rose-800 leading-relaxed font-sans font-medium">
                  Reserved exclusively for parents requiring instant physical security checks, health ambulance dispatch, or sudden pickup authorizations:
                </p>
                <span className="block text-base sm:text-lg font-bold font-mono tracking-wider text-rose-700 font-extrabold">
                  {SCHOOL_INFO.emergencyPhone}
                </span>
              </div>
            </div>

            {/* Social channels card */}
            <div className="space-y-3">
              <h4 className="font-bold text-brand-blue text-xs uppercase tracking-wider font-mono">Social Networks</h4>
              <div className="flex items-center space-x-3.5 pt-1">
                <a 
                  href={SCHOOL_INFO.socials.facebook} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-brand-gray text-gray-400 hover:text-brand-gold border hover:border-brand-gold hover:scale-105 transition"
                  aria-label="Facebook Link"
                >
                  <Facebook className="w-5 h-5 shrink-0" />
                </a>
                <a 
                  href={SCHOOL_INFO.socials.twitter} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-brand-gray text-gray-400 hover:text-brand-gold border hover:border-brand-gold hover:scale-105 transition"
                  aria-label="Twitter Link"
                >
                  <Twitter className="w-5 h-5 shrink-0" />
                </a>
                <a 
                  href={SCHOOL_INFO.socials.instagram} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-brand-gray text-gray-400 hover:text-brand-gold border hover:border-brand-gold hover:scale-105 transition"
                  aria-label="Instagram Link"
                >
                  <Instagram className="w-5 h-5 shrink-0" />
                </a>
                <a 
                  href={SCHOOL_INFO.socials.linkedin} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-brand-gray text-gray-400 hover:text-brand-gold border hover:border-brand-gold hover:scale-105 transition"
                  aria-label="LinkedIn Link"
                >
                  <Linkedin className="w-5 h-5 shrink-0" />
                </a>
              </div>
            </div>
          </div>

          {/* Right inquiry submission form - col span 7 */}
          <div className="lg:col-span-7 bg-brand-gray/30 border border-gray-150 p-6 md:p-8 rounded-3xl space-y-6">
            <div className="space-y-1.5 text-left">
              <span className="text-[10px] uppercase font-mono font-bold text-brand-gold block">Send a Secure message</span>
              <h2 className="text-xl md:text-2xl font-extrabold font-display uppercase tracking-tight text-brand-blue">
                General Inquiry Form
              </h2>
              <p className="text-xs text-gray-500 font-sans">
                Complete fields below for direct admissions, bursary accounts, or academic curriculum queries.
              </p>
            </div>

            {status === 'success' ? (
              <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-2xl flex flex-col items-center justify-center text-center space-y-4 animate-in zoom-in-95 duration-200 font-sans text-brand-blue">
                <CheckCircle2 className="w-14 h-14 text-emerald-500" />
                <div>
                  <h3 className="font-extrabold text-base md:text-lg">Message Dispatched Successfully!</h3>
                  <p className="text-xs text-gray-500 leading-relaxed max-w-sm ml-auto mr-auto mt-1">
                    Thank you for your submission. An administrative secretary will contact you via email or phone within 12 hours.
                  </p>
                </div>
                <button 
                  onClick={() => setStatus('idle')}
                  className="bg-brand-blue hover:bg-brand-blue-light text-white font-bold py-2.5 px-6 rounded-lg text-xs transition cursor-pointer active:scale-95"
                >
                  Submit Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs md:text-sm font-sans text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-gray-650 font-bold block">Your Full Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Chief Kenneth Ndukwe"
                      className="bg-white border rounded-lg p-3 outline-none text-brand-blue focus:border-brand-gold text-xs sm:text-sm transition"
                      required
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label className="text-gray-650 font-bold block">Email Address *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. kenneth.ndukwe@outlook.com"
                      className="bg-white border rounded-lg p-3 outline-none text-brand-blue focus:border-brand-gold text-xs sm:text-sm transition"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label className="text-gray-650 font-bold block">Inquiry Subject *</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Requesting Class Schedule Tour JSS1"
                    className="bg-white border rounded-lg p-3 outline-none text-brand-blue focus:border-brand-gold text-xs sm:text-sm transition"
                    required
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label className="text-gray-650 font-bold block">Full Message Content *</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={6}
                    placeholder="Provide details of your question..."
                    className="bg-white border rounded-lg p-3 outline-none text-brand-blue focus:border-brand-gold text-xs sm:text-sm resize-none transition"
                    required
                  />
                </div>

                {status === 'error' && errorMessage && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold leading-relaxed animate-in fade-in duration-200">
                    ⚠️ {errorMessage}
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-brand-gold hover:bg-brand-gold-dark text-brand-blue font-extrabold outline-none py-3.5 px-6 rounded-lg text-xs sm:text-sm shadow flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer disabled:opacity-50"
                  >
                    {status === 'submitting' ? (
                      <span>Sending inquiry secure packet...</span>
                    ) : (
                      <>
                        <span>Send Message Packet</span>
                        <Send className="w-4 h-4 shrink-0" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* 2. CAMPUS BLUEPRINT AT WORK */}
        <div className="pt-6">
          <InteractiveMap />
        </div>

      </div>
    </div>
  );
}
