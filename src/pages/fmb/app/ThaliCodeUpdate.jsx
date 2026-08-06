import { useState } from 'react'
import { useData } from '../../../context/DataContext'
import { showToast } from '../../../components/ui/Toast'

export default function ThaliCodeUpdate() {
  const { thalis } = useData()
  const [selectedThali, setSelectedThali] = useState('')
  const [newBarcode, setNewBarcode] = useState('')

  const handleUpdate = (e) => {
    e.preventDefault()
    showToast(`Updated Barcode for Thali ${selectedThali}`)
    setNewBarcode('')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Thali RFID / Barcode Re-Assignment</h1>
        <p className="text-sm text-slate-500">Update missing or damaged barcode tags</p>
      </div>

      <form onSubmit={handleUpdate} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm max-w-md text-xs space-y-4">
        <div>
          <label className="block font-semibold mb-1">Select Thali</label>
          <select value={selectedThali} onChange={e => setSelectedThali(e.target.value)} className="w-full p-2 border rounded bg-slate-50">
            <option value="">Select Thali...</option>
            {thalis.map(t => <option key={t.id} value={t.thaliNo}>{t.thaliNo} - {t.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1">New Barcode String</label>
          <input type="text" value={newBarcode} onChange={e => setNewBarcode(e.target.value)} placeholder="Scan new barcode..." className="w-full p-2 border rounded bg-slate-50" />
        </div>
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700">Save Barcode Tag</button>
      </form>
    </div>
  )
}
