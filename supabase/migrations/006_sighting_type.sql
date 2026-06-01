ALTER TABLE sightings ADD COLUMN sighting_type TEXT NOT NULL DEFAULT 'foto' CHECK (sighting_type IN ('foto','pegada','atropelamento','comunicacao'));
