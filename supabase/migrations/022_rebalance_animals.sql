-- 022: Rebalanceamento de animais e recálculo de pontos
-- Atualiza tabela animals, recalcula pts_earned das sightings e total_pts dos perfis

-- 1. Atualizar dados dos animais existentes
UPDATE animals SET name = 'Onça-pintada', tier = 'L', tier_label = 'Lendário', pts = 1800 WHERE id = 'onca-pintada';
UPDATE animals SET name = 'Onça-parda', tier = 'L', tier_label = 'Lendário', pts = 1450 WHERE id = 'onca-parda';
UPDATE animals SET name = 'Veado-campeiro', tier = 'L', tier_label = 'Lendário', pts = 2800 WHERE id = 'veado-campeiro';
UPDATE animals SET name = 'Jaguatirica', tier = 'S', tier_label = 'Mítico', pts = 550 WHERE id = 'jaguatirica';
UPDATE animals SET name = 'Ariranha', tier = 'S', tier_label = 'Mítico', pts = 600 WHERE id = 'ariranha';
UPDATE animals SET name = 'Anta', tier = 'S', tier_label = 'Mítico', pts = 700 WHERE id = 'anta';
UPDATE animals SET name = 'Cachorro-do-mato', pts = 300 WHERE id = 'cachorro-do-mato';
UPDATE animals SET name = 'Bugio', pts = 600 WHERE id = 'bugio';
UPDATE animals SET name = 'Jacu', pts = 150 WHERE id = 'jacu';
UPDATE animals SET name = 'Urutau', pts = 650 WHERE id = 'urutau';
UPDATE animals SET name = 'Jararaca', pts = 350 WHERE id = 'jararaca';
UPDATE animals SET name = 'Jaratataca', pts = 400 WHERE id = 'jaratataca';
UPDATE animals SET name = 'Caninana', pts = 260 WHERE id = 'caninana';
UPDATE animals SET name = 'Tucano', sci_name = 'Ramphastos dicolorus' WHERE id = 'tucano';
UPDATE animals SET name = 'Mico', sci_name = 'Callithrix penicillata' WHERE id = 'mico';
UPDATE animals SET name = 'Gavião', sci_name = 'Rupornis magnirostris' WHERE id = 'gaviao';
UPDATE animals SET name = 'Teiú' WHERE id = 'teiu';
UPDATE animals SET name = 'Esquilo', sci_name = 'Sciurus aestuans', pts = 600 WHERE id = 'esquilo';
UPDATE animals SET name = 'Coruja', sci_name = 'Athene cunicularia' WHERE id = 'coruja';
UPDATE animals SET name = 'Beija-flor', sci_name = 'Eupetomena macroura', pts = 60 WHERE id = 'beija-flor';
UPDATE animals SET name = 'Cascavel', tier = 'B', tier_label = 'Raro', pts = 110 WHERE id = 'cascavel';
UPDATE animals SET name = 'Capivara', pts = 95 WHERE id = 'capivara';
UPDATE animals SET name = 'Lebre', sci_name = 'Sylvilagus brasiliensis', pts = 75 WHERE id = 'lebre';
UPDATE animals SET name = 'Gambá', sci_name = 'Didelphis albiventris', pts = 70 WHERE id = 'gamba';
UPDATE animals SET name = 'Sabiá', sci_name = 'Turdus rufiventris', pts = 50 WHERE id = 'sabia';
UPDATE animals SET name = 'Cobra-cipó', pts = 40 WHERE id = 'cobra-cipo';
UPDATE animals SET name = 'João-de-barro', pts = 38 WHERE id = 'joao-de-barro';
UPDATE animals SET name = 'Sapo', sci_name = 'Rhinella schneideri' WHERE id = 'sapo-cururu';
UPDATE animals SET name = 'Rã', sci_name = 'Leptodactylus ocellatus' WHERE id = 'ra';
UPDATE animals SET name = 'Abelha', sci_name = 'Apis mellifera' WHERE id = 'abelha';
UPDATE animals SET name = 'Bem-te-vi', pts = 20 WHERE id = 'bem-te-vi';
UPDATE animals SET name = 'Pombo-doméstico', pts = 1 WHERE id = 'pombo';
UPDATE animals SET name = 'Formiga Sauva', sci_name = 'Atta sexdens' WHERE id = 'formiga-sauva';
UPDATE animals SET name = 'Mosquito-pernilongo', pts = 10 WHERE id = 'mosquito';
UPDATE animals SET name = 'Borboleta', sci_name = 'Danaus plexippus' WHERE id = 'borboleta';
UPDATE animals SET name = 'Taturana' WHERE id = 'taturana';

-- 2. Inserir animais que podem não existir na tabela
INSERT INTO animals (id, name, sci_name, emoji, tier, tier_label, pts, status, status_label, where_find, habitat, wiki_url) VALUES
  ('cascavel','Cascavel','Crotalus durissus','🐍','B','Raro',110,'LC','Pouco preocupante','Campos abertos e cerrado','Cerrado/Campo','https://pt.wikipedia.org/wiki/Cascavel'),
  ('jaratataca','Jaratataca','Conepatus semistriatus','🦨','A','Épico',400,'LC','Pouco preocupante','Campos abertos e bordas de mata','Cerrado/Campo','https://pt.wikipedia.org/wiki/Jaratataca'),
  ('esquilo','Esquilo','Sciurus aestuans','🐿️','B','Raro',600,'LC','Pouco preocupante','Matas e capoeiras','Floresta Atlântica','https://pt.wikipedia.org/wiki/Caxinguel%C3%AA'),
  ('cobra-cipo','Cobra-cipó','Chironius bicarinatus','🐍','C','Comum',40,'LC','Pouco preocupante','Matas e bordas de capoeira','Floresta Atlântica','https://pt.wikipedia.org/wiki/Cobra-cip%C3%B3'),
  ('lebre','Lebre','Sylvilagus brasiliensis','🐰','C','Comum',75,'LC','Pouco preocupante','Campos abertos e bordas de mata','Campo/Floresta','https://pt.wikipedia.org/wiki/Tapiti'),
  ('mico','Mico','Callithrix penicillata','🐒','B','Raro',90,'LC','Pouco preocupante','Matas e capoeiras','Floresta/Cerrado','https://pt.wikipedia.org/wiki/Mico-estrela'),
  ('canario-da-terra','Canarinho-da-terra','Sicalis flaveola','🐦','C','Comum',15,'LC','Pouco preocupante','Campos abertos e áreas rurais','Campo/Urbano','https://pt.wikipedia.org/wiki/Can%C3%A1rio-da-terra')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sci_name = EXCLUDED.sci_name,
  emoji = EXCLUDED.emoji,
  tier = EXCLUDED.tier,
  tier_label = EXCLUDED.tier_label,
  pts = EXCLUDED.pts,
  where_find = EXCLUDED.where_find,
  habitat = EXCLUDED.habitat,
  wiki_url = EXCLUDED.wiki_url;

-- 3. Recalcular pts_earned de todas as sightings
-- Fórmula: ROUND(animal.pts * typeMult * (1 + qualityBonus) * sightingFactor)
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
  ) = 0 THEN 2.0 ELSE 0.5 END
);

-- 4. Recalcular total_pts dos perfis
UPDATE profiles p
SET total_pts = COALESCE(
  (SELECT SUM(pts_earned) FROM sightings WHERE user_id = p.id),
  0
) + COALESCE(p.bonus_pts, 0);
