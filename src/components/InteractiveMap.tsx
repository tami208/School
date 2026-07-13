import React, { useState } from 'react';
import { MapPin, Info, Users, Clock, Compass } from 'lucide-react';

interface MapZone {
  id: string;
  name: string;
  description: string;
  coordinator: string;
  capacity: string;
  builtYear: string;
  highlightColor: string;
  svgPath: string; // fallback shape reference
  coordinates: { x: number; y: number; w: number; h: number }; 
}

export default function InteractiveMap() {
  const [selectedZoneId, setSelectedZoneId] = useState<string>('zone-1');

  const zones: MapZone[] = [
    {
      id: 'zone-1',
      name: 'Dr. Beatrice Science & Coding Complex',
      description: 'Houses our physics, chemistry, biology, as well as VR and robotics studios. Features state-of-the-art diagnostic sensors, logic microcontrollers, and 30 Virtual Reality terminals.',
      coordinator: 'Mr. David J. Sterling',
      capacity: '350 Students',
      builtYear: '2019',
      highlightColor: 'fill-emerald-100/50 stroke-emerald-500 hover:fill-emerald-200/50',
      svgPath: '', 
      coordinates: { x: 40, y: 30, w: 110, h: 70 }
    },
    {
      id: 'zone-2',
      name: 'Sterling Administration & Registry Block',
      description: 'The administrative heart of the campus. Includes parent reception tables, registration services, primary bursar, proprietary board offices, and staff meeting suites.',
      coordinator: 'Mrs. Cynthia Coker (Registrar)',
      capacity: '120 Visitors/Staff',
      builtYear: '2005',
      highlightColor: 'fill-indigo-100/50 stroke-indigo-500 hover:fill-indigo-200/50',
      svgPath: '',
      coordinates: { x: 190, y: 30, w: 100, h: 70 }
    },
    {
      id: 'zone-3',
      name: 'Early Years Play & Learn Pavilion',
      description: 'Curated specifically for our Kindergarten and Nursery kids. Designed with round corner tables, shock-absorbent safety rubber flooring, puppet playhouses, and modular toy sets.',
      coordinator: 'Mrs. Abigail Chiazor-Uche',
      capacity: '200 Toddlers',
      builtYear: '2012',
      highlightColor: 'fill-amber-100/50 stroke-amber-500 hover:fill-amber-200/50',
      svgPath: '',
      coordinates: { x: 40, y: 130, w: 130, h: 70 }
    },
    {
      id: 'zone-4',
      name: 'Goldbridge Memorial Arena & Swim Center',
      description: 'Our sports infrastructure base: Semi-Olympic size heated swimming pool, 300-seater stadium stands, indoor table tennis deck, synthetic football fields, and double basketball courts.',
      coordinator: 'Coach Festus Okoye',
      capacity: '440 Athletes',
      builtYear: '2016',
      highlightColor: 'fill-rose-100/50 stroke-rose-500 hover:fill-rose-200/50',
      svgPath: '',
      coordinates: { x: 40, y: 230, w: 250, h: 80 }
    },
    {
      id: 'zone-5',
      name: 'Central Knowledge Library & Assembly Hall',
      description: 'Accommodates 30,000+ volumes, scientific review journals, quiet study capsules, and our multi-functional auditorium hosting the annual spelling bees and Model United Nations.',
      coordinator: 'Mr. Joshua Alabi (Chief Librarian)',
      capacity: '600 Seats',
      builtYear: '2008',
      highlightColor: 'fill-sky-100/50 stroke-sky-500 hover:fill-sky-200/50',
      svgPath: '',
      coordinates: { x: 190, y: 130, w: 100, h: 70 }
    }
  ];

  const currentZone = zones.find(z => z.id === selectedZoneId) || zones[0];

  return (
    <div className="bg-white rounded-2xl border border-gray-150 p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-2.5 mb-6">
        <Compass className="w-6 h-6 text-brand-gold" />
        <div>
          <h3 className="font-extrabold text-brand-blue text-xl leading-tight">Interactive Campus Blueprint</h3>
          <p className="text-xs text-gray-500">Click on any section of our map to explore high-tier facilities</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Interactive SVG Diagram */}
        <div className="lg:col-span-7 flex items-center justify-center bg-brand-gray border border-gray-100 p-4 md:p-6 rounded-xl relative max-w-full overflow-x-auto no-scrollbar">
          <svg 
            viewBox="0 0 330 340" 
            className="w-full max-w-md h-auto select-none shrink-0" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background elements */}
            <rect width="330" height="340" rx="16" fill="#F8F9FA" />
            <path d="M40 115 H290 M180 30 V310" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="4,4" />

            {/* Loop through Zones to draw stylized interactive compartments */}
            {zones.map((zone) => {
              const isSelected = zone.id === selectedZoneId;
              const { x, y, w, h } = zone.coordinates;
              return (
                <g 
                  key={zone.id} 
                  onClick={() => setSelectedZoneId(zone.id)} 
                  className="cursor-pointer group"
                >
                  <rect 
                    x={x} 
                    y={y} 
                    width={w} 
                    height={h} 
                    rx="12" 
                    className={`transition duration-200 stroke-2 ${zone.highlightColor} ${
                      isSelected ? 'fill-brand-gold/15 stroke-brand-gold filter drop-shadow-md' : 'shadow-sm'
                    }`} 
                  />
                  {/* Small circle indicator */}
                  <circle 
                    cx={x + 20} 
                    cy={y + 20} 
                    r="8" 
                    className={`${isSelected ? 'fill-brand-gold' : 'fill-brand-blue'} transition duration-200`} 
                  />
                  {/* Quick Code Reference / Letter */}
                  <text 
                    x={x + 20} 
                    y={y + 23} 
                    textAnchor="middle" 
                    className="text-[9px] font-mono fill-white font-bold"
                  >
                    {zone.id === 'zone-1' ? 'S' : zone.id === 'zone-2' ? 'A' : zone.id === 'zone-3' ? 'P' : zone.id === 'zone-4' ? 'G' : 'L'}
                  </text>
                  {/* Human label inside card */}
                  <text 
                    x={x + w / 2} 
                    y={y + h / 2 + 5} 
                    textAnchor="middle" 
                    className={`text-[9px] font-bold select-none ${isSelected ? 'fill-brand-blue font-extrabold' : 'fill-gray-600'} transition duration-200`}
                  >
                    {zone.id === 'zone-1' ? 'Science / STEM' : zone.id === 'zone-2' ? 'Admin Hall' : zone.id === 'zone-3' ? 'Preschool' : zone.id === 'zone-4' ? 'Arena / Pool' : 'Library Space'}
                  </text>
                </g>
              );
            })}

            {/* Scale legend on map */}
            <text x="40" y="325" className="text-[9px] fill-gray-400 font-mono tracking-widest uppercase font-bold">● Scale: 1:350m • Secures Gates Active</text>
          </svg>
        </div>

        {/* Dynamic Details Feed Panel */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-brand-gray/40 border border-gray-150 p-6 rounded-xl animate-in fade-in duration-200">
          <div className="space-y-4">
            <span className="inline-block bg-brand-gold/10 text-brand-gold-dark text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full font-mono">
              Selected Complex Details
            </span>

            <h4 className="text-lg font-extrabold text-brand-blue tracking-tight leading-tight">
              {currentZone.name}
            </h4>

            <p className="text-xs text-gray-600 leading-relaxed font-sans">
              {currentZone.description}
            </p>

            <div className="border-t border-gray-150 pt-4 grid grid-cols-2 gap-4 text-xs font-sans">
              <div className="space-y-1">
                <span className="text-gray-400 block font-medium">Head Administrator:</span>
                <span className="font-bold text-brand-blue block">{currentZone.coordinator}</span>
              </div>
              <div className="space-y-1">
                <span className="text-gray-400 block font-medium">Co-Host Capacity:</span>
                <span className="font-bold text-brand-blue block flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  {currentZone.capacity}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-150 mt-6 flex items-center justify-between text-[11px] text-gray-500 font-sans">
            <span>Commissioned in: <strong>{currentZone.builtYear}</strong></span>
            <span className="text-brand-gold font-bold flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-brand-gold" />
              Fully Air Conditioned
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
