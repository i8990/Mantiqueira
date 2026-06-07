import { useState, useRef, useEffect } from 'react'
import { SIGHTING_TYPE_MULTIPLIERS } from '../../lib/constants'

const TYPE_OPTIONS = [
  { key: 'foto', label: '📸 Foto' },
  { key: 'pegada', label: '🦶 Pegada' },
  { key: 'atropelamento', label: '🚗 Atropelamento' },
  { key: 'comunicacao', label: '📞 Comunicação' },
]

export default function EditSightingSheet({ sighting, updateSighting, onClose }) {
  const [photoFile, setPhotoFile] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [videoFile, setVideoFile] = useState(null)
  const [videoPreview, setVideoPreview] = useState(null)
  const [description, setDescription] = useState(sighting.description || '')
  const [observedAt, setObservedAt] = useState(
    sighting.observed_at ? sighting.observed_at.slice(0, 16) : ''
  )
  const [lat, setLat] = useState(sighting.lat?.toString() || '')
  const [lng, setLng] = useState(sighting.lng?.toString() || '')
  const [sightingType, setSightingType] = useState(sighting.sighting_type || 'foto')
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const [removePhoto, setRemovePhoto] = useState(false)
  const [removeVideo, setRemoveVideo] = useState(false)
  const fileInputRef = useRef(null)
  const videoInputRef = useRef(null)

  useEffect(() => {
    if (photoFile) {
      const url = URL.createObjectURL(photoFile)
      setPhotoPreview(url)
      setRemovePhoto(false)
      return () => URL.revokeObjectURL(url)
    }
  }, [photoFile])

  useEffect(() => {
    if (videoFile) {
      const url = URL.createObjectURL(videoFile)
      setVideoPreview(url)
      setRemoveVideo(false)
      return () => URL.revokeObjectURL(url)
    }
  }, [videoFile])

  const handleSubmit = async () => {
    setSaving(true)
    setMsg('')

    let finalLat = lat.trim() ? parseFloat(lat) : null
    let finalLng = lng.trim() ? parseFloat(lng) : null

    if ((lat.trim() && !finalLat) || (lng.trim() && !finalLng)) {
      setMsg('Coordenadas inválidas')
      setSaving(false)
      return
    }

    const res = await updateSighting(sighting.id, {
      photoFile: removePhoto ? null : photoFile || undefined,
      videoFile: removeVideo ? null : videoFile || undefined,
      description: description.trim() || null,
      lat: finalLat,
      lng: finalLng,
      observedAt: observedAt ? new Date(observedAt).toISOString() : null,
      sightingType,
      keepExistingPhoto: !photoFile && !removePhoto,
      keepExistingVideo: !videoFile && !removeVideo,
    })

    if (res?.error) {
      setMsg(res.error)
    } else {
      setMsg('✅ Atualizado!')
      setTimeout(() => onClose(), 600)
    }
    setSaving(false)
  }

  const currentPhoto = removePhoto ? null : (photoPreview || sighting.photo_url)
  const currentVideo = removeVideo ? null : (videoPreview || sighting.video_url)

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 16000,
      background: 'rgba(0,0,0,.75)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20, animation: 'fadeIn .2s ease-out',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'var(--glass-strong)',
        backdropFilter: 'var(--glass-blur-ultra)',
        WebkitBackdropFilter: 'var(--glass-blur-ultra)',
        borderRadius: 'var(--r-2xl)', width: '100%', maxWidth: 420, maxHeight: '90%',
        overflowY: 'auto', padding: 28,
        border: '0.5px solid var(--glass-border-light)',
        boxShadow: 'var(--shadow-xl)', animation: 'scaleIn .35s var(--ease-spring)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: 20, color: 'var(--text-1)' }}>
            ✏️ Editar Registro
          </h3>
          <button onClick={onClose}
            style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--glass)', border: '0.5px solid var(--glass-border)', color: 'var(--text-3)', fontSize: 16, cursor: 'pointer' }}
          >✕</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {sighting.animals && (
            <div style={{ textAlign: 'center', padding: '8px 0' }}>
              <span style={{ fontSize: 32 }}>{sighting.animals.emoji}</span>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-1)', marginTop: 4 }}>
                {sighting.animals.name}
              </div>
            </div>
          )}

          <div>
            <label style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 6, display: 'block', fontWeight: 500 }}>
              Mídia
            </label>
            {currentVideo ? (
              <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
                <video src={currentVideo} controls
                  style={{ width: '100%', maxHeight: 200, objectFit: 'cover', borderRadius: 'var(--r-md)' }}
                />
                <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                  <button onClick={() => videoInputRef.current?.click()}
                    style={{
                      padding: '6px 12px', borderRadius: 'var(--r-sm)',
                      background: 'var(--glass)', border: '0.5px solid var(--glass-border)',
                      color: 'var(--text-2)', fontSize: 11, fontWeight: 600, cursor: 'pointer',
                    }}
                  >🎥 Trocar vídeo</button>
                  <button onClick={() => { setVideoFile(null); setVideoPreview(null); setRemoveVideo(true) }}
                    style={{
                      padding: '6px 12px', borderRadius: 'var(--r-sm)',
                      background: 'var(--coral-dim)', border: '0.5px solid var(--coral)',
                      color: 'var(--coral)', fontSize: 11, fontWeight: 600, cursor: 'pointer',
                    }}
                  >🗑️ Remover vídeo</button>
                </div>
              </div>
            ) : currentPhoto ? (
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <img src={currentPhoto} alt=""
                  style={{ width: '100%', maxHeight: 200, objectFit: 'cover', borderRadius: 'var(--r-md)' }}
                />
                <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                  <button onClick={() => fileInputRef.current?.click()}
                    style={{
                      padding: '6px 12px', borderRadius: 'var(--r-sm)',
                      background: 'var(--glass)', border: '0.5px solid var(--glass-border)',
                      color: 'var(--text-2)', fontSize: 11, fontWeight: 600, cursor: 'pointer',
                    }}
                  >📷 Trocar foto</button>
                  <button onClick={() => { setPhotoFile(null); setPhotoPreview(null); setRemovePhoto(true) }}
                    style={{
                      padding: '6px 12px', borderRadius: 'var(--r-sm)',
                      background: 'var(--coral-dim)', border: '0.5px solid var(--coral)',
                      color: 'var(--coral)', fontSize: 11, fontWeight: 600, cursor: 'pointer',
                    }}
                  >🗑️ Remover</button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => fileInputRef.current?.click()}
                  style={{
                    flex: 1, padding: '24px 16px', borderRadius: 'var(--r-md)',
                    background: 'var(--glass)', border: '0.5px dashed var(--glass-border)',
                    color: 'var(--text-3)', fontSize: 14, cursor: 'pointer',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  }}
                >
                  <span style={{ fontSize: 24 }}>📷</span>
                  <span>Adicionar foto</span>
                </button>
                <button onClick={() => videoInputRef.current?.click()}
                  style={{
                    flex: 1, padding: '24px 16px', borderRadius: 'var(--r-md)',
                    background: 'var(--glass)', border: '0.5px dashed var(--glass-border)',
                    color: 'var(--text-3)', fontSize: 14, cursor: 'pointer',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  }}
                >
                  <span style={{ fontSize: 24 }}>🎥</span>
                  <span>Adicionar vídeo</span>
                </button>
              </div>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }}
              onChange={e => { const f = e.target.files?.[0]; if (f) { setVideoFile(null); setVideoPreview(null); setRemoveVideo(false); setPhotoFile(f) } }}
            />
            <input ref={videoInputRef} type="file" accept="video/*" style={{ display: 'none' }}
              onChange={e => { const f = e.target.files?.[0]; if (f) { setPhotoFile(null); setPhotoPreview(null); setRemovePhoto(false); setVideoFile(f) } }}
            />
          </div>

          <div>
            <label style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 6, display: 'block', fontWeight: 500 }}>
              Tipo de Avistamento
            </label>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {TYPE_OPTIONS.map(t => (
                <button key={t.key} onClick={() => setSightingType(t.key)}
                  style={{
                    padding: '6px 12px', borderRadius: 999,
                    background: sightingType === t.key ? 'var(--accent-dim)' : 'var(--glass)',
                    border: `0.5px solid ${sightingType === t.key ? 'var(--accent)' : 'var(--glass-border)'}`,
                    color: sightingType === t.key ? 'var(--accent)' : 'var(--text-2)',
                    fontSize: 11, fontWeight: 600, cursor: 'pointer',
                  }}
                >{t.label}</button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 6, display: 'block', fontWeight: 500 }}>
              Descrição
            </label>
            <textarea value={description} onChange={e => setDescription(e.target.value)}
              rows={3}
              style={{
                width: '100%', padding: '10px 14px', borderRadius: 'var(--r-md)',
                background: 'var(--glass)', border: '0.5px solid var(--glass-border)',
                color: 'var(--text-1)', fontSize: 14, outline: 'none', resize: 'vertical',
                fontFamily: 'inherit', lineHeight: 1.4,
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 6, display: 'block', fontWeight: 500 }}>
              Data e Hora do Avistamento
            </label>
            <input type="datetime-local" value={observedAt} onChange={e => setObservedAt(e.target.value)}
              style={{
                width: '100%', padding: '10px 14px', borderRadius: 'var(--r-md)',
                background: 'var(--glass)', border: '0.5px solid var(--glass-border)',
                color: 'var(--text-1)', fontSize: 14, outline: 'none',
                colorScheme: 'dark',
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <div>
              <label style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 6, display: 'block', fontWeight: 500 }}>
                Latitude
              </label>
              <input type="number" step="any" value={lat} onChange={e => setLat(e.target.value)}
                placeholder="-22.1234"
                style={{
                  width: '100%', padding: '10px 14px', borderRadius: 'var(--r-md)',
                  background: 'var(--glass)', border: '0.5px solid var(--glass-border)',
                  color: 'var(--text-1)', fontSize: 14, outline: 'none',
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 6, display: 'block', fontWeight: 500 }}>
                Longitude
              </label>
              <input type="number" step="any" value={lng} onChange={e => setLng(e.target.value)}
                placeholder="-44.5678"
                style={{
                  width: '100%', padding: '10px 14px', borderRadius: 'var(--r-md)',
                  background: 'var(--glass)', border: '0.5px solid var(--glass-border)',
                  color: 'var(--text-1)', fontSize: 14, outline: 'none',
                }}
              />
            </div>
          </div>

          {msg && (
            <div style={{
              padding: '10px 14px', borderRadius: 'var(--r-sm)',
              textAlign: 'center', fontSize: 13, fontWeight: 500,
              background: msg.includes('✅') ? 'var(--accent-dim)' : 'var(--coral-dim)',
              color: msg.includes('✅') ? 'var(--accent)' : 'var(--coral)',
            }}>
              {msg}
            </div>
          )}

          <button onClick={handleSubmit} disabled={saving}
            style={{
              width: '100%', padding: '14px', borderRadius: 'var(--r-md)',
              background: 'var(--accent)', color: '#060D07', fontWeight: 600, fontSize: 15,
              border: 'none', cursor: saving ? 'not-allowed' : 'pointer',
              opacity: saving ? 0.5 : 1,
              boxShadow: '0 4px 20px var(--accent-glow)',
            }}
          >
            {saving ? 'Salvando...' : '💾 Salvar alterações'}
          </button>
        </div>
      </div>
    </div>
  )
}
