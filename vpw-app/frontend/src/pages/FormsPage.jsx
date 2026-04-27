const forms = ['KYC form', 'SIP form', 'Redemption form', 'Mandate form', 'Investment confirmation form'];

export default function FormsPage() {
  return <div className="space-y-4"><h2 className="text-xl font-bold">Forms Management</h2>{forms.map((f) => <section key={f} className="card print:shadow-none"><h3 className="font-semibold">{f}</h3><p className="text-sm text-slate-500">Printable/PDF-ready template. Use browser print to download.</p><button onClick={() => window.print()} className="btn-primary mt-2">Print / Save PDF</button></section>)}</div>;
}
