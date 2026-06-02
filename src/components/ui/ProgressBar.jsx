export default function ProgressBar({ current, max, showDot = true }) {
  const pct = max > 0 ? Math.min((current / max) * 100, 100) : 0

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 5,
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
          transition: 'width .5s var(--ease-spring)',
          boxShadow: '0 0 8px var(--accent-glow)',
        }}
      />
      {showDot && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: `${pct}%`,
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'var(--accent)',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 8px var(--accent)',
            transition: 'left .5s var(--ease-spring)',
          }}
        />
      )}
    </div>
  )
}
