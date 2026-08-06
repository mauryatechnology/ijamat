import { useState } from 'react'
import { useData } from '../../../context/DataContext'

export default function SabilCardCancel() {
  const { sabil, removeSabil } = useData()
  const [selectedSabil, setSelectedSabil] = useState('')
  const [reason, setReason] = useState('')

  const handleCancel = (e) => {
    e.preventDefault()
    if (!selectedSabil) return
    removeSabil(selectedSabil)
    alert(`Sabil Card #${selectedSabil} cancelled.`)
    setSelectedSabil('')
    setReason('')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Sabil Card Cancellation</h1>
        <p className="text-sm text-slate-500">Deactivate or cancel Sabil account due to transfer or relocation</p>
      </div>

      <div className="max-w-md bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs space-y-4">
        <form onSubmit={handleCancel} className="space-y-4">
          <div>
            <label className="block font-semibold text-slate-600 mb-1">Select Sabil to Cancel</label>
            <select value={selectedSabil} onChange={e => setSelectedSabil(e.target.value)} className="w-full p-2 border rounded bg-slate-50" required>
              <option value="">-- Select Sabil --</option>
              {sabil.map(s => (
                <option key={s.id} value={s.sabilNo}>Sabil #{s.sabilNo} - {s.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold text-slate-600 mb-1">Reason for Cancellation</label>
            <textarea rows={3} value={reason} onChange={e => setReason(e.target.value)} placeholder="Reason" className="w-full p-2 border rounded bg-slate-50" required />
          </div>
          <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg text-sm">Cancel Sabil Card</button>
        </form>
      </div>
    </div>
  )
}
