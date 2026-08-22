import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CodeBlock from '../components/CodeBlock';
import { Route as RouteIcon, Link2, ExternalLink, RefreshCw, AlertTriangle, ArrowRight } from 'lucide-react';

export default function RouterDemo() {
  const [inputText, setInputText] = useState('');

  const routerCode = `// Configuración típica de React Router en App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

export default function App() {
  return (
    <BrowserRouter>
      {/* 1. Barra de navegación usando <Link> en vez de <a> */}
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/perfil">Mi Perfil</Link>
      </nav>

      {/* 2. Definición del sistema de enrutamiento */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/perfil" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}`;

  return (
    <div style={{ textAlign: 'left' }}>
      <h1>
        <RouteIcon size={32} style={{ color: 'var(--primary)' }} />
        <span>Navegación con React Router</span>
      </h1>
      <p className="page-description">
        En las aplicaciones web tradicionales, hacer clic en un enlace solicita un nuevo archivo HTML completo al servidor, causando una recarga total de la pantalla. React Router soluciona esto permitiendo crear Single Page Applications (SPAs): páginas donde el contenido cambia al instante sin recargar el navegador.
      </p>

      <div className="grid-2">
        {/* Comparison Experiment */}
        <div className="card">
          <h2 className="card-title">
            <RefreshCw size={18} />
            <span>Experimento: ¿Recarga o Transición?</span>
          </h2>
          <p className="card-desc">
            Prueba cómo se comporta la memoria de la aplicación. Escribe algo en la caja de abajo y luego haz clic en los enlaces de comparación.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Memory box */}
            <div className="form-group">
              <label className="form-label">Escribe un texto de prueba (Memoria Volátil):</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Escribe algo aquí..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Si la página se recarga, este texto se borrará y el contador de cargas del sidebar aumentará.
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* HTML anchor comparison */}
              <div className="interactive-playground" style={{ borderColor: 'var(--error)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ExternalLink size={16} style={{ color: 'var(--error)' }} />
                    <strong style={{ fontSize: '14px' }}>Método Tradicional: etiqueta {"<a>"}</strong>
                  </div>
                  <span className="badge btn-danger" style={{ fontSize: '9px' }}>Destructivo</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  Envía una solicitud HTTP al servidor, descarga todo de nuevo, borrando el estado actual de React.
                </p>
                <a 
                  href="/conditional-rendering" 
                  className="btn btn-danger"
                  style={{ alignSelf: 'flex-start', textDecoration: 'none' }}
                >
                  Ir a Renderizado con {"<a>"}
                </a>
              </div>

              {/* React Router Link comparison */}
              <div className="interactive-playground" style={{ borderColor: 'var(--success)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Link2 size={16} style={{ color: 'var(--success)' }} />
                    <strong style={{ fontSize: '14px' }}>Método React Router: componente {"<Link>"}</strong>
                  </div>
                  <span className="badge badge-secondary" style={{ fontSize: '9px', backgroundColor: 'var(--success-glow)', color: 'var(--success)', border: '1px solid rgba(16,185,129,0.3)' }}>Optimizada (SPA)</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  Intercepta el clic, actualiza la barra de direcciones y renderiza el nuevo componente al instante sin recargar.
                </p>
                <Link 
                  to="/conditional-rendering" 
                  className="btn btn-secondary"
                  style={{ alignSelf: 'flex-start', color: 'var(--success)', borderColor: 'rgba(16,185,129,0.3)', backgroundColor: 'var(--success-glow)' }}
                >
                  Ir a Renderizado con {"<Link>"}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Conceptual analysis */}
        <div className="card">
          <h2 className="card-title">
            <RouteIcon size={18} />
            <span>Conceptos Clave del Enrutador</span>
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14px', lineHeight: '1.6' }}>
            <div>
              <strong style={{ color: 'var(--primary)' }}>Route y Routes:</strong>
              <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>
                <code>Routes</code> es el contenedor que evalúa la dirección URL. Cada <code>Route</code> define una ruta específica (<code>path</code>) y qué componente de React debe mostrarse (<code>element</code>).
              </p>
            </div>

            <div>
              <strong style={{ color: 'var(--primary)' }}>El problema de la etiqueta {"<a>"}:</strong>
              <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>
                Al usar <code>{"<a href=\"/ruta\">"}</code>, el navegador desecha todo el código JavaScript compilado de React que está en ejecución en memoria y recarga la pestaña completa.
              </p>
            </div>

            <div>
              <strong style={{ color: 'var(--primary)' }}>El poder de {"<Link to=\"/ruta\">"}:</strong>
              <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>
                React Router previene la acción por defecto del clic con <code>event.preventDefault()</code> y utiliza la API <code>history.pushState</code> de HTML5 para cambiar la URL simulando una navegación nativa rápida.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <CodeBlock code={routerCode} title="AppRouter.jsx" />
          </div>
        </div>
      </div>
    </div>
  );
}
