import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { Printer, Search, CheckCircle } from 'lucide-react'

export default function ReceiptPrint() {
  const { receiptLog, reprintReceipt } = useData()
  const [search, setSearch] = useState('')
  const [selectedReceipt, setSelectedReceipt] = useState(null)

  const filtered = receiptLog.filter(r => 
    r.receiptNo.toLowerCase().includes(search.toLowerCase()) ||
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.sabilNo.includes(search)
  )

  const handlePrint = (receipt) => {
    reprintReceipt(receipt.receiptNo)
    setSelectedReceipt(receipt)
    window.print()
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Receipt Printing</h1>
          <p className="text-sm text-slate-500">Print official collection receipts</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm print:hidden">
        <div className="relative max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Receipt No, Sabil No, or Name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm bg-slate-50 outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden print:hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-100 text-slate-600 border-b">
              <th className="p-3">Receipt No</th>
              <th className="p-3">Date</th>
              <th className="p-3">Sabil</th>
              <th className="p-3">Name</th>
              <th className="p-3">Head</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Mode</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map(r => (
              <tr key={r.id} className="hover:bg-slate-50">
                <td className="p-3 font-mono font-semibold text-blue-600">{r.receiptNo}</td>
                <td className="p-3">{r.date}</td>
                <td className="p-3">{r.sabilNo}</td>
                <td className="p-3 font-medium text-slate-800">{r.name}</td>
                <td className="p-3">{r.head}</td>
                <td className="p-3 font-semibold text-emerald-600">₹{r.amount.toLocaleString()}</td>
                <td className="p-3">{r.mode}</td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => handlePrint(r)}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs inline-flex items-center gap-1"
                  >
                    <Printer size={12} /> Print
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedReceipt && (
        <div className="hidden print:block p-8 border max-w-lg mx-auto space-y-4">
          <div className="text-center border-b pb-4">
            <h1 className="text-xl font-bold uppercase">Jamaat Collection Receipt</h1>
            <p className="text-xs text-slate-500">Official Payment Voucher</p>
          </div>
          <div className="grid grid-cols-2 text-sm gap-2">
            <div><strong>Receipt No:</strong> {selectedReceipt.receiptNo}</div>
            <div><strong>Date:</strong> {selectedReceipt.date}</div>
            <div><strong>Sabil No:</strong> {selectedReceipt.sabilNo}</div>
            <div><strong>Name:</strong> {selectedReceipt.name}</div>
            <div><strong>Head:</strong> {selectedReceipt.head}</div>
            <div><strong>Mode:</strong> {selectedReceipt.mode}</div>
          </div>
          <div className="border-t border-b py-3 text-lg font-bold text-emerald-700 flex justify-between">
            <span>Amount Paid:</span>
            <span>₹{selectedReceipt.amount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between pt-8 text-xs text-slate-500">
            <span>Collected By: Authorized Signatory</span>
            <span>Date Printed: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      )}
    </div>
  )
}
