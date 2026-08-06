import { useState } from 'react'
import { useData } from '../../../context/DataContext'
import { Printer } from 'lucide-react'

export default function RazaForm() {
  const { sabil, addRazaForm } = useData()
  const [sabilNo, setSabilNo] = useState('1')
  const [type, setType] = useState('Safai')

  const selectedSabil = sabil.find(s => s.sabilNo === sabilNo)

  const handleGenerate = (e) => {
    e.preventDefault()
    addRazaForm({
      formNo: `RF-2024-${Math.floor(100 + Math.random() * 900)}`,
      sabilNo,
      itsId: selectedSabil?.itsId || '',
      name: selectedSabil?.name || '',
      mohalla: selectedSabil?.mohalla || '',
      type,
      date: new Date().toISOString().split('T')[0],
      generatedBy: 'admin'
    })
    alert('Raza Form Generated!')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Raza Form Generator</h1>
          <p className="text-sm text-slate-500">Generate Raza / Safai permission clearance documents</p>
        </div>
        <button onClick={() => window.print()} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2">
          <Printer size={16} /> Print Raza Form
        </button>
      </div>

      <div className="max-w-md bg-white p-6 rounded-xl border border-slate-200 shadow-sm print:hidden text-xs space-y-4">
        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Select Member Sabil</label>
            <select value={sabilNo} onChange={e => setSabilNo(e.target.value)} className="w-full p-2 border rounded bg-slate-50">
              {sabil.map(s => <option key={s.id} value={s.sabilNo}>Sabil #{s.sabilNo} - {s.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Form Category</label>
            <select value={type} onChange={e => setType(e.target.value)} className="w-full p-2 border rounded bg-slate-50">
              <option value="Safai">Safai Niyaz</option>
              <option value="Raza">General Raza</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-medium">Generate Form</button>
        </form>
      </div>

      {selectedSabil && (
        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm max-w-xl mx-auto space-y-6 text-xs">
          <div className="text-center border-b pb-4">
            <h2 className="text-xl font-bold uppercase text-slate-800">Raza & Safai Clearance Certificate</h2>
            <p className="text-slate-500">Jamaat Office Approval</p>
          </div>
          <div className="space-y-3">
            <p><strong>Member Name:</strong> {selectedSabil.name}</p>
            <p><strong>Sabil No:</strong> {selectedSabil.sabilNo} | <strong>ITS ID:</strong> {selectedSabil.itsId}</p>
            <p><strong>Mohalla:</strong> {selectedSabil.mohalla}</p>
            <p><strong>Raza Category:</strong> {type}</p>
            <p className="p-3 bg-emerald-50 text-emerald-900 rounded border border-emerald-200">
              ✓ Certified that all Jamaat dues and Sabil commitments for the current session are cleared up to date.
            </p>
          </div>
          <div className="flex justify-between pt-8 border-t text-slate-500">
            <span>Date: {new Date().toLocaleDateString()}</span>
            <span>Authorized Signature</span>
          </div>
        </div>
      )}
    </div>
  )
}
