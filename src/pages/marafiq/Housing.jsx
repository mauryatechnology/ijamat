import { useData } from '../../context/DataContext'

export default function Housing() {
  const { upliftmentData } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Housing & Home Renovation Drive</h1>
        <p className="text-sm text-slate-500">Marafiq housing upliftment and sanitation projects</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs space-y-3">
        <p className="font-semibold text-slate-800">Total Families Assisted with Housing Renovation: 8 Households</p>
      </div>
    </div>
  )
}
