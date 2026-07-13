import React, { useState } from 'react';
import { Award, Eye, FileBadge, CheckCircle, GraduationCap, Users, History, Bookmark, Sparkles, ChevronRight, Check, Image, X } from 'lucide-react';
import { SCHOOL_INFO, LEADERSHIP } from '../data';
import InteractiveMap from './InteractiveMap';

interface GalleryImage {
  url: string;
  category: 'Campus & Labs' | 'Sports & Athletics' | 'Student Life & Arts' | 'Academic Events';
  title: string;
  description: string;
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600',
    category: 'Campus & Labs',
    title: 'Modern Science Laboratory',
    description: 'Fully equipped biochemistry and physics workspaces for practical evaluations.'
  },
  {
    url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600',
    category: 'Campus & Labs',
    title: 'Robotics & STEAM Hub',
    description: 'Developing microprocessor logic, autonomous kits, and block integrations.'
  },
  {
    url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=600',
    category: 'Campus & Labs',
    title: 'Goldbridge Research Library',
    description: 'Quiet study capsules hosting 30,000+ curriculum volumes and online papers.'
  },
  {
    url: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a27?auto=format&fit=crop&q=80&w=600',
    category: 'Sports & Athletics',
    title: 'Inter-House Soccer Field',
    description: 'Synthetic high-traction turf hosting our termly football championships.'
  },
  {
    url: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=600',
    category: 'Sports & Athletics',
    title: 'Track & Field Trials',
    description: 'Developing speed, persistence, and teamwork during co-curricular sports hour.'
  },
  {
    url: 'https://images.unsplash.com/photo-1476525884685-e322b514f01f?auto=format&fit=crop&q=80&w=600',
    category: 'Sports & Athletics',
    title: 'Olympic Swim Center',
    description: 'Heated semi-Olympic pool with professional trainers guiding critical strokes.'
  },
  {
    url: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=600',
    category: 'Student Life & Arts',
    title: 'Fine Arts & Craft Exhibition',
    description: 'A vibrant showcase of local Nigerian pottery, textiles, and watercolor canvases.'
  },
  {
    url: 'https://images.unsplash.com/photo-1516280440614-37939bbacd6a?auto=format&fit=crop&q=80&w=600',
    category: 'Student Life & Arts',
    title: 'Music & Performance Assembly',
    description: 'Developing violin, recorder, and piano mastery alongside traditional drumming.'
  },
  {
    url: 'https://images.unsplash.com/photo-1453733190148-c44698c26588?auto=format&fit=crop&q=80&w=600',
    category: 'Student Life & Arts',
    title: 'Literary & Debate Club',
    description: 'Polishing grammar, persuasive arguments, and public composure.'
  },
  {
    url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600',
    category: 'Academic Events',
    title: 'Annual Graduation Ceremony',
    description: 'Celebrating high-achieving scholars as they step out to conquer premier academic ports.'
  },
  {
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600',
    category: 'Academic Events',
    title: 'Auditorium Spelling Bee',
    description: 'A suspenseful, competitive termly language test in Goldbridge assembly hall.'
  },
  {
    url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600',
    category: 'Academic Events',
    title: 'Honors & Merit Award Night',
    description: 'Recognizing academic brilliance, neatness, leadership milestones, and sportsmanship.'
  }
];

export default function AboutView() {
  const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Campus & Labs' | 'Sports & Athletics' | 'Student Life & Arts' | 'Academic Events'>('All');
  const [zoomedImage, setZoomedImage] = useState<GalleryImage | null>(null);

  const activeStaff = LEADERSHIP.find(member => member.id === selectedStaffId);

  return (
    <div className="w-full font-sans text-brand-blue bg-white py-12 md:py-16">
      {/* 1. HEADER HERO BANNER & MISSION/VISION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-brand-gold font-bold uppercase tracking-wider text-[11px] font-mono block">
            Establishing Global Standards
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-blue tracking-tight leading-none font-display">
            About Our Institution
          </h1>
          <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
            Founded with an unyielding mandate to raise high-achieving corporate, creative and scientific change leaders.
          </p>
          <div className="pt-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <button 
              onClick={() => setIsGalleryOpen(true)}
              className="bg-brand-blue hover:bg-brand-blue-light text-brand-gold hover:text-white font-extrabold px-6 py-2.5 rounded-full text-xs transition-all duration-200 hover:scale-103 active:scale-97 shadow-md flex items-center gap-2 mx-auto cursor-pointer border border-brand-gold/30 hover:border-white/30"
              id="view-gallery-button"
            >
              <Image className="w-3.5 h-3.5" />
              <span>Browse Academy Gallery</span>
            </button>
          </div>
        </div>

        {/* Core Vision & Mission Cards split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          {/* Mission Card */}
          <div className="bg-brand-gray rounded-3xl p-8 border border-gray-150 flex flex-col justify-between items-start space-y-6 relative overflow-hidden group hover:border-brand-gold/60 transition duration-300">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-brand-gold/15 text-brand-gold-dark rounded-2xl flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-extrabold text-brand-blue tracking-tight font-display font-display">
                Our Mission Charter
              </h2>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed font-sans">
                {SCHOOL_INFO.mission}
              </p>
            </div>
            <span className="text-xs font-mono font-bold uppercase text-brand-gold">
              ● Committed Since 2005
            </span>
          </div>

          {/* Vision Card */}
          <div className="bg-brand-blue text-white rounded-3xl p-8 border border-brand-blue-light flex flex-col justify-between items-start space-y-6 relative overflow-hidden group hover:border-brand-gold/60 transition duration-300">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-white/10 text-brand-gold rounded-2xl flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight font-display font-display text-brand-gold-light">
                Our Strategic Vision
              </h2>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed font-sans">
                {SCHOOL_INFO.vision}
              </p>
            </div>
            <span className="text-xs font-mono font-bold uppercase text-brand-gold">
              ● Worldwide Impact Goal
            </span>
          </div>
        </div>

        {/* History Block */}
        <div className="bg-white border border-gray-150 rounded-3xl p-8 md:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" id="history-section">
          <div className="lg:col-span-4 space-y-4">
            <span className="text-brand-gold font-bold uppercase tracking-wider text-xs font-mono block flex items-center gap-1">
              <History className="w-4 h-4 text-brand-gold" />
              Two Decades of Excellence
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-brand-blue tracking-tight leading-tight uppercase font-display">
              School History & Evolution
            </h3>
            <p className="text-xs md:text-sm text-gray-500 font-sans leading-relaxed">
              Discover how a modest community nursery transformed into one of Nigeria’s most prestigious k-12 independent colleges.
            </p>
          </div>
          <div className="lg:col-span-8 bg-brand-gray p-6 rounded-2xl border border-gray-150 relative">
            <p className="text-sm text-gray-600 font-sans leading-relaxed whitespace-pre-line">
              {SCHOOL_INFO.history}
            </p>
            <div className="mt-4 pt-4 border-t border-gray-250 flex flex-wrap gap-4 text-xs font-mono font-bold text-gray-400">
              <span>ESTD: {SCHOOL_INFO.established}</span>
              <span>•</span>
              <span>20+ ACCREDITATIONS</span>
              <span>•</span>
              <span>ALUMNI ACROSS 14 COUNTRIES</span>
            </div>
          </div>
        </div>

        {/* INTERACTIVE BLUEPRINT */}
        <div id="blueprint-section" className="pt-6">
          <InteractiveMap />
        </div>

        {/* LEADERSHIP DIRECTORY & FACULTY STAFF */}
        <div className="pt-12 space-y-8" id="leadership-section">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-brand-gold font-bold uppercase tracking-wider text-[11px] font-mono block">
              Academicians & Administrators
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-brand-blue tracking-tight font-display uppercase">
              Our Leadership Board
            </h3>
            <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-sans">
              Goldbridge Academy’s administrative projects are guided by internationally certified educators holding honors from elite global institutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {LEADERSHIP.map((member) => (
              <div 
                key={member.id}
                onClick={() => setSelectedStaffId(member.id)}
                className="bg-white rounded-2xl border border-gray-150 hover:border-brand-gold hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  {/* Staff Image */}
                  <div className="aspect-[4/3] bg-brand-gray relative overflow-hidden">
                    {member.imageUrl ? (
                      <img 
                        src={member.imageUrl} 
                        alt={member.name} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 gap-1 font-mono text-[10px] p-4 text-center">
                        <Users className="w-8 h-8 text-brand-gold/60" />
                        <span>{member.name}</span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-brand-blue text-brand-gold text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                      ADMINISTRATOR
                    </div>
                  </div>
                  {/* Name and Qualifications panel */}
                  <div className="p-6 space-y-2 font-sans">
                    <h4 className="font-extrabold text-brand-blue text-base md:text-lg group-hover:text-brand-gold-dark transition">
                      {member.name}
                    </h4>
                    <p className="text-brand-gold-dark font-bold text-xs font-sans">
                      {member.role}
                    </p>
                    <p className="text-xs text-gray-400 line-clamp-1 italic">
                      {member.qualification}
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0 flex justify-between items-center text-xs font-bold text-gray-500 group-hover:text-brand-gold transition duration-150">
                  <span>View Full bio Profile</span>
                  <ChevronRight className="w-4 h-4 text-brand-gold" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LEADERSHIP BIO LIGHTBOX POPUP */}
      {selectedStaffId && activeStaff && (
        <div className="fixed inset-0 bg-brand-blue/70 backdrop-blur-sm flex items-center justify-center z-55 p-4 sm:p-6">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative border border-gray-150 animate-in zoom-in-95 duration-150 max-h-[85vh] overflow-y-auto no-scrollbar font-sans text-brand-blue flex flex-col justify-between gap-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="text-brand-gold font-bold uppercase tracking-wider text-[10px] font-mono">
                Staff Credentials Dossier
              </span>
              <button 
                onClick={() => setSelectedStaffId(null)}
                className="text-gray-400 hover:text-brand-blue cursor-pointer font-extrabold text-sm"
              >
                Close (X)
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 items-start">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl shrink-0 border border-brand-gold bg-brand-gray overflow-hidden flex flex-col items-center justify-center text-brand-gold">
                {activeStaff.imageUrl ? (
                  <img 
                    src={activeStaff.imageUrl} 
                    alt={activeStaff.name} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Users className="w-8 h-8" />
                )}
              </div>
              <div className="space-y-1.5">
                <h4 className="font-extrabold text-brand-blue text-base sm:text-lg">
                  {activeStaff.name}
                </h4>
                <p className="text-xs bg-brand-gold/10 text-brand-gold-dark font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-block font-bold">
                  {activeStaff.role}
                </p>
                <p className="text-[11px] text-gray-500 leading-normal font-sans">
                  <strong>Qualifications:</strong> {activeStaff.qualification}
                </p>
              </div>
            </div>

            <div className="p-4 bg-brand-gray rounded-xl border border-gray-150">
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed text-left italic">
                "{activeStaff.bio}"
              </p>
            </div>

            <div className="flex justify-between items-center text-xs font-mono text-gray-400 pt-3 border-t border-gray-100">
              <span>Goldbridge Staff Board</span>
              <button 
                onClick={() => setSelectedStaffId(null)}
                className="bg-brand-blue hover:bg-brand-blue-light text-white font-bold px-6 py-2 rounded-lg text-xs"
              >
                Finished
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GALLERY MULTI-CATEGORY LIGHTBOX POPUP */}
      {isGalleryOpen && (
        <div className="fixed inset-0 bg-brand-blue/80 backdrop-blur-md flex items-center justify-center z-55 p-4 sm:p-6 animate-in fade-in duration-205">
          <div className="bg-white rounded-3xl max-w-5xl w-full p-6 md:p-8 shadow-2xl relative border border-gray-150 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto no-scrollbar font-sans text-brand-blue flex flex-col justify-between gap-6">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2">
                <Image className="w-5 h-5 text-brand-gold animate-pulse" />
                <h3 className="text-lg md:text-xl font-extrabold tracking-tight font-display text-brand-blue uppercase">
                  Goldbridge Academy Gallery
                </h3>
              </div>
              <button 
                onClick={() => {
                  setIsGalleryOpen(false);
                  setZoomedImage(null);
                }}
                className="text-gray-400 hover:text-brand-blue cursor-pointer font-extrabold text-sm p-1 hover:bg-brand-gray rounded-full transition"
                aria-label="Close Gallery"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 pb-2">
              {(['All', 'Campus & Labs', 'Sports & Athletics', 'Student Life & Arts', 'Academic Events'] as const).map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition active:scale-95 cursor-pointer border ${
                      isSelected
                        ? 'bg-brand-blue text-brand-gold border-brand-blue shadow-sm'
                        : 'bg-brand-gray text-gray-600 border-gray-200 hover:border-brand-gold-dark'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Images Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 overflow-y-auto pr-1">
              {GALLERY_IMAGES.filter(img => selectedCategory === 'All' || img.category === selectedCategory).map((img, idx) => (
                <div 
                  key={idx}
                  onClick={() => setZoomedImage(img)}
                  className="group bg-brand-gray rounded-2xl border border-gray-150 hover:border-brand-gold hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
                >
                  <div className="aspect-[4/3] bg-gray-250 relative overflow-hidden">
                    {img.url ? (
                      <img 
                        src={img.url} 
                        alt={img.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-brand-blue/5 flex flex-col items-center justify-center text-slate-400 p-4 text-center gap-1.5">
                        <Image className="w-8 h-8 text-brand-gold/65" />
                        <span className="text-[9px] font-mono select-none">Media Block</span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-brand-blue/90 backdrop-blur-sm text-brand-gold text-[9px] font-mono font-bold px-2 py-0.5 rounded">
                      {img.category}
                    </div>
                  </div>
                  <div className="p-4 space-y-1">
                    <h4 className="font-extrabold text-brand-blue text-sm group-hover:text-brand-gold-dark transition duration-150">
                      {img.title}
                    </h4>
                    <p className="text-[11px] text-gray-500 leading-normal line-clamp-2">
                      {img.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty view option */}
            {GALLERY_IMAGES.filter(img => selectedCategory === 'All' || img.category === selectedCategory).length === 0 && (
              <div className="text-center py-12 text-gray-400">
                No images found in this category.
              </div>
            )}

            {/* Bottom Footer block */}
            <div className="flex justify-between items-center text-[10px] font-mono text-gray-400 pt-3 border-t border-gray-100">
              <span>Goldbridge Interactive Media Center</span>
              <span>© {new Date().getFullYear()} Goldbridge Academy</span>
            </div>
            
          </div>
        </div>
      )}

      {/* ZOOMED SINGLE IMAGE LIGHTBOX POPUP */}
      {zoomedImage && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-56 p-4 animate-in fade-in duration-200">
          <div className="max-w-3xl w-full relative space-y-4 text-white">
            <button 
              onClick={() => setZoomedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-brand-gold cursor-pointer font-bold text-sm bg-white/10 p-2 rounded-full backdrop-blur-sm transition flex items-center justify-center"
              aria-label="Close Zoom"
            >
              <X className="w-5 h-5 pointer-events-none" />
            </button>
            <div className="aspect-[16:10] sm:aspect-[16:9] w-full rounded-2xl overflow-hidden border border-white/20 bg-black text-center relative shadow-2xl flex items-center justify-center">
              {zoomedImage.url ? (
                <img 
                  src={zoomedImage.url} 
                  alt={zoomedImage.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center text-brand-gold gap-2 p-6 bg-brand-blue/90 font-mono">
                  <Image className="w-12 h-12 text-brand-gold/80" />
                  <span className="text-sm">VIRTUAL MEDIA PREVIEW</span>
                </div>
              )}
            </div>
            <div className="space-y-1.5 px-2">
              <span className="text-brand-gold font-mono font-bold text-xs uppercase tracking-wider block">
                {zoomedImage.category}
              </span>
              <h4 className="font-extrabold font-display text-lg sm:text-xl text-white">
                {zoomedImage.title}
              </h4>
              <p className="text-xs sm:text-sm text-gray-300 leading-normal">
                {zoomedImage.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
