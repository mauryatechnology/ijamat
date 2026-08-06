import { useData } from '../../../context/DataContext'
import { Star } from 'lucide-react'

export default function FeedbackSummary() {
  const { fmbFeedback } = useData()
  const ratings = fmbFeedback.filter(f => !f.skipped)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">FMB Mobile App Feedback Summary</h1>
        <p className="text-sm text-slate-500">Mumineen daily thali feedback ratings and reviews from FMB mobile app</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Date</th>
              <th className="p-3">Thali #</th>
              <th className="p-3">Sabil #</th>
              <th className="p-3">Name</th>
              <th className="p-3">Rating</th>
              <th className="p-3">Feedback Comments</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {ratings.map(r => (
              <tr key={r.id} className="hover:bg-slate-50">
                <td className="p-3 font-semibold">{r.date}</td>
                <td className="p-3 font-mono font-semibold text-amber-600">{r.thaliNo}</td>
                <td className="p-3">{r.sabilNo}</td>
                <td className="p-3 font-medium text-slate-800">{r.name}</td>
                <td className="p-3">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star size={14} className="fill-amber-400" /> {r.rating} / 5
                  </div>
                </td>
                <td className="p-3 text-slate-600">{r.comment || 'No comment'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function SkipThaliReport() {
  const { fmbFeedback } = useData()
  const skips = fmbFeedback.filter(f => f.skipped)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Skip Thali Requests Report</h1>
        <p className="text-sm text-slate-500">Log of thalis marked skipped by Mumineen via mobile app</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Skip Date</th>
              <th className="p-3">Thali #</th>
              <th className="p-3">Sabil #</th>
              <th className="p-3">Name</th>
              <th className="p-3">Reason for Skipping</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {skips.map(s => (
              <tr key={s.id} className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-700">{s.date}</td>
                <td className="p-3 font-mono font-semibold text-amber-600">{s.thaliNo}</td>
                <td className="p-3">{s.sabilNo}</td>
                <td className="p-3 font-medium text-slate-800">{s.name}</td>
                <td className="p-3 text-red-600 font-medium">{s.skipReason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function ScanningReport() {
  const { fmbRegistration } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">App Scanning History Report</h1>
        <p className="text-sm text-slate-500">Audit trail of distributor scan events</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Thali #</th>
              <th className="p-3">Name</th>
              <th className="p-3">Distributor</th>
              <th className="p-3">Last Scanned Date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {fmbRegistration.registrations.slice(0, 10).map(r => (
              <tr key={r.id}>
                <td className="p-3 font-mono font-semibold text-amber-600">{r.thaliNo}</td>
                <td className="p-3 font-medium">{r.name}</td>
                <td className="p-3 text-slate-600">{r.distributor}</td>
                <td className="p-3">{r.lastDispatchDate || 'N/A'}</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-semibold">{r.dispatchStatus}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function ThaliCodeUpdate() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Update Barcode / RFID Code</h1>
        <p className="text-sm text-slate-500">Reassign RFID tag or barcode to thali</p>
      </div>

      <div className="max-w-md bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs space-y-4">
        <input type="text" placeholder="Thali No (e.g. T-001)" className="w-full p-2 border rounded bg-slate-50" />
        <input type="text" placeholder="New Barcode / RFID String" className="w-full p-2 border rounded bg-slate-50" />
        <button onClick={() => alert('Barcode updated!')} className="w-full bg-blue-600 text-white py-2 rounded font-medium">Link New Code</button>
      </div>
    </div>
  )
}
