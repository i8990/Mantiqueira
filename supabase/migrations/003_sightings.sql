CREATE TABLE sightings (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  animal_id   TEXT NOT NULL REFERENCES animals(id),
  photo_url   TEXT,
  description TEXT,
  lat         FLOAT8,
  lng         FLOAT8,
  pts_earned  INT NOT NULL DEFAULT 0,
  has_photo   BOOLEAN GENERATED ALWAYS AS (photo_url IS NOT NULL) STORED,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_sightings_user_date ON sightings(user_id, created_at DESC);

ALTER TABLE sightings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own sightings"
  ON sightings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sightings"
  ON sightings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own sightings"
  ON sightings FOR DELETE
  USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION update_profile_pts()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE profiles
  SET total_pts = total_pts + NEW.pts_earned,
      last_sighting_at = NOW()
  WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_new_sighting
  AFTER INSERT ON sightings
  FOR EACH ROW EXECUTE FUNCTION update_profile_pts();
