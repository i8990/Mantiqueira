import useAppStore from '../../stores/useAppStore'
import Button from '../ui/Button'
import LeafletMap from '../map/LeafletMap'
import AnimalMarker from '../map/AnimalMarker'

export default function MapScreen({ sightings, seenIds }) {
  const mapCenter = useAppStore(s => s.mapCenter)
  const setActiveTab = useAppStore(s => s.setActiveTab)

  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <div style={{
        position: 'absolute',
        top: 12,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        background: 'var(--glass-strong)',
        backdropFilter: 'var(--glass-blur-ultra)',
        WebkitBackdropFilter: 'var(--glass-blur-ultra)',
        padding: '8px 20px',
        borderRadius: 999,
        fontSize: 12,
        color: 'var(--text-2)',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        border: '0.5px solid var(--glass-border-light)',
        boxShadow: 'var(--shadow-glass)',
        animation: 'fadeUp .4s var(--ease-spring)',
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

      <LeafletMap center={mapCenter}>
        {sightings?.map(s => (
          <AnimalMarker
            key={s.id}
            sighting={s}
            isSeen={seenIds?.has(s.animal_id)}
          />
        ))}
      </LeafletMap>

      <div style={{
        position: 'absolute',
        bottom: 'calc(12px + env(safe-area-inset-bottom, 0px))',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        animation: 'fadeUpSpring .5s var(--ease-spring)',
      }}>
        <Button
          variant="glass"
          leftIcon="📍"
          onClick={() => setActiveTab('registrar')}
          style={{
            backdropFilter: 'var(--glass-blur-ultra)',
            WebkitBackdropFilter: 'var(--glass-blur-ultra)',
            boxShadow: 'var(--shadow-xl)',
            border: '0.5px solid var(--glass-border-light)',
            padding: '14px 28px',
            borderRadius: 'var(--r-xl)',
            background: 'var(--glass-strong)',
          }}
        >
          Registrar encontro
        </Button>
      </div>
    </div>
  )
}
