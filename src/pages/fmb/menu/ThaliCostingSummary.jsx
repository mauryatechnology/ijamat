import { useData } from '../../../context/DataContext'

export default function ThaliCostingSummary() {
  const { niyazEvents } = useData()
  const totalCost = niyazEvents.reduce((acc, curr) => acc + (curr.cost || 0), 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Thali Costing Summary</h1>
        <p className="text-sm text-slate-500">Per-thali expenditure and budget calculations</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs">
        <p className="font-semibold text-slate-700">Total Niyaz Expenditure: ₹{totalCost.toLocaleString()}</p>
      </div>
    </div>
  )
}
