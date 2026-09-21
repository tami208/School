import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, Search, MessageSquare, BookOpen, GraduationCap, User, LogOut, Briefcase } from 'lucide-react';
import { SCHOOL_INFO } from '../data';
import StaffSignInModal from './StaffSignInModal';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
}

export default function Navbar({ activeTab, setActiveTab, onOpenSearch }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [staffSession, setStaffSession] = useState<any | null>(null);

  useEffect(() => {
    const checkStaffSession = () => {
      const saved = localStorage.getItem('seed_staff_session');
      if (saved) {
        try {
          setStaffSession(JSON.parse(saved));
        } catch (e) {
          setStaffSession(null);
        }
      } else {
        setStaffSession(null);
      }
    };

    checkStaffSession();
    window.addEventListener('staff-login-change', checkStaffSession);
    return () => {
      window.removeEventListener('staff-login-change', checkStaffSession);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'academics', label: 'Academics' },
    { id: 'admissions', label: 'Admissions' },
    { id: 'student-life', label: 'Student Life' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="w-full z-50 transition-all duration-300">
      {/* Top Utility Bar */}
      <div className="bg-brand-blue text-white text-xs py-2 shadow-inner px-4 sm:px-6 lg:px-8 hidden md:block border-b border-brand-blue-light">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 focus:outline-none">
              <Phone className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
              <span>General: {SCHOOL_INFO.generalPhone}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-brand-gold" />
              <span>{SCHOOL_INFO.inquiryEmail}</span>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="bg-brand-gold/20 text-brand-gold-light px-2.5 py-0.5 rounded-full font-medium tracking-wide">
              Admissions Open 2026/2027
            </span>
            <button 
              onClick={() => handleNavClick('admissions')}
              className="text-white hover:text-brand-gold font-semibold transition cursor-pointer"
            >
              Apply Portal
            </button>
            <span className="text-brand-blue-light/50">|</span>
            {staffSession ? (
              <div className="flex items-center space-x-2">
                <span className="text-brand-gold font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                  Staff: {staffSession.name}
                </span>
                <button 
                  onClick={() => {
                    localStorage.removeItem('seed_staff_session');
                    window.dispatchEvent(new Event('staff-login-change'));
                  }}
                  className="text-gray-300 hover:text-red-400 font-semibold transition cursor-pointer flex items-center gap-1"
                >
                  <LogOut className="w-3 h-3" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsStaffModalOpen(true)}
                className="text-white hover:text-brand-gold font-semibold transition cursor-pointer flex items-center gap-1"
              >
                <User className="w-3.5 h-3.5 text-brand-gold" />
                <span>Staff Sign-In</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <nav id="main-nav" className={`w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-xl py-3 fixed top-0 left-0 right-0 border-b border-gray-100' 
          : 'bg-white py-4 relative'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Group */}
            <div 
              onClick={() => handleNavClick('home')}
              className="flex items-center space-x-3 cursor-pointer group"
              id="school-logo"
            >
              <div className="bg-brand-blue text-brand-gold p-2 md:p-3 rounded-lg shadow-md transition group-hover:bg-brand-blue-light">
                <GraduationCap className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <div>
                <span className="block text-lg md:text-2xl font-extrabold text-brand-blue tracking-tight leading-tight group-hover:text-brand-blue-light transition">
                  SEED
                  <span className="text-brand-gold font-normal font-display"> ACADEMY</span>
                </span>
                <span className="hidden sm:block text-[10px] text-gray-500 uppercase tracking-widest font-mono font-bold">
                  Nurturing Leaders since 2005
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 rounded-md text-sm font-semibold tracking-wide transition-all duration-200 ${
                    activeTab === item.id
                      ? 'text-brand-gold bg-brand-blue/5 border-b-2 border-brand-gold'
                      : 'text-brand-blue hover:text-brand-gold hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Icons / Actions Group */}
            <div className="hidden lg:flex items-center space-x-4">
              <button 
                onClick={onOpenSearch}
                id="search-trigger-btn"
                className="p-2.5 rounded-full text-brand-blue hover:text-brand-gold hover:bg-gray-100 transition duration-150 relative"
                aria-label="Search website"
              >
                <Search className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleNavClick('admissions')}
                id="apply-now-navbar"
                className="bg-white hover:bg-brand-gold text-brand-blue border border-brand-gold font-bold px-5 py-2.5 rounded-full transition shadow hover:shadow-lg text-sm tracking-uppercase active:scale-95"
              >
                Apply Now
              </button>
            </div>

            {/* Mobile Actions and Burger Menu */}
            <div className="flex items-center space-x-3 lg:hidden">
              <button 
                onClick={onOpenSearch}
                className="p-2 rounded-full text-brand-blue hover:bg-gray-100 transition"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                id="mobile-menu-burger"
                className="p-2 rounded-md text-brand-blue hover:bg-gray-100 transition focus:outline-none"
                aria-label="Toggle navigation drawer"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-2xl z-50 animate-in fade-in duration-200">
            <div className="px-4 pt-3 pb-6 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-base font-semibold transition ${
                    activeTab === item.id
                      ? 'bg-brand-blue text-brand-gold'
                      : 'text-brand-blue hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-gray-100 flex flex-col space-y-3">
                <div className="flex items-center justify-between text-xs text-gray-500 px-4">
                  <span>Inquiries: {SCHOOL_INFO.generalPhone}</span>
                </div>
                <button 
                  onClick={() => handleNavClick('admissions')}
                  className="w-full text-center bg-white hover:bg-brand-gold text-brand-blue border border-brand-gold font-bold py-3 rounded-lg shadow text-sm"
                >
                  Apply Online Now
                </button>
                
                {staffSession ? (
                  <div className="p-3 bg-brand-gray border border-gray-150 rounded-lg flex flex-col space-y-2 text-xs font-sans">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-brand-blue flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                        {staffSession.name}
                      </span>
                      <span className="text-[9px] font-mono font-bold bg-brand-gold/20 text-brand-gold px-2 py-0.5 rounded">
                        {staffSession.role}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        localStorage.removeItem('seed_staff_session');
                        window.dispatchEvent(new Event('staff-login-change'));
                      }}
                      className="w-full py-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-md transition text-center cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out Staff Portal</span>
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsStaffModalOpen(true);
                    }}
                    className="w-full text-center bg-brand-blue hover:bg-brand-blue-light text-brand-gold font-bold py-3 rounded-lg shadow text-sm flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <User className="w-4 h-4 text-brand-gold" />
                    <span>Staff Sign-In</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Staff Sign-In Modal Overlay */}
      {isStaffModalOpen && (
        <div className="fixed inset-0 bg-brand-blue/60 backdrop-blur-xs flex items-center justify-center z-55 p-4 animate-in fade-in duration-200">
          <StaffSignInModal onClose={() => setIsStaffModalOpen(false)} />
        </div>
      )}
    </header>
  );
}
