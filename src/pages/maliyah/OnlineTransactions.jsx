import { useData } from '../../context/DataContext'

export default function OnlineTransactions() {
  const { collections } = useData()

  const onlineTxs = collections.filter(c => c.mode === 'UPI' || c.mode === 'Bank Transfer' || c.mode === 'Online')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Online Transactions Report</h1>
        <p className="text-sm text-slate-500">Log of digital payments, UPI, online portal transactions, and direct transfers</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-600 border-b">
              <th className="p-3">Receipt No</th>
              <th className="p-3">Date</th>
              <th className="p-3">Sabil #</th>
              <th className="p-3">Name</th>
              <th className="p-3">Head</th>
              <th className="p-3">Payment Channel</th>
              <th className="p-3 text-right">Amount</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {onlineTxs.map(t => (
              <tr key={t.id} className="hover:bg-slate-50">
                <td className="p-3 font-mono font-semibold text-blue-600">{t.receiptNo}</td>
                <td className="p-3">{t.date}</td>
                <td className="p-3">{t.sabilNo}</td>
                <td className="p-3 font-medium text-slate-800">{t.name}</td>
                <td className="p-3">{t.head}</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-100 text-indigo-800">{t.mode}</span></td>
                <td className="p-3 text-right font-bold text-emerald-600">₹{t.amount.toLocaleString()}</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">Settled</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
