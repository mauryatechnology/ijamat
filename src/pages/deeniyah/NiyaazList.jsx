import { useData } from '../../context/DataContext'

export default function NiyaazList() {
  const { niyazEvents } = useData()
  const deeniyahNiyaz = niyazEvents.filter(e => e.dept === 'Deeniyah' || e.dept === 'General')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Deeniyah Niyaz Events Directory</h1>
        <p className="text-sm text-slate-500">Religious and Sabaq-linked Niyaz events log</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Date</th>
              <th className="p-3">Occasion</th>
              <th className="p-3">Menu Served</th>
              <th className="p-3">Khidmat Guzar</th>
              <th className="p-3 text-right">Cost (₹)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {deeniyahNiyaz.map(e => (
              <tr key={e.id} className="hover:bg-slate-50">
                <td className="p-3 font-semibold">{e.date}</td>
                <td className="p-3 font-medium text-amber-700">{e.eventSpecial}</td>
                <td className="p-3 text-slate-800">{e.menu}</td>
                <td className="p-3 text-slate-600">{e.khidmatByName}</td>
                <td className="p-3 text-right font-bold text-emerald-600">₹{e.cost.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
