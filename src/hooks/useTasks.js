import { useState, useCallback } from 'react'
import {
  createTask,
  completeTask,
  deleteTask,
  filterTasks,
  sortByPriority,
} from '../services/taskService'

export const useTasks = () => {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const [error, setError] = useState(null)

  const addTask = useCallback((title, priority) => {
    try {
      const newTask = createTask(title, priority)
      setTasks(prev => [newTask, ...prev])
      setError(null)
    } catch (err) {
      setError(err.message)
    }
  }, [])

  const toggleTask = useCallback((id) => {
    setTasks(prev => completeTask(prev, id))
  }, [])

  const removeTask = useCallback((id) => {
    setTasks(prev => deleteTask(prev, id))
  }, [])

  const filteredTasks = sortByPriority(filterTasks(tasks, filter))

  return {
    tasks: filteredTasks,
    filter,
    error,
    addTask,
    toggleTask,
    removeTask,
    setFilter,
  }
}