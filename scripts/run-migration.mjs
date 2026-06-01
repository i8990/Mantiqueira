// Script para executar a migration RLS no Supabase
// Uso: SUPABASE_SERVICE_KEY=sua_key node scripts/run-migration.mjs

import { createClient } from '@supabase/supabase-js'

const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY
if (!SERVICE_KEY) {
  console.error('Defina SUPABASE_SERVICE_KEY (service_role key do Supabase)')
  process.exit(1)
}

const url = 'https://ubougdjfkgfxmxzcvenn.supabase.co'
const supabase = createClient(url, SERVICE_KEY)

const sql = `
DROP POLICY IF EXISTS "Users can view own sightings" ON sightings;
CREATE POLICY "Users can view all sightings"
  ON sightings FOR SELECT
  USING (true);
`

const { error } = await supabase.rpc('exec_sql', { sql })
if (error) {
  console.error('Migration error:', error.message)
  process.exit(1)
}
console.log('Migration executada com sucesso!')
