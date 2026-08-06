import { useData } from '../../../context/DataContext'

export default function RegReport() {
  const { thalis } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Thali Registration Master Audit Report</h1>
        <p className="text-sm text-slate-500">Comprehensive list of all thalis registered in session 1445-1446 H</p>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Thali #</th>
              <th className="p-3">ITS ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Location</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {thalis.map(t => (
              <tr key={t.id}>
                <td className="p-3 font-mono font-semibold text-blue-700">{t.thaliNo}</td>
                <td className="p-3 font-mono">{t.itsId}</td>
                <td className="p-3 font-medium text-slate-800">{t.name}</td>
                <td className="p-3">{t.location}</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-semibold">{t.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
