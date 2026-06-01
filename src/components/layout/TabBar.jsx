import useAppStore, { TABS } from '../../stores/useAppStore'

export default function TabBar() {
  const activeTab = useAppStore(s => s.activeTab)
  const setActiveTab = useAppStore(s => s.setActiveTab)

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 64,
        background: 'var(--glass)',
        backdropFilter: 'var(--glass-blur-heavy)',
        WebkitBackdropFilter: 'var(--glass-blur-heavy)',
        borderTop: '0.5px solid var(--glass-border)',
        paddingBottom: 'env(safe-area-inset-bottom, 0)',
        flexShrink: 0,
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
              padding: '4px 0',
              flex: 1,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              transition: 'all .2s var(--ease-apple)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                width: 26,
                height: 3,
                background: isActive ? 'var(--accent)' : 'transparent',
                borderRadius: '0 0 3px 3px',
                transition: 'all .25s var(--ease-apple)',
                boxShadow: isActive ? '0 0 12px var(--accent-glow)' : 'none',
              }}
            />
            <span style={{
              fontSize: 20,
              lineHeight: 1,
              opacity: isActive ? 1 : 0.5,
              transform: isActive ? 'scale(1.1)' : 'scale(1)',
              transition: 'all .2s var(--ease-apple)',
            }}>
              {tab.icon}
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: isActive ? 600 : 500,
                color: isActive ? 'var(--accent)' : 'var(--text-3)',
                transition: 'color .2s var(--ease-apple)',
              }}
            >
              {tab.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
