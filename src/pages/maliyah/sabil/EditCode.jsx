import { useState } from 'react'
import { useData } from '../../../context/DataContext'

export default function EditCode() {
  const { sabil } = useData()
  const [sabilNo, setSabilNo] = useState('1')
  const [newCode, setNewCode] = useState('')

  const handleUpdate = (e) => {
    e.preventDefault()
    alert(`Sabil #${sabilNo} ledger code updated to ${newCode}!`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Edit Sabil Account Code</h1>
        <p className="text-sm text-slate-500">Modify internal ledger / reference code for a Sabil</p>
      </div>
      <div className="max-w-md bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs space-y-4">
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Select Sabil</label>
            <select value={sabilNo} onChange={e => setSabilNo(e.target.value)} className="w-full p-2 border rounded bg-slate-50">
              {sabil.map(s => <option key={s.id} value={s.sabilNo}>Sabil #{s.sabilNo} - {s.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">New Internal Reference Code</label>
            <input type="text" value={newCode} onChange={e => setNewCode(e.target.value)} placeholder="Code e.g. SBL-001" className="w-full p-2 border rounded bg-slate-50" required />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-medium">Update Code</button>
        </form>
      </div>
    </div>
  )
}
