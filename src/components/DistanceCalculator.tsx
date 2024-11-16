import { latLngToCell, gridDisk, gridDistance } from 'h3-js';

interface DistanceCalculatorProps {
  driverPosition: google.maps.LatLngLiteral;
  customerPosition: google.maps.LatLngLiteral;
}

const DistanceCalculator: React.FC<DistanceCalculatorProps> = ({
  driverPosition,
  customerPosition,
}) => {
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radio de la Tierra en kilómetros
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const distance = calculateDistance(
    driverPosition.lat,
    driverPosition.lng,
    customerPosition.lat,
    customerPosition.lng
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-semibold text-gray-800">Distancia</h3>
      <p className="text-3xl font-bold text-indigo-600">{distance.toFixed(1)} km</p>
    </div>
  );
};

export default DistanceCalculator;