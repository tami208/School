import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SCHOOL_INFO } from './data';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GlobalSearch from './components/GlobalSearch';
import WhatsAppWidget from './components/WhatsAppWidget';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import AcademicsView from './components/AcademicsView';
import AdmissionsView from './components/AdmissionsView';
import StudentLifeView from './components/StudentLifeView';
import ContactView from './components/ContactView';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedProgramId, setSelectedProgramId] = useState<string>('kindergarten');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Helper callbacks to jump between views
  const handleLearnMoreAbout = () => {
    setActiveTab('about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyPortal = () => {
    setActiveTab('admissions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeView 
            onLearnMoreAbout={handleLearnMoreAbout} 
            onApplyPortal={handleApplyPortal} 
          />
        );
      case 'about':
        return <AboutView />;
      case 'academics':
        return (
          <AcademicsView 
            selectedProgramId={selectedProgramId} 
            setSelectedProgramId={setSelectedProgramId} 
          />
        );
      case 'admissions':
        return <AdmissionsView />;
      case 'student-life':
        return <StudentLifeView />;
      case 'contact':
        return <ContactView />;
      default:
        return (
          <HomeView 
            onLearnMoreAbout={handleLearnMoreAbout} 
            onApplyPortal={handleApplyPortal} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-white text-brand-blue flex flex-col justify-between selection:bg-brand-gold/30 selection:text-brand-blue-light font-sans relative overflow-x-hidden">
      
      {/* 1. Global Navigation Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenSearch={() => setIsSearchOpen(true)} 
      />

      {/* 2. Main content view block wrapping within smooth fade animation */}
      <main className="grow w-full relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="w-full h-full"
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Global Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* 4. Global Search Modal Dialog */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-55 bg-brand-blue/60 backdrop-blur-xs flex items-center justify-center"
          >
            <GlobalSearch 
              onClose={() => setIsSearchOpen(false)} 
              setActiveTab={setActiveTab}
              setSelectedProgramId={setSelectedProgramId}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. Floating WhatsApp Support widget */}
      <WhatsAppWidget />

    </div>
  );
}
