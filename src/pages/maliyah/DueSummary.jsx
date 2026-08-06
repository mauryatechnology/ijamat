import { useData } from '../../context/DataContext'

export default function DueSummary() {
  const { sabil } = useData()

  const mohallaSummary = sabil.reduce((acc, curr) => {
    if (!acc[curr.mohalla]) {
      acc[curr.mohalla] = { count: 0, takhmeen: 0, dues: 0 }
    }
    acc[curr.mohalla].count += 1
    acc[curr.mohalla].takhmeen += curr.takhmeen
    acc[curr.mohalla].dues += Math.floor(curr.takhmeen * 0.3)
    return acc
  }, {})

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Due Summary Report</h1>
        <p className="text-sm text-slate-500">Mohalla-wise summary of dues and collection percentages</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="font-semibold text-slate-700 text-lg border-b pb-2">Mohalla Breakdown</h2>
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Mohalla</th>
              <th className="p-3 text-center">Sabil Count</th>
              <th className="p-3 text-right">Total Takhmeen</th>
              <th className="p-3 text-right">Outstanding Dues</th>
              <th className="p-3 text-center">Recovery %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {Object.entries(mohallaSummary).map(([mohalla, stats]) => {
              const recoveryPct = Math.round(((stats.takhmeen - stats.dues) / (stats.takhmeen || 1)) * 100)
              return (
                <tr key={mohalla} className="hover:bg-slate-50">
                  <td className="p-3 font-medium text-slate-800">{mohalla}</td>
                  <td className="p-3 text-center">{stats.count}</td>
                  <td className="p-3 text-right">₹{stats.takhmeen.toLocaleString()}</td>
                  <td className="p-3 text-right font-bold text-amber-600">₹{stats.dues.toLocaleString()}</td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                      {recoveryPct}%
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
