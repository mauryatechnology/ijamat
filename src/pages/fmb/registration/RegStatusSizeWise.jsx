import { useData } from '../../../context/DataContext'

export default function RegStatusSizeWise() {
  const { thalis } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Thali Registration Size-Wise Breakdown</h1>
        <p className="text-sm text-slate-500">Distribution of registered thalis by size (Small, Medium, Large, Extra Large)</p>
      </div>
      <div className="grid grid-cols-4 gap-4 text-xs">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm"><span className="text-slate-500 font-semibold block">Small Thalis</span><span className="text-2xl font-bold text-blue-600">8</span></div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm"><span className="text-slate-500 font-semibold block">Medium Thalis</span><span className="text-2xl font-bold text-emerald-600">15</span></div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm"><span className="text-slate-500 font-semibold block">Large Thalis</span><span className="text-2xl font-bold text-amber-600">5</span></div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm"><span className="text-slate-500 font-semibold block">Extra Large</span><span className="text-2xl font-bold text-purple-600">2</span></div>
      </div>
    </div>
  )
}
