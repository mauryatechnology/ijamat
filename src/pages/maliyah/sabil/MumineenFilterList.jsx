import { useState } from 'react'
import { useData } from '../../../context/DataContext'

export default function MumineenFilterList() {
  const { members } = useData()
  const [mohalla, setMohalla] = useState('All')
  const [gender, setGender] = useState('All')

  const filtered = members.filter(m => 
    (mohalla === 'All' || m.mohalla === mohalla) &&
    (gender === 'All' || m.gender === gender)
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Mumineen Filtered Master List</h1>
        <p className="text-sm text-slate-500">Filtered directory of all registered Mumineen in Jamaat</p>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex gap-4 text-xs">
        <div>
          <label className="font-semibold text-slate-600 block mb-1">Filter Mohalla</label>
          <select value={mohalla} onChange={e => setMohalla(e.target.value)} className="p-2 border rounded bg-slate-50">
            <option value="All">All Mohallas</option>
            <option value="Saifee Mohalla">Saifee Mohalla</option>
            <option value="Najmi Mohalla">Najmi Mohalla</option>
            <option value="Fakhri Mohalla">Fakhri Mohalla</option>
          </select>
        </div>
        <div>
          <label className="font-semibold text-slate-600 block mb-1">Gender</label>
          <select value={gender} onChange={e => setGender(e.target.value)} className="p-2 border rounded bg-slate-50">
            <option value="All">All</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b text-slate-600">
              <th className="p-3">ITS ID</th>
              <th className="p-3">Sabil #</th>
              <th className="p-3">Name</th>
              <th className="p-3">Age</th>
              <th className="p-3">Gender</th>
              <th className="p-3">HOF / FM</th>
              <th className="p-3">Mohalla</th>
              <th className="p-3">Mobile</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map(m => (
              <tr key={m.id} className="hover:bg-slate-50">
                <td className="p-3 font-mono font-semibold text-blue-600">{m.itsId}</td>
                <td className="p-3">{m.sabilNo}</td>
                <td className="p-3 font-medium text-slate-800">{m.name}</td>
                <td className="p-3">{m.age}</td>
                <td className="p-3">{m.gender}</td>
                <td className="p-3"><span className={`px-2 py-0.5 rounded text-[10px] ${m.hofOrFm === 'HOF' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100'}`}>{m.hofOrFm}</span></td>
                <td className="p-3">{m.mohalla}</td>
                <td className="p-3">{m.mobile || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
