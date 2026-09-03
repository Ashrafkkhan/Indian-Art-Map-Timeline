import React from 'react';
import { X, MapPin, Calendar, Compass, Info, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface LocationPanelProps {
  location: any;
  onClose: () => void;
  onSelectRelated: (id: string) => void;
}

const LocationPanel: React.FC<LocationPanelProps> = ({ location, onClose, onSelectRelated }) => {
  return (
    <motion.div 
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute top-0 right-0 w-full md:w-[500px] h-full bg-[var(--color-heritage-ivory)] shadow-2xl z-40 overflow-y-auto border-l border-[var(--color-heritage-sandstone)]"
    >
      <div className="relative">
        {location.images && location.images.length > 0 && (
          <div className="w-full h-64 md:h-72 bg-gray-200 relative overflow-hidden">
            <img 
              src={location.images[0]} 
              alt={location.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-heritage-ivory)] to-transparent"></div>
          </div>
        )}
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full text-[var(--color-heritage-charcoal)] hover:bg-[var(--color-heritage-terracotta)] hover:text-white transition-colors shadow-sm"
        >
          <X size={20} />
        </button>

        <div className="px-8 pb-10 pt-4 -mt-8 relative z-10">
          <h2 className="text-4xl font-bold font-serif text-[var(--color-heritage-charcoal)] mb-2 uppercase tracking-wide">
            {location.name}
          </h2>
          
          <div className="flex items-center text-[var(--color-heritage-brown)] font-sans text-sm font-medium mb-6">
            <MapPin size={16} className="mr-1" />
            <span>{location.state}</span>
            <span className="mx-2">•</span>
            <span>{location.category} India</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-[var(--color-heritage-sandstone)]/50 p-4 rounded-lg border border-[var(--color-heritage-sandstone)]">
              <div className="flex items-center text-[var(--color-heritage-indigo)] mb-1">
                <Compass size={14} className="mr-2" />
                <span className="text-xs font-bold uppercase tracking-wider">Art Tradition</span>
              </div>
              <p className="font-serif text-lg text-[var(--color-heritage-charcoal)]">{location.movement}</p>
            </div>
            
            <div className="bg-[var(--color-heritage-sandstone)]/50 p-4 rounded-lg border border-[var(--color-heritage-sandstone)]">
              <div className="flex items-center text-[var(--color-heritage-indigo)] mb-1">
                <Calendar size={14} className="mr-2" />
                <span className="text-xs font-bold uppercase tracking-wider">Period</span>
              </div>
              <p className="font-serif text-lg text-[var(--color-heritage-charcoal)]">{location.period}</p>
            </div>
          </div>

          <section className="mb-8">
            <h3 className="flex items-center text-xl font-bold font-serif text-[var(--color-heritage-charcoal)] mb-3 border-b border-[var(--color-heritage-sandstone)] pb-2">
              <Info size={18} className="mr-2 text-[var(--color-heritage-terracotta)]" />
              Historical Context
            </h3>
            <p className="text-sm leading-relaxed text-gray-700 font-sans">
              {location.description}
            </p>
            <p className="text-sm leading-relaxed text-gray-700 font-sans mt-3">
              {location.historicalContext}
            </p>
          </section>

          <section className="mb-8">
            <h3 className="flex items-center text-xl font-bold font-serif text-[var(--color-heritage-charcoal)] mb-3 border-b border-[var(--color-heritage-sandstone)] pb-2">
              <ImageIcon size={18} className="mr-2 text-[var(--color-heritage-terracotta)]" />
              Artistic Characteristics
            </h3>
            <ul className="space-y-2">
              {location.artisticCharacteristics?.map((char: string, i: number) => (
                <li key={i} className="flex items-start text-sm font-sans text-gray-700">
                  <span className="text-[var(--color-heritage-gold)] mr-2 mt-1">✦</span>
                  <span>{char}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-bold font-serif text-[var(--color-heritage-charcoal)] mb-3 border-b border-[var(--color-heritage-sandstone)] pb-2">
              Important Works
            </h3>
            <div className="flex flex-wrap gap-2">
              {location.artworks?.map((work: string, i: number) => (
                <span key={i} className="px-3 py-1 bg-[var(--color-heritage-indigo)] text-[var(--color-heritage-sandstone)] text-xs font-sans rounded-full">
                  {work}
                </span>
              ))}
            </div>
          </section>

          {location.relatedLocations && location.relatedLocations.length > 0 && (
            <section className="mb-8">
              <h3 className="text-xl font-bold font-serif text-[var(--color-heritage-charcoal)] mb-3 border-b border-[var(--color-heritage-sandstone)] pb-2">
                Explore Nearby
              </h3>
              <div className="flex flex-wrap gap-2">
                {location.relatedLocations.map((relId: string, i: number) => (
                  <button 
                    key={i} 
                    onClick={() => onSelectRelated(relId)}
                    className="px-4 py-2 border border-[var(--color-heritage-terracotta)] text-[var(--color-heritage-terracotta)] hover:bg-[var(--color-heritage-terracotta)] hover:text-white transition-colors text-xs font-bold uppercase tracking-wider rounded font-sans"
                  >
                    {relId.replace(/-/g, ' ')}
                  </button>
                ))}
              </div>
            </section>
          )}

          <div className="mt-12 bg-gray-50 border border-gray-200 p-4 rounded-lg">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Did you know?</h4>
            <p className="text-sm text-gray-600 font-sans italic">
              "Indian art developed through multiple regional traditions rather than following a single linear evolution."
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LocationPanel;
