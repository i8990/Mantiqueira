-- Add video_url column to sightings table
ALTER TABLE sightings ADD COLUMN IF NOT EXISTS video_url TEXT;

-- Create storage bucket for videos
INSERT INTO storage.buckets (id, name, public)
VALUES ('sightings-videos', 'sightings-videos', TRUE)
ON CONFLICT (id) DO NOTHING;

-- Policy: public read access
CREATE POLICY "Public read access for videos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'sightings-videos');

-- Policy: authenticated users can upload to own folder
CREATE POLICY "Users can upload videos to own folder"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'sightings-videos'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Policy: authenticated users can delete own files
CREATE POLICY "Users can delete own videos"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'sightings-videos'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );
