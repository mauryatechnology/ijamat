import { useState } from 'react'
import { useData } from '../../../context/DataContext'

export default function UpdateSabil() {
  const { sabil } = useData()
  const [sabilNo, setSabilNo] = useState('1')
  const [status, setStatus] = useState('Active')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Update Sabil Master Details</h1>
        <p className="text-sm text-slate-500">Edit general details, category, and status of existing Sabils</p>
      </div>
      <div className="max-w-md bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs space-y-4">
        <label className="block font-semibold mb-1">Select Sabil</label>
        <select value={sabilNo} onChange={e => setSabilNo(e.target.value)} className="w-full p-2 border rounded bg-slate-50">
          {sabil.map(s => <option key={s.id} value={s.sabilNo}>Sabil #{s.sabilNo} - {s.name}</option>)}
        </select>
        <label className="block font-semibold mb-1">Sabil Status</label>
        <select value={status} onChange={e => setStatus(e.target.value)} className="w-full p-2 border rounded bg-slate-50">
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Suspended">Suspended</option>
        </select>
        <button onClick={() => alert('Sabil updated!')} className="w-full bg-blue-600 text-white py-2 rounded font-medium">Save Changes</button>
      </div>
    </div>
  )
}

export function UpdateTakhmeen() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Update Annual Takhmeen</h1>
        <p className="text-sm text-slate-500">Revise takhmeen amounts mid-session</p>
      </div>
      <div className="max-w-md bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs space-y-4">
        <input type="text" placeholder="Sabil #" className="w-full p-2 border rounded bg-slate-50" />
        <input type="number" placeholder="Revised Takhmeen" className="w-full p-2 border rounded bg-slate-50" />
        <button onClick={() => alert('Takhmeen revised!')} className="w-full bg-emerald-600 text-white py-2 rounded font-medium">Revise Takhmeen</button>
      </div>
    </div>
  )
}

export function UpdateFamilyMembers() {
  const { members } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Update Family Members Linkage</h1>
        <p className="text-sm text-slate-500">Associate family members (FM) to Head of Family (HOF) Sabil cards</p>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">ITS ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">HOF / FM</th>
              <th className="p-3">Sabil #</th>
              <th className="p-3">Mohalla</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {members.slice(0, 8).map(m => (
              <tr key={m.id}>
                <td className="p-3 font-mono">{m.itsId}</td>
                <td className="p-3 font-medium">{m.name}</td>
                <td className="p-3"><span className={`px-2 py-0.5 rounded text-[10px] ${m.hofOrFm === 'HOF' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100'}`}>{m.hofOrFm}</span></td>
                <td className="p-3 font-semibold">{m.sabilNo}</td>
                <td className="p-3">{m.mohalla}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function AddressChangeRequest() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Address Change Requests</h1>
        <p className="text-sm text-slate-500">Approve or process address and mohalla change applications</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs">
        <p className="text-slate-500 italic">No pending address change requests.</p>
      </div>
    </div>
  )
}

export function ManageBuildings() {
  const { buildingsMaster, addBuilding } = useData()
  const [name, setName] = useState('')
  const [mohalla, setMohalla] = useState('Saifee Mohalla')
  const [flats, setFlats] = useState('')

  const handleAdd = (e) => {
    e.preventDefault()
    addBuilding({ name, mohalla, address: mohalla, totalFlats: Number(flats), type: 'Residential', status: 'Active' })
    setName('')
    setFlats('')
    alert('Building added successfully!')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Manage Buildings Master</h1>
        <p className="text-sm text-slate-500">Directory of residential and commercial buildings under Jamaat jurisdiction</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="font-semibold text-slate-700 text-base border-b pb-2">Add Building</h2>
          <form onSubmit={handleAdd} className="space-y-3">
            <div>
              <label className="block font-semibold mb-1">Building Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Building Name" className="w-full p-2 border rounded bg-slate-50" required />
            </div>
            <div>
              <label className="block font-semibold mb-1">Mohalla</label>
              <select value={mohalla} onChange={e => setMohalla(e.target.value)} className="w-full p-2 border rounded bg-slate-50">
                <option value="Saifee Mohalla">Saifee Mohalla</option>
                <option value="Najmi Mohalla">Najmi Mohalla</option>
                <option value="Fakhri Mohalla">Fakhri Mohalla</option>
                <option value="Hakimi Mohalla">Hakimi Mohalla</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1">Total Flats / Units</label>
              <input type="number" value={flats} onChange={e => setFlats(e.target.value)} placeholder="Units" className="w-full p-2 border rounded bg-slate-50" required />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-medium">Add Building</button>
          </form>
        </div>

        <div className="md:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-100 border-b">
                <th className="p-3">Building Name</th>
                <th className="p-3">Mohalla</th>
                <th className="p-3">Flats</th>
                <th className="p-3">Type</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {buildingsMaster.map(b => (
                <tr key={b.id}>
                  <td className="p-3 font-semibold text-slate-800">{b.name}</td>
                  <td className="p-3">{b.mohalla}</td>
                  <td className="p-3">{b.totalFlats}</td>
                  <td className="p-3">{b.type}</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-semibold">{b.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
