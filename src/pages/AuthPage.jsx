import { useState } from 'react'
import useAuth from '../hooks/useAuth'
import Button from '../components/ui/Button'

export default function AuthPage() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const { signIn, signUp, signInWithGoogle } = useAuth()

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
      const { error } = await signUp(email, password, username)
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
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-deep)',
      padding: '0 24px',
    }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>🌿</div>
        <h1 style={{
          fontFamily: 'var(--font-d)',
          fontWeight: 700,
          fontSize: 32,
          color: 'var(--text-1)',
        }}>
          Guardião
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
        display: 'flex',
        gap: 0,
        marginBottom: 24,
        background: 'var(--bg-card)',
        borderRadius: 'var(--r-md)',
        padding: 3,
      }}>
        <button
          onClick={() => { setMode('login'); setError(''); setSuccess('') }}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: 'var(--r-sm)',
            border: 'none',
            background: mode === 'login' ? 'var(--accent)' : 'transparent',
            color: mode === 'login' ? '#060D07' : 'var(--text-3)',
            fontWeight: 600,
            fontSize: 14,
            cursor: 'pointer',
            transition: 'all .15s',
          }}
        >
          Entrar
        </button>
        <button
          onClick={() => { setMode('register'); setError(''); setSuccess('') }}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: 'var(--r-sm)',
            border: 'none',
            background: mode === 'register' ? 'var(--accent)' : 'transparent',
            color: mode === 'register' ? '#060D07' : 'var(--text-3)',
            fontWeight: 600,
            fontSize: 14,
            cursor: 'pointer',
            transition: 'all .15s',
          }}
        >
          Criar conta
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {mode === 'register' && (
          <input
            type="text"
            placeholder="@guardiao_nome"
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 16px',
              borderRadius: 'var(--r-md)',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              color: 'var(--text-1)',
              fontSize: 14,
              outline: 'none',
            }}
          />
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
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            color: 'var(--text-1)',
            fontSize: 14,
            outline: 'none',
          }}
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
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            color: 'var(--text-1)',
            fontSize: 14,
            outline: 'none',
          }}
        />

        {error && (
          <p style={{ color: 'var(--coral)', fontSize: 13, textAlign: 'center' }}>
            {error}
          </p>
        )}
        {success && (
          <p style={{ color: 'var(--accent)', fontSize: 13, textAlign: 'center' }}>
            {success}
          </p>
        )}

        <Button
          type="submit"
          fullWidth
          disabled={loading}
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
        <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        <span style={{ fontSize: 12, color: 'var(--text-3)' }}>— ou —</span>
        <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>

      <Button
        variant="secondary"
        fullWidth
        leftIcon="🔵"
        onClick={signInWithGoogle}
      >
        Entrar com Google
      </Button>
    </div>
  )
}
