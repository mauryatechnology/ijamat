import { useState } from 'react'
import { useData } from '../../../context/DataContext'

export default function SabaqAttendanceReport() {
  const { sabaqAttendance } = useData()
  const [selectedGroup, setSelectedGroup] = useState('All')

  const filtered = selectedGroup === 'All' ? sabaqAttendance.records : sabaqAttendance.records.filter(r => r.group === selectedGroup)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Sabaq Attendance Master Report</h1>
        <p className="text-sm text-slate-500">Overview of Sabaq attendance across groups</p>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-xs flex gap-4 items-center">
        <label className="font-semibold text-slate-600">Filter Group:</label>
        <select value={selectedGroup} onChange={e => setSelectedGroup(e.target.value)} className="p-2 border rounded bg-slate-50">
          <option value="All">All Groups</option>
          {sabaqAttendance.groups.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Date</th>
              <th className="p-3">Sabaq Group</th>
              <th className="p-3">Type</th>
              <th className="p-3">Masool In-charge</th>
              <th className="p-3 text-center">Present / Total</th>
              <th className="p-3 text-center">Percentage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map(r => (
              <tr key={r.id} className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-800">{r.date}</td>
                <td className="p-3 font-medium text-blue-700">{r.group}</td>
                <td className="p-3">{r.type}</td>
                <td className="p-3 text-slate-600">{r.masool}</td>
                <td className="p-3 text-center font-bold text-slate-800">{r.presentCount} / {r.totalMembers}</td>
                <td className="p-3 text-center">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${r.percentage >= 80 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                    {r.percentage}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
