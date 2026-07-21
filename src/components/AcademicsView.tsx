import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Target, 
  Music, 
  Sparkles, 
  Clock, 
  ChevronRight, 
  CheckCircle2, 
  Layers, 
  FileCheck 
} from 'lucide-react';
import { ACADEMIC_PROGRAMS } from '../data';
import { PRIMARY_GRADES, JUNIOR_SECONDARY_GRADES, SENIOR_SECONDARY_GRADES } from '../academicGrades';

interface AcademicsViewProps {
  selectedProgramId: string;
  setSelectedProgramId: (id: string) => void;
}

export default function AcademicsView({ selectedProgramId, setSelectedProgramId }: AcademicsViewProps) {
  const [selectedPrimaryIdx, setSelectedPrimaryIdx] = useState(0);
  const [selectedJssIdx, setSelectedJssIdx] = useState(0);
  const [selectedSssIdx, setSelectedSssIdx] = useState(0);
  
  // Default to selecting kindergarten if invalid
  useEffect(() => {
    if (!selectedProgramId) {
      setSelectedProgramId('kindergarten');
    }
  }, [selectedProgramId, setSelectedProgramId]);

  const activeProgram = ACADEMIC_PROGRAMS.find(p => p.id === selectedProgramId) || ACADEMIC_PROGRAMS[0];

  let displayName = activeProgram.name;
  let displayAgeRange = activeProgram.ageRange;
  let displayOverview = activeProgram.overview;
  let displayCurriculum = activeProgram.curriculum;
  let displayObjectives = activeProgram.objectives;

  if (activeProgram.id === 'primary') {
    const activeSub = PRIMARY_GRADES[selectedPrimaryIdx] || PRIMARY_GRADES[0];
    displayName = activeSub.name;
    displayAgeRange = activeSub.ageRange;
    displayOverview = activeSub.overview;
    displayCurriculum = activeSub.curriculum;
    displayObjectives = activeSub.objectives;
  } else if (activeProgram.id === 'jss') {
    const activeSub = JUNIOR_SECONDARY_GRADES[selectedJssIdx] || JUNIOR_SECONDARY_GRADES[0];
    displayName = activeSub.name;
    displayAgeRange = activeSub.ageRange;
    displayOverview = activeSub.overview;
    displayCurriculum = activeSub.curriculum;
    displayObjectives = activeSub.objectives;
  } else if (activeProgram.id === 'sss') {
    const activeSub = SENIOR_SECONDARY_GRADES[selectedSssIdx] || SENIOR_SECONDARY_GRADES[0];
    displayName = activeSub.name;
    displayAgeRange = activeSub.ageRange;
    displayOverview = activeSub.overview;
    displayCurriculum = activeSub.curriculum;
    displayObjectives = activeSub.objectives;
  }

  const handleTabChange = (programId: string) => {
    setSelectedProgramId(programId);
    // Scroll program details into view on mobile
    const el = document.getElementById('academic-focused-details');
    if (el && window.innerWidth < 1024) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full font-sans text-brand-blue bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header segment */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-brand-gold font-bold uppercase tracking-wider text-[11px] font-mono block">
            Academic Excellence Framework
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-blue tracking-tight leading-none font-display">
            Syllabus & Curriculums
          </h1>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-sans max-w-xl mx-auto">
            From toddlers embarking on letters, to college seniors prepping for WAEC and SAT, our pedagogy delivers personalized growth.
          </p>
        </div>

        {/* Bento grid split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left menu column of 4 columns width */}
          <div className="lg:col-span-4 bg-brand-gray border border-gray-150 p-6 rounded-3xl space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider font-mono px-3">
              Enrollment Pathways
            </h3>
            <div className="flex flex-col gap-2">
              {ACADEMIC_PROGRAMS.map((program) => {
                const isSelected = program.id === activeProgram.id;
                return (
                  <button
                    key={program.id}
                    id={`academic-btn-${program.id}`}
                    onClick={() => handleTabChange(program.id)}
                    className={`w-full text-left p-4 rounded-2xl font-bold text-sm tracking-wide transition-all duration-200 flex items-center justify-between group active:scale-98 ${
                      isSelected 
                        ? 'bg-brand-blue text-white shadow-lg border border-brand-blue-light' 
                        : 'bg-white hover:bg-gray-50 text-brand-blue border border-gray-150 hover:border-brand-gold/40'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className={`${isSelected ? 'text-brand-gold' : 'text-gray-900'} font-extrabold`}>
                        {program.name}
                      </span>
                      <span className={`text-[10px] font-mono font-medium ${isSelected ? 'text-gray-300' : 'text-gray-400'}`}>
                        Age: {program.ageRange}
                      </span>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition ${
                      isSelected ? 'text-brand-gold translate-x-1' : 'text-gray-400 group-hover:translate-x-1'
                    }`} />
                  </button>
                );
              })}
            </div>

            {/* Quick brochure alert */}
            <div className="p-4 bg-brand-gold/10 border border-brand-gold/20 rounded-2xl text-xs text-brand-blue/90 space-y-2">
              <span className="font-bold block text-brand-gold-dark">Curriculum Accords:</span>
              <p className="leading-relaxed text-gray-600">
                Seed Academy matches the Nigerian National Curriculum with prestigious British Early Years Foundation Stages (EYFS) standards.
              </p>
            </div>
          </div>

          {/* Right main column with content details */}
          <div 
            id="academic-focused-details"
            className="lg:col-span-8 bg-white border border-gray-150 rounded-3xl p-6 md:p-10 shadow-sm space-y-8 animate-in fade-in duration-300"
          >
            {/* Split Grade selectors for Primary */}
            {activeProgram.id === 'primary' && (
              <div className="bg-brand-gray border border-gray-150 p-4 rounded-2xl space-y-3">
                <span className="text-[10px] font-mono font-extrabold text-brand-blue/70 uppercase tracking-widest block">
                  ✦ Select Specific Grade Level:
                </span>
                <div className="flex flex-wrap gap-2">
                  {PRIMARY_GRADES.map((grade, idx) => {
                    const isCurSel = selectedPrimaryIdx === idx;
                    return (
                      <button
                        key={grade.id}
                        onClick={() => setSelectedPrimaryIdx(idx)}
                        className={`px-3.5 py-2 rounded-xl font-bold text-xs transition active:scale-95 cursor-pointer border ${
                          isCurSel 
                            ? 'bg-brand-gold text-brand-blue border-brand-gold shadow-sm' 
                            : 'bg-white text-gray-600 border-gray-200 hover:border-brand-gold-dark'
                        }`}
                      >
                        {grade.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Split Grade selectors for JSS */}
            {activeProgram.id === 'jss' && (
              <div className="bg-brand-gray border border-gray-150 p-4 rounded-2xl space-y-3">
                <span className="text-[10px] font-mono font-extrabold text-brand-blue/70 uppercase tracking-widest block">
                  Select Specific Grade Level:
                </span>
                <div className="flex flex-wrap gap-2">
                  {JUNIOR_SECONDARY_GRADES.map((grade, idx) => {
                    const isCurSel = selectedJssIdx === idx;
                    return (
                      <button
                        key={grade.id}
                        onClick={() => setSelectedJssIdx(idx)}
                        className={`px-3.5 py-2 rounded-xl font-bold text-xs transition active:scale-95 cursor-pointer border ${
                          isCurSel 
                            ? 'bg-brand-gold text-brand-blue border-brand-gold shadow-sm' 
                            : 'bg-white text-gray-650 border-gray-200 hover:border-brand-gold-dark'
                        }`}
                      >
                        {grade.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Split Grade selectors for SSS */}
            {activeProgram.id === 'sss' && (
              <div className="bg-brand-gray border border-gray-150 p-4 rounded-2xl space-y-3">
                <span className="text-[10px] font-mono font-extrabold text-brand-blue/70 uppercase tracking-widest block">
                  Select Specific Grade Level:
                </span>
                <div className="flex flex-wrap gap-2">
                  {SENIOR_SECONDARY_GRADES.map((grade, idx) => {
                    const isCurSel = selectedSssIdx === idx;
                    return (
                      <button
                        key={grade.id}
                        onClick={() => setSelectedSssIdx(idx)}
                        className={`px-3.5 py-2 rounded-xl font-bold text-xs transition active:scale-95 cursor-pointer border ${
                          isCurSel 
                            ? 'bg-brand-gold text-brand-blue border-brand-gold shadow-sm' 
                            : 'bg-white text-gray-650 border-gray-200 hover:border-brand-gold-dark'
                        }`}
                      >
                        {grade.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Top overview title block */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-b border-gray-100 pb-8">
              <div className="space-y-4">
                <span className="inline-block bg-brand-gold/10 text-brand-gold-dark font-mono font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
                  Target Group: {displayAgeRange}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-blue font-display leading-tight uppercase">
                  {displayName} Syllabus
                </h2>
                <p className="text-xs sm:text-sm text-gray-650 leading-relaxed font-sans">
                  {displayOverview}
                </p>
              </div>

              {/* Portrait/cover matching aspect ratio */}
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-gray-200 bg-brand-gray relative shadow-md">
                {activeProgram.imageUrl ? (
                  <img 
                    src={activeProgram.imageUrl} 
                    alt={displayName} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 gap-2 p-6 text-center bg-brand-gray">
                    <BookOpen className="w-12 h-12 text-brand-gold/60" />
                    <span className="text-xs font-mono select-none uppercase">Syllabus Media Block</span>
                  </div>
                )}
              </div>
            </div>

            {/* Down content modules: Syllabus curriculum and learning objectives */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Module 1: Curriculum stream */}
              <div className="space-y-4">
                <h3 className="font-bold text-brand-blue text-sm uppercase tracking-wider flex items-center gap-2 font-mono">
                  <Layers className="w-4 h-4 text-brand-gold shrink-0" />
                  Key Subjects & Curriculum
                </h3>
                <ul className="space-y-2.5">
                  {displayCurriculum.map((subj, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                      <span>{subj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Module 2: Learning Outcomes */}
              <div className="space-y-4">
                <h3 className="font-bold text-brand-blue text-sm uppercase tracking-wider flex items-center gap-2 font-mono">
                  <Target className="w-4 h-4 text-brand-gold shrink-0" />
                  Development Objectives
                </h3>
                <ul className="space-y-2.5">
                  {displayObjectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-gray-600">
                      <span className="w-5 h-5 rounded-full bg-brand-blue/5 text-brand-blue text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sizable Extracurricular row indicator */}
            <div className="border-t border-gray-100 pt-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-brand-gray/30 -mx-6 -mb-6 p-6 md:p-10 rounded-b-3xl">
              <div className="space-y-3">
                <h4 className="font-bold text-brand-blue text-sm uppercase tracking-wider flex items-center gap-2 font-sans font-mono">
                  <Music className="w-4 h-4 text-brand-gold shrink-0" />
                  Extracurricular Activities
                </h4>
                <div className="flex flex-wrap gap-2 pt-1 font-sans">
                  {activeProgram.extracurriculars.map((act, i) => (
                    <span 
                      key={i} 
                      className="bg-white border border-gray-150 text-brand-blue text-xs font-semibold px-3 py-1.5 rounded-full hover:border-brand-gold transition cursor-default"
                    >
                      {act}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-brand-blue text-sm uppercase tracking-wider flex items-center gap-2 font-sans font-mono">
                  <Sparkles className="w-4 h-4 text-brand-gold shrink-0" />
                  Leadership & Growth Opportunities
                </h4>
                <div className="flex flex-wrap gap-2 pt-1 font-sans">
                  {activeProgram.developmentOpportunities.map((opp, i) => (
                    <span 
                      key={i} 
                      className="bg-brand-blue/5 text-brand-blue text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-brand-blue hover:text-white transition cursor-default"
                    >
                      {opp}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
