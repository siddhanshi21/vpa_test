import { useEffect, useState } from 'react';
import api from '../../api/client';

export default function AdminKYCPage() {
  const [kyc, setKyc] = useState([]); const load = () => api.get('/kyc/pending').then((r) => setKyc(r.data));
  useEffect(load, []);
  const action = async (id, type) => { await api.patch(`/kyc/${id}/${type}`, { adminRemarks: `${type} by admin` }); load(); };
  return <div className="space-y-2"><h2 className="text-xl font-bold">KYC Approvals</h2><div className="card">{kyc.map((k) => <div className="border-t py-2" key={k._id}><p>{k.userId?.name} • PAN {k.panNumber}</p><div className="flex gap-2"><button className="btn-primary" onClick={() => action(k._id, 'approve')}>Approve</button><button className="px-3 py-2 rounded-xl bg-red-500 text-white" onClick={() => action(k._id, 'reject')}>Reject</button></div></div>)}</div></div>;
}
