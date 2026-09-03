import React, { useState } from 'react';
import ArtMap from '../components/ArtMap';
import LocationPanel from '../components/LocationPanel';
import FilterPanel from '../components/FilterPanel';
import SearchBar from '../components/SearchBar';
import MovementExplorer from '../components/MovementExplorer';
import Timeline from '../components/Timeline';
import JourneyExplorer from '../components/JourneyExplorer';
import { locations } from '../data/locations';
import { motion, AnimatePresence } from 'framer-motion';

const Home = () => {
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');
  const [activeRegionFilter, setActiveRegionFilter] = useState<string>('All');
  const [mapCenter, setMapCenter] = useState<[number, number]>([20.5937, 78.9629]);
  const [mapZoom, setMapZoom] = useState<number>(5);
  const [journeyPath, setJourneyPath] = useState<[number, number][]>([]);

  const selectedLocation = locations.find(loc => loc.id === selectedLocationId);

  // Filter logic
  const filteredLocations = locations.filter(loc => {
    const categoryMatch = activeCategoryFilter === 'All' || loc.category === activeCategoryFilter;
    let regionMatch = true;
    if (activeRegionFilter !== 'All') {
      const north = ['Delhi', 'Uttar Pradesh'];
      const south = ['Tamil Nadu', 'Andhra Pradesh', 'Kerala', 'Karnataka'];
      const west = ['Maharashtra', 'Gujarat', 'Rajasthan'];
      const east = ['West Bengal', 'Odisha', 'Bihar', 'Jharkhand'];
      const central = ['Madhya Pradesh', 'Chhattisgarh'];
      
      if (activeRegionFilter === 'North' && !north.includes(loc.state)) regionMatch = false;
      if (activeRegionFilter === 'South' && !south.includes(loc.state)) regionMatch = false;
      if (activeRegionFilter === 'West' && !west.includes(loc.state)) regionMatch = false;
      if (activeRegionFilter === 'East' && !east.includes(loc.state)) regionMatch = false;
      if (activeRegionFilter === 'Central' && !central.includes(loc.state)) regionMatch = false;
    }
    return categoryMatch && regionMatch;
  });

  const handleSelectLocation = (id: string) => {
    setSelectedLocationId(id);
    const loc = locations.find(l => l.id === id);
    if (loc) {
      setMapCenter(loc.coordinates as [number, number]);
      setMapZoom(8);
      // Scroll to map if needed
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleClosePanel = () => {
    setSelectedLocationId(null);
  };

  return (
    <div className="flex flex-col w-full relative bg-[var(--color-heritage-ivory)]">
      {/* Hero Map Section */}
      <section className="relative w-full h-[85vh] lg:h-[90vh]">
        <ArtMap 
          locations={filteredLocations} 
          onSelectLocation={handleSelectLocation} 
          selectedId={selectedLocationId}
          center={mapCenter}
          zoom={mapZoom}
          journeyPath={journeyPath}
        />

        {/* Floating UI Elements over Map */}
        <div className="absolute top-6 left-6 z-10 w-80 flex flex-col space-y-6 pointer-events-none">
          <div className="pointer-events-auto">
            <SearchBar 
              locations={locations} 
              onSelectLocation={handleSelectLocation} 
            />
          </div>
          <div className="pointer-events-auto">
            <FilterPanel 
              activeCategory={activeCategoryFilter}
              setActiveCategory={setActiveCategoryFilter}
              activeRegion={activeRegionFilter}
              setActiveRegion={setActiveRegionFilter}
            />
          </div>
        </div>

        {/* Location Detail Panel */}
        <AnimatePresence>
          {selectedLocation && (
            <LocationPanel 
              location={selectedLocation} 
              onClose={handleClosePanel} 
              onSelectRelated={handleSelectLocation}
            />
          )}
        </AnimatePresence>
      </section>

      {/* Timeline Section */}
      <section className="w-full py-16 px-6 md:px-12 border-t border-[var(--color-heritage-sandstone)]">
        <Timeline onSelectPeriod={(category) => {
          setActiveCategoryFilter(category);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} />
      </section>

      {/* Movements Section */}
      <section className="w-full py-16 px-6 md:px-12 bg-[var(--color-heritage-sandstone)] border-t border-gray-200">
        <MovementExplorer onSelectMovement={(movementName) => {
           const loc = locations.find(l => l.movement.includes(movementName));
           if (loc) handleSelectLocation(loc.id);
        }} />
      </section>

      {/* Journey Section */}
      <section className="w-full py-16 px-6 md:px-12 border-t border-[var(--color-heritage-sandstone)]">
        <JourneyExplorer onTraceJourney={(locationIds) => {
          const path = locationIds.map(id => locations.find(l => l.id === id)?.coordinates as [number, number]).filter(Boolean);
          setJourneyPath(path);
          if (path.length > 0) {
            setMapCenter(path[0]);
            setMapZoom(5);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }} />
      </section>

      <footer className="bg-[var(--color-heritage-charcoal)] text-[var(--color-heritage-sandstone)] py-12 px-6 md:px-12 text-center font-sans">
        <h2 className="font-serif text-2xl mb-4 text-[var(--color-heritage-gold)]">INDIA: A LIVING CANVAS</h2>
        <p className="max-w-2xl mx-auto text-sm opacity-80 mb-6">
          An interactive exploration of India's artistic heritage, connecting places, people, movements and artworks across thousands of years.
        </p>
        <p className="text-xs opacity-60">Created for educational and cultural exploration.</p>
      </footer>
    </div>
  );
};

export default Home;
