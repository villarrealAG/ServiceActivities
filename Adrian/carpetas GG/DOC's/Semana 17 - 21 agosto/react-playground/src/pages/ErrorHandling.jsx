import React, { useState } from 'react';
import CodeBlock from '../components/CodeBlock';
import { ShieldAlert, Play, RefreshCw, Loader, AlertTriangle, CheckCircle, Terminal } from 'lucide-react';

export default function ErrorHandling() {
  const [latency, setLatency] = useState(1000);
  const [responseType, setResponseType] = useState('200');
  const [loading, setLoading] = useState(false);
  const [errorState, setErrorState] = useState(null);
  const [dataState, setDataState] = useState(null);
  const [logs, setLogs] = useState([]);

  // Mock API service using a promise with try/catch logic
  const handleFetch = async () => {
    // Clear previous state and start logging
    setLoading(true);
    setErrorState(null);
    setDataState(null);
    const newLogs = ['1. [State] Se establece loading = true; error = null; data = null;'];
    setLogs(newLogs);

    const log = (msg) => {
      newLogs.push(msg);
      setLogs([...newLogs]);
    };

    // Helper promise for timeout
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    log('2. [Flow] Entrando al bloque "try { ... }"');
    
    try {
      log(`3. [API] Petición iniciada. Esperando respuesta simulated de ${latency}ms...`);
      await delay(latency);

      // Simulate outcomes
      if (responseType === '404') {
        log('4. [API] Servidor respondió con Status Code 404 (Not Found).');
        throw new Error('Error 404: El recurso solicitado no existe en el servidor.');
      }
      
      if (responseType === '500') {
        log('4. [API] Servidor respondió con Status Code 500 (Internal Server Error).');
        throw new Error('Error 500: Error crítico interno en la base de datos del servidor.');
      }

      if (responseType === 'network_error') {
        log('4. [Network] Fallo físico de red (Sin Internet / Servidor caído).');
        throw new TypeError('Failed to fetch: No se pudo establecer conexión con el dominio de la API.');
      }

      // Success
      log('4. [API] Servidor respondió con Status Code 200 (OK). Procesando JSON...');
      const mockUser = { id: 1, name: 'Adrián Villarreal', email: 'adrian.villarreal@itesi.edu.mx', role: 'Docente / Desarrollador' };
      
      setDataState(mockUser);
      log('5. [State] Datos asignados con éxito a setData(data). Termina bloque try.');
      
    } catch (err) {
      log(`5. [Flow] ¡Excepción capturada! Entrando al bloque "catch (error) { ... }"`);
      log(`6. [Error] Detalle: "${err.message}"`);
      setErrorState(err.message);
      log('7. [State] Error guardado en setError(error.message). Termina bloque catch.');
    } finally {
      log('8. [Flow] Entrando al bloque obligatorio "finally { ... }"');
      setLoading(false);
      log('9. [State] Se restablece loading = false. Fin del flujo try/catch/finally.');
    }
  };

  const codeExplanation = `// Estructura try/catch/finally al consultar APIs en React
import React, { useState } from 'react';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    setLoading(true);
    setError(null); // Resetear estados anteriores

    try {
      // 1. Intentamos realizar la petición HTTP
      const response = await fetch('https://api.example.com/user/1');
      
      // 2. Validamos si el servidor respondió con un error (ej. 404 o 500)
      if (!response.ok) {
        throw new Error(\`Error de red: \${response.status}\`);
      }
      
      const data = await response.json();
      setUser(data); // Guardamos los datos si todo sale bien

    } catch (err) {
      // 3. Capturamos cualquier fallo físico de red o errores lanzados arriba
      console.error("Fallo detectado:", err);
      setError(err.message); // Guardamos mensaje de error en el estado

    } finally {
      // 4. Se ejecuta SIEMPRE (tenga éxito o falle la petición)
      setLoading(false); // Apagamos el loader en cualquier escenario
    }
  };

  return (
    <div>
      <button onClick={fetchUserData} disabled={loading}>
        {loading ? 'Cargando...' : 'Obtener Datos'}
      </button>

      {/* Renderizado condicional del resultado */}
      {error && <p className="error">Ocurrió un error: {error}</p>}
      {user && <p>Bienvenido, {user.name}</p>}
    </div>
  );
}`;

  return (
    <div style={{ textAlign: 'left' }}>
      <h1>
        <ShieldAlert size={32} style={{ color: 'var(--primary)' }} />
        <span>Manejo de Errores con Try / Catch</span>
      </h1>
      <p className="page-description">
        El bloque <code>try/catch</code> es una estructura fundamental en JavaScript para prevenir que una falla en una operación asíncrona (como consultar una API externa o perder la conexión de internet) bloquee e inhabilite toda la aplicación de React.
      </p>

      <div className="grid-2">
        {/* API Simulator card */}
        <div className="card">
          <h2 className="card-title">
            <RefreshCw size={18} />
            <span>Simulador de Peticiones API</span>
          </h2>
          <p className="card-desc">
            Configura el resultado del servidor ficticio y presiona "Ejecutar". Observa el flujo lógico en la terminal de ejecución a continuación.
          </p>

          <div style={{ display: 'flex', flexDir: 'column', flexDirection: 'column', gap: '16px' }}>
            {/* Control: Latency */}
            <div className="form-group">
              <label className="form-label">
                Latencia Simulada: <strong style={{ color: 'var(--secondary)' }}>{latency}ms</strong>
              </label>
              <input 
                type="range" 
                min="0" 
                max="3000" 
                step="500" 
                value={latency} 
                onChange={(e) => setLatency(Number(e.target.value))}
                style={{ accentColor: 'var(--primary)', cursor: 'pointer' }}
              />
            </div>

            {/* Control: Outcome */}
            <div className="form-group">
              <label className="form-label">Resultado del Servidor:</label>
              <select 
                className="form-select"
                value={responseType}
                onChange={(e) => setResponseType(e.target.value)}
              >
                <option value="200">200 OK (Carga Exitosa)</option>
                <option value="404">404 Not Found (Ruta Inválida)</option>
                <option value="500">500 Server Error (Fallo Base de Datos)</option>
                <option value="network_error">Fallo de Red Físico (Sin Internet)</option>
              </select>
            </div>

            <button 
              className="btn btn-primary"
              onClick={handleFetch}
              disabled={loading}
              style={{ padding: '12px' }}
            >
              {loading ? <Loader className="spinner" size={16} style={{ borderTopColor: '#fff' }} /> : <Play size={16} />}
              <span>Ejecutar Petición API</span>
            </button>

            {/* Simulated Terminal */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '12px', fontWeight: 'bold' }}>
                <Terminal size={14} />
                <span>Flujo de Ejecución (Logs Internos):</span>
              </div>
              <div style={{ 
                backgroundColor: '#0a0908', 
                border: '1px solid var(--border)', 
                borderRadius: '8px', 
                padding: '12px', 
                height: '160px', 
                overflowY: 'auto',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                lineHeight: '1.6',
                color: '#d6d3d1'
              }}>
                {logs.length === 0 ? (
                  <span style={{ color: 'var(--text-muted)' }}>Presiona "Ejecutar Petición API" para ver la traza del try/catch...</span>
                ) : (
                  logs.map((logStr, idx) => (
                    <div key={idx} style={{ 
                      color: logStr.includes('Flow') ? 'var(--primary)' : 
                             logStr.includes('Error') || logStr.includes('Excepción') ? 'var(--error)' : 
                             logStr.includes('API') && logStr.includes('200') ? 'var(--success)' : '#e7e5e4'
                    }}>
                      {logStr}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Simulated UI Viewport */}
            <div style={{ marginTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
              <div className="playground-title">UI Renderizada al Usuario:</div>
              <div style={{ 
                backgroundColor: 'rgba(0,0,0,0.1)', 
                minHeight: '100px', 
                borderRadius: '8px', 
                border: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px'
              }}>
                {loading && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                    <Loader className="spinner" size={28} />
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Cargando datos...</span>
                  </div>
                )}

                {!loading && errorState && (
                  <div className="alert alert-error" style={{ width: '100%' }}>
                    <AlertTriangle size={24} style={{ flexShrink: 0 }} />
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '15px' }}>Error Detectado (Bloque Catch)</div>
                      <div style={{ fontSize: '13px', marginTop: '2px', color: '#fca5a5' }}>{errorState}</div>
                    </div>
                  </div>
                )}

                {!loading && dataState && (
                  <div className="alert alert-success" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle size={20} style={{ color: 'var(--success)' }} />
                      <span style={{ fontWeight: '700' }}>Carga Exitosa (Bloque Try)</span>
                    </div>
                    <div style={{ fontSize: '13px', color: '#a7f3d0' }}>
                      <strong>Usuario:</strong> {dataState.name} <br/>
                      <strong>Correo:</strong> {dataState.email} <br/>
                      <strong>Rol:</strong> {dataState.role}
                    </div>
                  </div>
                )}

                {!loading && !errorState && !dataState && (
                  <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Ninguna petición iniciada en este ciclo.</span>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Code Explanation card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <h2 className="card-title">
            <ShieldAlert size={18} />
            <span>Código de Buenas Prácticas</span>
          </h2>
          <p className="card-desc">
            Al realizar peticiones asíncronas con <code>async/await</code>, es esencial envolver el <code>await fetch</code> en un try/catch. Si el fetch falla (ej. pérdida de conexión), el navegador lanzará un error que será interceptado por el catch de forma limpia, evitando pantallas en blanco.
          </p>
          <div style={{ flexGrow: 1 }}>
            <CodeBlock code={codeExplanation} title="fetchService.js" />
          </div>
        </div>
      </div>
    </div>
  );
}
