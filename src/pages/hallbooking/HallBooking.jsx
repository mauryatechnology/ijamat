import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { showToast } from '../../components/ui/Toast'
import DataTable from '../../components/ui/DataTable'
import { Home, Plus, Calendar } from 'lucide-react'

export default function HallBooking() {
  const { hallBookings, dropdownOptions, addBooking } = useData()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    venue: '', date: new Date().toISOString().split('T')[0], slot: '',
    bookedBy: '', purpose: '', amount: '', phone: '', addons: []
  })

  const handleChange = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

  const toggleAddon = (addon) => {
    setForm(prev => ({
      ...prev,
      addons: prev.addons.includes(addon) ? prev.addons.filter(a => a !== addon) : [...prev.addons, addon]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.venue || !form.date || !form.bookedBy) { showToast('Please fill required fields', 'error'); return }
    addBooking({ ...form, amount: Number(form.amount) || 0, status: 'Pending' })
    showToast('Booking registered successfully!', 'success')
    setShowForm(false)
    setForm({ venue: '', date: new Date().toISOString().split('T')[0], slot: '', bookedBy: '', purpose: '', amount: '', phone: '', addons: [] })
  }

  // Calendar view
  const currentMonth = new Date(2020, 11) // December 2020
  const daysInMonth = new Date(2020, 12, 0).getDate()
  const firstDay = new Date(2020, 11, 1).getDay()
  const calendarDays = []
  for (let i = 0; i < firstDay; i++) calendarDays.push(null)
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d)

  const getBookingsForDay = (day) => {
    if (!day) return []
    const dateStr = `2020-12-${String(day).padStart(2, '0')}`
    return hallBookings.filter(b => b.date === dateStr)
  }

  return (
    <div>
      <h2 className="page-header"><Home size={22} /> Hall Booking</h2>

      <div className="mb-4">
        <button onClick={() => setShowForm(!showForm)} className="btn btn-danger">
          <Plus size={14} /> New Booking
        </button>
      </div>

      {showForm && (
        <div className="card mb-4">
          <h3 className="text-base font-semibold mb-3">New Booking Registration</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
              <div className="form-group"><label className="form-label">Venue *:</label>
                <select value={form.venue} onChange={e => handleChange('venue', e.target.value)} className="form-select">
                  <option value="">Select Venue</option>
                  {dropdownOptions.bookingVenues.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div className="form-group"><label className="form-label">Date *:</label><input type="date" value={form.date} onChange={e => handleChange('date', e.target.value)} className="form-input" /></div>
              <div className="form-group"><label className="form-label">Slot:</label>
                <select value={form.slot} onChange={e => handleChange('slot', e.target.value)} className="form-select">
                  <option value="">Select Slot</option>
                  {dropdownOptions.bookingSlots.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-group"><label className="form-label">Booked By *:</label><input type="text" value={form.bookedBy} onChange={e => handleChange('bookedBy', e.target.value)} className="form-input" /></div>
              <div className="form-group"><label className="form-label">Purpose:</label><input type="text" value={form.purpose} onChange={e => handleChange('purpose', e.target.value)} className="form-input" /></div>
              <div className="form-group"><label className="form-label">Amount:</label><input type="number" value={form.amount} onChange={e => handleChange('amount', e.target.value)} className="form-input" placeholder="0" /></div>
              <div className="form-group"><label className="form-label">Phone:</label><input type="tel" value={form.phone} onChange={e => handleChange('phone', e.target.value)} className="form-input" /></div>
              <div className="form-group md:col-span-2">
                <label className="form-label">Add-ons:</label>
                <div className="flex flex-wrap gap-3 mt-1">
                  {dropdownOptions.bookingAddons.map(addon => (
                    <label key={addon} className="flex items-center gap-1.5 cursor-pointer text-sm">
                      <input type="checkbox" checked={form.addons.includes(addon)} onChange={() => toggleAddon(addon)} className="accent-primary" />
                      {addon}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <button type="submit" className="btn btn-info">Register Booking</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn bg-gray-200 text-gray-700">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Calendar View */}
      <div className="card">
        <h3 className="text-base font-semibold mb-3 flex items-center gap-2"><Calendar size={18} /> December 2020</h3>
        <div className="grid grid-cols-7 gap-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-xs font-semibold text-gray-500 py-2">{day}</div>
          ))}
          {calendarDays.map((day, idx) => {
            const bookings = getBookingsForDay(day)
            return (
              <div key={idx} className={`min-h-[80px] border rounded p-1 text-xs ${day ? 'bg-white' : 'bg-gray-50'}`}>
                {day && (
                  <>
                    <span className="font-semibold text-gray-700">{day}</span>
                    {bookings.map(b => (
                      <div key={b.id} className={`mt-1 px-1.5 py-0.5 rounded text-[10px] truncate ${
                        b.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' :
                        b.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {b.venue} - {b.purpose}
                      </div>
                    ))}
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
