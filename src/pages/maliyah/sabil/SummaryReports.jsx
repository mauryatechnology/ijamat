import { useData } from '../../../context/DataContext'

export default function SummaryReports() {
  const { sabil } = useData()

  const totalTakhmeen = sabil.reduce((sum, s) => sum + s.takhmeen, 0)
  const regularCount = sabil.filter(s => s.type === 'Regular').length
  const jointCount = sabil.filter(s => s.type !== 'Regular').length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Sabil Summary & Consolidated Report</h1>
        <p className="text-sm text-slate-500">Executive summary metrics of all registered Sabil accounts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-slate-500 font-semibold block">Total Registered Sabils</span>
          <span className="text-3xl font-bold text-slate-800">{sabil.length}</span>
          <p className="text-slate-400">Regular: {regularCount} | Lock/Joint: {jointCount}</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-slate-500 font-semibold block">Total Annual Budget Takhmeen</span>
          <span className="text-3xl font-bold text-emerald-600">₹{totalTakhmeen.toLocaleString()}</span>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-slate-500 font-semibold block">Average Takhmeen per Sabil</span>
          <span className="text-3xl font-bold text-blue-600">₹{Math.floor(totalTakhmeen / (sabil.length || 1)).toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}
