import { useState } from 'react'

export function useTaskList() {
  const [taskInput, setTaskInput] = useState('')
  const [priorityInput, setPriorityInput] = useState('Media')
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Jugar overwatch', priority: 'Alta' },
    { id: 2, text: 'Terminar actividades del servicio', priority: 'Baja' }
  ])

  const handleAddTask = (e) => {
    if (e) e.preventDefault() // Prevenir recarga del formulario controlado
    const text = taskInput.trim()

    if (!text) return

    setTasks((prevTasks) => [
      ...prevTasks,
      { id: Date.now(), text, priority: priorityInput }
    ])
    setTaskInput('')
    setPriorityInput('Media')
  }

  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }

  return {
    taskInput,
    setTaskInput,
    priorityInput,
    setPriorityInput,
    tasks,
    handleAddTask,
    handleDeleteTask
  }
}
