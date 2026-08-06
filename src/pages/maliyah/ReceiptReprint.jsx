import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { Printer, RefreshCw, Search } from 'lucide-react'

export default function ReceiptReprint() {
  const { receiptLog, reprintReceipt } = useData()
  const [search, setSearch] = useState('')

  const reprintedOnly = receiptLog.filter(r => 
    r.receiptNo.toLowerCase().includes(search.toLowerCase()) ||
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.sabilNo.includes(search)
  )

  const handleReprint = (r) => {
    reprintReceipt(r.receiptNo)
    alert(`Reprint recorded for Receipt ${r.receiptNo}`)
    window.print()
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Reprint Receipt Log</h1>
          <p className="text-sm text-slate-500">Track and duplicate receipt prints</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm print:hidden">
        <div className="relative max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search receipt logs..."
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
              <th className="p-3">Sabil</th>
              <th className="p-3">Name</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Original Date</th>
              <th className="p-3">Reprint Count</th>
              <th className="p-3">Last Reprinted</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {reprintedOnly.map(r => (
              <tr key={r.id} className="hover:bg-slate-50">
                <td className="p-3 font-mono font-semibold text-blue-600">{r.receiptNo}</td>
                <td className="p-3">{r.sabilNo}</td>
                <td className="p-3 font-medium text-slate-800">{r.name}</td>
                <td className="p-3 font-semibold text-emerald-600">₹{r.amount.toLocaleString()}</td>
                <td className="p-3">{r.date}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                    r.reprintCount > 0 ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {r.reprintCount} times
                  </span>
                </td>
                <td className="p-3 text-slate-500">{r.lastReprintAt ? new Date(r.lastReprintAt).toLocaleDateString() : 'Never'}</td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => handleReprint(r)}
                    className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded text-xs inline-flex items-center gap-1"
                  >
                    <RefreshCw size={12} /> Reprint
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
