export default function RarityChip({ label, filter, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '7px 16px',
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 500,
        background: active ? 'var(--accent-dim)' : 'var(--glass)',
        color: active ? 'var(--accent)' : 'var(--text-3)',
        border: active
          ? '1px solid var(--accent)'
          : '0.5px solid var(--glass-border)',
        cursor: 'pointer',
        transition: 'all .2s var(--ease-apple)',
        whiteSpace: 'nowrap',
        backdropFilter: active ? undefined : 'var(--glass-blur)',
        WebkitBackdropFilter: active ? undefined : 'var(--glass-blur)',
      }}
      data-filter={filter}
    >
      {label}
    </button>
  )
}
