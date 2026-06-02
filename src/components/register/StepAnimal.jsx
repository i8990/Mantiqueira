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
          background: 'var(--glass)',
          backdropFilter: 'var(--glass-blur)',
          WebkitBackdropFilter: 'var(--glass-blur)',
          border: '0.5px solid var(--glass-border)',
          color: 'var(--text-1)',
          fontSize: 14,
          outline: 'none',
          transition: 'border-color .2s',
        }}
        onFocus={e => e.target.style.borderColor = 'var(--accent)'}
        onBlur={e => e.target.style.borderColor = 'var(--glass-border)'}
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
                borderRadius: 'var(--r-lg)',
                background: isSelected ? 'var(--accent-dim)' : 'var(--glass)',
                backdropFilter: isSelected ? undefined : 'var(--glass-blur)',
                WebkitBackdropFilter: isSelected ? undefined : 'var(--glass-blur)',
                border: isSelected
                  ? `0.5px solid var(--accent)`
                  : '0.5px solid var(--glass-border)',
                cursor: 'pointer',
                transition: 'all .2s var(--ease-spring)',
              }}
            >
              <span style={{ fontSize: 24 }}>{animal.emoji}</span>
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
