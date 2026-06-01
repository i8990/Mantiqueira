import { useMemo, useState } from 'react'
import { Marker, Popup, Circle } from 'react-leaflet'
import L from 'leaflet'
import { ANIMALS, TIER_COLORS } from '../../lib/constants'

const JITTER_RADIUS = 100

function hashSeed(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h) + str.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h)
}

function jitterPosition(lat, lng, seed) {
  const rng = (n) => { const x = Math.sin(n * 9301 + 49297) * 233280; return x - Math.floor(x) }
  const angle = rng(seed) * Math.PI * 2
  const dist = rng(seed + 1) * JITTER_RADIUS
  const dlat = dist / 111111
  const dlng = dist / (111111 * Math.cos(lat * Math.PI / 180))
  return [lat + dlat * Math.sin(angle), lng + dlng * Math.cos(angle)]
}

function createIcon(animal, isSeen) {
  const tierColor = animal ? TIER_COLORS[animal.tier] : 'var(--text-3)'
  const size = animal?.tier === 'L' ? 42 : 34
  const html = `
    <div style="
      display:flex;align-items:center;justify-content:center;
      width:${size}px;height:${size}px;
      border-radius:50%;
      background:rgba(6,13,7,.88);
      border:2px solid ${tierColor};
      font-size:${size * 0.5}px;
      box-shadow:${animal?.tier === 'L' ? `0 0 14px ${tierColor}` : '0 2px 6px rgba(0,0,0,.5)'};
      ${animal?.tier === 'L' ? 'animation:legendPulse 2.4s ease-in-out infinite;' : ''}
    ">${isSeen ? animal.emoji : '?'}</div>
  `
  return L.divIcon({ html, className: '', iconSize: [size, size], iconAnchor: [size / 2, size / 2] })
}

export default function AnimalMarker({ sighting, isSeen }) {
  const [showRadius, setShowRadius] = useState(false)
  const animal = ANIMALS.find(a => a.id === sighting.animal_id)
  const creator = sighting.profiles
  if (!sighting.lat || !sighting.lng) return null

  const seed = hashSeed(sighting.id)
  const pos = useMemo(() => jitterPosition(sighting.lat, sighting.lng, seed), [sighting.lat, sighting.lng, seed])

  return (
    <>
      <Marker
        position={pos}
        icon={createIcon(animal, isSeen)}
        eventHandlers={{ click: () => setShowRadius(true), popupclose: () => setShowRadius(false) }}
      >
        <Popup>
          <div style={{ textAlign: 'center', minWidth: 120 }}>
            <div style={{ fontSize: 28 }}>{animal?.emoji || '❓'}</div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>{animal?.name || 'Desconhecido'}</div>
            <div style={{ fontSize: 12, color: '#666', fontStyle: 'italic' }}>{animal?.sci || ''}</div>
            {creator && (
              <div style={{
                fontSize: 11,
                color: '#888',
                marginTop: 6,
                padding: '4px 8px',
                borderRadius: 999,
                background: 'rgba(0,0,0,.05)',
                display: 'inline-block',
              }}>
                {creator.avatar_emoji || '🧭'} @{creator.username || 'matago'}
              </div>
            )}
            <div style={{ fontSize: 13, marginTop: 4, color: TIER_COLORS[animal?.tier] || '#888' }}>
              +{sighting.pts_earned} pts
            </div>
          </div>
        </Popup>
      </Marker>
      {showRadius && (
        <Circle
          center={pos}
          radius={JITTER_RADIUS}
          pathOptions={{
            color: 'var(--text-3)',
            weight: 1,
            fillColor: 'var(--text-3)',
            fillOpacity: 0.08,
            dashArray: '4 4',
          }}
        />
      )}
    </>
  )
}
