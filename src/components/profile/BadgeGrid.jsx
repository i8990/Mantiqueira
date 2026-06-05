import { useState } from 'react'
import { ANIMALS } from '../../lib/constants'

const BIRD_IDS = ['seriema', 'beija-flor', 'trinca-ferro', 'tucano', 'tie-sangue', 'sabia', 'bem-te-vi', 'pardal', 'pombo', 'joao-de-barro', 'rolinha', 'gaviao']
const REPTILE_IDS = ['teiu', 'jararaca', 'caninana', 'cobra-cipo', 'cascavel', 'lagartixa']
const MAMMAL_IDS = ['mico', 'esquilo', 'quati', 'cachorro-do-mato', 'gamba', 'camundongo', 'capivara', 'paca', 'bugio', 'anta', 'veado-campeiro', 'onca-parda', 'jaguatirica', 'lobo-guara', 'onca-pintada', 'ariranha', 'lebre', 'jaratataca']
const ANIMALS_BY_ID = Object.fromEntries(ANIMALS.map(a => [a.id, a]))

const badges = [
  {
    id: 'quati', emoji: '🦝', name: 'Primeiro quati', condition: 'Ver quati',
    hint: 'Quatis vivem em bandos e são diurnos. Explore matas e capoeiras durante o dia — fique atento a movimentos entre as folhas.',
    check: (seenIds) => seenIds.has('quati'),
  },
  {
    id: 'streak', emoji: '🌿', name: '7 dias seguidos', condition: 'Streak ≥ 7',
    hint: 'Registre pelo menos 1 animal por 7 dias consecutivos. Não precisa ser espécie diferente — basta 1 registro por dia!',
    check: (_, profile) => (profile?.streak_days || 0) >= 7,
  },
  {
    id: 'fotos', emoji: '📸', name: '10 fotos válidas', condition: '10 fotos',
    hint: 'Tire 10 fotos de animais. Qualquer espécie conta, desde que o registro tenha foto.',
    check: (_, __, sightings) => sightings?.filter(s => s.has_photo || s.photo_url).length >= 10,
  },
  {
    id: 'amanhecer', emoji: '🌄', name: 'Registro ao amanhecer', condition: '5h–7h',
    hint: 'Faça um registro entre 5h e 7h da manhã. O amanhecer na mata é mágico — e muitos animais estão ativos nesse horário, como sabiás, veados e bugios.',
    check: (_, __, sightings) => sightings?.some(s => {
      const h = new Date(s.created_at).getHours()
      return h >= 5 && h <= 7
    }),
  },
  {
    id: 'onca', emoji: '🐆', name: 'Avistou onça', condition: 'Registrar onça',
    hint: `A onça-pintada habita matas densas e grotões. É ${(ANIMALS_BY_ID['onca-pintada']?.habits || []).join(', ') || 'noturna e territorial'}. Sua melhor chance é em eventos especiais.`,
    check: (seenIds) => seenIds.has('onca-pintada'),
  },
  {
    id: 'area', emoji: '🗺️', name: '100 km² mapeados', condition: 'Área ≥ 100 km²',
    hint: 'Espalhe seus registros por uma área de aproximadamente 100 km². Explore diferentes regiões da Mantiqueira!',
    check: (_, __, sightings) => {
      if (!sightings?.length) return false
      const lats = sightings.filter(s => s.lat).map(s => s.lat)
      const lngs = sightings.filter(s => s.lng).map(s => s.lng)
      if (lats.length < 2) return false
      const latRange = Math.max(...lats) - Math.min(...lats)
      const lngRange = Math.max(...lngs) - Math.min(...lngs)
      const approxKm2 = (latRange * 111) * (lngRange * 111 * Math.cos((Math.max(...lats) + Math.min(...lats)) / 2 * Math.PI / 180))
      return approxKm2 >= 100
    },
  },
  { id: 'cume', emoji: '🏔️', name: 'Área de cume', condition: 'Em breve', comingSoon: true, hint: 'Em breve — nova conquista chegando!' },
  { id: 'pin', emoji: '🤝', name: 'Pin coletivo', condition: 'Em breve', comingSoon: true, hint: 'Em breve — nova conquista chegando!' },

  {
    id: 'primatas', emoji: '🐒', name: 'Amigo dos primatas', condition: 'Ver mico + bugio',
    hint: `Registre o mico-estrela (${ANIMALS_BY_ID['mico']?.habits?.join(', ') || 'arborícola e diurno'}) e o bugio (ouça o rugido característico ao amanhecer). Ambos vivem na Floresta Atlântica.`,
    check: (seenIds) => seenIds.has('mico') && seenIds.has('bugio'),
  },
  {
    id: 'repteis', emoji: '🦎', name: 'Rastreador de répteis', condition: '3+ répteis diferentes',
    hint: 'Registre 3 répteis diferentes: teiú (diurno, clareiras), jararaca (noturna, chão da mata), caninana (diurna, árvores), cobra-cipó (diurna, galhos), cascavel (noturna, campos), lagartixa (noturna, paredes).',
    check: (seenIds) => REPTILE_IDS.filter(id => seenIds.has(id)).length >= 3,
  },
  {
    id: 'aves', emoji: '🐦', name: 'Observador de aves', condition: '5+ aves diferentes',
    hint: 'Registre 5 aves diferentes. Algumas fáceis: bem-te-vi, joão-de-barro e sabiá são comuns em áreas abertas e urbanas. Seriema e gavião preferem campos abertos.',
    check: (seenIds) => BIRD_IDS.filter(id => seenIds.has(id)).length >= 5,
  },
  {
    id: 'mamiferos', emoji: '🦊', name: 'Rastreador de mamíferos', condition: '8+ mamíferos diferentes',
    hint: 'Registre 8 mamíferos diferentes. Comece pelos mais comuns: capivara (rios), gambá (noturno/urbano), quati (diurno/matas), mico-estrela (diurno/árvores), lebre (campos ao entardecer).',
    check: (seenIds) => MAMMAL_IDS.filter(id => seenIds.has(id)).length >= 8,
  },
  {
    id: 'rio', emoji: '🌊', name: 'Guarda-rios', condition: 'Ariranha + capivara + paca',
    hint: 'Registre ariranha, capivara e paca. Todos vivem próximos a rios e brejos — a capivara é a mais fácil de encontrar em margens de rios e lagoas.',
    check: (seenIds) => seenIds.has('ariranha') && seenIds.has('capivara') && seenIds.has('paca'),
  },
  {
    id: 'lendarios', emoji: '🏆', name: 'Caçador de lendas', condition: '2+ animais tier L ou S',
    hint: 'Registre 2 animais Lendários (tier L: onça-pintada, lobo-guará, sapo-flamenguinho) ou Míticos (tier S: onça-parda, anta, veado-campeiro, jaguatirica, ariranha). Foque nos Míticos — são mais acessíveis.',
    check: (seenIds) => {
      if (!seenIds.size) return false
      const tiers = ['L', 'S']
      let count = 0
      for (const id of seenIds) {
        const a = ANIMALS_BY_ID[id]
        if (a && tiers.includes(a.tier)) count++
        if (count >= 2) return true
      }
      return false
    },
  },

  {
    id: 'cinquenta', emoji: '📋', name: '50 registros', condition: '50 avistamentos',
    hint: 'Complete 50 registros de qualquer tipo. Cada registro conta — foto, pegada, comunicação ou avistamento.',
    check: (_, __, sightings) => (sightings?.length || 0) >= 50,
  },
  {
    id: 'cem', emoji: '📋', name: '100 registros', condition: '100 avistamentos',
    hint: 'Complete 100 registros no total. Continue explorando e registrando — a Mantiqueira tem muito a oferecer!',
    check: (_, __, sightings) => (sightings?.length || 0) >= 100,
  },
  {
    id: 'colecionador', emoji: '🃏', name: 'Colecionador iniciante', condition: '10 espécies diferentes',
    hint: 'Veja 10 espécies diferentes de animais. Comece pelas áreas urbanas (bem-te-vi, pardal, pombo, lagartixa) e explore bordas de mata para mais variedade.',
    check: (seenIds) => seenIds.size >= 10,
  },
  {
    id: 'colecionador-plus', emoji: '🎴', name: 'Colecionador dedicado', condition: '25 espécies diferentes',
    hint: 'Veja 25 espécies diferentes de animais. Explore todos os habitats: Floresta Atlântica, Cerrado/Campo, Brejo/Rio e áreas urbanas.',
    check: (seenIds) => seenIds.size >= 25,
  },

  {
    id: 'noturna', emoji: '🌙', name: 'Coruja noturna', condition: '5 registros entre 20h–5h',
    hint: 'Faça 5 registros entre 20h e 5h. Animais noturnos como coruja-buraqueira, gambá, jaguatirica, jaratataca, sapo-cururu e rã-manteiga são bons alvos. Leve uma lanterna!',
    check: (_, __, sightings) => {
      if (!sightings?.length) return false
      return sightings.filter(s => {
        const h = new Date(s.created_at).getHours()
        return h >= 20 || h < 5
      }).length >= 5
    },
  },
  {
    id: 'fim-de-tarde', emoji: '🌅', name: 'Fim de tarde', condition: '5 registros entre 17h–19h',
    hint: 'Faça 5 registros entre 17h e 19h. O entardecer é um ótimo momento para observar veado-campeiro, lebre-tapiti, lobo-guará e diversas aves.',
    check: (_, __, sightings) => {
      if (!sightings?.length) return false
      return sightings.filter(s => {
        const h = new Date(s.created_at).getHours()
        return h >= 17 && h <= 19
      }).length >= 5
    },
  },
  {
    id: 'fds', emoji: '🎉', name: 'Fim de semana', condition: '5 registros em fins de semana',
    hint: 'Faça 5 registros em sábados ou domingos. Aproveite o fim de semana para explorar a Serra da Mantiqueira!',
    check: (_, __, sightings) => {
      if (!sightings?.length) return false
      return sightings.filter(s => {
        const d = new Date(s.created_at).getDay()
        return d === 0 || d === 6
      }).length >= 5
    },
  },

  {
    id: 'quinhentos', emoji: '⭐', name: '500 pontos', condition: '500 pts acumulados',
    hint: 'Acumule 500 pontos somando todos os seus registros e bônus. Registre espécies raras e complete a descrição para ganhar mais pontos!',
    check: (_, profile) => (profile?.total_pts || 0) >= 500,
  },
  {
    id: 'mil', emoji: '⭐', name: '1.000 pontos', condition: '1.000 pts acumulados',
    hint: 'Acumule 1.000 pontos no total. Continue registrando, mantendo streaks e reivindicando recompensas!',
    check: (_, profile) => (profile?.total_pts || 0) >= 1000,
  },
  {
    id: 'tres-mil', emoji: '👑', name: '3.000 pontos', condition: '3.000 pts acumulados',
    hint: 'Acumule 3.000 pontos no total. Registre todas as espécies, complete missões mensais e não perca seus streaks!',
    check: (_, profile) => (profile?.total_pts || 0) >= 3000,
  },

  {
    id: 'pegadas', emoji: '👣', name: 'Pegadas', condition: '5 registros tipo pegada',
    hint: 'Faça 5 registros do tipo "pegada". Procure por rastros em trilhas de terra, margens de rios e áreas com solo úmido.',
    check: (_, __, sightings) => {
      if (!sightings?.length) return false
      return sightings.filter(s => s.sighting_type === 'pegada').length >= 5
    },
  },
  {
    id: 'olheiro', emoji: '👁️', name: 'Olheiro', condition: '5 registros tipo comunicação',
    hint: 'Faça 5 registros do tipo "comunicação" — vocalizações, marcas territoriais, tocas, pegadas em série ou outros sinais de presença animal.',
    check: (_, __, sightings) => {
      if (!sightings?.length) return false
      return sightings.filter(s => s.sighting_type === 'comunicacao').length >= 5
    },
  },

  {
    id: 'habitats', emoji: '🌍', name: 'Explorador', condition: '4+ habitats diferentes',
    hint: 'Registre animais de 4 habitats diferentes entre: Floresta Atlântica, Cerrado/Campo, Brejo/Rio, Urbano, Campo, Solo, Místico. Cada animal tem um habitat — explore todos os biomas!',
    check: (seenIds) => {
      if (!seenIds.size) return false
      const habitats = new Set()
      for (const id of seenIds) {
        const a = ANIMALS_BY_ID[id]
        if (a?.habitat) habitats.add(a.habitat)
      }
      return habitats.size >= 4
    },
  },
  {
    id: 'perigo', emoji: '⚠️', name: 'Coração de aço', condition: '5+ animais de perigo crítico',
    hint: 'Registre 5 animais de perigo crítico: onça-pintada, onça-parda, jararaca, cascavel, taturana. Cuidado redobrado — mantenha distância segura!',
    check: (seenIds) => {
      if (!seenIds.size) return false
      let count = 0
      for (const id of seenIds) {
        const a = ANIMALS_BY_ID[id]
        if (a?.danger === 'critico') count++
      }
      return count >= 5
    },
  },
]

export default function BadgeGrid({ seenIds = new Set(), profile, sightings, claimedBadges = [], badgeRewards = {}, onClaimBadge }) {
  const [expanded, setExpanded] = useState(false)
  const [selectedBadge, setSelectedBadge] = useState(null)

  const evaluated = badges.map(b => ({
    ...b,
    earned: b.comingSoon ? false : b.check(seenIds, profile, sightings),
  }))

  const earned = evaluated.filter(b => b.earned)
  const locked = evaluated.filter(b => !b.earned && !b.comingSoon)
  const coming = evaluated.filter(b => b.comingSoon)

  const sorted = [...earned, ...locked, ...coming]

  const badgeClaims = new Set(claimedBadges || [])

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
                onClick={() => setSelectedBadge(badge)}
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
                  cursor: 'pointer',
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

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div onClick={() => setSelectedBadge(null)} style={{
          position: 'fixed', inset: 0, zIndex: 21000,
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
            borderRadius: 'var(--r-2xl)', width: '100%', maxWidth: 360,
            overflowY: 'auto', padding: 28,
            border: '0.5px solid var(--glass-border-light)',
            boxShadow: 'var(--shadow-xl)', animation: 'scaleIn .35s var(--ease-spring)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 36 }}>{selectedBadge.emoji}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 18, color: 'var(--text-1)' }}>
                    {selectedBadge.name}
                  </div>
                  {selectedBadge.comingSoon ? (
                    <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>🚧 Em breve</div>
                  ) : (
                    <div style={{
                      fontSize: 12, marginTop: 2,
                      color: selectedBadge.earned ? 'var(--accent)' : 'var(--text-3)',
                      fontWeight: 500,
                    }}>
                      {selectedBadge.earned ? '✅ Desbloqueada' : '🔒 Bloqueada'}
                    </div>
                  )}
                </div>
              </div>
              <button onClick={() => setSelectedBadge(null)}
                style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--glass)', border: '0.5px solid var(--glass-border)', color: 'var(--text-3)', fontSize: 16, cursor: 'pointer' }}
              >✕</button>
            </div>

            {!selectedBadge.comingSoon && (
              <>
                <div style={{
                  padding: '12px 14px', borderRadius: 'var(--r-md)',
                  background: 'var(--glass)', border: '0.5px solid var(--glass-border)',
                  marginBottom: 12,
                }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Condição
                  </div>
                  <div style={{ fontSize: 14, color: 'var(--text-1)', fontWeight: 500 }}>
                    {selectedBadge.condition}
                  </div>
                </div>

                <div style={{
                  padding: '12px 14px', borderRadius: 'var(--r-md)',
                  background: 'var(--glass)', border: '0.5px solid var(--glass-border)',
                  marginBottom: 12,
                }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    💡 Dica
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5 }}>
                    {selectedBadge.hint}
                  </div>
                </div>

                {badgeRewards[selectedBadge.id] && (
                  <div style={{
                    padding: '12px 14px', borderRadius: 'var(--r-md)',
                    background: 'var(--glass)', border: '0.5px solid var(--glass-border)',
                    marginBottom: 12,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}>
                    <span style={{ fontSize: 13, color: 'var(--text-1)', fontWeight: 500 }}>
                      🎁 Recompensa
                    </span>
                    <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--amber)' }}>
                      +{badgeRewards[selectedBadge.id]} pts
                    </span>
                  </div>
                )}

                  {selectedBadge.earned && !badgeClaims.has(selectedBadge.id) && onClaimBadge && (
                  <button
                    onClick={async (e) => {
                      e.stopPropagation()
                      const res = await onClaimBadge(selectedBadge.id, badgeRewards[selectedBadge.id] || 0)
                      if (res?.error) { console.error(res.error); return }
                      window.location.reload()
                    }}
                    style={{
                      width: '100%', padding: '14px', borderRadius: 'var(--r-md)',
                      background: 'var(--accent)', color: '#060D07',
                      border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                      boxShadow: '0 4px 20px var(--accent-glow)',
                    }}
                  >
                    REIVINDICAR RECOMPENSA
                  </button>
                )}

                {selectedBadge.earned && badgeClaims.has(selectedBadge.id) && (
                  <div style={{
                    padding: '12px 14px', borderRadius: 'var(--r-md)',
                    background: 'var(--glass)', border: '0.5px solid var(--glass-border)',
                    textAlign: 'center', fontSize: 13, color: 'var(--accent)', fontWeight: 500,
                  }}>
                    ✅ Recompensa já reivindicada
                  </div>
                )}
              </>
            )}

            {selectedBadge.comingSoon && (
              <div style={{
                padding: '20px', textAlign: 'center',
                color: 'var(--text-3)', fontSize: 14,
              }}>
                Esta conquista ainda não está disponível. Fique ligado nas próximas atualizações!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
