import { useData } from '../../context/DataContext'

export default function InheritanceDistribution() {
  const { members } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Miras & Inheritance Distribution Certificates</h1>
        <p className="text-sm text-slate-500">Sharia property inheritance division certificates (Miras)</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Miras File #</th>
              <th className="p-3">Deceased Name</th>
              <th className="p-3 font-mono">Heirs Count</th>
              <th className="p-3 text-right">Certificate Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {members.slice(0, 2).map(m => (
              <tr key={m.id}>
                <td className="p-3 font-mono font-semibold text-blue-700">MIR-400{m.id}</td>
                <td className="p-3 font-medium text-slate-800">{m.name}</td>
                <td className="p-3 font-mono">4 Heirs</td>
                <td className="p-3 text-right font-mono text-slate-500">2024-03-10</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
