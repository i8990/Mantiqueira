-- Allow all authenticated users to view all sightings (for the map)
DROP POLICY IF EXISTS "Users can view all sightings" ON sightings;
DROP POLICY IF EXISTS "Users can view own sightings" ON sightings;

CREATE POLICY "Users can view all sightings"
  ON sightings FOR SELECT
  USING (true);
