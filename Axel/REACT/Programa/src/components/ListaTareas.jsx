import { useState } from 'react';

function ListaTareas() {
  // Estado 1: Para la lista completa de tareas (Inicia como un array)
  const [tareas, setTareas] = useState([
    { id: 1, texto: "Estudiar React" },
    { id: 2, texto: "Practicar useState" }
  ]);

  // Estado 2: Input controlado (Guarda lo que el usuario está escribiendo)
  const [nuevaTarea, setNuevaTarea] = useState("");

  // Función para agregar una tarea a la lista
  const agregarTarea = (e) => {
    e.preventDefault(); // Evita que la página se recargue si el input está en un <form>
    
    if (nuevaTarea.trim() === "") return; // Si está vacío, no hace nada

    // Creamos el nuevo objeto de la tarea
    const tareaObjeto = {
      id: Date.now(), // Usamos la fecha/hora actual como ID único para la prop key
      texto: nuevaTarea
    };

    // Actualizamos el estado con la lista previa + la nueva tarea
    setTareas([...tareas, tareaObjeto]);

    // Limpiamos el campo del input
    setNuevaTarea("");
  };

  // Función para eliminar una tarea por su id
  const eliminarTarea = (idAEliminar) => {
    // .filter() devuelve todas las tareas EXCEPTO la que tenga el ID coincidente
    const tareasFiltradas = tareas.filter(tarea => tarea.id !== idAEliminar);
    setTareas(tareasFiltradas);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '30px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>📌 Mi Lista de Tareas</h2>

      {/* Formularios e Input Controlado */}
      <form onSubmit={agregarTarea} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Escribe una nueva tarea..." 
          value={nuevaTarea} // 1. React controla el valor actual
          onChange={(e) => setNuevaTarea(e.target.value)} // 2. Captura lo que escribes tecla por tecla
          style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #aaa' }}
        />
        <button type="submit" style={{ padding: '8px 12px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}>
          Agregar
        </button>
      </form>

      {/* Lista Renderizada con .map() */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tareas.length === 0 ? (
          <p style={{ color: '#888' }}>No hay tareas pendientes 🎉</p>
        ) : (
          tareas.map((tarea) => (
            // Importante: la prop 'key' debe ir en el elemento raíz del return del .map()
            <li 
              key={tarea.id} 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '10px', 
                marginBottom: '8px', 
                backgroundColor: '#f9f9f9', 
                borderRadius: '4px' 
              }}
            >
              <span>{tarea.texto}</span>
              <button 
                onClick={() => eliminarTarea(tarea.id)}
                style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
              >
                Eliminar
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default ListaTareas;