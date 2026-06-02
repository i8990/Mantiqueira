-- Migration 017: Corrige trigger handle_new_user para evitar
-- "Database error saving new user" por conflito de username UNIQUE.
-- Também inclui name e avatar_url do metadata.

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  base_username TEXT;
  final_username TEXT;
BEGIN
  base_username := COALESCE(
    NEW.raw_user_meta_data->>'username',
    'matago_' || substr(NEW.id::text, 1, 6)
  );
  final_username := base_username;

  LOOP
    BEGIN
      INSERT INTO public.profiles (id, username, name, avatar_url)
      VALUES (
        NEW.id,
        final_username,
        NEW.raw_user_meta_data->>'name',
        NEW.raw_user_meta_data->>'avatar_url'
      );
      EXIT;
    EXCEPTION WHEN unique_violation THEN
      -- username já existe, tenta com sufixo numérico
      IF final_username = base_username THEN
        final_username := base_username || '_' || floor(random() * 9000 + 1000)::int;
      ELSE
        final_username := base_username || '_' || floor(random() * 9000 + 1000)::int;
      END IF;
    END;
  END LOOP;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
