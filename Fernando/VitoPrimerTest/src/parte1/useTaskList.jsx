import { useState } from 'react'

export function useTaskList() {
  const [taskInput, setTaskInput] = useState('')
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Jugar overwatch' },
    { id: 2, text: 'Terminar actividades del servicio' }
  ])

  const handleAddTask = () => {
    const text = taskInput.trim()

    if (!text) return

    setTasks((prevTasks) => [...prevTasks, { id: Date.now(), text }])
    setTaskInput('')
  }

  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }

  return {
    taskInput,
    setTaskInput,
    tasks,
    handleAddTask,
    handleDeleteTask
  }
}
