import { useState } from 'react'
import { useData } from '../../../context/DataContext'
import { Utensils, Save } from 'lucide-react'

export default function MenuAdd() {
  const { addNiyazEvent, dropdownOptions } = useData()
  const [date, setDate] = useState('')
  const [dept, setDept] = useState('FMB')
  const [eventSpecial, setEventSpecial] = useState('')
  const [menu, setMenu] = useState('')
  const [cost, setCost] = useState('')
  const [khidmatByName, setKhidmatByName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    addNiyazEvent({
      date,
      dept,
      eventSpecial: eventSpecial || 'Regular Niyaz',
      menu,
      cost: Number(cost),
      khidmatBy: '1',
      khidmatByName: khidmatByName || 'Jamaat FMB',
      remark: '',
      reportOption: 'Normal',
      attachment: null,
      thaliCount: 30,
      costPerThali: Number(cost) / 30
    })
    alert('FMB / Niyaz Menu entry added successfully!')
    setDate('')
    setEventSpecial('')
    setMenu('')
    setCost('')
    setKhidmatByName('')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Add FMB / Niyaz Menu</h1>
        <p className="text-sm text-slate-500">Plan and schedule thali menu items for upcoming days and events</p>
      </div>

      <div className="max-w-xl bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 text-xs">
        <h2 className="font-semibold text-slate-700 text-base border-b pb-2 flex items-center gap-2">
          <Utensils size={18} className="text-amber-600" /> New Menu Entry Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Date</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full p-2 border rounded bg-slate-50" required />
            </div>
            <div>
              <label className="block font-semibold mb-1">Department</label>
              <select value={dept} onChange={e => setDept(e.target.value)} className="w-full p-2 border rounded bg-slate-50">
                {dropdownOptions.niyazDepts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Event / Special Description</label>
            <input type="text" value={eventSpecial} onChange={e => setEventSpecial(e.target.value)} placeholder="e.g. Jumma Niyaz, Urus Mubarak" className="w-full p-2 border rounded bg-slate-50" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Menu Items</label>
            <textarea rows={3} value={menu} onChange={e => setMenu(e.target.value)} placeholder="e.g. Biryani + Kheer + Raita" className="w-full p-2 border rounded bg-slate-50" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Estimated Cost (₹)</label>
              <input type="number" value={cost} onChange={e => setCost(e.target.value)} placeholder="Cost" className="w-full p-2 border rounded bg-slate-50" required />
            </div>
            <div>
              <label className="block font-semibold mb-1">Khidmat By (Sponsor)</label>
              <input type="text" value={khidmatByName} onChange={e => setKhidmatByName(e.target.value)} placeholder="Sponsor Name" className="w-full p-2 border rounded bg-slate-50" />
            </div>
          </div>

          <button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 rounded-lg text-sm flex items-center justify-center gap-2">
            <Save size={16} /> Save Menu Schedule
          </button>
        </form>
      </div>
    </div>
  )
}
