export default function RankCard({ totalPts, rankData, userId }) {
  const position = rankData.findIndex(r => r.id === userId) + 1
  const total = rankData.length || 1
  const percentile = position > 0 ? Math.round(((total - position) / total) * 100) : 0

  return (
    <div style={{
      padding: 16,
      background: 'var(--glass-strong)',
      backdropFilter: 'var(--glass-blur-heavy)',
      WebkitBackdropFilter: 'var(--glass-blur-heavy)',
      borderRadius: 'var(--r-xl)',
      border: '0.5px solid var(--glass-border-light)',
      boxShadow: 'var(--shadow-glass)',
      cursor: 'pointer',
      transition: 'all .25s var(--ease-spring)',
    }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-1)', marginBottom: 12 }}>
        Ranking regional
      </h3>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
      }}>
        <div style={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'var(--amber-dim)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 24,
          fontWeight: 700,
          color: 'var(--amber)',
          border: '2px solid var(--amber)',
          boxShadow: '0 0 24px rgba(245,167,51,.25)',
        }}>
          {position > 0 ? `#${position}` : '-'}
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 18, color: 'var(--amber)' }}>
            {totalPts} pts
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-3)' }}>
            {position > 0
              ? `Você está entre os ${percentile}% melhores`
              : 'Nenhum dado disponível'}
          </div>
        </div>
      </div>
    </div>
  )
}
