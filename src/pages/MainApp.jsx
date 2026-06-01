import { lazy, Suspense, useMemo, useCallback } from 'react'
import useProfile from '../hooks/useProfile'
import useSightings, { useAllSightings } from '../hooks/useSightings'
import useCollection from '../hooks/useCollection'
import AppShell from '../components/layout/AppShell'

const MapScreen = lazy(() => import('../components/screens/MapScreen'))
const RegisterScreen = lazy(() => import('../components/screens/RegisterScreen'))
const GuideScreen = lazy(() => import('../components/screens/GuideScreen'))
const ProfileScreen = lazy(() => import('../components/screens/ProfileScreen'))

function ScreenFallback() {
  return (
    <div style={{
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-deep)',
    }}>
      <span style={{ fontSize: 36 }}>🌿</span>
    </div>
  )
}

export default function MainApp({ session }) {
  const userId = session.user.id
  const { profile, loading: profileLoading } = useProfile(userId)
  const { sightings: mySightings, loading: sightingsLoading, createSighting, refresh: refreshMySightings } = useSightings(userId)
  const { sightings: allSightings, loading: allLoading, refresh: refreshAllSightings } = useAllSightings()
  const { seenIds, loading: collectionLoading } = useCollection(userId)

  const refreshSightings = useCallback(() => {
    refreshMySightings()
    refreshAllSightings()
  }, [refreshMySightings, refreshAllSightings])

  const screens = useMemo(() => [
    () => (
      <Suspense fallback={<ScreenFallback />}>
        <MapScreen sightings={allSightings} seenIds={seenIds} />
      </Suspense>
    ),
    () => (
      <Suspense fallback={<ScreenFallback />}>
        <RegisterScreen createSighting={createSighting} refreshSightings={refreshSightings} />
      </Suspense>
    ),
    () => (
      <Suspense fallback={<ScreenFallback />}>
        <GuideScreen />
      </Suspense>
    ),
    () => (
      <Suspense fallback={<ScreenFallback />}>
        <ProfileScreen profile={profile} sightings={mySightings} seenIds={seenIds} />
      </Suspense>
    ),
  ], [allSightings, seenIds, createSighting, refreshSightings, profile, mySightings])

  const loading = profileLoading || sightingsLoading || allLoading || collectionLoading

  return (
    <div style={{ height: '100%', position: 'relative' }}>
      {loading && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--bg-deep)',
        }}>
          <span style={{ fontSize: 36 }}>🌿</span>
        </div>
      )}
      <div style={{ height: '100%', visibility: loading ? 'hidden' : 'visible' }}>
        <AppShell
          screens={screens}
          profile={profile}
          sightings={mySightings}
          seenIds={seenIds}
          createSighting={createSighting}
          refreshSightings={refreshSightings}
        />
      </div>
    </div>
  )
}
