import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { Plus, UserCheck } from 'lucide-react'

export default function ManageMasool() {
  const { masoolData, addMasool } = useData()
  const [itsId, setItsId] = useState('')
  const [name, setName] = useState('')
  const [zone, setZone] = useState('Zone A')
  const [mohalla, setMohalla] = useState('Saifee Mohalla')
  const [phone, setPhone] = useState('')

  const handleAdd = (e) => {
    e.preventDefault()
    addMasool({ itsId, name, zone, mohalla, assignedSabils: [], phone, status: 'Active' })
    alert(`Masool ${name} added!`)
    setItsId('')
    setName('')
    setPhone('')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Manage Masool Directory</h1>
        <p className="text-sm text-slate-500">Add and assign Masool coordinators for Mohalla sectors</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <h2 className="font-semibold text-slate-700 text-sm border-b pb-2">Add New Masool</h2>
          <form onSubmit={handleAdd} className="space-y-3">
            <div><label className="block font-semibold mb-1">ITS ID</label><input type="text" value={itsId} onChange={e => setItsId(e.target.value)} placeholder="ITS ID" className="w-full p-2 border rounded bg-slate-50" required /></div>
            <div><label className="block font-semibold mb-1">Name</label><input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="w-full p-2 border rounded bg-slate-50" required /></div>
            <div><label className="block font-semibold mb-1">Zone</label><select value={zone} onChange={e => setZone(e.target.value)} className="w-full p-2 border rounded bg-slate-50"><option value="Zone A">Zone A</option><option value="Zone B">Zone B</option><option value="Zone C">Zone C</option></select></div>
            <div><label className="block font-semibold mb-1">Phone</label><input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" className="w-full p-2 border rounded bg-slate-50" required /></div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-medium">Add Masool</button>
          </form>
        </div>

        <div className="md:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-100 border-b">
                <th className="p-3">ITS ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Zone</th>
                <th className="p-3">Mohalla</th>
                <th className="p-3">Phone</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {masoolData.masools.map(m => (
                <tr key={m.id}>
                  <td className="p-3 font-mono font-semibold text-blue-600">{m.itsId}</td>
                  <td className="p-3 font-medium text-slate-800">{m.name}</td>
                  <td className="p-3">{m.zone}</td>
                  <td className="p-3">{m.mohalla}</td>
                  <td className="p-3">{m.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export function ManageMusaeed() {
  const { masoolData } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Manage Musaeed Assistants Directory</h1>
        <p className="text-sm text-slate-500">Directory of Musaeed assistants linked to Masools</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">ITS ID</th>
              <th className="p-3">Musaeed Name</th>
              <th className="p-3">Assigned Masool</th>
              <th className="p-3">Zone</th>
              <th className="p-3">Phone</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {masoolData.musaeeds.map(m => (
              <tr key={m.id}>
                <td className="p-3 font-mono font-semibold text-blue-600">{m.itsId}</td>
                <td className="p-3 font-medium text-slate-800">{m.name}</td>
                <td className="p-3 font-medium text-blue-700">{m.masool}</td>
                <td className="p-3">{m.zone}</td>
                <td className="p-3">{m.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function ManageMasoolaat() {
  const { masoolData } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Manage Masoolaat (Benaat Committee)</h1>
        <p className="text-sm text-slate-500">Directory of Masoolaat female coordinators</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">ITS ID</th>
              <th className="p-3">Masoolaat Name</th>
              <th className="p-3">Zone</th>
              <th className="p-3">Mohalla</th>
              <th className="p-3">Phone</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {masoolData.masoolaats.map(m => (
              <tr key={m.id}>
                <td className="p-3 font-mono font-semibold text-purple-600">{m.itsId}</td>
                <td className="p-3 font-medium text-slate-800">{m.name}</td>
                <td className="p-3">{m.zone}</td>
                <td className="p-3">{m.mohalla}</td>
                <td className="p-3">{m.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function ManageMusaedaat() {
  const { masoolData } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Manage Musaedaat (Benaat Assistants)</h1>
        <p className="text-sm text-slate-500">Directory of Musaedaat female assistants</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">ITS ID</th>
              <th className="p-3">Musaedaat Name</th>
              <th className="p-3">Assigned Masoolaat</th>
              <th className="p-3">Zone</th>
              <th className="p-3">Phone</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {masoolData.musaedaats.map(m => (
              <tr key={m.id}>
                <td className="p-3 font-mono font-semibold text-purple-600">{m.itsId}</td>
                <td className="p-3 font-medium text-slate-800">{m.name}</td>
                <td className="p-3 font-medium text-purple-700">{m.masoolaat}</td>
                <td className="p-3">{m.zone}</td>
                <td className="p-3">{m.phone || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
