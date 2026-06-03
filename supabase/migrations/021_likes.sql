-- Migration 021: Sistema de curtidas

CREATE TABLE IF NOT EXISTS likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sighting_id UUID NOT NULL REFERENCES sightings(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(sighting_id, user_id)
);

ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

-- Qualquer usuário autenticado pode ver curtidas
CREATE POLICY "Likes são visíveis para todos autenticados"
  ON likes FOR SELECT
  TO authenticated
  USING (true);

-- Usuário só pode inserir própria curtida
CREATE POLICY "Usuário pode criar própria curtida"
  ON likes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Usuário só pode deletar própria curtida
CREATE POLICY "Usuário pode deletar própria curtida"
  ON likes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- ──────────────────────────────────────────────
-- RPC: toggle_like
-- Alterna curtida e retorna estado atual
-- ──────────────────────────────────────────────
CREATE OR REPLACE FUNCTION toggle_like(p_sighting_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID;
  v_liked BOOLEAN;
  v_count INT;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'Não autenticado');
  END IF;

  SELECT EXISTS (
    SELECT 1 FROM likes WHERE sighting_id = p_sighting_id AND user_id = v_user_id
  ) INTO v_liked;

  IF v_liked THEN
    DELETE FROM likes WHERE sighting_id = p_sighting_id AND user_id = v_user_id;
    v_liked := false;
  ELSE
    INSERT INTO likes (sighting_id, user_id) VALUES (p_sighting_id, v_user_id);
    v_liked := true;
  END IF;

  SELECT COUNT(*) INTO v_count FROM likes WHERE sighting_id = p_sighting_id;

  RETURN jsonb_build_object('success', true, 'liked', v_liked, 'count', v_count);
END;
$$;

-- ──────────────────────────────────────────────
-- RPC: get_likes_info
-- Retorna contagem e se usuário curtiu para lista de sightings
-- ──────────────────────────────────────────────
CREATE OR REPLACE FUNCTION get_likes_info(p_sighting_ids UUID[], p_user_id UUID)
RETURNS TABLE(sighting_id UUID, count BIGINT, user_liked BOOLEAN)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT
    l.sighting_id,
    COUNT(*)::BIGINT AS count,
    BOOL_OR(l.user_id = p_user_id) AS user_liked
  FROM likes l
  WHERE l.sighting_id = ANY(p_sighting_ids)
  GROUP BY l.sighting_id;
END;
$$;

-- ──────────────────────────────────────────────
-- RPC: get_likers
-- Retorna usuários que curtiram um sighting específico
-- ──────────────────────────────────────────────
CREATE OR REPLACE FUNCTION get_likers(p_sighting_id UUID)
RETURNS TABLE(user_id UUID, name TEXT, username TEXT, avatar_url TEXT, avatar_emoji TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id,
    p.name,
    p.username,
    p.avatar_url,
    p.avatar_emoji
  FROM likes l
  JOIN profiles p ON p.id = l.user_id
  WHERE l.sighting_id = p_sighting_id
  ORDER BY l.created_at DESC;
END;
$$;
