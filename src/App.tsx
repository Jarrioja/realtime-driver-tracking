import React, { useEffect, useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import Map from './components/Map';
import DistanceCalculator from './components/DistanceCalculator';
import { initializeDriverLocation, subscribeToDriverLocation, updateDriverLocation } from './lib/supabase';

interface Location {
  lat: number;
  lng: number;
}

function App() {
  // Maracaibo coordinates
  const [driverLocation, setDriverLocation] = useState<Location>({
    lat: 10.6427,
    lng: -71.6125
  });
  
  // Setting customer location near Plaza de la República
  const [customerLocation] = useState<Location>({
    lat: 10.6619,
    lng: -71.6023
  });
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeLocation = async () => {
      setIsLoading(true);
      await initializeDriverLocation(driverLocation.lat, driverLocation.lng);
      setIsLoading(false);
    };

    initializeLocation();

    const subscription = subscribeToDriverLocation((location) => {
      setDriverLocation(location);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleDriverMarkerDrag = async (position: Location) => {
    setDriverLocation(position);
    await updateDriverLocation(position.lat, position.lng);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Initializing map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Real-time Driver Tracking</h1>
          <p className="mt-2 text-lg text-gray-600">Monitor your delivery in real-time</p>
          <p className="mt-1 text-sm text-gray-500">Drag the driver marker (blue) to update position</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Map */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <MapPin className="w-6 h-6 text-indigo-600 mr-2" />
              <h2 className="text-xl font-semibold">Customer View</h2>
            </div>
            <div className="h-[400px] relative">
              <Map
                center={customerLocation}
                markers={[customerLocation, driverLocation]}
                onMarkerDrag={handleDriverMarkerDrag}
                isDraggable={true}
                zoom={13}
              />
            </div>
          </div>

          {/* Driver Map */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <Navigation className="w-6 h-6 text-indigo-600 mr-2" />
              <h2 className="text-xl font-semibold">Driver View</h2>
            </div>
            <div className="h-[400px] relative">
              <Map
                center={driverLocation}
                markers={[customerLocation, driverLocation]}
                onMarkerDrag={handleDriverMarkerDrag}
                isDraggable={true}
                zoom={13}
              />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <DistanceCalculator
            driverPosition={driverLocation}
            customerPosition={customerLocation}
          />
        </div>
      </div>
    </div>
  );
}

export default App;