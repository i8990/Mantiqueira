-- Migration 019: Recalcula total_pts do zero em cada INSERT/DELETE/UPDATE

DROP TRIGGER IF EXISTS on_sighting_pts ON sightings;
DROP TRIGGER IF EXISTS on_sighting_delete ON sightings;
DROP FUNCTION IF EXISTS add_pts_to_profile();
DROP FUNCTION IF EXISTS sub_pts_on_delete();

CREATE OR REPLACE FUNCTION recalc_profile_pts()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE profiles
  SET total_pts = (
    SELECT COALESCE(SUM(pts_earned), 0)
    FROM sightings
    WHERE user_id = COALESCE(NEW.user_id, OLD.user_id)
  )
  WHERE id = COALESCE(NEW.user_id, OLD.user_id);
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_sighting_change
  AFTER INSERT OR DELETE OR UPDATE OF pts_earned ON sightings
  FOR EACH ROW
  EXECUTE FUNCTION recalc_profile_pts();

UPDATE profiles
SET total_pts = (
  SELECT COALESCE(SUM(pts_earned), 0)
  FROM sightings
  WHERE sightings.user_id = profiles.id
);
