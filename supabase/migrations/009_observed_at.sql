-- Add observed_at column to sightings for manual date input
ALTER TABLE sightings
ADD COLUMN observed_at TIMESTAMPTZ DEFAULT NOW();

-- Update existing rows to use created_at as observed_at
UPDATE sightings SET observed_at = created_at WHERE observed_at IS NULL;
