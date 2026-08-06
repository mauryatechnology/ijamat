import { useData } from '../../../context/DataContext'

export default function RegStatus() {
  const { fmbRegistration } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">FMB Thali Registration Status</h1>
        <p className="text-sm text-slate-500">Live status of registered thali members and dispatch zones</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Thali #</th>
              <th className="p-3">Sabil #</th>
              <th className="p-3">Name</th>
              <th className="p-3">Mohalla</th>
              <th className="p-3">Size</th>
              <th className="p-3">Distributor Zone</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {fmbRegistration.registrations.map(r => (
              <tr key={r.id} className="hover:bg-slate-50">
                <td className="p-3 font-mono font-semibold text-amber-600">{r.thaliNo}</td>
                <td className="p-3">{r.sabilNo}</td>
                <td className="p-3 font-medium text-slate-800">{r.name}</td>
                <td className="p-3">{r.mohalla}</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] bg-blue-100 text-blue-800 font-semibold">{r.size}</span></td>
                <td className="p-3 text-slate-600">{r.distributor}</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-semibold">{r.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function RegStatusSizeWise() {
  const { fmbRegistration } = useData()
  const fullCount = fmbRegistration.registrations.filter(r => r.size === 'Full').length
  const halfCount = fmbRegistration.registrations.filter(r => r.size === 'Half').length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Registration Status — Size Wise</h1>
        <p className="text-sm text-slate-500">Distribution breakdown by full and half thali sizes</p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs max-w-lg">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-slate-500 font-semibold block">Full Size Thalis</span>
          <span className="text-3xl font-bold text-blue-700">{fullCount}</span>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-slate-500 font-semibold block">Half Size Thalis</span>
          <span className="text-3xl font-bold text-amber-600">{halfCount}</span>
        </div>
      </div>
    </div>
  )
}
