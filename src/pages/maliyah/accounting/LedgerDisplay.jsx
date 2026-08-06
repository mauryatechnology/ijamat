import { useState } from 'react'
import { useData } from '../../../context/DataContext'

export default function LedgerDisplay() {
  const { accountsLedger } = useData()
  const [selectedCode, setSelectedCode] = useState('1001')

  const selectedAccount = accountsLedger.accounts.find(a => a.code === selectedCode)
  const accountTxns = accountsLedger.transactions.filter(t => t.accountCode === selectedCode)

  const totalDebit = accountTxns.reduce((sum, t) => sum + t.debit, 0)
  const totalCredit = accountTxns.reduce((sum, t) => sum + t.credit, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">General Ledger Display</h1>
        <p className="text-sm text-slate-500">View double-entry ledger transactions by account code</p>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 text-xs">
        <label className="font-semibold text-slate-600">Select Account Head:</label>
        <select value={selectedCode} onChange={e => setSelectedCode(e.target.value)} className="p-2 border rounded bg-slate-50 font-medium">
          {accountsLedger.accounts.map(a => (
            <option key={a.id} value={a.code}>{a.code} - {a.name} ({a.type})</option>
          ))}
        </select>
      </div>

      {selectedAccount && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 text-xs">
          <div className="flex justify-between border-b pb-3">
            <div>
              <h2 className="text-lg font-bold text-slate-800">{selectedAccount.code} — {selectedAccount.name}</h2>
              <p className="text-slate-500">Category: {selectedAccount.group} | Type: {selectedAccount.type}</p>
            </div>
            <div className="text-right">
              <span className="text-slate-500 block">Closing Balance</span>
              <span className="text-xl font-bold text-blue-700">₹{(totalDebit - totalCredit).toLocaleString()}</span>
            </div>
          </div>

          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-100 border-b">
                <th className="p-2">Date</th>
                <th className="p-2">Voucher No</th>
                <th className="p-2">Narration</th>
                <th className="p-2 text-right">Debit (₹)</th>
                <th className="p-2 text-right">Credit (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {accountTxns.map(t => (
                <tr key={t.id}>
                  <td className="p-2">{t.date}</td>
                  <td className="p-2 font-mono font-semibold text-blue-600">{t.voucherNo}</td>
                  <td className="p-2 text-slate-700">{t.narration}</td>
                  <td className="p-2 text-right font-medium text-emerald-600">{t.debit ? `₹${t.debit.toLocaleString()}` : '-'}</td>
                  <td className="p-2 text-right font-medium text-amber-600">{t.credit ? `₹${t.credit.toLocaleString()}` : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
