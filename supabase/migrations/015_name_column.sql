ALTER TABLE profiles ADD COLUMN name TEXT;
UPDATE profiles SET name = username WHERE name IS NULL;
