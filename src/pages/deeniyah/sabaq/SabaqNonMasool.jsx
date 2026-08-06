import { useData } from '../../../context/DataContext'

export default function SabaqNonMasool() {
  const { members } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Sabaq Non-Masool Attendees</h1>
        <p className="text-sm text-slate-500">Mumineen participating without assigned Masool responsibilities</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs">
        <p className="font-semibold text-slate-700">Total Non-Masool Attendees: {members.length - 2}</p>
      </div>
    </div>
  )
}
