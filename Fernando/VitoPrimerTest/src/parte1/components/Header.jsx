export function Header() {
  return (
    <header className="app-header">
      <div className="brand">Mi App</div>
      <nav className="nav-links">
        <a href="#/parte1">Parte 1</a>
        <a href="#/parte2" style={{ color: '#00f2fe', fontWeight: 'bold' }}>Parte 2 →</a>
      </nav>
    </header>
  )
}
