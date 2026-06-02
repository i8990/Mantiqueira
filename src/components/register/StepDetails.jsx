import { useState, useEffect, useRef } from 'react'
import { ANIMALS, SIGHTING_TYPE_MULTIPLIERS, TIER_COLORS, QLTY_BONUS_DESC, QLTY_BONUS_GPS, QLTY_BONUS_DATE, FIRST_SIGHTING_MULTIPLIER, REPEAT_SIGHTING_MULTIPLIER } from '../../lib/constants'
import Badge from '../ui/Badge'
import LocationPicker from './LocationPicker'

function formatDate(date) {
  const d = new Date(date)
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

export default function StepDetails({ animalId, sightingType, onSave, saving, errorMsg }) {
  const [description, setDescription] = useState('')
  const [coords, setCoords] = useState(null)
  const [geoError, setGeoError] = useState(false)
  const [locationMode, setLocationMode] = useState('auto')
  const [manualLat, setManualLat] = useState('')
  const [manualLng, setManualLng] = useState('')
  const [observedDate, setObservedDate] = useState(formatDate(new Date()))
  const [showLocationPicker, setShowLocationPicker] = useState(false)
  const [mapCoords, setMapCoords] = useState(null)
  const [mapAddress, setMapAddress] = useState('')
  const animal = ANIMALS.find(a => a.id === animalId)

  useEffect(() => {
    if (locationMode === 'auto') {
      const watchId = navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude })
          setGeoError(false)
        },
        () => setGeoError(true),
        { enableHighAccuracy: true, timeout: 10000 }
      )
      return () => navigator.geolocation.clearWatch(watchId)
    }
  }, [locationMode])

  const handleUseAutoLocation = () => {
    setLocationMode('auto')
    setManualLat('')
    setManualLng('')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        setGeoError(false)
      },
      () => setGeoError(true),
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }

  const handleManualLocation = () => {
    const lat = parseFloat(manualLat)
    const lng = parseFloat(manualLng)
    if (!isNaN(lat) && !isNaN(lng)) {
      setCoords({ lat, lng })
      setGeoError(false)
    }
  }

  const getCoords = () => {
    if (locationMode === 'auto') return coords
    if (locationMode === 'map' && mapCoords) return mapCoords
    if (locationMode === 'manual') {
      const lat = parseFloat(manualLat)
      const lng = parseFloat(manualLng)
      if (!isNaN(lat) && !isNaN(lng)) return { lat, lng }
    }
    return null
  }

  const typeMult = sightingType ? SIGHTING_TYPE_MULTIPLIERS[sightingType] : null
  let qBonus = 0
  if (description && description.length > 10) qBonus += QLTY_BONUS_DESC
  if (coords?.lat && coords?.lng) qBonus += QLTY_BONUS_GPS
  if (observedDate) qBonus += QLTY_BONUS_DATE
  const ptsBase = animal && typeMult ? Math.round(animal.pts * typeMult) : 0
  const ptsMax = animal && typeMult ? Math.round(animal.pts * typeMult * (1 + qBonus) * FIRST_SIGHTING_MULTIPLIER) : 0
  const penalty = typeMult && typeMult < 1
  const penaltyText = penalty ? `-${Math.round((1 - typeMult) * 100)}%` : null
  const finalCoords = getCoords()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {errorMsg && (
        <p style={{
          color: 'var(--coral)',
          fontSize: 13,
          textAlign: 'center',
          background: 'var(--coral-dim)',
          padding: '10px 14px',
          borderRadius: 'var(--r-sm)',
          border: '0.5px solid var(--coral)',
        }}>
          {errorMsg}
        </p>
      )}

      {!sightingType && (
        <p style={{
          color: 'var(--amber)',
          fontSize: 13,
          textAlign: 'center',
          background: 'var(--amber-dim)',
          padding: '10px 14px',
          borderRadius: 'var(--r-sm)',
          border: '0.5px solid var(--amber)',
        }}>
          ⚠️ Nenhum tipo de avistamento selecionado. Volte e escolha um tipo.
        </p>
      )}

      {animal && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: 14,
          background: 'var(--glass)',
          backdropFilter: 'var(--glass-blur)',
          WebkitBackdropFilter: 'var(--glass-blur)',
          borderRadius: 'var(--r-lg)',
          border: '0.5px solid var(--glass-border)',
        }}>
          <span style={{ fontSize: 36 }}>{animal.emoji}</span>
          <div>
            <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--text-1)' }}>{animal.name}</div>
            <div style={{ fontStyle: 'italic', fontSize: 12, color: 'var(--text-3)' }}>{animal.sci}</div>
          </div>
        </div>
      )}

      <div>
        <label style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 6, display: 'block', fontWeight: 500 }}>
          Data do avistamento
        </label>
        <input
          type="date"
          value={observedDate}
          onChange={e => setObservedDate(e.target.value)}
          max={formatDate(new Date())}
          style={{
            width: '100%',
            padding: '12px 14px',
            borderRadius: 'var(--r-md)',
            background: 'var(--glass)',
            backdropFilter: 'var(--glass-blur)',
            WebkitBackdropFilter: 'var(--glass-blur)',
            border: '0.5px solid var(--glass-border)',
            color: 'var(--text-1)',
            fontSize: 16,
            outline: 'none',
            transition: 'border-color .2s var(--ease-apple)',
          }}
          onFocus={e => e.target.style.borderColor = 'var(--accent)'}
          onBlur={e => e.target.style.borderColor = 'var(--glass-border)'}
        />
      </div>

      <div>
        <label style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 6, display: 'block', fontWeight: 500 }}>
          Descrição (opcional)
        </label>
        <textarea
          placeholder="Como foi o avistamento?"
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
          style={{
            width: '100%',
            padding: '12px 14px',
            borderRadius: 'var(--r-md)',
            background: 'var(--glass)',
            backdropFilter: 'var(--glass-blur)',
            WebkitBackdropFilter: 'var(--glass-blur)',
            border: '0.5px solid var(--glass-border)',
            color: 'var(--text-1)',
            fontSize: 16,
            resize: 'none',
            outline: 'none',
            transition: 'border-color .2s var(--ease-apple)',
          }}
          onFocus={e => e.target.style.borderColor = 'var(--accent)'}
          onBlur={e => e.target.style.borderColor = 'var(--glass-border)'}
        />
      </div>

      <div>
        <label style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 8, display: 'block', fontWeight: 500 }}>
          Localização
        </label>

        <div style={{
          display: 'flex',
          gap: 6,
          marginBottom: 10,
        }}>
          <button
            onClick={() => { setLocationMode('auto'); setMapCoords(null); setManualLat(''); setManualLng('') }}
            style={{
              flex: 1,
              padding: '10px 8px',
              borderRadius: 'var(--r-md)',
              background: locationMode === 'auto' ? 'var(--accent-dim)' : 'var(--glass)',
              backdropFilter: 'var(--glass-blur)',
              WebkitBackdropFilter: 'var(--glass-blur)',
              border: locationMode === 'auto' ? '0.5px solid var(--accent)' : '0.5px solid var(--glass-border)',
              color: locationMode === 'auto' ? 'var(--accent)' : 'var(--text-2)',
              fontSize: 11,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all .2s',
            }}
          >
            📡 GPS
          </button>
          <button
            onClick={() => { setLocationMode('map'); setShowLocationPicker(true) }}
            style={{
              flex: 1,
              padding: '10px 8px',
              borderRadius: 'var(--r-md)',
              background: locationMode === 'map' ? 'var(--accent-dim)' : 'var(--glass)',
              backdropFilter: 'var(--glass-blur)',
              WebkitBackdropFilter: 'var(--glass-blur)',
              border: locationMode === 'map' ? '0.5px solid var(--accent)' : '0.5px solid var(--glass-border)',
              color: locationMode === 'map' ? 'var(--accent)' : 'var(--text-2)',
              fontSize: 11,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all .2s',
            }}
          >
            🗺️ Mapa
          </button>
          <button
            onClick={() => { setLocationMode('manual'); setMapCoords(null) }}
            style={{
              flex: 1,
              padding: '10px 8px',
              borderRadius: 'var(--r-md)',
              background: locationMode === 'manual' ? 'var(--amber-dim)' : 'var(--glass)',
              backdropFilter: 'var(--glass-blur)',
              WebkitBackdropFilter: 'var(--glass-blur)',
              border: locationMode === 'manual' ? '0.5px solid var(--amber)' : '0.5px solid var(--glass-border)',
              color: locationMode === 'manual' ? 'var(--amber)' : 'var(--text-2)',
              fontSize: 11,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all .2s',
            }}
          >
            ✏️ Coord.
          </button>
        </div>

        {locationMode === 'auto' ? (
          <div style={{
            padding: '12px 14px',
            background: 'var(--glass)',
            backdropFilter: 'var(--glass-blur)',
            WebkitBackdropFilter: 'var(--glass-blur)',
            borderRadius: 'var(--r-md)',
            border: '0.5px solid var(--glass-border)',
            fontSize: 13,
            color: 'var(--text-2)',
          }}>
            {geoError ? (
              <span style={{ color: 'var(--coral)' }}>⚠️ Localização indisponível</span>
            ) : coords ? (
              <span>📍 {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}</span>
            ) : (
              <span style={{ color: 'var(--text-3)' }}>📍 Obtendo localização...</span>
            )}
          </div>
        ) : locationMode === 'map' && mapCoords ? (
          <div
            onClick={() => setShowLocationPicker(true)}
            style={{
              padding: '12px 14px',
              background: 'var(--glass)',
              backdropFilter: 'var(--glass-blur)',
              WebkitBackdropFilter: 'var(--glass-blur)',
              borderRadius: 'var(--r-md)',
              border: '0.5px solid var(--accent)',
              fontSize: 13,
              color: 'var(--accent)',
              cursor: 'pointer',
              transition: 'all .2s',
            }}
          >
            <div>📍 {mapCoords.lat.toFixed(4)}, {mapCoords.lng.toFixed(4)}</div>
            {mapAddress && (
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{mapAddress}</div>
            )}
            <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4, textDecoration: 'underline' }}>
              Tocar para alterar
            </div>
          </div>
        ) : locationMode === 'map' ? (
          <button
            onClick={() => setShowLocationPicker(true)}
            style={{
              width: '100%',
              padding: '24px 14px',
              borderRadius: 'var(--r-md)',
              background: 'var(--glass)',
              backdropFilter: 'var(--glass-blur)',
              WebkitBackdropFilter: 'var(--glass-blur)',
              border: '0.5px dashed var(--glass-border)',
              color: 'var(--text-3)',
              fontSize: 13,
              cursor: 'pointer',
              transition: 'all .2s',
            }}
          >
            🗺️ Tocar para abrir o mapa e escolher o local
          </button>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 10, color: 'var(--text-3)', marginBottom: 4, display: 'block' }}>
                  Latitude
                </label>
                <input
                  type="number"
                  step="any"
                  placeholder="-22.02"
                  value={manualLat}
                  onChange={e => {
                    setManualLat(e.target.value)
                    handleManualLocation()
                  }}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
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
                  onFocus={e => e.target.style.borderColor = 'var(--amber)'}
                  onBlur={e => e.target.style.borderColor = 'var(--glass-border)'}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 10, color: 'var(--text-3)', marginBottom: 4, display: 'block' }}>
                  Longitude
                </label>
                <input
                  type="number"
                  step="any"
                  placeholder="-44.73"
                  value={manualLng}
                  onChange={e => {
                    setManualLng(e.target.value)
                    handleManualLocation()
                  }}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
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
                  onFocus={e => e.target.style.borderColor = 'var(--amber)'}
                  onBlur={e => e.target.style.borderColor = 'var(--glass-border)'}
                />
              </div>
            </div>
            {finalCoords && (
              <div style={{
                padding: '8px 12px',
                background: 'var(--accent-dim)',
                borderRadius: 'var(--r-sm)',
                fontSize: 12,
                color: 'var(--accent)',
                textAlign: 'center',
                border: '0.5px solid var(--accent)',
              }}>
                📍 {finalCoords.lat.toFixed(4)}, {finalCoords.lng.toFixed(4)}
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        background: 'var(--glass)',
        backdropFilter: 'var(--glass-blur)',
        WebkitBackdropFilter: 'var(--glass-blur)',
        borderRadius: 'var(--r-md)',
        border: '0.5px solid var(--glass-border)',
      }}>
        <div>
          <span style={{ fontSize: 13, color: 'var(--text-2)' }}>
            Pontos estimados
          </span>
          {penalty && (
            <span style={{
              fontSize: 11,
              color: 'var(--coral)',
              marginLeft: 8,
              fontWeight: 600,
            }}>
              ({penaltyText} penalidade)
            </span>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Badge label={`+${ptsBase} pts`} type="accent" />
          {qBonus > 0 && <span style={{ fontSize: 10, color: 'var(--accent)', fontWeight: 500 }}>+{Math.round(qBonus * 100)}% qualidade</span>}
          <span style={{ fontSize: 9, color: 'var(--text-3)' }}>1ª vez: até +{ptsMax} pts</span>
        </div>
      </div>

      <button
        onClick={() => onSave({
          description,
          lat: finalCoords?.lat,
          lng: finalCoords?.lng,
          observedAt: observedDate ? new Date(observedDate).toISOString() : null,
        })}
        disabled={saving || !animalId || !sightingType}
        style={{
          width: '100%',
          padding: '14px 24px',
          borderRadius: 'var(--r-md)',
          background: 'var(--accent)',
          color: '#060D07',
          fontWeight: 600,
          fontSize: 15,
          border: 'none',
          cursor: (saving || !animalId || !sightingType) ? 'not-allowed' : 'pointer',
          opacity: (saving || !animalId || !sightingType) ? 0.5 : 1,
          boxShadow: '0 4px 20px var(--accent-glow)',
          transition: 'all .2s var(--ease-apple)',
        }}
      >
        {saving ? 'Salvando...' : 'Salvar avistamento'}
      </button>

      {showLocationPicker && (
        <LocationPicker
          initialCoords={mapCoords}
          onConfirm={(pos) => {
            setMapCoords({ lat: pos.lat, lng: pos.lng })
            setMapAddress(pos.address || '')
            setShowLocationPicker(false)
          }}
          onClose={() => {
            setShowLocationPicker(false)
            if (!mapCoords) setLocationMode('auto')
          }}
        />
      )}
    </div>
  )
}
