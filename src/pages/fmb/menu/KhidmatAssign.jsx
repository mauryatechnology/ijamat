import { useData } from '../../../context/DataContext'

export default function KhidmatAssign() {
  const { niyazEvents } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Niyaz Khidmat Assignment</h1>
        <p className="text-sm text-slate-500">Assign Sabil holders to sponsor/serve upcoming Niyaz days</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Date</th>
              <th className="p-3">Occasion</th>
              <th className="p-3">Menu</th>
              <th className="p-3">Assigned Khidmat Guzar</th>
              <th className="p-3 text-right">Khidmat Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {niyazEvents.map(e => (
              <tr key={e.id}>
                <td className="p-3 font-semibold">{e.date}</td>
                <td className="p-3 font-medium text-amber-700">{e.eventSpecial}</td>
                <td className="p-3">{e.menu}</td>
                <td className="p-3 font-bold text-blue-700">{e.khidmatByName}</td>
                <td className="p-3 text-right font-bold text-emerald-600">₹{e.cost.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function MenuSummary() {
  const { niyazEvents } = useData()
  const totalSpend = niyazEvents.reduce((sum, e) => sum + e.cost, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">FMB Menu Summary Analytics</h1>
        <p className="text-sm text-slate-500">Consolidated analytics on thali expenditure and event distributions</p>
      </div>

      <div className="grid grid-cols-3 gap-4 text-xs">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-slate-500 block font-semibold">Total Menu Events</span>
          <span className="text-3xl font-bold text-slate-800">{niyazEvents.length}</span>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-slate-500 block font-semibold">Total Expenditure</span>
          <span className="text-3xl font-bold text-emerald-600">₹{totalSpend.toLocaleString()}</span>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-slate-500 block font-semibold">Average Cost per Event</span>
          <span className="text-3xl font-bold text-blue-600">₹{Math.round(totalSpend / (niyazEvents.length || 1)).toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}

export function ThaliCostingSummary() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Thali Unit Costing Summary</h1>
        <p className="text-sm text-slate-500">Cost-per-thali financial analysis across full and half thali sizes</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Thali Category</th>
              <th className="p-3">Daily Active Count</th>
              <th className="p-3 text-right">Est. Daily Cost / Unit</th>
              <th className="p-3 text-right font-bold">Monthly Total Cost</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr><td className="p-3 font-medium">Full Thali</td><td className="p-3">22</td><td className="p-3 text-right">₹220</td><td className="p-3 text-right font-bold text-emerald-600">₹1,45,200</td></tr>
            <tr><td className="p-3 font-medium">Half Thali</td><td className="p-3">8</td><td className="p-3 text-right">₹120</td><td className="p-3 text-right font-bold text-emerald-600">₹28,800</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function DishCategory() {
  const { dishMaster } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dish Categories Master</h1>
        <p className="text-sm text-slate-500">Classification categories for thali menu recipe items</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs max-w-md">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">ID</th>
              <th className="p-3">Category Name</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {dishMaster.categories.map(c => (
              <tr key={c.id}>
                <td className="p-3 font-mono font-semibold">{c.id}</td>
                <td className="p-3 font-medium">{c.name}</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-semibold">{c.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function DishMaster() {
  const { dishMaster } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dish & Recipe Master Catalogue</h1>
        <p className="text-sm text-slate-500">Master list of dishes with estimated cost per head</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Dish Name</th>
              <th className="p-3">Category</th>
              <th className="p-3 text-right">Cost / Head (₹)</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {dishMaster.dishes.map(d => (
              <tr key={d.id} className="hover:bg-slate-50">
                <td className="p-3 font-medium text-slate-800">{d.name}</td>
                <td className="p-3 text-slate-600">{d.category}</td>
                <td className="p-3 text-right font-bold text-emerald-600">₹{d.costPerHead}</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-semibold">{d.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
