import React, { useState } from 'react';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FilterPanelProps {
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  activeRegion: string;
  setActiveRegion: (region: string) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ 
  activeCategory, setActiveCategory, 
  activeRegion, setActiveRegion 
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const categories = [
    'All', 'Prehistoric', 'Ancient', 'Classical', 'Medieval', 'Mughal', 
    'Folk & Tribal', 'Colonial', 'Modern', 'Contemporary'
  ];

  const regions = ['All', 'North', 'South', 'East', 'West', 'Central'];

  return (
    <div className="bg-[var(--color-heritage-ivory)]/95 backdrop-blur shadow-lg border border-[var(--color-heritage-sandstone)] rounded-lg overflow-hidden font-sans">
      <div 
        className="px-4 py-3 bg-[var(--color-heritage-indigo)] text-[var(--color-heritage-sandstone)] flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center font-bold tracking-wider text-sm">
          <Filter size={16} className="mr-2" />
          FILTER EXPLORATION
        </div>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 border-b border-[var(--color-heritage-sandstone)]">
              <h4 className="text-xs font-bold text-[var(--color-heritage-brown)] uppercase tracking-wider mb-3">By Art Tradition</h4>
              <div className="flex flex-col space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {categories.map(cat => (
                  <label key={cat} className="flex items-center cursor-pointer group">
                    <div className="relative flex items-center justify-center w-4 h-4 mr-3 border border-[var(--color-heritage-charcoal)] rounded-sm overflow-hidden">
                      <input 
                        type="checkbox" 
                        className="opacity-0 absolute"
                        checked={activeCategory === cat}
                        onChange={() => setActiveCategory(cat)}
                      />
                      {activeCategory === cat && (
                        <div className="w-full h-full bg-[var(--color-heritage-terracotta)]"></div>
                      )}
                    </div>
                    <span className={`text-sm ${activeCategory === cat ? 'font-bold text-[var(--color-heritage-charcoal)]' : 'text-gray-600 group-hover:text-[var(--color-heritage-terracotta)]'} transition-colors`}>
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="p-4">
              <h4 className="text-xs font-bold text-[var(--color-heritage-brown)] uppercase tracking-wider mb-3">By Region</h4>
              <div className="flex flex-wrap gap-2">
                {regions.map(region => (
                  <button
                    key={region}
                    onClick={() => setActiveRegion(region)}
                    className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                      activeRegion === region 
                        ? 'bg-[var(--color-heritage-indigo)] text-[var(--color-heritage-sandstone)] border-[var(--color-heritage-indigo)]' 
                        : 'bg-transparent text-gray-600 border-gray-300 hover:border-[var(--color-heritage-terracotta)] hover:text-[var(--color-heritage-terracotta)]'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterPanel;
