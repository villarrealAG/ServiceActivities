import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth()
  if (isLoading) return <main className="auth-page">Comprobando sesión…</main>
  if (!user) return <Navigate to="/login" replace />
  return children
}
