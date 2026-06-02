-- Migration 016: Cria buckets de storage + trigger de pontos
-- Execute cada bloco separadamente no SQL Editor

-- 1) Bucket sightings-photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('sightings-photos', 'sightings-photos', TRUE)
ON CONFLICT (id) DO NOTHING;

-- 2) Policy de leitura sightings-photos
DROP POLICY IF EXISTS "Public read access" ON storage.objects;
CREATE POLICY "Public read access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'sightings-photos');

-- 3) Policy de upload sightings-photos
DROP POLICY IF EXISTS "Users can upload to own folder" ON storage.objects;
CREATE POLICY "Users can upload to own folder"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'sightings-photos'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- 4) Bucket avatars
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', TRUE)
ON CONFLICT (id) DO NOTHING;

-- 5) Policy de leitura avatars
DROP POLICY IF EXISTS "Public read avatars" ON storage.objects;
CREATE POLICY "Public read avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

-- 6) Policy de upload avatars
DROP POLICY IF EXISTS "Users can upload own avatar" ON storage.objects;
CREATE POLICY "Users can upload own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- 7) Trigger de pontos
CREATE OR REPLACE FUNCTION add_pts_to_profile()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE profiles
  SET total_pts = total_pts + NEW.pts_earned
  WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_sighting_pts ON sightings;
CREATE TRIGGER on_sighting_pts
AFTER INSERT ON sightings
FOR EACH ROW
EXECUTE FUNCTION add_pts_to_profile();
