import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  if (!user) return null;
  return <div className="space-y-4">
    <div className="card"><h2 className="text-xl font-bold">My Account</h2><p>{user.name}</p><p>{user.email}</p><p>{user.phone}</p><p>PAN: {user.panNumber || '-'}</p><p>CAN: {user.canNumber || '-'}</p><p>KYC: {user.kycStatus}</p></div>
    <div className="card"><h3 className="font-semibold">Support</h3><Link to="/support" className="text-vpw-primary">Raise Ticket</Link></div>
    {user.role === 'admin' && <Link to="/admin" className="card block">Go to Admin Panel</Link>}
    <button className="btn-primary" onClick={logout}>Logout</button>
  </div>;
}
