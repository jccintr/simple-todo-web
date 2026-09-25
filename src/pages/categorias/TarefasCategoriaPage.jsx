import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Spinner, Alert } from 'flowbite-react';
import { HiOutlinePlus, HiOutlineArrowLeft } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';
import { listTodosByCategory, updateTodo, deleteTodo } from '../../api/todosApi';
import { listCategories } from '../../api/categoriesApi';
import TodoItem from '../../components/TodoItem';
import TodoFormModal from '../../components/TodoFormModal';
import ConfirmModal from '../../components/ConfirmModal';

export default function TarefasCategoriaPage() {
  const { categoryId } = useParams();
  const { token } = useAuth();

  const [categoryName, setCategoryName] = useState('');
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const [formOpen, setFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // A API não devolve o nome da categoria dentro de /todos/category/:id
  // (só os todos em si), então buscamos a lista de categorias em paralelo
  // só pra achar o nome dessa e mostrar no título da página.
  const loadTodos = useCallback(async () => {
    setLoading(true);
    setLoadError('');
    try {
      const [todosData, categoriesData] = await Promise.all([
        listTodosByCategory(categoryId, token),
        listCategories(token),
      ]);
      setTodos(todosData);
      setCategoryName(categoriesData.find((c) => c._id === categoryId)?.name ?? '');
    } catch (err) {
      setLoadError(err.message);
    } finally {
      setLoading(false);
    }
  }, [categoryId, token]);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const openCreate = () => {
    setEditingTodo(null);
    setFormOpen(true);
  };

  const openEdit = (todo) => {
    setEditingTodo(todo);
    setFormOpen(true);
  };

  const handleSaved = () => {
    setFormOpen(false);
    loadTodos();
  };

  const handleToggleDone = async (todo) => {
    // Otimista: atualiza a UI na hora, só reverte se a chamada falhar.
    setTodos((prev) => prev.map((t) => (t._id === todo._id ? { ...t, done: !t.done } : t)));
    try {
      await updateTodo(todo._id, { done: !todo.done }, token);
    } catch (err) {
      setTodos((prev) => prev.map((t) => (t._id === todo._id ? { ...t, done: todo.done } : t)));
      setLoadError(err.message);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteTodo(deleteTarget._id, token);
      setTodos((prev) => prev.filter((t) => t._id !== deleteTarget._id));
      setDeleteTarget(null);
    } catch (err) {
      setLoadError(err.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Link to="/categorias" className="flex w-fit items-center gap-1.5 text-sm font-medium text-text-soft hover:text-text">
        <HiOutlineArrowLeft className="h-4 w-4" />
        Categorias
      </Link>

      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-text">{categoryName || 'Tarefas'}</h1>
        <Button onClick={openCreate} className="bg-primary text-primary-ink enabled:hover:opacity-90">
          <HiOutlinePlus className="mr-1.5 h-4 w-4" />
          Nova tarefa
        </Button>
      </div>

      {loadError && <Alert color="failure">{loadError}</Alert>}

      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner size="xl" />
        </div>
      ) : todos.length === 0 ? (
        <p className="py-10 text-center text-sm text-text-soft">
          Nenhuma tarefa aqui ainda. Clique em "Nova tarefa" pra criar a primeira.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onToggleDone={handleToggleDone}
              onEdit={openEdit}
              onDelete={setDeleteTarget}
            />
          ))}
        </div>
      )}

      <TodoFormModal
        show={formOpen}
        todo={editingTodo}
        categoryId={categoryId}
        onClose={() => setFormOpen(false)}
        onSaved={handleSaved}
      />

      <ConfirmModal
        show={Boolean(deleteTarget)}
        title="Excluir tarefa"
        message={`Excluir "${deleteTarget?.description}"?`}
        confirmLabel="Excluir"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
