import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Dashboard() {
  const navigate = useNavigate()
  const { logout, user } = useAuth()

  async function handleLogout() {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <main className="dashboard-page">
      <section className="dashboard-card">
        <p className="eyebrow">Sesión iniciada</p>
        <h1>Dashboard</h1>
        <p>Bienvenido, {user.username}. La sesión se mantiene al recargar la página.</p>
        <button type="button" onClick={handleLogout}>Cerrar sesión</button>
      </section>
    </main>
  )
}
