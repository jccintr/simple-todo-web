import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Label, TextInput, Alert } from 'flowbite-react';
import { HiOutlinePencil } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';
import { updateProfile } from '../../api/authApi';
import ConfirmModal from '../../components/ConfirmModal';

export default function PerfilPage() {
  const navigate = useNavigate();
  const { user, token, setUser, signOut } = useAuth();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name ?? '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

  const startEditing = () => {
    setName(user?.name ?? '');
    setError('');
    setEditing(true);
  };

  const handleSave = async () => {
    const trimmed = name.trim();
    if (trimmed.length < 3) {
      setError('Nome deve ter pelo menos 3 caracteres.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const updatedUser = await updateProfile({ name: trimmed }, token);
      setUser(updatedUser);
      setEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    signOut();
    navigate('/login', { replace: true });
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-bold text-text">Perfil</h1>

      <div className="flex items-center gap-4 rounded-xl border border-border bg-surface p-6">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-ink">
          {user?.name?.charAt(0)?.toUpperCase() ?? '?'}
        </div>

        {editing ? (
          <div className="flex-1">
            {error && (
              <Alert color="failure" className="mb-3">
                {error}
              </Alert>
            )}
            <Label htmlFor="profile-name">Nome</Label>
            <TextInput
              id="profile-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mb-3"
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleSave}
                isProcessing={loading}
                disabled={loading}
                className="bg-primary text-primary-ink enabled:hover:opacity-90"
              >
                Salvar
              </Button>
              <Button size="sm" color="light" onClick={() => setEditing(false)} disabled={loading}>
                Cancelar
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-between">
            <div>
              <p className="font-semibold text-text">{user?.name}</p>
              <p className="text-sm text-text-soft">{user?.email}</p>
            </div>
            <button
              type="button"
              onClick={startEditing}
              className="rounded-lg p-2 text-text-soft transition-colors hover:bg-surface-alt hover:text-text"
              title="Editar nome"
            >
              <HiOutlinePencil className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      <div>
        <Button color="failure" onClick={() => setLogoutConfirmOpen(true)}>
          Sair da conta
        </Button>
      </div>

      <ConfirmModal
        show={logoutConfirmOpen}
        title="Sair da conta"
        message="Deseja sair da sua conta?"
        confirmLabel="Sair"
        onConfirm={handleLogout}
        onCancel={() => setLogoutConfirmOpen(false)}
      />
    </div>
  );
}
