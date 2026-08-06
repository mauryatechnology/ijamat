import { useData } from '../../context/DataContext'

export default function DueListMonthly() {
  const { sabil } = useData()

  const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar']

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Monthly Due List Breakdown</h1>
        <p className="text-sm text-slate-500">Month-by-month due installment schedule per member</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto text-[11px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-600 border-b">
              <th className="p-2 sticky left-0 bg-slate-100">Sabil #</th>
              <th className="p-2 sticky left-12 bg-slate-100">Name</th>
              {months.map(m => (
                <th key={m} className="p-2 text-center">{m}</th>
              ))}
              <th className="p-2 text-right">Total Due</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sabil.slice(0, 10).map(s => {
              const monthlyInst = Math.floor(s.takhmeen / 12)
              return (
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="p-2 font-mono font-semibold sticky left-0 bg-white">{s.sabilNo}</td>
                  <td className="p-2 font-medium text-slate-800 sticky left-12 bg-white">{s.name}</td>
                  {months.map((m, idx) => (
                    <td key={m} className={`p-2 text-center ${idx < 4 ? 'text-emerald-600 font-medium' : 'text-slate-400'}`}>
                      {idx < 4 ? 'Paid' : `₹${monthlyInst}`}
                    </td>
                  ))}
                  <td className="p-2 text-right font-bold text-amber-600">₹{monthlyInst * 8}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
