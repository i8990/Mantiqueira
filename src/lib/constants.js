export const TIER_COLORS = {
  legendary: 'var(--coral)',
  veryrare: 'var(--amber)',
  rare: 'var(--amber)',
  uncommon: 'var(--accent)',
  common: 'var(--text-2)',
}

export const DANGER_CONFIG = {
  critico: { label: 'Crítico', color: '#E85B3C', emoji: '🔴' },
  alto: { label: 'Alto', color: '#F5A733', emoji: '🟠' },
  medio: { label: 'Médio', color: '#FFD700', emoji: '🟡' },
  baixo: { label: 'Baixo', color: '#3CE87A', emoji: '🟢' },
  inofensivo: { label: 'Inofensivo', color: '#7FB88A', emoji: '⚪' },
}

export const ANIMALS = [
  { id: 'onca', name: 'Onça-pintada', sci: 'Panthera onca', emoji: '🐆', tier: 'legendary', tierLabel: 'Lendário', pts: 580, status: 'EN', statusLabel: 'Em Perigo', where: 'Matas densas e grotões', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Panthera_onca', danger: 'critico', habits: ['🥩 Carnívoro', '🌙 Noturno', '🗺️ Territorial'], howToFind: 'Grotões e matas densas fechadas; evite andar sozinho ao amanhecer e entardecer' },
  { id: 'jacutinga', name: 'Jacutinga', sci: 'Aburria jacutinga', emoji: '🐓', tier: 'legendary', tierLabel: 'Lendário', pts: 420, status: 'EN', statusLabel: 'Em Perigo', where: 'Dossel da mata', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Aburria_jacutinga', danger: 'baixo', habits: ['🌳 Arborícola', '🍉 Frugívoro', '☀️ Diurno'], howToFind: 'Olhe para o alto, no dossel de florestas bem preservadas' },
  { id: 'tamandua-bandeira', name: 'Tamanduá-bandeira', sci: 'Myrmecophaga tridactyla', emoji: '🦔', tier: 'legendary', tierLabel: 'Lendário', pts: 400, status: 'VU', statusLabel: 'Vulnerável', where: 'Campos e bordas de mata', habitat: 'Campo/Mata', wiki: 'https://pt.wikipedia.org/wiki/Tamandu%C3%A1-bandeira', danger: 'alto', habits: ['🐜 Insetívoro', '🌅 Crepuscular', '🤺 Solitário'], howToFind: 'Campos abertos e bordas de mata; não se aproxime — garras poderosas' },
  { id: 'saudade', name: 'Saudade', sci: 'Lipaugus ater', emoji: '🐦', tier: 'veryrare', tierLabel: 'Muito Raro', pts: 260, status: 'NT', statusLabel: 'Quase ameaçado', where: 'Dossel de florestas úmidas', habitat: 'Floresta Ombrófila', wiki: 'https://pt.wikipedia.org/wiki/Lipaugus_ater', danger: 'inofensivo', habits: ['🎵 Canto alto', '🍉 Frugívoro', '🌳 Dossel'], howToFind: 'Ouça o canto estridente vindo do alto da mata' },
  { id: 'caneleirinho', name: 'Caneleirinho-de-chapéu-preto', sci: 'Piprites pileata', emoji: '🐦', tier: 'veryrare', tierLabel: 'Muito Raro', pts: 280, status: 'EN', statusLabel: 'Em Perigo', where: 'Sub-bosque de florestas altas', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Piprites_pileata', danger: 'inofensivo', habits: ['🪲 Insetívoro', '🌳 Sub-bosque', '☀️ Ativo'], howToFind: 'Paciência no sub-bosque de florestas bem conservadas' },
  { id: 'beija-flor-topete', name: 'Beija-flor-de-topete', sci: 'Stephanoxis lalandi', emoji: '🌸', tier: 'veryrare', tierLabel: 'Muito Raro', pts: 240, status: 'EN', statusLabel: 'Em Perigo', where: 'Campos de altitude e bordas', habitat: 'Campo de altitude', wiki: 'https://pt.wikipedia.org/wiki/Stephanoxis_lalandi', danger: 'baixo', habits: ['🌸 Néctar', '✈️ Voo rápido', '🗺️ Territorial'], howToFind: 'Campos de altitude com flores; observe movimentos rápidos' },
  { id: 'papagaio-roxo', name: 'Papagaio-de-peito-roxo', sci: 'Amazona vinacea', emoji: '🦜', tier: 'rare', tierLabel: 'Raro', pts: 198, status: 'CR', statusLabel: 'Criticamente ameaçado', where: 'Florestas com araucárias', habitat: 'Floresta com Araucárias', wiki: 'https://pt.wikipedia.org/wiki/Amazona_vinacea', danger: 'inofensivo', habits: ['🍉 Frugívoro', '🎶 Vocal', '👨‍👩‍👧‍👧 Grupos'], howToFind: 'Próximo a araucárias; ouça os chamados em grupo' },
  { id: 'lobo-guara', name: 'Lobo-guará', sci: 'Chrysocyon brachyurus', emoji: '🐺', tier: 'rare', tierLabel: 'Raro', pts: 210, status: 'VU', statusLabel: 'Vulnerável', where: 'Campos e cerrado de altitude', habitat: 'Cerrado/Campo', wiki: 'https://pt.wikipedia.org/wiki/Lobo-guar%C3%A1', danger: 'alto', habits: ['🍎 Onívoro', '🌅 Crepuscular', '🤺 Solitário'], howToFind: 'Campos abertos no fim da tarde; mantenha distância' },
  { id: 'jaguatirica', name: 'Jaguatirica', sci: 'Leopardus pardalis', emoji: '🐱', tier: 'rare', tierLabel: 'Raro', pts: 195, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Matas e capoeiras', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Jaguatirica', danger: 'alto', habits: ['🥩 Carnívoro', '🌙 Noturno', '🤺 Solitário'], howToFind: 'Áreas de mata fechada; raramente vista, mais ativa à noite' },
  { id: 'bugiu', name: 'Macaco-bugio', sci: 'Alouatta guariba', emoji: '🦍', tier: 'rare', tierLabel: 'Raro', pts: 185, status: 'VU', statusLabel: 'Vulnerável', where: 'Dossel da mata', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Bugio', danger: 'alto', habits: ['🍉 Frugívoro', '🎵 Vocal', '👨‍👩‍👧‍👧 Grupos'], howToFind: 'Ouça o rugido característico ao amanhecer; não se aproxime' },
  { id: 'paca', name: 'Paca', sci: 'Cuniculus paca', emoji: '🐭', tier: 'rare', tierLabel: 'Raro', pts: 175, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Próximo a rios e grotões', habitat: 'Floresta Ombrófila', wiki: 'https://pt.wikipedia.org/wiki/Paca', danger: 'baixo', habits: ['🥜 Herbívoro', '🌙 Noturno', '💧 Ribeirinho'], howToFind: 'Próximo a riachos e grotões; mais ativa ao anoitecer' },
  { id: 'jabuti', name: 'Jabuti-piranga', sci: 'Chelonoidis carbonarius', emoji: '🐢', tier: 'rare', tierLabel: 'Raro', pts: 160, status: 'VU', statusLabel: 'Vulnerável', where: 'Chão da mata', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Jabuti-piranga', danger: 'inofensivo', habits: ['🍉 Frugívoro', '🐢 Lento', '☀️ Diurno'], howToFind: 'Chão da mata, principalmente após chuvas' },
  { id: 'tucano', name: 'Tucano-de-bico-verde', sci: 'Ramphastos dicolorus', emoji: '🦅', tier: 'uncommon', tierLabel: 'Pouco Comum', pts: 90, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Dossel e bordas de mata', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Tucano-de-bico-verde', danger: 'baixo', habits: ['🍉 Frugívoro', '🌳 Dossel', '🎵 Vocal'], howToFind: 'Olhe para o alto nas bordas de mata; ouça o canto' },
  { id: 'puma', name: 'Puma', sci: 'Puma concolor', emoji: '🦁', tier: 'uncommon', tierLabel: 'Pouco Comum', pts: 110, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Áreas extensas de mata', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Puma_concolor', danger: 'critico', habits: ['🥩 Carnívoro', '🌙 Noturno', '🗺️ Territorial'], howToFind: 'Áreas extensas de mata; extremamente arredio — se ver, afaste-se devagar' },
  { id: 'anta', name: 'Anta', sci: 'Tapirus terrestris', emoji: '🫏', tier: 'uncommon', tierLabel: 'Pouco Comum', pts: 100, status: 'VU', statusLabel: 'Vulnerável', where: 'Próximo a rios e brejos', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Anta', danger: 'alto', habits: ['🥜 Herbívoro', '🌙 Noturno', '💧 Ribeirinho'], howToFind: 'Margens de rios e brejos; pode ser agressiva se encurralada' },
  { id: 'sagui', name: 'Sagui-da-serra-escuro', sci: 'Callithrix aurita', emoji: '🐒', tier: 'uncommon', tierLabel: 'Pouco Comum', pts: 95, status: 'VU', statusLabel: 'Vulnerável', where: 'Matas secundárias', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Callithrix_aurita', danger: 'baixo', habits: ['🍉 Frugívoro', '🌳 Arborícola', '☀️ Diurno'], howToFind: 'Matas secundárias; siga os chamados agudos' },
  { id: 'capivara', name: 'Capivara', sci: 'Hydrochoerus hydrochaeris', emoji: '🦫', tier: 'uncommon', tierLabel: 'Pouco Comum', pts: 55, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Margens de rios e lagoas', habitat: 'Brejo/Rio', wiki: 'https://pt.wikipedia.org/wiki/Capivara', danger: 'medio', habits: ['🌿 Herbívoro', '💧 Aquática', '👨‍👩‍👧‍👧 Grupos'], howToFind: 'Margens de rios e lagoas; não encurrale — pode morder' },
  { id: 'tatu-galinha', name: 'Tatu-galinha', sci: 'Dasypus novemcinctus', emoji: '🦔', tier: 'uncommon', tierLabel: 'Pouco Comum', pts: 65, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Chão da mata', habitat: 'Floresta/Campo', wiki: 'https://pt.wikipedia.org/wiki/Tatu-galinha', danger: 'medio', habits: ['🐜 Insetívoro', '🌙 Noturno', '🕳️ Escavador'], howToFind: 'Chão da mata; procure por tocas e áreas remexidas' },
  { id: 'teiu', name: 'Teiú', sci: 'Salvator merianae', emoji: '🦎', tier: 'uncommon', tierLabel: 'Pouco Comum', pts: 55, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Clareiras e bordas de mata', habitat: 'Floresta/Campo', wiki: 'https://pt.wikipedia.org/wiki/Tei%C3%BA', danger: 'medio', habits: ['🥩 Onívoro', '☀️ Diurno', '🌡️ Termorregula'], howToFind: 'Clareiras e bordas de mata; pode morder se provocado' },
  { id: 'quati', name: 'Quati', sci: 'Nasua nasua', emoji: '🦝', tier: 'common', tierLabel: 'Comum', pts: 38, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Matas e capoeiras', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Quati', danger: 'medio', habits: ['🌳 Onívoro', '☀️ Diurno', '👨‍👩‍👧‍👧 Grupos'], howToFind: 'Matas e capoeiras em bandos; não se aproxime de filhotes' },
  { id: 'macaco-prego', name: 'Macaco-prego', sci: 'Sapajus nigritus', emoji: '🐒', tier: 'common', tierLabel: 'Comum', pts: 35, status: 'VU', statusLabel: 'Vulnerável', where: 'Dossel da mata', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Macaco-prego', danger: 'medio', habits: ['🛠️ Usa ferramentas', '🍉 Onívoro', '👨‍👩‍👧‍👧 Grupos'], howToFind: 'Dossel da mata; inteligente e curioso — não ofereça comida' },
  { id: 'lontra', name: 'Lontra', sci: 'Lontra longicaudis', emoji: '🦦', tier: 'common', tierLabel: 'Comum', pts: 32, status: 'NT', statusLabel: 'Quase ameaçado', where: 'Rios e córregos', habitat: 'Aquático', wiki: 'https://pt.wikipedia.org/wiki/Lontra', danger: 'baixo', habits: ['🐟 Piscívora', '🌊 Aquática', '🎮 Brincalhona'], howToFind: 'Rios e córregos limpos; observe na superfície' },
  { id: 'cobertou', name: 'Cobertou', sci: 'Philander opossum', emoji: '🐀', tier: 'common', tierLabel: 'Comum', pts: 22, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Chão da mata', habitat: 'Floresta Ombrófila', wiki: 'https://pt.wikipedia.org/wiki/Philander_opossum', danger: 'medio', habits: ['🥩 Onívoro', '🌙 Noturno', '🌳 Solo'], howToFind: 'Chão da mata à noite; se ameaçado, finge-se de morto' },
  { id: 'gamba', name: 'Gambá-de-orelha-branca', sci: 'Didelphis albiventris', emoji: '🦨', tier: 'common', tierLabel: 'Comum', pts: 20, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Áreas urbanas e matas', habitat: 'Floresta/Urbano', wiki: 'https://pt.wikipedia.org/wiki/Gamb%C3%A1-de-orelha-branca', danger: 'medio', habits: ['🥩 Onívoro', '🌙 Noturno', '🏘️ Urbano'], howToFind: 'Áreas urbanas e matas; noturno, evite contato' },
  { id: 'sapo-cururu', name: 'Sapo-cururu', sci: 'Rhinella schneideri', emoji: '🐸', tier: 'common', tierLabel: 'Comum', pts: 15, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Próximo a corpos d\'água', habitat: 'Brejo/Rio', wiki: 'https://pt.wikipedia.org/wiki/Sapo-cururu', danger: 'medio', habits: ['🐜 Insetívoro', '🌙 Noturno', '💧 Úmido'], howToFind: 'Próximo a corpos d\'água; não toque — glândulas venenosas' },
  { id: 'perereca', name: 'Perereca-ferreiro', sci: 'Boana faber', emoji: '🐸', tier: 'common', tierLabel: 'Comum', pts: 16, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Poças e brejos', habitat: 'Brejo/Rio', wiki: 'https://pt.wikipedia.org/wiki/Boana_faber', danger: 'inofensivo', habits: ['🎵 Canto metálico', '🌙 Noturno', '🏗️ Construtora'], howToFind: 'Poças e brejos; siga o canto metálico' },
  { id: 'jararaca', name: 'Jararaca', sci: 'Bothrops jararaca', emoji: '🐍', tier: 'common', tierLabel: 'Comum', pts: 25, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Chão da mata', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Jararaca', danger: 'critico', habits: ['🥩 Carnívora', '🌙 Noturna', '🪤 Emboscada'], howToFind: 'Chão da mata, especialmente em dias quentes; olhe onde pisa' },
  { id: 'formiga', name: 'Formiga-cortadeira', sci: 'Atta sexdens', emoji: '🐜', tier: 'common', tierLabel: 'Comum', pts: 10, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Formigueiros no chão', habitat: 'Solo', wiki: 'https://pt.wikipedia.org/wiki/Formiga-cortadeira', danger: 'inofensivo', habits: ['🌿 Cortadeira', '👷‍♀️ Colônia', '🌳 Subterrânea'], howToFind: 'Trilhas de formigas carregando folhas no chão' },
  { id: 'maria-faceira', name: 'Maria-faceira', sci: 'Syrigma sibilatrix', emoji: '🦩', tier: 'common', tierLabel: 'Comum', pts: 28, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Campos alagados', habitat: 'Brejo/Campo', wiki: 'https://pt.wikipedia.org/wiki/Maria-faceira', danger: 'inofensivo', habits: ['🐟 Piscívora', '💧 Alagados', '☀️ Diurna'], howToFind: 'Campos alagados e brejos' },
  { id: 'beija-flor-verde', name: 'Beija-flor-verde', sci: 'Chlorostilbon lucidus', emoji: '🌺', tier: 'common', tierLabel: 'Comum', pts: 20, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Jardins e bordas de mata', habitat: 'Floresta/Urbano', wiki: 'https://pt.wikipedia.org/wiki/Beija-flor-verde', danger: 'baixo', habits: ['🌸 Néctar', '✈️ Voo rápido', '🌺 Polinizador'], howToFind: 'Jardins e bordas de mata com flores' },
  { id: 'corruira', name: 'Corruíra', sci: 'Troglodytes musculus', emoji: '🐦', tier: 'common', tierLabel: 'Comum', pts: 12, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Áreas abertas e jardins', habitat: 'Urbano/Campo', wiki: 'https://pt.wikipedia.org/wiki/Corru%C3%ADra', danger: 'inofensivo', habits: ['🪲 Insetívoro', '🎵 Canto alto', '🏘️ Urbano'], howToFind: 'Áreas abertas e jardins; canto bem alto para o tamanho' },
  { id: 'quero-quero', name: 'Quero-quero', sci: 'Vanellus chilensis', emoji: '🐦', tier: 'common', tierLabel: 'Comum', pts: 18, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Campos abertos', habitat: 'Campo', wiki: 'https://pt.wikipedia.org/wiki/Quero-quero', danger: 'inofensivo', habits: ['🪲 Insetívoro', '☀️ Diurno', '🗺️ Territorial'], howToFind: 'Campos abertos; voa e grita ao se sentir ameaçado' },
  { id: 'bem-te-vi', name: 'Bem-te-vi', sci: 'Pitangus sulphuratus', emoji: '🐦', tier: 'common', tierLabel: 'Comum', pts: 14, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Áreas abertas e urbanas', habitat: 'Urbano/Campo', wiki: 'https://pt.wikipedia.org/wiki/Bem-te-vi', danger: 'inofensivo', habits: ['🥩 Onívoro', '🎵 Canto', '🏘️ Urbano'], howToFind: 'Áreas abertas e urbanas; reconhecível pelo canto' },
]

export const DANGER_COLORS = {
  critico: 'var(--coral)',
  alto: 'var(--amber)',
  medio: '#FFD700',
  baixo: 'var(--accent)',
  inofensivo: 'var(--text-2)',
}

export const LEVELS = [
  { min: 0, name: 'Observador Iniciante', label: 'Nível 1' },
  { min: 150, name: 'Explorador de Trilhas', label: 'Nível 2' },
  { min: 400, name: 'Rastreador', label: 'Nível 3' },
  { min: 800, name: 'Naturalista', label: 'Nível 4' },
  { min: 1300, name: 'MataGo', label: 'Nível 5' },
  { min: 1840, name: 'Explorador Experiente', label: 'Nível 6' },
  { min: 2700, name: 'MataGo Sênior', label: 'Nível 7' },
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
