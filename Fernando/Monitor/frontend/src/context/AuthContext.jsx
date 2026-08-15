import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import api from '../services/api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function restoreSession() {
      try {
        const { data } = await api.get('/api/auth/me')
        setUser(data)
      } catch {
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }
    restoreSession()
  }, [])

  async function login(credentials) {
    const { data } = await api.post('/api/auth/login', credentials)
    setUser(data)
    return data
  }

  async function logout() {
    try {
      await api.post('/api/auth/logout')
    } finally {
      setUser(null)
    }
  }

  const value = useMemo(() => ({ user, isLoading, login, logout }), [user, isLoading])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return context
}
