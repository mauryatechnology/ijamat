import { useData } from '../../../context/DataContext'

export default function SabaqChart() {
  const { sabaqAttendance } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Sabaq Attendance Trend Chart</h1>
        <p className="text-sm text-slate-500">Visual attendance analytics across sabaq modules</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs">
        <p className="font-semibold text-slate-700">Attendance trend analytics active for {sabaqAttendance.groups.length} sabaq groups.</p>
      </div>
    </div>
  )
}
