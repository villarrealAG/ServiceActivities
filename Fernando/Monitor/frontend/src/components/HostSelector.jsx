import { useHosts } from '../context/HostContext.jsx'

export default function HostSelector() {
  const { hosts, selectedHostId, setSelectedHostId, isLoadingHosts } = useHosts()

  return (
    <label className="host-selector">
      Equipo a monitorear
      <select
        value={selectedHostId}
        onChange={event => setSelectedHostId(event.target.value)}
        disabled={isLoadingHosts || !hosts.length}
      >
        {hosts.map(host => (
          <option key={host.id} value={host.id}>
            {host.name}{host.ip_address ? ` (${host.ip_address})` : ''}
          </option>
        ))}
      </select>
    </label>
  )
}
