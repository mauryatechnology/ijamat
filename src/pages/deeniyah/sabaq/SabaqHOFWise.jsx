import { useData } from '../../../context/DataContext'

export default function SabaqHOFWise() {
  const { members } = useData()
  const hofs = members.filter(m => m.hofOrFm === 'HOF')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Sabaq HOF-Wise Attendance Tracker</h1>
        <p className="text-sm text-slate-500">Track Head of Family (HOF) sabaq attendance history</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Sabil #</th>
              <th className="p-3">ITS ID</th>
              <th className="p-3">HOF Name</th>
              <th className="p-3">Mohalla</th>
              <th className="p-3 text-center">Attendance Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {hofs.map(m => (
              <tr key={m.id}>
                <td className="p-3 font-mono font-semibold">{m.sabilNo}</td>
                <td className="p-3">{m.itsId}</td>
                <td className="p-3 font-medium text-slate-800">{m.name}</td>
                <td className="p-3">{m.mohalla}</td>
                <td className="p-3 text-center"><span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-semibold">Regular (85%)</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
