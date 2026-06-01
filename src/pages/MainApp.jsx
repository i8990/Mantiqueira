import { lazy, Suspense } from 'react'
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

  if (profileLoading || sightingsLoading || allLoading || collectionLoading) {
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

  const refreshSightings = () => {
    refreshMySightings()
    refreshAllSightings()
  }

  const screens = [
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
  ]

  return (
    <AppShell
      screens={screens}
      profile={profile}
      sightings={mySightings}
      seenIds={seenIds}
      createSighting={createSighting}
      refreshSightings={refreshSightings}
    />
  )
}
