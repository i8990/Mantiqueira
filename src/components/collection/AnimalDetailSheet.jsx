import { useEffect } from 'react'
import { ANIMALS, TIER_COLORS } from '../../lib/constants'
import useAppStore from '../../stores/useAppStore'
import Badge from '../ui/Badge'
import Button from '../ui/Button'

const statusBadgeType = {
  CR: 'coral',
  EN: 'coral',
  VU: 'amber',
  NT: 'accent',
  LC: 'muted',
}

export default function AnimalDetailSheet({ animalId, isSeen, onClose }) {
  const setRegisterAnimal = useAppStore(s => s.setRegisterAnimal)
  const animal = ANIMALS.find(a => a.id === animalId)

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  if (!animal) return null

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,.65)',
        backdropFilter: 'blur(16px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(16px) saturate(1.4)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxHeight: '80%',
          background: 'var(--glass)',
          backdropFilter: 'var(--glass-blur-heavy)',
          WebkitBackdropFilter: 'var(--glass-blur-heavy)',
          borderTop: '0.5px solid var(--glass-border)',
          borderRadius: 'var(--r-xl) var(--r-xl) 0 0',
          padding: '24px 20px',
          transform: 'translateY(0)',
          transition: 'transform .35s var(--ease-apple)',
          overflowY: 'auto',
          boxShadow: '0 -8px 30px rgba(0,0,0,.5)',
        }}
      >
        <div style={{
          width: 40,
          height: 4,
          borderRadius: 2,
          background: 'var(--text-3)',
          margin: '0 auto 20px',
          opacity: 0.5,
        }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
          <span style={{ fontSize: 52 }}>{animal.emoji}</span>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{
              fontFamily: 'var(--font-d)',
              fontWeight: 700,
              fontSize: 24,
              color: 'var(--text-1)',
              letterSpacing: '-0.02em',
            }}>
              {animal.name}
            </h3>
            <p style={{ fontStyle: 'italic', fontSize: 14, color: 'var(--text-3)', marginTop: 2 }}>
              {animal.sci}
            </p>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <Badge label={`${animal.status} · ${animal.statusLabel}`} type={statusBadgeType[animal.status] || 'muted'} />
            <Badge label={animal.tierLabel} type="amber" />
          </div>

          <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            padding: 16,
            background: 'rgba(255,255,255,.03)',
            borderRadius: 'var(--r-md)',
            border: '0.5px solid var(--glass-border)',
          }}>
            <div style={{ fontSize: 14, color: 'var(--text-2)' }}>
              <strong style={{ color: 'var(--text-1)' }}>Onde encontrar:</strong> {animal.where}
            </div>
            <div style={{ fontSize: 14, color: 'var(--text-2)' }}>
              <strong style={{ color: 'var(--text-1)' }}>Habitat:</strong> {animal.habitat}
            </div>
            <div style={{ fontSize: 14, color: 'var(--text-2)' }}>
              <strong style={{ color: TIER_COLORS[animal.tier] }}>Pontos:</strong> +{animal.pts}
            </div>
          </div>

          <a
            href={animal.wiki}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--accent)',
              fontSize: 13,
              textDecoration: 'underline',
              opacity: 0.8,
              transition: 'opacity .2s',
            }}
            onMouseOver={e => e.target.style.opacity = 1}
            onMouseOut={e => e.target.style.opacity = 0.8}
          >
            Ver na Wikipédia ↗
          </a>

          {isSeen ? (
            <div style={{
              padding: '10px 20px',
              borderRadius: 'var(--r-md)',
              background: 'var(--accent-dim)',
              color: 'var(--accent)',
              fontSize: 14,
              fontWeight: 500,
            }}>
              ✓ Já registrado na sua coleção
            </div>
          ) : (
            <Button
              fullWidth
              leftIcon="✅"
              onClick={() => {
                onClose()
                setRegisterAnimal(animal.id)
              }}
            >
              Registrei este animal!
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
