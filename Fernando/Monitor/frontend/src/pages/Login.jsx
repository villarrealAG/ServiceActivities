import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)
    try {
      await login({ username, password })
      navigate('/dashboard', { replace: true })
    } catch (requestError) {
      if (requestError.response?.status === 401) setError('Usuario o contraseña incorrectos.')
      else if (requestError.response?.data?.error) setError(requestError.response.data.error)
      else setError('No fue posible conectar con el servidor.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="auth-page">
      <section className="login-card" aria-labelledby="login-title">
        <p className="eyebrow">Sistema Monitor</p>
        <h1 id="login-title">Iniciar sesión</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Usuario</label>
          <input id="username" name="username" autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} required />
          <label htmlFor="password">Contraseña</label>
          <input id="password" name="password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          {error && <p className="form-error" role="alert">{error}</p>}
          <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Ingresando…' : 'Ingresar'}</button>
        </form>
      </section>
    </main>
  )
}
