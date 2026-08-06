import { useData } from '../../../context/DataContext'

export default function MenuEdit() {
  const { niyazEvents } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Edit / Update Menu Schedule</h1>
        <p className="text-sm text-slate-500">Modify existing thali menu schedules</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Date</th>
              <th className="p-3">Event</th>
              <th className="p-3">Menu</th>
              <th className="p-3">Sponsor</th>
              <th className="p-3 text-right">Cost</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {niyazEvents.map(e => (
              <tr key={e.id} className="hover:bg-slate-50">
                <td className="p-3 font-semibold">{e.date}</td>
                <td className="p-3 font-medium text-amber-700">{e.eventSpecial}</td>
                <td className="p-3 text-slate-800">{e.menu}</td>
                <td className="p-3 text-slate-600">{e.khidmatByName}</td>
                <td className="p-3 text-right font-bold text-emerald-600">₹{e.cost.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function MenuReport() {
  const { niyazEvents } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">FMB Menu Master Report</h1>
        <p className="text-sm text-slate-500">Comprehensive report of served and scheduled menus</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Date</th>
              <th className="p-3">Dept</th>
              <th className="p-3">Occasion</th>
              <th className="p-3">Served Menu</th>
              <th className="p-3">Thali Count</th>
              <th className="p-3 text-right">Total Cost</th>
              <th className="p-3 text-right">Cost / Thali</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {niyazEvents.map(e => (
              <tr key={e.id}>
                <td className="p-3 font-semibold">{e.date}</td>
                <td className="p-3">{e.dept}</td>
                <td className="p-3">{e.eventSpecial}</td>
                <td className="p-3 font-medium text-slate-800">{e.menu}</td>
                <td className="p-3">{e.thaliCount}</td>
                <td className="p-3 text-right">₹{e.cost.toLocaleString()}</td>
                <td className="p-3 text-right font-bold text-blue-600">₹{Math.round(e.costPerThali || e.cost / e.thaliCount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
