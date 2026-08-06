import { useState } from 'react'
import { useData } from '../../../context/DataContext'
import { Printer } from 'lucide-react'

export default function SabilForm() {
  const { sabil } = useData()
  const [selectedSabil, setSelectedSabil] = useState('1')
  const card = sabil.find(s => s.sabilNo === selectedSabil)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Sabil Application Form</h1>
          <p className="text-sm text-slate-500">Printable blank/filled Sabil registration & declaration form</p>
        </div>
        <button onClick={() => window.print()} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2">
          <Printer size={16} /> Print Form
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm print:hidden text-xs">
        <select value={selectedSabil} onChange={e => setSelectedSabil(e.target.value)} className="p-2 border rounded bg-slate-50">
          {sabil.map(s => <option key={s.id} value={s.sabilNo}>Sabil #{s.sabilNo} - {s.name}</option>)}
        </select>
      </div>

      {card && (
        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm max-w-xl mx-auto space-y-6 text-xs">
          <div className="text-center border-b pb-3">
            <h2 className="text-lg font-bold uppercase">Sabil Account Declaration Form</h2>
            <p className="text-slate-500 text-[10px]">Session 2017-2018</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><strong>Sabil No:</strong> {card.sabilNo}</div>
            <div><strong>ITS ID:</strong> {card.itsId}</div>
            <div><strong>Name:</strong> {card.name}</div>
            <div><strong>Mohalla:</strong> {card.mohalla}</div>
            <div><strong>Annual Takhmeen:</strong> ₹{card.takhmeen}</div>
            <div><strong>Status:</strong> {card.status}</div>
          </div>
          <div className="border-t pt-4 text-slate-500">
            <p>I hereby declare that the above details are accurate and commit to paying the assessed Sabil Takhmeen.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export function RazaFormList() {
  const { razaForms } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Raza Form Master Register</h1>
        <p className="text-sm text-slate-500">Master list of issued Raza and Safai forms</p>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b text-slate-600">
              <th className="p-3">Form No</th>
              <th className="p-3">Sabil #</th>
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {razaForms.map(r => (
              <tr key={r.id}>
                <td className="p-3 font-mono font-semibold text-blue-600">{r.formNo}</td>
                <td className="p-3">{r.sabilNo}</td>
                <td className="p-3 font-medium">{r.name}</td>
                <td className="p-3">{r.type}</td>
                <td className="p-3">{r.date}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${r.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function RazaFormCancel() {
  const { razaForms, cancelRazaForm } = useData()
  const activeForms = razaForms.filter(r => r.status === 'Active')

  const handleCancel = (id) => {
    cancelRazaForm(id, 'User cancelled')
    alert('Raza form cancelled.')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Raza Form Cancellation</h1>
        <p className="text-sm text-slate-500">Revoke or cancel active Raza forms</p>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Form No</th>
              <th className="p-3">Sabil #</th>
              <th className="p-3">Name</th>
              <th className="p-3">Type</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {activeForms.map(r => (
              <tr key={r.id}>
                <td className="p-3 font-mono font-semibold text-blue-600">{r.formNo}</td>
                <td className="p-3">{r.sabilNo}</td>
                <td className="p-3 font-medium">{r.name}</td>
                <td className="p-3">{r.type}</td>
                <td className="p-3 text-center">
                  <button onClick={() => handleCancel(r.id)} className="px-3 py-1 bg-red-600 text-white rounded text-[10px]">Cancel Form</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
