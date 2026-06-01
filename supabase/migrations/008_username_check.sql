ALTER TABLE profiles ADD CONSTRAINT username_min_length CHECK (char_length(username) >= 3);
