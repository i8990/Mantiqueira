import { useMemo, useState } from 'react'
import { Marker, Popup, Circle } from 'react-leaflet'
import L from 'leaflet'
import { ANIMALS, TIER_COLORS } from '../../lib/constants'
import useAppStore from '../../stores/useAppStore'

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

function createIcon(animal) {
  const tierColor = (animal && TIER_COLORS[animal.tier]) || 'var(--text-3)'
  const size = animal?.tier === 'L' ? 44 : 36
  const html = `
    <div style="
      display:flex;align-items:center;justify-content:center;
      width:${size}px;height:${size}px;
      border-radius:50%;
      background:rgba(6,13,7,.88);
      backdrop-filter:blur(10px);
      border:2px solid ${tierColor};
      font-size:${size * 0.5}px;
      box-shadow:${animal?.tier === 'L' ? `0 0 14px ${tierColor}, 0 2px 8px rgba(0,0,0,.4)` : '0 2px 8px rgba(0,0,0,.4)'};
      ${animal?.tier === 'L' ? 'animation:legendPulse 2.4s ease-in-out infinite;' : ''}
      transition:transform .2s;
    ">${animal?.emoji || '❓'}</div>
  `
  return L.divIcon({ html, className: '', iconSize: [size, size], iconAnchor: [size / 2, size / 2] })
}

export default function AnimalMarker({ sighting, likeCount = 0, userLiked = false, onToggleLike, onLoadLikers }) {
  const [showRadius, setShowRadius] = useState(false)
  const setViewProfile = useAppStore(s => s.setViewProfile)
  const animal = ANIMALS.find(a => a.id === sighting.animal_id)
  const creator = sighting.profiles
  if (!sighting.lat || !sighting.lng) return null

  const seed = hashSeed(sighting.id)
  const pos = useMemo(() => jitterPosition(sighting.lat, sighting.lng, seed), [sighting.lat, sighting.lng, seed])

  return (
    <>
      <Marker
        position={pos}
        icon={createIcon(animal)}
        eventHandlers={{ click: () => setShowRadius(true), popupclose: () => setShowRadius(false) }}
      >
        <Popup>
          <div style={{
            textAlign: 'center',
            minWidth: 140,
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
          }}>
            {sighting.video_url ? (
              <video src={sighting.video_url} controls muted
                style={{
                  width: '100%', maxHeight: 160, objectFit: 'cover',
                  borderRadius: 8, marginBottom: 8,
                }}
              />
            ) : sighting.photo_url ? (
              <img src={sighting.photo_url} alt=""
                style={{
                  width: '100%', maxHeight: 140, objectFit: 'cover',
                  borderRadius: 8, marginBottom: 8,
                }}
              />
            ) : (
              <div style={{ fontSize: 32, marginBottom: 4 }}>{animal?.emoji || '❓'}</div>
            )}
            <div style={{ fontWeight: 700, fontSize: 16, color: '#1a1a1a' }}>{animal?.name || 'Desconhecido'}</div>
            <div style={{ fontSize: 12, color: '#888', fontStyle: 'italic' }}>{animal?.sci || ''}</div>
            {creator && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setViewProfile(creator.id || sighting.user_id)
                }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
                  fontSize: 11, color: '#888', marginTop: 8,
                  background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px',
                  borderRadius: 8, width: '100%',
                  fontFamily: 'inherit',
                  transition: 'background .2s',
                }}
              >
                {creator.avatar_url ? (
                  <img src={creator.avatar_url} alt="" style={{ width: 16, height: 16, borderRadius: '50%', objectFit: 'cover' }} />
                ) : (
                  <span>{creator.avatar_emoji || '🧭'}</span>
                )}
                <span style={{ fontWeight: 600, color: '#2a7a4a' }}>
                  {creator.name || creator.username || 'Matago'}
                </span>
                <span style={{ color: '#aaa' }}>@{creator.username || ''}</span>
              </button>
            )}
            <div style={{ fontSize: 14, marginTop: 6, fontWeight: 600, color: (animal && TIER_COLORS[animal.tier]) || '#888' }}>
              +{sighting.pts_earned} pts
            </div>
            {likeCount > 0 && (
              <div style={{ fontSize: 12, color: '#e74c3c', marginTop: 4 }}>
                ❤️ {likeCount}
              </div>
            )}
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
