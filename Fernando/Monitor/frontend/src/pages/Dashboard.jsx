import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { useAuth } from '../context/AuthContext.jsx'
import { useHosts } from '../context/HostContext.jsx'
import HostSelector from '../components/HostSelector.jsx'
import api from '../services/api.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const MAX_SAMPLES = 20
const REFRESH_MS = 10_000

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  scales: {
    y: { min: 0, max: 100, ticks: { callback: value => `${value}%` } },
    x: { ticks: { maxTicksLimit: 8 } },
  },
  plugins: { legend: { display: false } },
}

function formatLabelTime(timestampStr) {
  if (!timestampStr) return ''
  const parts = timestampStr.split(' ')
  if (parts.length === 2) {
    return parts[1] // Muestra HH:mm:ss
  }
  return timestampStr
}

function formatLabelDateTime(timestampStr) {
  if (!timestampStr) return ''
  return timestampStr // Muestra YYYY-MM-DD HH:mm:ss
}

function MetricChart({ label, color, samples, field }) {
  const values = samples.map(sample => Number(sample[field]) || 0)
  const data = {
    labels: samples.map(sample => formatLabelTime(sample.timestamp)),
    datasets: [{
      label,
      data: values,
      borderColor: color,
      backgroundColor: `${color}26`,
      fill: true,
      tension: 0.3,
    }],
  }

  const latest = values.at(-1)
  return (
    <article className="metric-chart">
      <div className="metric-chart__heading">
        <h2>{label}</h2>
        <strong>{latest === undefined ? '--' : `${latest.toFixed(1)}%`}</strong>
      </div>
      <div className="metric-chart__canvas"><Line options={chartOptions} data={data} /></div>
    </article>
  )
}

function CombinedChart({ samples, title = 'Uso combinado de recursos', isHistorical = false }) {
  const data = {
    labels: samples.map(sample => isHistorical ? formatLabelDateTime(sample.timestamp) : formatLabelTime(sample.timestamp)),
    datasets: [
      { label: 'CPU', data: samples.map(sample => Number(sample.cpu) || 0), borderColor: '#ef4444', tension: 0.3 },
      { label: 'RAM', data: samples.map(sample => Number(sample.ram) || 0), borderColor: '#3b82f6', tension: 0.3 },
      { label: 'Disco', data: samples.map(sample => Number(sample.disk) || 0), borderColor: '#22c55e', tension: 0.3 },
    ],
  }

  return (
    <article className="metric-chart metric-chart--wide">
      <div className="metric-chart__heading"><h2>{title}</h2></div>
      <div className="metric-chart__canvas">
        <Line options={{ ...chartOptions, plugins: { legend: { display: true } } }} data={data} />
      </div>
    </article>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { logout, user } = useAuth()
  const { selectedHostId, isLoadingHosts, hostsError } = useHosts()

  // Pestaña activa: 'live' | 'history'
  const [activeTab, setActiveTab] = useState('live')

  // Estado para monitoreo en vivo
  const [samples, setSamples] = useState([])
  const [isLoadingLive, setIsLoadingLive] = useState(true)

  // Estado para histórico
  const todayStr = new Date().toISOString().split('T')[0]
  const [fromDate, setFromDate] = useState(todayStr)
  const [toDate, setToDate] = useState(todayStr)
  const [historyData, setHistoryData] = useState([])
  const [isLoadingHistory, setIsLoadingHistory] = useState(false)
  const [historySearched, setHistorySearched] = useState(false)

  // Estado común
  const [isDownloadingReport, setIsDownloadingReport] = useState(false)
  const [error, setError] = useState('')

  // Carga métricas en tiempo real
  const fetchMetrics = useCallback(async (id) => {
    if (!id) return
    try {
      const { data } = await api.get('/api/metrics', { params: { host_id: id } })
      setSamples(current => [...current, data].slice(-MAX_SAMPLES))
      setError('')
    } catch (requestError) {
      setError(requestError.response?.data?.error || 'No fue posible actualizar las métricas.')
    } finally {
      setIsLoadingLive(false)
    }
  }, [])

  // Carga histórico por rango de fechas
  const fetchHistory = useCallback(async () => {
    if (!selectedHostId) return
    setIsLoadingHistory(true)
    setError('')
    try {
      const params = { host_id: selectedHostId }
      if (fromDate) params.from = fromDate
      if (toDate) params.to = toDate

      const { data } = await api.get('/api/history', { params })
      setHistoryData(data.data || [])
      setHistorySearched(true)
    } catch (requestError) {
      setError(requestError.response?.data?.error || 'No fue posible consultar el historial.')
    } finally {
      setIsLoadingHistory(false)
    }
  }, [selectedHostId, fromDate, toDate])

  // Efecto para monitoreo en vivo
  useEffect(() => {
    if (activeTab !== 'live') return
    if (!selectedHostId) {
      setSamples([])
      setIsLoadingLive(isLoadingHosts)
      return
    }
    setSamples([])
    setIsLoadingLive(true)
    fetchMetrics(selectedHostId)
    const interval = window.setInterval(() => fetchMetrics(selectedHostId), REFRESH_MS)
    return () => window.clearInterval(interval)
  }, [selectedHostId, fetchMetrics, isLoadingHosts, activeTab])

  // Efecto cuando cambia de host en la pestaña de histórico
  useEffect(() => {
    if (activeTab === 'history' && selectedHostId) {
      fetchHistory()
    }
  }, [selectedHostId, activeTab, fetchHistory])

  async function handleLogout() {
    await logout()
    navigate('/login', { replace: true })
  }

  async function handleDownloadReport() {
    if (!selectedHostId) return
    setIsDownloadingReport(true)
    setError('')
    try {
      const response = await api.get('/api/reports', {
        params: { host_id: selectedHostId },
        responseType: 'blob',
      })
      const downloadUrl = URL.createObjectURL(response.data)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = `reporte-host-${selectedHostId}.txt`
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(downloadUrl)
    } catch {
      setError('No fue posible descargar el reporte.')
    } finally {
      setIsDownloadingReport(false)
    }
  }

  // Cálculos estadísticos para histórico
  const historyStats = historyData.length ? {
    count: historyData.length,
    avgCpu: (historyData.reduce((acc, curr) => acc + Number(curr.cpu), 0) / historyData.length).toFixed(1),
    avgRam: (historyData.reduce((acc, curr) => acc + Number(curr.ram), 0) / historyData.length).toFixed(1),
    avgDisk: (historyData.reduce((acc, curr) => acc + Number(curr.disk), 0) / historyData.length).toFixed(1),
  } : null

  return (
    <main className="dashboard-page">
      <section className="dashboard-card dashboard-card--wide">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">Sistema Monitor</p>
            <h1>Bienvenido, {user.username}</h1>
          </div>
          <div className="dashboard-actions">
            <button type="button" onClick={handleDownloadReport} disabled={!selectedHostId || isDownloadingReport}>
              {isDownloadingReport ? 'Generando reporte...' : 'Descargar reporte TXT'}
            </button>
            <button type="button" className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
          </div>
        </header>

        <HostSelector />

        {/* Pestañas de Navegación */}
        <nav className="dashboard-nav">
          <button
            type="button"
            className={`nav-tab ${activeTab === 'live' ? 'nav-tab--active' : ''}`}
            onClick={() => setActiveTab('live')}
          >
            🔴 Monitoreo en Vivo
          </button>
          <button
            type="button"
            className={`nav-tab ${activeTab === 'history' ? 'nav-tab--active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            📅 Histórico por Fechas
          </button>
        </nav>

        {(error || hostsError) && <p className="form-error" role="alert">{error || hostsError}</p>}

        {/* VISTA 1: MONITOREO EN VIVO */}
        {activeTab === 'live' && (
          <>
            {isLoadingLive && !samples.length ? <p className="dashboard-status">Obteniendo métricas en tiempo real…</p> : (
              <div className="charts-grid">
                <MetricChart label="CPU" color="#38bdf8" samples={samples} field="cpu" />
                <MetricChart label="Memoria RAM" color="#a78bfa" samples={samples} field="ram" />
                <MetricChart label="Disco" color="#34d399" samples={samples} field="disk" />
                <CombinedChart samples={samples} />
              </div>
            )}
            <p className="dashboard-status">Actualización automática cada 10 segundos. Se muestran las últimas {MAX_SAMPLES} lecturas.</p>
          </>
        )}

        {/* VISTA 2: HISTÓRICO POR FECHAS */}
        {activeTab === 'history' && (
          <>
            <form className="history-filter-bar" onSubmit={(e) => { e.preventDefault(); fetchHistory(); }}>
              <div className="date-input-group">
                <label htmlFor="fromDate">Fecha Inicial</label>
                <input
                  id="fromDate"
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>

              <div className="date-input-group">
                <label htmlFor="toDate">Fecha Final</label>
                <input
                  id="toDate"
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>

              <button type="submit" disabled={isLoadingHistory || !selectedHostId}>
                {isLoadingHistory ? 'Buscando…' : 'Consultar Histórico'}
              </button>
            </form>

            {isLoadingHistory ? (
              <p className="dashboard-status">Cargando datos históricos del periodo seleccionando…</p>
            ) : historyData.length > 0 ? (
              <>
                <div className="history-stats-grid">
                  <div className="stat-card">
                    <span>Total Lecturas</span>
                    <strong>{historyStats.count}</strong>
                  </div>
                  <div className="stat-card">
                    <span>Promedio CPU</span>
                    <strong>{historyStats.avgCpu}%</strong>
                  </div>
                  <div className="stat-card">
                    <span>Promedio RAM</span>
                    <strong>{historyStats.avgRam}%</strong>
                  </div>
                  <div className="stat-card">
                    <span>Promedio Disco</span>
                    <strong>{historyStats.avgDisk}%</strong>
                  </div>
                </div>

                <CombinedChart samples={historyData} title="Histórico de uso de recursos" isHistorical={true} />
              </>
            ) : historySearched ? (
              <p className="dashboard-status">No se encontraron lecturas registradas para el rango de fechas seleccionado.</p>
            ) : (
              <p className="dashboard-status">Selecciona un rango de fechas y haz clic en "Consultar Histórico".</p>
            )}
          </>
        )}
      </section>
    </main>
  )
}

