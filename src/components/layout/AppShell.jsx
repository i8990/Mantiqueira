import useAppStore from '../../stores/useAppStore'
import TabBar from './TabBar'

const screenStyles = (isActive) => ({
  position: 'absolute',
  inset: 0,
  overflowY: 'auto',
  opacity: isActive ? 1 : 0,
  pointerEvents: isActive ? 'auto' : 'none',
  transform: isActive ? 'translateX(0)' : 'translateX(24px)',
  transition: 'opacity .25s, transform .25s',
})

export default function AppShell({ screens, profile, sightings, seenIds, rankData, createSighting }) {
  const activeTab = useAppStore(s => s.activeTab)

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg-deep)',
      }}
    >
      <div
        style={{
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12,
          fontWeight: 500,
          color: 'var(--text-3)',
          flexShrink: 0,
          paddingTop: 'env(safe-area-inset-top, 0)',
        }}
      >
        📡 Guardião da Mantiqueira
      </div>

      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {screens.map((Screen, i) => {
          const tabKey = ['mapa', 'registrar', 'colecao', 'curiosidades', 'perfil'][i]
          return (
            <div key={tabKey} style={screenStyles(activeTab === tabKey)}>
              <Screen
                profile={profile}
                sightings={sightings}
                seenIds={seenIds}
                rankData={rankData}
                createSighting={createSighting}
              />
            </div>
          )
        })}
      </div>

      <TabBar />
    </div>
  )
}
