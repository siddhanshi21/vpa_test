import { useEffect, useState } from 'react';
import api from '../api/client';

export default function SupportPage() {
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({ subject: '', description: '', priority: 'High', category: 'General' });
  const load = () => api.get('/support/tickets').then((r) => setTickets(r.data));
  useEffect(load, []);

  const create = async () => { await api.post('/support/tickets', form); setForm({ ...form, subject: '', description: '' }); load(); };

  return <div className="space-y-4">
    <div className="card space-y-2">
      <h2 className="font-bold">Help & Support</h2>
      <input className="input" placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
      <textarea className="input" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <button className="btn-primary" onClick={create}>Raise Ticket</button>
    </div>
    <div className="card">{tickets.map((t) => <div key={t._id} className="border-t py-2 text-sm">{t.subject} • {t.priority} • {t.status}</div>)}</div>
  </div>;
}
