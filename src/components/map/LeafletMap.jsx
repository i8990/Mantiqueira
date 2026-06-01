import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export default function LeafletMap({ center, children, whenReady }) {
  return (
    <MapContainer
      center={center}
      zoom={12}
      zoomControl={false}
      style={{ width: '100%', height: '100%' }}
      whenReady={whenReady}
    >
      <ZoomControl position="bottomright" />
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; CARTO'
      />
      {children}
    </MapContainer>
  )
}
