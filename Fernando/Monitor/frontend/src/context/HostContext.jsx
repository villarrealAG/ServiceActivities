import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useAuth } from './AuthContext.jsx'
import api from '../services/api.js'

const HostContext = createContext(null)

export function HostProvider({ children }) {
  const { user } = useAuth()
  const [hosts, setHosts] = useState([])
  const [selectedHostId, setSelectedHostId] = useState('')
  const [isLoadingHosts, setIsLoadingHosts] = useState(false)
  const [hostsError, setHostsError] = useState('')

  const reloadHosts = useCallback(async () => {
    if (!user) {
      setHosts([])
      setSelectedHostId('')
      return
    }

    setIsLoadingHosts(true)
    try {
      const { data } = await api.get('/api/hosts')
      setHosts(data)
      setSelectedHostId(current => data.some(host => String(host.id) === current) ? current : (data[0] ? String(data[0].id) : ''))
      setHostsError(data.length ? '' : 'No tienes hosts disponibles para monitorear.')
    } catch (error) {
      setHosts([])
      setSelectedHostId('')
      setHostsError(error.response?.data?.error || 'No fue posible cargar los hosts.')
    } finally {
      setIsLoadingHosts(false)
    }
  }, [user])

  useEffect(() => { reloadHosts() }, [reloadHosts])

  const value = useMemo(() => ({
    hosts,
    selectedHostId,
    setSelectedHostId,
    isLoadingHosts,
    hostsError,
    reloadHosts,
  }), [hosts, selectedHostId, isLoadingHosts, hostsError, reloadHosts])

  return <HostContext.Provider value={value}>{children}</HostContext.Provider>
}

export function useHosts() {
  const context = useContext(HostContext)
  if (!context) throw new Error('useHosts debe usarse dentro de HostProvider')
  return context
}
