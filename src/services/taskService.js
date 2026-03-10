export const createTask = (title, priority = 'medium') => {
  if (!title || title.trim() === '') {
    throw new Error('Task title cannot be empty')
  }

  return {
    id: crypto.randomUUID(),
    title: title.trim(),
    priority,
    completed: false,
    createdAt: new Date().toISOString(),
  }
}

export const completeTask = (tasks, id) => {
  return tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  )
}

export const deleteTask = (tasks, id) => {
  return tasks.filter(task => task.id !== id)
}

export const filterTasks = (tasks, filter) => {
  switch (filter) {
    case 'active':
      return tasks.filter(task => !task.completed)
    case 'completed':
      return tasks.filter(task => task.completed)
    default:
      return tasks
  }
}

export const sortByPriority = (tasks) => {
  const order = { high: 0, medium: 1, low: 2 }
  return [...tasks].sort((a, b) => order[a.priority] - order[b.priority])
}