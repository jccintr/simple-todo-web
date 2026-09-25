import { HiOutlinePencil, HiOutlineTrash, HiCheck } from 'react-icons/hi';
import { priorityDotClass, priorityLabel } from '../utils/priority';

export default function TodoItem({ todo, onToggleDone, onEdit, onDelete }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3.5">
      <button
        type="button"
        onClick={() => onToggleDone(todo)}
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
          todo.done ? 'border-success bg-success' : 'border-border hover:border-primary'
        }`}
        title={todo.done ? 'Marcar como não concluída' : 'Marcar como concluída'}
      >
        {todo.done && <HiCheck className="h-4 w-4 text-white" />}
      </button>

      <button type="button" onClick={() => onEdit(todo)} className="min-w-0 flex-1 text-left">
        <span
          className={`block truncate text-sm ${
            todo.done ? 'text-text-soft line-through' : 'text-text'
          }`}
        >
          {todo.description}
        </span>
      </button>

      <span
        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold text-white ${priorityDotClass(
          todo.priority
        )}`}
      >
        {priorityLabel(todo.priority)}
      </span>

      <button
        type="button"
        onClick={() => onEdit(todo)}
        className="shrink-0 rounded-lg p-2 text-text-soft transition-colors hover:bg-surface-alt hover:text-text"
        title="Editar tarefa"
      >
        <HiOutlinePencil className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => onDelete(todo)}
        className="shrink-0 rounded-lg p-2 text-text-soft transition-colors hover:bg-surface-alt hover:text-danger"
        title="Excluir tarefa"
      >
        <HiOutlineTrash className="h-4 w-4" />
      </button>
    </div>
  );
}
