import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      nav('/home');
    } catch (e) { setError(e.response?.data?.message || 'Login failed'); }
  };

  return <div className="min-h-screen grid place-items-center p-4">
    <form className="card w-full max-w-md space-y-4" onSubmit={submit}>
      <h2 className="text-2xl font-bold">Welcome to VPW</h2>
      <input className="input" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input className="input" placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button className="btn-primary w-full">Login</button>
      <div className="text-sm text-slate-500 flex justify-between">
        <Link to="/register">Create account</Link>
        <span>Forgot password? OTP flow placeholder</span>
      </div>
    </form>
  </div>;
}
