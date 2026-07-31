import React, { useState } from "react";
import Card from "./Card";

const initialTasks = [
  { id: "1", text: "Diseñar la interfaz de la app", priority: "media", completed: false },
  { id: "2", text: "Aprender los fundamentos de React", priority: "alta", completed: true },
  { id: "3", text: "Crear componentes interactivos", priority: "baja", completed: false }
];

function TodoList() {
  // 1. Definimos los estados (variables que React vigila para redibujar la pantalla cuando cambian)
  // 'tasks' guarda la lista de tareas. 'setTasks' es la función para actualizarla.
  const [tasks, setTasks] = useState(initialTasks);
  
  // 'text' guarda lo que escribe el usuario en el campo de texto.
  const [text, setText] = useState("");

  const [priority, setPriority] = useState("media")

  // 2. Función para añadir una nueva tarea
  const addTask = (e) => {
    e.preventDefault(); // Evita que la página se recargue al enviar el formulario
    
    if (text.trim() === "") return; // Si está vacío, no hace nada

    // Creamos la nueva tarea con un ID único basado en el tiempo actual
    const newTask = {
      id: Date.now().toString(),
      text: text.trim(),
      priority: priority,
      completed: false // Por defecto inicia pendiente (false)
    };

    // Actualizamos la lista de tareas agregando la nueva al principio
    setTasks([newTask, ...tasks]);
    
    // Limpia el campo de texto
    setText("");
    setPriority("media");
  };

  // 3. Función para borrar una tarea
  const deleteTask = (id) => {
    // Se filtra la lista para quedarnos solo con las tareas que no tengan el ID que queremos borrar
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  // 4. Función para marcar/desmarcar tarea como completada
  const toggleTask = (id) => {
    // Recorremos las tareas y cambiamos el estado 'completed' de la que coincida con el ID
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed }; // Invierte el valor true/false
      }
      return task; // Las demás quedan igual
    });
    setTasks(updatedTasks);
  };

  // 5. Cálculos simples para el progreso de la barra
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="todo-list-container">
      
      {/* Barra de progreso */}
      <div className="progress-container">
        <div className="progress-info">
          <span className="progress-label">Progreso</span>
          <span className="progress-stats">
            {completedCount} de {totalCount} completadas ({progressPercent}%)
          </span>
        </div>
        <div className="progress-bar-bg">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Formulario para añadir tareas */}
      <form onSubmit={addTask} className="add-form">
        <input
          type="text"
          placeholder="Escribe una nueva tarea..."
          value={text}
          onChange={(e) => setText(e.target.value)} // Guarda cada letra que escribes en el estado 'text'
          className="form-input"
          required
          
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="priority-select">
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option> 
        </select>
        <button type="submit" className="submit-btn">
          Añadir
        </button>
      </form>

      {/* Listado de tareas */}
      <div className="cards-grid">
        {tasks.length > 0 ? (
          // Se usa .map() para transformar cada tarea en un componente <Card /> en pantalla
          tasks.map((task) => (
            <Card
              key={task.id}
              task={task}
              onDelete={deleteTask}
              onToggle={toggleTask}
            />
          ))
        ) : (
          // Mensaje que aparece si la lista se queda vacía
          <div className="empty-state">
            <p>No tienes tareas pendientes. ¡Disfruta tu día!</p>
          </div>
        )}
      </div>
      
    </div>
  );
}

export default TodoList;