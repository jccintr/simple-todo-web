import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { fetchCurrentUser } from '../api/authApi';

const AuthContext = createContext(null);

const TOKEN_KEY = 'token';

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('loading'); // loading | authenticated | guest

  // Revalida o token salvo toda vez que o app carrega (F5, aba nova) — sem
  // isso, um token expirado/revogado ficaria "autenticado" na UI até a
  // primeira chamada de API falhar em algum lugar aleatório da tela.
  const loadSession = useCallback(async () => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (!storedToken) {
      setStatus('guest');
      return;
    }
    try {
      const data = await fetchCurrentUser(storedToken);
      setTokenState(storedToken);
      setUser(data);
      setStatus('authenticated');
    } catch {
      localStorage.removeItem(TOKEN_KEY);
      setTokenState(null);
      setUser(null);
      setStatus('guest');
    }
  }, []);

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  const signIn = (newToken, newUser) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    setTokenState(newToken);
    setUser(newUser);
    setStatus('authenticated');
  };

  const signOut = () => {
    localStorage.removeItem(TOKEN_KEY);
    setTokenState(null);
    setUser(null);
    setStatus('guest');
  };

  return (
    <AuthContext.Provider value={{ token, user, setUser, status, signIn, signOut, refresh: loadSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth precisa estar dentro de um AuthProvider');
  }
  return ctx;
}
