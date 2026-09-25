import { Link } from 'react-router-dom';
import { HiOutlinePencil, HiOutlineTrash, HiOutlineChevronRight } from 'react-icons/hi';

export default function CategoryCard({ category, onEdit, onDelete }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3.5 transition-colors hover:border-primary/40">
      <Link to={`/categorias/${category._id}`} className="min-w-0 flex-1">
        <span className="truncate text-sm font-semibold text-text">{category.name}</span>
      </Link>

      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          onClick={() => onEdit(category)}
          className="rounded-lg p-2 text-text-soft transition-colors hover:bg-surface-alt hover:text-text"
          title="Editar categoria"
        >
          <HiOutlinePencil className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(category)}
          className="rounded-lg p-2 text-text-soft transition-colors hover:bg-surface-alt hover:text-danger"
          title="Excluir categoria"
        >
          <HiOutlineTrash className="h-4 w-4" />
        </button>
        <Link
          to={`/categorias/${category._id}`}
          className="rounded-lg p-2 text-text-soft transition-colors hover:bg-surface-alt hover:text-text"
        >
          <HiOutlineChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
