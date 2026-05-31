CREATE TABLE animals (
  id           TEXT PRIMARY KEY,
  name         TEXT NOT NULL,
  sci_name     TEXT,
  emoji        TEXT,
  tier         TEXT CHECK (tier IN ('legendary','veryrare','rare','uncommon','common')),
  tier_label   TEXT,
  pts          INT,
  status       TEXT,
  status_label TEXT,
  where_find   TEXT,
  habitat      TEXT,
  wiki_url     TEXT,
  is_active    BOOLEAN DEFAULT TRUE
);

ALTER TABLE animals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Animals are publicly viewable"
  ON animals FOR SELECT
  USING (TRUE);

INSERT INTO animals (id, name, sci_name, emoji, tier, tier_label, pts, status, status_label, where_find, habitat, wiki_url) VALUES
  ('onca', 'Onça-pintada', 'Panthera onca', '🐆', 'legendary', 'Lendário', 580, 'EN', 'Em Perigo', 'Matas densas e grotões', 'Floresta Atlântica', 'https://pt.wikipedia.org/wiki/Panthera_onca'),
  ('jacutinga', 'Jacutinga', 'Aburria jacutinga', '🐓', 'legendary', 'Lendário', 420, 'EN', 'Em Perigo', 'Dossel da mata', 'Floresta Atlântica', 'https://pt.wikipedia.org/wiki/Aburria_jacutinga'),
  ('tamandua-bandeira', 'Tamanduá-bandeira', 'Myrmecophaga tridactyla', '🦔', 'legendary', 'Lendário', 400, 'VU', 'Vulnerável', 'Campos e bordas de mata', 'Campo/Mata', 'https://pt.wikipedia.org/wiki/Tamandu%C3%A1-bandeira'),
  ('saudade', 'Saudade', 'Lipaugus ater', '🐦', 'veryrare', 'Muito Raro', 260, 'NT', 'Quase ameaçado', 'Dossel de florestas úmidas', 'Floresta Ombrófila', 'https://pt.wikipedia.org/wiki/Lipaugus_ater'),
  ('caneleirinho', 'Caneleirinho-de-chapéu-preto', 'Piprites pileata', '🐦', 'veryrare', 'Muito Raro', 280, 'EN', 'Em Perigo', 'Sub-bosque de florestas altas', 'Floresta Atlântica', 'https://pt.wikipedia.org/wiki/Piprites_pileata'),
  ('beija-flor-topete', 'Beija-flor-de-topete', 'Stephanoxis lalandi', '🌸', 'veryrare', 'Muito Raro', 240, 'EN', 'Em Perigo', 'Campos de altitude e bordas', 'Campo de altitude', 'https://pt.wikipedia.org/wiki/Stephanoxis_lalandi'),
  ('papagaio-roxo', 'Papagaio-de-peito-roxo', 'Amazona vinacea', '🦜', 'rare', 'Raro', 198, 'CR', 'Criticamente ameaçado', 'Florestas com araucárias', 'Floresta com Araucárias', 'https://pt.wikipedia.org/wiki/Amazona_vinacea'),
  ('lobo-guara', 'Lobo-guará', 'Chrysocyon brachyurus', '🐺', 'rare', 'Raro', 210, 'VU', 'Vulnerável', 'Campos e cerrado de altitude', 'Cerrado/Campo', 'https://pt.wikipedia.org/wiki/Lobo-guar%C3%A1'),
  ('jaguatirica', 'Jaguatirica', 'Leopardus pardalis', '🐱', 'rare', 'Raro', 195, 'LC', 'Pouco preocupante', 'Matas e capoeiras', 'Floresta Atlântica', 'https://pt.wikipedia.org/wiki/Jaguatirica'),
  ('bugiu', 'Macaco-bugio', 'Alouatta guariba', '🦍', 'rare', 'Raro', 185, 'VU', 'Vulnerável', 'Dossel da mata', 'Floresta Atlântica', 'https://pt.wikipedia.org/wiki/Bugio'),
  ('paca', 'Paca', 'Cuniculus paca', '🐭', 'rare', 'Raro', 175, 'LC', 'Pouco preocupante', 'Próximo a rios e grotões', 'Floresta Ombrófila', 'https://pt.wikipedia.org/wiki/Paca'),
  ('jabuti', 'Jabuti-piranga', 'Chelonoidis carbonarius', '🐢', 'rare', 'Raro', 160, 'VU', 'Vulnerável', 'Chão da mata', 'Floresta Atlântica', 'https://pt.wikipedia.org/wiki/Jabuti-piranga'),
  ('tucano', 'Tucano-de-bico-verde', 'Ramphastos dicolorus', '🦅', 'uncommon', 'Pouco Comum', 90, 'LC', 'Pouco preocupante', 'Dossel e bordas de mata', 'Floresta Atlântica', 'https://pt.wikipedia.org/wiki/Tucano-de-bico-verde'),
  ('puma', 'Puma', 'Puma concolor', '🦁', 'uncommon', 'Pouco Comum', 110, 'LC', 'Pouco preocupante', 'Áreas extensas de mata', 'Floresta Atlântica', 'https://pt.wikipedia.org/wiki/Puma_concolor'),
  ('anta', 'Anta', 'Tapirus terrestris', '🫏', 'uncommon', 'Pouco Comum', 100, 'VU', 'Vulnerável', 'Próximo a rios e brejos', 'Floresta Atlântica', 'https://pt.wikipedia.org/wiki/Anta'),
  ('sagui', 'Sagui-da-serra-escuro', 'Callithrix aurita', '🐒', 'uncommon', 'Pouco Comum', 95, 'VU', 'Vulnerável', 'Matas secundárias', 'Floresta Atlântica', 'https://pt.wikipedia.org/wiki/Callithrix_aurita'),
  ('capivara', 'Capivara', 'Hydrochoerus hydrochaeris', '🦫', 'uncommon', 'Pouco Comum', 55, 'LC', 'Pouco preocupante', 'Margens de rios e lagoas', 'Brejo/Rio', 'https://pt.wikipedia.org/wiki/Capivara'),
  ('tatu-galinha', 'Tatu-galinha', 'Dasypus novemcinctus', '🦔', 'uncommon', 'Pouco Comum', 65, 'LC', 'Pouco preocupante', 'Chão da mata', 'Floresta/Campo', 'https://pt.wikipedia.org/wiki/Tatu-galinha'),
  ('teiu', 'Teiú', 'Salvator merianae', '🦎', 'uncommon', 'Pouco Comum', 55, 'LC', 'Pouco preocupante', 'Clareiras e bordas de mata', 'Floresta/Campo', 'https://pt.wikipedia.org/wiki/Tei%C3%BA'),
  ('quati', 'Quati', 'Nasua nasua', '🦝', 'common', 'Comum', 38, 'LC', 'Pouco preocupante', 'Matas e capoeiras', 'Floresta Atlântica', 'https://pt.wikipedia.org/wiki/Quati'),
  ('macaco-prego', 'Macaco-prego', 'Sapajus nigritus', '🐒', 'common', 'Comum', 35, 'VU', 'Vulnerável', 'Dossel da mata', 'Floresta Atlântica', 'https://pt.wikipedia.org/wiki/Macaco-prego'),
  ('lontra', 'Lontra', 'Lontra longicaudis', '🦦', 'common', 'Comum', 32, 'NT', 'Quase ameaçado', 'Rios e córregos', 'Aquático', 'https://pt.wikipedia.org/wiki/Lontra'),
  ('cobertou', 'Cobertou', 'Philander opossum', '🐀', 'common', 'Comum', 22, 'LC', 'Pouco preocupante', 'Chão da mata', 'Floresta Ombrófila', 'https://pt.wikipedia.org/wiki/Philander_opossum'),
  ('gamba', 'Gambá-de-orelha-branca', 'Didelphis albiventris', '🦨', 'common', 'Comum', 20, 'LC', 'Pouco preocupante', 'Áreas urbanas e matas', 'Floresta/Urbano', 'https://pt.wikipedia.org/wiki/Gamb%C3%A1-de-orelha-branca'),
  ('sapo-cururu', 'Sapo-cururu', 'Rhinella schneideri', '🐸', 'common', 'Comum', 15, 'LC', 'Pouco preocupante', 'Próximo a corpos d''água', 'Brejo/Rio', 'https://pt.wikipedia.org/wiki/Sapo-cururu'),
  ('perereca', 'Perereca-ferreiro', 'Boana faber', '🐸', 'common', 'Comum', 16, 'LC', 'Pouco preocupante', 'Poças e brejos', 'Brejo/Rio', 'https://pt.wikipedia.org/wiki/Boana_faber'),
  ('jararaca', 'Jararaca', 'Bothrops jararaca', '🐍', 'common', 'Comum', 25, 'LC', 'Pouco preocupante', 'Chão da mata', 'Floresta Atlântica', 'https://pt.wikipedia.org/wiki/Jararaca'),
  ('formiga', 'Formiga-cortadeira', 'Atta sexdens', '🐜', 'common', 'Comum', 10, 'LC', 'Pouco preocupante', 'Formigueiros no chão', 'Solo', 'https://pt.wikipedia.org/wiki/Formiga-cortadeira'),
  ('maria-faceira', 'Maria-faceira', 'Syrigma sibilatrix', '🦩', 'common', 'Comum', 28, 'LC', 'Pouco preocupante', 'Campos alagados', 'Brejo/Campo', 'https://pt.wikipedia.org/wiki/Maria-faceira'),
  ('beija-flor-verde', 'Beija-flor-verde', 'Chlorostilbon lucidus', '🌺', 'common', 'Comum', 20, 'LC', 'Pouco preocupante', 'Jardins e bordas de mata', 'Floresta/Urbano', 'https://pt.wikipedia.org/wiki/Beija-flor-verde'),
  ('corruira', 'Corruíra', 'Troglodytes musculus', '🐦', 'common', 'Comum', 12, 'LC', 'Pouco preocupante', 'Áreas abertas e jardins', 'Urbano/Campo', 'https://pt.wikipedia.org/wiki/Corru%C3%ADra'),
  ('quero-quero', 'Quero-quero', 'Vanellus chilensis', '🐦', 'common', 'Comum', 18, 'LC', 'Pouco preocupante', 'Campos abertos', 'Campo', 'https://pt.wikipedia.org/wiki/Quero-quero'),
  ('bem-te-vi', 'Bem-te-vi', 'Pitangus sulphuratus', '🐦', 'common', 'Comum', 14, 'LC', 'Pouco preocupante', 'Áreas abertas e urbanas', 'Urbano/Campo', 'https://pt.wikipedia.org/wiki/Bem-te-vi');
