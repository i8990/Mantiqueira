import { useEffect } from 'react'
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

function Toast() {
  const toast = useAppStore(s => s.toast)
  const clearToast = useAppStore(s => s.clearToast)

  useEffect(() => {
    if (toast) {
      const t = setTimeout(clearToast, 1000)
      return () => clearTimeout(t)
    }
  }, [toast, clearToast])

  if (!toast) return null

  return (
    <div
      key={toast.key}
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10000,
        padding: '16px 32px',
        borderRadius: 'var(--r-md)',
        background: 'rgba(60, 232, 122, 0.18)',
        backdropFilter: 'blur(28px) saturate(2.2)',
        WebkitBackdropFilter: 'blur(28px) saturate(2.2)',
        border: '0.5px solid rgba(60, 232, 122, 0.35)',
        color: 'var(--accent)',
        fontWeight: 700,
        fontSize: 18,
        letterSpacing: '0.04em',
        boxShadow: '0 8px 40px rgba(0,0,0,0.5), inset 0 0 60px rgba(60, 232, 122, 0.06)',
        animation: 'fadeUp .25s var(--ease-spring)',
        pointerEvents: 'none',
      }}
    >
      {toast.message}
    </div>
  )
}

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
        paddingTop: 'env(safe-area-inset-top, 0px)',
      }}
    >
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
      <Toast />
    </div>
  )
}
