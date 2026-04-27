import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';

export default function FundsPage() {
  const [funds, setFunds] = useState([]);
  const [filters, setFilters] = useState({ search: '', category: '', riskLevel: '', assetClass: '' });
  useEffect(() => { api.get('/funds', { params: filters }).then((r) => setFunds(r.data)); }, [filters]);

  return <div className="space-y-4">
    <div className="card grid md:grid-cols-4 gap-2">
      {['search', 'category', 'riskLevel', 'assetClass'].map((f) => <input key={f} className="input" placeholder={f} onChange={(e) => setFilters((p) => ({ ...p, [f]: e.target.value }))} />)}
    </div>
    <div className="grid gap-3">{funds.map((f) => <Link to={`/funds/${f._id}`} key={f._id} className="card hover:shadow-md"><h3 className="font-semibold">{f.name}</h3><p className="text-sm text-slate-500">{f.category} • {f.riskLevel} risk • 3Y {f.returns3Y}%</p></Link>)}</div>
  </div>;
}
