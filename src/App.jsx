import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import RequireAuth from './routes/RequireAuth';
import RequireGuest from './routes/RequireGuest';
import AuthLayout from './components/layout/AuthLayout';
import AppLayout from './components/layout/AppLayout';
import LoginPage from './pages/auth/LoginPage';
import CadastroPage from './pages/auth/CadastroPage';
import CategoriasPage from './pages/categorias/CategoriasPage';
import TarefasCategoriaPage from './pages/categorias/TarefasCategoriaPage';
import PerfilPage from './pages/perfil/PerfilPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Navigate to="/categorias" replace />} />

            <Route element={<RequireGuest />}>
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/cadastro" element={<CadastroPage />} />
              </Route>
            </Route>

            <Route element={<RequireAuth />}>
              <Route element={<AppLayout />}>
                <Route path="/categorias" element={<CategoriasPage />} />
                <Route path="/categorias/:categoryId" element={<TarefasCategoriaPage />} />
                <Route path="/perfil" element={<PerfilPage />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
