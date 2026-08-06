import { useData } from '../../../context/DataContext'

export default function SabaqMasoolWise() {
  const { masoolData } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Sabaq Masool-Wise Performance</h1>
        <p className="text-sm text-slate-500">Attendance percentages grouped by assigned Masool</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Masool Name</th>
              <th className="p-3">Zone</th>
              <th className="p-3 text-center">Avg Attendance %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {masoolData.masools.map(m => (
              <tr key={m.id}>
                <td className="p-3 font-medium text-slate-800">{m.name}</td>
                <td className="p-3">{m.zone}</td>
                <td className="p-3 text-center font-bold text-emerald-600">88%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
