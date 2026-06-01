-- Allow all authenticated users to view all sightings (for the map)
-- Previously: auth.uid() = user_id (own sightings only)

DROP POLICY IF EXISTS "Users can view own sightings" ON sightings;

CREATE POLICY "Users can view all sightings"
  ON sightings FOR SELECT
  USING (true);
