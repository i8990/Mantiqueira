import useAppStore from '../../stores/useAppStore'
import TabBar from './TabBar'

const screenStyles = (isActive) => ({
  position: 'absolute',
  inset: 0,
  overflowY: 'auto',
  overflowX: 'hidden',
  opacity: isActive ? 1 : 0,
  pointerEvents: isActive ? 'auto' : 'none',
  transform: isActive ? 'translateX(0)' : 'translateX(24px)',
  transition: `opacity .35s var(--ease-apple), transform .35s var(--ease-apple)`,
})

export default function AppShell({ screens, profile, sightings, seenIds, rankData, createSighting, refreshSightings }) {
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
          background: 'var(--glass)',
          backdropFilter: 'var(--glass-blur)',
          WebkitBackdropFilter: 'var(--glass-blur)',
          borderBottom: '0.5px solid var(--glass-border)',
          letterSpacing: '0.03em',
        }}
      >
        🌿 Guardião da Mantiqueira
      </div>

      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', overscrollBehavior: 'none', paddingBottom: 80 }}>
        {screens.map((Screen, i) => {
          const tabKey = ['mapa', 'registrar', 'guia', 'perfil'][i]
          return (
            <div key={tabKey} style={{...screenStyles(activeTab === tabKey), WebkitOverflowScrolling: 'touch'}}>
              <Screen
                profile={profile}
                sightings={sightings}
                seenIds={seenIds}
                rankData={rankData}
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
