import { useState, useEffect, useMemo } from 'react'
import useAppStore from '../../stores/useAppStore'
import useLikes from '../../hooks/useLikes'
import LeafletMap from '../map/LeafletMap'
import AnimalMarker from '../map/AnimalMarker'
import LayerSwitcher from '../map/LayerSwitcher'

export default function MapScreen({ sightings, userId }) {
  const mapCenter = useAppStore(s => s.mapCenter)
  const [mapLayer, setMapLayer] = useState('satellite')
  const { likesData, loadLikes, toggleLike, loadLikers } = useLikes(userId)

  const sightingIds = useMemo(() => sightings?.map(s => s.id) || [], [sightings])

  useEffect(() => {
    if (sightingIds.length) loadLikes(sightingIds)
  }, [sightingIds, loadLikes])

  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <LayerSwitcher active={mapLayer} onChange={setMapLayer} />

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
