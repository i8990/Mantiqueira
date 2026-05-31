import useAuth from './hooks/useAuth'
import AuthPage from './pages/AuthPage'
import MainApp from './pages/MainApp'

function Splash() {
  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      background: 'var(--bg-deep)',
    }}>
      <span style={{ fontSize: 48 }}>🌿</span>
      <p style={{
        fontFamily: 'var(--font-d)',
        fontStyle: 'italic',
        fontWeight: 300,
        fontSize: 16,
        color: 'var(--text-3)',
      }}>
        Carregando...
      </p>
    </div>
  )
}

export default function App() {
  const { session, loading } = useAuth()

  if (loading) return <Splash />
  if (!session) return <AuthPage />
  return <MainApp session={session} />
}
