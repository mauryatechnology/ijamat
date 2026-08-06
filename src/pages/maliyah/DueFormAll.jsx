import { useData } from '../../context/DataContext'
import { Printer } from 'lucide-react'

export default function DueFormAll() {
  const { sabil } = useData()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Batch Due Forms (All Members)</h1>
          <p className="text-sm text-slate-500">Print due statements for all active Sabil holders in bulk</p>
        </div>
        <button onClick={() => window.print()} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2">
          <Printer size={16} /> Batch Print All
        </button>
      </div>

      <div className="space-y-8">
        {sabil.slice(0, 5).map(s => (
          <div key={s.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm max-w-2xl mx-auto space-y-4 page-break-after">
            <div className="text-center border-b pb-2">
              <h3 className="font-bold text-lg">Jamaat Due Clearance Form</h3>
              <p className="text-xs text-slate-500">Sabil #{s.sabilNo} - {s.name}</p>
            </div>
            <div className="grid grid-cols-2 text-xs gap-2 bg-slate-50 p-3 rounded">
              <div><strong>ITS ID:</strong> {s.itsId}</div>
              <div><strong>Mohalla:</strong> {s.mohalla}</div>
              <div><strong>Takhmeen:</strong> ₹{s.takhmeen}</div>
              <div><strong>Status:</strong> {s.status}</div>
            </div>
            <div className="text-right text-xs font-bold text-amber-600">Total Pending Dues: ₹{Math.floor(s.takhmeen * 0.25)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
