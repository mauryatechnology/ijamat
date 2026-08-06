import { useData } from '../../../context/DataContext'

export default function SabaqAgeWise() {
  const { members } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Sabaq Age-Group Breakdown</h1>
        <p className="text-sm text-slate-500">Attendance categorization by age brackets</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs">
        <p className="font-semibold text-slate-700">Youth (15-25): 20% | Adults (26-50): 55% | Senior (50+): 25%</p>
      </div>
    </div>
  )
}
