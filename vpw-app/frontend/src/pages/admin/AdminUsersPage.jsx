import { useEffect, useState } from 'react';
import api from '../../api/client';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]); const [q, setQ] = useState('');
  const load = () => api.get('/users', { params: { q } }).then((r) => setUsers(r.data));
  useEffect(load, [q]);
  const toggle = async (u) => { await api.patch(`/users/${u._id}/status`, { status: u.status === 'active' ? 'inactive' : 'active' }); load(); };
  return <div className="space-y-3"><h2 className="text-xl font-bold">User Management</h2><input className="input" placeholder="Search name/CAN/email" value={q} onChange={(e) => setQ(e.target.value)} /><div className="card">{users.map((u) => <div className="border-t py-2 flex justify-between" key={u._id}><span>{u.name} • {u.email} • KYC:{u.kycStatus}</span><button className="text-vpw-primary" onClick={() => toggle(u)}>{u.status === 'active' ? 'Deactivate' : 'Activate'}</button></div>)}</div></div>;
}
