import { useData } from '../../../context/DataContext'

export default function DispatchReport() {
  const { thalis } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Daily Dispatch Audit Report</h1>
        <p className="text-sm text-slate-500">Real-time log of dispatched thalis for today's menu</p>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Thali #</th>
              <th className="p-3">Recipient Name</th>
              <th className="p-3">Route / Location</th>
              <th className="p-3 text-right">Dispatch Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {thalis.map((t, idx) => (
              <tr key={t.id}>
                <td className="p-3 font-mono font-semibold text-blue-700">{t.thaliNo}</td>
                <td className="p-3 font-medium text-slate-800">{t.name}</td>
                <td className="p-3">{t.location}</td>
                <td className="p-3 text-right font-mono text-slate-500">11:3{idx} AM</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
