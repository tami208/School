import React, { useState } from 'react';
import { MessageSquare, X, Send, CheckCircle2, User } from 'lucide-react';
import { SCHOOL_INFO } from '../data';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState<'admissions' | 'admin'>('admissions');
  const [message, setMessage] = useState('');

  const departments = {
    admissions: {
      name: 'Admissions desk',
      title: 'Registrar Staff',
      avail: 'Available',
      iconColor: 'bg-emerald-500',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=80',
      greeting: 'Hi there! Looking for registration guidance/forms for Kindergarten, Primary or College? Let me know how I can help!'
    },
    admin: {
      name: 'General Desk Office',
      title: 'Principal Secretary',
      avail: 'Responds Fast',
      iconColor: 'bg-blue-500',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=80&q=80',
      greeting: 'Main Secretariat desk here. How can we help you regarding timetables, fees or events?'
    }
  };

  const currentDetails = departments[selectedDept];

  const handleSendArgs = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    let waNumber = selectedDept === 'admissions' 
      ? SCHOOL_INFO.generalPhone.replace(/[\s\(\)\+]/g, '') 
      : SCHOOL_INFO.emergencyPhone.replace(/[\s\(\)\+]/g, '');

    // Convert leading '0' (for 11-digit local Nigerian numbers) to '234'
    if (waNumber.startsWith('0') && waNumber.length === 11) {
      waNumber = '234' + waNumber.substring(1);
    } else if (waNumber.startsWith('2340') && waNumber.length === 14) {
      waNumber = '234' + waNumber.substring(4);
    }

    const prefixText = `Hello Seed Academy ${currentDetails.name}! I am writing in regard to: ${message}`;
    const targetUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(prefixText)}`;
    
    window.open(targetUrl, '_blank');
    setMessage('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Dynamic Popover Chat Bubble */}
      {isOpen && (
        <div className="bg-white w-80 sm:w-85 rounded-2xl shadow-2xl border border-gray-150 overflow-hidden mb-4 animate-in slide-in-from-bottom-5 duration-200">
          {/* Header block with green color */}
          <div className="bg-brand-blue text-white p-4 pb-5 flex items-center justify-between relative">
            <div className="flex items-center space-x-3">
              <div className="relative">
                {/* [IMAGE REMOVED: WhatsApp Desk Avatar] */}
                <div className="w-11 h-11 rounded-full border-2 border-brand-gold bg-brand-blue-light/50 flex items-center justify-center text-brand-gold">
                  <User className="w-6 h-6" />
                </div>
                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-brand-blue ${currentDetails.iconColor}`} />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-wide text-brand-gold-light">{currentDetails.name}</h3>
                <p className="text-[11px] text-gray-300 font-medium">{currentDetails.title} • {currentDetails.avail}</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/10 text-gray-200 hover:text-white transition"
              aria-label="Close Whatsapp helper"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Tab Select for Department */}
          <div className="grid grid-cols-2 text-xs border-b border-gray-100 font-semibold bg-gray-50/70">
            <button
              onClick={() => setSelectedDept('admissions')}
              className={`py-3 text-center border-b-2 transition ${
                selectedDept === 'admissions' 
                  ? 'border-brand-gold text-brand-blue font-bold bg-white' 
                  : 'border-transparent text-gray-500 hover:text-brand-blue'
              }`}
            >
              Admissions Support
            </button>
            <button
              onClick={() => setSelectedDept('admin')}
              className={`py-3 text-center border-b-2 transition ${
                selectedDept === 'admin' 
                  ? 'border-brand-gold text-brand-blue font-bold bg-white' 
                  : 'border-transparent text-gray-500 hover:text-brand-blue'
              }`}
            >
              General Secretary
            </button>
          </div>

          {/* Dialog Space */}
          <div className="p-4 space-y-4 max-h-56 overflow-y-auto no-scrollbar bg-brand-gray">
            <div className="bg-white p-3 rounded-xl rounded-tl-none shadow-sm text-xs leading-relaxed text-gray-600 border border-gray-150">
              {currentDetails.greeting}
            </div>
          </div>

          {/* Text Input Footer */}
          <form onSubmit={handleSendArgs} className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your WhatsApp message..."
              className="w-full bg-slate-50 border border-slate-100 focus:border-brand-gold outline-none rounded-lg py-2 md:py-2.5 px-3 text-xs md:text-sm text-brand-blue placeholder-gray-400 transition"
              required
            />
            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-600 text-white p-2.5 md:p-3 rounded-lg shadow-md transition shrink-0 cursor-pointer"
              aria-label="Send via WhatsApp"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        id="whatsapp-chat-float"
        className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 hover:scale-105 active:scale-95 text-white flex items-center justify-center rounded-full shadow-2xl transition duration-200 cursor-pointer relative group"
        aria-label="Chat with Seed Academy representative"
      >
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-20 animate-ping group-hover:hidden" />
        {isOpen ? <X className="w-6 h-6 animate-in spin-in-95 duration-150" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  );
}
