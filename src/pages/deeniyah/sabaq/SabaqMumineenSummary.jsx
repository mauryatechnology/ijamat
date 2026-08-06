import { useData } from '../../../context/DataContext'

export default function SabaqMumineenSummary() {
  const { members } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Sabaq Mumineen Demographics Summary</h1>
        <p className="text-sm text-slate-500">Gender and age breakdown of Sabaq attendees</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs">
        <p className="font-semibold text-slate-700">Total Active Sabaq Attendees: {members.length}</p>
      </div>
    </div>
  )
}
