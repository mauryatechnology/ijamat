import { useData } from '../../context/DataContext'

export default function DueListColumn() {
  const { sabil } = useData()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Columnar Due List</h1>
        <p className="text-sm text-slate-500">Multi-column due list categorized by head (Barkat, FMB, Sabil, Niyaz)</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-600 border-b">
              <th className="p-3">Sabil #</th>
              <th className="p-3">ITS ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Mohalla</th>
              <th className="p-3 text-right">Barkat Due</th>
              <th className="p-3 text-right">FMB Due</th>
              <th className="p-3 text-right">Sabil Due</th>
              <th className="p-3 text-right">Niyaz Due</th>
              <th className="p-3 text-right font-bold">Total Dues</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sabil.map(s => {
              const bDue = Math.floor(s.takhmeen * 0.2)
              const fDue = 1500
              const sDue = 500
              const nDue = 1000
              const total = bDue + fDue + sDue + nDue
              return (
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-semibold">{s.sabilNo}</td>
                  <td className="p-3 text-slate-500">{s.itsId}</td>
                  <td className="p-3 font-medium text-slate-800">{s.name}</td>
                  <td className="p-3">{s.mohalla}</td>
                  <td className="p-3 text-right text-slate-600">₹{bDue.toLocaleString()}</td>
                  <td className="p-3 text-right text-slate-600">₹{fDue.toLocaleString()}</td>
                  <td className="p-3 text-right text-slate-600">₹{sDue.toLocaleString()}</td>
                  <td className="p-3 text-right text-slate-600">₹{nDue.toLocaleString()}</td>
                  <td className="p-3 text-right font-bold text-amber-600">₹{total.toLocaleString()}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
