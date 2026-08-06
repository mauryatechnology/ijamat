import { useData } from '../../../context/DataContext'

export default function MenuSummary() {
  const { niyazEvents } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">FMB Menu Summary Analytics</h1>
        <p className="text-sm text-slate-500">Summary of menu distributions and khidmat assignments</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs">
        <p className="font-semibold text-slate-700">Total Niyaz Events Scheduled: {niyazEvents.length}</p>
      </div>
    </div>
  )
}
