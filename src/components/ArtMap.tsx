import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet icon paths in React
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

// Component to handle map view updates when center/zoom props change
const MapUpdater = ({ center, zoom }: { center: [number, number], zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.5 });
  }, [center, zoom, map]);
  return null;
};

// Custom Marker icons based on categories
const getMarkerColor = (category: string) => {
  switch (category) {
    case 'Prehistoric': return '#8b5a2b'; // Brown
    case 'Ancient': return '#e07a5f'; // Terracotta
    case 'Classical': return '#e9c46a'; // Gold
    case 'Medieval': return '#2c3e50'; // Indigo
    case 'Mughal': return '#8e44ad'; // Purple
    case 'Folk & Tribal': return '#27ae60'; // Green
    case 'Colonial': return '#c0392b'; // Red
    case 'Modern': return '#f39c12'; // Yellow/Orange
    case 'Contemporary': return '#2980b9'; // Blue
    default: return '#7f8c8d';
  }
};

const createCustomIcon = (category: string, isSelected: boolean) => {
  const color = getMarkerColor(category);
  const size = isSelected ? 30 : 20;
  const border = isSelected ? 'border-2 border-white' : 'border border-[var(--color-heritage-ivory)]';
  
  const html = `
    <div style="background-color: ${color}; width: ${size}px; height: ${size}px; border-radius: 50%; box-shadow: 0 4px 6px rgba(0,0,0,0.3);" class="${border} transition-all duration-300"></div>
  `;

  return L.divIcon({
    html,
    className: 'custom-leaflet-marker',
    iconSize: [size, size],
    iconAnchor: [size/2, size/2],
  });
};

interface ArtMapProps {
  locations: any[];
  onSelectLocation: (id: string) => void;
  selectedId: string | null;
  center: [number, number];
  zoom: number;
  journeyPath?: [number, number][];
}

const ArtMap: React.FC<ArtMapProps> = ({ locations, onSelectLocation, selectedId, center, zoom, journeyPath = [] }) => {
  const [geoData, setGeoData] = useState<any>(null);

  useEffect(() => {
    fetch('/india_lite.geojson')
      .then(response => response.json())
      .then(data => setGeoData(data))
      .catch(err => console.error("Failed to load India GeoJSON:", err));
  }, []);

  return (
    <div className="w-full h-full bg-[var(--color-heritage-sandstone)]">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%', zIndex: 0 }}
        zoomControl={false}
        attributionControl={false}
      >
        <MapUpdater center={center} zoom={zoom} />
        
        {/* Using Esri Light Gray Canvas tiles which do not require an API key and show no borders. */}
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
          attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
          className="map-tiles-custom"
        />

        {geoData && (
          <GeoJSON 
            data={geoData} 
            style={{
              color: 'var(--color-heritage-terracotta)',
              weight: 1.5,
              opacity: 0.8,
              fillColor: 'var(--color-heritage-sandstone)',
              fillOpacity: 0.1
            }} 
          />
        )}

        {journeyPath.length > 0 && (
          <Polyline 
            positions={journeyPath} 
            pathOptions={{ color: 'var(--color-heritage-terracotta)', weight: 4, dashArray: '10, 10' }} 
          />
        )}

        {locations.map((loc) => {
          const isSelected = selectedId === loc.id;
          return (
            <Marker 
              key={loc.id} 
              position={loc.coordinates as [number, number]}
              icon={createCustomIcon(loc.category, isSelected)}
              eventHandlers={{
                click: () => onSelectLocation(loc.id),
              }}
            >
              {!isSelected && (
                <Popup closeButton={false} offset={[0, -10]}>
                  <div className="text-center font-sans">
                    <h3 className="font-bold text-[var(--color-heritage-charcoal)] text-sm">{loc.name}</h3>
                    <p className="text-xs text-[var(--color-heritage-brown)]">{loc.state}</p>
                    <p className="text-[10px] italic mt-1 text-[var(--color-heritage-indigo)]">{loc.movement}</p>
                  </div>
                </Popup>
              )}
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default ArtMap;
