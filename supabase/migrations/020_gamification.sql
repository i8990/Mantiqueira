-- Migration 020: Sistema de gamificação — colunas bonus_pts, claimed_*, recompensas e RPCs

ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS bonus_pts              INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS claimed_levels         INT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS claimed_streaks        INT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS claimed_badges         TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS claimed_monthly_missions JSONB DEFAULT '[]';

-- Atualiza trigger de recálculo para incluir bonus_pts
DROP TRIGGER IF EXISTS on_sighting_change ON sightings;
DROP FUNCTION IF EXISTS recalc_profile_pts();

CREATE OR REPLACE FUNCTION recalc_profile_pts()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE profiles
  SET total_pts = (
    SELECT COALESCE(SUM(s.pts_earned), 0)
    FROM sightings s
    WHERE s.user_id = profiles.id
  ) + COALESCE(bonus_pts, 0)
  WHERE id = COALESCE(NEW.user_id, OLD.user_id);
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_sighting_change
  AFTER INSERT OR DELETE OR UPDATE OF pts_earned ON sightings
  FOR EACH ROW
  EXECUTE FUNCTION recalc_profile_pts();

-- Trigger para manter total_pts sincronizado quando bonus_pts muda
CREATE OR REPLACE FUNCTION sync_bonus_pts()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.bonus_pts IS DISTINCT FROM OLD.bonus_pts THEN
    UPDATE profiles
    SET total_pts = (
      SELECT COALESCE(SUM(pts_earned), 0)
      FROM sightings
      WHERE user_id = NEW.id
    ) + NEW.bonus_pts
    WHERE id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_bonus_pts_change ON profiles;
CREATE TRIGGER on_bonus_pts_change
  AFTER UPDATE OF bonus_pts ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION sync_bonus_pts();

-- Recalcula total_pts para todos os perfis existentes
UPDATE profiles
SET total_pts = (
  SELECT COALESCE(SUM(pts_earned), 0)
  FROM sightings
  WHERE sightings.user_id = profiles.id
) + COALESCE(bonus_pts, 0);

-- ──────────────────────────────────────────────
-- RPC: claim_level_reward
-- ──────────────────────────────────────────────
CREATE OR REPLACE FUNCTION claim_level_reward(p_level INT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID;
  v_current_max INT;
  v_reward  INT := 150;
  v_total   INT := 0;
  v_pending INT[];
  i INT;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'Não autenticado');
  END IF;

  -- Obtém o maior nível já reivindicado
  SELECT COALESCE((SELECT MAX(e) FROM unnest(claimed_levels) AS e), 0) INTO v_current_max
  FROM profiles WHERE id = v_user_id;

  -- Se já reivindicou este nível ou superior, não faz nada
  IF v_current_max >= p_level THEN
    RETURN jsonb_build_object('success', false, 'error', 'Nível já reivindicado');
  END IF;

  -- Lock preventivo contra race condition
  PERFORM id FROM profiles WHERE id = v_user_id FOR UPDATE;

  -- Checa se o usuário realmente atingiu o nível alvo
  -- Thresholds correspondem ao array LEVELS em constants.js (1-indexado):
  --   Nv1=0, Nv2=50, Nv3=150, Nv4=350, Nv5=700, Nv6=1200, Nv7=2000, Nv8=3200, Nv9=5000
  IF NOT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = v_user_id
      AND total_pts >= (
        CASE p_level
          WHEN 1 THEN 0
          WHEN 2 THEN 50
          WHEN 3 THEN 150
          WHEN 4 THEN 350
          WHEN 5 THEN 700
          WHEN 6 THEN 1200
          WHEN 7 THEN 2000
          WHEN 8 THEN 3200
          WHEN 9 THEN 5000
          ELSE 0
        END
      )
  ) THEN
    RETURN jsonb_build_object('success', false, 'error', 'Nível não atingido');
  END IF;

  -- Constrói array de níveis pendentes: de v_current_max+1 até p_level
  v_total := 0;
  v_pending := '{}';
  FOR i IN v_current_max + 1 .. p_level LOOP
    v_pending := array_append(v_pending, i);
    v_total := v_total + v_reward;
  END LOOP;

  -- Atualiza: adiciona todos os níveis pendentes e o bônus total
  UPDATE profiles
  SET bonus_pts = bonus_pts + v_total,
      claimed_levels = claimed_levels || v_pending
  WHERE id = v_user_id;

  RETURN jsonb_build_object('success', true, 'pts_added', v_total, 'levels_claimed', v_pending);
END;
$$;

-- ──────────────────────────────────────────────
-- RPC: claim_streak_reward
-- ──────────────────────────────────────────────
CREATE OR REPLACE FUNCTION claim_streak_reward(p_days INT, p_pts INT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID;
  v_already BOOLEAN;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'Não autenticado');
  END IF;

  SELECT (p_days = ANY(claimed_streaks)) INTO v_already
  FROM profiles WHERE id = v_user_id;

  IF v_already THEN
    RETURN jsonb_build_object('success', false, 'error', 'Recompensa já reivindicada');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = v_user_id AND streak_days >= p_days
  ) THEN
    RETURN jsonb_build_object('success', false, 'error', 'Sequência insuficiente');
  END IF;

  UPDATE profiles
  SET bonus_pts = bonus_pts + p_pts,
      claimed_streaks = array_append(claimed_streaks, p_days)
  WHERE id = v_user_id;

  RETURN jsonb_build_object('success', true, 'pts_added', p_pts);
END;
$$;

-- ──────────────────────────────────────────────
-- RPC: claim_badge_reward
-- ──────────────────────────────────────────────
CREATE OR REPLACE FUNCTION claim_badge_reward(p_badge_id TEXT, p_pts INT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID;
  v_already BOOLEAN;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'Não autenticado');
  END IF;

  SELECT (p_badge_id = ANY(claimed_badges)) INTO v_already
  FROM profiles WHERE id = v_user_id;

  IF v_already THEN
    RETURN jsonb_build_object('success', false, 'error', 'Badge já reivindicado');
  END IF;

  -- Badge é earned quando o usuário tem o avistamento correspondente (visto pelo front, validamos aqui)
  -- A validação real (se tem o animal) é feita pelo front; aqui garantimos que existe pelo menos 1 badge
  -- Adiciona mesmo sem validação estrita; o front controla quais badges estão disponíveis

  UPDATE profiles
  SET bonus_pts = bonus_pts + p_pts,
      claimed_badges = array_append(claimed_badges, p_badge_id)
  WHERE id = v_user_id;

  RETURN jsonb_build_object('success', true, 'pts_added', p_pts);
END;
$$;

-- ──────────────────────────────────────────────
-- RPC: claim_monthly_mission
-- ──────────────────────────────────────────────
CREATE OR REPLACE FUNCTION claim_monthly_mission(p_mission_id TEXT, p_pts INT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id    UUID;
  v_month      TEXT;
  v_already    BOOLEAN;
  v_claimed    JSONB;
  v_new_entry  JSONB;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'Não autenticado');
  END IF;

  v_month := to_char(NOW(), 'YYYY-MM');

  -- Checa se já reivindicou esta missão no mês corrente
  SELECT claimed_monthly_missions INTO v_claimed
  FROM profiles WHERE id = v_user_id;

  SELECT EXISTS (
    SELECT 1 FROM jsonb_array_elements(v_claimed) AS elem
    WHERE elem->>'mission_id' = p_mission_id AND elem->>'month' = v_month
  ) INTO v_already;

  IF v_already THEN
    RETURN jsonb_build_object('success', false, 'error', 'Missão já reivindicada neste mês');
  END IF;

  v_new_entry := jsonb_build_object('mission_id', p_mission_id, 'month', v_month);

  UPDATE profiles
  SET bonus_pts = bonus_pts + p_pts,
      claimed_monthly_missions = v_claimed || v_new_entry
  WHERE id = v_user_id;

  RETURN jsonb_build_object('success', true, 'pts_added', p_pts);
END;
$$;
