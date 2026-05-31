export default function ProgressBar({ current, max, showDot = true }) {
  const pct = max > 0 ? Math.min((current / max) * 100, 100) : 0

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 4,
        background: 'var(--bg-void)',
        borderRadius: 3,
        overflow: 'visible',
      }}
    >
      <div
        style={{
          width: `${pct}%`,
          height: '100%',
          borderRadius: 3,
          background: 'linear-gradient(90deg, #27A058, var(--accent))',
          transition: 'width .4s ease',
        }}
      />
      {showDot && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: `${pct}%`,
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: 'var(--accent)',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 6px var(--accent)',
          }}
        />
      )}
    </div>
  )
}
