import { useTasks } from './hooks/useTasks'
import { TaskInput } from './components/TaskInput'
import { TaskList } from './components/TaskList'
import { TaskFilter } from './components/TaskFilter'

function App() {
  const { tasks, filter, error, addTask, toggleTask, removeTask, setFilter } = useTasks()

  const totalCount = tasks.length
  const completedCount = tasks.filter(t => t.completed).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6">

        <div>
          <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
          <p className="text-gray-500 text-sm mt-1">
            {completedCount} of {totalCount} tasks completed
          </p>
        </div>

        <TaskInput onAdd={addTask} error={error} />

        <TaskFilter current={filter} onChange={setFilter} />

        <TaskList
          tasks={tasks}
          onToggle={toggleTask}
          onDelete={removeTask}
        />

      </div>
    </div>
  )
}

export default App