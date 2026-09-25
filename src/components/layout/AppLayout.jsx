import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { HiOutlineViewGrid, HiOutlineUser, HiOutlineLogout } from 'react-icons/hi';
import Logo from '../Logo';
import ThemeToggle from '../ThemeToggle';
import { useAuth } from '../../context/AuthContext';

const links = [
  { to: '/categorias', label: 'Categorias', icon: HiOutlineViewGrid },
  { to: '/perfil', label: 'Perfil', icon: HiOutlineUser },
];

export default function AppLayout() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-border bg-surface">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Logo className="h-8 w-8" />
            <span className="hidden font-bold text-text sm:inline">Simple Todo</span>
          </div>

          <nav className="flex items-center gap-1">
            {links.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'bg-primary/10 text-primary' : 'text-text-soft hover:bg-surface-alt hover:text-text'
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-lg px-2 py-2 text-sm font-medium text-text-soft transition-colors hover:bg-surface-alt hover:text-danger"
              title="Sair da conta"
            >
              <HiOutlineLogout className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
