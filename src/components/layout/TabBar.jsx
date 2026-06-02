import useAppStore, { TABS } from '../../stores/useAppStore'

export default function TabBar() {
  const activeTab = useAppStore(s => s.activeTab)
  const setActiveTab = useAppStore(s => s.setActiveTab)
  const theme = useAppStore(s => s.theme)

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
        paddingBottom: 4,
        zIndex: 200,
      }}
    >
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          padding: '6px 8px',
          borderRadius: 32,
          background: theme === 'light' ? 'rgba(248, 243, 233, 0.92)' : 'rgba(6, 13, 7, 0.82)',
          backdropFilter: 'blur(50px) saturate(1.8)',
          WebkitBackdropFilter: 'blur(50px) saturate(1.8)',
          border: theme === 'light' ? '0.5px solid rgba(0, 0, 0, 0.08)' : '0.5px solid rgba(255, 255, 255, 0.08)',
          boxShadow: theme === 'light' ? '0 4px 20px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06)' : '0 8px 32px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.3)',
          pointerEvents: 'auto',
          minHeight: 56,
        }}
      >
        {TABS.map(tab => {
          const isActive = activeTab === tab.key
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                padding: '8px 16px',
                borderRadius: 22,
                background: isActive
                  ? 'var(--accent-dim)'
                  : 'transparent',
                border: isActive
                  ? theme === 'light'
                    ? '0.5px solid rgba(139, 94, 60, 0.25)'
                    : '0.5px solid rgba(60, 232, 122, 0.25)'
                  : 'none',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.3s var(--ease-spring)',
                minWidth: 56,
              }}
            >
              <span style={{
                fontSize: 20,
                lineHeight: 1,
                opacity: isActive ? 1 : 0.55,
                transform: isActive ? 'scale(1.15)' : 'scale(1)',
                transition: 'all 0.3s var(--ease-spring)',
                filter: isActive ? 'none' : 'grayscale(0.5)',
              }}>
                {tab.icon}
              </span>
              <span
                style={{
                  fontSize: 9,
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--accent)' : theme === 'light' ? 'rgba(0,0,0,0.35)' : 'rgba(220, 240, 226, 0.45)',
                  letterSpacing: '0.03em',
                  transition: 'color 0.3s var(--ease-spring)',
                }}
              >
                {tab.label}
              </span>
              {isActive && (
                <span style={{
                  position: 'absolute',
                  top: -1,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 16,
                  height: 2.5,
                  borderRadius: 2,
                  background: 'var(--accent)',
                  boxShadow: '0 0 8px var(--accent-glow)',
                }} />
              )}
            </button>
          )
        })}
      </nav>
    </div>
  )
}
