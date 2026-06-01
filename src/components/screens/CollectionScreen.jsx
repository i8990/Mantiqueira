import { useState } from 'react'
import { ANIMALS, calcLevel } from '../../lib/constants'
import AnimalCard from '../collection/AnimalCard'
import AnimalDetailSheet from '../collection/AnimalDetailSheet'
import ProgressBar from '../ui/ProgressBar'
import RarityChip from '../ui/RarityChip'
import Card from '../ui/Card'

const FILTERS = [
  { key: 'all', label: 'Todos' },
  { key: 'legendary', label: 'Lendário' },
  { key: 'veryrare', label: 'Muito raro' },
  { key: 'rare', label: 'Raro' },
  { key: 'uncommon', label: 'Pouco comum' },
  { key: 'common', label: 'Comum' },
]

export default function CollectionScreen({ seenIds = new Set(), profile }) {
  const [filter, setFilter] = useState('all')
  const [selectedId, setSelectedId] = useState(null)

  const levelData = calcLevel(profile?.total_pts || 0)

  const filtered = filter === 'all'
    ? ANIMALS
    : ANIMALS.filter(a => a.tier === filter)

  return (
    <div style={{
      padding: '20px 16px',
      height: '100%',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    }}>
      <div>
        <h2 style={{
          fontFamily: 'var(--font-d)',
          fontWeight: 700,
          fontSize: 24,
          color: 'var(--text-1)',
          letterSpacing: '-0.02em',
        }}>
          Coleção
        </h2>
        <p style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 2 }}>
          {seenIds.size} de {ANIMALS.length} espécies descobertas
        </p>
      </div>

      <Card variant="glass">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-1)' }}>
            {levelData.name}
          </span>
          <span style={{
            fontSize: 11,
            fontWeight: 600,
            color: 'var(--amber)',
            background: 'var(--amber-dim)',
            padding: '2px 10px',
            borderRadius: 999,
          }}>
            Nível {levelData.level}
          </span>
        </div>
        <ProgressBar current={levelData.current} max={levelData.next} />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 11,
          color: 'var(--text-3)',
          marginTop: 6,
        }}>
          <span>{levelData.current} pts</span>
          <span>{levelData.next} pts</span>
        </div>
      </Card>

      <div style={{
        display: 'flex',
        gap: 6,
        overflowX: 'auto',
        paddingBottom: 4,
      }}>
        {FILTERS.map(f => (
          <RarityChip
            key={f.key}
            label={f.label}
            filter={f.key}
            active={filter === f.key}
            onClick={() => setFilter(f.key)}
          />
        ))}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 10,
        paddingBottom: 20,
      }}>
        {filtered.map(animal => (
          <AnimalCard
            key={animal.id}
            animal={animal}
            isSeen={seenIds.has(animal.id)}
            onClick={() => setSelectedId(animal.id)}
          />
        ))}
      </div>

      {selectedId && (
        <AnimalDetailSheet
          animalId={selectedId}
          isSeen={seenIds.has(selectedId)}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  )
}
