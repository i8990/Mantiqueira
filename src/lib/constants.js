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
  { id: 'sapo-flamenguinho', name: 'Sapo-Flamenguinho', sci: 'Melanophryniscus moreirae', emoji: '🐸', img: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Sapo-flamenguinho_%28cropped%29.jpg', tier: 'L', tierLabel: 'Lendário', pts: 900, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Noites chuvosas em locais específicos', habitat: 'Místico', wiki: 'https://pt.wikipedia.org/wiki/Sapo-flamenguinho', danger: 'inofensivo', habits: ['🐸 Mascote do app', '🌙 Noturno', '💧 Noites chuvosas'], howToFind: 'Apenas em noites chuvosas, em locais específicos. Taxa de encontro baixíssima.' },
  { id: 'onca-pintada', name: 'Onça-pintada', sci: 'Panthera onca', emoji: '🐆', img: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Jaguar_%28Panthera_onca_palustris%29_female_Piquiri_River_2.JPG', tier: 'L', tierLabel: 'Lendário', pts: 1200, status: 'EN', statusLabel: 'Em Perigo', where: 'Matas densas e grotões', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Panthera_onca', danger: 'critico', habits: ['🥩 Carnívoro', '🌙 Noturno', '🗺️ Territorial'], howToFind: 'Eventos especiais. Animal mais desejado e difícil de registrar.' },
  { id: 'lobo-guara', name: 'Lobo-guará', sci: 'Chrysocyon brachyurus', emoji: '🐺', img: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Lobo_Guar%C3%A1_andando.jpg', tier: 'L', tierLabel: 'Lendário', pts: 800, status: 'VU', statusLabel: 'Vulnerável', where: 'Campos e cerrado de altitude', habitat: 'Cerrado/Campo', wiki: 'https://pt.wikipedia.org/wiki/Lobo-guar%C3%A1', danger: 'alto', habits: ['🍎 Onívoro', '🌅 Crepuscular', '🤺 Solitário'], howToFind: 'Campos abertos no fim da tarde; mantenha distância' },
  { id: 'onca-parda', name: 'Onça-parda', sci: 'Puma concolor', emoji: '🦁', img: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Mountain_Lion_in_Glacier_National_Park.jpg', tier: 'L', tierLabel: 'Lendário', pts: 1000, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Áreas extensas de mata', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Puma_concolor', danger: 'critico', habits: ['🥩 Carnívoro', '🌙 Noturno', '🗺️ Territorial'], howToFind: 'Áreas extensas de mata; extremamente arredio — se ver, afaste-se devagar' },
  { id: 'veado-campeiro', name: 'Veado-campeiro', sci: 'Ozotoceros bezoarticus', emoji: '🦌', img: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/O._bezoarticus_buck.jpg', tier: 'L', tierLabel: 'Lendário', pts: 1100, status: 'NT', statusLabel: 'Quase ameaçado', where: 'Campos abertos e cerrado', habitat: 'Cerrado/Campo', wiki: 'https://pt.wikipedia.org/wiki/Veado-campeiro', danger: 'baixo', habits: ['🌿 Herbívoro', '☀️ Diurno', '👨‍👩‍👧‍👧 Grupos'], howToFind: 'Campos abertos ao amanhecer; foge rapidamente ao menor sinal' },

  // ─── TIER S (Míticos) ───
  { id: 'jaguatirica', name: 'Jaguatirica', sci: 'Leopardus pardalis', emoji: '🐱', img: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/081_Ocelot_in_Encontro_das_%C3%81guas_State_Park_Photo_by_Giles_Laurent.jpg', tier: 'S', tierLabel: 'Mítico', pts: 550, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Matas e capoeiras', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Jaguatirica', danger: 'alto', habits: ['🥩 Carnívoro', '🌙 Noturno', '🤺 Solitário'], howToFind: 'Áreas de mata fechada; raramente vista, mais ativa à noite' },
  { id: 'ariranha', name: 'Ariranha', sci: 'Pteronura brasiliensis', emoji: '🦦', img: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Giant_Otter_area.png', tier: 'S', tierLabel: 'Mítico', pts: 600, status: 'EN', statusLabel: 'Em Perigo', where: 'Rios e lagoas de águas claras', habitat: 'Aquático', wiki: 'https://pt.wikipedia.org/wiki/Ariranha', danger: 'medio', habits: ['🐟 Piscívora', '🌊 Aquática', '👨‍👩‍👧‍👧 Grupos familiares'], howToFind: 'Rios preservados; vista em grupos — não se aproxime dos filhotes' },
  { id: 'anta', name: 'Anta', sci: 'Tapirus terrestris', emoji: '🫏', img: 'https://upload.wikimedia.org/wikipedia/commons/3/36/South_American_tapir_%28Tapirus_terrestris%29.JPG', tier: 'S', tierLabel: 'Mítico', pts: 700, status: 'VU', statusLabel: 'Vulnerável', where: 'Próximo a rios e brejos', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Anta', danger: 'alto', habits: ['🥜 Herbívoro', '🌙 Noturno', '💧 Ribeirinho'], howToFind: 'Margens de rios e brejos; pode ser agressiva se encurralada' },

  // ─── TIER A (Épicos) ───
  { id: 'cachorro-do-mato', name: 'Cachorro-do-mato', sci: 'Cerdocyon thous', emoji: '🦊', img: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Graxaim-do-mato.jpg', tier: 'A', tierLabel: 'Épico', pts: 300, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Matas e bordas de capoeira', habitat: 'Floresta/Campo', wiki: 'https://pt.wikipedia.org/wiki/Cachorro-do-mato', danger: 'medio', habits: ['🥩 Onívoro', '🌅 Crepuscular', '🤺 Solitário'], howToFind: 'Bordas de mata ao entardecer; cauteloso' },
  { id: 'quati', name: 'Quati', sci: 'Nasua nasua', emoji: '🦝', img: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Coati.jpg', tier: 'A', tierLabel: 'Épico', pts: 220, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Matas e capoeiras', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Quati', danger: 'medio', habits: ['🌳 Onívoro', '☀️ Diurno', '👨‍👩‍👧‍👧 Grupos'], howToFind: 'Matas e capoeiras em bandos; não se aproxime de filhotes' },
  { id: 'paca', name: 'Paca', sci: 'Cuniculus paca', emoji: '🐭', img: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Cuniculus_paca.jpg', tier: 'A', tierLabel: 'Épico', pts: 250, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Próximo a rios e grotões', habitat: 'Floresta Ombrófila', wiki: 'https://pt.wikipedia.org/wiki/Paca', danger: 'baixo', habits: ['🥜 Herbívoro', '🌙 Noturno', '💧 Ribeirinho'], howToFind: 'Próximo a riachos e grotões; mais ativa ao anoitecer' },
  { id: 'bugio', name: 'Bugio', sci: 'Alouatta guariba', emoji: '🦍', img: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Brown_Howler_Monkey.jpg', tier: 'A', tierLabel: 'Épico', pts: 350, status: 'VU', statusLabel: 'Vulnerável', where: 'Dossel da mata', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Bugio', danger: 'alto', habits: ['🍉 Frugívoro', '🎵 Vocal', '👨‍👩‍👧‍👧 Grupos'], howToFind: 'Ouça o rugido característico ao amanhecer; não se aproxime' },
  { id: 'jacu', name: 'Jacu', sci: 'Penelope obscura', emoji: '🦃', tier: 'A', tierLabel: 'Épico', pts: 200, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Bordas de mata e capoeiras', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Jacu', danger: 'baixo', habits: ['🍉 Frugívoro', '🌳 Arborícola', '☀️ Diurno'], howToFind: 'Bordas de mata; vive em grupos pequenos' },
  { id: 'urutau', name: 'Urutau', sci: 'Nyctibius griseus', emoji: '🦉', img: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/M%C3%A3e-da-lua-gigante_%28Nyctibius_grandis%29.jpg', tier: 'A', tierLabel: 'Épico', pts: 380, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Galhos secos e troncos', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Urutau', danger: 'inofensivo', habits: ['🌙 Noturno', '🪵 Camuflagem', '🎵 Canto lúgubre'], howToFind: 'Procure galhos secos e troncos; mestre da camuflagem' },
  { id: 'jararaca', name: 'Jararaca', sci: 'Bothrops jararaca', emoji: '🐍', tier: 'A', tierLabel: 'Épico', pts: 350, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Chão da mata', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Jararaca', danger: 'critico', habits: ['🥩 Carnívora', '🌙 Noturna', '🪤 Emboscada'], howToFind: 'Chão da mata, especialmente em dias quentes; olhe onde pisa' },
  { id: 'jaratataca', name: 'Jaratataca', sci: 'Conepatus semistriatus', emoji: '🦨', img: 'https://upload.wikimedia.org/wikipedia/commons/2/27/Conepatus_semistriatus.jpg', tier: 'A', tierLabel: 'Épico', pts: 350, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Campos abertos e bordas de mata', habitat: 'Cerrado/Campo', wiki: 'https://pt.wikipedia.org/wiki/Jaratataca', danger: 'medio', habits: ['🥩 Onívora', '🌙 Noturna', '💨 Exala mau cheiro'], howToFind: 'Campos abertos à noite; sente o cheiro antes de ver' },
  { id: 'caninana', name: 'Caninana', sci: 'Spilotes pullatus', emoji: '🐍', img: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Caninana_%28Spilotes_pullatus%29_-_Foto_Antonio_Bordignon.jpg', tier: 'A', tierLabel: 'Épico', pts: 280, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Matas e áreas abertas', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Caninana', danger: 'alto', habits: ['🥩 Carnívora', '☀️ Diurna', '🌳 Arborícola'], howToFind: 'Árvores e solo; pode se irritar se provocada' },

  // ─── TIER B (Raros) ───
  { id: 'tucano', name: 'Tucano', sci: 'Ramphastos dicolorus', emoji: '🦅', img: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Ramphastos_dicolorus_-S%C3%A3o_Paulo-SP%2C_Brasil-8.jpg', tier: 'B', tierLabel: 'Raro', pts: 140, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Dossel e bordas de mata', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Tucano-de-bico-verde', danger: 'baixo', habits: ['🍉 Frugívoro', '🌳 Dossel', '🎵 Vocal'], howToFind: 'Olhe para o alto nas bordas de mata; ouça o canto' },
  { id: 'mico', name: 'Mico', sci: 'Callithrix penicillata', emoji: '🐒', img: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Callithrix_penicillata_%28black-tufted_marmoset%29.jpg', tier: 'B', tierLabel: 'Raro', pts: 110, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Matas e capoeiras', habitat: 'Floresta/Cerrado', wiki: 'https://pt.wikipedia.org/wiki/Mico-estrela', danger: 'baixo', habits: ['🍉 Frugívoro', '🌳 Arborícola', '👨‍👩‍👧‍👧 Grupos'], howToFind: 'Copas de árvores em grupos; ativo durante o dia' },
  { id: 'gaviao', name: 'Gavião', sci: 'Rupornis magnirostris', emoji: '🦅', img: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Buteo_magnirostris_-Goias_-Brazil-8.jpg', tier: 'B', tierLabel: 'Raro', pts: 120, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Matas abertas e bordas', habitat: 'Floresta/Campo', wiki: 'https://pt.wikipedia.org/wiki/Gavi%C3%A3o-carij%C3%B3', danger: 'alto', habits: ['🥩 Carnívoro', '☀️ Diurno', '🌳 Poleiros'], howToFind: 'Observe poleiros altos em bordas de mata; seus chamados denunciam' },
  { id: 'seriema', name: 'Seriema', sci: 'Cariama cristata', emoji: '🦩', img: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Pedreira-19_%2841407614112%29.jpg', tier: 'B', tierLabel: 'Raro', pts: 100, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Campos abertos e cerrado', habitat: 'Cerrado/Campo', wiki: 'https://pt.wikipedia.org/wiki/Seriema', danger: 'baixo', habits: ['🥩 Onívora', '☀️ Diurna', '🏃 Corredora'], howToFind: 'Campos abertos; corre rápido pelo chão' },
  { id: 'teiu', name: 'Teiú', sci: 'Salvator merianae', emoji: '🦎', img: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Tupinambis_merianae_Pantanal.jpg', tier: 'B', tierLabel: 'Raro', pts: 100, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Clareiras e bordas de mata', habitat: 'Floresta/Campo', wiki: 'https://pt.wikipedia.org/wiki/Tei%C3%BA', danger: 'medio', habits: ['🥩 Onívoro', '☀️ Diurno', '🌡️ Termorregula'], howToFind: 'Clareiras e bordas de mata; pode morder se provocado' },
  { id: 'esquilo', name: 'Esquilo', sci: 'Sciurus aestuans', emoji: '🐿️', img: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Sciurus_aestuans.jpg', tier: 'S', tierLabel: 'Mítico', pts: 600, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Matas e capoeiras', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Caxinguel%C3%AA', danger: 'inofensivo', habits: ['🥜 Granívoro', '🌳 Arborícola', '☀️ Diurno'], howToFind: 'Troncos e galhos na mata; rápido e esperto' },
  { id: 'coruja', name: 'Coruja', sci: 'Athene cunicularia', emoji: '🦉', img: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Athene_cunicularia_1_edited.JPG', tier: 'B', tierLabel: 'Raro', pts: 100, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Campos abertos e tocas no chão', habitat: 'Campo', wiki: 'https://pt.wikipedia.org/wiki/Coruja-buraqueira', danger: 'baixo', habits: ['🐛 Insetívora', '🌅 Crepuscular', '🕳️ Toca no chão'], howToFind: 'Campos abertos com tocas; vista durante o dia' },
  { id: 'tie-sangue', name: 'Tiê-sangue', sci: 'Ramphocelus bresilius', emoji: '🐦', img: 'https://upload.wikimedia.org/wikipedia/commons/6/66/Ramphocelus_bresilius_-Sao_Paulo_Bagre%2C_Cananeia%2C_Sao_Paulo%2C_Brasil_-male-8.jpg', tier: 'B', tierLabel: 'Raro', pts: 100, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Bordas de mata e restinga', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Ti%C3%AA-sangue', danger: 'inofensivo', habits: ['🍉 Frugívoro', '❤️ Vermelho vivo', '🌳 Arborícola'], howToFind: 'Bordas de mata; o vermelho intenso do macho é inconfundível' },
  { id: 'beija-flor', name: 'Beija-flor', sci: 'Eupetomena macroura', emoji: '🌸', img: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Haeckel_Trochilidae.jpg', tier: 'B', tierLabel: 'Raro', pts: 90, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Jardins e bordas de mata', habitat: 'Floresta/Urbano', wiki: 'https://pt.wikipedia.org/wiki/Beija-flor-tesoura', danger: 'inofensivo', habits: ['🌸 Néctar', '✈️ Voo rápido', '🗺️ Territorial'], howToFind: 'Jardins e bordas de mata com flores; voo muito rápido' },
  { id: 'trinca-ferro', name: 'Trinca-ferro', sci: 'Saltator similis', emoji: '🐦', img: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Saltator_similis.jpg', tier: 'B', tierLabel: 'Raro', pts: 90, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Matas e capoeiras', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Trinca-ferro', danger: 'inofensivo', habits: ['🍉 Frugívoro', '🎵 Canto forte', '🌳 Arborícola'], howToFind: 'Siga o canto forte e melodioso na mata' },
  { id: 'cascavel', name: 'Cascavel', sci: 'Crotalus durissus', emoji: '🐍', img: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Crotalus_durissus.jpg', tier: 'B', tierLabel: 'Raro', pts: 140, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Campos abertos e cerrado', habitat: 'Cerrado/Campo', wiki: 'https://pt.wikipedia.org/wiki/Cascavel', danger: 'critico', habits: ['🥩 Carnívora', '🌙 Noturna', '🔔 Chocalho'], howToFind: 'Campos abertos e pedregosos; ouça o chocalho antes de ver' },
  { id: 'jatai', name: 'Jataí', sci: 'Tetragonisca angustula', emoji: '🐝', tier: 'B', tierLabel: 'Raro', pts: 80, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Ocos de árvores e muros', habitat: 'Floresta/Urbano', wiki: 'https://pt.wikipedia.org/wiki/Jata%C3%AD', danger: 'inofensivo', habits: ['🌸 Polinizadora', '🏠 Colmeia', '🍯 Mel'], howToFind: 'Ocos de árvores e muros de pedra; abelha sem ferrão' },

  // ─── TIER C (Comuns) ───
  { id: 'capivara', name: 'Capivara', sci: 'Hydrochoerus hydrochaeris', emoji: '🦫', img: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Hydrochoeris_hydrochaeris_in_Brazil_in_Petr%C3%B3polis%2C_Rio_de_Janeiro%2C_Brazil_09.jpg', tier: 'C', tierLabel: 'Comum', pts: 70, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Margens de rios e lagoas', habitat: 'Brejo/Rio', wiki: 'https://pt.wikipedia.org/wiki/Capivara', danger: 'medio', habits: ['🌿 Herbívoro', '💧 Aquática', '👨‍👩‍👧‍👧 Grupos'], howToFind: 'Margens de rios e lagoas; não encurrale — pode morder' },
  { id: 'lebre', name: 'Lebre', sci: 'Sylvilagus brasiliensis', emoji: '🐰', img: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Tapiti_%28Sylvilagus_brasiliensis%29.jpg', tier: 'C', tierLabel: 'Comum', pts: 60, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Campos abertos e bordas de mata', habitat: 'Campo/Floresta', wiki: 'https://pt.wikipedia.org/wiki/Tapiti', danger: 'inofensivo', habits: ['🌿 Herbívora', '🌅 Crepuscular', '🏃 Veloz'], howToFind: 'Campos abertos ao amanhecer e entardecer; foge rapidamente' },
  { id: 'gamba', name: 'Gambá', sci: 'Didelphis albiventris', emoji: '🦨', img: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Didelphis_albiventris%2C_Bahia%2C_Brazil.jpg', tier: 'C', tierLabel: 'Comum', pts: 55, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Áreas urbanas e matas', habitat: 'Floresta/Urbano', wiki: 'https://pt.wikipedia.org/wiki/Gamb%C3%A1-de-orelha-branca', danger: 'medio', habits: ['🥩 Onívoro', '🌙 Noturno', '🏘️ Urbano'], howToFind: 'Áreas urbanas e matas; noturno, evite contato' },
  { id: 'sabia', name: 'Sabiá', sci: 'Turdus rufiventris', emoji: '🐦', img: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Turdus-rufiventris.jpg', tier: 'C', tierLabel: 'Comum', pts: 50, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Jardins e matas', habitat: 'Floresta/Urbano', wiki: 'https://pt.wikipedia.org/wiki/Sabi%C3%A1-laranjeira', danger: 'inofensivo', habits: ['🍉 Frutívoro', '🎵 Canto melodioso', '🏘️ Urbano'], howToFind: 'Jardins e matas; siga o canto ao entardecer' },
  { id: 'cobra-cipo', name: 'Cobra-cipó', sci: 'Chironius bicarinatus', emoji: '🐍', img: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Chironius_bicarinatus_0.jpg', tier: 'C', tierLabel: 'Comum', pts: 45, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Matas e bordas de capoeira', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Cobra-cip%C3%B3', danger: 'medio', habits: ['🥩 Carnívora', '☀️ Diurna', '🌳 Arborícola'], howToFind: 'Galhos e cipós na borda da mata; rápida e esguia' },
  { id: 'joao-de-barro', name: 'João-de-barro', sci: 'Furnarius rufus', emoji: '🐦', img: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Rufous_Hornero_%28Furnarius_rufus%29.jpg', tier: 'C', tierLabel: 'Comum', pts: 40, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Campos abertos e postes', habitat: 'Campo/Urbano', wiki: 'https://pt.wikipedia.org/wiki/Jo%C3%A3o-de-barro', danger: 'inofensivo', habits: ['🏗️ Construtor', '🧱 Ninho de barro', '☀️ Diurno'], howToFind: 'Postes e árvores isoladas; procure o ninho de barro característico' },
  { id: 'rolinha', name: 'Rolinha', sci: 'Columbina talpacoti', emoji: '🕊️', img: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Columbina_talpacoti.jpeg', tier: 'C', tierLabel: 'Comum', pts: 30, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Áreas abertas e urbanas', habitat: 'Urbano/Campo', wiki: 'https://pt.wikipedia.org/wiki/Rolinha', danger: 'inofensivo', habits: ['🌿 Granívora', '☀️ Diurna', '🏘️ Urbana'], howToFind: 'Áreas abertas, fios e chão; pequena e rápida' },
  { id: 'sapo-cururu', name: 'Sapo', sci: 'Rhinella schneideri', emoji: '🐸', img: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Bufo_schneideri01c.jpg', tier: 'C', tierLabel: 'Comum', pts: 35, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Próximo a corpos d\'água', habitat: 'Brejo/Rio', wiki: 'https://pt.wikipedia.org/wiki/Sapo-cururu', danger: 'medio', habits: ['🐜 Insetívoro', '🌙 Noturno', '💧 Úmido'], howToFind: 'Próximo a corpos d\'água; não toque — glândulas venenosas' },
  { id: 'ra', name: 'Rã', sci: 'Leptodactylus ocellatus', emoji: '🐸', img: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Leptodactylus_labyrinthicus.jpg', tier: 'C', tierLabel: 'Comum', pts: 35, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Brejos e poças', habitat: 'Brejo/Rio', wiki: 'https://pt.wikipedia.org/wiki/R%C3%A3-manteiga', danger: 'inofensivo', habits: ['🐜 Insetívoro', '🌙 Noturno', '💧 Brejo'], howToFind: 'Brejos e poças; siga o coaxar noturno' },
  { id: 'abelha', name: 'Abelha', sci: 'Apis mellifera', emoji: '🐝', img: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Apis_mellifera_-_Brassica_napus_-_Valingu.jpg', tier: 'C', tierLabel: 'Comum', pts: 30, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Jardins e campos floridos', habitat: 'Campo/Urbano', wiki: 'https://pt.wikipedia.org/wiki/Abelha-europeia', danger: 'medio', habits: ['🌸 Polinizadora', '🍯 Produtora de mel', '👷‍♀️ Colmeia'], howToFind: 'Jardins e campos floridos; não perturbe a colmeia' },
  { id: 'camundongo', name: 'Camundongo-do-mato', sci: 'Oligoryzomys nigripes', emoji: '🐀', img: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Ejemplar_de_colilargo_grande_%28Oligoryzomys_nigripes%29%2C_Uruguay%2C_2022.jpg', tier: 'C', tierLabel: 'Comum', pts: 25, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Chão da mata e roças', habitat: 'Floresta/Campo', wiki: 'https://pt.wikipedia.org/wiki/Rato-do-mato', danger: 'inofensivo', habits: ['🌿 Herbívoro', '🌙 Noturno', '🌳 Solo'], howToFind: 'Chão da mata; pequeno e rápido' },
  { id: 'canario-da-terra', name: 'Canarinho-da-terra', sci: 'Sicalis flaveola', emoji: '🐦', tier: 'C', tierLabel: 'Comum', pts: 20, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Campos abertos e áreas rurais', habitat: 'Campo/Urbano', wiki: 'https://pt.wikipedia.org/wiki/Can%C3%A1rio-da-terra', danger: 'inofensivo', habits: ['🌿 Granívoro', '🎵 Canto melodioso', '☀️ Diurno'], howToFind: 'Campos abertos e áreas rurais; siga o canto' },

  // ─── TIER D (Muito Comuns) ───
  { id: 'bem-te-vi', name: 'Bem-te-vi', sci: 'Pitangus sulphuratus', emoji: '🐦', img: 'https://upload.wikimedia.org/wikipedia/commons/9/94/Great_kiskadee_%2870240%29.jpg', tier: 'D', tierLabel: 'Muito Comum', pts: 20, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Áreas abertas e urbanas', habitat: 'Urbano/Campo', wiki: 'https://pt.wikipedia.org/wiki/Bem-te-vi', danger: 'inofensivo', habits: ['🥩 Onívoro', '🎵 Canto', '🏘️ Urbano'], howToFind: 'Áreas abertas e urbanas; reconhecível pelo canto' },
  { id: 'pardal', name: 'Pardal', sci: 'Passer domesticus', emoji: '🐦', img: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Passer_melanurus_%282_males%29.jpg', tier: 'D', tierLabel: 'Muito Comum', pts: 10, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Áreas urbanas e rurais', habitat: 'Urbano', wiki: 'https://pt.wikipedia.org/wiki/Pardal', danger: 'inofensivo', habits: ['🌿 Granívoro', '🏘️ Urbano', '👨‍👩‍👧‍👧 Grupos'], howToFind: 'Áreas urbanas; onipresente em cidades' },
  { id: 'pombo', name: 'Pombo-doméstico', sci: 'Columba livia', emoji: '🕊️', img: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Paloma_brav%C3%ADa_%28Columba_livia%29%2C_Palacio_de_Nymphenburg%2C_M%C3%BAnich%2C_Alemania01.JPG', tier: 'D', tierLabel: 'Muito Comum', pts: 6, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Áreas urbanas e praças', habitat: 'Urbano', wiki: 'https://pt.wikipedia.org/wiki/Pombo-dom%C3%A9stico', danger: 'inofensivo', habits: ['🌿 Granívoro', '🏘️ Urbano', '👨‍👩‍👧‍👧 Grupos'], howToFind: 'Praças e centros urbanos; muito adaptado' },
  { id: 'lagartixa', name: 'Lagartixa-doméstica', sci: 'Hemidactylus mabouia', emoji: '🦎', tier: 'D', tierLabel: 'Muito Comum', pts: 12, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Paredes e muros', habitat: 'Urbano', wiki: 'https://pt.wikipedia.org/wiki/Lagartixa-dom%C3%A9stica', danger: 'inofensivo', habits: ['🐜 Insetívora', '🌙 Noturna', '🏘️ Urbana'], howToFind: 'Paredes externas à noite; rápida e pequena' },
  { id: 'borboleta', name: 'Borboleta', sci: 'Danaus plexippus', emoji: '🦋', img: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Monarch_Butterfly_Danaus_plexippus_Male_2664px.jpg', tier: 'D', tierLabel: 'Muito Comum', pts: 12, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Jardins e campos', habitat: 'Campo/Urbano', wiki: 'https://pt.wikipedia.org/wiki/Borboleta-monarca', danger: 'inofensivo', habits: ['🌸 Néctar', '☀️ Diurna', '🗺️ Migratória'], howToFind: 'Jardins floridos durante o dia' },
  { id: 'taturana', name: 'Taturana', sci: 'Lonomia obliqua', emoji: '🐛', img: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Lonomia-obliqua-citsc-1.jpg', tier: 'D', tierLabel: 'Muito Comum', pts: 15, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Troncos de árvores', habitat: 'Floresta Atlântica', wiki: 'https://pt.wikipedia.org/wiki/Taturana', danger: 'critico', habits: ['🌿 Herbívora', '🌳 Troncos', '⚠️ Venenosa'], howToFind: 'Troncos de árvores; NÃO TOQUE — veneno perigoso' },
  { id: 'formiga-sauva', name: 'Formiga Sauva', sci: 'Atta sexdens', emoji: '🐜', img: 'https://upload.wikimedia.org/wikipedia/commons/4/48/LeafAnt.jpg', tier: 'D', tierLabel: 'Muito Comum', pts: 8, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Formigueiros no chão', habitat: 'Solo', wiki: 'https://pt.wikipedia.org/wiki/Formiga-cortadeira', danger: 'inofensivo', habits: ['🌿 Cortadeira', '👷‍♀️ Colônia', '🌳 Subterrânea'], howToFind: 'Trilhas de formigas carregando folhas no chão' },
  { id: 'mosquito', name: 'Mosquito-pernilongo', sci: 'Culex quinquefasciatus', emoji: '🦟', img: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/CulexNil.jpg', tier: 'D', tierLabel: 'Muito Comum', pts: 8, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Áreas úmidas e urbanas', habitat: 'Urbano/Brejo', wiki: 'https://pt.wikipedia.org/wiki/Culex_quinquefasciatus', danger: 'medio', habits: ['🩸 Hematófago', '🌙 Noturno', '💧 Água parada'], howToFind: 'Áreas úmidas ao anoitecer; mais ativo à noite' },
  { id: 'mariposa', name: 'Mariposa', sci: 'Ascalapha odorata', emoji: '🦋', img: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/DruryV1P003AA.jpg', tier: 'D', tierLabel: 'Muito Comum', pts: 8, status: 'LC', statusLabel: 'Pouco preocupante', where: 'Áreas abertas e urbanas', habitat: 'Floresta/Urbano', wiki: 'https://pt.wikipedia.org/wiki/Bruxa_(mariposa)', danger: 'inofensivo', habits: ['🌙 Noturna', '💡 Atrai luz', '🦋 Voo noturno'], howToFind: 'Próximo a luzes à noite; a maior mariposa do Brasil' },
]

export const SIGHTING_TYPE_MULTIPLIERS = {
  foto: 1.0,
  pegada: 0.6,
  atropelamento: 0.4,
  comunicacao: 0.2,
}

export const QLTY_BONUS_DESC = 0.1
export const QLTY_BONUS_GPS = 0.1
export const QLTY_BONUS_DATE = 0.1

export const FIRST_SIGHTING_MULTIPLIER = 1.5
export const REPEAT_SIGHTING_MULTIPLIER = 1.0

export const LEVEL_REWARD_PTS = 150

export const STREAK_REWARDS = [
  { days: 3, pts: 20, icon: '🔥', label: '3 dias seguidos' },
  { days: 7, pts: 65, icon: '🔥', label: '7 dias seguidos' },
  { days: 14, pts: 155, icon: '🔥', label: '14 dias seguidos' },
  { days: 30, pts: 390, icon: '💎', label: '30 dias seguidos' },
  { days: 60, pts: 650, icon: '👑', label: '60 dias seguidos' },
]

export const BADGE_REWARDS = {
  quati: 15,
  streak: 50,
  fotos: 30,
  amanhecer: 20,
  onca: 80,
  area: 40,
  primatas: 25,
  repteis: 30,
  aves: 30,
  mamiferos: 40,
  rio: 35,
  lendarios: 60,
  cinquenta: 35,
  cem: 60,
  colecionador: 25,
  'colecionador-plus': 50,
  noturna: 25,
  'fim-de-tarde': 20,
  fds: 20,
  quinhentos: 50,
  mil: 80,
  'tres-mil': 120,
  pegadas: 25,
  olheiro: 20,
  habitats: 30,
  perigo: 40,
}

export const DANGER_COLORS = {
  critico: 'var(--coral)',
  alto: 'var(--amber)',
  medio: '#FFD700',
  baixo: 'var(--accent)',
  inofensivo: 'var(--text-2)',
}

export const LEVELS = [
  { min: 0, name: 'Observador Iniciante', label: 'Nível 1' },
  { min: 50, name: 'Explorador de Trilhas', label: 'Nível 2' },
  { min: 150, name: 'Rastreador', label: 'Nível 3' },
  { min: 350, name: 'Naturalista', label: 'Nível 4' },
  { min: 700, name: 'MataGo', label: 'Nível 5' },
  { min: 1200, name: 'Explorador Experiente', label: 'Nível 6' },
  { min: 2000, name: 'MataGo Sênior', label: 'Nível 7' },
  { min: 3200, name: 'Mestre da Mantiqueira', label: 'Nível 8' },
  { min: 5000, name: 'Lenda Viva', label: 'Nível 9' },
]


const MONTHLY_MISSION_CHECKS = {
  'noite-dos-anfibios-jan': (seenIds) => seenIds.has('sapo-cururu') || seenIds.has('ra'),
  'guarda-rios-jan': (seenIds) => seenIds.has('capivara'),
  'verao-em-foco-jan': (_, __, s) => s.filter(x => x.photo_url && x.lat).length >= 3,
  'esquilo-matinal-fev': (seenIds) => seenIds.has('esquilo'),
  'bico-verde-fev': (seenIds) => seenIds.has('tucano'),
  'herpetologo-fev': (seenIds) => seenIds.has('teiu'),
  'lenda-viva-mar': (seenIds) => seenIds.has('sapo-flamenguinho'),
  'bando-esperto-mar': (seenIds) => seenIds.has('mico'),
  'cacador-noturno-mar': (_, __, s) => s.filter(x => { const h = new Date(x.created_at).getHours(); return h >= 18 || h < 6 }).length >= 2,
  'bando-de-quatis-abr': (seenIds) => seenIds.has('quati'),
  'voo-de-caca-abr': (seenIds) => seenIds.has('gaviao'),
  'cartografo-abr': (seenIds) => { const h = new Set(); for (const id of seenIds) { const a = ANIMALS_BY_ID[id]; if (a?.habitat) h.add(a.habitat) }; return h.size >= 2 },
  'rugido-na-mata-mai': (seenIds) => seenIds.has('bugio'),
  'sentinela-campo-mai': (seenIds) => seenIds.has('seriema'),
  'crepusculo-mai': (_, __, s) => s.filter(x => { const h = new Date(x.created_at).getHours(); return h >= 5 && h <= 7 }).length >= 2,
  'arquiteto-alado-jun': (seenIds) => seenIds.has('joao-de-barro'),
  'guardiao-cerrado-jun': (seenIds) => seenIds.has('lobo-guara'),
  'explorador-altitude-jun': (seenIds) => seenIds.has('veado-campeiro'),
  'uivo-inverno-jul': (seenIds) => seenIds.has('lobo-guara'),
  'frugivoro-dossel-jul': (seenIds) => seenIds.has('tucano'),
  'colecionador-inverno-jul': (sids) => sids.size >= 15,
  'olhos-na-noite-ago': (seenIds) => seenIds.has('coruja'),
  'raposa-do-mato-ago': (seenIds) => seenIds.has('cachorro-do-mato'),
  'cinco-no-mes-ago': (_, __, s, ms) => { const ids = new Set((ms || s).map(x => x.animal_id)); return ids.size >= 5 },
  'lagarto-do-sol-set': (seenIds) => seenIds.has('teiu'),
  'canto-primavera-set': (seenIds) => seenIds.has('sabia'),
  'observador-aves-set': (seenIds) => { const aves = ['seriema','beija-flor','trinca-ferro','tucano','tie-sangue','sabia','bem-te-vi','pardal','pombo','joao-de-barro','rolinha','gaviao']; return aves.filter(id => seenIds.has(id)).length >= 3 },
  'coracao-aco-out': (seenIds) => seenIds.has('jararaca'),
  'asas-migratorias-out': (seenIds) => seenIds.has('borboleta'),
  'noite-de-chuva-out': (seenIds) => seenIds.has('sapo-cururu'),
  'familia-micos-nov': (seenIds) => seenIds.has('mico'),
  'rei-do-sol-nov': (seenIds) => seenIds.has('teiu'),
  'olho-vivo-nov': (seenIds) => seenIds.has('taturana'),
  'coro-verao-dez': (seenIds) => seenIds.has('ra'),
  'herdeiros-mata-dez': (seenIds) => seenIds.has('bugio'),
  'mestre-mantiqueira-dez': () => false,
}

export const MONTHLY_MISSIONS = [
  { id: 'noite-dos-anfibios-jan', month: 0, icon: '🐸', title: 'Noite dos Anfíbios', desc: 'Registre um sapo-cururu ou rã-manteiga — pico de reprodução nas chuvas de verão', reward: 55, animalIds: ['sapo-cururu', 'ra'] },
  { id: 'guarda-rios-jan', month: 0, icon: '🫏', title: 'Guarda-Rios', desc: 'Registre uma capivara — grupos com filhotes perto d\'água em janeiro', reward: 40, animalIds: ['capivara'] },
  { id: 'verao-em-foco-jan', month: 0, icon: '📸', title: 'Verão em Foco', desc: 'Faça 3 registros completos com foto e localização GPS', reward: 35, animalIds: [] },
  { id: 'esquilo-matinal-fev', month: 1, icon: '🐿️', title: 'O Esquilo Matinal', desc: 'Registre um esquilo — muito ativo ao amanhecer em fevereiro', reward: 35, animalIds: ['esquilo'] },
  { id: 'bico-verde-fev', month: 1, icon: '🦅', title: 'Bico Verde', desc: 'Registre um tucano — casais construindo ninho', reward: 50, animalIds: ['tucano'] },
  { id: 'herpetologo-fev', month: 1, icon: '🦎', title: 'Herpetólogo', desc: 'Registre um teiú — saindo da hibernação e tomando sol', reward: 35, animalIds: ['teiu'] },
  { id: 'lenda-viva-mar', month: 2, icon: '🐸', title: '⭐ Lenda Viva', desc: 'Registre o Sapo-Flamenguinho — o mascote! Só aparece em noites chuvosas', reward: 105, animalIds: ['sapo-flamenguinho'] },
  { id: 'bando-esperto-mar', month: 2, icon: '🐒', title: 'Bando Esperto', desc: 'Registre um mico — grupos com filhotes em março', reward: 35, animalIds: ['mico'] },
  { id: 'cacador-noturno-mar', month: 2, icon: '🌙', title: 'Caçador Noturno', desc: 'Faça 2 registros entre 18h e 6h', reward: 40, animalIds: [] },
  { id: 'bando-de-quatis-abr', month: 3, icon: '🦝', title: 'Bando de Quatis', desc: 'Registre um quati — forrageando em grupos antes do inverno', reward: 35, animalIds: ['quati'] },
  { id: 'voo-de-caca-abr', month: 3, icon: '🦅', title: 'Voo de Caça', desc: 'Registre um gavião — defendendo território na reprodução', reward: 40, animalIds: ['gaviao'] },
  { id: 'cartografo-abr', month: 3, icon: '🗺️', title: 'Cartógrafo', desc: 'Registre espécies em 2 habitats diferentes', reward: 25, animalIds: [] },
  { id: 'rugido-na-mata-mai', month: 4, icon: '🦍', title: 'Rugido na Mata', desc: 'Registre um bugio — vocalizações ecoam no ar seco de maio', reward: 40, animalIds: ['bugio'] },
  { id: 'sentinela-campo-mai', month: 4, icon: '🦩', title: 'Sentinela do Campo', desc: 'Registre uma seriema — territórios ativos em maio', reward: 35, animalIds: ['seriema'] },
  { id: 'crepusculo-mai', month: 4, icon: '🌅', title: 'Crepúsculo', desc: 'Faça 2 registros entre 5h e 7h da manhã', reward: 35, animalIds: [] },
  { id: 'arquiteto-alado-jun', month: 5, icon: '🐦', title: 'Arquiteto Alado', desc: 'Registre um joão-de-barro — pico de construção de ninhos de barro', reward: 25, animalIds: ['joao-de-barro'] },
  { id: 'guardiao-cerrado-jun', month: 5, icon: '🐺', title: '⭐ O Guardião do Cerrado', desc: 'Registre um lobo-guará — mais ativo durante o dia no frio de junho', reward: 80, animalIds: ['lobo-guara'] },
  { id: 'explorador-altitude-jun', month: 5, icon: '🦌', title: 'Explorador de Altitude', desc: 'Registre um veado-campeiro — início do cio em junho', reward: 50, animalIds: ['veado-campeiro'] },
  { id: 'uivo-inverno-jul', month: 6, icon: '🐺', title: 'Uivo de Inverno', desc: 'Registre um lobo-guará — pico de acasalamento em julho', reward: 55, animalIds: ['lobo-guara'] },
  { id: 'frugivoro-dossel-jul', month: 6, icon: '🦅', title: 'Frugívoro do Dossel', desc: 'Registre um tucano — bandos percorrendo a copa no inverno', reward: 40, animalIds: ['tucano'] },
  { id: 'colecionador-inverno-jul', month: 6, icon: '🧭', title: 'Colecionador de Inverno', desc: 'Complete 15 espécies diferentes na sua coleção', reward: 65, animalIds: [] },
  { id: 'olhos-na-noite-ago', month: 7, icon: '🦉', title: 'Olhos na Noite', desc: 'Registre uma coruja — filhotes saindo do ninho em agosto', reward: 35, animalIds: ['coruja'] },
  { id: 'raposa-do-mato-ago', month: 7, icon: '🦊', title: 'Raposa do Mato', desc: 'Registre um cachorro-do-mato — época de acasalamento', reward: 35, animalIds: ['cachorro-do-mato'] },
  { id: 'cinco-no-mes-ago', month: 7, icon: '📋', title: 'Cinco no Mês', desc: 'Registre 5 animais diferentes neste mês', reward: 50, animalIds: [] },
  { id: 'lagarto-do-sol-set', month: 8, icon: '🦎', title: 'Lagarto do Sol', desc: 'Registre um teiú — saindo da hibernação na primavera', reward: 25, animalIds: ['teiu'] },
  { id: 'canto-primavera-set', month: 8, icon: '🐦', title: 'Canto de Primavera', desc: 'Registre um sabiá — pico de canto territorial', reward: 20, animalIds: ['sabia'] },
  { id: 'observador-aves-set', month: 8, icon: '🌸', title: 'Observador de Aves', desc: 'Registre 3 espécies de aves diferentes', reward: 40, animalIds: [] },
  { id: 'coracao-aco-out', month: 9, icon: '🐍', title: 'Coração de Aço', desc: '⚠️ Registre uma jararaca — pico de atividade com as chuvas de outubro. Cuidado!', reward: 65, animalIds: ['jararaca'] },
  { id: 'asas-migratorias-out', month: 9, icon: '🦋', title: 'Asas Migratórias', desc: 'Registre uma borboleta — passagem pela Mantiqueira em outubro', reward: 20, animalIds: ['borboleta'] },
  { id: 'noite-de-chuva-out', month: 9, icon: '💧', title: 'Noite de Chuva', desc: 'Registre um sapo — reprodução explosiva pós-chuva', reward: 25, animalIds: ['sapo-cururu'] },
  { id: 'familia-micos-nov', month: 10, icon: '🐒', title: 'Família de Micos', desc: 'Registre um mico — pico de nascimentos em novembro', reward: 25, animalIds: ['mico'] },
  { id: 'rei-do-sol-nov', month: 10, icon: '🦎', title: 'Rei do Sol', desc: 'Registre um teiú NOVAMENTE — pico de atividade do ano', reward: 35, animalIds: ['teiu'] },
  { id: 'olho-vivo-nov', month: 10, icon: '🐛', title: 'Olho Vivo', desc: '⚠️ Registre uma taturana — pico da Lonomia. NÃO TOQUE, só registre!', reward: 60, animalIds: ['taturana'] },
  { id: 'coro-verao-dez', month: 11, icon: '🐸', title: 'Coro do Verão', desc: 'Registre uma rã — pico de reprodução no verão', reward: 25, animalIds: ['ra'] },
  { id: 'herdeiros-mata-dez', month: 11, icon: '🦍', title: 'Herdeiros da Mata', desc: 'Registre um bugio — filhotes visíveis nos grupos em dezembro', reward: 35, animalIds: ['bugio'] },
  { id: 'mestre-mantiqueira-dez', month: 11, icon: '🏆', title: 'Mestre da Mantiqueira', desc: 'Complete 6 missões mensais neste ano', reward: 130, animalIds: [] },
]

export const ANIMAL_GROUPS = {
  mamifero: [
    'onca-pintada', 'lobo-guara', 'onca-parda', 'veado-campeiro',
    'jaguatirica', 'ariranha', 'anta', 'cachorro-do-mato', 'quati',
    'paca', 'bugio', 'mico', 'esquilo', 'capivara', 'lebre', 'gamba',
    'camundongo-do-mato', 'jaratataca',
  ],
  ave: [
    'jacu', 'urutau', 'tucano', 'gaviao', 'seriema', 'coruja',
    'tie-sangue', 'beija-flor', 'trinca-ferro', 'sabia',
    'joao-de-barro', 'rolinha', 'bem-te-vi', 'pardal', 'pombo',
    'canario-da-terra',
  ],
  reptil: ['jararaca', 'caninana', 'teiu', 'cascavel', 'cobra-cipo', 'lagartixa'],
  anfibio: ['sapo-flamenguinho', 'sapo-cururu', 'ra'],
  inseto: ['jatai', 'abelha', 'formiga-sauva', 'mariposa', 'borboleta', 'taturana', 'mosquito'],
}

export const ANIMAL_GROUP_LABELS = {
  mamifero: 'Mamífero',
  ave: 'Ave',
  reptil: 'Réptil',
  anfibio: 'Anfíbio',
  inseto: 'Inseto',
}

export const ANIMAL_GROUP_ICONS = {
  mamifero: '🐾',
  ave: '🐦',
  reptil: '🦎',
  anfibio: '🐸',
  inseto: '🐛',
}

export function getMonthlyMissions(month) {
  return MONTHLY_MISSIONS.filter(m => m.month === month)
}

export function checkMonthlyMission(mission, seenIds, profile, sightings, monthSightings) {
  const fn = MONTHLY_MISSION_CHECKS[mission.id]
  if (!fn) return false
  if (!seenIds || !sightings) return false
  return fn(seenIds, profile, sightings, monthSightings || sightings)
}

const ANIMALS_BY_ID = Object.fromEntries(ANIMALS.map(a => [a.id, a]))

export function mergeAnimalData(dbAnimal) {
  const local = ANIMALS_BY_ID[dbAnimal.id]
  if (!local) {
    return {
      ...dbAnimal,
      sci: dbAnimal.sci_name || '',
      tierLabel: dbAnimal.tier_label || '',
      statusLabel: dbAnimal.status_label || '',
      where: dbAnimal.where_find || '',
      wiki: dbAnimal.wiki_url || '',
      img: '',
      danger: 'inofensivo',
      habits: [],
      howToFind: '',
    }
  }
  return {
    ...local,
    ...dbAnimal,
    sci: dbAnimal.sci_name || local.sci,
    tierLabel: dbAnimal.tier_label || local.tierLabel,
    statusLabel: dbAnimal.status_label || local.statusLabel,
    where: dbAnimal.where_find || local.where,
    wiki: dbAnimal.wiki_url || local.wiki,
    name: dbAnimal.name || local.name,
    emoji: dbAnimal.emoji || local.emoji,
    tier: dbAnimal.tier || local.tier,
    pts: dbAnimal.pts ?? local.pts,
    status: dbAnimal.status || local.status,
    habitat: dbAnimal.habitat || local.habitat,
    id: dbAnimal.id,
  }
}

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
