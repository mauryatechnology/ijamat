import { useData } from '../../context/DataContext'

export default function HealthRecord() {
  const { members } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Electronic Health Record (EHR) Register</h1>
        <p className="text-sm text-slate-500">Mumineen blood group, medical history & emergency contact registry</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">ITS ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Blood Group</th>
              <th className="p-3">Emergency Contact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {members.slice(0, 5).map(m => (
              <tr key={m.id}>
                <td className="p-3 font-mono">{m.itsId}</td>
                <td className="p-3 font-medium text-slate-800">{m.name}</td>
                <td className="p-3 font-bold text-red-600">B+</td>
                <td className="p-3 font-mono text-slate-600">{m.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
