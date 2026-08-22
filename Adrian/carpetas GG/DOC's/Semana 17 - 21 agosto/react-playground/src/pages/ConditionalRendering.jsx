import React, { useState } from 'react';
import CodeBlock from '../components/CodeBlock';
import { ToggleLeft, HelpCircle, Eye, EyeOff, Loader, RefreshCw, AlertCircle } from 'lucide-react';

export default function ConditionalRendering() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showDocs, setShowDocs] = useState(false);
  const [activeTab, setActiveTab] = useState('ternary');

  // Simulated API fetch trigger
  const handleSimulate = (stateType) => {
    setLoading(false);
    setError(false);
    
    if (stateType === 'loading') {
      setLoading(true);
    } else if (stateType === 'error') {
      setError(true);
    }
  };

  // Helper render function (Demonstrating IF/ELSE statement technique)
  const renderContentIf = () => {
    if (loading) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)' }}>
          <Loader className="spinner" size={20} />
          <span>Cargando datos del servidor...</span>
        </div>
      );
    }
    if (error) {
      return (
        <div className="alert alert-error" style={{ width: '100%' }}>
          <AlertCircle size={20} />
          <span>Error 500: Falló la conexión con el servidor de base de datos.</span>
        </div>
      );
    }
    return (
      <div className="alert alert-success" style={{ width: '100%' }}>
        <strong>¡Carga Exitosa!</strong> 15 registros cargados desde la API local de forma correcta.
      </div>
    );
  };

  // Code snippets for the tabs
  const codeTernary = `// 1. Operador Ternario (Ideal para elegir entre dos alternativas)
function ProfileCard({ loading, error, data }) {
  return (
    <div className="profile-container">
      {loading ? (
        <div className="spinner">Cargando...</div>
      ) : error ? (
        <div className="error-alert">Error al cargar datos</div>
      ) : (
        <div className="content">Bienvenido, {data.name}!</div>
      )}
    </div>
  );
}`;

  const codeAndOperator = `// 2. Operador Lógico && (Ideal para mostrar algo solo si se cumple una condición)
function Dashboard({ data }) {
  const [showDocs, setShowDocs] = useState(false);

  return (
    <div className="dashboard">
      <button onClick={() => setShowDocs(!showDocs)}>
        {showDocs ? 'Ocultar' : 'Mostrar'} Documentación
      </button>

      {/* Si showDocs es true, se renderiza la caja. Si es false, se ignora */}
      {showDocs && (
        <div className="docs-panel">
          <h3>Guía Rápida de Configuración</h3>
          <p>Instala la dependencia con: npm install react-router-dom</p>
        </div>
      )}
    </div>
  );
}`;

  const codeIfElse = `// 3. Estructura if/else (Fuera del JSX, mediante funciones auxiliares)
function DataView({ loading, error, data }) {
  // Función auxiliar para mantener limpio el JSX principal
  const renderStatus = () => {
    if (loading) return <Spinner />;
    if (error) return <ErrorBanner message={error.message} />;
    
    return <DataTable items={data} />;
  };

  return (
    <div className="data-wrapper">
      <header>Detalles de Transacciones</header>
      <div className="status-container">
        {renderStatus()}
      </div>
    </div>
  );
}`;

  return (
    <div style={{ textAlign: 'left' }}>
      <h1>
        <ToggleLeft size={32} style={{ color: 'var(--primary)' }} />
        <span>Renderizado Condicional en JSX</span>
      </h1>
      <p className="page-description">
        React no cuenta con directivas como <code>*ngIf</code> o <code>v-if</code>. En su lugar, utiliza lógica de JavaScript estándar directamente dentro de JSX para controlar qué elementos se muestran en el navegador según el estado actual.
      </p>

      <div className="grid-2">
        {/* Playground Controls */}
        <div className="card">
          <h2 className="card-title">
            <RefreshCw size={18} />
            <span>Laboratorio de Estados</span>
          </h2>
          <p className="card-desc">
            Interactúa con los controles para cambiar los estados de carga, error y visibilidad. Observa cómo cambia la interfaz inferior en respuesta instantánea.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Control 1: Simulación de API */}
            <div className="interactive-playground">
              <span className="playground-title">Simular Estado del Servidor</span>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button 
                  className={`btn ${loading ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => handleSimulate('loading')}
                >
                  {loading && <Loader className="spinner" size={14} style={{ marginRight: '4px', borderTopColor: '#fff' }} />}
                  Simular "Cargando..."
                </button>
                <button 
                  className={`btn ${error ? 'btn-danger' : 'btn-outline'}`}
                  onClick={() => handleSimulate('error')}
                >
                  Simular "Error"
                </button>
                <button 
                  className={`btn ${!loading && !error ? 'btn-secondary' : 'btn-outline'}`}
                  onClick={() => handleSimulate('success')}
                  style={{ borderColor: !loading && !error ? 'var(--secondary)' : '' }}
                >
                  Simular "Carga Exitosa"
                </button>
              </div>
            </div>

            {/* Control 2: Toggle Visibilidad (&&) */}
            <div className="interactive-playground">
              <span className="playground-title">Visualizar Documento Extra (Operador &&)</span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                  Estado de Visibilidad: <strong>{showDocs ? 'Mostrando' : 'Oculto'}</strong>
                </span>
                <button 
                  className="btn btn-secondary"
                  onClick={() => setShowDocs(!showDocs)}
                >
                  {showDocs ? <EyeOff size={16} /> : <Eye size={16} />}
                  <span>{showDocs ? 'Ocultar Documentación' : 'Mostrar Documentación'}</span>
                </button>
              </div>
            </div>

            {/* Renderizado de Salida del Playground */}
            <div style={{ marginTop: '10px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
              <span className="playground-title" style={{ color: 'var(--secondary)' }}>Salida Visual en Pantalla:</span>
              
              {/* Output 1: Ternary or If outcome */}
              <div style={{ minHeight: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.1)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-light)', marginBottom: '16px' }}>
                {renderContentIf()}
              </div>

              {/* Output 2: Logical && Outcome */}
              {showDocs && (
                <div className="alert alert-info details-panel" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
                    <HelpCircle size={16} />
                    <span>Sección de Documentación (Cortocircuito && activado)</span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Esta alerta se renderiza mediante el código <code>{'showDocs && <Alert />'}</code>. Es el método estándar de React para mostrar componentes bajo condiciones verdaderas/falsas simples.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Code Snippet Tabs */}
        <div className="card">
          <h2 className="card-title">
            <HelpCircle size={18} />
            <span>Código de Ejemplo</span>
          </h2>
          <p className="card-desc">
            Haz clic en las pestañas para comparar las diferentes alternativas sintácticas que puedes utilizar para programar renderizados condicionales en React.
          </p>

          <div className="tab-container">
            <div 
              className={`tab ${activeTab === 'ternary' ? 'active' : ''}`}
              onClick={() => setActiveTab('ternary')}
            >
              Operador Ternario
            </div>
            <div 
              className={`tab ${activeTab === 'and' ? 'active' : ''}`}
              onClick={() => setActiveTab('and')}
            >
              Operador &&
            </div>
            <div 
              className={`tab ${activeTab === 'ifelse' ? 'active' : ''}`}
              onClick={() => setActiveTab('ifelse')}
            >
              Bloques if/else
            </div>
          </div>

          <div>
            {activeTab === 'ternary' && (
              <CodeBlock code={codeTernary} title="TernaryOperator.jsx" />
            )}
            {activeTab === 'and' && (
              <CodeBlock code={codeAndOperator} title="LogicalAnd.jsx" />
            )}
            {activeTab === 'ifelse' && (
              <CodeBlock code={codeIfElse} title="HelperFunctionIf.jsx" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
