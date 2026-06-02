const MONTH_LABELS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

export default function MonthlyMissions({ missions, onClaim }) {
  const now = new Date()
  const monthName = MONTH_LABELS[now.getMonth()]

  if (!missions?.length) return null

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 10,
      animation: 'fadeUp .5s var(--ease-spring)',
    }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-1)' }}>
        📅 Missões de {monthName}
      </h3>

      {missions.map(m => (
        <div key={m.id} style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 14px',
          borderRadius: 'var(--r-lg)',
          background: m.claimed ? 'var(--glass)' : m.completed ? 'var(--accent-dim)' : 'var(--glass)',
          border: m.claimed
            ? '0.5px solid var(--glass-border)'
            : m.completed
              ? '0.5px solid var(--accent)'
              : '0.5px solid var(--glass-border)',
          opacity: m.claimed ? 0.6 : 1,
          transition: 'all .25s var(--ease-spring)',
        }}>
          <span style={{ fontSize: 24, flexShrink: 0 }}>{m.icon}</span>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontWeight: 600, fontSize: 13, color: 'var(--text-1)',
              textDecoration: m.claimed ? 'line-through' : 'none',
            }}>
              {m.title}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2, lineHeight: 1.3 }}>
              {m.desc}
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--amber)', marginTop: 3 }}>
              +{m.reward} pts
            </div>
          </div>

          {m.claimed ? (
            <span style={{ fontSize: 12, color: 'var(--text-3)', flexShrink: 0 }}>✅</span>
          ) : m.completed ? (
            <button
              onClick={async () => {
                await onClaim(m.id, m.reward)
                window.location.reload()
              }}
              style={{
                padding: '6px 14px', borderRadius: 999,
                background: 'var(--accent)', color: '#060D07',
                border: 'none', fontSize: 11, fontWeight: 700,
                cursor: 'pointer', flexShrink: 0,
                transition: 'all .2s',
              }}
            >
              REIVINDICAR
            </button>
          ) : (
            <div style={{
              padding: '6px 14px', borderRadius: 999,
              background: 'var(--glass)', color: 'var(--text-3)',
              border: '0.5px solid var(--glass-border)',
              fontSize: 11, fontWeight: 500, flexShrink: 0,
            }}>
              {m.animalIds?.length > 0 ? '🔍 Buscar' : 'Pendente'}
            </div>
          )}
        </div>
      ))}

      <div style={{ textAlign: 'center', fontSize: 10, color: 'var(--text-3)', marginTop: -2 }}>
        Missões expiram no fim do mês
      </div>
    </div>
  )
}
