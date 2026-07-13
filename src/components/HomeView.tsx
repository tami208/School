import React, { useState } from 'react';
import { 
  ArrowRight, 
  ChevronRight, 
  GraduationCap, 
  Users, 
  Award, 
  Calendar, 
  Bookmark, 
  Quote, 
  CheckCircle,
  FileText,
  Clock,
  ExternalLink,
  ChevronLeft,
  ChevronRight as ChevronRightIcon
} from 'lucide-react';
import { SCHOOL_INFO, STATS, NEWS, TESTIMONIALS } from '../data';

interface HomeViewProps {
  onLearnMoreAbout: () => void;
  onApplyPortal: () => void;
}

export default function HomeView({ onLearnMoreAbout, onApplyPortal }: HomeViewProps) {
  // Testimonial selection state
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  
  // News modal detail viewing state
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);

  const prevTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const currentNews = NEWS.find(n => n.id === selectedNewsId);

  // Map icon strings to Lucide components
  const getIcon = (name: string) => {
    switch (name) {
      case 'GraduationCap': return <GraduationCap className="w-8 h-8 text-brand-gold" />;
      case 'Users': return <Users className="w-8 h-8 text-brand-gold" />;
      case 'Award': return <Award className="w-8 h-8 text-brand-gold" />;
      case 'Calendar': return <Calendar className="w-8 h-8 text-brand-gold" />;
      default: return <GraduationCap className="w-8 h-8 text-brand-gold" />;
    }
  };

  return (
    <div className="w-full font-sans text-brand-blue bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-brand-blue text-white min-h-[620px] lg:min-h-[700px] flex items-center">
        {/* Dynamic Abstract Grid Overlay */}
        <div className="absolute inset-0 bg-transparent opacity-10 pointer-events-none bg-[radial-gradient(#AA840A_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
        
        {/* Slanted gold visual divider block */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-blue-light/70 to-transparent hidden lg:block" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Hero Texts */}
          <div className="text-left space-y-6 max-w-xl animate-in slide-in-from-left duration-500">
            <span className="inline-block px-4 py-1.5 bg-white/10 text-brand-gold border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2 font-mono">
              Co-educational K-12 Pioneer Institution
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-display">
              Where Exceptional <span className="text-brand-gold">Leaders</span> Are Groomed
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-sans font-light">
              Goldbridge Academy merges rigorous academic pathways with strict ethical frameworks, equipping young minds from Kindergarten to SS3 with tools to lead change.
            </p>
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button 
                onClick={onApplyPortal}
                id="hero-apply-btn"
                className="bg-white hover:bg-brand-gold text-brand-blue border border-brand-gold font-bold px-8 py-4 rounded-xl text-center shadow-lg hover:shadow-brand-gold/20 transition-all active:scale-95 cursor-pointer text-sm uppercase tracking-wide"
              >
                Apply Now (2026/27)
              </button>
              <button 
                onClick={onLearnMoreAbout}
                id="hero-learn-more"
                className="bg-transparent hover:bg-white/10 text-white font-semibold border-2 border-white/20 hover:border-white px-8 py-4 rounded-xl text-center transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <span>Explore Programs</span>
                <ArrowRight className="w-4 h-4 text-brand-gold" />
              </button>
            </div>
          </div>

          {/* Right Hero Visual Banner Image */}
          <div className="relative animate-in slide-in-from-right duration-500 hidden lg:block">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-brand-gold to-brand-gold-light opacity-30 blur-xl" />
            <div className="relative rounded-2xl border-4 border-brand-blue-light shadow-2xl overflow-hidden aspect-[4/3]">
              {/* [IMAGE INSTALLED: Hero Campus Infrastructure Presentation Banner] */}
              <img 
                src="/src/assets/images/school_hero_new_1782224558788.jpg" 
                alt="Goldbridge Academy Campus Infrastructure Banner" 
                className="w-full h-full object-cover rounded-xl shrink-0" 
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="bg-brand-gray/30 pt-0 pb-12 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            {STATS.map((stat, i) => (
              <div key={stat.id} className="text-center flex flex-col items-center justify-center p-4 pt-6 lg:pt-4">
                <div className="mb-3 text-brand-gold">
                  {getIcon(stat.iconName)}
                </div>
                <h3 className="text-3xl sm:text-4xl font-extrabold font-display leading-none text-brand-blue">
                  {stat.value}
                </h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CORE MISSION & VALUE STATEMENTS */}
      <section className="py-16 md:py-24 bg-brand-gray/50 px-4 sm:px-6 lg:px-8" id="about-section">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-brand-gold font-bold uppercase tracking-wider text-xs font-mono block">
              Foundation Philosophy
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-blue tracking-tight leading-tight font-display">
              Nurturing Intellect,<br />Character, and Integrity.
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed font-sans">
              Founded under deep pedogical standards, our mission focuses on unlocking the innate talent of the student, and surrounding them with elite academic resources, safety guidelines, and active learning.
            </p>
            <div className="bg-white border border-gray-150 p-6 rounded-2xl shadow-sm space-y-3.5">
              <h3 className="font-bold text-brand-blue text-sm uppercase tracking-wide flex items-center gap-2">
                <span className="w-2.5 h-10 bg-brand-gold rounded-full" />
                Our Collective Statement
              </h3>
              <p className="text-xs md:text-sm italic text-gray-500 font-serif leading-relaxed">
                "{SCHOOL_INFO.mission}"
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {SCHOOL_INFO.values.map((v, i) => (
              <div 
                key={i} 
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-gray-150 hover:border-brand-gold/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="w-10 h-10 rounded-full font-mono font-bold bg-brand-blue/5 text-brand-gold flex items-center justify-center text-sm">
                    0{i + 1}
                  </span>
                  <h4 className="font-extrabold text-brand-blue text-base md:text-lg">
                    {v.title}
                  </h4>
                  <p className="text-xs md:text-sm text-gray-500 leading-normal font-sans">
                    {v.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. NEWS & EVENT ANNOUNCEMENTS */}
      <section className="py-16 md:py-24 bg-white px-4 sm:px-6 lg:px-8" id="news-section">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div className="space-y-2">
              <span className="text-brand-gold font-bold uppercase tracking-wider text-xs font-mono block">
                Live Campus Feed
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-blue tracking-tight leading-none font-display">
                News & Announcements
              </h2>
            </div>
            <p className="text-xs md:text-sm text-gray-400 font-mono">
              Updated routinely for parents & students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {NEWS.map((item) => (
              <article 
                key={item.id} 
                onClick={() => setSelectedNewsId(item.id)}
                className="bg-white rounded-2xl border border-gray-150 hover:border-brand-gold hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer group"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-gray-400">
                    <span className="bg-brand-gray text-brand-blue px-2.5 py-1 rounded">
                      {item.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {item.date}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-brand-blue text-base md:text-lg line-clamp-2 uppercase tracking-wide group-hover:text-brand-gold-dark transition duration-150 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 line-clamp-3 leading-relaxed font-sans">
                    {item.excerpt}
                  </p>
                </div>
                <div className="p-6 pt-0 flex justify-between items-center text-xs font-bold text-brand-gold-dark group-hover:translate-x-1 transition duration-150">
                  <span>Read Article</span>
                  <ChevronRight className="w-4 h-4 shrink-0" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS SECTION */}
      <section className="py-20 bg-brand-blue text-white relative overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(#172A45_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10 animate-in fade-in duration-300">
          <span className="text-brand-gold text-xs font-bold uppercase font-mono tracking-widest block">
            Testimonials & Parent Voices
          </span>

          <div className="relative pt-6">
            <Quote className="w-12 h-12 text-brand-gold/20 mx-auto mb-4 animate-bounce" />
            
            <p className="text-base sm:text-xl lg:text-2xl text-gray-200 italic font-serif leading-relaxed max-w-2xl mx-auto px-4">
              "{TESTIMONIALS[activeTestimonialIdx].quote}"
            </p>

            <div className="mt-8 flex items-center justify-center space-x-4">
              <div className="w-12 h-12 rounded-full border-2 border-brand-gold bg-brand-blue overflow-hidden flex items-center justify-center text-brand-gold shrink-0">
                {TESTIMONIALS[activeTestimonialIdx].avatarUrl ? (
                  <img 
                    src={TESTIMONIALS[activeTestimonialIdx].avatarUrl} 
                    alt={TESTIMONIALS[activeTestimonialIdx].name} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Users className="w-6 h-6" />
                )}
              </div>
              <div className="text-left font-sans">
                <span className="block font-bold text-white text-sm md:text-base">
                  {TESTIMONIALS[activeTestimonialIdx].name}
                </span>
                <span className="text-xs text-brand-gold-light mt-0.5 block font-mono">
                  {TESTIMONIALS[activeTestimonialIdx].relationship}
                </span>
              </div>
            </div>
          </div>

          {/* Sizable Arrows navigation */}
          <div className="pt-4 flex items-center justify-center gap-4">
            <button 
              onClick={prevTestimonial}
              className="p-2.5 rounded-full bg-brand-blue-light hover:bg-brand-gold hover:text-brand-blue transition cursor-pointer"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5 shrink-0" />
            </button>
            <span className="text-xs font-mono text-gray-400">
              {activeTestimonialIdx + 1} / {TESTIMONIALS.length}
            </span>
            <button 
              onClick={nextTestimonial}
              className="p-2.5 rounded-full bg-brand-blue-light hover:bg-brand-gold hover:text-brand-blue transition cursor-pointer"
              aria-label="Next Testimonial"
            >
              <ChevronRightIcon className="w-5 h-5 shrink-0" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. NEWS ARTICLE MODAL */}
      {selectedNewsId && currentNews && (
        <div className="fixed inset-0 bg-brand-blue/70 backdrop-blur-sm flex items-center justify-center z-55 p-4 sm:p-6">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 md:p-8 shadow-2xl relative border border-gray-150 animate-in zoom-in-95 duration-150 max-h-[85vh] overflow-y-auto no-scrollbar font-sans text-brand-blue">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
              <span className="bg-brand-gray text-brand-blue font-bold px-3 py-1 rounded text-xs">
                {currentNews.category}
              </span>
              <button 
                onClick={() => setSelectedNewsId(null)}
                className="text-gray-400 hover:text-brand-blue cursor-pointer font-bold text-sm"
              >
                Close (X)
              </button>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-brand-blue tracking-tight leading-tight uppercase font-display mb-2">
              {currentNews.title}
            </h3>
            <span className="text-xs font-mono font-bold text-gray-400 block mb-4 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-brand-gold" />
              {currentNews.date}
            </span>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed font-sans mb-4 whitespace-pre-line">
              {currentNews.content}
            </p>
            <div className="pt-4 border-t border-gray-150 flex justify-end">
              <button 
                onClick={() => setSelectedNewsId(null)}
                className="bg-brand-blue hover:bg-brand-blue-light text-white font-bold py-2 px-6 rounded-lg text-xs"
              >
                Finished Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
