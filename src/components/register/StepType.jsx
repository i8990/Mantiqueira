const TYPES = [
  { id: 'foto', icon: '📸', title: 'Foto', desc: 'Foto do animal registrada', pts: '100% dos pts', color: 'var(--accent)' },
  { id: 'pegada', icon: '👣', title: 'Pegada', desc: 'Foto da pegada (obrigatório)', pts: '60% dos pts', color: '#3498DB' },
  { id: 'atropelamento', icon: '🚗', title: 'Atropelamento', desc: 'Animal atropelado na via', pts: '50% dos pts', color: '#E67E22' },
  { id: 'comunicacao', icon: '💬', title: 'Comunicação', desc: 'Relato sem foto', pts: '30% dos pts (máx)', color: 'var(--coral)' },
]

export default function StepType({ selectedType, onSelect }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <p style={{ fontSize: 13, color: 'var(--text-3)', marginBottom: 4 }}>
        Escolha o tipo de avistamento:
      </p>
      {TYPES.map(t => {
        const isSelected = selectedType === t.id
        return (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '14px 16px',
              borderRadius: 'var(--r-md)',
              background: isSelected ? `${t.color}18` : 'var(--glass)',
              backdropFilter: 'var(--glass-blur)',
              WebkitBackdropFilter: 'var(--glass-blur)',
              border: isSelected ? `1px solid ${t.color}` : '0.5px solid var(--glass-border)',
              cursor: 'pointer',
              width: '100%',
              textAlign: 'left',
              transition: 'all .2s var(--ease-apple)',
            }}
          >
            <span style={{ fontSize: 28, flexShrink: 0 }}>{t.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: isSelected ? t.color : 'var(--text-1)' }}>
                {t.title}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 1 }}>{t.desc}</div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: t.color, flexShrink: 0 }}>
              {t.pts}
            </span>
          </button>
        )
      })}
    </div>
  )
}
