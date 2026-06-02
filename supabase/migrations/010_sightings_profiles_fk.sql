-- Add FK from sightings.user_id to profiles.id so PostgREST can infer the join
ALTER TABLE sightings
DROP CONSTRAINT IF EXISTS sightings_user_id_fkey,
ADD CONSTRAINT sightings_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;
