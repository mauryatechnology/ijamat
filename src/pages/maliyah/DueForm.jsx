import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { Printer, FileText } from 'lucide-react'

export default function DueForm() {
  const { sabil, dues } = useData()
  const [selectedSabil, setSelectedSabil] = useState('1')

  const sabilItem = sabil.find(s => s.sabilNo === selectedSabil)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Due Form (Individual Statement)</h1>
          <p className="text-sm text-slate-500">Generate printable due statement for Sabil holder</p>
        </div>
        <button onClick={() => window.print()} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2">
          <Printer size={16} /> Print Due Form
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm print:hidden">
        <label className="block text-xs font-semibold text-slate-600 mb-1">Select Sabil No</label>
        <select value={selectedSabil} onChange={e => setSelectedSabil(e.target.value)} className="p-2 border rounded bg-slate-50 text-sm max-w-xs">
          {sabil.map(s => (
            <option key={s.id} value={s.sabilNo}>Sabil #{s.sabilNo} - {s.name}</option>
          ))}
        </select>
      </div>

      {sabilItem && (
        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm max-w-2xl mx-auto space-y-6">
          <div className="text-center border-b pb-4">
            <h2 className="text-xl font-bold uppercase tracking-wider text-slate-800">Jamaat Dues Clearance Statement</h2>
            <p className="text-xs text-slate-500">Working Session: 2017-2018</p>
          </div>

          <div className="grid grid-cols-2 text-xs gap-3 bg-slate-50 p-4 rounded-lg">
            <div><strong>Sabil No:</strong> {sabilItem.sabilNo}</div>
            <div><strong>ITS ID:</strong> {sabilItem.itsId}</div>
            <div><strong>Name:</strong> {sabilItem.name}</div>
            <div><strong>Mohalla:</strong> {sabilItem.mohalla}</div>
            <div><strong>Sabil Type:</strong> {sabilItem.type}</div>
            <div><strong>Annual Takhmeen:</strong> ₹{sabilItem.takhmeen.toLocaleString()}</div>
          </div>

          <table className="w-full text-left text-xs border border-slate-200">
            <thead className="bg-slate-100 font-semibold">
              <tr>
                <th className="p-2 border-b">Head</th>
                <th className="p-2 border-b text-right">Takhmeen</th>
                <th className="p-2 border-b text-right">Paid</th>
                <th className="p-2 border-b text-right">Due Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-2">Barkat-E-Burhaniyah</td>
                <td className="p-2 text-right">₹{sabilItem.takhmeen}</td>
                <td className="p-2 text-right text-emerald-600">₹{Math.floor(sabilItem.takhmeen * 0.7)}</td>
                <td className="p-2 text-right font-bold text-amber-600">₹{Math.floor(sabilItem.takhmeen * 0.3)}</td>
              </tr>
              <tr>
                <td className="p-2">Faiz ul Mawaid al Burhaniyah (FMB)</td>
                <td className="p-2 text-right">₹12,000</td>
                <td className="p-2 text-right text-emerald-600">₹9,000</td>
                <td className="p-2 text-right font-bold text-amber-600">₹3,000</td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-between items-center pt-8 text-xs text-slate-500 border-t">
            <span>Prepared By: Jamaat Office</span>
            <span>Signature & Stamp: ___________________</span>
          </div>
        </div>
      )}
    </div>
  )
}
