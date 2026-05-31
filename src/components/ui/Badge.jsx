const typeStyles = {
  accent: { background: 'var(--accent-dim)', color: 'var(--accent)' },
  amber: { background: 'var(--amber-dim)', color: 'var(--amber)' },
  coral: { background: 'var(--coral-dim)', color: 'var(--coral)' },
  muted: { background: 'var(--bg-card)', color: 'var(--text-3)' },
}

export default function Badge({ label, type = 'muted' }) {
  return (
    <span
      style={{
        ...typeStyles[type],
        display: 'inline-block',
        padding: '3px 10px',
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.02em',
      }}
    >
      {label}
    </span>
  )
}
