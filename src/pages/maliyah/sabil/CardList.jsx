import { useData } from '../../../context/DataContext'

export default function CardList() {
  const { sabil } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Sabil Card Master Directory</h1>
        <p className="text-sm text-slate-500">Overview of registered Sabil Cards</p>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b text-slate-600">
              <th className="p-3">Sabil #</th>
              <th className="p-3">ITS ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Mohalla</th>
              <th className="p-3">Sabil Type</th>
              <th className="p-3 text-right">Annual Takhmeen</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sabil.map(s => (
              <tr key={s.id} className="hover:bg-slate-50">
                <td className="p-3 font-mono font-semibold text-blue-600">{s.sabilNo}</td>
                <td className="p-3">{s.itsId}</td>
                <td className="p-3 font-medium text-slate-800">{s.name}</td>
                <td className="p-3">{s.mohalla}</td>
                <td className="p-3">{s.type}</td>
                <td className="p-3 text-right">₹{s.takhmeen.toLocaleString()}</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-semibold">{s.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
