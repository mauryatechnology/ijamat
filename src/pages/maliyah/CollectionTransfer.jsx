import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { ArrowRightLeft, CheckCircle } from 'lucide-react'

export default function CollectionTransfer() {
  const { collections, addAccountTransaction } = useData()
  const [targetAccount, setTargetAccount] = useState('1002')

  const unTransferred = collections.slice(0, 5)
  const unTransferredTotal = unTransferred.reduce((sum, c) => sum + c.amount, 0)

  const handleTransfer = () => {
    addAccountTransaction({
      date: new Date().toISOString().split('T')[0],
      accountCode: targetAccount,
      debit: unTransferredTotal,
      credit: 0,
      narration: `Collection transfer to main account`,
      voucherNo: `JV-TR-${Math.floor(100 + Math.random() * 900)}`
    })
    alert(`Transferred ₹${unTransferredTotal.toLocaleString()} to Account Code ${targetAccount}!`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Collection Transfer to Accounting Ledger</h1>
        <p className="text-sm text-slate-500">Post daily counter cash collections to general ledger accounts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 text-xs">
          <h2 className="font-semibold text-slate-700 text-lg border-b pb-2 flex items-center gap-2">
            <ArrowRightLeft size={18} className="text-blue-600" /> Transfer Execution
          </h2>
          <div>
            <label className="block font-semibold text-slate-600 mb-1">Target Ledger Account</label>
            <select value={targetAccount} onChange={e => setTargetAccount(e.target.value)} className="w-full p-2 border rounded bg-slate-50">
              <option value="1002">1002 - Bank Account SBI</option>
              <option value="1003">1003 - Bank Account HDFC</option>
              <option value="1001">1001 - Main Cash in Hand</option>
            </select>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-900">
            <span className="block text-slate-500">Pending Transfer Amount:</span>
            <span className="text-xl font-bold text-blue-700">₹{unTransferredTotal.toLocaleString()}</span>
          </div>

          <button
            onClick={handleTransfer}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg text-sm flex items-center justify-center gap-2"
          >
            Post Journal Entry
          </button>
        </div>

        <div className="md:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="font-semibold text-slate-700 text-lg mb-4">Pending Collections Queue</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 border-b">
                  <th className="p-2">Receipt No</th>
                  <th className="p-2">Sabil #</th>
                  <th className="p-2">Head</th>
                  <th className="p-2 text-right">Amount</th>
                  <th className="p-2 text-center">Transfer Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {unTransferred.map(c => (
                  <tr key={c.id}>
                    <td className="p-2 font-mono font-semibold">{c.receiptNo}</td>
                    <td className="p-2">{c.sabilNo}</td>
                    <td className="p-2">{c.head}</td>
                    <td className="p-2 text-right font-bold text-emerald-600">₹{c.amount.toLocaleString()}</td>
                    <td className="p-2 text-center"><span className="px-2 py-0.5 rounded text-[10px] bg-amber-100 text-amber-800 font-semibold">Pending</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
