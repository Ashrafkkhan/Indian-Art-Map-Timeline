import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Route, Map as MapIcon } from 'lucide-react';

interface JourneyExplorerProps {
  onTraceJourney: (locationsIds: string[]) => void;
}

const journeys = [
  {
    name: "Buddhist Art Journey",
    locations: ["bhimbetka", "sanchi", "ajanta", "amaravati"],
    desc: "Follow the development of Buddhist art from early rock-cut sanctuaries and stupas in Central India down to the intricate limestone reliefs of the South."
  },
  {
    name: "Modern Indian Art",
    locations: ["kalighat", "kolkata-bengal-school", "shantiniketan", "mumbai", "baroda", "chennai"],
    desc: "Trace the evolution of modernism from early colonial resistance in Bengal, to the spiritual pedagogy of Shantiniketan, and finally to the avant-garde movements in Mumbai, Baroda, and Chennai."
  },
  {
    name: "Mughal & Rajput Synthesis",
    locations: ["delhi", "agra", "fatehpur-sikri", "jaipur", "udaipur"],
    desc: "Explore the architectural and painterly synthesis of Islamic and indigenous traditions across the courts of North and Western India."
  }
];

const JourneyExplorer: React.FC<JourneyExplorerProps> = ({ onTraceJourney }) => {
  const [activeJourney, setActiveJourney] = useState<string | null>(null);

  const handleSelect = (name: string, locationIds: string[]) => {
    setActiveJourney(name);
    onTraceJourney(locationIds);
  };

  return (
    <div className="w-full">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold font-serif text-[var(--color-heritage-charcoal)] uppercase tracking-wide">Trace the Journey</h2>
        <div className="w-24 h-1 bg-[var(--color-heritage-terracotta)] mx-auto mt-4"></div>
        <p className="mt-4 text-[var(--color-heritage-brown)] font-sans max-w-2xl mx-auto">
          Select an artistic tradition and visually follow its geographic and chronological development across the Indian subcontinent.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {journeys.map((journey, index) => (
          <motion.div 
            key={index}
            whileHover={{ y: -5 }}
            className={`border rounded-lg p-6 flex flex-col cursor-pointer transition-colors ${
              activeJourney === journey.name 
                ? 'bg-[var(--color-heritage-indigo)] text-[var(--color-heritage-sandstone)] border-[var(--color-heritage-indigo)]' 
                : 'bg-white border-[var(--color-heritage-sandstone)] text-[var(--color-heritage-charcoal)] hover:border-[var(--color-heritage-terracotta)]'
            }`}
            onClick={() => handleSelect(journey.name, journey.locations)}
          >
            <div className="flex items-center mb-4">
              <Route className={activeJourney === journey.name ? 'text-[var(--color-heritage-gold)]' : 'text-[var(--color-heritage-terracotta)]'} size={24} />
              <h3 className="ml-3 font-serif text-xl font-bold">{journey.name}</h3>
            </div>
            <p className={`text-sm flex-grow mb-6 ${activeJourney === journey.name ? 'text-gray-300' : 'text-gray-600'}`}>
              {journey.desc}
            </p>
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
              <span>{journey.locations.length} Locations</span>
              <span className={`flex items-center ${activeJourney === journey.name ? 'text-[var(--color-heritage-gold)]' : 'text-[var(--color-heritage-indigo)]'}`}>
                <MapIcon size={14} className="mr-1" />
                Trace on Map
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default JourneyExplorer;
