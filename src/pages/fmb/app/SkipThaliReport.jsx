import { useData } from '../../../context/DataContext'

export default function SkipThaliReport() {
  const { thalis } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Thali Skip / Pause Requests Report</h1>
        <p className="text-sm text-slate-500">Mumineen daily thali skip requests submitted via mobile app</p>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Thali #</th>
              <th className="p-3">Name</th>
              <th className="p-3">Skip Date</th>
              <th className="p-3">Reason</th>
              <th className="p-3 text-right">Requested At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {thalis.slice(0, 3).map((t, idx) => (
              <tr key={t.id}>
                <td className="p-3 font-mono font-semibold text-blue-700">{t.thaliNo}</td>
                <td className="p-3 font-medium text-slate-800">{t.name}</td>
                <td className="p-3 font-semibold text-amber-700">2024-06-15</td>
                <td className="p-3 text-slate-600">Travelling Out of Station</td>
                <td className="p-3 text-right text-slate-400 font-mono">08:1{idx} AM</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
