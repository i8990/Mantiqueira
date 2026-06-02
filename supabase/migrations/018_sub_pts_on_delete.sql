-- Migration 018: Trigger para subtrair pontos ao deletar um avistamento

CREATE OR REPLACE FUNCTION sub_pts_on_delete()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE profiles
  SET total_pts = GREATEST(0, total_pts - OLD.pts_earned)
  WHERE id = OLD.user_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_sighting_delete ON sightings;
CREATE TRIGGER on_sighting_delete
  AFTER DELETE ON sightings
  FOR EACH ROW
  EXECUTE FUNCTION sub_pts_on_delete();
