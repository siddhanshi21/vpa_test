import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../api/client';

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  useEffect(() => { api.get('/admin/stats').then((r) => setStats(r.data)); }, []);
  const cards = [
    ['Total Users', stats.totalUsers], ['Total AUM', `₹${(stats.totalAum || 0).toLocaleString()}`], ['Active SIPs', stats.activeSips], ['Pending Orders', stats.pendingOrders], ['Pending KYC', stats.pendingKyc], ['System Status', stats.systemStatus]
  ];
  const modules = ['users', 'funds', 'kyc', 'orders', 'broadcast', 'reports', 'system'];
  return <div className="space-y-4"><h1 className="text-2xl font-bold">Admin Control Center</h1><div className="grid md:grid-cols-3 gap-3">{cards.map(([k, v]) => <div key={k} className="card"><p className="text-sm text-slate-500">{k}</p><p className="text-xl font-bold">{v ?? '-'}</p></div>)}</div><div className="grid md:grid-cols-4 gap-2">{modules.map((m) => <Link key={m} to={`/admin/${m}`} className="card capitalize hover:shadow-md">{m}</Link>)}</div></div>;
}
