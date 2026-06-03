import { useState, useRef, useCallback, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) { onMapClick(e.latlng) },
  })
  return null
}

function FlyTo({ center }) {
  const map = useMap()
  useEffect(() => {
    if (center) map.flyTo(center, map.getZoom(), { duration: 0.6 })
  }, [center])
  return null
}

function DraggableMarker({ position, onDragEnd }) {
  const markerRef = useRef(null)

  const handleDragEnd = () => {
    const marker = markerRef.current
    if (marker) {
      const pos = marker.getLatLng()
      onDragEnd({ lat: pos.lat, lng: pos.lng })
    }
  }

  return (
    <Marker
      position={position}
      draggable={true}
      ref={markerRef}
      eventHandlers={{ dragend: handleDragEnd }}
    />
  )
}

export default function LocationPicker({ initialCoords, onConfirm, onClose }) {
  const [markerPos, setMarkerPos] = useState(initialCoords || null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [address, setAddress] = useState('')
  const [searching, setSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [flyTo, setFlyTo] = useState(null)
  const searchTimeout = useRef(null)
  const inputRef = useRef(null)

  const defaultCenter = { lat: -22.0, lng: -44.7 }
  const mapCenter = markerPos || initialCoords || defaultCenter

  const doReverseGeocode = useCallback(async (lat, lng) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=pt`
      )
      const data = await res.json()
      if (data.display_name) setAddress(data.display_name)
    } catch {}
  }, [])

  const handleSearchInput = (q) => {
    setSearchQuery(q)
    clearTimeout(searchTimeout.current)
    if (!q.trim()) { setSearchResults([]); setShowResults(false); return }
    searchTimeout.current = setTimeout(async () => {
      setSearching(true)
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=5&accept-language=pt`
        )
        const data = await res.json()
        setSearchResults(data)
        setShowResults(true)
      } catch {} finally { setSearching(false) }
    }, 400)
  }

  const handleSelectResult = (result) => {
    const pos = { lat: parseFloat(result.lat), lng: parseFloat(result.lon) }
    setMarkerPos(pos)
    setFlyTo(pos)
    setAddress(result.display_name || '')
    setShowResults(false)
    setSearchQuery(result.display_name.split(',')[0])
  }

  const handleMapClick = async (latlng) => {
    setMarkerPos(latlng)
    setAddress('')
    doReverseGeocode(latlng.lat, latlng.lng)
  }

  const handleMarkerDragEnd = async (pos) => {
    setMarkerPos(pos)
    setAddress('')
    doReverseGeocode(pos.lat, pos.lng)
  }

  const handleMyLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const p = { lat: pos.coords.latitude, lng: pos.coords.longitude }
        setMarkerPos(p)
        setFlyTo(p)
        setAddress('')
        doReverseGeocode(p.lat, p.lng)
      },
      () => {},
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 20000,
      display: 'flex',
      flexDirection: 'column',
      background: '#060D07',
      animation: 'fadeIn .2s ease-out',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '12px 16px',
        paddingTop: 'calc(env(safe-area-inset-top, 0px) + 12px)',
        borderBottom: '0.5px solid var(--glass-border)',
        flexShrink: 0,
      }}>
        <button
          onClick={onClose}
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'var(--glass)',
            backdropFilter: 'var(--glass-blur)',
            WebkitBackdropFilter: 'var(--glass-blur)',
            border: '0.5px solid var(--glass-border)',
            color: 'var(--text-2)',
            fontSize: 16,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          ←
        </button>
        <span style={{
          flex: 1,
          fontSize: 16,
          fontWeight: 600,
          color: 'var(--text-1)',
          textAlign: 'center',
        }}>
          Escolher local
        </span>
        <div style={{ width: 36 }} />
      </div>

      <div style={{ padding: '8px 16px', position: 'relative', flexShrink: 0 }}>
        <input
          ref={inputRef}
          value={searchQuery}
          onChange={e => handleSearchInput(e.target.value)}
          placeholder="🔍 Buscar lugar (ex: Itatiaia, Visconde de Mauá...)"
          onFocus={() => searchResults.length > 0 && setShowResults(true)}
          style={{
            width: '100%',
            padding: '12px 14px',
            borderRadius: 'var(--r-md)',
            background: 'var(--glass)',
            backdropFilter: 'var(--glass-blur)',
            WebkitBackdropFilter: 'var(--glass-blur)',
            border: '0.5px solid var(--glass-border)',
            color: 'var(--text-1)',
            fontSize: 14,
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />

        {showResults && searchResults.length > 0 && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 16,
            right: 16,
            background: 'var(--glass-strong)',
            backdropFilter: 'var(--glass-blur-ultra)',
            WebkitBackdropFilter: 'var(--glass-blur-ultra)',
            borderRadius: 'var(--r-md)',
            border: '0.5px solid var(--glass-border)',
            boxShadow: 'var(--shadow-xl)',
            zIndex: 10,
            maxHeight: 200,
            overflowY: 'auto',
          }}>
            {searchResults.map((r, i) => (
              <div
                key={i}
                onClick={() => handleSelectResult(r)}
                style={{
                  padding: '10px 14px',
                  fontSize: 13,
                  color: 'var(--text-1)',
                  cursor: 'pointer',
                  borderBottom: i < searchResults.length - 1 ? '0.5px solid var(--glass-border)' : 'none',
                  transition: 'background .15s',
                }}
              >
                {r.display_name}
              </div>
            ))}
          </div>
        )}

        {searching && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 16,
            right: 16,
            padding: '10px 14px',
            fontSize: 12,
            color: 'var(--text-3)',
          }}>
            Buscando...
          </div>
        )}
      </div>

      <div style={{ flex: 1, position: 'relative' }}>
        <MapContainer
          center={mapCenter}
          zoom={11}
          style={{ width: '100%', height: '100%' }}
          zoomControl={false}
        >
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="ESRI"
          />
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
            attribution="ESRI"
            transparent
          />
          <MapClickHandler onMapClick={handleMapClick} />
          <FlyTo center={flyTo} />
          {markerPos && (
            <DraggableMarker position={markerPos} onDragEnd={handleMarkerDragEnd} />
          )}
        </MapContainer>

        <button
          onClick={handleMyLocation}
          style={{
            position: 'absolute',
            bottom: 20,
            right: 16,
            zIndex: 1000,
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: 'var(--glass-strong)',
            backdropFilter: 'var(--glass-blur-heavy)',
            WebkitBackdropFilter: 'var(--glass-blur-heavy)',
            border: '0.5px solid var(--glass-border-light)',
            color: 'var(--accent)',
            fontSize: 20,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-lg)',
          }}
          title="Minha localização"
        >
          📍
        </button>
      </div>

      <div style={{
        padding: '12px 16px',
        paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 12px)',
        borderTop: '0.5px solid var(--glass-border)',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        flexShrink: 0,
      }}>
        {markerPos ? (
          <div style={{
            padding: '10px 14px',
            background: 'var(--glass)',
            backdropFilter: 'var(--glass-blur)',
            WebkitBackdropFilter: 'var(--glass-blur)',
            borderRadius: 'var(--r-md)',
            border: '0.5px solid var(--glass-border)',
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)' }}>
              📍 {markerPos.lat.toFixed(4)}, {markerPos.lng.toFixed(4)}
            </div>
            {address && (
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2, lineHeight: 1.4 }}>
                {address}
              </div>
            )}
          </div>
        ) : (
          <div style={{
            padding: '10px 14px',
            fontSize: 13,
            color: 'var(--text-3)',
            textAlign: 'center',
          }}>
            Toque no mapa para marcar a localização
          </div>
        )}

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: 'var(--r-md)',
              background: 'var(--glass)',
              backdropFilter: 'var(--glass-blur)',
              WebkitBackdropFilter: 'var(--glass-blur)',
              border: '0.5px solid var(--glass-border)',
              color: 'var(--text-2)',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all .2s',
            }}
          >
            Cancelar
          </button>
          <button
            onClick={() => onConfirm({ lat: markerPos.lat, lng: markerPos.lng, address })}
            disabled={!markerPos}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: 'var(--r-md)',
              background: 'var(--accent)',
              border: 'none',
              color: '#060D07',
              fontSize: 14,
              fontWeight: 600,
              cursor: markerPos ? 'pointer' : 'not-allowed',
              opacity: markerPos ? 1 : 0.5,
              transition: 'all .2s',
            }}
          >
            ✅ Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}
