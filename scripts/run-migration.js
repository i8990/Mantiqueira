/**
 * Script para executar migrations SQL no Supabase via Management API.
 * 
 * Uso:
 *   node scripts/run-migration.js <SUPABASE_PAT>
 * 
 * Onde SUPABASE_PAT é um Personal Access Token gerado em:
 *   https://supabase.com/dashboard/account/tokens
 * 
 * Alternativa: copie o conteúdo de supabase/migrations/012_missing_migrations.sql
 * e execute no SQL Editor do dashboard:
 *   https://supabase.com/dashboard/project/ubougdjfkgfxmxzcvenn/sql/new
 */

const PROJECT_REF = 'ubougdjfkgfxmxzcvenn'
const API_URL = `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`

const PAT = process.argv[2]

if (!PAT) {
  console.error(`
❌ PAT não fornecido.
   Gere um token em: https://supabase.com/dashboard/account/tokens
   Uso: node scripts/run-migration.js <seu-pat>
   
   Ou execute manualmente no SQL Editor do dashboard:
   https://supabase.com/dashboard/project/${PROJECT_REF}/sql/new
`)
  process.exit(1)
}

const fs = require('fs')
const path = require('path')

const sqlPath = path.join(__dirname, '..', 'supabase', 'migrations', '012_missing_migrations.sql')
const sql = fs.readFileSync(sqlPath, 'utf8')

async function run() {
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'))

  for (const stmt of statements) {
    const query = stmt + ';'

    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PAT}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })

    const text = await res.text()

    if (!res.ok) {
      console.error(`❌ Erro (${res.status}): ${text}`)
      process.exit(1)
    }

    const lines = query.split('\n').map(l => l.trim()).filter(Boolean)
    console.log(`✅ ${lines.slice(0, 3).join(' ')}...`)
  }

  console.log('\n🎉 Migrations executadas com sucesso!')
  console.log('Agora recarregue o app (force refresh) para o schema cache atualizar.')
}

run().catch(err => {
  console.error('Erro:', err)
  process.exit(1)
})
