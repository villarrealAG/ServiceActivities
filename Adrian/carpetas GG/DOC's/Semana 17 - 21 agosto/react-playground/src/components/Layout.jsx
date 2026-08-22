import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  Flame, 
  LayoutDashboard, 
  ToggleLeft, 
  ShieldAlert, 
  Database, 
  Route as RouteIcon, 
  FolderTree, 
  RefreshCw 
} from 'lucide-react';

// This executes ONCE per full browser load
let hardRefreshCount = parseInt(sessionStorage.getItem('hard_refreshes') || '0', 10);
if (!sessionStorage.getItem('session_active')) {
  // First time in this session, reset or start
  hardRefreshCount = 1;
  sessionStorage.setItem('session_active', 'true');
} else {
  hardRefreshCount += 1;
}
sessionStorage.setItem('hard_refreshes', hardRefreshCount.toString());

export default function Layout() {
  const [loadTime, setLoadTime] = useState('');

  useEffect(() => {
    const now = new Date();
    setLoadTime(now.toLocaleTimeString());
  }, []);

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="brand">
            <Flame className="tree-icon" size={24} fill="var(--primary)" />
            <span>React Learning Hub</span>
          </div>
          <span className="brand-subtitle">Playground Interactivo v1.0</span>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
            <LayoutDashboard size={18} />
            <span>Dashboard Overview</span>
          </NavLink>
          
          <NavLink to="/conditional-rendering" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <ToggleLeft size={18} />
            <span>Renderizado Condicional</span>
          </NavLink>

          <NavLink to="/try-catch" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <ShieldAlert size={18} />
            <span>Manejo de Errores</span>
          </NavLink>

          <NavLink to="/local-storage" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <Database size={18} />
            <span>localStorage y Estado</span>
          </NavLink>

          <NavLink to="/router-demo" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <RouteIcon size={18} />
            <span>Navegación Router</span>
          </NavLink>

          <NavLink to="/folder-structure" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <FolderTree size={18} />
            <span>Estructura de Carpetas</span>
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="refresh-indicator">
            <RefreshCw size={16} className="spinner-cyan" style={{ animationDuration: '3s' }} />
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Cargas Reales (F5):</div>
              <div style={{ fontWeight: '700', fontSize: '15px' }}>{hardRefreshCount} veces</div>
            </div>
          </div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '8px', textAlign: 'center' }}>
            Última carga: {loadTime}
          </div>
        </div>
      </aside>

      {/* Main Viewport Content */}
      <main className="main-content">
        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
