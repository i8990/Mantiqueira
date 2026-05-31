import { calcLevel } from '../../lib/constants'
import BadgeGrid from '../profile/BadgeGrid'
import RankCard from '../profile/RankCard'
import Button from '../ui/Button'
import useAuth from '../../hooks/useAuth'

export default function ProfileScreen({ profile, sightings, seenIds }) {
  const { signOut } = useAuth()
  const levelData = calcLevel(profile?.total_pts || 0)

  const stats = [
    { icon: '📍', label: 'Registros', value: sightings?.length || 0 },
    { icon: '🦎', label: 'Espécies', value: seenIds?.size || 0 },
    { icon: '🔥', label: 'Streak', value: `${profile?.streak_days || 0}d` },
    { icon: '🗺️', label: 'Área', value: `${sightings?.filter(s => s.lat).length || 0} pts` },
  ]

  return (
    <div style={{
      padding: '20px 16px',
      height: '100%',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        padding: '24px 16px',
        background: 'var(--bg-card)',
        borderRadius: 'var(--r-xl)',
      }}>
        <span style={{ fontSize: 48 }}>{profile?.avatar_emoji || '🧭'}</span>
        <h2 style={{
          fontFamily: 'var(--font-d)',
          fontWeight: 700,
          fontSize: 22,
          color: 'var(--text-1)',
        }}>
          @{profile?.username || 'guardião'}
        </h2>
        <div style={{
          display: 'flex',
          gap: 8,
          alignItems: 'center',
        }}>
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

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 8,
      }}>
        {stats.map(s => (
          <div
            key={s.label}
            style={{
              padding: '14px 12px',
              background: 'var(--bg-card)',
              borderRadius: 'var(--r-md)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 20, marginBottom: 4 }}>{s.icon}</div>
            <div style={{
              fontFamily: 'var(--font-d)',
              fontWeight: 700,
              fontSize: 20,
              color: 'var(--text-1)',
            }}>
              {s.value}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-3)' }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <BadgeGrid seenIds={seenIds} profile={profile} sightings={sightings} />

      <RankCard totalPts={profile?.total_pts || 0} rankData={[]} />

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 12,
        paddingBottom: 20,
      }}>
        <Button variant="secondary">
          📤 Compartilhar meu perfil
        </Button>
        <Button variant="ghost" onClick={signOut}>
          Sair
        </Button>
      </div>
    </div>
  )
}
