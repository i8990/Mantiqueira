export default function RankCard({ totalPts, rankData }) {
  const position = rankData?.findIndex(r => r.rank === 1) + 1 || 1
  const total = rankData?.length || 1
  const percentile = Math.round(((total - position) / total) * 100)

  return (
    <div style={{
      padding: 16,
      background: 'var(--glass)',
      backdropFilter: 'var(--glass-blur)',
      WebkitBackdropFilter: 'var(--glass-blur)',
      borderRadius: 'var(--r-lg)',
      border: '0.5px solid var(--glass-border)',
      boxShadow: 'var(--shadow-md)',
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
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'var(--amber-dim)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 22,
          fontWeight: 700,
          color: 'var(--amber)',
          border: '2px solid var(--amber)',
          boxShadow: '0 0 20px rgba(245,167,51,.2)',
        }}>
          #{position}
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 18, color: 'var(--amber)' }}>
            {totalPts} pts
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-3)' }}>
            Você está entre os {percentile}% melhores
          </div>
        </div>
      </div>
    </div>
  )
}
