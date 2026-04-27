import { useEffect, useState } from 'react';
import api from '../api/client';

export default function GoalsPage() {
  const [goals, setGoals] = useState([]);
  const [form, setForm] = useState({ title: '', targetAmount: 1000000, currentAmount: 100000, category: 'Custom' });
  const load = () => api.get('/goals').then((r) => setGoals(r.data));
  useEffect(load, []);

  const add = async () => { await api.post('/goals', form); setForm({ ...form, title: '' }); load(); };
  const del = async (id) => { await api.delete(`/goals/${id}`); load(); };

  return <div className="space-y-4">
    <div className="card grid md:grid-cols-4 gap-2">
      <input className="input" placeholder="Goal title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <input className="input" type="number" placeholder="Target" value={form.targetAmount} onChange={(e) => setForm({ ...form, targetAmount: +e.target.value })} />
      <input className="input" type="number" placeholder="Current" value={form.currentAmount} onChange={(e) => setForm({ ...form, currentAmount: +e.target.value })} />
      <button className="btn-primary" onClick={add}>Add Goal</button>
    </div>
    <div className="grid md:grid-cols-3 gap-3">{goals.map((g) => <div className="card" key={g._id}><h3 className="font-semibold">{g.title}</h3><p className="text-sm">₹{g.currentAmount} / ₹{g.targetAmount}</p><div className="h-2 bg-slate-100 rounded-full mt-2"><div className="h-2 bg-vpw-primary rounded-full" style={{ width: `${Math.min(100, (g.currentAmount / g.targetAmount) * 100)}%` }} /></div><button className="text-red-500 text-sm mt-3" onClick={() => del(g._id)}>Delete</button></div>)}</div>
  </div>;
}
