import { useHosts } from '../context/HostContext.jsx'

export default function HostSelector() {
  const { hosts, selectedHostId, setSelectedHostId, isLoadingHosts } = useHosts()
  const currentHost = hosts.find(host => String(host.id) === String(selectedHostId))

  return (
    <div className="host-selector-wrapper">
      <label className="host-selector">
        Equipo a monitorear
        <select
          value={selectedHostId}
          onChange={event => setSelectedHostId(event.target.value)}
          disabled={isLoadingHosts || !hosts.length}
        >
          {hosts.map(host => (
            <option key={host.id} value={host.id}>
              {host.name} {host.ip_address ? `(${host.ip_address})` : ''}
            </option>
          ))}
        </select>
      </label>
      {currentHost && (
        <div className="host-info-bar">
          <span className={`status-badge ${Number(currentHost.is_active) ? 'status-badge--active' : 'status-badge--inactive'}`}>
            {Number(currentHost.is_active) ? '🟢 Activo' : '🔴 Inactivo'}
          </span>
          {currentHost.os && <span>SO: <strong>{currentHost.os}</strong></span>}
          {currentHost.ip_address && <span>IP: <strong>{currentHost.ip_address}</strong></span>}
        </div>
      )}
    </div>
  )
}

