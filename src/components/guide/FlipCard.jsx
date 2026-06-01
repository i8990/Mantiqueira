import { useState } from 'react'
import { DANGER_CONFIG, DANGER_COLORS } from '../../lib/constants'

export default function FlipCard({ animal }) {
  const [flipped, setFlipped] = useState(false)
  const danger = DANGER_CONFIG[animal.danger]

  return (
    <div
      onClick={() => setFlipped(!flipped)}
      style={{
        perspective: 1200,
        cursor: 'pointer',
        minHeight: 260,
        aspectRatio: '3 / 4',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transition: 'transform .5s cubic-bezier(.25,.1,.25,1)',
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)',
        }}
      >
        {/* Frente */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: 'var(--glass)',
            backdropFilter: 'var(--glass-blur)',
            WebkitBackdropFilter: 'var(--glass-blur)',
            borderRadius: 'var(--r-lg)',
            border: '0.5px solid var(--glass-border)',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
            gap: 6,
          }}
        >
          <span style={{ fontSize: 40 }}>{animal.emoji}</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)', textAlign: 'center', lineHeight: 1.2 }}>
            {animal.name}
          </span>
          <span style={{ fontSize: 10, fontStyle: 'italic', color: 'var(--text-3)', textAlign: 'center' }}>
            {animal.sci}
          </span>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            marginTop: 4,
            padding: '3px 10px',
            borderRadius: 999,
            background: `${danger.color}20`,
            border: `0.5px solid ${danger.color}40`,
          }}>
            <span style={{ fontSize: 10 }}>{danger.emoji}</span>
            <span style={{ fontSize: 10, fontWeight: 600, color: danger.color }}>
              {danger.label}
            </span>
          </div>
          <span style={{
            fontSize: 9,
            color: 'var(--text-3)',
            marginTop: 4,
            opacity: 0.6,
            transition: 'opacity .2s',
          }}>
            👆 toque para virar
          </span>
        </div>

        {/* Verso */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: 'var(--glass)',
            backdropFilter: 'var(--glass-blur-heavy)',
            WebkitBackdropFilter: 'var(--glass-blur-heavy)',
            borderRadius: 'var(--r-lg)',
            border: '0.5px solid var(--glass-border)',
            boxShadow: 'var(--shadow-lg)',
            transform: 'rotateY(180deg)',
            display: 'flex',
            flexDirection: 'column',
            padding: 14,
            overflowY: 'auto',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 24 }}>{animal.emoji}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)', lineHeight: 1.1 }}>
                {animal.name}
              </div>
              <div style={{ fontSize: 9, fontStyle: 'italic', color: 'var(--text-3)' }}>
                {animal.sci}
              </div>
            </div>
          </div>

          <a
            href={animal.wiki}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              fontSize: 11,
              color: 'var(--accent)',
              textDecoration: 'underline',
              marginBottom: 8,
              display: 'block',
            }}
          >
            🌐 Ver na Wikipédia ↗
          </a>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            marginBottom: 6,
            padding: '6px 10px',
            borderRadius: 8,
            background: `${danger.color}15`,
            border: `0.5px solid ${danger.color}30`,
          }}>
            <span style={{ fontSize: 14 }}>{danger.emoji}</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: danger.color }}>
              Perigo: {danger.label}
            </span>
          </div>

          <div style={{ fontSize: 10, color: 'var(--text-2)', marginBottom: 6 }}>
            <strong style={{ color: 'var(--text-1)' }}>🗺️ Habitat:</strong> {animal.habitat}
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-2)', marginBottom: 6 }}>
            <strong style={{ color: 'var(--text-1)' }}>📍 Onde:</strong> {animal.where}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 6 }}>
            {animal.habits.map(h => (
              <span key={h} style={{
                fontSize: 9,
                padding: '2px 8px',
                borderRadius: 999,
                background: 'rgba(255,255,255,.04)',
                border: '0.5px solid var(--glass-border)',
                color: 'var(--text-3)',
              }}>
                {h}
              </span>
            ))}
          </div>

          <div style={{
            fontSize: 10,
            color: 'var(--text-2)',
            padding: '6px 8px',
            background: 'rgba(255,255,255,.03)',
            borderRadius: 8,
            lineHeight: 1.4,
          }}>
            <strong style={{ color: 'var(--accent)' }}>🔍 Como encontrar:</strong>
            <br />{animal.howToFind}
          </div>
        </div>
      </div>
    </div>
  )
}
