import { useData } from '../../context/DataContext'

export default function BusinessDirectory() {
  const { members } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Iqtesadiyah Commercial & Business Directory</h1>
        <p className="text-sm text-slate-500">Business directory of Mumineen enterprises and services</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Business Name</th>
              <th className="p-3">Proprietor</th>
              <th className="p-3">Category</th>
              <th className="p-3 font-mono">Contact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {members.slice(0, 4).map(m => (
              <tr key={m.id}>
                <td className="p-3 font-bold text-slate-800">{m.name} Enterprises</td>
                <td className="p-3 font-medium text-slate-700">{m.name}</td>
                <td className="p-3 text-slate-600">Textile & Garments</td>
                <td className="p-3 font-mono">{m.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
