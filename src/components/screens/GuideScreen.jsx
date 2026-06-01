import { useState } from 'react'
import { ANIMALS, TIER_LABELS, TIER_COLORS, DANGER_CONFIG, LEVELS } from '../../lib/constants'
import FlipCard from '../guide/FlipCard'

const FILTERS = [
  { key: 'all', label: 'Todos' },
  { key: 'critico', label: '🔴 Crítico' },
  { key: 'alto', label: '🟠 Alto' },
  { key: 'medio', label: '🟡 Médio' },
  { key: 'baixo', label: '🟢 Baixo' },
  { key: 'inofensivo', label: '⚪ Inofensivo' },
]

export default function GuideScreen() {
  const [filter, setFilter] = useState('all')
  const [showManual, setShowManual] = useState(false)

  const filtered = filter === 'all'
    ? ANIMALS
    : ANIMALS.filter(a => a.danger === filter)

  return (
    <>
      <div style={{
        padding: '20px 16px',
        height: '100%',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}>
        <div style={{ marginBottom: 4 }}>
          <h2 style={{
            fontFamily: 'var(--font-d)',
            fontWeight: 700,
            fontSize: 24,
            color: 'var(--text-1)',
            letterSpacing: '-0.02em',
          }}>
            Guia de Campo
          </h2>
          <p style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 2 }}>
            {ANIMALS.length} espécies catalogadas · Toque nos cards para virar
          </p>
        </div>

        <button onClick={() => setShowManual(true)} style={{
          alignSelf: 'flex-start',
          padding: '10px 18px',
          borderRadius: 'var(--r-md)',
          fontSize: 13,
          fontWeight: 600,
          background: 'var(--glass)',
          backdropFilter: 'var(--glass-blur)',
          WebkitBackdropFilter: 'var(--glass-blur)',
          border: '0.5px solid var(--glass-border)',
          color: 'var(--accent)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          transition: 'all .2s var(--ease-apple)',
        }}>
          📖 Manual do Explorador
        </button>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 6,
        }}>
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              style={{
                padding: '7px 14px',
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 500,
                background: filter === f.key ? 'var(--accent-dim)' : 'var(--glass)',
                color: filter === f.key ? 'var(--accent)' : 'var(--text-3)',
                border: filter === f.key
                  ? '1px solid var(--accent)'
                  : '0.5px solid var(--glass-border)',
                cursor: 'pointer',
                transition: 'all .2s var(--ease-apple)',
                whiteSpace: 'nowrap',
                backdropFilter: filter === f.key ? undefined : 'var(--glass-blur)',
                WebkitBackdropFilter: filter === f.key ? undefined : 'var(--glass-blur)',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 10,
          paddingBottom: 100,
        }}>
          {filtered.map(animal => (
            <FlipCard key={animal.id} animal={animal} />
          ))}
        </div>
      </div>

      {showManual && (
        <div onClick={() => setShowManual(false)} style={{
          position: 'fixed',
          inset: 0,
          zIndex: 10000,
          background: 'rgba(0,0,0,.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: 'var(--bg-card)',
            borderRadius: 'var(--r-xl)',
            maxHeight: '90%',
            width: '100%',
            maxWidth: 420,
            overflowY: 'auto',
            padding: 24,
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20,
            }}>
              <h3 style={{
                fontFamily: 'var(--font-d)',
                fontWeight: 700,
                fontSize: 20,
                color: 'var(--text-1)',
              }}>
                📖 Manual do Explorador
              </h3>
              <button onClick={() => setShowManual(false)} style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-3)',
                fontSize: 20,
                cursor: 'pointer',
                padding: 4,
              }}>
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <Section title="🎯 Como funciona">
                <P>O <strong>MataGo</strong> transforma suas saídas a campo em uma caça ao tesouro da vida real. Sempre que encontrar um animal silvestre, registre no app para ganhar pontos e subir de nível.</P>
                <P>Cada registro vale pontos de acordo com a <strong>raridade (tier)</strong> do animal:</P>
                {Object.entries(TIER_LABELS).map(([key, label]) => (
                  <div key={key} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '6px 10px',
                    borderRadius: 8,
                    background: 'var(--glass)',
                    marginBottom: 4,
                  }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: TIER_COLORS[key] }}>{label}</span>
                    <span style={{ fontSize: 13, color: 'var(--text-2)' }}>{ANIMALS.filter(a => a.tier === key).length} espécies</span>
                  </div>
                ))}
              </Section>

              <Section title="📸 Como registrar">
                <P>1. Toque na aba <strong>Registrar</strong></P>
                <P>2. Tire uma foto do animal (pode ser da galeria)</P>
                <P>3. Selecione o animal correspondente na lista</P>
                <P>4. Adicione detalhes e confirme a localização</P>
                <P>5. Pronto! Os pontos já são creditados</P>
              </Section>

              <Section title="⭐ Níveis">
                <P>Quanto mais pontos você acumula, mais sobe de nível:</P>
                {LEVELS.map((l, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '5px 8px',
                    borderRadius: 6,
                    background: 'var(--glass)',
                    marginBottom: 3,
                    fontSize: 12,
                  }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-1)' }}>{l.name}</span>
                    <span style={{ color: 'var(--text-3)' }}>{l.min}+ pts</span>
                  </div>
                ))}
              </Section>

              <Section title="⚠️ Segurança em primeiro lugar">
                <P>Use a <strong>escala de perigo</strong> para saber como agir ao encontrar cada animal:</P>
                {Object.entries(DANGER_CONFIG).map(([key, d]) => (
                  <div key={key} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '6px 10px',
                    borderRadius: 8,
                    background: 'var(--glass)',
                    marginBottom: 4,
                  }}>
                    <span>{d.emoji}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: d.color }}>{d.label}</span>
                  </div>
                ))}
              </Section>

              <Section title="🛡️ Regras de conduta">
                <P>🔹 <strong>Não toque</strong> em animais silvestres — muitos são venenosos ou podem se sentir ameaçados</P>
                <P>🔹 <strong>Mantenha distância</strong> segura ao fotografar</P>
                <P>🔹 <strong>Não alimente</strong> os animais — isso altera o comportamento natural</P>
                <P>🔹 <strong>Não colete</strong> plantas, ovos ou animais</P>
                <P>🔹 Respeite as <strong>trilhas</strong> e áreas de preservação</P>
                <P>🔹 Registre apenas <strong>fotos reais</strong> — nada de IA ou imagens da internet</P>
                <P>🔹 Animal doméstico (gato, cachorro, galinha) <strong>não vale</strong> — só silvestres</P>
              </Section>

              <Section title="💡 Dicas">
                <P>🌅 Animais diferentes aparecem em <strong>horários diferentes</strong> — saia de manhã cedo e também no fim da tarde</P>
                <P>🌧️ Depois da chuva muitos animais ficam mais ativos</P>
                <P>🤫 Fique em silêncio e <strong>andando devagar</strong> para ter mais chances</P>
                <P>📱 Tire a foto <strong>antes</strong> de o animal fugir — você pode selecionar o animal depois</P>
                <P>🗺️ Explore <strong>áreas diferentes</strong> (mata, campo, rio) para encontrar espécies variadas</P>
              </Section>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function Section({ title, children }) {
  return (
    <div>
      <h4 style={{
        fontSize: 15,
        fontWeight: 600,
        color: 'var(--accent)',
        marginBottom: 8,
      }}>
        {title}
      </h4>
      {children}
    </div>
  )
}

function P({ children }) {
  return (
    <p style={{
      fontSize: 13,
      color: 'var(--text-2)',
      lineHeight: 1.5,
      marginBottom: 6,
    }}>
      {children}
    </p>
  )
}
