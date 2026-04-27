import { Bell, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = ['Small Cap', 'Mid Cap', 'Large Cap', 'ELSS Tax Saver', 'High Return', 'Gold Fund'];
const funds = [
  { name: 'Axis Small Cap Fund', category: 'Small Cap', returns3Y: '19.3%', risk: 'High' },
  { name: 'ICICI Prudential Bluechip', category: 'Large Cap', returns3Y: '14.1%', risk: 'Moderate' },
  { name: 'Global Tech Discovery Fund', category: 'Thematic', returns3Y: '25.9%', risk: 'High' }
];

export default function HomePage() {
  return <div className="space-y-4">
    <header className="card flex items-center justify-between">
      <h1 className="font-bold text-lg">VPW Dashboard</h1>
      <div className="flex gap-3"><Search size={18} /><Bell size={18} /><img src="https://i.pravatar.cc/40" className="rounded-full" /></div>
    </header>
    <section className="card bg-gradient-to-r from-indigo-600 to-violet-500 text-white">
      <p className="text-sm">Featured Opportunity</p><h2 className="text-2xl font-bold">Global Tech Discovery Fund</h2>
      <p className="opacity-90">Discover global innovators with a premium investing experience.</p>
    </section>
    <section className="card">
      <h3 className="font-semibold mb-3">Quick Discover</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">{categories.map((c) => <span key={c} className="px-3 py-2 rounded-xl bg-indigo-50 text-vpw-primary text-sm">{c}</span>)}</div>
    </section>
    <section className="card overflow-auto">
      <h3 className="font-semibold mb-3">Popular Funds</h3>
      <table className="w-full text-sm"><thead><tr className="text-left text-slate-500"><th>Fund</th><th>Category</th><th>3Y</th><th>Risk</th></tr></thead><tbody>{funds.map((f) => <tr key={f.name} className="border-t"><td>{f.name}</td><td>{f.category}</td><td>{f.returns3Y}</td><td>{f.risk}</td></tr>)}</tbody></table>
    </section>
    <div className="grid md:grid-cols-2 gap-4">
      <Link className="card hover:shadow-md" to="/funds">Start a SIP</Link>
      <Link className="card hover:shadow-md" to="/portfolio">Track Portfolio</Link>
    </div>
  </div>;
}
