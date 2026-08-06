import { useData } from '../../../context/DataContext'

export default function SabaqCard() {
  const { members } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Sabaq Digital ID Cards</h1>
        <p className="text-sm text-slate-500">Generate Sabaq barcode identity passes for Mumineen</p>
      </div>
      <div className="grid grid-cols-2 gap-4 text-xs">
        {members.slice(0, 4).map(m => (
          <div key={m.id} className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-5 rounded-xl border border-slate-700 shadow-md">
            <div className="flex justify-between items-center mb-3 border-b border-slate-700 pb-2">
              <span className="font-bold text-amber-400">SABAQ CARD</span>
              <span className="font-mono text-slate-400">ITS: {m.itsId}</span>
            </div>
            <div className="font-bold text-base">{m.name}</div>
            <div className="text-slate-300 mt-1">Sabil: {m.sabilNo} | {m.mohalla}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
