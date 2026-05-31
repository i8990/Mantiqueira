export default function RarityChip({ label, filter, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '6px 14px',
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 500,
        background: active ? 'var(--accent-dim)' : 'var(--bg-card)',
        color: active ? 'var(--accent)' : 'var(--text-3)',
        border: active
          ? '1px solid var(--accent)'
          : '1px solid var(--border)',
        cursor: 'pointer',
        transition: 'all .15s',
        whiteSpace: 'nowrap',
      }}
      data-filter={filter}
    >
      {label}
    </button>
  )
}
