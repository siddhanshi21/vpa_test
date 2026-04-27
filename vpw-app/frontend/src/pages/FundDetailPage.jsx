import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/client';

export default function FundDetailPage() {
  const { id } = useParams();
  const [fund, setFund] = useState(null);
  const [amount, setAmount] = useState(5000);
  const [sip, setSip] = useState(true);
  useEffect(() => { api.get(`/funds/${id}`).then((r) => setFund(r.data)); }, [id]);

  const invest = async () => {
    await api.post('/investments', { fundId: id, type: sip ? 'SIP' : 'LUMPSUM', amount, frequency: sip ? 'Monthly' : undefined, startDate: new Date() });
    alert('Order placed successfully');
  };

  if (!fund) return <div>Loading...</div>;
  return <div className="space-y-4">
    <div className="card"><h1 className="text-2xl font-bold">{fund.name}</h1><p>{fund.description}</p><p className="text-sm text-slate-500">NAV {fund.nav} | 1Y {fund.returns1Y}% | 3Y {fund.returns3Y}%</p></div>
    <div className="card space-y-2">
      <div className="flex gap-2"><button onClick={() => setSip(true)} className={`px-4 py-2 rounded-xl ${sip ? 'bg-vpw-primary text-white' : 'bg-slate-100'}`}>Start SIP</button><button onClick={() => setSip(false)} className={`px-4 py-2 rounded-xl ${!sip ? 'bg-vpw-primary text-white' : 'bg-slate-100'}`}>Invest Now</button></div>
      <input className="input" type="number" value={amount} onChange={(e) => setAmount(+e.target.value)} />
      <button className="btn-primary" onClick={invest}>Submit {sip ? 'SIP' : 'Lump sum'} Order</button>
    </div>
  </div>;
}
