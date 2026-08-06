import { useState } from 'react'
import { useData } from '../../../context/DataContext'
import { Printer } from 'lucide-react'

export default function PrintSabilCard() {
  const { sabil } = useData()
  const [selectedSabil, setSelectedSabil] = useState('1')

  const card = sabil.find(s => s.sabilNo === selectedSabil)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Print Sabil Card</h1>
          <p className="text-sm text-slate-500">Official printable Sabil identification card</p>
        </div>
        <button onClick={() => window.print()} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2">
          <Printer size={16} /> Print Card
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm print:hidden text-xs">
        <label className="font-semibold block mb-1">Select Sabil</label>
        <select value={selectedSabil} onChange={e => setSelectedSabil(e.target.value)} className="p-2 border rounded bg-slate-50">
          {sabil.map(s => <option key={s.id} value={s.sabilNo}>Sabil #{s.sabilNo} - {s.name}</option>)}
        </select>
      </div>

      {card && (
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 rounded-2xl max-w-md mx-auto shadow-2xl space-y-6 border border-amber-500/30">
          <div className="flex justify-between items-start border-b border-white/10 pb-4">
            <div>
              <h2 className="text-xl font-bold tracking-widest uppercase text-amber-400">Anjuman-e-Saifee</h2>
              <p className="text-[10px] text-slate-400 tracking-wider">Jamaat Sabil Membership Card</p>
            </div>
            <span className="bg-amber-500/20 text-amber-300 font-mono text-xs px-2.5 py-1 rounded-full border border-amber-500/40">Sabil #{card.sabilNo}</span>
          </div>

          <div className="space-y-2 text-xs">
            <p><span className="text-slate-400 block text-[10px]">ITS ID</span> <span className="font-mono text-sm font-semibold">{card.itsId}</span></p>
            <p><span className="text-slate-400 block text-[10px]">Name</span> <span className="font-medium text-base text-white">{card.name}</span></p>
            <p><span className="text-slate-400 block text-[10px]">Mohalla & Sector</span> <span>{card.mohalla} ({card.sector})</span></p>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-white/10 text-[10px] text-slate-400">
            <span>Valid Session: 2017-2018</span>
            <span>Jamaat Office Seal</span>
          </div>
        </div>
      )}
    </div>
  )
}
