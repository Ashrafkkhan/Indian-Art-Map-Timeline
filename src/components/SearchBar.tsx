import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  locations: any[];
  onSelectLocation: (id: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ locations, onSelectLocation }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length > 1) {
      const lowerQuery = value.toLowerCase();
      const filtered = locations.filter(loc => 
        loc.name.toLowerCase().includes(lowerQuery) || 
        loc.movement.toLowerCase().includes(lowerQuery) ||
        loc.category.toLowerCase().includes(lowerQuery) ||
        loc.state.toLowerCase().includes(lowerQuery) ||
        (loc.artists && loc.artists.some((a: string) => a.toLowerCase().includes(lowerQuery)))
      );
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  const handleSelect = (id: string) => {
    onSelectLocation(id);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div ref={wrapperRef} className="relative w-full font-sans shadow-lg">
      <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden border border-[var(--color-heritage-sandstone)]">
        <div className="grid place-items-center h-full w-12 text-gray-400 bg-[var(--color-heritage-ivory)]">
          <Search size={18} />
        </div>

        <input
          className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 bg-[var(--color-heritage-ivory)]"
          type="text"
          id="search"
          placeholder="Search an artist, artwork, movement or location..." 
          value={query}
          onChange={handleSearch}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
        />
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-14 left-0 w-full bg-[var(--color-heritage-ivory)] border border-[var(--color-heritage-sandstone)] rounded-lg shadow-xl max-h-80 overflow-y-auto z-50">
          <ul className="py-2">
            {results.map((loc) => (
              <li 
                key={loc.id}
                className="px-4 py-3 hover:bg-[var(--color-heritage-sandstone)] cursor-pointer border-b border-gray-100 last:border-0 transition-colors"
                onClick={() => handleSelect(loc.id)}
              >
                <div className="font-bold text-[var(--color-heritage-charcoal)] text-sm">{loc.name}</div>
                <div className="text-xs text-gray-500 mt-1">{loc.movement} • {loc.state}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
