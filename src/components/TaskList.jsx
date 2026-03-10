import { TaskItem } from './TaskItem'

export const TaskList = ({ tasks, onToggle, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-lg">No tasks here</p>
        <p className="text-sm mt-1">Add one above to get started</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}