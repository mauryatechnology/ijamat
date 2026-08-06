import { useData } from '../../context/DataContext'

export default function LiveEventPermission() {
  const { members } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Live Broadcast Access Permissions</h1>
        <p className="text-sm text-slate-500">Authorize specific Mumineen for private live relay stream</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">ITS ID</th>
              <th className="p-3">Name</th>
              <th className="p-3 text-center">Relay Permission</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {members.slice(0, 5).map(m => (
              <tr key={m.id}>
                <td className="p-3 font-mono">{m.itsId}</td>
                <td className="p-3 font-medium text-slate-800">{m.name}</td>
                <td className="p-3 text-center"><span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-semibold">Granted</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
