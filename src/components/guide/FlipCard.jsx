import { useState, useEffect } from 'react'
import { DANGER_CONFIG, TIER_COLORS } from '../../lib/constants'
import { fetchWikipediaImage } from '../../lib/wikipedia'

const FALLBACK_DANGER = { label: 'Desconhecido', color: 'var(--text-3)', emoji: '⚪' }

export default function FlipCard({ animal }) {
  const [flipped, setFlipped] = useState(false)
  const [wikiImg, setWikiImg] = useState(null)
  const danger = DANGER_CONFIG[animal.danger] || FALLBACK_DANGER
  const imgUrl = wikiImg || animal.img

  useEffect(() => {
    let cancelled = false
    fetchWikipediaImage(animal.wiki).then(url => {
      if (!cancelled && url) setWikiImg(url)
    })
    return () => { cancelled = true }
  }, [animal.wiki])

  return (
    <div
      onClick={() => setFlipped(!flipped)}
      style={{
        perspective: 1200,
        cursor: 'pointer',
        minHeight: 220,
        aspectRatio: '3 / 4',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transition: 'transform .6s var(--ease-spring)',
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: 'var(--glass)',
            backdropFilter: 'var(--glass-blur)',
            WebkitBackdropFilter: 'var(--glass-blur)',
            borderRadius: 'var(--r-xl)',
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
          <div style={{
            position: 'absolute',
            top: 8,
            right: 8,
            padding: '2px 8px',
            borderRadius: 999,
            background: TIER_COLORS[animal.tier],
            color: '#fff',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '-0.01em',
          }}>
            +{animal.pts}
          </div>
          {imgUrl ? (
            <div style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              overflow: 'hidden',
              background: 'rgba(0,0,0,.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 34,
              border: '0.5px solid var(--glass-border)',
            }}>
              <img
                src={imgUrl}
                alt={animal.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => { e.target.style.display = 'none'; e.target.parentNode.textContent = animal.emoji }}
              />
            </div>
          ) : (
            <span style={{ fontSize: 38 }}>{animal.emoji}</span>
          )}
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)', textAlign: 'center', lineHeight: 1.2 }}>
            {animal.name}
          </span>
          <span style={{ fontSize: 9, fontStyle: 'italic', color: 'var(--text-3)', textAlign: 'center' }}>
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
            fontSize: 8,
            color: 'var(--text-3)',
            marginTop: 6,
            opacity: 0.6,
          }}>
            👆 toque para virar
          </span>
        </div>

        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: 'var(--glass-strong)',
            backdropFilter: 'var(--glass-blur-heavy)',
            WebkitBackdropFilter: 'var(--glass-blur-heavy)',
            borderRadius: 'var(--r-xl)',
            border: '0.5px solid var(--glass-border-light)',
            boxShadow: 'var(--shadow-lg)',
            transform: 'rotateY(180deg)',
            display: 'flex',
            flexDirection: 'column',
            padding: 16,
            overflowY: 'auto',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            {imgUrl ? (
              <div style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                overflow: 'hidden',
                background: 'rgba(0,0,0,.15)',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <img
                  src={imgUrl}
                  alt={animal.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={e => { e.target.style.display = 'none'; e.target.parentNode.textContent = animal.emoji }}
                />
              </div>
            ) : (
              <span style={{ fontSize: 26, flexShrink: 0 }}>{animal.emoji}</span>
            )}
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
