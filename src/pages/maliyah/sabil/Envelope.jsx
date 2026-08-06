import { useState } from 'react'
import { useData } from '../../../context/DataContext'
import { Printer } from 'lucide-react'

export default function Envelope() {
  const { sabil } = useData()
  const [selectedSabil, setSelectedSabil] = useState('1')

  const card = sabil.find(s => s.sabilNo === selectedSabil)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Envelope Printing</h1>
          <p className="text-sm text-slate-500">Print formal mailing envelopes for Jamaat communications</p>
        </div>
        <button onClick={() => window.print()} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2">
          <Printer size={16} /> Print Envelope
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm print:hidden text-xs">
        <label className="font-semibold block mb-1">Select Recipient</label>
        <select value={selectedSabil} onChange={e => setSelectedSabil(e.target.value)} className="p-2 border rounded bg-slate-50">
          {sabil.map(s => <option key={s.id} value={s.sabilNo}>Sabil #{s.sabilNo} - {s.name}</option>)}
        </select>
      </div>

      {card && (
        <div className="bg-white p-12 border-2 border-slate-300 rounded-lg max-w-xl mx-auto space-y-12 text-xs">
          <div className="text-left font-serif text-slate-500">
            <p className="font-bold text-slate-700">From:</p>
            <p>Anjuman-e-Saifee Jamaat</p>
            <p>Main Masjid Road</p>
          </div>

          <div className="text-center font-serif py-6 border-y">
            <p className="text-slate-400 text-[10px] uppercase tracking-widest">To:</p>
            <p className="text-lg font-bold text-slate-900 mt-1">{card.name}</p>
            <p className="text-sm font-semibold text-blue-700">Sabil #{card.sabilNo}</p>
            <p className="text-slate-600">{card.mohalla}</p>
          </div>
        </div>
      )}
    </div>
  )
}
