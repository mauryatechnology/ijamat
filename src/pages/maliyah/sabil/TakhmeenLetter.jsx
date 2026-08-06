import { useState } from 'react'
import { useData } from '../../../context/DataContext'
import { Printer } from 'lucide-react'

export default function TakhmeenLetter() {
  const { sabil } = useData()
  const [selectedSabil, setSelectedSabil] = useState('1')

  const card = sabil.find(s => s.sabilNo === selectedSabil)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Takhmeen Assessment Intimation Letter</h1>
          <p className="text-sm text-slate-500">Generate formal annual Takhmeen intimation letter</p>
        </div>
        <button onClick={() => window.print()} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2">
          <Printer size={16} /> Print Letter
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm print:hidden text-xs">
        <label className="font-semibold block mb-1">Select Member Sabil</label>
        <select value={selectedSabil} onChange={e => setSelectedSabil(e.target.value)} className="p-2 border rounded bg-slate-50">
          {sabil.map(s => <option key={s.id} value={s.sabilNo}>Sabil #{s.sabilNo} - {s.name}</option>)}
        </select>
      </div>

      {card && (
        <div className="bg-white p-10 rounded-xl border border-slate-200 shadow-sm max-w-2xl mx-auto space-y-6 text-xs font-serif leading-relaxed">
          <div className="text-center border-b pb-4 font-sans">
            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-widest">Anjuman-e-Saifee Jamaat</h2>
            <p className="text-slate-500 text-xs">Annual Takhmeen Assessment Intimation — Session 2017-2018</p>
          </div>

          <div className="flex justify-between font-sans">
            <div>
              <p><strong>To:</strong> {card.name}</p>
              <p>Sabil #{card.sabilNo} | ITS: {card.itsId}</p>
              <p>{card.mohalla}</p>
            </div>
            <div className="text-right">
              <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <p>Bawani Afzal al-Salawat wa al-Tasleemat,</p>
          <p>
            We are pleased to inform you that your annual Barkat-e-Burhaniyah Sabil Takhmeen for the session 2017-2018 has been assessed as <strong>₹{card.takhmeen.toLocaleString()}</strong>.
          </p>
          <p>
            Kindly arrange to fulfill your monthly installments or clear the amount at your earliest convenience to facilitate Jamaat khidmat activities.
          </p>

          <div className="pt-8 flex justify-between font-sans text-slate-600">
            <div>
              <p className="font-semibold">Wasalaam,</p>
              <p>Amil Saheb & Jamaat Committee</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
