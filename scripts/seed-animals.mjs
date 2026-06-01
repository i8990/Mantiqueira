import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
let env = ''
try { env = readFileSync(resolve(__dirname, '../.env.local'), 'utf-8') } catch {}

const supabaseUrl = env.match(/VITE_SUPABASE_URL=(.+)/)?.[1] || 'https://ubougdjfkgfxmxzcvenn.supabase.co'
const anonKey = env.match(/VITE_SUPABASE_ANON_KEY=(.+)/)?.[1]

if (!anonKey) {
  console.error('anon key not found in .env.local')
  process.exit(1)
}

const animals = [
  { id: 'sapo-flamenguinho', name: 'Sapo-Flamenguinho', sci_name: 'Mascote', emoji: '🐸', tier: 'L', tier_label: 'Lendário', pts: 1000, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Noites chuvosas em locais específicos', habitat: 'Místico', wiki_url: 'https://pt.wikipedia.org/wiki/Sapo' },
  { id: 'onca-pintada', name: 'Onça-pintada', sci_name: 'Panthera onca', emoji: '🐆', tier: 'L', tier_label: 'Lendário', pts: 800, status: 'EN', status_label: 'Em Perigo', where_find: 'Matas densas e grotões', habitat: 'Floresta Atlântica', wiki_url: 'https://pt.wikipedia.org/wiki/Panthera_onca' },
  { id: 'lobo-guara', name: 'Lobo-guará', sci_name: 'Chrysocyon brachyurus', emoji: '🐺', tier: 'L', tier_label: 'Lendário', pts: 600, status: 'VU', status_label: 'Vulnerável', where_find: 'Campos e cerrado de altitude', habitat: 'Cerrado/Campo', wiki_url: 'https://pt.wikipedia.org/wiki/Lobo-guar%C3%A1' },
  { id: 'onca-parda', name: 'Onça-parda', sci_name: 'Puma concolor', emoji: '🦁', tier: 'S', tier_label: 'Mítico', pts: 450, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Áreas extensas de mata', habitat: 'Floresta Atlântica', wiki_url: 'https://pt.wikipedia.org/wiki/Puma_concolor' },
  { id: 'jaguatirica', name: 'Jaguatirica', sci_name: 'Leopardus pardalis', emoji: '🐱', tier: 'S', tier_label: 'Mítico', pts: 350, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Matas e capoeiras', habitat: 'Floresta Atlântica', wiki_url: 'https://pt.wikipedia.org/wiki/Jaguatirica' },
  { id: 'ariranha', name: 'Ariranha', sci_name: 'Pteronura brasiliensis', emoji: '🦦', tier: 'S', tier_label: 'Mítico', pts: 500, status: 'EN', status_label: 'Em Perigo', where_find: 'Rios e lagoas de águas claras', habitat: 'Aquático', wiki_url: 'https://pt.wikipedia.org/wiki/Ariranha' },
  { id: 'anta', name: 'Anta', sci_name: 'Tapirus terrestris', emoji: '🫏', tier: 'S', tier_label: 'Mítico', pts: 400, status: 'VU', status_label: 'Vulnerável', where_find: 'Próximo a rios e brejos', habitat: 'Floresta Atlântica', wiki_url: 'https://pt.wikipedia.org/wiki/Anta' },
  { id: 'veado-campeiro', name: 'Veado-campeiro', sci_name: 'Ozotoceros bezoarticus', emoji: '🦌', tier: 'S', tier_label: 'Mítico', pts: 280, status: 'NT', status_label: 'Quase ameaçado', where_find: 'Campos abertos e cerrado', habitat: 'Cerrado/Campo', wiki_url: 'https://pt.wikipedia.org/wiki/Veado-campeiro' },
  { id: 'cachorro-do-mato', name: 'Cachorro-do-mato', sci_name: 'Cerdocyon thous', emoji: '🦊', tier: 'A', tier_label: 'Épico', pts: 200, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Matas e bordas de capoeira', habitat: 'Floresta/Campo', wiki_url: 'https://pt.wikipedia.org/wiki/Cachorro-do-mato' },
  { id: 'quati', name: 'Quati', sci_name: 'Nasua nasua', emoji: '🦝', tier: 'A', tier_label: 'Épico', pts: 180, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Matas e capoeiras', habitat: 'Floresta Atlântica', wiki_url: 'https://pt.wikipedia.org/wiki/Quati' },
  { id: 'paca', name: 'Paca', sci_name: 'Cuniculus paca', emoji: '🐭', tier: 'A', tier_label: 'Épico', pts: 220, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Próximo a rios e grotões', habitat: 'Floresta Ombrófila', wiki_url: 'https://pt.wikipedia.org/wiki/Paca' },
  { id: 'bugio', name: 'Bugio', sci_name: 'Alouatta guariba', emoji: '🦍', tier: 'A', tier_label: 'Épico', pts: 200, status: 'VU', status_label: 'Vulnerável', where_find: 'Dossel da mata', habitat: 'Floresta Atlântica', wiki_url: 'https://pt.wikipedia.org/wiki/Bugio' },
  { id: 'jacu', name: 'Jacu', sci_name: 'Penelope obscura', emoji: '🦃', tier: 'A', tier_label: 'Épico', pts: 140, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Bordas de mata e capoeiras', habitat: 'Floresta Atlântica', wiki_url: 'https://pt.wikipedia.org/wiki/Jacu' },
  { id: 'urutau', name: 'Urutau', sci_name: 'Nyctibius griseus', emoji: '🦉', tier: 'A', tier_label: 'Épico', pts: 150, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Galhos secos e troncos', habitat: 'Floresta Atlântica', wiki_url: 'https://pt.wikipedia.org/wiki/Urutau' },
  { id: 'jararaca', name: 'Jararaca', sci_name: 'Bothrops jararaca', emoji: '🐍', tier: 'A', tier_label: 'Épico', pts: 250, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Chão da mata', habitat: 'Floresta Atlântica', wiki_url: 'https://pt.wikipedia.org/wiki/Jararaca' },
  { id: 'caninana', name: 'Caninana', sci_name: 'Spilotes pullatus', emoji: '🐍', tier: 'A', tier_label: 'Épico', pts: 160, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Matas e áreas abertas', habitat: 'Floresta Atlântica', wiki_url: 'https://pt.wikipedia.org/wiki/Caninana' },
  { id: 'seriema', name: 'Seriema', sci_name: 'Cariama cristata', emoji: '🦩', tier: 'B', tier_label: 'Raro', pts: 80, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Campos abertos e cerrado', habitat: 'Cerrado/Campo', wiki_url: 'https://pt.wikipedia.org/wiki/Seriema' },
  { id: 'coruja', name: 'Coruja-buraqueira', sci_name: 'Athene cunicularia', emoji: '🦉', tier: 'B', tier_label: 'Raro', pts: 70, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Campos abertos e tocas no chão', habitat: 'Campo', wiki_url: 'https://pt.wikipedia.org/wiki/Coruja-buraqueira' },
  { id: 'beija-flor', name: 'Beija-flor-tesoura', sci_name: 'Eupetomena macroura', emoji: '🌸', tier: 'B', tier_label: 'Raro', pts: 90, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Jardins e bordas de mata', habitat: 'Floresta/Urbano', wiki_url: 'https://pt.wikipedia.org/wiki/Beija-flor-tesoura' },
  { id: 'trinca-ferro', name: 'Trinca-ferro', sci_name: 'Saltator similis', emoji: '🐦', tier: 'B', tier_label: 'Raro', pts: 60, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Matas e capoeiras', habitat: 'Floresta Atlântica', wiki_url: 'https://pt.wikipedia.org/wiki/Trinca-ferro' },
  { id: 'tucano', name: 'Tucano-de-bico-verde', sci_name: 'Ramphastos dicolorus', emoji: '🦅', tier: 'B', tier_label: 'Raro', pts: 100, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Dossel e bordas de mata', habitat: 'Floresta Atlântica', wiki_url: 'https://pt.wikipedia.org/wiki/Tucano-de-bico-verde' },
  { id: 'jatai', name: 'Jataí', sci_name: 'Tetragonisca angustula', emoji: '🐝', tier: 'B', tier_label: 'Raro', pts: 50, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Ocos de árvores e muros', habitat: 'Floresta/Urbano', wiki_url: 'https://pt.wikipedia.org/wiki/Jata%C3%AD' },
  { id: 'teiu', name: 'Teiú', sci_name: 'Salvator merianae', emoji: '🦎', tier: 'B', tier_label: 'Raro', pts: 80, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Clareiras e bordas de mata', habitat: 'Floresta/Campo', wiki_url: 'https://pt.wikipedia.org/wiki/Tei%C3%BA' },
  { id: 'gaviao', name: 'Gavião-carijó', sci_name: 'Rupornis magnirostris', emoji: '🦅', tier: 'B', tier_label: 'Raro', pts: 90, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Matas abertas e bordas', habitat: 'Floresta/Campo', wiki_url: 'https://pt.wikipedia.org/wiki/Gavi%C3%A3o-carij%C3%B3' },
  { id: 'tie-sangue', name: 'Tiê-sangue', sci_name: 'Ramphocelus bresilius', emoji: '🐦', tier: 'B', tier_label: 'Raro', pts: 70, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Bordas de mata e restinga', habitat: 'Floresta Atlântica', wiki_url: 'https://pt.wikipedia.org/wiki/Ti%C3%AA-sangue' },
  { id: 'sabia', name: 'Sabiá-laranjeira', sci_name: 'Turdus rufiventris', emoji: '🐦', tier: 'C', tier_label: 'Comum', pts: 30, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Jardins e matas', habitat: 'Floresta/Urbano', wiki_url: 'https://pt.wikipedia.org/wiki/Sabi%C3%A1-laranjeira' },
  { id: 'capivara', name: 'Capivara', sci_name: 'Hydrochoerus hydrochaeris', emoji: '🦫', tier: 'C', tier_label: 'Comum', pts: 35, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Margens de rios e lagoas', habitat: 'Brejo/Rio', wiki_url: 'https://pt.wikipedia.org/wiki/Capivara' },
  { id: 'gamba', name: 'Gambá-de-orelha-branca', sci_name: 'Didelphis albiventris', emoji: '🦨', tier: 'C', tier_label: 'Comum', pts: 25, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Áreas urbanas e matas', habitat: 'Floresta/Urbano', wiki_url: 'https://pt.wikipedia.org/wiki/Gamb%C3%A1-de-orelha-branca' },
  { id: 'joao-de-barro', name: 'João-de-barro', sci_name: 'Furnarius rufus', emoji: '🐦', tier: 'C', tier_label: 'Comum', pts: 28, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Campos abertos e postes', habitat: 'Campo/Urbano', wiki_url: 'https://pt.wikipedia.org/wiki/Jo%C3%A3o-de-barro' },
  { id: 'rolinha', name: 'Rolinha', sci_name: 'Columbina talpacoti', emoji: '🕊️', tier: 'C', tier_label: 'Comum', pts: 20, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Áreas abertas e urbanas', habitat: 'Urbano/Campo', wiki_url: 'https://pt.wikipedia.org/wiki/Rolinha' },
  { id: 'sapo-cururu', name: 'Sapo-cururu', sci_name: 'Rhinella schneideri', emoji: '🐸', tier: 'C', tier_label: 'Comum', pts: 20, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Próximo a corpos d\'água', habitat: 'Brejo/Rio', wiki_url: 'https://pt.wikipedia.org/wiki/Sapo-cururu' },
  { id: 'camundongo', name: 'Camundongo-do-mato', sci_name: 'Oligoryzomys nigripes', emoji: '🐀', tier: 'C', tier_label: 'Comum', pts: 15, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Chão da mata e roças', habitat: 'Floresta/Campo', wiki_url: 'https://pt.wikipedia.org/wiki/Rato-do-mato' },
  { id: 'abelha', name: 'Abelha-europeia', sci_name: 'Apis mellifera', emoji: '🐝', tier: 'C', tier_label: 'Comum', pts: 18, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Jardins e campos floridos', habitat: 'Campo/Urbano', wiki_url: 'https://pt.wikipedia.org/wiki/Abelha-europeia' },
  { id: 'ra', name: 'Rã-manteiga', sci_name: 'Leptodactylus ocellatus', emoji: '🐸', tier: 'C', tier_label: 'Comum', pts: 22, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Brejos e poças', habitat: 'Brejo/Rio', wiki_url: 'https://pt.wikipedia.org/wiki/R%C3%A3-manteiga' },
  { id: 'bem-te-vi', name: 'Bem-te-vi', sci_name: 'Pitangus sulphuratus', emoji: '🐦', tier: 'D', tier_label: 'Muito Comum', pts: 12, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Áreas abertas e urbanas', habitat: 'Urbano/Campo', wiki_url: 'https://pt.wikipedia.org/wiki/Bem-te-vi' },
  { id: 'pardal', name: 'Pardal', sci_name: 'Passer domesticus', emoji: '🐦', tier: 'D', tier_label: 'Muito Comum', pts: 8, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Áreas urbanas e rurais', habitat: 'Urbano', wiki_url: 'https://pt.wikipedia.org/wiki/Pardal' },
  { id: 'pombo', name: 'Pombo-doméstico', sci_name: 'Columba livia', emoji: '🕊️', tier: 'D', tier_label: 'Muito Comum', pts: 6, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Áreas urbanas e praças', habitat: 'Urbano', wiki_url: 'https://pt.wikipedia.org/wiki/Pombo-dom%C3%A9stico' },
  { id: 'lagartixa', name: 'Lagartixa-doméstica', sci_name: 'Hemidactylus mabouia', emoji: '🦎', tier: 'D', tier_label: 'Muito Comum', pts: 10, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Paredes e muros', habitat: 'Urbano', wiki_url: 'https://pt.wikipedia.org/wiki/Lagartixa-dom%C3%A9stica' },
  { id: 'formiga-sauva', name: 'Formiga-saúva', sci_name: 'Atta sexdens', emoji: '🐜', tier: 'D', tier_label: 'Muito Comum', pts: 8, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Formigueiros no chão', habitat: 'Solo', wiki_url: 'https://pt.wikipedia.org/wiki/Formiga-cortadeira' },
  { id: 'mosquito', name: 'Mosquito-pernilongo', sci_name: 'Culex quinquefasciatus', emoji: '🦟', tier: 'D', tier_label: 'Muito Comum', pts: 5, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Áreas úmidas e urbanas', habitat: 'Urbano/Brejo', wiki_url: 'https://pt.wikipedia.org/wiki/Culex_quinquefasciatus' },
  { id: 'mariposa', name: 'Mariposa', sci_name: 'Ascalapha odorata', emoji: '🦋', tier: 'D', tier_label: 'Muito Comum', pts: 6, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Áreas abertas e urbanas', habitat: 'Floresta/Urbano', wiki_url: 'https://pt.wikipedia.org/wiki/Bruxa_(mariposa)' },
  { id: 'borboleta', name: 'Borboleta-monarca', sci_name: 'Danaus plexippus', emoji: '🦋', tier: 'D', tier_label: 'Muito Comum', pts: 10, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Jardins e campos', habitat: 'Campo/Urbano', wiki_url: 'https://pt.wikipedia.org/wiki/Borboleta-monarca' },
  { id: 'taturana', name: 'Taturana', sci_name: 'Lonomia obliqua', emoji: '🐛', tier: 'D', tier_label: 'Muito Comum', pts: 15, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Troncos de árvores', habitat: 'Floresta Atlântica', wiki_url: 'https://pt.wikipedia.org/wiki/Taturana' },
]

async function seed() {
  console.log('Inserting', animals.length, 'animals')
  let supabase
  try {
    supabase = createClient(supabaseUrl, anonKey)
    const { data, error } = await supabase.from('animals').insert(animals).select()
    if (!error) {
      console.log('OK -', data.length, 'inserted')
      return
    }
    console.log('RLS blocked:', error.message)
  } catch (e) {
    console.log('REST API failed:', e.message)
  }

  const dbPass = process.env.SUPABASE_DB_PASSWORD
  if (dbPass) {
    console.log('Trying direct pooler connection...')
    try {
      const pg = await import('pg')
      const { Pool } = pg.default || pg
      const pool = new Pool({
        host: 'aws-0-sa-east-1.pooler.supabase.com',
        port: 6543,
        database: 'postgres',
        user: 'postgres.ubougdjfkgfxmxzcvenn',
        password: dbPass,
        ssl: { rejectUnauthorized: false },
        max: 1,
        connectionTimeoutMillis: 10000,
      })
      const client = await pool.connect()
      for (const a of animals) {
        await client.query(
          'INSERT INTO animals (id,name,sci_name,emoji,tier,tier_label,pts,status,status_label,where_find,habitat,wiki_url) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) ON CONFLICT (id) DO NOTHING',
          [a.id, a.name, a.sci_name, a.emoji, a.tier, a.tier_label, a.pts, a.status, a.status_label, a.where_find, a.habitat, a.wiki_url]
        )
      }
      await client.end()
      await pool.end()
      console.log('OK via pooler')
      return
    } catch(e) {
      console.log('Pooler failed:', e.message)
    }
  }

  console.log('\nSQL to run in Supabase Dashboard SQL Editor:')
  console.log('  https://supabase.com/dashboard/project/ubougdjfkgfxmxzcvenn/sql/new')
  console.log('\n-- Step 1: delete old animals and update tier constraint')
  console.log('DELETE FROM animals;')
  console.log("ALTER TABLE animals DROP CONSTRAINT animals_tier_check;")
  console.log("ALTER TABLE animals ADD CONSTRAINT animals_tier_check CHECK (tier IN ('L','S','A','B','C','D'));")
  console.log('\n-- Step 2: insert new animals')
  console.log('INSERT INTO animals (id, name, sci_name, emoji, tier, tier_label, pts, status, status_label, where_find, habitat, wiki_url) VALUES')
  for (let i = 0; i < animals.length; i++) {
    const a = animals[i]
    const comma = i < animals.length - 1 ? ',' : ';'
    console.log("  ('" + a.id + "','" + a.name.replace(/'/g, "''") + "','" + a.sci_name.replace(/'/g, "''") + "','" + a.emoji + "','" + a.tier + "','" + a.tier_label + "'," + a.pts + ",'" + a.status + "','" + a.status_label + "','" + a.where_find.replace(/'/g, "''") + "','" + a.habitat + "','" + a.wiki_url + "')" + comma)
  }
  console.log('\nTip: SUPABASE_DB_PASSWORD=your_password node scripts/seed-animals.mjs')
}

seed().catch(console.error)
