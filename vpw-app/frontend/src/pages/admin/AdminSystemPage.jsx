import { useEffect, useState } from 'react';
import api from '../../api/client';

export default function AdminSystemPage() {
  const [logs, setLogs] = useState([]);
  const [toggles, setToggles] = useState({ navSync: true, complianceLock: false, marketDataFeed: true });
  useEffect(() => { api.get('/admin/audit-logs').then((r) => setLogs(r.data)); }, []);
  return <div className="space-y-3"><h2 className="text-xl font-bold">System Control</h2><div className="card space-y-2">{Object.keys(toggles).map((k) => <label key={k} className="flex justify-between">{k}<input type="checkbox" checked={toggles[k]} onChange={() => setToggles({ ...toggles, [k]: !toggles[k] })} /></label>)}</div><div className="card"><h3 className="font-semibold">Audit Logs</h3>{logs.map((l) => <p key={l._id} className="text-sm border-t py-2">{l.action} • {l.module} • {new Date(l.createdAt).toLocaleString()}</p>)}</div></div>;
}
