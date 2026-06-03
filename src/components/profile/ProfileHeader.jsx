import { calcLevel } from '../../lib/constants'
import ProgressBar from '../ui/ProgressBar'

export default function ProfileHeader({ profile, rankData, onOpenRanking }) {
  const position = rankData.findIndex(r => r.id === profile?.id) + 1
  const total = rankData.length || 1
  const percentile = position > 0 ? Math.round(((total - position) / total) * 100) : 0
  const levelData = calcLevel(profile?.total_pts || 0)
  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
    : null

  const medal = position === 1 ? '🥇' : position === 2 ? '🥈' : position === 3 ? '🥉' : null
  const avatarUrl = profile?.avatar_url
  const avatarEmoji = profile?.avatar_emoji || '🧭'

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
      padding: '28px 16px 20px',
      background: 'var(--glass-strong)',
      backdropFilter: 'var(--glass-blur-ultra)',
      WebkitBackdropFilter: 'var(--glass-blur-ultra)',
      borderRadius: 'var(--r-2xl)',
      border: '0.5px solid var(--glass-border-light)',
      boxShadow: 'var(--shadow-lg)',
      animation: 'fadeUp .4s var(--ease-spring)',
    }}>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
      }}>
        {avatarUrl ? (
          <img src={avatarUrl} alt="avatar"
            style={{
              width: 90, height: 90, borderRadius: '50%', objectFit: 'cover',
              border: '2px solid var(--accent)', boxShadow: 'var(--shadow-lg)',
              background: 'var(--bg-surface)',
            }}
          />
        ) : (
          <div style={{
            width: 90, height: 90, borderRadius: '50%',
            background: 'var(--glass)',
            backdropFilter: 'var(--glass-blur-heavy)',
            WebkitBackdropFilter: 'var(--glass-blur-heavy)',
            border: '2px solid var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 40, boxShadow: 'var(--shadow-lg)',
          }}>
            {avatarEmoji}
          </div>
        )}

        <h2 style={{
          fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: 20,
          color: 'var(--text-1)', marginTop: 6, textAlign: 'center',
        }}>
          {profile?.name || profile?.username || ''}
        </h2>
        {profile?.username && (
          <span style={{ fontSize: 12, color: 'var(--text-3)' }}>
            @{profile.username}
          </span>
        )}

        {memberSince && (
          <span style={{ fontSize: 11, color: 'var(--text-3)' }}>
            Membro desde {memberSince}
          </span>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, marginTop: 6 }}>
          <span style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'var(--font-d)' }}>
            {levelData.name}
          </span>
          <span style={{
            padding: '2px 12px', borderRadius: 999,
            background: 'var(--accent-dim)', color: 'var(--accent)',
            fontSize: 12, fontWeight: 600,
            border: '0.5px solid var(--accent)',
          }}>
            Nível {levelData.level}
          </span>
        </div>
      </div>

      <div onClick={onOpenRanking} style={{
        width: '100%', cursor: 'pointer',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8,
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: medal ? 'var(--amber-dim)' : 'var(--glass)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: medal ? 24 : 18, fontWeight: 700,
            color: 'var(--amber)',
            border: medal ? '2px solid var(--amber)' : '0.5px solid var(--glass-border)',
            boxShadow: medal ? '0 0 20px rgba(245,167,51,.25)' : 'none',
            flexShrink: 0,
          }}>
            {medal || `#${position}`}
          </div>
          <div style={{
            flex: 1, display: 'flex', alignItems: 'baseline', gap: 6,
            padding: '10px 14px', background: 'var(--amber-dim)',
            borderRadius: 'var(--r-lg)', border: '0.5px solid var(--amber)',
            flexWrap: 'wrap',
          }}>
            <span style={{ fontSize: 26, fontWeight: 700, color: 'var(--amber)', lineHeight: 1 }}>
              {profile?.total_pts || 0}
            </span>
            <span style={{ fontSize: 12, color: 'var(--amber)', fontWeight: 500 }}>pts</span>
            {position > 0 && (
              <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--amber)', fontWeight: 500 }}>
                Top {percentile}%
              </span>
            )}
          </div>
        </div>

        <div style={{ marginBottom: 4 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 500 }}>Progresso</span>
            <span style={{ fontSize: 11, color: 'var(--text-3)' }}>
              {levelData.current}/{levelData.next}
            </span>
          </div>
          <ProgressBar current={levelData.current} max={levelData.next} />
        </div>

        <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-3)' }}>
          {rankData.length} {rankData.length === 1 ? 'guardião' : 'guardiões'} na Mantiqueira
        </div>
      </div>
    </div>
  )
}
