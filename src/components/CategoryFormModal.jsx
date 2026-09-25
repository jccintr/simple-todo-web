import { useEffect, useState } from 'react';
import { Button, Label, Modal, ModalBody, ModalHeader, TextInput, Alert } from 'flowbite-react';
import { createCategory, updateCategory } from '../api/categoriesApi';
import { useAuth } from '../context/AuthContext';

export default function CategoryFormModal({ show, category, onClose, onSaved }) {
  const { token } = useAuth();
  const isEdit = Boolean(category);

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Reseta o formulário toda vez que o modal abre — sem isso, editar a
  // categoria A e depois abrir "Nova categoria" mostraria o nome da A
  // ainda preenchido.
  useEffect(() => {
    if (show) {
      setName(category?.name ?? '');
      setError('');
    }
  }, [show, category]);

  const handleSave = async () => {
    if (!name.trim()) {
      setError('Dê um nome pra categoria.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      if (isEdit) {
        await updateCategory(category._id, { name: name.trim() }, token);
      } else {
        await createCategory({ name: name.trim() }, token);
      }
      onSaved();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onClose={onClose} size="md">
      <ModalHeader>{isEdit ? 'Editar categoria' : 'Nova categoria'}</ModalHeader>
      <ModalBody>
        {error && (
          <Alert color="failure" className="mb-4">
            {error}
          </Alert>
        )}

        <div className="mb-4">
          <Label htmlFor="category-name">Nome da categoria</Label>
          <TextInput
            id="category-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Estudos"
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button color="light" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            isProcessing={loading}
            disabled={loading}
            className="bg-primary text-primary-ink enabled:hover:opacity-90"
          >
            {isEdit ? 'Salvar alterações' : 'Criar categoria'}
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
}
