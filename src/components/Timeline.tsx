import React from 'react';
import { motion } from 'framer-motion';

interface TimelineProps {
  onSelectPeriod: (category: string) => void;
}

const Timeline: React.FC<TimelineProps> = ({ onSelectPeriod }) => {
  const periods = [
    { year: '10,000 BCE', label: 'Prehistoric', desc: 'Rock shelters & cave paintings' },
    { year: '200 BCE', label: 'Ancient', desc: 'Buddhist & early rock-cut art' },
    { year: '600 CE', label: 'Classical', desc: 'Monumental temple architecture' },
    { year: '1200 CE', label: 'Medieval', desc: 'Indo-Islamic synthesis' },
    { year: '1500 CE', label: 'Mughal', desc: 'Miniature painting & royal courts' },
    { year: 'Timeless', label: 'Folk & Tribal', desc: 'Indigenous craft traditions' },
    { year: '1800 CE', label: 'Colonial', desc: 'Company school & early nationalism' },
    { year: '1900 CE', label: 'Modern', desc: 'Bengal School & PAG' },
    { year: 'Present', label: 'Contemporary', desc: 'New media & global narratives' },
  ];

  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold font-serif text-[var(--color-heritage-charcoal)]">HISTORICAL TIMELINE</h2>
        <div className="w-24 h-1 bg-[var(--color-heritage-terracotta)] mx-auto mt-4"></div>
      </div>
      
      <div className="relative w-full overflow-x-auto pb-8 custom-scrollbar">
        <div className="min-w-[1000px] relative flex justify-between items-center px-4 mt-12">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[var(--color-heritage-sandstone)] -z-10 -translate-y-1/2"></div>
          
          {periods.map((period, index) => (
            <motion.div 
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative flex flex-col items-center group cursor-pointer w-32"
              onClick={() => onSelectPeriod(period.label)}
            >
              {/* Dot on line */}
              <div className="w-4 h-4 rounded-full bg-[var(--color-heritage-indigo)] border-2 border-[var(--color-heritage-ivory)] group-hover:bg-[var(--color-heritage-terracotta)] transition-colors mb-4 z-10 shadow-sm"></div>
              
              <div className="text-center">
                <span className="block text-xs font-bold text-[var(--color-heritage-brown)] mb-1">{period.year}</span>
                <span className="block text-sm font-bold text-[var(--color-heritage-charcoal)] font-serif group-hover:text-[var(--color-heritage-terracotta)] transition-colors">{period.label}</span>
                <span className="block text-[10px] text-gray-500 mt-1 px-1 opacity-0 group-hover:opacity-100 transition-opacity absolute w-full left-0">{period.desc}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
