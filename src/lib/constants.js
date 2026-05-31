export const TIER_COLORS = {
  legendary: 'var(--coral)',
  veryrare: 'var(--amber)',
  rare: 'var(--amber)',
  uncommon: 'var(--accent)',
  common: 'var(--text-2)',
}

export const ANIMALS = [
  { id: 'onca', name: 'Onça-pintada', sci: 'Panthera onca', emoji: '🐆', tier: 'legendary', tierLabel: 'Lendário', pts: 580, status: 'EN', statusLabel: 'Em Perigo', where: 'Matas densas e grotões', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Panthera_onca' },
  { id: 'jacutinga', name: 'Jacutinga', sci: 'Aburria jacutinga', emoji: '🐓', tier: 'legendary', tierLabel: 'Lendário', pts: 420, status: 'EN', statusLabel: 'Em Perigo', where: 'Dossel da mata', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Aburria_jacutinga' },
  { id: 'tamandua-bandeira', name: 'Tamanduá-bandeira', sci: 'Myrmecophaga tridactyla', emoji: '🦔', tier: 'legendary', tierLabel: 'Lendário', pts: 400, status: 'VU', statusLabel: 'Vulnerável', where: 'Campos e bordas de mata', habitat: 'Campo/Mata', wiki: 'https://pt.wikipedia.org/wiki/Tamandu%C3%A1-bandeira' },
  { id: 'saudade', name: 'Saudade', sci: 'Lipaugus ater', emoji: '🐦', tier: 'veryrare', tierLabel: 'Muito Raro', pts: 260, status: 'NT', statusLabel: 'Quase ameaçado', where: 'Dossel de florestas úmidas', habitat: 'Floresta Ombrófila', wiki: 'https://pt.wikipedia.org/wiki/Lipaugus_ater' },
  { id: 'caneleirinho', name: 'Caneleirinho-de-chapéu-preto', sci: 'Piprites pileata', emoji: '🐦', tier: 'veryrare', tierLabel: 'Muito Raro', pts: 280, status: 'EN', statusLabel: 'Em Perigo', where: 'Sub-bosque de florestas altas', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Piprites_pileata' },
  { id: 'beija-flor-topete', name: 'Beija-flor-de-topete', sci: 'Stephanoxis lalandi', emoji: '🌸', tier: 'veryrare', tierLabel: 'Muito Raro', pts: 240, status: 'EN', statusLabel: 'Em Perigo', where: 'Campos de altitude e bordas', habitat: 'Campo de altitude', wiki: 'https://pt.wikipedia.org/wiki/Stephanoxis_lalandi' },
  { id: 'papagaio-roxo', name: 'Papagaio-de-peito-roxo', sci: 'Amazona vinacea', emoji: '🦜', tier: 'rare', tierLabel: 'Raro', pts: 198, status: 'CR', statusLabel: 'Criticamente ameaçado', where: 'Florestas com araucárias', habitat: 'Floresta com Araucárias', wiki: 'https://pt.wikipedia.org/wiki/Amazona_vinacea' },
  { id: 'lobo-guara', name: 'Lobo-guará', sci: 'Chrysocyon brachyurus', emoji: '🐺', tier: 'rare', tierLabel: 'Raro', pts: 210, status: 'VU', statusLabel: 'Vulnerável', where: 'Campos e cerrado de altitude', habitat: 'Cerrado/Campo', wiki: 'https://pt.wikipedia.org/wiki/Lobo-guar%C3%A1' },
  { id: 'jaguatirica', name: 'Jaguatirica', sci: 'Leopardus pardalis', emoji: '🐱', tier: 'rare', tierLabel: 'Raro', pts: 195, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Matas e capoeiras', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Jaguatirica' },
  { id: 'bugiu', name: 'Macaco-bugio', sci: 'Alouatta guariba', emoji: '🦍', tier: 'rare', tierLabel: 'Raro', pts: 185, status: 'VU', statusLabel: 'Vulnerável', where: 'Dossel da mata', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Bugio' },
  { id: 'paca', name: 'Paca', sci: 'Cuniculus paca', emoji: '🐭', tier: 'rare', tierLabel: 'Raro', pts: 175, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Próximo a rios e grotões', habitat: 'Floresta Ombrófila', wiki: 'https://pt.wikipedia.org/wiki/Paca' },
  { id: 'jabuti', name: 'Jabuti-piranga', sci: 'Chelonoidis carbonarius', emoji: '🐢', tier: 'rare', tierLabel: 'Raro', pts: 160, status: 'VU', statusLabel: 'Vulnerável', where: 'Chão da mata', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Jabuti-piranga' },
  { id: 'tucano', name: 'Tucano-de-bico-verde', sci: 'Ramphastos dicolorus', emoji: '🦅', tier: 'uncommon', tierLabel: 'Pouco Comum', pts: 90, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Dossel e bordas de mata', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Tucano-de-bico-verde' },
  { id: 'puma', name: 'Puma', sci: 'Puma concolor', emoji: '🦁', tier: 'uncommon', tierLabel: 'Pouco Comum', pts: 110, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Áreas extensas de mata', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Puma_concolor' },
  { id: 'anta', name: 'Anta', sci: 'Tapirus terrestris', emoji: '🫏', tier: 'uncommon', tierLabel: 'Pouco Comum', pts: 100, status: 'VU', statusLabel: 'Vulnerável', where: 'Próximo a rios e brejos', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Anta' },
  { id: 'sagui', name: 'Sagui-da-serra-escuro', sci: 'Callithrix aurita', emoji: '🐒', tier: 'uncommon', tierLabel: 'Pouco Comum', pts: 95, status: 'VU', statusLabel: 'Vulnerável', where: 'Matas secundárias', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Callithrix_aurita' },
  { id: 'capivara', name: 'Capivara', sci: 'Hydrochoerus hydrochaeris', emoji: '🦫', tier: 'uncommon', tierLabel: 'Pouco Comum', pts: 55, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Margens de rios e lagoas', habitat: 'Brejo/Rio', wiki: 'https://pt.wikipedia.org/wiki/Capivara' },
  { id: 'tatu-galinha', name: 'Tatu-galinha', sci: 'Dasypus novemcinctus', emoji: '🦔', tier: 'uncommon', tierLabel: 'Pouco Comum', pts: 65, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Chão da mata', habitat: 'Floresta/Campo', wiki: 'https://pt.wikipedia.org/wiki/Tatu-galinha' },
  { id: 'teiu', name: 'Teiú', sci: 'Salvator merianae', emoji: '🦎', tier: 'uncommon', tierLabel: 'Pouco Comum', pts: 55, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Clareiras e bordas de mata', habitat: 'Floresta/Campo', wiki: 'https://pt.wikipedia.org/wiki/Tei%C3%BA' },
  { id: 'quati', name: 'Quati', sci: 'Nasua nasua', emoji: '🦝', tier: 'common', tierLabel: 'Comum', pts: 38, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Matas e capoeiras', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Quati' },
  { id: 'macaco-prego', name: 'Macaco-prego', sci: 'Sapajus nigritus', emoji: '🐒', tier: 'common', tierLabel: 'Comum', pts: 35, status: 'VU', statusLabel: 'Vulnerável', where: 'Dossel da mata', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Macaco-prego' },
  { id: 'lontra', name: 'Lontra', sci: 'Lontra longicaudis', emoji: '🦦', tier: 'common', tierLabel: 'Comum', pts: 32, status: 'NT', statusLabel: 'Quase ameaçado', where: 'Rios e córregos', habitat: 'Aquático', wiki: 'https://pt.wikipedia.org/wiki/Lontra' },
  { id: 'cobertou', name: 'Cobertou', sci: 'Philander opossum', emoji: '🐀', tier: 'common', tierLabel: 'Comum', pts: 22, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Chão da mata', habitat: 'Floresta Ombrófila', wiki: 'https://pt.wikipedia.org/wiki/Philander_opossum' },
  { id: 'gamba', name: 'Gambá-de-orelha-branca', sci: 'Didelphis albiventris', emoji: '🦨', tier: 'common', tierLabel: 'Comum', pts: 20, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Áreas urbanas e matas', habitat: 'Floresta/Urbano', wiki: 'https://pt.wikipedia.org/wiki/Gamb%C3%A1-de-orelha-branca' },
  { id: 'sapo-cururu', name: 'Sapo-cururu', sci: 'Rhinella schneideri', emoji: '🐸', tier: 'common', tierLabel: 'Comum', pts: 15, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Próximo a corpos d\'água', habitat: 'Brejo/Rio', wiki: 'https://pt.wikipedia.org/wiki/Sapo-cururu' },
  { id: 'perereca', name: 'Perereca-ferreiro', sci: 'Boana faber', emoji: '🐸', tier: 'common', tierLabel: 'Comum', pts: 16, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Poças e brejos', habitat: 'Brejo/Rio', wiki: 'https://pt.wikipedia.org/wiki/Boana_faber' },
  { id: 'jararaca', name: 'Jararaca', sci: 'Bothrops jararaca', emoji: '🐍', tier: 'common', tierLabel: 'Comum', pts: 25, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Chão da mata', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Jararaca' },
  { id: 'formiga', name: 'Formiga-cortadeira', sci: 'Atta sexdens', emoji: '🐜', tier: 'common', tierLabel: 'Comum', pts: 10, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Formigueiros no chão', habitat: 'Solo', wiki: 'https://pt.wikipedia.org/wiki/Formiga-cortadeira' },
  { id: 'maria-faceira', name: 'Maria-faceira', sci: 'Syrigma sibilatrix', emoji: '🦩', tier: 'common', tierLabel: 'Comum', pts: 28, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Campos alagados', habitat: 'Brejo/Campo', wiki: 'https://pt.wikipedia.org/wiki/Maria-faceira' },
  { id: 'beija-flor-verde', name: 'Beija-flor-verde', sci: 'Chlorostilbon lucidus', emoji: '🌺', tier: 'common', tierLabel: 'Comum', pts: 20, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Jardins e bordas de mata', habitat: 'Floresta/Urbano', wiki: 'https://pt.wikipedia.org/wiki/Beija-flor-verde' },
  { id: 'corruira', name: 'Corruíra', sci: 'Troglodytes musculus', emoji: '🐦', tier: 'common', tierLabel: 'Comum', pts: 12, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Áreas abertas e jardins', habitat: 'Urbano/Campo', wiki: 'https://pt.wikipedia.org/wiki/Corru%C3%ADra' },
  { id: 'quero-quero', name: 'Quero-quero', sci: 'Vanellus chilensis', emoji: '🐦', tier: 'common', tierLabel: 'Comum', pts: 18, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Campos abertos', habitat: 'Campo', wiki: 'https://pt.wikipedia.org/wiki/Quero-quero' },
  { id: 'bem-te-vi', name: 'Bem-te-vi', sci: 'Pitangus sulphuratus', emoji: '🐦', tier: 'common', tierLabel: 'Comum', pts: 14, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Áreas abertas e urbanas', habitat: 'Urbano/Campo', wiki: 'https://pt.wikipedia.org/wiki/Bem-te-vi' },
]

export const LEVELS = [
  { min: 0, name: 'Observador Iniciante', label: 'Nível 1' },
  { min: 150, name: 'Explorador de Trilhas', label: 'Nível 2' },
  { min: 400, name: 'Rastreador', label: 'Nível 3' },
  { min: 800, name: 'Naturalista', label: 'Nível 4' },
  { min: 1300, name: 'Guardião', label: 'Nível 5' },
  { min: 1840, name: 'Explorador Experiente', label: 'Nível 6' },
  { min: 2700, name: 'Guardião Sênior', label: 'Nível 7' },
  { min: 4000, name: 'Mestre da Mantiqueira', label: 'Nível 8' },
]

export function calcLevel(pts) {
  let level = 0
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (pts >= LEVELS[i].min) {
      level = i
      break
    }
  }
  const current = LEVELS[level]
  const next = LEVELS[level + 1] || LEVELS[level]
  const currentMin = current.min
  const nextMin = next.min
  const range = nextMin - currentMin
  const progress = range > 0 ? (pts - currentMin) / range : 1
  return { level: level + 1, name: current.name, current: pts, next: nextMin, progress: Math.min(progress, 1) }
}
