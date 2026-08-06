import { useData } from '../../context/DataContext'

export default function CollectionSummaryOA() {
  const { collections } = useData()

  const overallTotal = collections.reduce((sum, c) => sum + c.amount, 0)
  const cashTotal = collections.filter(c => c.mode === 'Cash').reduce((sum, c) => sum + c.amount, 0)
  const chequeTotal = collections.filter(c => c.mode === 'Cheque').reduce((sum, c) => sum + c.amount, 0)
  const onlineTotal = collections.filter(c => c.mode === 'UPI' || c.mode === 'Bank Transfer').reduce((sum, c) => sum + c.amount, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Collection Summary (Overall Analysis)</h1>
        <p className="text-sm text-slate-500">High-level financial collection statistics and analytics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-semibold block">Total Revenue</span>
          <span className="text-2xl font-bold text-slate-800">₹{overallTotal.toLocaleString()}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-semibold block">Cash Collection</span>
          <span className="text-2xl font-bold text-emerald-600">₹{cashTotal.toLocaleString()}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-semibold block">Cheque Collection</span>
          <span className="text-2xl font-bold text-blue-600">₹{chequeTotal.toLocaleString()}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-semibold block">Online / UPI</span>
          <span className="text-2xl font-bold text-indigo-600">₹{onlineTotal.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}
