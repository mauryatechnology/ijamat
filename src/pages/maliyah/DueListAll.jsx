import { useData } from '../../context/DataContext'

export default function DueListAll() {
  const { sabil } = useData()

  const totalDues = sabil.reduce((sum, s) => sum + Math.floor(s.takhmeen * 0.3), 0)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Master Due List (All Sabil Holders)</h1>
          <p className="text-sm text-slate-500">Comprehensive list of all active Sabil dues</p>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-500 block">Total Outstanding Jamaat Dues</span>
          <span className="text-xl font-bold text-amber-600">₹{totalDues.toLocaleString()}</span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-600 border-b">
              <th className="p-3">Sabil #</th>
              <th className="p-3">ITS ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Mohalla</th>
              <th className="p-3">Sabil Type</th>
              <th className="p-3 text-right">Annual Takhmeen</th>
              <th className="p-3 text-right">Opening Bal</th>
              <th className="p-3 text-right">Paid</th>
              <th className="p-3 text-right font-bold">Current Dues</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sabil.map(s => {
              const paid = Math.floor(s.takhmeen * 0.7)
              const due = Math.floor(s.takhmeen * 0.3) + s.openingBalance
              return (
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-semibold">{s.sabilNo}</td>
                  <td className="p-3 text-slate-500">{s.itsId}</td>
                  <td className="p-3 font-medium text-slate-800">{s.name}</td>
                  <td className="p-3">{s.mohalla}</td>
                  <td className="p-3">{s.type}</td>
                  <td className="p-3 text-right">₹{s.takhmeen.toLocaleString()}</td>
                  <td className="p-3 text-right text-slate-500">₹{s.openingBalance.toLocaleString()}</td>
                  <td className="p-3 text-right text-emerald-600 font-medium">₹{paid.toLocaleString()}</td>
                  <td className="p-3 text-right font-bold text-amber-600">₹{due.toLocaleString()}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
