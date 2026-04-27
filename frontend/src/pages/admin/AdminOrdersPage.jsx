import { useEffect, useState } from 'react';
import api from '../../api/client';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]); const load = () => api.get('/investments/admin').then((r) => setOrders(r.data));
  useEffect(load, []);
  const update = async (id, status) => { await api.patch(`/investments/${id}/status`, { status }); load(); };
  return <div className="space-y-2"><h2 className="text-xl font-bold">Investment Orders</h2><div className="card">{orders.map((o) => <div key={o._id} className="border-t py-2 flex justify-between"><span>{o.userId?.name} • {o.fundId?.name} • ₹{o.amount} • {o.status}</span><div className="space-x-2"><button onClick={() => update(o._id, 'approved')} className="text-green-600">Approve</button><button onClick={() => update(o._id, 'rejected')} className="text-red-500">Reject</button></div></div>)}</div></div>;
}
