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
        padding: '16px 8px',
        borderRadius: 'var(--r-xl)',
        background: 'var(--glass)',
        backdropFilter: 'var(--glass-blur)',
        WebkitBackdropFilter: 'var(--glass-blur)',
        border: ['L', 'S', 'A'].includes(animal.tier)
          ? `0.5px solid ${TIER_COLORS[animal.tier]}77`
          : '0.5px solid var(--glass-border)',
        boxShadow: ['L', 'S'].includes(animal.tier)
          ? `0 0 0 0.5px ${TIER_COLORS[animal.tier]}44, 0 4px 24px ${TIER_COLORS[animal.tier]}15`
          : 'var(--shadow-glass)',
        cursor: 'pointer',
        opacity: isSeen ? 1 : 0.55,
        filter: isSeen ? 'none' : 'grayscale(1)',
        transition: 'all .3s var(--ease-spring)',
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
      <span style={{ fontSize: 34 }}>{animal.emoji}</span>
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
