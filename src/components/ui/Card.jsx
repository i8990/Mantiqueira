import { TIER_COLORS } from '../../lib/constants'

const tierBorders = {
  L: { borderColor: `${TIER_COLORS.L}88`, boxShadow: `0 0 0 0.5px ${TIER_COLORS.L}44, 0 4px 24px ${TIER_COLORS.L}18` },
  S: { borderColor: `${TIER_COLORS.S}88`, boxShadow: `0 0 0 0.5px ${TIER_COLORS.S}44, 0 4px 24px ${TIER_COLORS.S}18` },
  A: { borderColor: `${TIER_COLORS.A}66`, boxShadow: `0 0 0 0.5px ${TIER_COLORS.A}33, 0 4px 20px ${TIER_COLORS.A}12` },
}

export default function Card({ children, variant, onClick, tier, style, ...props }) {
  const isGlass = variant === 'glass'

  return (
    <div
      onClick={onClick}
      style={{
        background: isGlass ? 'var(--glass-strong)' : 'var(--bg-card)',
        backdropFilter: isGlass ? 'var(--glass-blur-heavy)' : undefined,
        WebkitBackdropFilter: isGlass ? 'var(--glass-blur-heavy)' : undefined,
        border: isGlass
          ? '0.5px solid var(--glass-border-light)'
          : '0.5px solid var(--border)',
        borderRadius: 'var(--r-xl)',
        padding: 16,
        boxShadow: isGlass ? 'var(--shadow-glass)' : undefined,
        ...(tier && tierBorders[tier]),
        ...(onClick && { cursor: 'pointer' }),
        transition: 'all .25s var(--ease-spring)',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}
