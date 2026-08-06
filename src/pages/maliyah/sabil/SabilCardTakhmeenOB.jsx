import { useState } from 'react'
import { useData } from '../../../context/DataContext'

export default function SabilCardTakhmeenOB() {
  const { sabil, addSabil } = useData()
  const [sabilNo, setSabilNo] = useState('')
  const [takhmeen, setTakhmeen] = useState('')
  const [openingBalance, setOpeningBalance] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    addSabil({ sabilNo, takhmeen: Number(takhmeen), openingBalance: Number(openingBalance), type: 'Regular', status: 'Active' })
    alert('Sabil Card Takhmeen & Opening Balance saved!')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Sabil Card Takhmeen + Opening Balance Entry</h1>
        <p className="text-sm text-slate-500">Record annual takhmeen and previous session carried forward balance</p>
      </div>

      <div className="max-w-md bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 text-xs">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold text-slate-600 mb-1">Sabil Number</label>
            <input type="text" value={sabilNo} onChange={e => setSabilNo(e.target.value)} placeholder="Sabil #" className="w-full p-2 border rounded bg-slate-50" required />
          </div>
          <div>
            <label className="block font-semibold text-slate-600 mb-1">Annual Takhmeen Amount (₹)</label>
            <input type="number" value={takhmeen} onChange={e => setTakhmeen(e.target.value)} placeholder="Amount" className="w-full p-2 border rounded bg-slate-50" required />
          </div>
          <div>
            <label className="block font-semibold text-slate-600 mb-1">Carried Forward Opening Balance (₹)</label>
            <input type="number" value={openingBalance} onChange={e => setOpeningBalance(e.target.value)} placeholder="Opening Balance" className="w-full p-2 border rounded bg-slate-50" required />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg text-sm">Save Entry</button>
        </form>
      </div>
    </div>
  )
}
