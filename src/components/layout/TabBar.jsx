import useAppStore, { TABS } from '../../stores/useAppStore'

export default function TabBar() {
  const activeTab = useAppStore(s => s.activeTab)
  const setActiveTab = useAppStore(s => s.setActiveTab)

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
        paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 16px)',
      }}
    >
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          padding: '6px 8px',
          borderRadius: 28,
          background: 'rgba(6, 13, 7, 0.75)',
          backdropFilter: 'blur(30px) saturate(1.6)',
          WebkitBackdropFilter: 'blur(30px) saturate(1.6)',
          border: '0.5px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.3)',
          pointerEvents: 'auto',
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
                gap: 1,
                padding: '8px 14px',
                borderRadius: 20,
                background: isActive ? 'rgba(60, 232, 122, 0.15)' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.25s cubic-bezier(0.25, 0.1, 0.25, 1)',
                minWidth: 52,
              }}
            >
              <span style={{
                fontSize: 20,
                lineHeight: 1,
                opacity: isActive ? 1 : 0.6,
                transform: isActive ? 'scale(1.1)' : 'scale(1)',
                transition: 'all 0.25s cubic-bezier(0.25, 0.1, 0.25, 1)',
              }}>
                {tab.icon}
              </span>
              <span
                style={{
                  fontSize: 9,
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--accent)' : 'rgba(220, 240, 226, 0.5)',
                  letterSpacing: '0.02em',
                  transition: 'color 0.2s',
                }}
              >
                {tab.label}
              </span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
