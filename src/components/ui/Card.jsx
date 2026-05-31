const tierBorders = {
  legendary: { borderColor: 'var(--coral)', boxShadow: '0 0 0 0.5px rgba(232,91,60,.25)' },
  rare: { borderColor: 'var(--amber)', boxShadow: '0 0 0 0.5px rgba(245,167,51,.2)' },
}

export default function Card({ children, className, onClick, tier, style, ...props }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: 'var(--bg-card)',
        border: '0.5px solid var(--border)',
        borderRadius: 'var(--r-lg)',
        padding: 16,
        ...(tier && tierBorders[tier]),
        ...(onClick && { cursor: 'pointer' }),
        transition: 'background .2s',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}
