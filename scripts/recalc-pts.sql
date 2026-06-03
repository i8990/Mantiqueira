-- =============================================================
-- Rebalanceamento de pontos dos animais + recálculo
-- Multiplicadores: FIRST=1.5, REPEAT=1.0
-- =============================================================

-- 1. Atualizar pontos e tiers dos animais na tabela animals

-- Tier L (Lendário)
UPDATE animals SET pts = 900  WHERE id = 'sapo-flamenguinho';
UPDATE animals SET pts = 1200 WHERE id = 'onca-pintada';
UPDATE animals SET pts = 800  WHERE id = 'lobo-guara';
UPDATE animals SET pts = 1000 WHERE id = 'onca-parda';
UPDATE animals SET pts = 1100 WHERE id = 'veado-campeiro';

-- Tier S (Mítico) — Esquilo movido de B para S
UPDATE animals SET tier = 'S', tier_label = 'Mítico', pts = 600 WHERE id = 'esquilo';

-- Tier A (Épico)
UPDATE animals SET pts = 200 WHERE id = 'jacu';
UPDATE animals SET pts = 220 WHERE id = 'quati';
UPDATE animals SET pts = 250 WHERE id = 'paca';
UPDATE animals SET pts = 280 WHERE id = 'caninana';
UPDATE animals SET pts = 350 WHERE id = 'bugio';
UPDATE animals SET pts = 350 WHERE id = 'jaratataca';
UPDATE animals SET pts = 380 WHERE id = 'urutau';

-- Tier B (Raro)
UPDATE animals SET pts = 140 WHERE id = 'tucano';
UPDATE animals SET pts = 110 WHERE id = 'mico';
UPDATE animals SET pts = 120 WHERE id = 'gaviao';
UPDATE animals SET pts = 100 WHERE id = 'seriema';
UPDATE animals SET pts = 100 WHERE id = 'teiu';
UPDATE animals SET pts = 100 WHERE id = 'coruja';
UPDATE animals SET pts = 100 WHERE id = 'tie-sangue';
UPDATE animals SET pts = 90  WHERE id = 'beija-flor';
UPDATE animals SET pts = 90  WHERE id = 'trinca-ferro';
UPDATE animals SET pts = 140 WHERE id = 'cascavel';
UPDATE animals SET pts = 80  WHERE id = 'jatai';

-- Tier C (Comum)
UPDATE animals SET pts = 70  WHERE id = 'capivara';
UPDATE animals SET pts = 60  WHERE id = 'lebre';
UPDATE animals SET pts = 55  WHERE id = 'gamba';
UPDATE animals SET pts = 45  WHERE id = 'cobra-cipo';
UPDATE animals SET pts = 40  WHERE id = 'joao-de-barro';
UPDATE animals SET pts = 30  WHERE id = 'rolinha';
UPDATE animals SET pts = 35  WHERE id = 'sapo-cururu';
UPDATE animals SET pts = 35  WHERE id = 'ra';
UPDATE animals SET pts = 30  WHERE id = 'abelha';
UPDATE animals SET pts = 25  WHERE id = 'camundongo';
UPDATE animals SET pts = 20  WHERE id = 'canario-da-terra';

-- Tier D (Muito Comum)
UPDATE animals SET pts = 10 WHERE id = 'pardal';
UPDATE animals SET pts = 6  WHERE id = 'pombo';
UPDATE animals SET pts = 12 WHERE id = 'lagartixa';
UPDATE animals SET pts = 12 WHERE id = 'borboleta';
UPDATE animals SET pts = 8  WHERE id = 'mosquito';
UPDATE animals SET pts = 8  WHERE id = 'mariposa';

-- =============================================================
-- 2. Recalcular pts_earned de todas as sightings
-- Fórmula: ROUND(animal.pts * typeMult * (1 + qualityBonus) * sightingFactor)
-- FIRST_SIGHTING_MULTIPLIER = 1.5
-- REPEAT_SIGHTING_MULTIPLIER = 1.0
-- =============================================================

UPDATE sightings s
SET pts_earned = ROUND(
  (SELECT a.pts FROM animals a WHERE a.id = s.animal_id) *
  CASE s.sighting_type
    WHEN 'foto' THEN 1.0
    WHEN 'pegada' THEN 0.6
    WHEN 'atropelamento' THEN 0.4
    WHEN 'comunicacao' THEN 0.2
    ELSE 1.0
  END *
  (1.0 +
    CASE WHEN COALESCE(LENGTH(s.description), 0) > 10 THEN 0.1 ELSE 0 END +
    CASE WHEN s.lat IS NOT NULL AND s.lng IS NOT NULL THEN 0.1 ELSE 0 END +
    CASE WHEN s.observed_at IS NOT NULL THEN 0.1 ELSE 0 END
  ) *
  CASE WHEN (
    SELECT COUNT(*) FROM sightings s2
    WHERE s2.animal_id = s.animal_id
      AND (s2.created_at < s.created_at OR (s2.created_at = s.created_at AND s2.id < s.id))
  ) = 0 THEN 1.5 ELSE 1.0 END
);

-- =============================================================
-- 3. Recalcular total_pts de todos os perfis (sightings + bonus_pts)
-- =============================================================

UPDATE profiles p
SET total_pts = COALESCE(
  (SELECT SUM(pts_earned) FROM sightings WHERE user_id = p.id),
  0
) + COALESCE(p.bonus_pts, 0);
