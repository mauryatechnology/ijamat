export default function VisitReport() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Jamaat Office Visitor History Audit</h1>
        <p className="text-sm text-slate-500">Historical log of office visitors and purpose</p>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Date</th>
              <th className="p-3">Visitor Name</th>
              <th className="p-3">Purpose</th>
              <th className="p-3 text-right">Time In</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="p-3 font-semibold">2024-06-12</td>
              <td className="p-3 font-medium text-slate-800">Mustafa bhai Merchant</td>
              <td className="p-3">Sabil Card Renewal</td>
              <td className="p-3 text-right text-slate-500 font-mono">10:15 AM</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
