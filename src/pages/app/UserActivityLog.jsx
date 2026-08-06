import { useData } from '../../context/DataContext'

export default function UserActivityLog() {
  const { members } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Mobile App User Activity Audit Log</h1>
        <p className="text-sm text-slate-500">Real-time login and feature usage telemetry</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">ITS ID</th>
              <th className="p-3">User Name</th>
              <th className="p-3">Action Performed</th>
              <th className="p-3 text-right">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {members.slice(0, 5).map((m, idx) => (
              <tr key={m.id}>
                <td className="p-3 font-mono">{m.itsId}</td>
                <td className="p-3 font-medium text-slate-800">{m.name}</td>
                <td className="p-3 text-slate-600">Viewed Niyaz Menu Schedule</td>
                <td className="p-3 text-right font-mono text-slate-400">Today, 10:2{idx} AM</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
