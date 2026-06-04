import { useState, useMemo } from 'react'
import { ANIMALS, TIER_COLORS, ANIMAL_GROUPS, ANIMAL_GROUP_LABELS, ANIMAL_GROUP_ICONS } from '../../lib/constants'

export default function StepAnimal({ selectedAnimalId, onSelect }) {
  const [search, setSearch] = useState('')
  const [groupFilter, setGroupFilter] = useState(null)

  const groups = Object.keys(ANIMAL_GROUPS)

  const filtered = useMemo(() => {
    return ANIMALS.filter(a => {
      const matchesSearch = search === '' ||
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.id.includes(search.toLowerCase())
      const matchesGroup = !groupFilter ||
        (ANIMAL_GROUPS[groupFilter] && ANIMAL_GROUPS[groupFilter].includes(a.id))
      return matchesSearch && matchesGroup
    })
  }, [search, groupFilter])

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
        display: 'flex',
        gap: 6,
        flexWrap: 'wrap',
      }}>
        <button
          onClick={() => setGroupFilter(null)}
          style={{
            padding: '5px 10px',
            borderRadius: 999,
            border: `0.5px solid ${groupFilter === null ? 'var(--accent)' : 'var(--glass-border)'}`,
            background: groupFilter === null ? 'var(--accent-dim)' : 'var(--glass)',
            color: groupFilter === null ? 'var(--accent)' : 'var(--text-2)',
            fontSize: 11,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all .2s',
          }}
        >
          Todos
        </button>
        {groups.map(g => (
          <button
            key={g}
            onClick={() => setGroupFilter(g === groupFilter ? null : g)}
            style={{
              padding: '5px 10px',
              borderRadius: 999,
              border: `0.5px solid ${groupFilter === g ? 'var(--accent)' : 'var(--glass-border)'}`,
              background: groupFilter === g ? 'var(--accent-dim)' : 'var(--glass)',
              color: groupFilter === g ? 'var(--accent)' : 'var(--text-2)',
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all .2s',
            }}
          >
            {ANIMAL_GROUP_ICONS[g]} {ANIMAL_GROUP_LABELS[g]}
          </button>
        ))}
      </div>

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
