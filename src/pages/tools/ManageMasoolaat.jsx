import { useData } from '../../context/DataContext'

export default function ManageMasoolaat() {
  const { masoolData } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Manage Masoolaat Women Committee</h1>
        <p className="text-sm text-slate-500">Configure Masoolaat assignments and sector responsibilities</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Masoolaat Name</th>
              <th className="p-3">Assigned Zone</th>
              <th className="p-3">Contact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {masoolData.masoolaats.map(m => (
              <tr key={m.id}>
                <td className="p-3 font-medium text-slate-800">{m.name}</td>
                <td className="p-3">{m.zone}</td>
                <td className="p-3 font-mono">{m.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
