import { useState } from 'react';
import api from '../../api/client';

export default function AdminBroadcastPage() {
  const [form, setForm] = useState({ title: '', message: '', recipients: ['All active investors'] });
  const send = async () => { await api.post('/admin/broadcast', form); alert('Broadcast sent'); };
  return <div className="space-y-2"><h2 className="text-xl font-bold">Broadcasts</h2><div className="card space-y-2"><input className="input" placeholder="Title" onChange={(e) => setForm({ ...form, title: e.target.value })} /><textarea className="input" placeholder="Message" onChange={(e) => setForm({ ...form, message: e.target.value })} /><select className="input" onChange={(e) => setForm({ ...form, recipients: [e.target.value] })}><option>All active investors</option><option>KYC pending users</option><option>SIP users</option><option>Custom users</option></select><button className="btn-primary" onClick={send}>Send broadcast</button></div></div>;
}
