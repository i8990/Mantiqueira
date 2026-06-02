import useAppStore from '../../stores/useAppStore'
import TabBar from './TabBar'

const screenStyles = (isActive) => ({
  position: 'absolute',
  inset: 0,
  overflowY: 'auto',
  overflowX: 'hidden',
  opacity: isActive ? 1 : 0,
  pointerEvents: isActive ? 'auto' : 'none',
  transform: isActive ? 'translateX(0) scale(1)' : 'translateX(30px) scale(0.97)',
  transition: `opacity .4s var(--ease-spring), transform .4s var(--ease-spring)`,
  willChange: 'transform, opacity',
})

export default function AppShell({ screens, profile, sightings, seenIds, createSighting, refreshSightings }) {
  const activeTab = useAppStore(s => s.activeTab)

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg-deep)',
        position: 'relative',
      }}
    >
      <div
        style={{
          height: 'calc(44px + env(safe-area-inset-top, 0px))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12,
          fontWeight: 500,
          color: 'var(--text-3)',
          flexShrink: 0,
          background: 'var(--glass-strong)',
          backdropFilter: 'var(--glass-blur-ultra)',
          WebkitBackdropFilter: 'var(--glass-blur-ultra)',
          borderBottom: '0.5px solid var(--glass-border-light)',
          letterSpacing: '0.03em',
          zIndex: 100,
        }}
      >
        🐾 MataGo
      </div>

      <div style={{
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
        overscrollBehavior: 'none',
        paddingBottom: 'var(--tab-bar-height)',
      }}>
        {screens.map((Screen, i) => {
          const tabKey = ['mapa', 'registrar', 'guia', 'perfil'][i]
          return (
            <div key={tabKey} style={{...screenStyles(activeTab === tabKey), WebkitOverflowScrolling: 'touch'}}>
              <Screen
                profile={profile}
                sightings={sightings}
                seenIds={seenIds}
                createSighting={createSighting}
                refreshSightings={refreshSightings}
              />
            </div>
          )
        })}
      </div>

      <TabBar />
    </div>
  )
}
