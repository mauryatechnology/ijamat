import { useData } from '../../../context/DataContext'
import { Printer } from 'lucide-react'

export default function SabilLabelAll() {
  const { sabil } = useData()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Print Sabil Mailing Labels</h1>
          <p className="text-sm text-slate-500">Grid printable postal and courier address labels for all Sabils</p>
        </div>
        <button onClick={() => window.print()} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2">
          <Printer size={16} /> Print Address Labels
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {sabil.map(s => (
          <div key={s.id} className="bg-white p-4 rounded-xl border border-slate-300 shadow-xs text-xs space-y-1">
            <span className="font-bold text-blue-700 block">Sabil #{s.sabilNo} ({s.itsId})</span>
            <span className="font-semibold text-slate-800 block text-sm">{s.name}</span>
            <span className="text-slate-600 block">{s.address || s.mohalla}</span>
            <span className="text-slate-500 text-[10px] block">{s.mohalla}, {s.sector}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
