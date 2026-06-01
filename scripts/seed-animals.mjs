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
  { id: 'onca', name: 'Onca-pintada', sci_name: 'Panthera onca', emoji: '🐆', tier: 'legendary', tier_label: 'Lendario', pts: 580, status: 'EN', status_label: 'Em Perigo', where_find: 'Matas densas e grotoes', habitat: 'Floresta Atlantica', wiki_url: 'https://pt.wikipedia.org/wiki/Panthera_onca' },
  { id: 'jacutinga', name: 'Jacutinga', sci_name: 'Aburria jacutinga', emoji: '🐓', tier: 'legendary', tier_label: 'Lendario', pts: 420, status: 'EN', status_label: 'Em Perigo', where_find: 'Dossel da mata', habitat: 'Floresta Atlantica', wiki_url: 'https://pt.wikipedia.org/wiki/Aburria_jacutinga' },
  { id: 'tamandua-bandeira', name: 'Tamandua-bandeira', sci_name: 'Myrmecophaga tridactyla', emoji: '🦔', tier: 'legendary', tier_label: 'Lendario', pts: 400, status: 'VU', status_label: 'Vulneravel', where_find: 'Campos e bordas de mata', habitat: 'Campo/Mata', wiki_url: 'https://pt.wikipedia.org/wiki/Tamandua-bandeira' },
  { id: 'saudade', name: 'Saudade', sci_name: 'Lipaugus ater', emoji: '🐦', tier: 'veryrare', tier_label: 'Muito Raro', pts: 260, status: 'NT', status_label: 'Quase ameacado', where_find: 'Dossel de florestas umidas', habitat: 'Floresta Ombrofila', wiki_url: 'https://pt.wikipedia.org/wiki/Lipaugus_ater' },
  { id: 'caneleirinho', name: 'Caneleirinho-de-chapeu-preto', sci_name: 'Piprites pileata', emoji: '🐦', tier: 'veryrare', tier_label: 'Muito Raro', pts: 280, status: 'EN', status_label: 'Em Perigo', where_find: 'Sub-bosque de florestas altas', habitat: 'Floresta Atlantica', wiki_url: 'https://pt.wikipedia.org/wiki/Piprites_pileata' },
  { id: 'beija-flor-topete', name: 'Beija-flor-de-topete', sci_name: 'Stephanoxis lalandi', emoji: '🌸', tier: 'veryrare', tier_label: 'Muito Raro', pts: 240, status: 'EN', status_label: 'Em Perigo', where_find: 'Campos de altitude e bordas', habitat: 'Campo de altitude', wiki_url: 'https://pt.wikipedia.org/wiki/Stephanoxis_lalandi' },
  { id: 'papagaio-roxo', name: 'Papagaio-de-peito-roxo', sci_name: 'Amazona vinacea', emoji: '🦜', tier: 'rare', tier_label: 'Raro', pts: 198, status: 'CR', status_label: 'Criticamente ameacado', where_find: 'Florestas com araucarias', habitat: 'Floresta com Araucarias', wiki_url: 'https://pt.wikipedia.org/wiki/Amazona_vinacea' },
  { id: 'lobo-guara', name: 'Lobo-guara', sci_name: 'Chrysocyon brachyurus', emoji: '🐺', tier: 'rare', tier_label: 'Raro', pts: 210, status: 'VU', status_label: 'Vulneravel', where_find: 'Campos e cerrado de altitude', habitat: 'Cerrado/Campo', wiki_url: 'https://pt.wikipedia.org/wiki/Lobo-guara' },
  { id: 'jaguatirica', name: 'Jaguatirica', sci_name: 'Leopardus pardalis', emoji: '🐱', tier: 'rare', tier_label: 'Raro', pts: 195, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Matas e capoeiras', habitat: 'Floresta Atlantica', wiki_url: 'https://pt.wikipedia.org/wiki/Jaguatirica' },
  { id: 'bugiu', name: 'Macaco-bugio', sci_name: 'Alouatta guariba', emoji: '🦍', tier: 'rare', tier_label: 'Raro', pts: 185, status: 'VU', status_label: 'Vulneravel', where_find: 'Dossel da mata', habitat: 'Floresta Atlantica', wiki_url: 'https://pt.wikipedia.org/wiki/Bugio' },
  { id: 'paca', name: 'Paca', sci_name: 'Cuniculus paca', emoji: '🐭', tier: 'rare', tier_label: 'Raro', pts: 175, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Proximo a rios e grotoes', habitat: 'Floresta Ombrofila', wiki_url: 'https://pt.wikipedia.org/wiki/Paca' },
  { id: 'jabuti', name: 'Jabuti-piranga', sci_name: 'Chelonoidis carbonarius', emoji: '🐢', tier: 'rare', tier_label: 'Raro', pts: 160, status: 'VU', status_label: 'Vulneravel', where_find: 'Chao da mata', habitat: 'Floresta Atlantica', wiki_url: 'https://pt.wikipedia.org/wiki/Jabuti-piranga' },
  { id: 'tucano', name: 'Tucano-de-bico-verde', sci_name: 'Ramphastos dicolorus', emoji: '🦅', tier: 'uncommon', tier_label: 'Pouco Comum', pts: 90, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Dossel e bordas de mata', habitat: 'Floresta Atlantica', wiki_url: 'https://pt.wikipedia.org/wiki/Tucano-de-bico-verde' },
  { id: 'puma', name: 'Puma', sci_name: 'Puma concolor', emoji: '🦁', tier: 'uncommon', tier_label: 'Pouco Comum', pts: 110, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Areas extensas de mata', habitat: 'Floresta Atlantica', wiki_url: 'https://pt.wikipedia.org/wiki/Puma_concolor' },
  { id: 'anta', name: 'Anta', sci_name: 'Tapirus terrestris', emoji: '🫏', tier: 'uncommon', tier_label: 'Pouco Comum', pts: 100, status: 'VU', status_label: 'Vulneravel', where_find: 'Proximo a rios e brejos', habitat: 'Floresta Atlantica', wiki_url: 'https://pt.wikipedia.org/wiki/Anta' },
  { id: 'sagui', name: 'Sagui-da-serra-escuro', sci_name: 'Callithrix aurita', emoji: '🐒', tier: 'uncommon', tier_label: 'Pouco Comum', pts: 95, status: 'VU', status_label: 'Vulneravel', where_find: 'Matas secundarias', habitat: 'Floresta Atlantica', wiki_url: 'https://pt.wikipedia.org/wiki/Callithrix_aurita' },
  { id: 'capivara', name: 'Capivara', sci_name: 'Hydrochoerus hydrochaeris', emoji: '🦫', tier: 'uncommon', tier_label: 'Pouco Comum', pts: 55, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Margens de rios e lagoas', habitat: 'Brejo/Rio', wiki_url: 'https://pt.wikipedia.org/wiki/Capivara' },
  { id: 'tatu-galinha', name: 'Tatu-galinha', sci_name: 'Dasypus novemcinctus', emoji: '🦔', tier: 'uncommon', tier_label: 'Pouco Comum', pts: 65, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Chao da mata', habitat: 'Floresta/Campo', wiki_url: 'https://pt.wikipedia.org/wiki/Tatu-galinha' },
  { id: 'teiu', name: 'Teiu', sci_name: 'Salvator merianae', emoji: '🦎', tier: 'uncommon', tier_label: 'Pouco Comum', pts: 55, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Clareiras e bordas de mata', habitat: 'Floresta/Campo', wiki_url: 'https://pt.wikipedia.org/wiki/Teiu' },
  { id: 'quati', name: 'Quati', sci_name: 'Nasua nasua', emoji: '🦝', tier: 'common', tier_label: 'Comum', pts: 38, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Matas e capoeiras', habitat: 'Floresta Atlantica', wiki_url: 'https://pt.wikipedia.org/wiki/Quati' },
  { id: 'macaco-prego', name: 'Macaco-prego', sci_name: 'Sapajus nigritus', emoji: '🐒', tier: 'common', tier_label: 'Comum', pts: 35, status: 'VU', status_label: 'Vulneravel', where_find: 'Dossel da mata', habitat: 'Floresta Atlantica', wiki_url: 'https://pt.wikipedia.org/wiki/Macaco-prego' },
  { id: 'lontra', name: 'Lontra', sci_name: 'Lontra longicaudis', emoji: '🦦', tier: 'common', tier_label: 'Comum', pts: 32, status: 'NT', status_label: 'Quase ameacado', where_find: 'Rios e corregos', habitat: 'Aquatico', wiki_url: 'https://pt.wikipedia.org/wiki/Lontra' },
  { id: 'cobertou', name: 'Cobertou', sci_name: 'Philander opossum', emoji: '🐀', tier: 'common', tier_label: 'Comum', pts: 22, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Chao da mata', habitat: 'Floresta Ombrofila', wiki_url: 'https://pt.wikipedia.org/wiki/Philander_opossum' },
  { id: 'gamba', name: 'Gamba-de-orelha-branca', sci_name: 'Didelphis albiventris', emoji: '🦨', tier: 'common', tier_label: 'Comum', pts: 20, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Areas urbanas e matas', habitat: 'Floresta/Urbano', wiki_url: 'https://pt.wikipedia.org/wiki/Gamba-de-orelha-branca' },
  { id: 'sapo-cururu', name: 'Sapo-cururu', sci_name: 'Rhinella schneideri', emoji: '🐸', tier: 'common', tier_label: 'Comum', pts: 15, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Proximo a corpos dagua', habitat: 'Brejo/Rio', wiki_url: 'https://pt.wikipedia.org/wiki/Sapo-cururu' },
  { id: 'perereca', name: 'Perereca-ferreiro', sci_name: 'Boana faber', emoji: '🐸', tier: 'common', tier_label: 'Comum', pts: 16, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Pocas e brejos', habitat: 'Brejo/Rio', wiki_url: 'https://pt.wikipedia.org/wiki/Boana_faber' },
  { id: 'jararaca', name: 'Jararaca', sci_name: 'Bothrops jararaca', emoji: '🐍', tier: 'common', tier_label: 'Comum', pts: 25, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Chao da mata', habitat: 'Floresta Atlantica', wiki_url: 'https://pt.wikipedia.org/wiki/Jararaca' },
  { id: 'formiga', name: 'Formiga-cortadeira', sci_name: 'Atta sexdens', emoji: '🐜', tier: 'common', tier_label: 'Comum', pts: 10, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Formigueiros no chao', habitat: 'Solo', wiki_url: 'https://pt.wikipedia.org/wiki/Formiga-cortadeira' },
  { id: 'maria-faceira', name: 'Maria-faceira', sci_name: 'Syrigma sibilatrix', emoji: '🦩', tier: 'common', tier_label: 'Comum', pts: 28, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Campos alagados', habitat: 'Brejo/Campo', wiki_url: 'https://pt.wikipedia.org/wiki/Maria-faceira' },
  { id: 'beija-flor-verde', name: 'Beija-flor-verde', sci_name: 'Chlorostilbon lucidus', emoji: '🌺', tier: 'common', tier_label: 'Comum', pts: 20, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Jardins e bordas de mata', habitat: 'Floresta/Urbano', wiki_url: 'https://pt.wikipedia.org/wiki/Beija-flor-verde' },
  { id: 'corruira', name: 'Corruira', sci_name: 'Troglodytes musculus', emoji: '🐦', tier: 'common', tier_label: 'Comum', pts: 12, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Areas abertas e jardins', habitat: 'Urbano/Campo', wiki_url: 'https://pt.wikipedia.org/wiki/Corruira' },
  { id: 'quero-quero', name: 'Quero-quero', sci_name: 'Vanellus chilensis', emoji: '🐦', tier: 'common', tier_label: 'Comum', pts: 18, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Campos abertos', habitat: 'Campo', wiki_url: 'https://pt.wikipedia.org/wiki/Quero-quero' },
  { id: 'bem-te-vi', name: 'Bem-te-vi', sci_name: 'Pitangus sulphuratus', emoji: '🐦', tier: 'common', tier_label: 'Comum', pts: 14, status: 'LC', status_label: 'Pouco preocupante', where_find: 'Areas abertas e urbanas', habitat: 'Urbano/Campo', wiki_url: 'https://pt.wikipedia.org/wiki/Bem-te-vi' },
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
          'INSERT INTO animals (id,name,sci_name,emoji,tier,tier_label,pts,status,status_label,where_find,habitat,url) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) ON CONFLICT (id) DO NOTHING',
          [a.id, a.name, a.sci_name, a.emoji, a.tier, a.tier_label, a.pts, a.status, a.status_label, a.where_find, a.habitat, a.url]
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

  console.log('nSQL to run in Supabase Dashboard SQL Editor:')
  console.log('  https://supabase.com/dashboard/project/ubougdjfkgfxmxzcvenn/sql/new')
  console.log('nINSERT INTO animals (id, name, sci_name, emoji, tier, tier_label, pts, status, status_label, where_find, habitat, wiki_url) VALUES')
  for (let i = 0; i < animals.length; i++) {
    const a = animals[i]
    const comma = i < animals.length - 1 ? ',' : ';'
    console.log("  ('" + a.id + "','" + a.name + "','" + a.sci_name + "','" + a.emoji + "','" + a.tier + "','" + a.tier_label + "'," + a.pts + ",'" + a.status + "','" + a.status_label + "','" + a.where_find + "','" + a.habitat + "','" + a.wiki_url + "')" + comma)
  }
  console.log('nTip: SUPABASE_DB_PASSWORD=your_password node scripts/seed-animals.mjs')
}

seed().catch(console.error)
