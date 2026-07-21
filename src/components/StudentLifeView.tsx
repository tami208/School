import React, { useState } from 'react';
import { 
  Compass, 
  Dribbble, 
  Tv, 
  Calendar, 
  Camera, 
  X, 
  ChevronLeft,
  ChevronRight, 
  Flag, 
  Users, 
  Trophy, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { GALLERY_PHOTOS } from '../data';

export default function StudentLifeView() {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Campus' | 'Sports' | 'Academic' | 'Arts' | 'Events'>('All');
  
  // Gallery lightbox states
  const [lightboxImageIdx, setLightboxImageIdx] = useState<number | null>(null);

  const categories = ['All', 'Campus', 'Sports', 'Academic', 'Arts', 'Events'] as const;

  const filteredPhotos = activeCategory === 'All'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter(photo => photo.category === activeCategory);

  const clubs = [
    {
      title: 'Young Inventors Robotics & AI',
      desc: 'Students design dynamic microcontrollers, map coordinate paths, and program autonomous rovers under STEM guidelines.',
      meeting: 'Wednesdays • Coding Lab Block B',
      coachedBy: 'Mr. David J. Sterling'
    },
    {
      title: 'Spelling Bee & Debate Union',
      desc: 'Refining public communication, rhetorical logic, and poise. Competes annually under private school debate circuits.',
      meeting: 'Mondays • Assembly Auditorium',
      coachedBy: 'Mrs. Cynthia Coker'
    },
    {
      title: 'Press & Editorial Syndicate',
      desc: 'Publishes our termly printed catalog, covering scientific write-ups, creative stories, poetry, and sports articles.',
      meeting: 'Thursdays • Media Room A',
      coachedBy: 'Mr. Joshua Alabi'
    },
    {
      title: 'Junior Executives Young Farmers',
      desc: 'Hands-on agricultural soil practices, organic nursery farming, weather pattern logging, and animal husbandry basics.',
      meeting: 'Tuesdays • Greenhouse Pavilion',
      coachedBy: 'Mrs. Chiazor-Uche'
    }
  ];

  const sportMatches = [
    { title: 'Inter-House Soccer Tournament', date: 'July 15, 2026', location: 'Main Athletic Grounds', type: 'Football' },
    { title: 'Seed Swim Gala Final', date: 'July 28, 2026', location: 'Olympic Swim Centre', type: 'Swimming' },
    { title: 'Secondary Basketball League (SS1-SS3)', date: 'August 05, 2026', location: 'Indoor Sports courts', type: 'Basketball' }
  ];

  const handleOpenLightbox = (imageUrl: string) => {
    const idx = GALLERY_PHOTOS.findIndex(photo => photo.imageUrl === imageUrl);
    if (idx !== -1) {
      setLightboxImageIdx(idx);
    }
  };

  const handleNextLightbox = () => {
    if (lightboxImageIdx === null) return;
    setLightboxImageIdx((prev) => (prev === GALLERY_PHOTOS.length - 1 ? 0 : prev! + 1));
  };

  const handlePrevLightbox = () => {
    if (lightboxImageIdx === null) return;
    setLightboxImageIdx((prev) => (prev === 0 ? GALLERY_PHOTOS.length - 1 : prev! - 1));
  };

  const activePhoto = lightboxImageIdx !== null ? GALLERY_PHOTOS[lightboxImageIdx] : null;

  return (
    <div className="w-full font-sans text-brand-blue bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Head Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-brand-gold font-bold uppercase tracking-wider text-[11px] font-mono block">
            Cultivating Passion & Creativity
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-blue tracking-tight leading-none font-display">
            Student Life
          </h1>
          <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
            Beyond academic textbooks. Find your interest within sports programs, elite robotic clubs, debate grids, and cultural excursions.
          </p>
        </div>

        {/* CLUBS AND SOCIETIES */}
        <div className="space-y-8">
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-mono font-bold text-brand-gold block font-mono">Extracurricular Communities</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-brand-blue tracking-tight font-display uppercase">
              Societies & Clubs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {clubs.map((club, idx) => (
              <div 
                key={idx} 
                className="bg-brand-gray border border-gray-150 p-6 md:p-8 rounded-3xl flex flex-col justify-between hover:border-brand-gold/60 hover:shadow-md transition duration-200"
              >
                <div className="space-y-3">
                  <span className="w-10 h-10 rounded-xl bg-brand-blue/5 text-brand-gold font-mono font-bold flex items-center justify-center text-xs">
                    0{idx + 1}
                  </span>
                  <h3 className="font-extrabold text-brand-blue text-base md:text-lg">
                    {club.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-650 leading-relaxed font-sans">
                    {club.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-200 mt-6 flex flex-wrap justify-between items-center text-[11px] text-gray-400 font-mono">
                  <span>Coached by: <strong>{club.coachedBy}</strong></span>
                  <span className="text-brand-gold font-medium bg-white border px-2.5 py-1 rounded-full">{club.meeting}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SPORTS FACILITIES & TOURNAMENTS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch pt-6" id="sports-section">
          
          {/* Left Sports intro - col span 5 */}
          <div className="lg:col-span-5 bg-brand-blue text-white p-8 rounded-3xl border border-brand-blue-light flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-brand-gold font-mono font-bold text-[10px] uppercase tracking-wider block">Athletics & physical focus</span>
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight font-display uppercase leading-tight text-brand-gold-light">
                Seed Sports & Athleticism
              </h3>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-sans">
                A sound mind resides within a sound body. Physical trainers handle safe cardio and teamwork habits inside our central football courts, tennis networks, and semi-Olympic size swimming pool area.
              </p>
            </div>

            <div className="p-4 bg-brand-blue-light border border-brand-blue-light/70 rounded-2xl flex items-center gap-3">
              <Trophy className="w-8 h-8 text-brand-gold shrink-0 animation-toggle" />
              <div className="text-xs font-sans">
                <span className="font-bold text-white block">Current champions of Private Swim cup!</span>
                <span className="text-gray-400">Winning records back-to-back 2024 & 2025</span>
              </div>
            </div>
          </div>

          {/* Right upcoming matches list - col span 7 */}
          <div className="lg:col-span-7 bg-brand-gray/40 border border-gray-150 p-6 md:p-8 rounded-3xl space-y-6 flex flex-col justify-center">
            <div>
              <span className="text-brand-gold font-mono font-bold text-[10px] uppercase tracking-widest block">Upcoming Tourney calendar</span>
              <h3 className="text-lg md:text-xl font-extrabold text-brand-blue font-display">Home Matches & Meets</h3>
            </div>

            <div className="space-y-3.5">
              {sportMatches.map((m, idx) => (
                <div key={idx} className="p-4 bg-white border border-gray-150 rounded-2xl flex justify-between items-center gap-4 text-xs font-sans shadow-sm">
                  <div className="space-y-1">
                    <span className="bg-brand-blue/5 text-brand-blue py-0.5 px-2 rounded font-bold uppercase tracking-wider text-[9px] font-mono">
                      {m.type} Meet
                    </span>
                    <span className="block font-bold text-brand-blue text-sm md:text-base leading-snug">{m.title}</span>
                    <span className="text-gray-400 block text-[11px] font-mono">Venue: {m.location}</span>
                  </div>
                  <span className="bg-brand-gold/15 text-brand-gold-dark border border-brand-gold/30 font-bold py-1.5 px-3 rounded-lg text-[10px] tracking-wide shrink-0">
                    {m.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* GALLERIES WITH FILTER AND LIGHTBOX */}
        <div id="gallery-grid-block" className="space-y-8 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div className="space-y-2">
              <span className="text-brand-gold font-bold uppercase tracking-wider text-[11px] font-mono block">
                Visual Campus Tour
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-brand-blue tracking-tight leading-none font-display uppercase">
                Activity Gallery
              </h2>
            </div>
            
            {/* Gallery select tabs */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 border rounded-full text-xs font-semibold transition ${
                    activeCategory === cat 
                      ? 'bg-brand-blue border-brand-blue text-brand-gold' 
                      : 'bg-white border-gray-200 text-gray-500 hover:border-brand-gold'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Photo layout grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo) => (
              <div 
                key={photo.id}
                onClick={() => handleOpenLightbox(photo.imageUrl)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-gray-150 cursor-pointer shadow-sm hover:shadow-xl hover:border-brand-gold/45 transition duration-300 bg-brand-gray"
              >
                {/* Photo image */}
                {photo.imageUrl ? (
                  <img 
                    src={photo.imageUrl} 
                    alt={photo.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="absolute inset-0 bg-brand-blue/5 flex flex-col items-center justify-center text-slate-400 p-4 text-center gap-1.5 bg-brand-gray group-hover:scale-104 transition duration-300">
                    <Camera className="w-8 h-8 text-brand-gold/65" />
                    <span className="text-[9px] font-mono select-none uppercase">Campus Media Block</span>
                  </div>
                )}
                
                {/* Visual hover detail card overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/90 via-brand-blue/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 p-5 flex flex-col justify-end text-left text-white">
                  <span className="text-[10px] font-mono text-brand-gold font-semibold uppercase tracking-widest block mb-0.5">
                    {photo.category} Category
                  </span>
                  <h4 className="font-bold text-xs sm:text-sm truncate">
                    {photo.title}
                  </h4>
                  <span className="text-[10px] text-gray-300 block font-sans mt-1 flex items-center gap-1">
                    <Camera className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                    Expand full image
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* GALLERY PHOTO LIGHTBOX POPUP MODAL */}
      {activePhoto && lightboxImageIdx !== null && (
        <div className="fixed inset-0 bg-brand-blue/85 backdrop-blur-sm flex items-center justify-center z-55 p-4 sm:p-6">
          <div className="w-full max-w-4xl rounded-2xl overflow-hidden relative animate-in zoom-in-95 duration-200">
            {/* Close trigger button */}
            <button 
              onClick={() => setLightboxImageIdx(null)}
              className="absolute top-4 right-4 z-50 bg-brand-blue/70 text-white rounded-full p-2 hover:bg-brand-gold hover:text-brand-blue transition cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5 shrink-0" />
            </button>

            {/* Sizable Image */}
            <div className="relative aspect-[16/9] bg-brand-blue flex items-center justify-center overflow-hidden">
              {activePhoto.imageUrl ? (
                <img 
                  src={activePhoto.imageUrl} 
                  alt={activePhoto.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center text-brand-gold font-mono gap-2 p-6 bg-brand-blue/90">
                  <Camera className="w-12 h-12 text-brand-gold/80" />
                  <span className="text-sm">VIRTUAL CAMPUS VIEW</span>
                </div>
              )}

              {/* Prev / Next navigation arrow helpers inside lightbox */}
              <button 
                onClick={handlePrevLightbox}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-brand-blue/65 text-white p-2.5 rounded-full hover:bg-brand-gold hover:text-brand-blue transition cursor-pointer"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5 shrink-0" />
              </button>
              <button 
                onClick={handleNextLightbox}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-brand-blue/65 text-white p-2.5 rounded-full hover:bg-brand-gold hover:text-brand-blue transition cursor-pointer"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5 shrink-0" />
              </button>
            </div>

            {/* Image title details panel */}
            <div className="bg-white p-5 text-left flex justify-between items-center gap-4 text-brand-blue border-t border-gray-100 font-sans">
              <div className="space-y-1">
                <span className="bg-brand-gold/15 text-brand-gold-dark font-mono font-bold text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-block">
                  {activePhoto.category}
                </span>
                <p className="font-extrabold text-sm md:text-base">{activePhoto.title}</p>
              </div>
              <span className="text-xs font-mono text-gray-400">
                {lightboxImageIdx + 1} / {GALLERY_PHOTOS.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
