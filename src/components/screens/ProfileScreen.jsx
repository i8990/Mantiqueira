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
              padding: '16px 12px',
              background: 'var(--glass)',
              backdropFilter: 'var(--glass-blur)',
              WebkitBackdropFilter: 'var(--glass-blur)',
              borderRadius: 'var(--r-md)',
              textAlign: 'center',
              border: '0.5px solid var(--glass-border)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div style={{ fontSize: 20, marginBottom: 4 }}>{s.icon}</div>
            <div style={{
              fontFamily: 'var(--font-d)',
              fontWeight: 700,
              fontSize: 22,
              color: 'var(--text-1)',
            }}>
              {s.value}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 500 }}>
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
        <Button variant="glass" leftIcon="📤">
          Compartilhar meu perfil
        </Button>
        <Button variant="ghost" onClick={signOut}>
          Sair
        </Button>
      </div>
    </div>
  )
}
