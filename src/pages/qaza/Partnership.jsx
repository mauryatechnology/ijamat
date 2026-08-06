import { useData } from '../../context/DataContext'

export default function Partnership() {
  const { members } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Commercial Partnership Disputes Audit</h1>
        <p className="text-sm text-slate-500">Arbitration logs for business partnership disputes</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Case #</th>
              <th className="p-3">Partner 1</th>
              <th className="p-3">Partner 2</th>
              <th className="p-3 text-center">Arbitration Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {members.slice(0, 2).map((m, idx) => (
              <tr key={m.id}>
                <td className="p-3 font-mono font-semibold text-blue-700">PTR-200{m.id}</td>
                <td className="p-3 font-medium text-slate-800">{m.name}</td>
                <td className="p-3 text-slate-700">Shk. Murtaza b. Taherali</td>
                <td className="p-3 text-center"><span className="px-2 py-0.5 rounded text-[10px] bg-amber-100 text-amber-800 font-semibold">In Hearing</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
