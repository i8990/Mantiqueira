import { lazy, Suspense, useRef, useCallback } from 'react'
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
  const { sightings: mySightings, loading: sightingsLoading, createSighting, deleteSighting, refresh: refreshMySightings } = useSightings(userId)
  const { sightings: allSightings, loading: allLoading, refresh: refreshAllSightings } = useAllSightings()
  const { seenIds, loading: collectionLoading } = useCollection(userId)

  const refreshSightings = useCallback(() => {
    refreshMySightings()
    refreshAllSightings()
  }, [refreshMySightings, refreshAllSightings])

  const latestRef = useRef({ allSightings, seenIds, createSighting, deleteSighting, refreshSightings, profile, mySightings })
  latestRef.current = { allSightings, seenIds, createSighting, deleteSighting, refreshSightings, profile, mySightings }

  const screens = useRef([
    () => {
      const p = latestRef.current
      return (
        <Suspense fallback={<ScreenFallback />}>
          <MapScreen sightings={p.allSightings} userId={userId} />
        </Suspense>
      )
    },
    () => {
      const p = latestRef.current
      return (
        <Suspense fallback={<ScreenFallback />}>
          <RegisterScreen createSighting={p.createSighting} refreshSightings={p.refreshSightings} />
        </Suspense>
      )
    },
    () => (
      <Suspense fallback={<ScreenFallback />}>
        <GuideScreen />
      </Suspense>
    ),
    () => {
      const p = latestRef.current
      return (
        <Suspense fallback={<ScreenFallback />}>
          <ProfileScreen profile={p.profile} sightings={p.mySightings} seenIds={p.seenIds} deleteSighting={p.deleteSighting} userId={userId} />
        </Suspense>
      )
    },
  ]).current

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
