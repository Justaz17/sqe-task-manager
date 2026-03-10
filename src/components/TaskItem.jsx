import { Trash2, CheckCircle, Circle } from 'lucide-react'

const PRIORITY_STYLES = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-yellow-100 text-yellow-700',
  low: 'bg-green-100 text-green-700',
}

export const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <div className={`flex items-center gap-3 p-4 rounded-lg border transition-all ${
      task.completed ? 'bg-gray-50 border-gray-200 opacity-60' : 'bg-white border-gray-200 shadow-sm'
    }`}>
      <button onClick={() => onToggle(task.id)} className="text-blue-500 hover:text-blue-700 transition-colors">
        {task.completed
          ? <CheckCircle size={22} />
          : <Circle size={22} />
        }
      </button>
      <span className={`flex-1 text-gray-800 ${task.completed ? 'line-through text-gray-400' : ''}`}>
        {task.title}
      </span>
      <span className={`text-xs px-2 py-1 rounded-full font-medium ${PRIORITY_STYLES[task.priority]}`}>
        {task.priority}
      </span>
      <button onClick={() => onDelete(task.id)} className="text-gray-400 hover:text-red-500 transition-colors">
        <Trash2 size={18} />
      </button>
    </div>
  )
}