import { Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { ANIMALS, TIER_COLORS } from '../../lib/constants'

function createIcon(animal, isSeen) {
  const tierColor = animal ? TIER_COLORS[animal.tier] : 'var(--text-3)'
  const size = animal?.tier === 'legendary' ? 42 : 34
  const html = `
    <div style="
      display:flex;align-items:center;justify-content:center;
      width:${size}px;height:${size}px;
      border-radius:50%;
      background:rgba(6,13,7,.88);
      border:2px solid ${tierColor};
      font-size:${size * 0.5}px;
      box-shadow:${animal?.tier === 'legendary' ? `0 0 14px ${tierColor}` : '0 2px 6px rgba(0,0,0,.5)'};
      ${animal?.tier === 'legendary' ? 'animation:legendPulse 2.4s ease-in-out infinite;' : ''}
    ">${isSeen ? animal.emoji : '?'}</div>
  `
  return L.divIcon({ html, className: '', iconSize: [size, size], iconAnchor: [size / 2, size / 2] })
}

export default function AnimalMarker({ sighting, isSeen }) {
  const animal = ANIMALS.find(a => a.id === sighting.animal_id)
  const creator = sighting.profiles
  if (!sighting.lat || !sighting.lng) return null

  return (
    <Marker
      position={[sighting.lat, sighting.lng]}
      icon={createIcon(animal, isSeen)}
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
  )
}
