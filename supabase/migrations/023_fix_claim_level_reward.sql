-- Migration 023: Corrige validação de nível na function claim_level_reward
-- O array LEVELS não existe no PostgreSQL (é constante JS em constants.js)
-- Substitui por CASE explícito com os thresholds dos níveis

CREATE OR REPLACE FUNCTION claim_level_reward(p_level INT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID;
  v_reward  INT := 150;
  v_already BOOLEAN;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'Não autenticado');
  END IF;

  -- Checa se já reivindicou este nível
  SELECT (p_level = ANY(claimed_levels)) INTO v_already
  FROM profiles WHERE id = v_user_id;

  IF v_already THEN
    RETURN jsonb_build_object('success', false, 'error', 'Nível já reivindicado');
  END IF;

  -- Checa se o usuário realmente atingiu o nível
  -- Thresholds: Nv0=0, Nv1=50, Nv2=150, Nv3=350, Nv4=700, Nv5=1200, Nv6=2000, Nv7=3200, Nv8=5000
  IF NOT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = v_user_id
      AND total_pts >= (
        CASE p_level
          WHEN 1 THEN 50
          WHEN 2 THEN 150
          WHEN 3 THEN 350
          WHEN 4 THEN 700
          WHEN 5 THEN 1200
          WHEN 6 THEN 2000
          WHEN 7 THEN 3200
          WHEN 8 THEN 5000
          ELSE 0
        END
      )
  ) THEN
    RETURN jsonb_build_object('success', false, 'error', 'Nível não atingido');
  END IF;

  UPDATE profiles
  SET bonus_pts = bonus_pts + v_reward,
      claimed_levels = array_append(claimed_levels, p_level)
  WHERE id = v_user_id;

  RETURN jsonb_build_object('success', true, 'pts_added', v_reward);
END;
$$;
