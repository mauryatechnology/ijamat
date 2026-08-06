import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { showToast } from '../../components/ui/Toast'

export default function VisitEntry() {
  const { members } = useData()
  const [visitorName, setVisitorName] = useState('')
  const [purpose, setPurpose] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    showToast('Visitor logged successfully!')
    setVisitorName('')
    setPurpose('')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Jamaat Office Visitor Log Entry</h1>
        <p className="text-sm text-slate-500">Register external guests and Mumineen office visits</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm max-w-md text-xs space-y-4">
        <div>
          <label className="block font-semibold mb-1">Visitor Name</label>
          <input type="text" value={visitorName} onChange={e => setVisitorName(e.target.value)} required placeholder="Enter visitor name..." className="w-full p-2 border rounded bg-slate-50" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Purpose of Visit</label>
          <input type="text" value={purpose} onChange={e => setPurpose(e.target.value)} required placeholder="e.g. Sabil Clearance, Raza..." className="w-full p-2 border rounded bg-slate-50" />
        </div>
        <button type="submit" className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700">Submit Log Entry</button>
      </form>
    </div>
  )
}
