import { useData } from '../../../context/DataContext'

export default function SabaqSummary() {
  const { sabaqAttendance, members } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Sabaq Consolidated Summary</h1>
        <p className="text-sm text-slate-500">High-level Sabaq attendance statistics for Jamaat leadership</p>
      </div>
      <div className="grid grid-cols-3 gap-4 text-xs">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"><span className="text-slate-500 font-semibold block">Total Sabaq Groups</span><span className="text-3xl font-bold text-blue-700">{sabaqAttendance.groups.length}</span></div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"><span className="text-slate-500 font-semibold block">Total Enrolled Mumineen</span><span className="text-3xl font-bold text-slate-800">{members.length}</span></div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"><span className="text-slate-500 font-semibold block">Overall Attendance Rate</span><span className="text-3xl font-bold text-emerald-600">84%</span></div>
      </div>
    </div>
  )
}
