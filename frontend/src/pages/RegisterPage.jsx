import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const { register } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await register(form);
    nav('/kyc');
  };

  return <div className="min-h-screen grid place-items-center p-4">
    <form className="card w-full max-w-md space-y-3" onSubmit={submit}>
      <h2 className="text-2xl font-bold">Create VPW Account</h2>
      {['name', 'email', 'phone', 'password'].map((f) => (
        <input key={f} className="input" placeholder={f[0].toUpperCase() + f.slice(1)} type={f === 'password' ? 'password' : 'text'} onChange={(e) => setForm({ ...form, [f]: e.target.value })} />
      ))}
      <button className="btn-primary w-full">Register</button>
      <Link to="/login" className="text-sm text-vpw-primary">Back to login</Link>
    </form>
  </div>;
}
