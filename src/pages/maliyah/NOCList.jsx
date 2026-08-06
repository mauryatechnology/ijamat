import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { Search, FileText } from 'lucide-react'

export default function NOCList() {
  const { nocRecords } = useData()
  const [search, setSearch] = useState('')

  const filtered = nocRecords.filter(n =>
    n.nocNo.toLowerCase().includes(search.toLowerCase()) ||
    n.name.toLowerCase().includes(search.toLowerCase()) ||
    n.sabilNo.includes(search)
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">All NOC Register & Master List</h1>
        <p className="text-sm text-slate-500">History of all issued No Objection Certificates</p>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search NOC No, Sabil No, Name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm bg-slate-50 outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-600 border-b">
              <th className="p-3">NOC No</th>
              <th className="p-3">Sabil #</th>
              <th className="p-3">ITS ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Mohalla</th>
              <th className="p-3">Purpose</th>
              <th className="p-3">Issue Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Approved By</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map(n => (
              <tr key={n.id} className="hover:bg-slate-50">
                <td className="p-3 font-mono font-semibold text-blue-600">{n.nocNo}</td>
                <td className="p-3">{n.sabilNo}</td>
                <td className="p-3">{n.itsId}</td>
                <td className="p-3 font-medium text-slate-800">{n.name}</td>
                <td className="p-3">{n.mohalla}</td>
                <td className="p-3">{n.purpose}</td>
                <td className="p-3">{n.issueDate}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                    n.clearanceStatus === 'Cleared' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {n.clearanceStatus}
                  </span>
                </td>
                <td className="p-3 text-slate-500">{n.approvedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
