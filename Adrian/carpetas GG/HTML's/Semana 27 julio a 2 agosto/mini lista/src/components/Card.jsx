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
        <span className={`priority-badge ${(task.priority || 'media').toLowerCase()}`}
          style={{
            marginLeft: '10px',
            fontSize: '10px',
            padding: '2px 6px',
            borderRadius: '4px',
            background: (task.priority || 'media').toLowerCase() === 'alta' ? '#ffebee' : (task.priority || 'media').toLowerCase() === 'media' ? '#fffde7' : '#e8f5e9',
            color: (task.priority || 'media').toLowerCase() === 'alta' ? '#c62828' : (task.priority || 'media').toLowerCase() === 'media' ? '#f57f17' : '#2e7d32',
            fontWeight: 'bold',
            textTransform: 'capitalize'
          }}
        >
          {task.priority || 'media'}
        </span>
      </span>

      {/* 3. Botón de texto simple para eliminar la tarea */}
      <button className="Card-delete-btn" onClick={() => onDelete(task.id)}>
        Eliminar
      </button>
      
    </div>
  );
}

export default Card;