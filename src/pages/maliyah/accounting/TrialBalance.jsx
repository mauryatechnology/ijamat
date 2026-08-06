import { useData } from '../../../context/DataContext'

export default function TrialBalance() {
  const { accountsLedger } = useData()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Trial Balance Statement</h1>
        <p className="text-sm text-slate-500">Summary of all debit and credit balances in general ledger</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b text-slate-600">
              <th className="p-3">Account Code</th>
              <th className="p-3">Account Name</th>
              <th className="p-3">Type</th>
              <th className="p-3 text-right">Debit Balance (₹)</th>
              <th className="p-3 text-right">Credit Balance (₹)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {accountsLedger.accounts.map(a => {
              const txns = accountsLedger.transactions.filter(t => t.accountCode === a.code)
              const dr = txns.reduce((sum, t) => sum + t.debit, 0)
              const cr = txns.reduce((sum, t) => sum + t.credit, 0)
              const diff = dr - cr
              return (
                <tr key={a.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-semibold text-blue-600">{a.code}</td>
                  <td className="p-3 font-medium text-slate-800">{a.name}</td>
                  <td className="p-3">{a.type}</td>
                  <td className="p-3 text-right font-medium text-emerald-600">{diff > 0 ? `₹${diff.toLocaleString()}` : '-'}</td>
                  <td className="p-3 text-right font-medium text-amber-600">{diff < 0 ? `₹${Math.abs(diff).toLocaleString()}` : '-'}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function FinalAccount() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Final Accounts & Balance Sheet</h1>
        <p className="text-sm text-slate-500">Income & Expenditure statement and Annual Balance Sheet</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="font-bold text-base border-b pb-2 text-slate-800">Income & Expenditure Statement</h2>
          <div className="space-y-2">
            <div className="flex justify-between py-1 border-b"><span>Total Collection Revenue</span><span className="font-bold text-emerald-600">₹4,85,000</span></div>
            <div className="flex justify-between py-1 border-b"><span>Total Operating Expenses</span><span className="font-bold text-amber-600">₹1,85,000</span></div>
            <div className="flex justify-between py-2 font-bold text-sm text-blue-700 bg-slate-50 p-2 rounded"><span>Net Surplus / Excess of Income</span><span>₹3,00,000</span></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="font-bold text-base border-b pb-2 text-slate-800">Balance Sheet Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between py-1 border-b"><span>Total Assets (Cash, Bank, FDs)</span><span className="font-bold text-blue-700">₹7,80,000</span></div>
            <div className="flex justify-between py-1 border-b"><span>Capital Fund & Reserves</span><span className="font-bold text-purple-700">₹7,80,000</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
