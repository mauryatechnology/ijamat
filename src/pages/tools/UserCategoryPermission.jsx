import { useState } from 'react'
import { useData } from '../../context/DataContext'

export default function UserCategoryPermission() {
  const { userPermissions, updateUserPermission } = useData()
  const [selectedUser, setSelectedUser] = useState(1)

  const user = userPermissions.users.find(u => u.id === Number(selectedUser))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">User Category & Granular Permissions</h1>
        <p className="text-sm text-slate-500">Configure role-based access control and module-level permissions</p>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-xs flex gap-4 items-center">
        <label className="font-semibold text-slate-600">Select User:</label>
        <select value={selectedUser} onChange={e => setSelectedUser(e.target.value)} className="p-2 border rounded bg-slate-50">
          {userPermissions.users.map(u => (
            <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
          ))}
        </select>
      </div>

      {user && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs space-y-4">
          <h2 className="font-bold border-b pb-2 text-sm text-slate-800">Permissions Matrix — {user.name}</h2>
          <div className="grid grid-cols-3 gap-2">
            {userPermissions.allPermissions.slice(0, 15).map(p => (
              <label key={p} className="flex items-center gap-2 p-2 bg-slate-50 rounded border">
                <input type="checkbox" defaultChecked={user.permissions.includes(p) || user.permissions.includes('all')} />
                <span className="font-mono">{p}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function IslamicCalendar() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Misri / Islamic Hijri Calendar Utility</h1>
        <p className="text-sm text-slate-500">View Misri calendar dates and upcoming Bohra community Miqaat days</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs max-w-lg space-y-3">
        <h2 className="font-bold text-base text-blue-800 border-b pb-2">Upcoming Key Miqaat Dates</h2>
        <ul className="space-y-2">
          <li className="flex justify-between p-2 bg-slate-50 rounded"><span>Urus Mubarak Sayyidna Hatim RA</span><span className="font-semibold text-amber-700">16 Muharram</span></li>
          <li className="flex justify-between p-2 bg-slate-50 rounded"><span>Milad al-Nabi SAW</span><span className="font-semibold text-emerald-700">12 Rabi al-Awwal</span></li>
          <li className="flex justify-between p-2 bg-slate-50 rounded"><span>Urus Mubarak Sayyidna Taher Saifuddin RA</span><span className="font-semibold text-indigo-700">19 Rajab</span></li>
        </ul>
      </div>
    </div>
  )
}

export function VisitEntry() {
  const { addVisit, sabil } = useData()
  const [visitorName, setVisitorName] = useState('')
  const [purpose, setPurpose] = useState('Social Visit')
  const [hostedBy, setHostedBy] = useState('1')
  const [duration, setDuration] = useState('2 days')

  const handleSubmit = (e) => {
    e.preventDefault()
    addVisit({
      date: new Date().toISOString().split('T')[0],
      visitorName,
      visitorITS: '',
      purpose,
      hostedBy: sabil.find(s => s.sabilNo === hostedBy)?.name || 'Host',
      sabilNo: hostedBy,
      duration,
      notes: '',
      enteredBy: 'admin'
    })
    alert('Visit entry recorded successfully!')
    setVisitorName('')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Mehman / Visitor Entry Register</h1>
        <p className="text-sm text-slate-500">Record incoming guests and visiting mumineen details</p>
      </div>

      <div className="max-w-md bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs space-y-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block font-semibold mb-1">Visitor Name</label>
            <input type="text" value={visitorName} onChange={e => setVisitorName(e.target.value)} placeholder="Name" className="w-full p-2 border rounded bg-slate-50" required />
          </div>
          <div>
            <label className="block font-semibold mb-1">Purpose of Visit</label>
            <select value={purpose} onChange={e => setPurpose(e.target.value)} className="w-full p-2 border rounded bg-slate-50">
              <option value="Social Visit">Social Visit</option>
              <option value="Business">Business</option>
              <option value="Ziarat">Ziarat</option>
              <option value="Medical">Medical</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Host Sabil</label>
            <select value={hostedBy} onChange={e => setHostedBy(e.target.value)} className="w-full p-2 border rounded bg-slate-50">
              {sabil.map(s => <option key={s.id} value={s.sabilNo}>Sabil #{s.sabilNo} - {s.name}</option>)}
            </select>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-medium">Save Visitor Entry</button>
        </form>
      </div>
    </div>
  )
}

export function VisitReport() {
  const { visitLog } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Mehman / Visitor Master Log Report</h1>
        <p className="text-sm text-slate-500">Audit log of all registered guest visits</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Date</th>
              <th className="p-3">Visitor Name</th>
              <th className="p-3">Purpose</th>
              <th className="p-3">Host Sabil</th>
              <th className="p-3">Hosted By</th>
              <th className="p-3">Duration</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {visitLog.map(v => (
              <tr key={v.id}>
                <td className="p-3 font-semibold">{v.date}</td>
                <td className="p-3 font-medium text-slate-800">{v.visitorName}</td>
                <td className="p-3">{v.purpose}</td>
                <td className="p-3">{v.sabilNo}</td>
                <td className="p-3 text-slate-600">{v.hostedByName}</td>
                <td className="p-3">{v.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
