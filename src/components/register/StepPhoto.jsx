export default function StepPhoto({ photoPreview, onFileChange, onSkip }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
      <div
        style={{
          width: '100%',
          aspectRatio: '4/3',
          borderRadius: 'var(--r-lg)',
          background: 'var(--glass)',
          backdropFilter: 'var(--glass-blur)',
          WebkitBackdropFilter: 'var(--glass-blur)',
          border: '0.5px solid var(--glass-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          cursor: 'pointer',
          position: 'relative',
          boxShadow: 'var(--shadow-md)',
        }}
        onClick={() => document.getElementById('photo-input').click()}
      >
        {photoPreview ? (
          <img src={photoPreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ textAlign: 'center', color: 'var(--text-3)', padding: 24 }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>📸</div>
            <div style={{ fontSize: 14 }}>Toque para fotografar</div>
          </div>
        )}
      </div>
      <input
        id="photo-input"
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: 'none' }}
        onChange={onFileChange}
      />
      {!photoPreview && (
        <button
          onClick={onSkip}
          style={{
            color: 'var(--text-3)',
            fontSize: 13,
            textDecoration: 'underline',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            transition: 'color .2s',
          }}
          onMouseOver={e => e.target.style.color = 'var(--text-2)'}
          onMouseOut={e => e.target.style.color = 'var(--text-3)'}
        >
          Sem foto (-70% pts)
        </button>
      )}
      {photoPreview && (
        <button
          onClick={() => {
            document.getElementById('photo-input').value = ''
            onFileChange({ target: { files: [] } })
          }}
          style={{
            color: 'var(--coral)',
            fontSize: 13,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Remover foto
        </button>
      )}
    </div>
  )
}
