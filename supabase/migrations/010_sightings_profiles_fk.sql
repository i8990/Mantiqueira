-- First create missing profiles for any user_ids in sightings that don't have one
INSERT INTO profiles (id, username, avatar_emoji, total_pts)
SELECT DISTINCT s.user_id, 'user_' || substr(s.user_id::text, 1, 8), '🧭', 0
FROM sightings s
LEFT JOIN profiles p ON p.id = s.user_id
WHERE p.id IS NULL
ON CONFLICT (id) DO NOTHING;

-- Add FK from sightings.user_id to profiles.id so PostgREST can infer the join
ALTER TABLE sightings
DROP CONSTRAINT IF EXISTS sightings_user_id_fkey,
ADD CONSTRAINT sightings_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;
