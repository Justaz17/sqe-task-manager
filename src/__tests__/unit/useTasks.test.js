import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTasks } from '../../hooks/useTasks'

describe('useTasks hook', () => {
  it('initialises with empty tasks', () => {
    const { result } = renderHook(() => useTasks())
    expect(result.current.tasks).toHaveLength(0)
  })

  it('adds a task successfully', () => {
    const { result } = renderHook(() => useTasks())
    act(() => {
      result.current.addTask('Test task', 'medium')
    })
    expect(result.current.tasks).toHaveLength(1)
    expect(result.current.tasks[0].title).toBe('Test task')
  })

  it('sets an error when adding empty task', () => {
    const { result } = renderHook(() => useTasks())
    act(() => {
      result.current.addTask('')
    })
    expect(result.current.error).toBe('Task title cannot be empty')
  })

  it('clears error on successful add after failed add', () => {
    const { result } = renderHook(() => useTasks())
    act(() => { result.current.addTask('') })
    expect(result.current.error).toBeTruthy()
    act(() => { result.current.addTask('Valid task') })
    expect(result.current.error).toBeNull()
  })

  it('toggles a task completion', () => {
    const { result } = renderHook(() => useTasks())
    act(() => { result.current.addTask('Test task') })
    const id = result.current.tasks[0].id
    act(() => { result.current.toggleTask(id) })
    expect(result.current.tasks[0].completed).toBe(true)
  })

  it('removes a task', () => {
    const { result } = renderHook(() => useTasks())
    act(() => { result.current.addTask('Test task') })
    const id = result.current.tasks[0].id
    act(() => { result.current.removeTask(id) })
    expect(result.current.tasks).toHaveLength(0)
  })

  it('filters tasks by active', () => {
    const { result } = renderHook(() => useTasks())
    act(() => { result.current.addTask('Task 1') })
    act(() => { result.current.addTask('Task 2') })
    const id = result.current.tasks[0].id
    act(() => { result.current.toggleTask(id) })
    act(() => { result.current.setFilter('active') })
    expect(result.current.tasks).toHaveLength(1)
  })

  it('filters tasks by completed', () => {
    const { result } = renderHook(() => useTasks())
    act(() => { result.current.addTask('Task 1') })
    act(() => { result.current.addTask('Task 2') })
    const id = result.current.tasks[0].id
    act(() => { result.current.toggleTask(id) })
    act(() => { result.current.setFilter('completed') })
    expect(result.current.tasks).toHaveLength(1)
  })
})