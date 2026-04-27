import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../api/client';

const trend = [{ m: 'Jan', v: 120000 }, { m: 'Feb', v: 126000 }, { m: 'Mar', v: 132000 }, { m: 'Apr', v: 141000 }];

export default function PortfolioPage() {
  const [p, setP] = useState({ totalInvested: 0, currentValue: 0, totalReturns: 0, holdings: [] });
  const [orders, setOrders] = useState([]);
  useEffect(() => { api.get('/portfolio/my').then((r) => r.data && setP(r.data)); api.get('/investments/my').then((r) => setOrders(r.data)); }, []);

  return <div className="space-y-4">
    <div className="grid md:grid-cols-4 gap-3">
      <Stat title="Total Invested" value={p.totalInvested} /><Stat title="Current Value" value={p.currentValue} /><Stat title="Gain/Loss" value={p.totalReturns} /><Stat title="CAN Status" value="Active" />
    </div>
    <div className="card h-64"><ResponsiveContainer width="100%" height="100%"><LineChart data={trend}><XAxis dataKey="m" /><YAxis /><Tooltip /><Line type="monotone" dataKey="v" stroke="#4F46E5" strokeWidth={3} /></LineChart></ResponsiveContainer></div>
    <div className="card"><h3 className="font-semibold mb-2">Investment / Order History</h3>{orders.map((o) => <div key={o._id} className="border-t py-2 text-sm">{o.type} • ₹{o.amount} • {o.status} • {o.orderId}</div>)}</div>
  </div>;
}
const Stat = ({ title, value }) => <div className="card"><p className="text-slate-500 text-sm">{title}</p><h3 className="text-xl font-bold">{typeof value === 'number' ? `₹${value.toLocaleString()}` : value}</h3></div>;
