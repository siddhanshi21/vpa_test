import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
const data = [{ name: 'Users', v: 120 }, { name: 'Active Investors', v: 74 }, { name: 'AUM', v: 280 }, { name: 'SIPs', v: 45 }, { name: 'Txn', v: 310 }];

export default function AdminReportsPage() {
  return <div className="space-y-3"><h2 className="text-xl font-bold">Reports & Analytics</h2><div className="card h-72"><ResponsiveContainer width="100%" height="100%"><BarChart data={data}><XAxis dataKey="name" /><Tooltip /><Bar dataKey="v" fill="#4F46E5" /></BarChart></ResponsiveContainer></div><div className="card">System performance stats and portfolio insights module placeholder.</div></div>;
}
