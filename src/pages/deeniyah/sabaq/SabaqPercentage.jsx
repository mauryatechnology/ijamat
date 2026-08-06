import { useData } from '../../../context/DataContext'

export default function SabaqPercentage() {
  const { sabaqAttendance } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Sabaq Attendance Percentage Matrix</h1>
        <p className="text-sm text-slate-500">Percentage distribution across sessions and groups</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Sabaq Group</th>
              <th className="p-3">Category</th>
              <th className="p-3 text-center">Avg Percentage</th>
              <th className="p-3">Performance Grade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sabaqAttendance.records.map(r => (
              <tr key={r.id}>
                <td className="p-3 font-semibold text-blue-700">{r.group}</td>
                <td className="p-3">{r.type}</td>
                <td className="p-3 text-center font-bold text-emerald-600">{r.percentage}%</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-semibold">Grade A</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function SabaqCard() {
  const { members } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Sabaq Attendance Card Generator</h1>
        <p className="text-sm text-slate-500">Individual barcode attendance card for Sabaq participants</p>
      </div>

      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm max-w-sm mx-auto space-y-4 text-xs">
        <div className="text-center border-b pb-3">
          <h2 className="font-bold text-base uppercase text-blue-800">Sabaq Attendance Card</h2>
          <p className="text-[10px] text-slate-400">Deeniyah Affairs</p>
        </div>
        <div className="space-y-2">
          <p><strong>ITS ID:</strong> 40493729</p>
          <p><strong>Name:</strong> Mohd Hussain bhai Rangwala</p>
          <p><strong>Group:</strong> Sabaq Group A</p>
        </div>
      </div>
    </div>
  )
}

export function SabaqCardSummary() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Sabaq Card Issue Summary</h1>
        <p className="text-sm text-slate-500">Summary of issued vs pending Sabaq attendance cards</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs max-w-sm space-y-2">
        <div className="flex justify-between py-1 border-b"><span>Issued Cards:</span><span className="font-bold text-emerald-600">110</span></div>
        <div className="flex justify-between py-1"><span>Pending Cards:</span><span className="font-bold text-amber-600">10</span></div>
      </div>
    </div>
  )
}

export function SabaqMumineenSummary() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Sabaq Mumineen Attendance Summary</h1>
        <p className="text-sm text-slate-500">Summary metrics of Mumineen sabaq attendance</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs max-w-md">
        <p className="text-slate-600">Active participants: 120 Mumineen across 4 sabaq groups.</p>
      </div>
    </div>
  )
}

export function SabaqChart() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Sabaq Visual Attendance Chart</h1>
        <p className="text-sm text-slate-500">Graphical representation of monthly Sabaq attendance trends</p>
      </div>
      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center">
        <div className="h-40 flex items-end justify-center gap-6 border-b pb-4">
          <div className="w-12 bg-blue-500 rounded-t h-[75%]"><span className="text-[10px] text-white font-bold block pt-1">75%</span></div>
          <div className="w-12 bg-emerald-500 rounded-t h-[88%]"><span className="text-[10px] text-white font-bold block pt-1">88%</span></div>
          <div className="w-12 bg-indigo-500 rounded-t h-[92%]"><span className="text-[10px] text-white font-bold block pt-1">92%</span></div>
          <div className="w-12 bg-amber-500 rounded-t h-[82%]"><span className="text-[10px] text-white font-bold block pt-1">82%</span></div>
        </div>
        <div className="flex justify-center gap-6 text-xs font-semibold text-slate-600 mt-2">
          <span className="w-12">May</span><span className="w-12">Jun</span><span className="w-12">Jul</span><span className="w-12">Aug</span>
        </div>
      </div>
    </div>
  )
}

export function SabaqNonMasool() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Sabaq Non-Masool Attendance List</h1>
        <p className="text-sm text-slate-500">Sabaq attendance list for non-Masool members</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs">
        <p className="text-slate-600 font-medium">95 Non-Masool Mumineen enrolled in regular sabaq.</p>
      </div>
    </div>
  )
}

export function SabaqAgeWise() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Sabaq Attendance — Age Wise</h1>
        <p className="text-sm text-slate-500">Sabaq attendance categorized by age brackets</p>
      </div>
      <div className="grid grid-cols-3 gap-4 text-xs">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"><span className="text-slate-500 font-semibold block">Under 30 Years</span><span className="text-2xl font-bold text-blue-600">88%</span></div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"><span className="text-slate-500 font-semibold block">30 - 50 Years</span><span className="text-2xl font-bold text-emerald-600">92%</span></div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"><span className="text-slate-500 font-semibold block">Above 50 Years</span><span className="text-2xl font-bold text-amber-600">79%</span></div>
      </div>
    </div>
  )
}

export function SabaqMonthWise() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Sabaq Attendance — Month Wise</h1>
        <p className="text-sm text-slate-500">Monthly comparative attendance report</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-2">Month</th>
              <th className="p-2">Total Sabaqs Held</th>
              <th className="p-2 text-right">Avg Attendance %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr><td className="p-2 font-semibold">May 2024</td><td className="p-2">4</td><td className="p-2 text-right font-bold text-emerald-600">85%</td></tr>
            <tr><td className="p-2 font-semibold">June 2024</td><td className="p-2">4</td><td className="p-2 text-right font-bold text-emerald-600">88%</td></tr>
            <tr><td className="p-2 font-semibold">July 2024</td><td className="p-2">5</td><td className="p-2 text-right font-bold text-emerald-600">90%</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function SabaqYearWise() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Sabaq Attendance — Year Wise</h1>
        <p className="text-sm text-slate-500">Multi-year historical sabaq attendance report</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs max-w-md">
        <div className="flex justify-between py-2 border-b"><span>2023-2024 Session:</span><span className="font-bold text-emerald-600">86%</span></div>
        <div className="flex justify-between py-2"><span>2024-2025 Session:</span><span className="font-bold text-blue-600">89%</span></div>
      </div>
    </div>
  )
}
