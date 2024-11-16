-- Create the table for storing driver locations
CREATE TABLE IF NOT EXISTS driver_location (
    id SERIAL PRIMARY KEY,
    latitude DOUBLE PRECISION NULL,
    longitude DOUBLE PRECISION NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Activate Realtime for the driver_location table
ALTER PUBLICATION supabase_realtime ADD TABLE driver_location;