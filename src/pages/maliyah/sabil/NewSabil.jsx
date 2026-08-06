import { useState } from 'react'
import { useData } from '../../../context/DataContext'
import { Save } from 'lucide-react'

export default function NewSabil() {
  const { addSabil, dropdownOptions } = useData()
  const [sabilNo, setSabilNo] = useState('')
  const [itsId, setItsId] = useState('')
  const [name, setName] = useState('')
  const [mohalla, setMohalla] = useState('Saifee Mohalla')
  const [takhmeen, setTakhmeen] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    addSabil({
      sabilNo,
      itsId,
      name,
      mohalla,
      type: 'Regular',
      sector: 'Mohammedi',
      takhmeen: Number(takhmeen),
      openingBalance: 0,
      status: 'Active',
      startDate: new Date().toISOString().split('T')[0]
    })
    alert(`New Sabil #${sabilNo} created!`)
    setSabilNo('')
    setItsId('')
    setName('')
    setTakhmeen('')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">New Sabil Account Registration</h1>
        <p className="text-sm text-slate-500">Register new Sabil account for newly married or relocated HOF</p>
      </div>

      <div className="max-w-xl bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 text-xs">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-600 mb-1">New Sabil Number</label>
              <input type="text" value={sabilNo} onChange={e => setSabilNo(e.target.value)} placeholder="Sabil #" className="w-full p-2 border rounded bg-slate-50" required />
            </div>
            <div>
              <label className="block font-semibold text-slate-600 mb-1">HOF ITS ID</label>
              <input type="text" value={itsId} onChange={e => setItsId(e.target.value)} placeholder="ITS ID" className="w-full p-2 border rounded bg-slate-50" required />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-600 mb-1">Full Name (HOF)</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="w-full p-2 border rounded bg-slate-50" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-600 mb-1">Mohalla</label>
              <select value={mohalla} onChange={e => setMohalla(e.target.value)} className="w-full p-2 border rounded bg-slate-50">
                {dropdownOptions.mohallas.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-600 mb-1">Initial Takhmeen (₹)</label>
              <input type="number" value={takhmeen} onChange={e => setTakhmeen(e.target.value)} placeholder="Annual Takhmeen" className="w-full p-2 border rounded bg-slate-50" required />
            </div>
          </div>

          <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-lg text-sm flex items-center justify-center gap-2">
            <Save size={16} /> Register New Sabil
          </button>
        </form>
      </div>
    </div>
  )
}
