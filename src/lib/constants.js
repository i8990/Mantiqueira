export const TIER_COLORS = {
  L: 'var(--coral)',
  S: '#E67E22',
  A: '#8E44AD',
  B: '#3498DB',
  C: '#27AE60',
  D: 'var(--text-2)',
}

export const TIER_LABELS = {
  L: 'Lendário',
  S: 'Mítico',
  A: 'Épico',
  B: 'Raro',
  C: 'Comum',
  D: 'Muito Comum',
}

export const DANGER_CONFIG = {
  critico: { label: 'Crítico', color: '#E85B3C', emoji: '🔴' },
  alto: { label: 'Alto', color: '#F5A733', emoji: '🟠' },
  medio: { label: 'Médio', color: '#FFD700', emoji: '🟡' },
  baixo: { label: 'Baixo', color: '#3CE87A', emoji: '🟢' },
  inofensivo: { label: 'Inofensivo', color: '#7FB88A', emoji: '⚪' },
}

export const ANIMALS = [
  // ─── TIER L (Lendários) ───
  { id: 'sapo-flamenguinho', name: 'Sapo-Flamenguinho', sci: 'Mascote', emoji: '🐸', tier: 'L', tierLabel: 'Lendário', pts: 1000, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Noites chuvosas em locais específicos', habitat: 'Místico', wiki: 'https://pt.wikipedia.org/wiki/Sapo', danger: 'inofensivo', habits: ['🐸 Mascote do app', '🌙 Noturno', '💧 Noites chuvosas'], howToFind: 'Apenas em noites chuvosas, em locais específicos. Taxa de encontro baixíssima.' },
  { id: 'onca-pintada', name: 'Onça-pintada', sci: 'Panthera onca', emoji: '🐆', tier: 'L', tierLabel: 'Lendário', pts: 800, status: 'EN', statusLabel: 'Em Perigo', where: 'Matas densas e grotões', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Panthera_onca', danger: 'critico', habits: ['🥩 Carnívoro', '🌙 Noturno', '🗺️ Territorial'], howToFind: 'Eventos especiais. Animal mais desejado e difícil de registrar.' },
  { id: 'lobo-guara', name: 'Lobo-guará', sci: 'Chrysocyon brachyurus', emoji: '🐺', tier: 'L', tierLabel: 'Lendário', pts: 600, status: 'VU', statusLabel: 'Vulnerável', where: 'Campos e cerrado de altitude', habitat: 'Cerrado/Campo', wiki: 'https://pt.wikipedia.org/wiki/Lobo-guar%C3%A1', danger: 'alto', habits: ['🍎 Onívoro', '🌅 Crepuscular', '🤺 Solitário'], howToFind: 'Campos abertos no fim da tarde; mantenha distância' },

  // ─── TIER S (Míticos) ───
  { id: 'onca-parda', name: 'Onça-parda', sci: 'Puma concolor', emoji: '🦁', tier: 'S', tierLabel: 'Mítico', pts: 450, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Áreas extensas de mata', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Puma_concolor', danger: 'critico', habits: ['🥩 Carnívoro', '🌙 Noturno', '🗺️ Territorial'], howToFind: 'Áreas extensas de mata; extremamente arredio — se ver, afaste-se devagar' },
  { id: 'jaguatirica', name: 'Jaguatirica', sci: 'Leopardus pardalis', emoji: '🐱', tier: 'S', tierLabel: 'Mítico', pts: 350, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Matas e capoeiras', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Jaguatirica', danger: 'alto', habits: ['🥩 Carnívoro', '🌙 Noturno', '🤺 Solitário'], howToFind: 'Áreas de mata fechada; raramente vista, mais ativa à noite' },
  { id: 'ariranha', name: 'Ariranha', sci: 'Pteronura brasiliensis', emoji: '🦦', tier: 'S', tierLabel: 'Mítico', pts: 500, status: 'EN', statusLabel: 'Em Perigo', where: 'Rios e lagoas de águas claras', habitat: 'Aquático', wiki: 'https://pt.wikipedia.org/wiki/Ariranha', danger: 'medio', habits: ['🐟 Piscívora', '🌊 Aquática', '👨‍👩‍👧‍👧 Grupos familiares'], howToFind: 'Rios preservados; vista em grupos — não se aproxime dos filhotes' },
  { id: 'anta', name: 'Anta', sci: 'Tapirus terrestris', emoji: '🫏', tier: 'S', tierLabel: 'Mítico', pts: 400, status: 'VU', statusLabel: 'Vulnerável', where: 'Próximo a rios e brejos', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Anta', danger: 'alto', habits: ['🥜 Herbívoro', '🌙 Noturno', '💧 Ribeirinho'], howToFind: 'Margens de rios e brejos; pode ser agressiva se encurralada' },
  { id: 'veado-campeiro', name: 'Veado-campeiro', sci: 'Ozotoceros bezoarticus', emoji: '🦌', tier: 'S', tierLabel: 'Mítico', pts: 280, status: 'NT', statusLabel: 'Quase ameaçado', where: 'Campos abertos e cerrado', habitat: 'Cerrado/Campo', wiki: 'https://pt.wikipedia.org/wiki/Veado-campeiro', danger: 'baixo', habits: ['🌿 Herbívoro', '☀️ Diurno', '👨‍👩‍👧‍👧 Grupos'], howToFind: 'Campos abertos ao amanhecer; foge rapidamente ao menor sinal' },

  // ─── TIER A (Épicos) ───
  { id: 'cachorro-do-mato', name: 'Cachorro-do-mato', sci: 'Cerdocyon thous', emoji: '🦊', tier: 'A', tierLabel: 'Épico', pts: 200, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Matas e bordas de capoeira', habitat: 'Floresta/Campo', wiki: 'https://pt.wikipedia.org/wiki/Cachorro-do-mato', danger: 'medio', habits: ['🥩 Onívoro', '🌅 Crepuscular', '🤺 Solitário'], howToFind: 'Bordas de mata ao entardecer; cauteloso' },
  { id: 'quati', name: 'Quati', sci: 'Nasua nasua', emoji: '🦝', tier: 'A', tierLabel: 'Épico', pts: 180, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Matas e capoeiras', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Quati', danger: 'medio', habits: ['🌳 Onívoro', '☀️ Diurno', '👨‍👩‍👧‍👧 Grupos'], howToFind: 'Matas e capoeiras em bandos; não se aproxime de filhotes' },
  { id: 'paca', name: 'Paca', sci: 'Cuniculus paca', emoji: '🐭', tier: 'A', tierLabel: 'Épico', pts: 220, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Próximo a rios e grotões', habitat: 'Floresta Ombrófila', wiki: 'https://pt.wikipedia.org/wiki/Paca', danger: 'baixo', habits: ['🥜 Herbívoro', '🌙 Noturno', '💧 Ribeirinho'], howToFind: 'Próximo a riachos e grotões; mais ativa ao anoitecer' },
  { id: 'bugio', name: 'Bugio', sci: 'Alouatta guariba', emoji: '🦍', tier: 'A', tierLabel: 'Épico', pts: 200, status: 'VU', statusLabel: 'Vulnerável', where: 'Dossel da mata', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Bugio', danger: 'alto', habits: ['🍉 Frugívoro', '🎵 Vocal', '👨‍👩‍👧‍👧 Grupos'], howToFind: 'Ouça o rugido característico ao amanhecer; não se aproxime' },
  { id: 'jacu', name: 'Jacu', sci: 'Penelope obscura', emoji: '🦃', tier: 'A', tierLabel: 'Épico', pts: 140, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Bordas de mata e capoeiras', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Jacu', danger: 'baixo', habits: ['🍉 Frugívoro', '🌳 Arborícola', '☀️ Diurno'], howToFind: 'Bordas de mata; vive em grupos pequenos' },
  { id: 'urutau', name: 'Urutau', sci: 'Nyctibius griseus', emoji: '🦉', tier: 'A', tierLabel: 'Épico', pts: 150, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Galhos secos e troncos', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Urutau', danger: 'inofensivo', habits: ['🌙 Noturno', '🪵 Camuflagem', '🎵 Canto lúgubre'], howToFind: 'Procure galhos secos e troncos; mestre da camuflagem' },
  { id: 'jararaca', name: 'Jararaca', sci: 'Bothrops jararaca', emoji: '🐍', tier: 'A', tierLabel: 'Épico', pts: 250, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Chão da mata', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Jararaca', danger: 'critico', habits: ['🥩 Carnívora', '🌙 Noturna', '🪤 Emboscada'], howToFind: 'Chão da mata, especialmente em dias quentes; olhe onde pisa' },
  { id: 'caninana', name: 'Caninana', sci: 'Spilotes pullatus', emoji: '🐍', tier: 'A', tierLabel: 'Épico', pts: 160, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Matas e áreas abertas', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Caninana', danger: 'alto', habits: ['🥩 Carnívora', '☀️ Diurna', '🌳 Arborícola'], howToFind: 'Árvores e solo; pode se irritar se provocada' },

  // ─── TIER B (Raros) ───
  { id: 'seriema', name: 'Seriema', sci: 'Cariama cristata', emoji: '🦩', tier: 'B', tierLabel: 'Raro', pts: 80, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Campos abertos e cerrado', habitat: 'Cerrado/Campo', wiki: 'https://pt.wikipedia.org/wiki/Seriema', danger: 'baixo', habits: ['🥩 Onívora', '☀️ Diurna', '🏃 Corredora'], howToFind: 'Campos abertos; corre rápido pelo chão' },
  { id: 'coruja', name: 'Coruja-buraqueira', sci: 'Athene cunicularia', emoji: '🦉', tier: 'B', tierLabel: 'Raro', pts: 70, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Campos abertos e tocas no chão', habitat: 'Campo', wiki: 'https://pt.wikipedia.org/wiki/Coruja-buraqueira', danger: 'baixo', habits: ['🐛 Insetívora', '🌅 Crepuscular', '🕳️ Toca no chão'], howToFind: 'Campos abertos com tocas; vista durante o dia' },
  { id: 'beija-flor', name: 'Beija-flor-tesoura', sci: 'Eupetomena macroura', emoji: '🌸', tier: 'B', tierLabel: 'Raro', pts: 90, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Jardins e bordas de mata', habitat: 'Floresta/Urbano', wiki: 'https://pt.wikipedia.org/wiki/Beija-flor-tesoura', danger: 'inofensivo', habits: ['🌸 Néctar', '✈️ Voo rápido', '🗺️ Territorial'], howToFind: 'Jardins e bordas de mata com flores; voo muito rápido' },
  { id: 'trinca-ferro', name: 'Trinca-ferro', sci: 'Saltator similis', emoji: '🐦', tier: 'B', tierLabel: 'Raro', pts: 60, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Matas e capoeiras', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Trinca-ferro', danger: 'inofensivo', habits: ['🍉 Frugívoro', '🎵 Canto forte', '🌳 Arborícola'], howToFind: 'Siga o canto forte e melodioso na mata' },
  { id: 'tucano', name: 'Tucano-de-bico-verde', sci: 'Ramphastos dicolorus', emoji: '🦅', tier: 'B', tierLabel: 'Raro', pts: 100, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Dossel e bordas de mata', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Tucano-de-bico-verde', danger: 'baixo', habits: ['🍉 Frugívoro', '🌳 Dossel', '🎵 Vocal'], howToFind: 'Olhe para o alto nas bordas de mata; ouça o canto' },
  { id: 'jatai', name: 'Jataí', sci: 'Tetragonisca angustula', emoji: '🐝', tier: 'B', tierLabel: 'Raro', pts: 50, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Ocos de árvores e muros', habitat: 'Floresta/Urbano', wiki: 'https://pt.wikipedia.org/wiki/Jata%C3%AD', danger: 'inofensivo', habits: ['🌸 Polinizadora', '🏠 Colmeia', '🍯 Mel'], howToFind: 'Ocos de árvores e muros de pedra; abelha sem ferrão' },
  { id: 'teiu', name: 'Teiú', sci: 'Salvator merianae', emoji: '🦎', tier: 'B', tierLabel: 'Raro', pts: 80, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Clareiras e bordas de mata', habitat: 'Floresta/Campo', wiki: 'https://pt.wikipedia.org/wiki/Tei%C3%BA', danger: 'medio', habits: ['🥩 Onívoro', '☀️ Diurno', '🌡️ Termorregula'], howToFind: 'Clareiras e bordas de mata; pode morder se provocado' },
  { id: 'gaviao', name: 'Gavião-carijó', sci: 'Rupornis magnirostris', emoji: '🦅', tier: 'B', tierLabel: 'Raro', pts: 90, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Matas abertas e bordas', habitat: 'Floresta/Campo', wiki: 'https://pt.wikipedia.org/wiki/Gavi%C3%A3o-carij%C3%B3', danger: 'alto', habits: ['🥩 Carnívoro', '☀️ Diurno', '🌳 Poleiros'], howToFind: 'Observe poleiros altos em bordas de mata; seus chamados denunciam' },
  { id: 'tie-sangue', name: 'Tiê-sangue', sci: 'Ramphocelus bresilius', emoji: '🐦', tier: 'B', tierLabel: 'Raro', pts: 70, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Bordas de mata e restinga', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Ti%C3%AA-sangue', danger: 'inofensivo', habits: ['🍉 Frugívoro', '❤️ Vermelho vivo', '🌳 Arborícola'], howToFind: 'Bordas de mata; o vermelho intenso do macho é inconfundível' },

  // ─── TIER C (Comuns) ───
  { id: 'sabia', name: 'Sabiá-laranjeira', sci: 'Turdus rufiventris', emoji: '🐦', tier: 'C', tierLabel: 'Comum', pts: 30, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Jardins e matas', habitat: 'Floresta/Urbano', wiki: 'https://pt.wikipedia.org/wiki/Sabi%C3%A1-laranjeira', danger: 'inofensivo', habits: ['🍉 Frutívoro', '🎵 Canto melodioso', '🏘️ Urbano'], howToFind: 'Jardins e matas; siga o canto ao entardecer' },
  { id: 'capivara', name: 'Capivara', sci: 'Hydrochoerus hydrochaeris', emoji: '🦫', tier: 'C', tierLabel: 'Comum', pts: 35, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Margens de rios e lagoas', habitat: 'Brejo/Rio', wiki: 'https://pt.wikipedia.org/wiki/Capivara', danger: 'medio', habits: ['🌿 Herbívoro', '💧 Aquática', '👨‍👩‍👧‍👧 Grupos'], howToFind: 'Margens de rios e lagoas; não encurrale — pode morder' },
  { id: 'gamba', name: 'Gambá-de-orelha-branca', sci: 'Didelphis albiventris', emoji: '🦨', tier: 'C', tierLabel: 'Comum', pts: 25, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Áreas urbanas e matas', habitat: 'Floresta/Urbano', wiki: 'https://pt.wikipedia.org/wiki/Gamb%C3%A1-de-orelha-branca', danger: 'medio', habits: ['🥩 Onívoro', '🌙 Noturno', '🏘️ Urbano'], howToFind: 'Áreas urbanas e matas; noturno, evite contato' },
  { id: 'joao-de-barro', name: 'João-de-barro', sci: 'Furnarius rufus', emoji: '🐦', tier: 'C', tierLabel: 'Comum', pts: 28, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Campos abertos e postes', habitat: 'Campo/Urbano', wiki: 'https://pt.wikipedia.org/wiki/Jo%C3%A3o-de-barro', danger: 'inofensivo', habits: ['🏗️ Construtor', '🧱 Ninho de barro', '☀️ Diurno'], howToFind: 'Postes e árvores isoladas; procure o ninho de barro característico' },
  { id: 'rolinha', name: 'Rolinha', sci: 'Columbina talpacoti', emoji: '🕊️', tier: 'C', tierLabel: 'Comum', pts: 20, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Áreas abertas e urbanas', habitat: 'Urbano/Campo', wiki: 'https://pt.wikipedia.org/wiki/Rolinha', danger: 'inofensivo', habits: ['🌿 Granívora', '☀️ Diurna', '🏘️ Urbana'], howToFind: 'Áreas abertas, fios e chão; pequena e rápida' },
  { id: 'sapo-cururu', name: 'Sapo-cururu', sci: 'Rhinella schneideri', emoji: '🐸', tier: 'C', tierLabel: 'Comum', pts: 20, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Próximo a corpos d\'água', habitat: 'Brejo/Rio', wiki: 'https://pt.wikipedia.org/wiki/Sapo-cururu', danger: 'medio', habits: ['🐜 Insetívoro', '🌙 Noturno', '💧 Úmido'], howToFind: 'Próximo a corpos d\'água; não toque — glândulas venenosas' },
  { id: 'camundongo', name: 'Camundongo-do-mato', sci: 'Oligoryzomys nigripes', emoji: '🐀', tier: 'C', tierLabel: 'Comum', pts: 15, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Chão da mata e roças', habitat: 'Floresta/Campo', wiki: 'https://pt.wikipedia.org/wiki/Rato-do-mato', danger: 'inofensivo', habits: ['🌿 Herbívoro', '🌙 Noturno', '🌳 Solo'], howToFind: 'Chão da mata; pequeno e rápido' },
  { id: 'abelha', name: 'Abelha-europeia', sci: 'Apis mellifera', emoji: '🐝', tier: 'C', tierLabel: 'Comum', pts: 18, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Jardins e campos floridos', habitat: 'Campo/Urbano', wiki: 'https://pt.wikipedia.org/wiki/Abelha-europeia', danger: 'medio', habits: ['🌸 Polinizadora', '🍯 Produtora de mel', '👷‍♀️ Colmeia'], howToFind: 'Jardins e campos floridos; não perturbe a colmeia' },
  { id: 'ra', name: 'Rã-manteiga', sci: 'Leptodactylus ocellatus', emoji: '🐸', tier: 'C', tierLabel: 'Comum', pts: 22, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Brejos e poças', habitat: 'Brejo/Rio', wiki: 'https://pt.wikipedia.org/wiki/R%C3%A3-manteiga', danger: 'inofensivo', habits: ['🐜 Insetívoro', '🌙 Noturno', '💧 Brejo'], howToFind: 'Brejos e poças; siga o coaxar noturno' },

  // ─── TIER D (Muito Comuns) ───
  { id: 'bem-te-vi', name: 'Bem-te-vi', sci: 'Pitangus sulphuratus', emoji: '🐦', tier: 'D', tierLabel: 'Muito Comum', pts: 12, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Áreas abertas e urbanas', habitat: 'Urbano/Campo', wiki: 'https://pt.wikipedia.org/wiki/Bem-te-vi', danger: 'inofensivo', habits: ['🥩 Onívoro', '🎵 Canto', '🏘️ Urbano'], howToFind: 'Áreas abertas e urbanas; reconhecível pelo canto' },
  { id: 'pardal', name: 'Pardal', sci: 'Passer domesticus', emoji: '🐦', tier: 'D', tierLabel: 'Muito Comum', pts: 8, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Áreas urbanas e rurais', habitat: 'Urbano', wiki: 'https://pt.wikipedia.org/wiki/Pardal', danger: 'inofensivo', habits: ['🌿 Granívoro', '🏘️ Urbano', '👨‍👩‍👧‍👧 Grupos'], howToFind: 'Áreas urbanas; onipresente em cidades' },
  { id: 'pombo', name: 'Pombo-doméstico', sci: 'Columba livia', emoji: '🕊️', tier: 'D', tierLabel: 'Muito Comum', pts: 6, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Áreas urbanas e praças', habitat: 'Urbano', wiki: 'https://pt.wikipedia.org/wiki/Pombo-dom%C3%A9stico', danger: 'inofensivo', habits: ['🌿 Granívoro', '🏘️ Urbano', '👨‍👩‍👧‍👧 Grupos'], howToFind: 'Praças e centros urbanos; muito adaptado' },
  { id: 'lagartixa', name: 'Lagartixa-doméstica', sci: 'Hemidactylus mabouia', emoji: '🦎', tier: 'D', tierLabel: 'Muito Comum', pts: 10, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Paredes e muros', habitat: 'Urbano', wiki: 'https://pt.wikipedia.org/wiki/Lagartixa-dom%C3%A9stica', danger: 'inofensivo', habits: ['🐜 Insetívora', '🌙 Noturna', '🏘️ Urbana'], howToFind: 'Paredes externas à noite; rápida e pequena' },
  { id: 'formiga-sauva', name: 'Formiga-saúva', sci: 'Atta sexdens', emoji: '🐜', tier: 'D', tierLabel: 'Muito Comum', pts: 8, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Formigueiros no chão', habitat: 'Solo', wiki: 'https://pt.wikipedia.org/wiki/Formiga-cortadeira', danger: 'inofensivo', habits: ['🌿 Cortadeira', '👷‍♀️ Colônia', '🌳 Subterrânea'], howToFind: 'Trilhas de formigas carregando folhas no chão' },
  { id: 'mosquito', name: 'Mosquito-pernilongo', sci: 'Culex quinquefasciatus', emoji: '🦟', tier: 'D', tierLabel: 'Muito Comum', pts: 5, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Áreas úmidas e urbanas', habitat: 'Urbano/Brejo', wiki: 'https://pt.wikipedia.org/wiki/Culex_quinquefasciatus', danger: 'medio', habits: ['🩸 Hematófago', '🌙 Noturno', '💧 Água parada'], howToFind: 'Áreas úmidas ao anoitecer; mais ativo à noite' },
  { id: 'mariposa', name: 'Mariposa', sci: 'Ascalapha odorata', emoji: '🦋', tier: 'D', tierLabel: 'Muito Comum', pts: 6, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Áreas abertas e urbanas', habitat: 'Floresta/Urbano', wiki: 'https://pt.wikipedia.org/wiki/Bruxa_(mariposa)', danger: 'inofensivo', habits: ['🌙 Noturna', '💡 Atrai luz', '🦋 Voo noturno'], howToFind: 'Próximo a luzes à noite; a maior mariposa do Brasil' },
  { id: 'borboleta', name: 'Borboleta-monarca', sci: 'Danaus plexippus', emoji: '🦋', tier: 'D', tierLabel: 'Muito Comum', pts: 10, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Jardins e campos', habitat: 'Campo/Urbano', wiki: 'https://pt.wikipedia.org/wiki/Borboleta-monarca', danger: 'inofensivo', habits: ['🌸 Néctar', '☀️ Diurna', '🗺️ Migratória'], howToFind: 'Jardins floridos durante o dia' },
  { id: 'taturana', name: 'Taturana', sci: 'Lonomia obliqua', emoji: '🐛', tier: 'D', tierLabel: 'Muito Comum', pts: 15, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Troncos de árvores', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Taturana', danger: 'critico', habits: ['🌿 Herbívora', '🌳 Troncos', '⚠️ Venenosa'], howToFind: 'Troncos de árvores; NÃO TOQUE — veneno perigoso' },
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
