import { useState } from 'react'
import { supabase } from '../lib/supabase'
import useAuth from '../hooks/useAuth'
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

  const { signIn, signUp, signInWithGoogle } = useAuth()
  const [googleLoading, setGoogleLoading] = useState(false)

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
        </div>

        <div style={{
          width: '100%',
          maxWidth: 360,
          zIndex: 1,
          animation: 'fadeUp .6s var(--ease-spring)',
        }}>
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
    </div>
  )
}
