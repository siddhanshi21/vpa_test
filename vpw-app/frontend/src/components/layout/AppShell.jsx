import { NavLink, useLocation } from 'react-router-dom';
import { Home, PieChart, Target, User, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const nav = [
  { to: '/home', label: 'Home', icon: Home },
  { to: '/portfolio', label: 'Portfolio', icon: PieChart },
  { to: '/goals', label: 'Goals', icon: Target },
  { to: '/profile', label: 'Profile', icon: User }
];

export default function AppShell({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  const routesNoShell = ['/login', '/register'];
  if (routesNoShell.includes(location.pathname)) return children;

  return (
    <div className="min-h-screen md:flex">
      <aside className="hidden md:flex w-64 bg-white border-r p-6 flex-col gap-4">
        <h1 className="text-2xl font-bold text-vpw-primary">VPW</h1>
        {nav.map(({ to, label, icon: Icon }) => <NavItem key={to} to={to} label={label} Icon={Icon} />)}
        {user?.role === 'admin' && <NavItem to="/admin" label="Admin" Icon={Shield} />}
      </aside>
      <main className="flex-1 p-4 pb-24 md:p-8">{children}</main>
      <nav className="fixed md:hidden bottom-0 left-0 right-0 bg-white border-t px-2 py-2 grid grid-cols-4">
        {nav.map(({ to, label, icon: Icon }) => <NavItem key={to} to={to} label={label} Icon={Icon} mobile />)}
      </nav>
    </div>
  );
}

function NavItem({ to, label, Icon, mobile }) {
  return (
    <NavLink to={to} className={({ isActive }) => `${mobile ? 'flex-col text-xs' : ''} flex items-center gap-2 px-3 py-2 rounded-xl ${isActive ? 'bg-indigo-50 text-vpw-primary' : 'text-slate-500'}`}>
      <Icon size={18} /> {label}
    </NavLink>
  );
}
