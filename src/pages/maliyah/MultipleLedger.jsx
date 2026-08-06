import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { Printer } from 'lucide-react'

export default function MultipleLedger() {
  const { sabil, collections } = useData()
  const [selectedSabils, setSelectedSabils] = useState(['1', '2', '3'])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Multiple Ledger Statement</h1>
          <p className="text-sm text-slate-500">View and print ledgers for multiple Sabils simultaneously</p>
        </div>
        <button onClick={() => window.print()} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2">
          <Printer size={16} /> Print Selected Ledgers
        </button>
      </div>

      <div className="space-y-6">
        {selectedSabils.map(sabilNo => {
          const s = sabil.find(item => item.sabilNo === sabilNo)
          if (!s) return null
          const memberColls = collections.filter(c => c.sabilNo === sabilNo)
          return (
            <div key={sabilNo} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3 text-xs page-break-after">
              <div className="flex justify-between border-b pb-2">
                <div>
                  <h2 className="font-bold text-base text-slate-800">Sabil #{s.sabilNo} - {s.name}</h2>
                  <p className="text-slate-500">ITS ID: {s.itsId} | Mohalla: {s.mohalla}</p>
                </div>
                <div className="text-right font-bold text-emerald-600 text-sm">
                  Annual Takhmeen: ₹{s.takhmeen.toLocaleString()}
                </div>
              </div>

              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-100 border-b">
                    <th className="p-2">Date</th>
                    <th className="p-2">Receipt No</th>
                    <th className="p-2">Head</th>
                    <th className="p-2">Mode</th>
                    <th className="p-2 text-right">Amount Paid</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {memberColls.map(c => (
                    <tr key={c.id}>
                      <td className="p-2">{c.date}</td>
                      <td className="p-2 font-mono font-semibold text-blue-600">{c.receiptNo}</td>
                      <td className="p-2">{c.head}</td>
                      <td className="p-2">{c.mode}</td>
                      <td className="p-2 text-right font-bold text-emerald-600">₹{c.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                  {memberColls.length === 0 && (
                    <tr><td colSpan={5} className="p-4 text-center text-slate-400">No payment receipts recorded for this session.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )
        })}
      </div>
    </div>
  )
}
