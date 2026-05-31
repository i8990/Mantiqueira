import { TIER_COLORS } from '../../lib/constants'
import Badge from '../ui/Badge'

export default function AnimalCard({ animal, isSeen, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        padding: '14px 8px',
        borderRadius: 'var(--r-lg)',
        background: 'var(--bg-card)',
        border: animal.tier === 'legendary'
          ? '0.5px solid rgba(232,91,60,.25)'
          : animal.tier === 'rare'
            ? '0.5px solid rgba(245,167,51,.2)'
            : '0.5px solid var(--border)',
        cursor: 'pointer',
        opacity: isSeen ? 1 : 0.55,
        filter: isSeen ? 'none' : 'grayscale(1)',
        transition: 'all .2s',
        position: 'relative',
      }}
    >
      {!isSeen && (
        <span style={{
          position: 'absolute',
          top: 8,
          right: 8,
          fontSize: 14,
        }}>
          🔒
        </span>
      )}
      <span style={{ fontSize: 32 }}>{animal.emoji}</span>
      <span style={{
        fontSize: 12,
        fontWeight: 600,
        color: 'var(--text-1)',
        textAlign: 'center',
        lineHeight: 1.2,
      }}>
        {animal.name}
      </span>
      <span style={{ fontSize: 10, color: 'var(--text-3)', fontStyle: 'italic' }}>
        {animal.sci}
      </span>
      {isSeen && (
        <Badge label="✓ Visto" type="accent" />
      )}
      <span style={{
        fontSize: 11,
        fontWeight: 600,
        color: TIER_COLORS[animal.tier],
      }}>
        {animal.pts} pts
      </span>
    </button>
  )
}
