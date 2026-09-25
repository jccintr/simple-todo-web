import { useCallback, useEffect, useState } from 'react';
import { Button, Spinner, Alert } from 'flowbite-react';
import { HiOutlinePlus } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';
import { listCategories, deleteCategory } from '../../api/categoriesApi';
import CategoryCard from '../../components/CategoryCard';
import CategoryFormModal from '../../components/CategoryFormModal';
import ConfirmModal from '../../components/ConfirmModal';

export default function CategoriasPage() {
  const { token } = useAuth();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const [formOpen, setFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const loadCategories = useCallback(async () => {
    setLoading(true);
    setLoadError('');
    try {
      const data = await listCategories(token);
      setCategories(data);
    } catch (err) {
      setLoadError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const openCreate = () => {
    setEditingCategory(null);
    setFormOpen(true);
  };

  const openEdit = (category) => {
    setEditingCategory(category);
    setFormOpen(true);
  };

  const handleSaved = () => {
    setFormOpen(false);
    loadCategories();
  };

  const handleDelete = async () => {
    setDeleting(true);
    setDeleteError('');
    try {
      await deleteCategory(deleteTarget._id, token);
      setDeleteTarget(null);
      loadCategories();
    } catch (err) {
      // A API bloqueia (409) categorias com tarefas — a mensagem que ela
      // manda já explica isso, só repassamos, sem fechar o modal (assim
      // a pessoa lê o motivo antes de o modal sumir).
      setDeleteError(err.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-text">Categorias</h1>
        <Button onClick={openCreate} className="bg-primary text-primary-ink enabled:hover:opacity-90">
          <HiOutlinePlus className="mr-1.5 h-4 w-4" />
          Nova categoria
        </Button>
      </div>

      {loadError && <Alert color="failure">{loadError}</Alert>}

      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner size="xl" />
        </div>
      ) : categories.length === 0 ? (
        <p className="py-10 text-center text-sm text-text-soft">
          Nenhuma categoria ainda. Clique em "Nova categoria" pra criar a primeira.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {categories.map((category) => (
            <CategoryCard
              key={category._id}
              category={category}
              onEdit={openEdit}
              onDelete={setDeleteTarget}
            />
          ))}
        </div>
      )}

      <CategoryFormModal
        show={formOpen}
        category={editingCategory}
        onClose={() => setFormOpen(false)}
        onSaved={handleSaved}
      />

      <ConfirmModal
        show={Boolean(deleteTarget)}
        title="Excluir categoria"
        message={
          deleteError || `Excluir "${deleteTarget?.name}"? Essa ação não pode ser desfeita.`
        }
        confirmLabel="Excluir"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => {
          setDeleteTarget(null);
          setDeleteError('');
        }}
      />
    </div>
  );
}
