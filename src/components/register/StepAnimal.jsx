import { useState } from 'react'
import { ANIMALS, TIER_COLORS } from '../../lib/constants'

export default function StepAnimal({ selectedAnimalId, onSelect }) {
  const [search, setSearch] = useState('')

  const filtered = ANIMALS.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.id.includes(search.toLowerCase())
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <input
        type="text"
        placeholder="Buscar espécie..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: '100%',
          padding: '12px 16px',
          borderRadius: 'var(--r-md)',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          color: 'var(--text-1)',
          fontSize: 14,
          outline: 'none',
        }}
      />
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 8,
        maxHeight: 320,
        overflowY: 'auto',
      }}>
        {filtered.map(animal => {
          const isSelected = selectedAnimalId === animal.id
          return (
            <button
              key={animal.id}
              onClick={() => onSelect(animal.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                padding: '10px 6px',
                borderRadius: 'var(--r-md)',
                background: isSelected ? 'var(--accent-dim)' : 'var(--bg-card)',
                border: isSelected
                  ? `1px solid var(--accent)`
                  : '1px solid var(--border)',
                cursor: 'pointer',
                transition: 'all .15s',
              }}
            >
              <span style={{ fontSize: 22 }}>{animal.emoji}</span>
              <span style={{
                fontSize: 11,
                fontWeight: 500,
                color: isSelected ? 'var(--accent)' : 'var(--text-2)',
                textAlign: 'center',
                lineHeight: 1.2,
              }}>
                {animal.name}
              </span>
              <span style={{
                fontSize: 10,
                color: TIER_COLORS[animal.tier] || 'var(--text-3)',
                fontWeight: 600,
              }}>
                {animal.pts}pts
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
