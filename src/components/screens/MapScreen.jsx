import { useState, useEffect, useMemo } from 'react'
import useAppStore from '../../stores/useAppStore'
import useLikes from '../../hooks/useLikes'
import LeafletMap from '../map/LeafletMap'
import AnimalMarker from '../map/AnimalMarker'
import LayerSwitcher from '../map/LayerSwitcher'
import ChangelogModal from '../map/ChangelogModal'

export default function MapScreen({ sightings, userId }) {
  const mapCenter = useAppStore(s => s.mapCenter)
  const [mapLayer, setMapLayer] = useState('satellite')
  const [showChangelog, setShowChangelog] = useState(false)
  const { likesData, loadLikes, toggleLike, loadLikers } = useLikes(userId)

  const sightingIds = useMemo(() => sightings?.map(s => s.id) || [], [sightings])

  useEffect(() => {
    if (sightingIds.length) loadLikes(sightingIds)
  }, [sightingIds, loadLikes])

  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <LayerSwitcher active={mapLayer} onChange={setMapLayer} />

      <button
        onClick={() => setShowChangelog(v => !v)}
        style={{
          position: 'absolute',
          top: 12,
          right: 122,
          zIndex: 1000,
          width: 36,
          height: 36,
          borderRadius: 999,
          background: showChangelog ? 'rgba(196, 68, 57, 0.25)' : 'rgba(6, 13, 7, 0.82)',
          backdropFilter: 'blur(50px) saturate(1.8)',
          WebkitBackdropFilter: 'blur(50px) saturate(1.8)',
          border: showChangelog ? '0.5px solid rgba(196, 68, 57, 0.3)' : '0.5px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
          color: showChangelog ? 'var(--coral)' : 'var(--text-2)',
          fontSize: 16,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all .2s',
        }}
      >
        🔔
      </button>

      {showChangelog && <ChangelogModal onClose={() => setShowChangelog(false)} />}

      <LeafletMap center={mapCenter} layer={mapLayer}>
        {sightings?.map(s => (
          <AnimalMarker
            key={s.id}
            sighting={s}
            likeCount={likesData[s.id]?.count ?? 0}
            userLiked={likesData[s.id]?.liked ?? false}
            onToggleLike={toggleLike}
            onLoadLikers={loadLikers}
          />
        ))}
      </LeafletMap>
    </div>
  )
}
