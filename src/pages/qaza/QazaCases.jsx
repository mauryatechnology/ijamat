import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { Gavel } from 'lucide-react'

export default function QazaCases() {
  const { qazaCases, addQazaCase } = useData()
  const [caseNo, setCaseNo] = useState('')
  const [partyA, setPartyA] = useState('')
  const [partyB, setPartyB] = useState('')
  const [caseType, setCaseType] = useState('Property / Dispute')

  const handleAdd = (e) => {
    e.preventDefault()
    addQazaCase({
      caseNo,
      partyA,
      partyB,
      caseType,
      fileDate: new Date().toISOString().split('T')[0],
      nextHearing: '2024-09-15',
      status: 'In Hearing',
      judge: 'Jamaat Committee'
    })
    alert('Qaza case registered!')
    setCaseNo('')
    setPartyA('')
    setPartyB('')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Qaza / Arbitration Dispute Cases</h1>
        <p className="text-sm text-slate-500">Register and track resolution hearings for community disputes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <h2 className="font-semibold text-slate-700 text-sm border-b pb-2 flex items-center gap-2">
            <Gavel size={16} className="text-indigo-600" /> New Case Registration
          </h2>
          <form onSubmit={handleAdd} className="space-y-3">
            <div><label className="block font-semibold mb-1">Case Number</label><input type="text" value={caseNo} onChange={e => setCaseNo(e.target.value)} placeholder="QZ-2024-001" className="w-full p-2 border rounded bg-slate-50" required /></div>
            <div><label className="block font-semibold mb-1">Party A (Applicant)</label><input type="text" value={partyA} onChange={e => setPartyA(e.target.value)} placeholder="Party A Name" className="w-full p-2 border rounded bg-slate-50" required /></div>
            <div><label className="block font-semibold mb-1">Party B (Respondent)</label><input type="text" value={partyB} onChange={e => setPartyB(e.target.value)} placeholder="Party B Name" className="w-full p-2 border rounded bg-slate-50" required /></div>
            <div>
              <label className="block font-semibold mb-1">Dispute Category</label>
              <select value={caseType} onChange={e => setCaseType(e.target.value)} className="w-full p-2 border rounded bg-slate-50">
                <option value="Property / Dispute">Property / Dispute</option>
                <option value="Family / Marital">Family / Marital</option>
                <option value="Commercial / Business">Commercial / Business</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded font-medium">Register Case</button>
          </form>
        </div>

        <div className="md:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-100 border-b">
                <th className="p-3">Case #</th>
                <th className="p-3">Parties</th>
                <th className="p-3">Category</th>
                <th className="p-3">Next Hearing</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {qazaCases.map(c => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-semibold text-indigo-600">{c.caseNo}</td>
                  <td className="p-3 font-medium text-slate-800">{c.partyA} vs {c.partyB}</td>
                  <td className="p-3">{c.caseType}</td>
                  <td className="p-3 text-slate-600">{c.nextHearing}</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] bg-amber-100 text-amber-800 font-semibold">{c.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export function BookingCalendar() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Community Hall Booking Availability Calendar</h1>
        <p className="text-sm text-slate-500">Live availability status for Jamaat Community Halls and Mawaid</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs max-w-lg space-y-3">
        <h2 className="font-bold border-b pb-2 text-sm text-slate-800">Available Halls</h2>
        <ul className="space-y-2">
          <li className="flex justify-between p-3 bg-slate-50 rounded"><span>Saifee Mawaid Hall (Cap: 400)</span><span className="font-bold text-emerald-600">Available</span></li>
          <li className="flex justify-between p-3 bg-slate-50 rounded"><span>Burhani Community Hall (Cap: 250)</span><span className="font-bold text-amber-600">Booked (Jul 12)</span></li>
        </ul>
      </div>
    </div>
  )
}
