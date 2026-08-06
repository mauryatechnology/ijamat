import { useData } from '../../context/DataContext'
import { Smartphone } from 'lucide-react'

export default function InstallList() {
  const { members } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Mobile App Installation Detail List</h1>
        <p className="text-sm text-slate-500">List of Mumineen with active mobile app installations</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">ITS ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Mohalla</th>
              <th className="p-3">App Version</th>
              <th className="p-3">Last Active</th>
              <th className="p-3">Device OS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {members.map(m => (
              <tr key={m.id} className="hover:bg-slate-50">
                <td className="p-3 font-mono font-semibold text-blue-600">{m.itsId}</td>
                <td className="p-3 font-medium text-slate-800">{m.name}</td>
                <td className="p-3">{m.mohalla}</td>
                <td className="p-3 font-mono">v2.4.1</td>
                <td className="p-3 text-slate-600">Today</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] bg-blue-100 text-blue-800 font-semibold">Android</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
