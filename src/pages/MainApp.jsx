import { lazy, Suspense } from 'react'
import useProfile from '../hooks/useProfile'
import useSightings from '../hooks/useSightings'
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
  const { sightings, loading: sightingsLoading, createSighting } = useSightings(userId)
  const { seenIds, loading: collectionLoading } = useCollection(userId)

  if (profileLoading || sightingsLoading || collectionLoading) {
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

  const screens = [
    () => (
      <Suspense fallback={<ScreenFallback />}>
        <MapScreen sightings={sightings} seenIds={seenIds} />
      </Suspense>
    ),
    () => (
      <Suspense fallback={<ScreenFallback />}>
        <RegisterScreen createSighting={createSighting} />
      </Suspense>
    ),
    () => (
      <Suspense fallback={<ScreenFallback />}>
        <GuideScreen />
      </Suspense>
    ),
    () => (
      <Suspense fallback={<ScreenFallback />}>
        <ProfileScreen profile={profile} sightings={sightings} seenIds={seenIds} />
      </Suspense>
    ),
  ]

  return (
    <AppShell
      screens={screens}
      profile={profile}
      sightings={sightings}
      seenIds={seenIds}
      createSighting={createSighting}
    />
  )
}
