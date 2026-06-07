import { useRef } from 'react'

export default function StepPhoto({ photoPreview, videoPreview, mediaType, onFileChange, onVideoFileChange, onRemove, onSkip, sightingType }) {
  const cameraRef = useRef(null)
  const galleryRef = useRef(null)
  const videoRef = useRef(null)
  const photoRequired = sightingType === 'foto' || sightingType === 'pegada'
  const hasMedia = photoPreview || videoPreview

  const handleCamera = () => {
    cameraRef.current?.click()
  }

  const handleGallery = () => {
    galleryRef.current?.click()
  }

  const handleVideo = () => {
    videoRef.current?.click()
  }

  const handleGalleryChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.type.startsWith('video/')) {
      onVideoFileChange(file)
    } else {
      onFileChange(e)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
      <div
        style={{
          width: '100%',
          aspectRatio: '4/3',
          borderRadius: 'var(--r-xl)',
          background: 'var(--glass)',
          backdropFilter: 'var(--glass-blur)',
          WebkitBackdropFilter: 'var(--glass-blur)',
          border: photoRequired && !hasMedia ? '0.5px solid var(--coral)' : '0.5px solid var(--glass-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: 'var(--shadow-md)',
          transition: 'all .25s var(--ease-spring)',
        }}
      >
        {videoPreview ? (
          <video src={videoPreview} controls style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--r-xl)' }} />
        ) : photoPreview ? (
          <img src={photoPreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ textAlign: 'center', color: 'var(--text-3)', padding: 24 }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>{sightingType === 'pegada' ? '👣' : '📸'}</div>
            <div style={{ fontSize: 14, color: 'var(--text-2)' }}>Adicione uma foto ou vídeo</div>
            {photoRequired && (
              <div style={{ fontSize: 11, color: 'var(--coral)', marginTop: 4 }}>
                Obrigatório para este tipo
              </div>
            )}
          </div>
        )}
      </div>

      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: 'none' }}
        onChange={onFileChange}
      />
      <input
        ref={galleryRef}
        type="file"
        accept="image/*,video/*"
        style={{ display: 'none' }}
        onChange={handleGalleryChange}
      />
      <input
        ref={videoRef}
        type="file"
        accept="video/*"
        capture="environment"
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) onVideoFileChange(file)
        }}
      />

      {!hasMedia ? (
        <div style={{ display: 'flex', gap: 10, width: '100%' }}>
          <button onClick={handleCamera}
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '12px 16px', borderRadius: 'var(--r-md)',
              background: 'var(--glass)', backdropFilter: 'var(--glass-blur)',
              WebkitBackdropFilter: 'var(--glass-blur)',
              border: '0.5px solid var(--glass-border)', color: 'var(--text-1)',
              fontSize: 14, fontWeight: 500, cursor: 'pointer',
              transition: 'all .2s var(--ease-spring)',
            }}
          >📸 Câmera</button>
          <button onClick={handleVideo}
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '12px 16px', borderRadius: 'var(--r-md)',
              background: 'var(--glass)', backdropFilter: 'var(--glass-blur)',
              WebkitBackdropFilter: 'var(--glass-blur)',
              border: '0.5px solid var(--glass-border)', color: 'var(--text-1)',
              fontSize: 14, fontWeight: 500, cursor: 'pointer',
              transition: 'all .2s var(--ease-spring)',
            }}
          >🎥 Vídeo</button>
          <button onClick={handleGallery}
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '12px 16px', borderRadius: 'var(--r-md)',
              background: 'var(--glass)', backdropFilter: 'var(--glass-blur)',
              WebkitBackdropFilter: 'var(--glass-blur)',
              border: '0.5px solid var(--glass-border)', color: 'var(--text-1)',
              fontSize: 14, fontWeight: 500, cursor: 'pointer',
              transition: 'all .2s var(--ease-spring)',
            }}
          >🖼️ Galeria</button>
        </div>
      ) : (
        <button onClick={onRemove}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 18px', borderRadius: 'var(--r-md)',
            background: 'var(--coral-dim)', border: '0.5px solid var(--coral)',
            color: 'var(--coral)', fontSize: 13, fontWeight: 500,
            cursor: 'pointer', transition: 'all .2s',
          }}
        >🗑️ Remover {videoPreview ? 'vídeo' : 'foto'}</button>
      )}

      {!hasMedia && !photoRequired && (
        <button onClick={onSkip}
          style={{
            color: 'var(--text-3)', fontSize: 13, textDecoration: 'underline',
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '4px 8px', transition: 'color .2s',
          }}
        >Sem foto (penalidade máx)</button>
      )}
    </div>
  )
}
