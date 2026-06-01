import { useState, useEffect } from 'react'
import { ANIMALS, SIGHTING_TYPE_MULTIPLIERS } from '../../lib/constants'
import Badge from '../ui/Badge'

export default function StepDetails({ animalId, sightingType, onSave, saving, errorMsg }) {
  const [description, setDescription] = useState('')
  const [coords, setCoords] = useState(null)
  const [geoError, setGeoError] = useState(false)
  const animal = ANIMALS.find(a => a.id === animalId)

  useEffect(() => {
    const watchId = navigator.geolocation.getCurrentPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setGeoError(true),
      { enableHighAccuracy: true, timeout: 10000 }
    )
    return () => navigator.geolocation.clearWatch(watchId)
  }, [])

  const multiplier = sightingType ? SIGHTING_TYPE_MULTIPLIERS[sightingType] : null
  const pts = animal && multiplier ? Math.round(animal.pts * multiplier) : 0
  const penalty = multiplier && multiplier < 1
  const penaltyText = penalty ? `-${Math.round((1 - multiplier) * 100)}%` : null

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
        }}>
          ⚠️ Nenhum tipo de avistamento selecionado. Volte e escolha um tipo.
        </p>
      )}

      {animal && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: 12,
          background: 'var(--glass)',
          backdropFilter: 'var(--glass-blur)',
          WebkitBackdropFilter: 'var(--glass-blur)',
          borderRadius: 'var(--r-md)',
          border: '0.5px solid var(--glass-border)',
        }}>
          <span style={{ fontSize: 32 }}>{animal.emoji}</span>
          <div>
            <div style={{ fontWeight: 600, fontSize: 15 }}>{animal.name}</div>
            <div style={{ fontStyle: 'italic', fontSize: 12, color: 'var(--text-3)' }}>{animal.sci}</div>
          </div>
        </div>
      )}

      <div>
        <label style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 6, display: 'block' }}>
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
          <span style={{ color: 'var(--coral)' }}>⚠️ Localização indisponível — o registro não aparecerá no mapa</span>
        ) : coords ? (
          <span>📍 GPS capturado ✓</span>
        ) : (
          <span style={{ color: 'var(--text-3)' }}>📍 Obtendo localização...</span>
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
        <Badge label={`+${pts} pts`} type="accent" />
      </div>

      <button
        onClick={() => onSave({ description, lat: coords?.lat, lng: coords?.lng })}
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
    </div>
  )
}
