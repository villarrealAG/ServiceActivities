import React, { useState, useEffect } from 'react';
import CodeBlock from '../components/CodeBlock';
import { Database, Plus, Trash2, RefreshCw, AlertTriangle, Eye } from 'lucide-react';

export default function LocalStorageDemo() {
  // 1. Volatile memory state (standard useState, starts empty on load)
  const [memoryTasks, setMemoryTasks] = useState([]);
  const [memoryInput, setMemoryInput] = useState('');

  // 2. Persistent localStorage state (initializes by reading from localStorage)
  const [localTasks, setLocalTasks] = useState(() => {
    const saved = localStorage.getItem('play_tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [localInput, setLocalInput] = useState('');

  // Write changes of localTasks back to localStorage
  useEffect(() => {
    localStorage.setItem('play_tasks', JSON.stringify(localTasks));
  }, [localTasks]);

  // Action: Add memory task
  const addMemoryTask = (e) => {
    e.preventDefault();
    if (!memoryInput.trim()) return;
    setMemoryTasks([...memoryTasks, { id: Date.now(), text: memoryInput }]);
    setMemoryInput('');
  };

  // Action: Add local storage task
  const addLocalTask = (e) => {
    e.preventDefault();
    if (!localInput.trim()) return;
    setLocalTasks([...localTasks, { id: Date.now(), text: localInput }]);
    setLocalInput('');
  };

  // Action: Delete memory task
  const deleteMemoryTask = (id) => {
    setMemoryTasks(memoryTasks.filter(task => task.id !== id));
  };

  // Action: Delete local task
  const deleteLocalTask = (id) => {
    setLocalTasks(localTasks.filter(task => task.id !== id));
  };

  // Action: Force full page reload
  const handleReload = () => {
    window.location.reload();
  };

  const codeSnippet = `// 1. Guardar y leer datos simples persistidos en React
import React, { useState, useEffect } from 'react';

export default function TodoApp() {
  // Inicializamos el estado leyendo de localStorage.
  // Usamos una función de inicialización para evitar leer del disco en cada render.
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('my_tasks');
    // localStorage solo guarda Strings. Debemos parsear el JSON de vuelta a Array.
    return saved ? JSON.parse(saved) : [];
  });

  // Guardamos en localStorage automáticamente cada vez que el array 'tasks' cambie.
  useEffect(() => {
    localStorage.setItem('my_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    setTasks([...tasks, { id: Date.now(), text }]);
  };

  // ... renderizado de lista ...
}`;

  return (
    <div style={{ textAlign: 'left' }}>
      <h1>
        <Database size={32} style={{ color: 'var(--primary)' }} />
        <span>localStorage vs useState</span>
      </h1>
      <p className="page-description">
        El estado de React (<code>useState</code>) vive únicamente en la memoria RAM del navegador. Si el usuario recarga la pestaña o navega a otra web, ese estado se destruye por completo. Para guardar información permanentemente, usamos la API de <code>localStorage</code> del navegador.
      </p>

      {/* Tutorial banner */}
      <div className="alert alert-info" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
        <div style={{ fontWeight: '700', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertTriangle size={18} />
          <span>Experimento de Persistencia (Instrucciones)</span>
        </div>
        <ol style={{ marginLeft: '20px', fontSize: '13px', lineHeight: '1.6', color: '#cffafe' }}>
          <li>Agrega un elemento en la <strong>Lista A (Solo Memoria)</strong>.</li>
          <li>Agrega un elemento en la <strong>Lista B (localStorage)</strong>.</li>
          <li>Presiona el botón de abajo <strong>"Recargar la Página"</strong>.</li>
          <li>Comprueba cuál lista sobrevivió y cuál se borró a cero.</li>
        </ol>
        <button 
          className="btn btn-secondary" 
          onClick={handleReload}
          style={{ alignSelf: 'flex-start', marginTop: '8px', gap: '6px', fontSize: '13px', padding: '6px 12px' }}
        >
          <RefreshCw size={14} />
          <span>Forzar Recarga de Página (F5)</span>
        </button>
      </div>

      <div className="grid-2">
        {/* Memory list (useState) */}
        <div className="card">
          <h2 className="card-title" style={{ color: 'var(--secondary)' }}>
            <Database size={18} style={{ color: 'var(--secondary)' }} />
            <span>Lista A: Solo useState (Memoria)</span>
          </h2>
          <p className="card-desc">
            Estos datos viven en el estado reactivo ordinario. Si se limpia el proceso, la lista volverá a estar vacía.
          </p>

          <form onSubmit={addMemoryTask} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Nueva tarea volátil..."
              value={memoryInput}
              onChange={(e) => setMemoryInput(e.target.value)}
              style={{ flexGrow: 1 }}
            />
            <button type="submit" className="btn btn-secondary">
              <Plus size={16} />
              <span>Agregar</span>
            </button>
          </form>

          <div className="todo-list">
            {memoryTasks.length === 0 ? (
              <span style={{ color: 'var(--text-muted)', fontSize: '13px', fontStyle: 'italic', padding: '10px 0' }}>La lista está vacía. Agrega elementos arriba.</span>
            ) : (
              memoryTasks.map(task => (
                <div key={task.id} className="todo-item">
                  <span>{task.text}</span>
                  <button className="todo-delete" onClick={() => deleteMemoryTask(task.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>

          <div style={{ marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Eye size={12} />
              <span>Estado en Memoria:</span>
            </div>
            <pre style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--secondary)', backgroundColor: '#0a0908', padding: '8px', borderRadius: '4px', marginTop: '6px', overflowX: 'auto' }}>
              JSON: {JSON.stringify(memoryTasks)}
            </pre>
          </div>
        </div>

        {/* Persisted list (localStorage) */}
        <div className="card">
          <h2 className="card-title">
            <Database size={18} />
            <span>Lista B: localStorage (Persistida)</span>
          </h2>
          <p className="card-desc">
            Al guardarse en el almacenamiento local del cliente web, la lista se mantiene intacta a través de cierres y recargas.
          </p>

          <form onSubmit={addLocalTask} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Nueva tarea persistente..."
              value={localInput}
              onChange={(e) => setLocalInput(e.target.value)}
              style={{ flexGrow: 1 }}
            />
            <button type="submit" className="btn btn-primary">
              <Plus size={16} />
              <span>Agregar</span>
            </button>
          </form>

          <div className="todo-list">
            {localTasks.length === 0 ? (
              <span style={{ color: 'var(--text-muted)', fontSize: '13px', fontStyle: 'italic', padding: '10px 0' }}>La lista está vacía. Agrega elementos arriba.</span>
            ) : (
              localTasks.map(task => (
                <div key={task.id} className="todo-item">
                  <span>{task.text}</span>
                  <button className="todo-delete" onClick={() => deleteLocalTask(task.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>

          <div style={{ marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Eye size={12} />
              <span>Valor en localStorage:</span>
            </div>
            <pre style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--primary)', backgroundColor: '#0a0908', padding: '8px', borderRadius: '4px', marginTop: '6px', overflowX: 'auto' }}>
              Clave "play_tasks": {localStorage.getItem('play_tasks') || 'null (No creado aún)'}
            </pre>
          </div>
        </div>
      </div>

      {/* Code explanation section */}
      <div className="card">
        <h2 className="card-title">
          <Database size={18} />
          <span>Implementación del Hook con Persistencia</span>
        </h2>
        <p className="card-desc">
          En React, la forma óptima de integrar localStorage es iniciar el estado de useState consultando la clave guardada y usar un hook <code>useEffect</code> para sincronizar los cambios de estado hacia la base de datos local.
        </p>
        <CodeBlock code={codeSnippet} title="localStorageHook.js" />
      </div>
    </div>
  );
}
