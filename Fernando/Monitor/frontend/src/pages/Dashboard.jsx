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
    x: { ticks: { maxTicksLimit: 6 } },
  },
  plugins: { legend: { display: false } },
}

function MetricChart({ label, color, samples, field }) {
  const values = samples.map(sample => sample[field])
  const data = {
    labels: samples.map(sample => new Date(`${sample.timestamp.replace(' ', 'T')}Z`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })),
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

function CombinedChart({ samples }) {
  const data = {
    labels: samples.map(sample => new Date(`${sample.timestamp.replace(' ', 'T')}Z`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })),
    datasets: [
      { label: 'CPU', data: samples.map(sample => sample.cpu), borderColor: '#ef4444', tension: 0.3 },
      { label: 'RAM', data: samples.map(sample => sample.ram), borderColor: '#3b82f6', tension: 0.3 },
      { label: 'Disco', data: samples.map(sample => sample.disk), borderColor: '#22c55e', tension: 0.3 },
    ],
  }

  return (
    <article className="metric-chart metric-chart--wide">
      <div className="metric-chart__heading"><h2>Uso combinado de recursos</h2></div>
      <div className="metric-chart__canvas"><Line options={{ ...chartOptions, plugins: { legend: { display: true } } }} data={data} /></div>
    </article>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { logout, user } = useAuth()
  const [samples, setSamples] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const { selectedHostId, isLoadingHosts, hostsError } = useHosts()

  const fetchMetrics = useCallback(async (id) => {
    if (!id) return
    try {
      const { data } = await api.get('/api/metrics', { params: { host_id: id } })
      setSamples(current => [...current, data].slice(-MAX_SAMPLES))
      setError('')
    } catch (requestError) {
      setError(requestError.response?.data?.error || 'No fue posible actualizar las métricas.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!selectedHostId) {
      setSamples([])
      setIsLoading(isLoadingHosts)
      return
    }
    setSamples([])
    setIsLoading(true)
    fetchMetrics(selectedHostId)
    const interval = window.setInterval(() => fetchMetrics(selectedHostId), REFRESH_MS)
    return () => window.clearInterval(interval)
  }, [selectedHostId, fetchMetrics, isLoadingHosts])

  async function handleLogout() {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <main className="dashboard-page">
      <section className="dashboard-card dashboard-card--wide">
        <header className="dashboard-header">
          <div><p className="eyebrow">Monitor en vivo</p><h1>Bienvenido, {user.username}</h1></div>
          <button type="button" className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
        </header>

        <HostSelector />

        {(error || hostsError) && <p className="form-error" role="alert">{error || hostsError}</p>}
        {isLoading && !samples.length ? <p className="dashboard-status">Obteniendo métricas…</p> : (
          <div className="charts-grid">
            <MetricChart label="CPU" color="#38bdf8" samples={samples} field="cpu" />
            <MetricChart label="Memoria RAM" color="#a78bfa" samples={samples} field="ram" />
            <MetricChart label="Disco" color="#34d399" samples={samples} field="disk" />
            <CombinedChart samples={samples} />
          </div>
        )}
        <p className="dashboard-status">Actualización automática cada 10 segundos. Se muestran las últimas {MAX_SAMPLES} lecturas.</p>
      </section>
    </main>
  )
}
