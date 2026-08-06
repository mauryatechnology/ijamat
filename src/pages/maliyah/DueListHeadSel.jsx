import { useState } from 'react'
import { useData } from '../../context/DataContext'

export default function DueListHeadSel() {
  const { sabil, dropdownOptions } = useData()
  const [selectedHead, setSelectedHead] = useState('Barkat-E-Burhaniyah')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Due List (Head Selection)</h1>
        <p className="text-sm text-slate-500">Filter dues by specific collection head</p>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 text-xs">
        <label className="font-semibold text-slate-600">Select Collection Head:</label>
        <select value={selectedHead} onChange={e => setSelectedHead(e.target.value)} className="p-2 border rounded bg-slate-50 font-medium">
          {dropdownOptions.collectionHeads.map(h => (
            <option key={h} value={h}>{h}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-600 border-b">
              <th className="p-3">Sabil #</th>
              <th className="p-3">ITS ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Mohalla</th>
              <th className="p-3 text-right">Sanctioned Amount</th>
              <th className="p-3 text-right font-bold text-amber-600">Head Due ({selectedHead})</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sabil.map(s => (
              <tr key={s.id} className="hover:bg-slate-50">
                <td className="p-3 font-mono font-semibold">{s.sabilNo}</td>
                <td className="p-3 text-slate-500">{s.itsId}</td>
                <td className="p-3 font-medium text-slate-800">{s.name}</td>
                <td className="p-3">{s.mohalla}</td>
                <td className="p-3 text-right">₹{s.takhmeen.toLocaleString()}</td>
                <td className="p-3 text-right font-bold text-amber-600">₹{Math.floor(s.takhmeen * 0.25).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
