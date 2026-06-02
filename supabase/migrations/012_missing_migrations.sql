-- Migration 006: Adiciona coluna sighting_type
ALTER TABLE sightings ADD COLUMN sighting_type TEXT NOT NULL DEFAULT 'foto' CHECK (sighting_type IN ('foto','pegada','atropelamento','comunicacao'));

-- Migration 007: Trigger de streak
CREATE OR REPLACE FUNCTION update_streak()
RETURNS TRIGGER AS $$
DECLARE
  last_date DATE;
  today DATE := CURRENT_DATE;
BEGIN
  SELECT last_sighting_at::DATE INTO last_date
  FROM profiles
  WHERE id = NEW.user_id;

  IF last_date IS NULL OR last_date < today - INTERVAL '1 day' THEN
    UPDATE profiles SET streak_days = 1, last_sighting_at = NOW() WHERE id = NEW.user_id;
  ELSIF last_date = today - INTERVAL '1 day' THEN
    UPDATE profiles SET streak_days = streak_days + 1, last_sighting_at = NOW() WHERE id = NEW.user_id;
  ELSIF last_date = today THEN
    UPDATE profiles SET last_sighting_at = NOW() WHERE id = NEW.user_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_new_sighting ON sightings;
CREATE TRIGGER on_new_sighting
AFTER INSERT ON sightings
FOR EACH ROW
EXECUTE FUNCTION update_streak();
