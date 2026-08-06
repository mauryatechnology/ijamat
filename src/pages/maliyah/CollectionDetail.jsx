import { useState } from 'react'
import { useData } from '../../context/DataContext'

export default function CollectionDetail() {
  const { collections } = useData()
  const [headFilter, setHeadFilter] = useState('All')

  const filtered = headFilter === 'All' ? collections : collections.filter(c => c.head === headFilter)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Collection Detail Report</h1>
        <p className="text-sm text-slate-500">Detailed itemized list of all received payments</p>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex gap-4 text-xs items-center">
        <label className="font-semibold text-slate-600">Filter Head:</label>
        <select value={headFilter} onChange={e => setHeadFilter(e.target.value)} className="p-2 border rounded bg-slate-50">
          <option value="All">All Heads</option>
          <option value="Barkat-E-Burhaniyah">Barkat-E-Burhaniyah</option>
          <option value="FMB">FMB</option>
          <option value="Husain Scheme">Husain Scheme</option>
          <option value="Niyaz">Niyaz</option>
        </select>
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
              <th className="p-3">Mode</th>
              <th className="p-3">Collector</th>
              <th className="p-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map(c => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="p-3 font-mono font-semibold text-blue-600">{c.receiptNo}</td>
                <td className="p-3">{c.date}</td>
                <td className="p-3">{c.sabilNo}</td>
                <td className="p-3 font-medium text-slate-800">{c.name}</td>
                <td className="p-3">{c.head}</td>
                <td className="p-3">{c.mode}</td>
                <td className="p-3 text-slate-500">{c.collectedBy}</td>
                <td className="p-3 text-right font-semibold text-emerald-600">₹{c.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
