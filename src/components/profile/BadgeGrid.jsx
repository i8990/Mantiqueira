import { useState } from 'react'
import { ANIMALS } from '../../lib/constants'

const BIRD_IDS = ['seriema', 'beija-flor', 'trinca-ferro', 'tucano', 'tie-sangue', 'sabia', 'bem-te-vi', 'pardal', 'pombo', 'joao-de-barro', 'rolinha', 'gaviao']
const REPTILE_IDS = ['teiu', 'jararaca', 'caninana', 'cobra-cipo', 'cascavel', 'lagartixa']
const MAMMAL_IDS = ['mico', 'esquilo', 'quati', 'cachorro-do-mato', 'gamba', 'camundongo', 'capivara', 'paca', 'bugio', 'anta', 'veado-campeiro', 'onca-parda', 'jaguatirica', 'lobo-guara', 'onca-pintada', 'ariranha', 'lebre', 'jaratataca']
const ANIMALS_BY_ID = Object.fromEntries(ANIMALS.map(a => [a.id, a]))

const badges = [
  { id: 'quati', emoji: '🦝', name: 'Primeiro quati', condition: 'Ver quati', check: (seenIds) => seenIds.has('quati') },
  { id: 'streak', emoji: '🌿', name: '7 dias seguidos', condition: 'Streak ≥ 7', check: (_, profile) => (profile?.streak_days || 0) >= 7 },
  { id: 'fotos', emoji: '📸', name: '10 fotos válidas', condition: '10 fotos', check: (_, __, sightings) => sightings?.filter(s => s.has_photo || s.photo_url).length >= 10 },
  { id: 'amanhecer', emoji: '🌄', name: 'Registro ao amanhecer', condition: '5h–7h', check: (_, __, sightings) => sightings?.some(s => {
    const h = new Date(s.created_at).getHours()
    return h >= 5 && h <= 7
  }) },
  { id: 'onca', emoji: '🐆', name: 'Avistou onça', condition: 'Registrar onça', check: (seenIds) => seenIds.has('onca-pintada') },
  { id: 'area', emoji: '🗺️', name: '100 km² mapeados', condition: 'Área ≥ 100 km²', check: (_, __, sightings) => {
    if (!sightings?.length) return false
    const lats = sightings.filter(s => s.lat).map(s => s.lat)
    const lngs = sightings.filter(s => s.lng).map(s => s.lng)
    if (lats.length < 2) return false
    const latRange = Math.max(...lats) - Math.min(...lats)
    const lngRange = Math.max(...lngs) - Math.min(...lngs)
    const approxKm2 = (latRange * 111) * (lngRange * 111 * Math.cos((Math.max(...lats) + Math.min(...lats)) / 2 * Math.PI / 180))
    return approxKm2 >= 100
  }},
  { id: 'cume', emoji: '🏔️', name: 'Área de cume', condition: 'Em breve', comingSoon: true },
  { id: 'pin', emoji: '🤝', name: 'Pin coletivo', condition: 'Em breve', comingSoon: true },

  { id: 'primatas', emoji: '🐒', name: 'Amigo dos primatas', condition: 'Ver mico + bugio', check: (seenIds) => seenIds.has('mico') && seenIds.has('bugio') },
  { id: 'repteis', emoji: '🦎', name: 'Rastreador de répteis', condition: '3+ répteis diferentes', check: (seenIds) => REPTILE_IDS.filter(id => seenIds.has(id)).length >= 3 },
  { id: 'aves', emoji: '🐦', name: 'Observador de aves', condition: '5+ aves diferentes', check: (seenIds) => BIRD_IDS.filter(id => seenIds.has(id)).length >= 5 },
  { id: 'mamiferos', emoji: '🦊', name: 'Rastreador de mamíferos', condition: '8+ mamíferos diferentes', check: (seenIds) => MAMMAL_IDS.filter(id => seenIds.has(id)).length >= 8 },
  { id: 'rio', emoji: '🌊', name: 'Guarda-rios', condition: 'Ariranha + capivara + paca', check: (seenIds) => seenIds.has('ariranha') && seenIds.has('capivara') && seenIds.has('paca') },
  { id: 'lendarios', emoji: '🏆', name: 'Caçador de lendas', condition: '2+ animais tier L ou S', check: (seenIds) => {
    if (!seenIds.size) return false
    const tiers = ['L', 'S']
    let count = 0
    for (const id of seenIds) {
      const a = ANIMALS_BY_ID[id]
      if (a && tiers.includes(a.tier)) count++
      if (count >= 2) return true
    }
    return false
  }},

  { id: 'cinquenta', emoji: '📋', name: '50 registros', condition: '50 avistamentos', check: (_, __, sightings) => (sightings?.length || 0) >= 50 },
  { id: 'cem', emoji: '📋', name: '100 registros', condition: '100 avistamentos', check: (_, __, sightings) => (sightings?.length || 0) >= 100 },
  { id: 'colecionador', emoji: '🃏', name: 'Colecionador iniciante', condition: '10 espécies diferentes', check: (seenIds) => seenIds.size >= 10 },
  { id: 'colecionador-plus', emoji: '🎴', name: 'Colecionador dedicado', condition: '25 espécies diferentes', check: (seenIds) => seenIds.size >= 25 },

  { id: 'noturna', emoji: '🌙', name: 'Coruja noturna', condition: '5 registros entre 20h–5h', check: (_, __, sightings) => {
    if (!sightings?.length) return false
    return sightings.filter(s => {
      const h = new Date(s.created_at).getHours()
      return h >= 20 || h < 5
    }).length >= 5
  }},
  { id: 'fim-de-tarde', emoji: '🌅', name: 'Fim de tarde', condition: '5 registros entre 17h–19h', check: (_, __, sightings) => {
    if (!sightings?.length) return false
    return sightings.filter(s => {
      const h = new Date(s.created_at).getHours()
      return h >= 17 && h <= 19
    }).length >= 5
  }},
  { id: 'fds', emoji: '🎉', name: 'Fim de semana', condition: '5 registros em fins de semana', check: (_, __, sightings) => {
    if (!sightings?.length) return false
    return sightings.filter(s => {
      const d = new Date(s.created_at).getDay()
      return d === 0 || d === 6
    }).length >= 5
  }},

  { id: 'quinhentos', emoji: '⭐', name: '500 pontos', condition: '500 pts acumulados', check: (_, profile) => (profile?.total_pts || 0) >= 500 },
  { id: 'mil', emoji: '⭐', name: '1.000 pontos', condition: '1.000 pts acumulados', check: (_, profile) => (profile?.total_pts || 0) >= 1000 },
  { id: 'tres-mil', emoji: '👑', name: '3.000 pontos', condition: '3.000 pts acumulados', check: (_, profile) => (profile?.total_pts || 0) >= 3000 },

  { id: 'pegadas', emoji: '👣', name: 'Pegadas', condition: '5 registros tipo pegada', check: (_, __, sightings) => {
    if (!sightings?.length) return false
    return sightings.filter(s => s.sighting_type === 'pegada').length >= 5
  }},
  { id: 'olheiro', emoji: '👁️', name: 'Olheiro', condition: '5 registros tipo comunicação', check: (_, __, sightings) => {
    if (!sightings?.length) return false
    return sightings.filter(s => s.sighting_type === 'comunicacao').length >= 5
  }},

  { id: 'habitats', emoji: '🌍', name: 'Explorador', condition: '4+ habitats diferentes', check: (seenIds) => {
    if (!seenIds.size) return false
    const habitats = new Set()
    for (const id of seenIds) {
      const a = ANIMALS_BY_ID[id]
      if (a?.habitat) habitats.add(a.habitat)
    }
    return habitats.size >= 4
  }},
  { id: 'perigo', emoji: '⚠️', name: 'Coração de aço', condition: '5+ animais de perigo crítico', check: (seenIds) => {
    if (!seenIds.size) return false
    let count = 0
    for (const id of seenIds) {
      const a = ANIMALS_BY_ID[id]
      if (a?.danger === 'critico') count++
    }
    return count >= 5
  }},
]

export default function BadgeGrid({ seenIds = new Set(), profile, sightings }) {
  const [expanded, setExpanded] = useState(false)

  const evaluated = badges.map(b => ({
    ...b,
    earned: b.comingSoon ? false : b.check(seenIds, profile, sightings),
  }))

  const earned = evaluated.filter(b => b.earned)
  const locked = evaluated.filter(b => !b.earned && !b.comingSoon)
  const coming = evaluated.filter(b => b.comingSoon)

  const sorted = [...earned, ...locked, ...coming]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: '8px 12px',
          borderRadius: 'var(--r-lg)',
          background: 'var(--glass)',
          border: '0.5px solid var(--glass-border)',
          color: 'var(--text-1)',
          cursor: 'pointer',
          fontSize: 15,
          fontWeight: 600,
          textAlign: 'left',
          transition: 'all .2s',
        }}
      >
        <span>
          🏅 Conquistas <span style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 400 }}>({earned.length}/{badges.length})</span>
        </span>
        <span style={{
          fontSize: 14,
          color: 'var(--text-3)',
          transform: expanded ? 'rotate(180deg)' : 'rotate(0)',
          transition: 'transform .25s var(--ease-spring)',
        }}>
          ▼
        </span>
      </button>

      {expanded && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 8,
          animation: 'fadeUp .25s var(--ease-spring)',
        }}>
          {sorted.map(badge => {
            const isComingSoon = badge.comingSoon
            const earned = badge.earned
            return (
              <div
                key={badge.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                  padding: 10,
                  borderRadius: 'var(--r-lg)',
                  background: earned ? 'var(--accent-dim)' : isComingSoon ? 'rgba(255,255,255,.02)' : 'var(--glass)',
                  backdropFilter: earned || isComingSoon ? undefined : 'var(--glass-blur)',
                  WebkitBackdropFilter: earned || isComingSoon ? undefined : 'var(--glass-blur)',
                  border: earned
                    ? '0.5px solid var(--accent)'
                    : isComingSoon
                      ? '0.5px dashed var(--glass-border)'
                      : '0.5px solid var(--glass-border)',
                  opacity: earned ? 1 : isComingSoon ? 0.6 : 0.4,
                  filter: earned || isComingSoon ? 'none' : 'grayscale(1)',
                  transition: 'all .3s var(--ease-spring)',
                }}
                title={badge.condition}
              >
                <span style={{ fontSize: 22 }}>{badge.emoji}</span>
                <span style={{
                  fontSize: 9,
                  color: earned ? 'var(--accent)' : 'var(--text-3)',
                  textAlign: 'center',
                  fontWeight: 500,
                  lineHeight: 1.2,
                }}>
                  {badge.name}
                </span>
                {isComingSoon && (
                  <span style={{ fontSize: 7, color: 'var(--text-3)', opacity: 0.6, marginTop: 1 }}>
                    🚧
                  </span>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
