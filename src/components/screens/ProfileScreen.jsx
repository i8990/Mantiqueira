import { useState } from 'react'
import { ANIMALS, calcLevel, TIER_LABELS, TIER_COLORS } from '../../lib/constants'
import BadgeGrid from '../profile/BadgeGrid'
import RankCard from '../profile/RankCard'
import AnimalCard from '../collection/AnimalCard'
import AnimalDetailSheet from '../collection/AnimalDetailSheet'
import ProgressBar from '../ui/ProgressBar'
import RarityChip from '../ui/RarityChip'
import Card from '../ui/Card'
import Button from '../ui/Button'
import useAuth from '../../hooks/useAuth'

const RARITY_FILTERS = [
  { key: 'all', label: 'Todos' },
  ...Object.entries(TIER_LABELS).map(([key, label]) => ({ key, label })),
]

export default function ProfileScreen({ profile, sightings, seenIds }) {
  const { signOut } = useAuth()
  const levelData = calcLevel(profile?.total_pts || 0)
  const [rarityFilter, setRarityFilter] = useState('all')
  const [selectedId, setSelectedId] = useState(null)

  const filtered = rarityFilter === 'all'
    ? ANIMALS
    : ANIMALS.filter(a => a.tier === rarityFilter)

  const stats = [
    { icon: '📍', label: 'Registros', value: sightings?.length || 0 },
    { icon: '🦎', label: 'Espécies', value: seenIds?.size || 0 },
    { icon: '🔥', label: 'Streak', value: `${profile?.streak_days || 0}d` },
    { icon: '🗺️', label: 'Área', value: `${sightings?.filter(s => s.lat).length || 0} pts` },
  ]

  const uniqueTiersSeen = [...new Set(ANIMALS.filter(a => seenIds.has(a.id)).map(a => a.tier))]

  return (
    <div style={{
      padding: '20px 16px',
      height: '100%',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        padding: '28px 16px',
        background: 'var(--glass)',
        backdropFilter: 'var(--glass-blur)',
        WebkitBackdropFilter: 'var(--glass-blur)',
        borderRadius: 'var(--r-xl)',
        border: '0.5px solid var(--glass-border)',
        boxShadow: 'var(--shadow-lg)',
      }}>
        <div style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          background: 'var(--glass)',
          backdropFilter: 'var(--glass-blur-heavy)',
          WebkitBackdropFilter: 'var(--glass-blur-heavy)',
          border: '0.5px solid var(--glass-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 36,
        }}>
          {profile?.avatar_emoji || '🧭'}
        </div>
        <h2 style={{
          fontFamily: 'var(--font-d)',
          fontWeight: 700,
          fontSize: 22,
          color: 'var(--text-1)',
          letterSpacing: '-0.02em',
        }}>
          @{profile?.username || 'matago'}
        </h2>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{
            padding: '4px 12px',
            borderRadius: 999,
            background: 'var(--amber-dim)',
            color: 'var(--amber)',
            fontSize: 12,
            fontWeight: 600,
          }}>
            Nível {levelData.level}
          </span>
          <span style={{ fontSize: 13, color: 'var(--text-2)' }}>
            {levelData.name}
          </span>
        </div>
      </div>

      <BadgeGrid seenIds={seenIds} profile={profile} sightings={sightings} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 6,
      }}>
        {stats.map(s => (
          <div key={s.label} style={{
            padding: '10px 6px',
            background: 'var(--glass)',
            backdropFilter: 'var(--glass-blur)',
            WebkitBackdropFilter: 'var(--glass-blur)',
            borderRadius: 'var(--r-md)',
            textAlign: 'center',
            border: '0.5px solid var(--glass-border)',
          }}>
            <div style={{ fontSize: 16, marginBottom: 2 }}>{s.icon}</div>
            <div style={{
              fontFamily: 'var(--font-d)',
              fontWeight: 700,
              fontSize: 16,
              color: 'var(--text-1)',
            }}>
              {s.value}
            </div>
            <div style={{ fontSize: 9, color: 'var(--text-3)', fontWeight: 500, marginTop: 1 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <RankCard totalPts={profile?.total_pts || 0} rankData={[]} />

      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-1)' }}>
            Coleção
          </h3>
          <span style={{ fontSize: 12, color: 'var(--text-3)' }}>
            {seenIds.size}/{ANIMALS.length}
          </span>
        </div>

        <Card variant="glass" style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-1)' }}>
              {levelData.name}
            </span>
            <span style={{
              fontSize: 10,
              fontWeight: 600,
              color: 'var(--amber)',
              background: 'var(--amber-dim)',
              padding: '2px 8px',
              borderRadius: 999,
            }}>
              Nível {levelData.level}
            </span>
          </div>
          <ProgressBar current={levelData.current} max={levelData.next} />
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 10,
            color: 'var(--text-3)',
            marginTop: 4,
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
          marginBottom: 10,
        }}>
          {RARITY_FILTERS.map(f => (
            <RarityChip
              key={f.key}
              label={f.label}
              filter={f.key}
              active={rarityFilter === f.key}
              onClick={() => setRarityFilter(f.key)}
            />
          ))}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 10,
          paddingBottom: 100,
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
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 12,
        paddingBottom: 20,
      }}>
        <Button variant="glass" leftIcon="📤">
          Compartilhar meu perfil
        </Button>
        <Button variant="ghost" onClick={signOut}>
          Sair
        </Button>
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
