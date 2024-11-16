import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const initializeDriverLocation = async (lat: number, lng: number) => {
  const { data, error } = await supabase.from("driver_location").upsert(
    {
      id: 1, // We'll use a single record for this demo
      latitude: lat,
      longitude: lng,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" }
  );

  if (error) {
    console.error("Error initializing driver location:", error);
    return null;
  }
  return data;
};

export const subscribeToDriverLocation = (
  callback: (location: { lat: number; lng: number }) => void
) => {
  return supabase
    .channel("driver_location_changes")
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "driver_location",
      },
      (payload) => {
        callback({
          lat: payload.new.latitude,
          lng: payload.new.longitude,
        });
      }
    )
    .subscribe();
};

export const updateDriverLocation = async (lat: number, lng: number) => {
  const { error } = await supabase
    .from("driver_location")
    .update({
      latitude: lat,
      longitude: lng,
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1);

  if (error) {
    console.error("Error updating driver location:", error);
    return false;
  }
  return true;
};
