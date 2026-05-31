import { useRef, useEffect, lazy, Suspense } from 'react'
import useAppStore from '../../stores/useAppStore'
import Button from '../ui/Button'

const LeafletMap = lazy(() => import('../map/LeafletMap'))
const AnimalMarker = lazy(() => import('../map/AnimalMarker'))

export default function MapScreen({ sightings, seenIds }) {
  const mapRef = useRef(null)
  const mapCenter = useAppStore(s => s.mapCenter)
  const setActiveTab = useAppStore(s => s.setActiveTab)

  useEffect(() => {
    if (mapRef.current) {
      setTimeout(() => {
        mapRef.current.invalidateSize()
      }, 50)
    }
  }, [])

  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <div style={{
        position: 'absolute',
        top: 12,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        background: 'rgba(6,13,7,.85)',
        padding: '6px 16px',
        borderRadius: 999,
        fontSize: 12,
        color: 'var(--text-2)',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        backdropFilter: 'blur(4px)',
      }}>
        <span style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: 'var(--accent)',
          animation: 'legendPulse 2.4s ease-in-out infinite',
        }} />
        PESP · Serra do Papagaio · Aiuruoca
      </div>

      <Suspense fallback={<div style={{ height: '100%', background: 'var(--bg-deep)' }} />}>
        <LeafletMap
          center={mapCenter}
          whenReady={({ target }) => { mapRef.current = target }}
        >
          {sightings?.map(s => (
            <AnimalMarker
              key={s.id}
              sighting={s}
              isSeen={seenIds?.has(s.animal_id)}
            />
          ))}
        </LeafletMap>
      </Suspense>

      <div style={{
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
      }}>
        <Button
          leftIcon="📍"
          onClick={() => setActiveTab('registrar')}
        >
          Registrar encontro
        </Button>
      </div>
    </div>
  )
}
