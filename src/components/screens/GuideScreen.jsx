import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { TIER_LABELS, TIER_COLORS, DANGER_CONFIG, LEVELS, ANIMALS as FALLBACK_ANIMALS } from '../../lib/constants'
import FlipCard from '../guide/FlipCard'

export default function GuideScreen() {
  const [showManual, setShowManual] = useState(false)
  const [animals, setAnimals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function fetchAnimals() {
      setLoading(true)
      setError(null)
      try {
        const { data, error } = await supabase
          .from('animals')
          .select('*')
          .eq('is_active', true)
          .order('id', { ascending: true })
        if (!cancelled) {
          if (error) throw error
          setAnimals(data?.length ? data : FALLBACK_ANIMALS)
        }
      } catch (err) {
        if (!cancelled) {
          console.warn('Failed to fetch animals from Supabase, using fallback:', err.message)
          setAnimals(FALLBACK_ANIMALS)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchAnimals()
    return () => { cancelled = true }
  }, [])

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
        <div style={{ marginBottom: 4, animation: 'fadeUp .4s var(--ease-spring)' }}>
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
            {loading
              ? 'Carregando espécies...'
              : `${animals.length} espécies catalogadas · Toque nos cards para virar`
            }
          </p>
        </div>

        <button onClick={() => setShowManual(true)} style={{
          width: '100%',
          padding: '16px 20px',
          borderRadius: 'var(--r-xl)',
          background: 'var(--accent-dim)',
          backdropFilter: 'var(--glass-blur)',
          WebkitBackdropFilter: 'var(--glass-blur)',
          border: '0.5px solid var(--accent)',
          color: 'var(--accent)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          transition: 'all .25s var(--ease-spring)',
          fontSize: 15,
          fontWeight: 700,
          animation: 'fadeUp .45s var(--ease-spring)',
        }}>
          <span style={{ fontSize: 28 }}>📖</span>
          <div style={{ textAlign: 'left' }}>
            <div>Manual do Explorador</div>
            <div style={{ fontSize: 11, fontWeight: 400, opacity: 0.7, marginTop: 2 }}>
              Regras, dicas, tipos de avistamento e contribuição científica
            </div>
          </div>
        </button>

        {loading ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 10,
            paddingBottom: 20,
          }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{
                aspectRatio: '3 / 4',
                borderRadius: 'var(--r-lg)',
                background: 'var(--glass)',
                border: '0.5px solid var(--glass-border)',
                animation: `skeleton 1.5s ease-in-out infinite`,
                animationDelay: `${i * 0.1}s`,
              }} />
            ))}
          </div>
        ) : error ? (
          <div style={{
            padding: 20,
            textAlign: 'center',
            color: 'var(--coral)',
            background: 'var(--coral-dim)',
            borderRadius: 'var(--r-lg)',
            fontSize: 14,
          }}>
            {error}
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 10,
            paddingBottom: 20,
          }}>
            {animals.map((animal, index) => (
              <div key={animal.id} style={{ animation: `fadeUp .4s var(--ease-spring)`, animationDelay: `${index * 0.03}s` }}>
                <FlipCard animal={animal} />
              </div>
            ))}
          </div>
        )}
      </div>

      {showManual && (
        <div onClick={() => setShowManual(false)} style={{
          position: 'fixed',
          inset: 0,
          zIndex: 10000,
          background: 'rgba(0,0,0,.75)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
          animation: 'fadeIn .2s ease-out',
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: 'var(--glass-strong)',
            backdropFilter: 'var(--glass-blur-ultra)',
            WebkitBackdropFilter: 'var(--glass-blur-ultra)',
            borderRadius: 'var(--r-2xl)',
            maxHeight: '90%',
            width: '100%',
            maxWidth: 420,
            overflowY: 'auto',
            padding: 28,
            border: '0.5px solid var(--glass-border-light)',
            boxShadow: 'var(--shadow-xl)',
            animation: 'scaleIn .35s var(--ease-spring)',
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
                width: 32,
                height: 32,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--glass)',
                border: '0.5px solid var(--glass-border)',
                color: 'var(--text-3)',
                fontSize: 16,
                cursor: 'pointer',
                transition: 'all .2s',
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
                    <span style={{ fontSize: 13, color: 'var(--text-2)' }}>{animals.filter(a => a.tier === key).length} espécies</span>
                  </div>
                ))}
              </Section>

              <Section title="📋 Tipos de avistamento">
                <P>Cada avistamento tem um <strong>tipo</strong> que define os pontos ganhos:</P>
                {[
                  { type: '📸 Foto', desc: 'Foto do animal registrada', pts: '100% dos pts da espécie' },
                  { type: '👣 Pegada', desc: 'Foto da pegada (obrigatório)', pts: '60% dos pts da espécie' },
                  { type: '🚗 Atropelamento', desc: 'Comunicação de animal atropelado', pts: '50% dos pts da espécie' },
                  { type: '💬 Comunicação', desc: 'Relato apenas (sem foto)', pts: '30% dos pts da espécie (penalidade máxima)' },
                ].map(item => (
                  <div key={item.type} style={{
                    padding: '8px 12px',
                    borderRadius: 8,
                    background: 'var(--glass)',
                    marginBottom: 4,
                  }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)' }}>{item.type}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 1 }}>{item.desc}</div>
                    <div style={{ fontSize: 11, color: 'var(--accent)', marginTop: 1, fontWeight: 600 }}>{item.pts}</div>
                  </div>
                ))}
              </Section>

              <Section title="📸 Como registrar">
                <P>1. Escolha o <strong>tipo de avistamento</strong></P>
                <P>2. Tire ou selecione uma foto (obrigatória para Foto e Pegada)</P>
                <P>3. Selecione o animal correspondente na lista</P>
                <P>4. Adicione detalhes, data, localização e confirme</P>
                <P>5. Pronto! Os pontos já são creditados</P>
              </Section>

              <Section title="👣 Pegadas também valem!">
                <P>Não achou o animal, mas viu uma <strong>pegada</strong>? Registre! Os pesquisadores usam pegadas para mapear a presença de espécies.</P>
                <P>Só lembre de tirar uma <strong>foto nítida</strong> da pegada com algo pra escala (uma moeda, régua, etc).</P>
              </Section>

              <Section title="📊 Contribuição científica">
                <P>Os dados que você registra no MataGo são <strong>compartilhados com órgãos de preservação ambiental e pesquisadores</strong> da região da Mantiqueira.</P>
                <P>Seus avistamentos ajudam a:</P>
                <P>🌱 Mapear a distribuição das espécies</P>
                <P>⚠️ Identificar áreas de atropelamento</P>
                <P>📈 Monitorar populações ameaçadas</P>
                <P>🌍 Planejar ações de conservação</P>
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
