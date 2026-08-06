import { useData } from '../../../context/DataContext'

export default function SabaqMasool() {
  const { masoolData } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Sabaq Masool In-Charge List</h1>
        <p className="text-sm text-slate-500">Masools assigned to Sabaq attendance monitoring</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">ITS ID</th>
              <th className="p-3">Masool Name</th>
              <th className="p-3">Zone</th>
              <th className="p-3">Mohalla</th>
              <th className="p-3">Mobile</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {masoolData.masools.map(m => (
              <tr key={m.id}>
                <td className="p-3 font-mono font-semibold text-blue-600">{m.itsId}</td>
                <td className="p-3 font-medium text-slate-800">{m.name}</td>
                <td className="p-3">{m.zone}</td>
                <td className="p-3">{m.mohalla}</td>
                <td className="p-3">{m.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function SabaqMasoolWise() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Sabaq Masool-Wise Performance</h1>
        <p className="text-sm text-slate-500">Attendance percentages grouped by assigned Masool</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Masool Name</th>
              <th className="p-3 text-center">Assigned Sabils</th>
              <th className="p-3 text-center">Avg Attendance %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr><td className="p-3 font-medium">Mohd Hussain bhai Rangwala</td><td className="p-3 text-center">5</td><td className="p-3 text-center font-bold text-emerald-600">88%</td></tr>
            <tr><td className="p-3 font-medium">Burhanuddin bhai Contractor</td><td className="p-3 text-center">4</td><td className="p-3 text-center font-bold text-emerald-600">82%</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function SabaqMumineen() {
  const { members } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Sabaq Mumineen Participant Directory</h1>
        <p className="text-sm text-slate-500">All registered Mumineen attending Sabaq</p>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">ITS ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Mohalla</th>
              <th className="p-3">Gender</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {members.slice(0, 10).map(m => (
              <tr key={m.id}>
                <td className="p-3 font-mono font-semibold">{m.itsId}</td>
                <td className="p-3 font-medium text-slate-800">{m.name}</td>
                <td className="p-3">{m.mohalla}</td>
                <td className="p-3">{m.gender}</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-semibold">Active</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function SabaqSummary() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Sabaq Consolidated Summary</h1>
        <p className="text-sm text-slate-500">High-level Sabaq attendance statistics for Jamaat leadership</p>
      </div>
      <div className="grid grid-cols-3 gap-4 text-xs">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"><span className="text-slate-500 font-semibold block">Total Sabaq Groups</span><span className="text-3xl font-bold text-blue-700">4</span></div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"><span className="text-slate-500 font-semibold block">Total Enrolled Mumineen</span><span className="text-3xl font-bold text-slate-800">120</span></div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"><span className="text-slate-500 font-semibold block">Overall Attendance Rate</span><span className="text-3xl font-bold text-emerald-600">84%</span></div>
      </div>
    </div>
  )
}
