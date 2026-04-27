import { useEffect, useState } from 'react';
import api from '../../api/client';

export default function AdminFundsPage() {
  const [funds, setFunds] = useState([]);
  const [form, setForm] = useState({ name: '', category: '', assetClass: '', nav: 0, returns1Y: 0, returns3Y: 0, riskLevel: 'Moderate' });
  const load = () => api.get('/funds').then((r) => setFunds(r.data));
  useEffect(load, []);
  const add = async () => { await api.post('/funds', form); setForm({ ...form, name: '' }); load(); };
  const del = async (id) => { await api.delete(`/funds/${id}`); load(); };
  return <div className="space-y-4"><h2 className="text-xl font-bold">Fund Data</h2><div className="card grid md:grid-cols-4 gap-2">{Object.keys(form).map((k) => <input key={k} className="input" placeholder={k} value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} />)}<button className="btn-primary" onClick={add}>Add Fund</button></div><div className="card">{funds.map((f) => <div className="border-t py-2 flex justify-between" key={f._id}><span>{f.name} • NAV {f.nav}</span><button className="text-red-500" onClick={() => del(f._id)}>Delete</button></div>)}</div></div>;
}
