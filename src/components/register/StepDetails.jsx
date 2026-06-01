import { useState, useEffect } from 'react'
import { ANIMALS } from '../../lib/constants'
import Badge from '../ui/Badge'

export default function StepDetails({ animalId, hasPhoto, onDescriptionChange, onSave, saving, errorMsg }) {
  const [description, setDescription] = useState('')
  const [coords, setCoords] = useState(null)
  const animal = ANIMALS.find(a => a.id === animalId)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => {},
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }, [])

  const pts = animal ? (hasPhoto ? animal.pts : Math.round(animal.pts * 0.3)) : 0

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
          onChange={e => {
            setDescription(e.target.value)
            onDescriptionChange?.(e.target.value)
          }}
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
        {coords ? (
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
        <span style={{ fontSize: 13, color: 'var(--text-2)' }}>
          Pontos estimados
        </span>
        <Badge label={`+${pts} pts`} type="accent" />
      </div>

      <button
        onClick={() => onSave({ description, lat: coords?.lat, lng: coords?.lng })}
        disabled={saving || !animalId}
        style={{
          width: '100%',
          padding: '14px 24px',
          borderRadius: 'var(--r-md)',
          background: 'var(--accent)',
          color: '#060D07',
          fontWeight: 600,
          fontSize: 15,
          border: 'none',
          cursor: (saving || !animalId) ? 'not-allowed' : 'pointer',
          opacity: (saving || !animalId) ? 0.5 : 1,
          boxShadow: '0 4px 20px var(--accent-glow)',
          transition: 'all .2s var(--ease-apple)',
        }}
      >
        {saving ? 'Salvando...' : 'Salvar avistamento'}
      </button>
    </div>
  )
}
