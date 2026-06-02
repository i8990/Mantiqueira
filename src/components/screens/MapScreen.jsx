import { useState } from 'react'
import useAppStore from '../../stores/useAppStore'
import LeafletMap from '../map/LeafletMap'
import AnimalMarker from '../map/AnimalMarker'
import LayerSwitcher from '../map/LayerSwitcher'

export default function MapScreen({ sightings }) {
  const mapCenter = useAppStore(s => s.mapCenter)
  const [mapLayer, setMapLayer] = useState('satellite')

  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <LayerSwitcher active={mapLayer} onChange={setMapLayer} />

      <LeafletMap center={mapCenter} layer={mapLayer}>
        {sightings?.map(s => (
          <AnimalMarker
            key={s.id}
            sighting={s}
          />
        ))}
      </LeafletMap>
    </div>
  )
}
