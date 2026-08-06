import { useData } from '../../context/DataContext'

export default function StaffSalary() {
  const { masoolData } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Jamaat Staff Payroll & Salary Vouchers</h1>
        <p className="text-sm text-slate-500">Monthly staff salary disbursement audit</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Staff Name</th>
              <th className="p-3">Designation</th>
              <th className="p-3 text-right">Basic Pay</th>
              <th className="p-3 text-right">Net Salary</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {masoolData.masools.slice(0, 3).map(m => (
              <tr key={m.id}>
                <td className="p-3 font-medium text-slate-800">{m.name}</td>
                <td className="p-3">Office Executive</td>
                <td className="p-3 text-right">₹18,000</td>
                <td className="p-3 text-right font-bold text-emerald-600">₹18,000</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
