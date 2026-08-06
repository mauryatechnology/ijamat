import { useState } from 'react'
import { useData } from '../../../context/DataContext'

export default function NOCAutoClear() {
  const { nocRecords } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">NOC Auto Clearance Engine</h1>
        <p className="text-sm text-slate-500">Automatically clear NOC status when all committed dues are settled</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs space-y-4 max-w-md">
        <button onClick={() => alert('Processed 3 NOC auto-clearances!')} className="w-full bg-emerald-600 text-white py-2 rounded font-medium">Run Auto-Clear Engine</button>
      </div>
    </div>
  )
}

export function ChangeSabilMobile() {
  const { sabil, updateSabilMobile } = useData()
  const [sabilNo, setSabilNo] = useState('1')
  const [mobile, setMobile] = useState('')

  const handleUpdate = (e) => {
    e.preventDefault()
    updateSabilMobile(sabilNo, mobile)
    alert(`Sabil #${sabilNo} mobile updated to ${mobile}`)
    setMobile('')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Change Sabil Mobile Number</h1>
        <p className="text-sm text-slate-500">Quickly update primary mobile number for Sabil SMS/WhatsApp alerts</p>
      </div>
      <div className="max-w-md bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs space-y-4">
        <form onSubmit={handleUpdate} className="space-y-3">
          <div>
            <label className="block font-semibold mb-1">Select Sabil</label>
            <select value={sabilNo} onChange={e => setSabilNo(e.target.value)} className="w-full p-2 border rounded bg-slate-50">
              {sabil.map(s => <option key={s.id} value={s.sabilNo}>Sabil #{s.sabilNo} - {s.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">New Mobile Number</label>
            <input type="text" value={mobile} onChange={e => setMobile(e.target.value)} placeholder="10 digit mobile" className="w-full p-2 border rounded bg-slate-50" required />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-medium">Update Mobile</button>
        </form>
      </div>
    </div>
  )
}

export function SafaiNiyaz() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Safai Niyaz Management</h1>
        <p className="text-sm text-slate-500">Manage Niyaz venue cleaning and maintenance clearance</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs">
        <p className="text-slate-500">All Safai Niyaz clearances are up to date.</p>
      </div>
    </div>
  )
}

export function SafaiQardan() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Safai Qardan Hasana</h1>
        <p className="text-sm text-slate-500">Clearance utility for Qardan Hasana loan accounts</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs">
        <p className="text-slate-500">No pending Qardan clearance actions.</p>
      </div>
    </div>
  )
}

export function SabilRemove() {
  const { sabil, removeSabil } = useData()
  const [sabilNo, setSabilNo] = useState('')

  const handleRemove = (e) => {
    e.preventDefault()
    if (!sabilNo) return
    removeSabil(sabilNo)
    alert(`Sabil #${sabilNo} permanently removed from active system.`)
    setSabilNo('')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Permanent Sabil Account Removal</h1>
        <p className="text-sm text-slate-500">Purge or remove inactive / deceased member Sabil accounts</p>
      </div>
      <div className="max-w-md bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs space-y-4">
        <form onSubmit={handleRemove} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Select Sabil to Remove</label>
            <select value={sabilNo} onChange={e => setSabilNo(e.target.value)} className="w-full p-2 border rounded bg-slate-50" required>
              <option value="">-- Select Sabil --</option>
              {sabil.map(s => <option key={s.id} value={s.sabilNo}>Sabil #{s.sabilNo} - {s.name}</option>)}
            </select>
          </div>
          <button type="submit" className="w-full bg-red-600 text-white py-2 rounded font-medium">Remove Sabil Account</button>
        </form>
      </div>
    </div>
  )
}
