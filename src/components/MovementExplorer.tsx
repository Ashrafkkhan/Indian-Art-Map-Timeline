import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface MovementExplorerProps {
  onSelectMovement: (movementName: string) => void;
}

const movements = [
  {
    name: "Buddhist Art",
    period: "200 BCE - 600 CE",
    region: "Central & Southern India",
    desc: "Narrative murals, intricate stone carvings, and rock-cut sanctuaries that chronicle the life and past lives (Jatakas) of the Buddha.",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Ajanta_Padmapani.jpg/800px-Ajanta_Padmapani.jpg"
  },
  {
    name: "Mughal Miniature Painting",
    period: "16th - 18th Century",
    region: "Northern India",
    desc: "Highly detailed, jewel-like paintings blending Persian traditions with Indian aesthetics, created in imperial ateliers.",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Mughal_Miniature_Painting.jpg/800px-Mughal_Miniature_Painting.jpg"
  },
  {
    name: "Bengal School",
    period: "Early 20th Century",
    region: "Bengal",
    desc: "A nationalist art movement reacting against Western academic art styles, emphasizing pan-Asian influences and spiritual subjects.",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Bharat_Mata_by_Abanindranath_Tagore.jpg/800px-Bharat_Mata_by_Abanindranath_Tagore.jpg"
  },
  {
    name: "Progressive Artists' Group",
    period: "1940s onwards",
    region: "Mumbai",
    desc: "Post-independence modernists who synthesized European avant-garde styles with distinctively Indian themes and colors.",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Gateway_of_India%2C_Mumbai.jpg/800px-Gateway_of_India%2C_Mumbai.jpg"
  }
];

const MovementExplorer: React.FC<MovementExplorerProps> = ({ onSelectMovement }) => {
  return (
    <div className="w-full">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold font-serif text-[var(--color-heritage-charcoal)] uppercase tracking-wide">Explore Art Movements</h2>
        <div className="w-24 h-1 bg-[var(--color-heritage-terracotta)] mx-auto mt-4"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {movements.map((mov, index) => (
          <motion.div 
            key={index}
            whileHover={{ y: -10 }}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 flex flex-col"
          >
            <div className="h-48 overflow-hidden relative">
              <img src={mov.img} alt={mov.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity hover:bg-opacity-0"></div>
            </div>
            
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="font-serif text-xl font-bold text-[var(--color-heritage-charcoal)] mb-2">{mov.name}</h3>
              
              <div className="flex items-center text-xs font-bold text-[var(--color-heritage-brown)] uppercase tracking-wider mb-1">
                <span>{mov.period}</span>
              </div>
              <div className="flex items-center text-xs text-gray-500 mb-4">
                <MapPin size={12} className="mr-1" />
                <span>{mov.region}</span>
              </div>
              
              <p className="text-sm text-gray-600 mb-6 flex-grow">{mov.desc}</p>
              
              <button 
                onClick={() => onSelectMovement(mov.name)}
                className="w-full py-2 bg-[var(--color-heritage-indigo)] text-white hover:bg-[var(--color-heritage-terracotta)] transition-colors text-sm font-bold uppercase tracking-wider rounded mt-auto"
              >
                Explore on Map
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MovementExplorer;
