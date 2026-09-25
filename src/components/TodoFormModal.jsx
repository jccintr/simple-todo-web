import { useEffect, useState } from 'react';
import { Button, Label, Modal, ModalBody, ModalHeader, Textarea, Alert } from 'flowbite-react';
import PrioritySelector from './PrioritySelector';
import { createTodo, updateTodo } from '../api/todosApi';
import { useAuth } from '../context/AuthContext';

export default function TodoFormModal({ show, todo, categoryId, onClose, onSaved }) {
  const { token } = useAuth();
  const isEdit = Boolean(todo);

  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (show) {
      setDescription(todo?.description ?? '');
      setPriority(todo?.priority ?? 'medium');
      setError('');
    }
  }, [show, todo]);

  const handleSave = async () => {
    if (!description.trim()) {
      setError('Descreva a tarefa.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      if (isEdit) {
        await updateTodo(todo._id, { description: description.trim(), priority }, token);
      } else {
        await createTodo({ description: description.trim(), priority, categoryId }, token);
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
      <ModalHeader>{isEdit ? 'Editar tarefa' : 'Nova tarefa'}</ModalHeader>
      <ModalBody>
        {error && (
          <Alert color="failure" className="mb-4">
            {error}
          </Alert>
        )}

        <div className="mb-4">
          <Label htmlFor="todo-description">Descrição</Label>
          <Textarea
            id="todo-description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="O que precisa ser feito?"
          />
        </div>

        <div className="mb-6">
          <Label>Prioridade</Label>
          <div className="mt-2">
            <PrioritySelector value={priority} onChange={setPriority} />
          </div>
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
            {isEdit ? 'Salvar alterações' : 'Criar tarefa'}
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
}
