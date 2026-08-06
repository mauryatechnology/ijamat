import { useData } from '../../../context/DataContext'

export default function SabaqGroupWise() {
  const { sabaqAttendance } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Sabaq Group-Wise Attendance</h1>
        <p className="text-sm text-slate-500">Group level attendance metrics and breakdown</p>
      </div>

      <div className="space-y-4 text-xs">
        {sabaqAttendance.groups.map(group => {
          const groupRecords = sabaqAttendance.records.filter(r => r.group === group)
          const avgPct = Math.round(groupRecords.reduce((sum, r) => sum + r.percentage, 0) / (groupRecords.length || 1))
          return (
            <div key={group} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex justify-between items-center border-b pb-2">
                <h2 className="font-bold text-base text-blue-700">{group}</h2>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded font-bold text-xs">Average: {avgPct}%</span>
              </div>
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-100 border-b">
                    <th className="p-2">Date</th>
                    <th className="p-2">Sabaq Type</th>
                    <th className="p-2">Masool</th>
                    <th className="p-2 text-center">Attendance %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {groupRecords.map(r => (
                    <tr key={r.id}>
                      <td className="p-2 font-semibold">{r.date}</td>
                      <td className="p-2">{r.type}</td>
                      <td className="p-2 text-slate-600">{r.masool}</td>
                      <td className="p-2 text-center font-bold text-emerald-600">{r.percentage}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function SabaqHOFWise() {
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
