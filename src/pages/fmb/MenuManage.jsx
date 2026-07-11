import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { showToast } from '../../components/ui/Toast'
import DataTable from '../../components/ui/DataTable'
import { Utensils, Plus } from 'lucide-react'

export default function MenuManage() {
  const { menuItems, addMenuItem } = useData()
  const [form, setForm] = useState({
    eventDate: new Date().toISOString().split('T')[0],
    dishes: '', cost: '', thaliCount: '', feedback: '', rating: 4
  })

  const handleChange = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.dishes || !form.cost) { showToast('Please fill required fields', 'error'); return }
    addMenuItem({
      eventDate: form.eventDate,
      dishes: form.dishes.split(',').map(d => d.trim()),
      cost: Number(form.cost),
      thaliCount: Number(form.thaliCount) || 0,
      feedback: form.feedback,
      rating: Number(form.rating)
    })
    showToast('Menu item added!', 'success')
    setForm(prev => ({ ...prev, dishes: '', cost: '', thaliCount: '', feedback: '' }))
  }

  const columns = [
    { key: 'eventDate', label: 'Date' },
    { key: 'dishes', label: 'Dishes', render: v => Array.isArray(v) ? v.join(', ') : v },
    { key: 'cost', label: 'Cost (₹)', render: v => `₹${Number(v).toLocaleString('en-IN')}` },
    { key: 'thaliCount', label: 'Thali Count' },
    { key: 'rating', label: 'Rating', render: v => '⭐'.repeat(v) },
    { key: 'feedback', label: 'Feedback' }
  ]

  return (
    <div>
      <h2 className="page-header"><Utensils size={22} /> Add / Edit Menu</h2>
      <div className="card mb-4">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
            <div className="form-group"><label className="form-label">Event Date:</label><input type="date" value={form.eventDate} onChange={e => handleChange('eventDate', e.target.value)} className="form-input" /></div>
            <div className="form-group md:col-span-2"><label className="form-label">Dishes (comma separated):</label><input type="text" value={form.dishes} onChange={e => handleChange('dishes', e.target.value)} className="form-input" placeholder="Dal, Rice, Roti, Sweet" /></div>
            <div className="form-group"><label className="form-label">Total Cost:</label><input type="number" value={form.cost} onChange={e => handleChange('cost', e.target.value)} className="form-input" placeholder="0" /></div>
            <div className="form-group"><label className="form-label">Thali Count:</label><input type="number" value={form.thaliCount} onChange={e => handleChange('thaliCount', e.target.value)} className="form-input" placeholder="0" /></div>
            <div className="form-group"><label className="form-label">Rating (1-5):</label><select value={form.rating} onChange={e => handleChange('rating', e.target.value)} className="form-select"><option value="5">5 - Outstanding</option><option value="4">4 - Very Good</option><option value="3">3 - Average</option><option value="2">2 - Below Average</option><option value="1">1 - Poor</option></select></div>
          </div>
          <div className="mt-4"><button type="submit" className="btn btn-info"><Plus size={14} /> Add Menu</button></div>
        </form>
      </div>
      <DataTable columns={columns} data={menuItems} title="Menu_Items" />
    </div>
  )
}
