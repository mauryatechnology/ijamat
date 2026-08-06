import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { Send, Smartphone } from 'lucide-react'

export default function DailyDueSMS() {
  const { sabil } = useData()
  const [selectedMohalla, setSelectedMohalla] = useState('All')
  const [messageTemplate, setMessageTemplate] = useState('Salam {NAME}, your current Jamaat due balance for Sabil #{SABIL} is Rs. {DUE}. Kindly settle at your earliest.')

  const dueMembers = sabil.filter(s => selectedMohalla === 'All' || s.mohalla === selectedMohalla)

  const handleSendAll = () => {
    alert(`SMS reminders queued for ${dueMembers.length} members!`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Daily Due Reminder SMS / WhatsApp</h1>
        <p className="text-sm text-slate-500">Automated payment reminder broadcasting</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 text-xs">
          <h2 className="font-semibold text-slate-700 text-lg border-b pb-2 flex items-center gap-2">
            <Smartphone size={18} className="text-blue-600" /> Broadcast Configuration
          </h2>
          <div>
            <label className="block font-semibold text-slate-600 mb-1">Filter Mohalla</label>
            <select value={selectedMohalla} onChange={e => setSelectedMohalla(e.target.value)} className="w-full p-2 border rounded bg-slate-50">
              <option value="All">All Mohallas</option>
              <option value="Saifee Mohalla">Saifee Mohalla</option>
              <option value="Najmi Mohalla">Najmi Mohalla</option>
              <option value="Fakhri Mohalla">Fakhri Mohalla</option>
              <option value="Hakimi Mohalla">Hakimi Mohalla</option>
              <option value="Taheri Mohalla">Taheri Mohalla</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-600 mb-1">SMS Template</label>
            <textarea
              rows={4}
              value={messageTemplate}
              onChange={e => setMessageTemplate(e.target.value)}
              className="w-full p-2 border rounded bg-slate-50 outline-none focus:border-blue-500"
            />
          </div>

          <button
            onClick={handleSendAll}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg text-sm flex items-center justify-center gap-2"
          >
            <Send size={16} /> Broadcast SMS to {dueMembers.length} Members
          </button>
        </div>

        <div className="md:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="font-semibold text-slate-700 text-lg mb-4">Recipient Preview ({dueMembers.length})</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 border-b">
                  <th className="p-2">Sabil #</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Mohalla</th>
                  <th className="p-2 text-right">Due Balance</th>
                  <th className="p-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dueMembers.map(s => (
                  <tr key={s.id}>
                    <td className="p-2 font-mono font-semibold">{s.sabilNo}</td>
                    <td className="p-2 font-medium">{s.name}</td>
                    <td className="p-2">{s.mohalla}</td>
                    <td className="p-2 text-right font-bold text-amber-600">₹{Math.floor(s.takhmeen * 0.3)}</td>
                    <td className="p-2 text-center"><span className="px-2 py-0.5 rounded text-[10px] bg-blue-100 text-blue-800 font-semibold">Ready</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
