import { describe, it, expect } from 'vitest'
import {
  createTask,
  completeTask,
  deleteTask,
  filterTasks,
  sortByPriority,
} from '../../services/taskService'

describe('createTask', () => {
  it('creates a task with correct default values', () => {
    const task = createTask('Buy groceries')
    expect(task.title).toBe('Buy groceries')
    expect(task.completed).toBe(false)
    expect(task.priority).toBe('medium')
    expect(task.id).toBeDefined()
    expect(task.createdAt).toBeDefined()
  })

  it('trims whitespace from title', () => {
    const task = createTask('  Buy groceries  ')
    expect(task.title).toBe('Buy groceries')
  })

  it('throws an error for empty title', () => {
    expect(() => createTask('')).toThrow('Task title cannot be empty')
  })

  it('throws an error for whitespace only title', () => {
    expect(() => createTask('   ')).toThrow('Task title cannot be empty')
  })

  it('creates a task with high priority', () => {
    const task = createTask('Urgent task', 'high')
    expect(task.priority).toBe('high')
  })
})

describe('completeTask', () => {
  it('toggles a task to completed', () => {
    const tasks = [createTask('Task 1')]
    const updated = completeTask(tasks, tasks[0].id)
    expect(updated[0].completed).toBe(true)
  })

  it('toggles a completed task back to active', () => {
    const tasks = [{ ...createTask('Task 1'), completed: true }]
    const updated = completeTask(tasks, tasks[0].id)
    expect(updated[0].completed).toBe(false)
  })

  it('only toggles the targeted task', () => {
    const tasks = [createTask('Task 1'), createTask('Task 2')]
    const updated = completeTask(tasks, tasks[0].id)
    expect(updated[0].completed).toBe(true)
    expect(updated[1].completed).toBe(false)
  })
})

describe('deleteTask', () => {
  it('removes the correct task', () => {
    const tasks = [createTask('Task 1'), createTask('Task 2')]
    const updated = deleteTask(tasks, tasks[0].id)
    expect(updated).toHaveLength(1)
    expect(updated[0].title).toBe('Task 2')
  })

  it('returns empty array when last task is deleted', () => {
    const tasks = [createTask('Task 1')]
    const updated = deleteTask(tasks, tasks[0].id)
    expect(updated).toHaveLength(0)
  })
})

describe('filterTasks', () => {
  it('returns all tasks for filter "all"', () => {
    const tasks = [createTask('T1'), { ...createTask('T2'), completed: true }]
    expect(filterTasks(tasks, 'all')).toHaveLength(2)
  })

  it('returns only active tasks', () => {
    const tasks = [createTask('T1'), { ...createTask('T2'), completed: true }]
    expect(filterTasks(tasks, 'active')).toHaveLength(1)
    expect(filterTasks(tasks, 'active')[0].title).toBe('T1')
  })

  it('returns only completed tasks', () => {
    const tasks = [createTask('T1'), { ...createTask('T2'), completed: true }]
    expect(filterTasks(tasks, 'completed')).toHaveLength(1)
    expect(filterTasks(tasks, 'completed')[0].title).toBe('T2')
  })
})

describe('sortByPriority', () => {
  it('sorts tasks high → medium → low', () => {
    const tasks = [
      createTask('Low task', 'low'),
      createTask('High task', 'high'),
      createTask('Medium task', 'medium'),
    ]
    const sorted = sortByPriority(tasks)
    expect(sorted[0].priority).toBe('high')
    expect(sorted[1].priority).toBe('medium')
    expect(sorted[2].priority).toBe('low')
  })
})