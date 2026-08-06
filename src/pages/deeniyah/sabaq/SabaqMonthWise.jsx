import { useData } from '../../../context/DataContext'

export default function SabaqMonthWise() {
  const { sabaqAttendance } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Sabaq Monthly Attendance Log</h1>
        <p className="text-sm text-slate-500">Month-by-month attendance statistics</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs">
        <p className="font-semibold text-slate-700">Active Month: Shawwal / Zilqad 1445 H</p>
      </div>
    </div>
  )
}
