import { useData } from '../../../context/DataContext'

export default function SabaqYearWise() {
  const { sabaqAttendance } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Sabaq Annual Historical Audit</h1>
        <p className="text-sm text-slate-500">Yearly attendance archives and trends</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs">
        <p className="font-semibold text-slate-700">Historical Years Logged: 1443 H - 1446 H</p>
      </div>
    </div>
  )
}
