import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import useAuth from '../hooks/useAuth'
import { TIER_LABELS, TIER_COLORS, DANGER_CONFIG, LEVELS } from '../lib/constants'
import Button from '../components/ui/Button'

export default function AuthPage() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [autoUsername, setAutoUsername] = useState('')
  const [focusedField, setFocusedField] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [userCount, setUserCount] = useState(0)
  const [showManual, setShowManual] = useState(false)

  const { signIn, signUp, signInWithGoogle } = useAuth()
  const [googleLoading, setGoogleLoading] = useState(false)

  useEffect(() => {
    supabase
      .from('profiles')
      .select('id', { count: 'exact', head: true })
      .then(({ count }) => {
        if (count !== null) setUserCount(count)
      })
      .catch(() => {})
  }, [])

  const generateUsernamePreview = (val) => {
    if (!val || val.length < 2) { setAutoUsername(''); return }
    const base = val
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '')
      .slice(0, 20)
    setAutoUsername(base || 'explorador')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    if (mode === 'login') {
      const { error } = await signIn(email, password)
      if (error) setError(error.message)
    } else {
      if (password.length < 8) {
        setError('Senha deve ter no mínimo 8 caracteres')
        setLoading(false)
        return
      }
      if (!name || name.trim().length < 3) {
        setError('Nome deve ter no mínimo 3 caracteres')
        setLoading(false)
        return
      }
      const { error } = await signUp(email, password, name)
      if (error) {
        setError(error.message)
      } else {
        setSuccess('Verifique seu email para confirmar o cadastro')
      }
    }
    setLoading(false)
  }

  return (
    <div style={{
      height: '100dvh',
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch',
    }}>
      <div style={{
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-deep)',
        padding: 'calc(env(safe-area-inset-top, 0px) + 40px) 24px calc(env(safe-area-inset-bottom, 0px) + 24px)',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          top: -80,
          right: -80,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent-dim) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: -60,
          left: -60,
          width: 160,
          height: 160,
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--amber-dim) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ textAlign: 'center', marginBottom: 32, zIndex: 1, animation: 'fadeUp .5s var(--ease-spring)' }}>
          <div style={{
            width: 80,
            height: 80,
            borderRadius: 24,
            background: 'var(--glass-strong)',
            backdropFilter: 'var(--glass-blur-ultra)',
            WebkitBackdropFilter: 'var(--glass-blur-ultra)',
            border: '0.5px solid var(--glass-border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            fontSize: 36,
            boxShadow: 'var(--shadow-lg)',
          }}>
            🌿
          </div>
          <h1 style={{
            fontFamily: 'var(--font-d)',
            fontWeight: 700,
            fontSize: 32,
            color: 'var(--text-1)',
            letterSpacing: '-0.02em',
          }}>
            MataGo
          </h1>
          <p style={{
            fontFamily: 'var(--font-d)',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 18,
            color: 'var(--accent)',
            marginTop: -2,
          }}>
            da Mantiqueira
          </p>
          <p style={{
            fontSize: 13,
            color: 'var(--text-3)',
            marginTop: 8,
          }}>
            Registre, descubra e proteja a fauna da Serra
          </p>
          {userCount > 0 && (
            <p style={{
              fontSize: 13,
              color: 'var(--accent)',
              fontWeight: 600,
              marginTop: 12,
              background: 'var(--accent-dim)',
              padding: '6px 14px',
              borderRadius: 999,
              display: 'inline-block',
            }}>
              🌿 Já somos <strong>{userCount}</strong> {userCount === 1 ? 'explorador' : 'exploradores'} compartilhando dados
            </p>
          )}
        </div>

        <div style={{
          width: '100%',
          maxWidth: 360,
          zIndex: 1,
          animation: 'fadeUp .6s var(--ease-spring)',
        }}>
          <button
            onClick={() => setShowManual(true)}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: 'var(--r-md)',
              background: 'var(--glass)',
              backdropFilter: 'var(--glass-blur)',
              WebkitBackdropFilter: 'var(--glass-blur)',
              border: '0.5px solid var(--glass-border)',
              color: 'var(--accent)',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 20,
              transition: 'all .25s var(--ease-spring)',
            }}
          >
            <span style={{ fontSize: 22 }}>📖</span>
            <div style={{ textAlign: 'left' }}>
              <div>Conheça o MataGo</div>
              <div style={{ fontSize: 11, fontWeight: 400, color: 'var(--text-3)', marginTop: 1 }}>
                Como funciona, tipos de registro, dicas e regras
              </div>
            </div>
          </button>

          <div style={{
            width: '100%',
            display: 'flex',
            gap: 0,
            marginBottom: 24,
            background: 'var(--glass-strong)',
            backdropFilter: 'var(--glass-blur)',
            WebkitBackdropFilter: 'var(--glass-blur)',
            borderRadius: 'var(--r-md)',
            padding: 3,
            border: '0.5px solid var(--glass-border-light)',
          }}>
            {['login', 'register'].map(m => {
              const isActive = mode === m
              return (
                <button
                  key={m}
                  onClick={() => { setMode(m); setError(''); setSuccess('') }}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: 'var(--r-sm)',
                    border: 'none',
                    background: isActive ? 'var(--accent)' : 'transparent',
                    color: isActive ? '#060D07' : 'var(--text-3)',
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: 'pointer',
                    transition: 'all .25s var(--ease-spring)',
                    boxShadow: isActive ? '0 2px 12px var(--accent-glow)' : 'none',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                >
                  {m === 'login' ? 'Entrar' : 'Criar conta'}
                </button>
              )
            })}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {mode === 'register' && (
              <div>
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={e => {
                    setName(e.target.value)
                    generateUsernamePreview(e.target.value)
                  }}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: 'var(--r-md)',
                    background: 'var(--glass)',
                    backdropFilter: 'var(--glass-blur)',
                    WebkitBackdropFilter: 'var(--glass-blur)',
                    borderColor: focusedField === 'name' ? 'var(--accent)' : 'var(--glass-border)',
                    borderStyle: 'solid',
                    borderWidth: '0.5px',
                    color: 'var(--text-1)',
                    fontSize: 16,
                    outline: 'none',
                    transition: 'border-color .2s var(--ease-apple)',
                  }}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                />
                {autoUsername && (
                  <span style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 4, display: 'block' }}>
                    @{autoUsername}
                  </span>
                )}
              </div>
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: 'var(--r-md)',
                background: 'var(--glass)',
                backdropFilter: 'var(--glass-blur)',
                WebkitBackdropFilter: 'var(--glass-blur)',
                borderColor: focusedField === 'email' ? 'var(--accent)' : 'var(--glass-border)',
                borderStyle: 'solid',
                borderWidth: '0.5px',
                color: 'var(--text-1)',
                fontSize: 16,
                outline: 'none',
                transition: 'border-color .2s var(--ease-apple)',
              }}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
            />
            <input
              type="password"
              placeholder="Senha (mín. 8 caracteres)"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={8}
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: 'var(--r-md)',
                background: 'var(--glass)',
                backdropFilter: 'var(--glass-blur)',
                WebkitBackdropFilter: 'var(--glass-blur)',
                borderColor: focusedField === 'password' ? 'var(--accent)' : 'var(--glass-border)',
                borderStyle: 'solid',
                borderWidth: '0.5px',
                color: 'var(--text-1)',
                fontSize: 16,
                outline: 'none',
                transition: 'border-color .2s var(--ease-apple)',
              }}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
            />

            {error && (
              <p style={{ color: 'var(--coral)', fontSize: 13, textAlign: 'center', background: 'var(--coral-dim)', padding: '8px 12px', borderRadius: 'var(--r-sm)', border: '0.5px solid var(--coral)' }}>
                {error}
              </p>
            )}
            {success && (
              <p style={{ color: 'var(--accent)', fontSize: 13, textAlign: 'center', background: 'var(--accent-dim)', padding: '8px 12px', borderRadius: 'var(--r-sm)', border: '0.5px solid var(--accent)' }}>
                {success}
              </p>
            )}

            <Button
              type="submit"
              fullWidth
              disabled={loading}
              style={{ marginTop: 4 }}
            >
              {loading ? 'Carregando...' : mode === 'login' ? 'Entrar' : 'Criar conta'}
            </Button>
          </form>

          <div style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            margin: '16px 0',
          }}>
            <div style={{ flex: 1, height: 0.5, background: 'var(--glass-border-light)' }} />
            <span style={{ fontSize: 12, color: 'var(--text-3)' }}>— ou —</span>
            <div style={{ flex: 1, height: 0.5, background: 'var(--glass-border-light)' }} />
          </div>

          <Button
            variant="glass"
            fullWidth
            leftIcon="🔵"
            onClick={async () => {
              setError('')
              setGoogleLoading(true)
              const { error } = await signInWithGoogle()
              if (error) {
                setError(error.message)
                setGoogleLoading(false)
              }
            }}
            disabled={googleLoading}
          >
            {googleLoading ? 'Carregando...' : 'Entrar com Google'}
          </Button>
        </div>
      </div>

      {showManual && (
        <div onClick={() => setShowManual(false)} style={{
          position: 'fixed', inset: 0, zIndex: 10000,
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
            borderRadius: 'var(--r-2xl)',
            maxHeight: '90%', width: '100%', maxWidth: 420,
            overflowY: 'auto', padding: 28,
            border: '0.5px solid var(--glass-border-light)',
            boxShadow: 'var(--shadow-xl)', animation: 'scaleIn .35s var(--ease-spring)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: 20, color: 'var(--text-1)' }}>
                📖 Manual do Explorador
              </h3>
              <button onClick={() => setShowManual(false)} style={{
                width: 32, height: 32, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'var(--glass)', border: '0.5px solid var(--glass-border)',
                color: 'var(--text-3)', fontSize: 16, cursor: 'pointer',
              }}>
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <Section title="🎯 Como funciona">
                <P>O <strong>MataGo</strong> transforma suas saídas a campo em uma caça ao tesouro da vida real. Sempre que encontrar um animal silvestre, registre no app para ganhar pontos e subir de nível.</P>
                <P>Cada registro vale pontos de acordo com a <strong>raridade (tier)</strong> do animal. Os pontos mudam conforme o tipo de avistamento, qualidade dos dados preenchidos e se é a primeira vez que você registra aquela espécie.</P>
              </Section>

              <Section title="📋 Tipos de avistamento">
                <P>📸 <strong>Foto</strong> — 100% dos pts base</P>
                <P>👣 <strong>Pegada</strong> — 60% dos pts base</P>
                <P>🚗 <strong>Atropelamento</strong> — 40% dos pts base (dado importante para pesquisa)</P>
                <P>💬 <strong>Comunicação</strong> — 20% dos pts base (relato sem foto)</P>
              </Section>

              <Section title="⭐ Níveis">
                <P>Quanto mais pontos, mais sobe de nível e libera recompensas:</P>
                {LEVELS.map((l, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between',
                    padding: '4px 8px', borderRadius: 6,
                    background: 'var(--glass)', marginBottom: 3, fontSize: 12,
                  }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-1)' }}>{l.name}</span>
                    <span style={{ color: 'var(--text-3)' }}>{l.min}+ pts</span>
                  </div>
                ))}
              </Section>

              <Section title="⚠️ Segurança">
                {Object.entries(DANGER_CONFIG).map(([key, d]) => (
                  <div key={key} style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '6px 10px', borderRadius: 8,
                    background: 'var(--glass)', marginBottom: 4,
                  }}>
                    <span>{d.emoji}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: d.color }}>{d.label}</span>
                  </div>
                ))}
              </Section>

              <Section title="🛡️ Regras">
                <P>🔹 Não toque em animais silvestres</P>
                <P>🔹 Mantenha distância segura ao fotografar</P>
                <P>🔹 Não alimente os animais</P>
                <P>🔹 Registre apenas fotos reais (nada de IA)</P>
                <P>🔹 Só vale animal silvestre (doméstico não conta)</P>
              </Section>

              <Section title="💡 Dicas">
                <P>🌅 Saia de manhã cedo e no fim da tarde</P>
                <P>🌧️ Depois da chuva muitos animais ficam mais ativos</P>
                <P>🤫 Fique em silêncio andando devagar</P>
                <P>📱 Tire a foto antes de o animal fugir</P>
                <P>🗺️ Explore áreas diferentes (mata, campo, rio)</P>
              </Section>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div>
      <h4 style={{ fontSize: 15, fontWeight: 600, color: 'var(--accent)', marginBottom: 8 }}>{title}</h4>
      {children}
    </div>
  )
}

function P({ children }) {
  return (
    <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5, marginBottom: 6 }}>{children}</p>
  )
}
