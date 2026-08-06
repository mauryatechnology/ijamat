import { useData } from '../../context/DataContext'

export default function Vasiyat() {
  const { members } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Qaza Vasiyat & Will Registration</h1>
        <p className="text-sm text-slate-500">Registered wills, testaments and legal declarations</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Doc #</th>
              <th className="p-3">ITS ID</th>
              <th className="p-3">Declarant Name</th>
              <th className="p-3 text-right">Registration Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {members.slice(0, 3).map(m => (
              <tr key={m.id}>
                <td className="p-3 font-mono font-semibold text-blue-700">VAS-100{m.id}</td>
                <td className="p-3 font-mono">{m.itsId}</td>
                <td className="p-3 font-medium text-slate-800">{m.name}</td>
                <td className="p-3 text-right font-mono text-slate-500">2024-01-15</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
