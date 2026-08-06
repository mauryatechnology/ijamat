import { useData } from '../../context/DataContext'

export default function Upliftment() {
  const { upliftmentData } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Marafiq Upliftment Progress Dashboard</h1>
        <p className="text-sm text-slate-500">Overview of community upliftment initiatives</p>
      </div>

      <div className="grid grid-cols-3 gap-4 text-xs">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"><span className="text-slate-500 font-semibold block">Total Surveys Completed</span><span className="text-3xl font-bold text-blue-600">{upliftmentData.surveys.length}</span></div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"><span className="text-slate-500 font-semibold block">Muwasaat Grants Approved</span><span className="text-3xl font-bold text-emerald-600">₹4,50,000</span></div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"><span className="text-slate-500 font-semibold block">Active Volunteers</span><span className="text-3xl font-bold text-amber-600">12</span></div>
      </div>
    </div>
  )
}
