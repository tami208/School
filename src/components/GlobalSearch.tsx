import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, HelpCircle, FileText, ArrowRight, CornerDownLeft } from 'lucide-react';
import { ACADEMIC_PROGRAMS, FAQS, NEWS } from '../data';

interface GlobalSearchProps {
  onClose: () => void;
  setActiveTab: (tab: string) => void;
  setSelectedProgramId?: (id: string) => void;
}

export default function GlobalSearch({ onClose, setActiveTab, setSelectedProgramId }: GlobalSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<{
    programs: typeof ACADEMIC_PROGRAMS;
    faqs: typeof FAQS;
    news: typeof NEWS;
  }>({ programs: [], faqs: [], news: [] });

  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults({ programs: [], faqs: [], news: [] });
      return;
    }

    const query = searchTerm.toLowerCase();

    const filteredPrograms = ACADEMIC_PROGRAMS.filter(
      p => p.name.toLowerCase().includes(query) || p.overview.toLowerCase().includes(query)
    );

    const filteredFaqs = FAQS.filter(
      f => f.question.toLowerCase().includes(query) || f.answer.toLowerCase().includes(query)
    );

    const filteredNews = NEWS.filter(
      n => n.title.toLowerCase().includes(query) || n.excerpt.toLowerCase().includes(query)
    );

    setResults({
      programs: filteredPrograms,
      faqs: filteredFaqs,
      news: filteredNews,
    });
  }, [searchTerm]);

  const navigateToResult = (tabId: string, itemId?: string) => {
    setActiveTab(tabId);
    if (tabId === 'academics' && itemId && setSelectedProgramId) {
      setSelectedProgramId(itemId);
    }
    onClose();
    // Smooth scroll to relevant parts
    setTimeout(() => {
      const el = document.getElementById(itemId || tabId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
  };

  const hasResults = results.programs.length > 0 || results.faqs.length > 0 || results.news.length > 0;

  return (
    <div className="fixed inset-0 z-55 bg-brand-blue/80 backdrop-blur-sm flex items-start justify-center pt-24 px-4 sm:px-6 lg:px-8">
      {/* Modal Card */}
      <div 
        ref={modalRef}
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Search Input block */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-3">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search programs, FAQs, activities, admission guidelines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-base text-brand-blue placeholder-gray-400 outline-none font-sans"
            autoFocus
          />
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-brand-blue transition duration-150"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Stream */}
        <div className="max-h-96 overflow-y-auto p-4 no-scrollbar">
          {searchTerm.trim() === '' ? (
            <div className="py-12 text-center">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-sm font-semibold text-gray-500">How can we assist you today?</p>
              <p className="text-xs text-gray-400 mt-1">Type keywords like "tuition", "kindergarten", "robotics", or "requirements".</p>
            </div>
          ) : !hasResults ? (
            <div className="py-12 text-center">
              <p className="text-sm font-semibold text-gray-500">No matching school contents found</p>
              <p className="text-xs text-gray-400 mt-1">Please try modifying your keywords (e.g., broad queries like "SS3" or "fees").</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Programs */}
              {results.programs.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 font-mono flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-brand-gold" />
                    Academic Programs ({results.programs.length})
                  </h3>
                  <div className="space-y-1.5">
                    {results.programs.map(p => (
                      <div 
                        key={p.id}
                        onClick={() => navigateToResult('academics', p.id)}
                        className="group flex justify-between items-center p-3 rounded-lg hover:bg-brand-blue/5 border border-transparent hover:border-brand-blue/10 cursor-pointer transition"
                      >
                        <div>
                          <span className="block font-bold text-brand-blue text-sm group-hover:text-brand-gold transition">
                            {p.name}
                          </span>
                          <span className="text-xs text-gray-500 line-clamp-1">{p.overview}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-brand-gold group-hover:translate-x-1.5 transition shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQs */}
              {results.faqs.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 font-mono flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-brand-gold" />
                    Frequently Asked Questions ({results.faqs.length})
                  </h3>
                  <div className="space-y-1.5">
                    {results.faqs.map(f => (
                      <div 
                        key={f.id}
                        onClick={() => navigateToResult('admissions', 'faq-section')}
                        className="group flex justify-between items-center p-3 rounded-lg hover:bg-brand-blue/5 border border-transparent hover:border-brand-blue/10 cursor-pointer transition"
                      >
                        <div>
                          <span className="block font-bold text-brand-blue text-sm group-hover:text-brand-gold transition">
                            Q: {f.question}
                          </span>
                          <span className="text-xs text-gray-500 line-clamp-1">{f.answer}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-brand-gold group-hover:translate-x-1.5 transition shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* News */}
              {results.news.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 font-mono flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-brand-gold" />
                    News & Accomplishments ({results.news.length})
                  </h3>
                  <div className="space-y-1.5">
                    {results.news.map(n => (
                      <div 
                        key={n.id}
                        onClick={() => navigateToResult('home', 'news-section')}
                        className="group flex justify-between items-center p-3 rounded-lg hover:bg-brand-blue/5 border border-transparent hover:border-brand-blue/10 cursor-pointer transition"
                      >
                        <div>
                          <span className="block font-bold text-brand-blue text-sm group-hover:text-brand-gold transition">
                            {n.title}
                          </span>
                          <span className="text-xs text-gray-500 line-clamp-1">{n.excerpt}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-brand-gold group-hover:translate-x-1.5 transition shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer info showing quick controls */}
        <div className="p-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-[11px] text-gray-400 font-mono">
          <span className="flex items-center gap-1">
            <CornerDownLeft className="w-3.5 h-3.5 mt-0.5 text-gray-400" />
            <span>Select Result to Jump</span>
          </span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
}
