import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Label, TextInput, Alert } from 'flowbite-react';
import { useAuth } from '../../context/AuthContext';
import { login } from '../../api/authApi';
import PasswordInput from '../../components/PasswordInput';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();

  const [email, setEmail] = useState(location.state?.prefillEmail ?? '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Preencha email e senha.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await login({ email: email.trim(), password });
      const { token, ...user } = response;
      signIn(token, user);
      navigate('/categorias', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <h1 className="text-xl font-bold text-text">Entrar na sua conta</h1>
      </div>

      {error && <Alert color="failure">{error}</Alert>}

      <div>
        <Label htmlFor="email">Email</Label>
        <TextInput
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Informe o seu email"
          autoComplete="email"
        />
      </div>

      <div>
        <Label htmlFor="password">Senha</Label>
        <PasswordInput
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Informe a sua senha"
          autoComplete="current-password"
        />
      </div>

      <Button
        type="submit"
        isProcessing={loading}
        disabled={loading}
        className="mt-2 bg-primary text-primary-ink enabled:hover:opacity-90"
      >
        Entrar
      </Button>

      <p className="text-center text-sm text-text-soft">
        Não tem conta?{' '}
        <Link to="/cadastro" className="font-semibold text-primary hover:underline">
          Cadastre-se
        </Link>
      </p>
    </form>
  );
}
