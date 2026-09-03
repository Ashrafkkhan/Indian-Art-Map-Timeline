import React from 'react';
import { Link } from 'react-router-dom';
import { Map, Clock, Compass, Info } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full bg-[var(--color-heritage-ivory)] border-b border-[var(--color-heritage-sandstone)] py-4 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center z-50 shadow-sm relative">
      <div className="flex items-center mb-4 md:mb-0">
        <Link to="/" className="flex flex-col items-start group">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-[var(--color-heritage-charcoal)] group-hover:text-[var(--color-heritage-terracotta)] transition-colors">
            INDIA: A LIVING CANVAS
          </h1>
          <span className="text-sm font-medium text-[var(--color-heritage-brown)] tracking-wider mt-1 font-sans">
            An Interactive Journey Through Indian Art History
          </span>
        </Link>
      </div>

      <nav className="flex space-x-6 text-sm font-medium text-[var(--color-heritage-indigo)] font-sans">
        <Link to="/" className="flex items-center space-x-1 hover:text-[var(--color-heritage-terracotta)] transition-colors">
          <Map size={16} />
          <span>Explore Map</span>
        </Link>
        <button className="flex items-center space-x-1 hover:text-[var(--color-heritage-terracotta)] transition-colors">
          <Compass size={16} />
          <span>Art Movements</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-[var(--color-heritage-terracotta)] transition-colors">
          <Clock size={16} />
          <span>Timeline</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-[var(--color-heritage-terracotta)] transition-colors">
          <Info size={16} />
          <span>About</span>
        </button>
      </nav>
    </header>
  );
};

export default Header;
