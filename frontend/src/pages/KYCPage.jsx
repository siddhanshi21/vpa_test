import { useState } from 'react';
import api from '../api/client';

export default function KYCPage() {
  const [form, setForm] = useState({ panNumber: '', aadhaarNumber: '', address: '', canNumber: '' });
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    ['panDoc', 'aadhaarDoc', 'photo', 'signature'].forEach((f) => {
      const file = document.getElementById(f).files[0];
      if (file) fd.append(f, file);
    });
    await api.post('/kyc', fd);
    setMsg('KYC submitted successfully. Awaiting admin approval.');
  };

  return <div className="max-w-2xl mx-auto space-y-4">
    <div className="card"><h1 className="text-xl font-bold">Instant CAN + KYC Registration</h1></div>
    <form className="card space-y-3" onSubmit={submit}>
      <input className="input" placeholder="PAN Number" onChange={(e) => setForm({ ...form, panNumber: e.target.value })} />
      <input className="input" placeholder="Aadhaar Number" onChange={(e) => setForm({ ...form, aadhaarNumber: e.target.value })} />
      <input className="input" placeholder="CAN Number" onChange={(e) => setForm({ ...form, canNumber: e.target.value })} />
      <textarea className="input" placeholder="Address" onChange={(e) => setForm({ ...form, address: e.target.value })} />
      {['panDoc', 'aadhaarDoc', 'photo', 'signature'].map((f) => <input key={f} id={f} type="file" className="input" />)}
      <button className="btn-primary">Submit KYC</button>
      {msg && <p className="text-green-600">{msg}</p>}
    </form>
  </div>;
}
