// Google Maps configuration
export const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const mapConfig = {
  version: "weekly",
  libraries: ["places"] as const,
};
