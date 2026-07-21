import React, { useState } from 'react';
import { X, Lock, Mail, Eye, EyeOff, Briefcase, UserCheck, ShieldAlert } from 'lucide-react';

interface StaffSignInModalProps {
  onClose: () => void;
}

export default function StaffSignInModal({ onClose }: StaffSignInModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'educator' | 'administrator' | 'bursar'>('educator');
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [loggedInStaff, setLoggedInStaff] = useState<any | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Quick structural check
    if (!email.includes('@')) {
      setErrorMsg('Please enter a valid school email address.');
      setStatus('error');
      return;
    }

    setStatus('loading');

    setTimeout(() => {
      // Allow any staff email ending in .ng or .com or @seed
      const isDomainOk = email.endsWith('.ng') || email.endsWith('.com') || email.includes('seed');
      
      if (!isDomainOk) {
        setErrorMsg('Access restricted. Please use an official @seed.edu.ng or certified partner email.');
        setStatus('error');
        return;
      }

      const staffName = email.split('@')[0].split('.').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
      
      const sessionData = {
        name: staffName,
        email,
        role: role.toUpperCase(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      localStorage.setItem('seed_staff_session', JSON.stringify(sessionData));
      setLoggedInStaff(sessionData);
      setStatus('success');
      
      // Dispatch a storage event so other components (like Navbar) know we logged in
      window.dispatchEvent(new Event('staff-login-change'));

      setTimeout(() => {
        onClose();
      }, 1500);
    }, 1200);
  };

  const handleSignOut = () => {
    localStorage.removeItem('seed_staff_session');
    setLoggedInStaff(null);
    window.dispatchEvent(new Event('staff-login-change'));
    onClose();
  };

  // Check if already logged in on mount
  React.useEffect(() => {
    const saved = localStorage.getItem('seed_staff_session');
    if (saved) {
      try {
        setLoggedInStaff(JSON.parse(saved));
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-150 shadow-2xl w-full max-w-md relative overflow-hidden font-sans mx-4 text-brand-blue animate-in zoom-in-95 duration-200">
      
      {/* Absolute background accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-xl pointer-events-none" />

      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="text-brand-gold font-bold uppercase tracking-widest text-[10px] font-mono block">
            Official Portal Gate
          </span>
          <h3 className="text-xl md:text-2xl font-extrabold font-display uppercase tracking-tight">
            Staff Sign-In
          </h3>
        </div>
        <button 
          onClick={onClose}
          className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-brand-blue transition cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {loggedInStaff ? (
        <div className="space-y-6 text-center py-4">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
            <UserCheck className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h4 className="text-lg font-extrabold">{loggedInStaff.name}</h4>
            <p className="text-xs text-gray-500 font-mono uppercase tracking-wider bg-brand-gray inline-block px-3 py-1 rounded-full border border-gray-150">
              {loggedInStaff.role}
            </p>
            <p className="text-xs text-gray-400 mt-2">Active session started at {loggedInStaff.time}</p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-brand-blue hover:bg-brand-blue-light text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm cursor-pointer transition active:scale-95"
            >
              Continue to Workspace
            </button>
            <button
              onClick={handleSignOut}
              className="bg-red-50 hover:bg-red-100 text-red-600 font-bold py-3 px-4 rounded-xl text-xs sm:text-sm cursor-pointer transition active:scale-95"
            >
              Sign Out
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {status === 'success' && (
            <div className="bg-emerald-50 border border-emerald-250 p-4 rounded-2xl flex items-center space-x-3 text-emerald-800 text-xs">
              <UserCheck className="w-5 h-5 shrink-0 text-emerald-500" />
              <span>Authentication success! Redirecting to workspace...</span>
            </div>
          )}

          {status === 'error' && (
            <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl flex items-start space-x-3 text-rose-800 text-xs text-left">
              <ShieldAlert className="w-5 h-5 shrink-0 text-rose-500 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Role Selection */}
          <div className="space-y-1.5 text-left">
            <label className="text-gray-600 font-bold block text-xs">Access Role *</label>
            <div className="grid grid-cols-3 gap-2">
              {(['educator', 'administrator', 'bursar'] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`py-2 px-1 text-center border rounded-xl font-bold uppercase text-[9px] tracking-wider transition ${
                    role === r
                      ? 'bg-brand-blue text-brand-gold border-brand-blue'
                      : 'bg-white border-gray-200 text-gray-500 hover:bg-slate-50'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5 text-left">
            <label className="text-gray-600 font-bold block text-xs">School Email Address *</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. t.alao@seed.edu.ng"
                className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-11 pr-4 outline-none text-brand-blue focus:border-brand-gold text-xs sm:text-sm"
                required
                disabled={status === 'loading'}
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5 text-left">
            <div className="flex justify-between items-center">
              <label className="text-gray-600 font-bold block text-xs">Access Passphrase *</label>
              <span className="text-[10px] text-gray-400 hover:text-brand-gold cursor-pointer">Forgot?</span>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-11 pr-11 outline-none text-brand-blue focus:border-brand-gold text-xs sm:text-sm"
                required
                disabled={status === 'loading'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-blue focus:outline-none cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="w-full bg-brand-gold hover:bg-brand-gold-dark text-brand-blue font-extrabold py-3.5 px-4 rounded-xl text-xs sm:text-sm shadow flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer disabled:opacity-50"
            >
              {status === 'loading' ? (
                <span>Validating credentials...</span>
              ) : (
                <>
                  <span>Sign In as Staff</span>
                  <Briefcase className="w-4 h-4 shrink-0" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
