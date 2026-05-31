const badges = [
  { id: 'quati', emoji: '🦝', name: 'Primeiro quati', condition: 'Ver quati', check: (seenIds) => seenIds.has('quati') },
  { id: 'streak', emoji: '🌿', name: '7 dias seguidos', condition: 'Streak ≥ 7', check: (_, profile) => (profile?.streak_days || 0) >= 7 },
  { id: 'fotos', emoji: '📸', name: '10 fotos válidas', condition: '10 fotos', check: (_, __, sightings) => sightings?.filter(s => s.has_photo || s.photo_url).length >= 10 },
  { id: 'amanhecer', emoji: '🌄', name: 'Registro ao amanhecer', condition: '5h–7h', check: (_, __, sightings) => sightings?.some(s => {
    const h = new Date(s.created_at).getHours()
    return h >= 5 && h <= 7
  }) },
  { id: 'onca', emoji: '🐆', name: 'Avistou onça', condition: 'Registrar onça', check: (seenIds) => seenIds.has('onca') },
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
  { id: 'cume', emoji: '🏔️', name: 'Área de cume', condition: 'Altitude > 1800m', check: () => false },
  { id: 'pin', emoji: '🤝', name: 'Pin coletivo', condition: 'Em breve', check: () => false },
]

export default function BadgeGrid({ seenIds, profile, sightings }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-1)' }}>
        Conquistas
      </h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 8,
      }}>
        {badges.map(badge => {
          const earned = badge.check(seenIds, profile, sightings)
          return (
            <div
              key={badge.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                padding: 10,
                borderRadius: 'var(--r-md)',
                background: earned ? 'var(--accent-dim)' : 'var(--bg-card)',
                opacity: earned ? 1 : 0.38,
                filter: earned ? 'none' : 'grayscale(1)',
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
            </div>
          )
        })}
      </div>
    </div>
  )
}
