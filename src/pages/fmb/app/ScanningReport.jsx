import { useData } from '../../../context/DataContext'

export default function ScanningReport() {
  const { thalis } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Mobile Scanner Log Report</h1>
        <p className="text-sm text-slate-500">Scan history from distributor mobile apps</p>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Thali #</th>
              <th className="p-3">Scanned By</th>
              <th className="p-3">Location Geo-Tag</th>
              <th className="p-3 text-right">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {thalis.slice(0, 5).map((t, idx) => (
              <tr key={t.id}>
                <td className="p-3 font-mono font-semibold">{t.thaliNo}</td>
                <td className="p-3">Distributor Driver #{idx + 1}</td>
                <td className="p-3 text-slate-500 font-mono">21.1702 N, 72.8311 E</td>
                <td className="p-3 text-right font-mono text-slate-500">11:4{idx} AM</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
