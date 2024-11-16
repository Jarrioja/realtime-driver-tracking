import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface MapProps {
  center: google.maps.LatLngLiteral;
  zoom?: number;
  markers?: google.maps.LatLngLiteral[];
  onLoad?: (map: google.maps.Map) => void;
  onMarkerDrag?: (position: google.maps.LatLngLiteral) => void;
  isDraggable?: boolean;
}

// Create loader with environment variable
const loader = new Loader({
  apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  version: 'weekly',
  libraries: ['places']
});

const Map: React.FC<MapProps> = ({ 
  center, 
  zoom = 15, 
  markers = [], 
  onLoad,
  onMarkerDrag,
  isDraggable = false
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current || map) return;

    const initializeMap = async () => {
      try {
        await loader.load();
        const mapInstance = new google.maps.Map(mapRef.current!, {
          center,
          zoom,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }],
            },
          ],
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        });
        
        setMap(mapInstance);
        if (onLoad) onLoad(mapInstance);
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    initializeMap();
  }, []);

  useEffect(() => {
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Add new markers
    markers.forEach((position, index) => {
      const isDriver = index === markers.length - 1;
      const marker = new google.maps.Marker({
        position,
        map,
        draggable: isDraggable && isDriver,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: isDriver ? '#4F46E5' : '#EF4444',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        },
        title: isDriver ? 'Driver' : 'Customer',
        zIndex: isDriver ? 2 : 1,
      });

      if (isDraggable && isDriver && onMarkerDrag) {
        marker.addListener('dragend', () => {
          const position = marker.getPosition();
          if (position) {
            onMarkerDrag({
              lat: position.lat(),
              lng: position.lng()
            });
          }
        });
      }

      markersRef.current.push(marker);
    });
  }, [map, markers, isDraggable, onMarkerDrag]);

  useEffect(() => {
    if (map) {
      map.setCenter(center);
    }
  }, [map, center]);

  return <div ref={mapRef} className="w-full h-full rounded-lg shadow-lg" />;
};

export default Map;