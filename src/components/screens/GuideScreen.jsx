import { useState } from 'react'
import { ANIMALS } from '../../lib/constants'
import FlipCard from '../guide/FlipCard'

const FILTERS = [
  { key: 'all', label: 'Todos' },
  { key: 'critico', label: '🔴 Crítico' },
  { key: 'alto', label: '🟠 Alto' },
  { key: 'medio', label: '🟡 Médio' },
  { key: 'baixo', label: '🟢 Baixo' },
  { key: 'inofensivo', label: '⚪ Inofensivo' },
]

export default function GuideScreen() {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all'
    ? ANIMALS
    : ANIMALS.filter(a => a.danger === filter)

  return (
    <div style={{
      padding: '20px 16px',
      height: '100%',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
    }}>
      <div style={{ marginBottom: 4 }}>
        <h2 style={{
          fontFamily: 'var(--font-d)',
          fontWeight: 700,
          fontSize: 24,
          color: 'var(--text-1)',
          letterSpacing: '-0.02em',
        }}>
          Guia de Campo
        </h2>
        <p style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 2 }}>
          {ANIMALS.length} espécies catalogadas · Toque nos cards para virar
        </p>
      </div>

      <div style={{
        display: 'flex',
        gap: 6,
        overflowX: 'auto',
        paddingBottom: 4,
      }}>
        {FILTERS.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            style={{
              padding: '7px 14px',
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 500,
              background: filter === f.key ? 'var(--accent-dim)' : 'var(--glass)',
              color: filter === f.key ? 'var(--accent)' : 'var(--text-3)',
              border: filter === f.key
                ? '1px solid var(--accent)'
                : '0.5px solid var(--glass-border)',
              cursor: 'pointer',
              transition: 'all .2s var(--ease-apple)',
              whiteSpace: 'nowrap',
              backdropFilter: filter === f.key ? undefined : 'var(--glass-blur)',
              WebkitBackdropFilter: filter === f.key ? undefined : 'var(--glass-blur)',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 10,
        paddingBottom: 80,
      }}>
        {filtered.map(animal => (
          <FlipCard key={animal.id} animal={animal} />
        ))}
      </div>
    </div>
  )
}
