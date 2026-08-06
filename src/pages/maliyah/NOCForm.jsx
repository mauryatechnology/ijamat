import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { CheckCircle, Save, Printer } from 'lucide-react'

export default function NOCForm() {
  const { sabil, addNOC } = useData()
  const [sabilNo, setSabilNo] = useState('')
  const [purpose, setPurpose] = useState('Travel')
  const [commitment, setCommitment] = useState('')
  const [commitmentAmount, setCommitmentAmount] = useState('')

  const selectedMember = sabil.find(s => s.sabilNo === sabilNo)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedMember) return
    addNOC({
      nocNo: `NOC-2024-${Math.floor(100 + Math.random() * 900)}`,
      sabilNo: selectedMember.sabilNo,
      itsId: selectedMember.itsId,
      name: selectedMember.name,
      mohalla: selectedMember.mohalla,
      issueDate: new Date().toISOString().split('T')[0],
      purpose,
      clearanceStatus: commitmentAmount ? 'Pending' : 'Cleared',
      clearDate: commitmentAmount ? '' : new Date().toISOString().split('T')[0],
      commitment,
      commitmentAmount: Number(commitmentAmount || 0),
      pendingDues: 0,
      approvedBy: 'admin'
    })
    alert('NOC Certificate Generated!')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">No Objection Certificate (NOC) Form</h1>
        <p className="text-sm text-slate-500">Issue official NOC for travel, safar, marriage, or transfers</p>
      </div>

      <div className="max-w-xl bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 text-xs">
        <h2 className="font-semibold text-slate-700 text-lg border-b pb-2">Generate NOC</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold text-slate-600 mb-1">Select Member Sabil</label>
            <select value={sabilNo} onChange={e => setSabilNo(e.target.value)} className="w-full p-2 border rounded bg-slate-50" required>
              <option value="">-- Select Sabil --</option>
              {sabil.map(s => (
                <option key={s.id} value={s.sabilNo}>Sabil #{s.sabilNo} - {s.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-600 mb-1">Purpose of NOC</label>
            <select value={purpose} onChange={e => setPurpose(e.target.value)} className="w-full p-2 border rounded bg-slate-50">
              <option value="Travel">Safar / Travel</option>
              <option value="Nikah">Nikah</option>
              <option value="Transfer">Jamaat Transfer</option>
              <option value="Business">Business NOC</option>
              <option value="Education">Higher Education</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-600 mb-1">Pending Commitment (if any)</label>
            <input type="text" value={commitment} onChange={e => setCommitment(e.target.value)} placeholder="e.g. Will pay remaining dues after return" className="w-full p-2 border rounded bg-slate-50" />
          </div>

          <div>
            <label className="block font-semibold text-slate-600 mb-1">Committed Dues Amount (₹)</label>
            <input type="number" value={commitmentAmount} onChange={e => setCommitmentAmount(e.target.value)} placeholder="0 if all cleared" className="w-full p-2 border rounded bg-slate-50" />
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg text-sm flex items-center justify-center gap-2">
            <Save size={16} /> Issue & Print NOC
          </button>
        </form>
      </div>
    </div>
  )
}
