import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, ZoomControl, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { LAYERS } from './LayerSwitcher'
import UserLocation from './UserLocation'

function ChangeView({ center }) {
  const map = useMap()
  const prev = useRef(center)

  useEffect(() => {
    if (prev.current[0] !== center[0] || prev.current[1] !== center[1]) {
      map.flyTo(center, map.getZoom(), { duration: 0.6 })
      prev.current = center
    }
  }, [center, map])

  return null
}

export default function LeafletMap({ center, children, whenReady, layer }) {
  const active = LAYERS.find(l => l.key === layer) || LAYERS[0]

  return (
    <MapContainer
      center={center}
      zoom={12}
      zoomControl={false}
      style={{ width: '100%', height: '100%' }}
      whenReady={whenReady}
    >
      <ZoomControl position="bottomright" />
      {active.tiles.map((t, i) => (
        <TileLayer key={`t${i}`} url={t.url} attribution={t.attribution} />
      ))}
      {active.overlays?.map((o, i) => (
        <TileLayer key={`o${i}`} url={o.url} attribution={o.attribution} transparent />
      ))}
      <ChangeView center={center} />
      <UserLocation />
      {children}
    </MapContainer>
  )
}
