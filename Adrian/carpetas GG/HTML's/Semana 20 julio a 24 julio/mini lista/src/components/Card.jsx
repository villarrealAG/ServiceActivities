import React from "react";
import './Card.css';

/* El componente Card representa una sola tarea de la lista.
 Recibe como propiedades (props):
 - task: el objeto de la tarea (tiene id, text y completed)
 - onDelete: la función que se ejecuta para borrar la tarea
- onToggle: la función para marcar como completada o pendiente
*/
function Card({ task, onDelete, onToggle }) {
  return (
    <div className={`Card-item ${task.completed ? "is-completed" : ""}`}>
      
      {/* 1. Checkbox estándar de HTML para marcar como completado */}
      <input 
        type="checkbox" 
        checked={task.completed} 
        onChange={() => onToggle(task.id)} 
        className="Card-checkbox"
      />
      
      {/* 2. Texto de la tarea. Al hacer clic cambia su estado */}
      <span className="Card-text" onClick={() => onToggle(task.id)}>
        {task.text}
      </span>

      {/* 3. Botón de texto simple para eliminar la tarea */}
      <button className="Card-delete-btn" onClick={() => onDelete(task.id)}>
        Eliminar
      </button>
      
    </div>
  );
}

export default Card;