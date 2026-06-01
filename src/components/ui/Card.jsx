import { TIER_COLORS } from '../../lib/constants'

const tierBorders = {
  L: { borderColor: `${TIER_COLORS.L}55`, boxShadow: `0 0 0 0.5px ${TIER_COLORS.L}33, 0 4px 20px ${TIER_COLORS.L}15` },
  S: { borderColor: `${TIER_COLORS.S}55`, boxShadow: `0 0 0 0.5px ${TIER_COLORS.S}33, 0 4px 20px ${TIER_COLORS.S}15` },
  A: { borderColor: `${TIER_COLORS.A}44`, boxShadow: `0 0 0 0.5px ${TIER_COLORS.A}22, 0 4px 20px ${TIER_COLORS.A}10` },
}

export default function Card({ children, variant, onClick, tier, style, ...props }) {
  const isGlass = variant === 'glass'

  return (
    <div
      onClick={onClick}
      style={{
        background: isGlass ? 'var(--glass)' : 'var(--bg-card)',
        backdropFilter: isGlass ? 'var(--glass-blur)' : undefined,
        WebkitBackdropFilter: isGlass ? 'var(--glass-blur)' : undefined,
        border: isGlass
          ? '0.5px solid var(--glass-border)'
          : '0.5px solid var(--border)',
        borderRadius: 'var(--r-lg)',
        padding: 16,
        boxShadow: isGlass ? 'var(--shadow-md)' : undefined,
        ...(tier && tierBorders[tier]),
        ...(onClick && { cursor: 'pointer' }),
        transition: 'all .2s var(--ease-apple)',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}
