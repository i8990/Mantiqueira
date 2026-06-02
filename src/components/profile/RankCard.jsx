import { calcLevel } from '../../lib/constants'
import ProgressBar from '../ui/ProgressBar'

export default function RankCard({ profile, rankData, userId, onOpenRanking }) {
  const position = rankData.findIndex(r => r.id === userId) + 1
  const total = rankData.length || 1
  const percentile = position > 0 ? Math.round(((total - position) / total) * 100) : 0
  const levelData = calcLevel(profile?.total_pts || 0)

  const medal = position === 1 ? '🥇' : position === 2 ? '🥈' : position === 3 ? '🥉' : null
  const avatarUrl = profile?.avatar_url
  const avatarEmoji = profile?.avatar_emoji || '🧭'

  return (
    <div onClick={onOpenRanking}
      style={{
        padding: 20,
        background: 'var(--glass-strong)',
        backdropFilter: 'var(--glass-blur-heavy)',
        WebkitBackdropFilter: 'var(--glass-blur-heavy)',
        borderRadius: 'var(--r-xl)',
        border: '0.5px solid var(--glass-border-light)',
        boxShadow: 'var(--shadow-glass)',
        cursor: 'pointer',
        transition: 'all .25s var(--ease-spring)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
        <div style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: medal ? 'var(--amber-dim)' : 'var(--glass)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: medal ? 32 : 28,
          fontWeight: 700,
          color: 'var(--amber)',
          border: medal ? '2px solid var(--amber)' : '0.5px solid var(--glass-border)',
          boxShadow: medal ? '0 0 24px rgba(245,167,51,.25)' : 'none',
          flexShrink: 0,
        }}>
          {medal || `#${position}`}
        </div>

        {avatarUrl ? (
          <img src={avatarUrl} alt=""
            style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent)', flexShrink: 0 }}
          />
        ) : (
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'var(--glass)', border: '2px solid var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 36, flexShrink: 0,
          }}>
            {avatarEmoji}
          </div>
        )}

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 18, color: 'var(--text-1)', lineHeight: 1.2 }}>
            {profile?.name || profile?.username || 'Matago'}
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 2 }}>
            @{profile?.username || 'matago'}
          </div>
          <div style={{ fontSize: 13, color: 'var(--amber)', fontWeight: 600, marginTop: 4 }}>
            {levelData.name} · Nível {levelData.level}
          </div>
        </div>
      </div>

      <div style={{
        display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12,
        padding: '12px 16px', background: 'var(--amber-dim)',
        borderRadius: 'var(--r-lg)', border: '0.5px solid var(--amber)',
      }}>
        <span style={{ fontSize: 32, fontWeight: 700, color: 'var(--amber)', lineHeight: 1 }}>
          {profile?.total_pts || 0}
        </span>
        <span style={{ fontSize: 14, color: 'var(--amber)', fontWeight: 500 }}>pontos</span>
        {position > 0 && (
          <span style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--amber)', fontWeight: 500 }}>
            Top {percentile}%
          </span>
        )}
      </div>

      <div style={{ marginBottom: 4 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <span style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 500 }}>Progresso</span>
          <span style={{ fontSize: 11, color: 'var(--text-3)' }}>
            {levelData.current}/{levelData.next} pts
          </span>
        </div>
        <ProgressBar current={levelData.current} max={levelData.next} />
      </div>

      <div style={{ textAlign: 'center', marginTop: 12, fontSize: 12, color: 'var(--text-3)' }}>
        Total de {rankData.length} {rankData.length === 1 ? 'guardião' : 'guardiões'} na Mantiqueira
      </div>
    </div>
  )
}
