import { useData } from '../../../context/DataContext'

export default function SabaqMumineen() {
  const { members } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Sabaq Mumineen Participant Directory</h1>
        <p className="text-sm text-slate-500">All registered Mumineen attending Sabaq</p>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">ITS ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Mohalla</th>
              <th className="p-3">Gender</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {members.slice(0, 10).map(m => (
              <tr key={m.id}>
                <td className="p-3 font-mono font-semibold">{m.itsId}</td>
                <td className="p-3 font-medium text-slate-800">{m.name}</td>
                <td className="p-3">{m.mohalla}</td>
                <td className="p-3">{m.gender}</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-semibold">Active</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
