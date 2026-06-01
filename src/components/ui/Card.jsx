const tierBorders = {
  legendary: { borderColor: 'rgba(232,91,60,.35)', boxShadow: '0 0 0 0.5px rgba(232,91,60,.25), 0 4px 20px rgba(232,91,60,.08)' },
  rare: { borderColor: 'rgba(245,167,51,.3)', boxShadow: '0 0 0 0.5px rgba(245,167,51,.2), 0 4px 20px rgba(245,167,51,.06)' },
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
