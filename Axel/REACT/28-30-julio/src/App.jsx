import { useState, useEffect } from 'react';

// ==========================================
// 1. EJERCICIO 1: useEffect + Fetch (API)
// ==========================================
export function Ejercicio1() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://dummyjson.com/users?limit=5')
      .then((res) => {
        if (!res.ok) throw new Error('Error al conectar con la API');
        return res.json();
      })
      .then((data) => {
        setUsers(data.users);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>⏳ Cargando usuarios de la API...</p>;
  if (error) return <p style={{ color: 'red' }}>❌ Error: {error}</p>;

  return (
    <div style={{ border: '1px solid #444', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
      <h2>1. useEffect + API (DummyJSON)</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users.map((user) => (
          <li key={user.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <img src={user.image} alt={user.firstName} style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#fff' }} />
            <span><strong>{user.firstName} {user.lastName}</strong> ({user.email})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ==========================================
// 2. EJERCICIO 2: Formulario Controlado
// ==========================================
export function Ejercicio2() {
  const [tarea, setTarea] = useState('');
  const [prioridad, setPrioridad] = useState('Baja');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tarea.trim()) return;
    alert(`Tarea agregada: "${tarea}" | Prioridad: ${prioridad}`);
    setTarea('');
    setPrioridad('Baja');
  };

  return (
    <div style={{ border: '1px solid #444', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
      <h2>2. Formulario Controlado (value + onChange)</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
        <div>
          <label>Tarea: </label>
          <input
            type="text"
            value={tarea}
            onChange={(e) => setTarea(e.target.value)}
            placeholder="Escribe una tarea..."
            style={{ width: '100%', padding: '5px', marginTop: '5px' }}
          />
        </div>

        <div>
          <label>Prioridad: </label>
          <select 
            value={prioridad} 
            onChange={(e) => setPrioridad(e.target.value)}
            style={{ width: '100%', padding: '5px', marginTop: '5px' }}
          >
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
          </select>
        </div>

        <button type="submit" style={{ padding: '8px', cursor: 'pointer' }}>Guardar Tarea</button>
      </form>
    </div>
  );
}

// ==========================================
// 3. EJERCICIO 3: Programa Combinado
// ==========================================
export function ProgramaCombinado() {
  const [todos, setTodos] = useState([]);
  const [nuevoTexto, setNuevoTexto] = useState('');
  const [prioridad, setPrioridad] = useState('Media');
  const [loading, setLoading] = useState(true);

  // Cargar datos iniciales desde la API
  useEffect(() => {
    fetch('https://dummyjson.com/todos?limit=4')
      .then((res) => res.json())
      .then((data) => {
        const tareasFormateadas = data.todos.map((t) => ({
          id: t.id,
          todo: t.todo,
          prioridad: 'API'
        }));
        setTodos(tareasFormateadas);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Agregar elemento localmente
  const handleAgregar = (e) => {
    e.preventDefault();
    if (!nuevoTexto.trim()) return;

    const nuevaTarea = {
      id: Date.now(),
      todo: nuevoTexto,
      prioridad: prioridad
    };

    setTodos([nuevaTarea, ...todos]);
    setNuevoTexto('');
    setPrioridad('Media');
  };

  // Eliminar elemento localmente
  const handleEliminar = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div style={{ border: '1px solid #444', padding: '15px', borderRadius: '8px' }}>
      <h2>3. Integración Total (API + Formulario + CRUD Local)</h2>

      {/* Formulario para agregar */}
      <form onSubmit={handleAgregar} style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Nueva tarea local..."
          value={nuevoTexto}
          onChange={(e) => setNuevoTexto(e.target.value)}
          style={{ padding: '5px', flex: 1 }}
        />
        <select value={prioridad} onChange={(e) => setPrioridad(e.target.value)} style={{ padding: '5px' }}>
          <option value="Baja">Baja</option>
          <option value="Media">Media</option>
          <option value="Alta">Alta</option>
        </select>
        <button type="submit" style={{ padding: '5px 10px' }}>Agregar</button>
      </form>

      {/* Lista de elementos */}
      {loading ? (
        <p>⏳ Cargando elementos iniciales...</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {todos.map((item) => (
            <li 
              key={item.id} 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '8px', 
                borderBottom: '1px solid #333' 
              }}
            >
              <span>
                <span style={{ fontSize: '0.8em', padding: '2px 6px', background: '#333', borderRadius: '4px', marginRight: '8px' }}>
                  {item.prioridad}
                </span>
                {item.todo}
              </span>
              <button onClick={() => handleEliminar(item.id)} style={{ cursor: 'pointer', background: 'transparent', border: 'none' }}>
                ❌
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ==========================================
// COMPONENTE PRINCIPAL APP
// ==========================================
function App() {
  return (
    <div style={{ padding: '20px', maxWidth: '650px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Prácticas de React</h1>
      <Ejercicio1 />
      <Ejercicio2 />
      <ProgramaCombinado />
    </div>
  );
}

export default App;