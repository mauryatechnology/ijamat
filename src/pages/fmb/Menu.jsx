import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { showToast } from '../../components/ui/Toast'
import FilterPanel from '../../components/ui/FilterPanel'
import DataTable from '../../components/ui/DataTable'
import { Utensils, Plus } from 'lucide-react'

export default function Menu() {
  const { menuItems, addMenuItem } = useData()
  const [filtered, setFiltered] = useState(menuItems)
  const [form, setForm] = useState({
    eventDate: new Date().toISOString().split('T')[0],
    dishes: '', cost: '', thaliCount: '', feedback: '', rating: 4
  })

  // Filter Panel Configuration
  const filterFields = [
    { key: 'fromDate', label: 'From Date', type: 'date' },
    { key: 'toDate', label: 'To Date', type: 'date' }
  ]

  const handleFilter = (values) => {
    let result = [...menuItems]
    if (values.fromDate) result = result.filter(m => m.eventDate >= values.fromDate)
    if (values.toDate) result = result.filter(m => m.eventDate <= values.toDate)
    setFiltered(result)
  }

  // Form Handling
  const handleChange = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.dishes || !form.cost) { showToast('Please fill required fields', 'error'); return }
    
    const newEntry = {
      id: Date.now(),
      eventDate: form.eventDate,
      dishes: form.dishes.split(',').map(d => d.trim()),
      cost: Number(form.cost),
      thaliCount: Number(form.thaliCount) || 0,
      feedback: form.feedback,
      rating: Number(form.rating)
    }

    addMenuItem(newEntry)
    setFiltered(prev => [newEntry, ...prev])
    
    showToast('Menu item added!', 'success')
    setForm(prev => ({ ...prev, dishes: '', cost: '', thaliCount: '', feedback: '' }))
  }

  // Stats
  const totalCost = filtered.reduce((s, m) => s + m.cost, 0)
  const totalThalis = filtered.reduce((s, m) => s + m.thaliCount, 0)
  const avgRating = filtered.length > 0 ? (filtered.reduce((s, m) => s + m.rating, 0) / filtered.length).toFixed(1) : 0

  // Table Columns
  const columns = [
    { key: 'eventDate', label: 'Date' },
    { key: 'dishes', label: 'Dishes', render: v => Array.isArray(v) ? v.join(', ') : v },
    { key: 'cost', label: 'Cost (₹)', render: v => `₹${Number(v).toLocaleString('en-IN')}` },
    { key: 'thaliCount', label: 'Thalis Served' },
    { key: 'rating', label: 'Rating', render: v => '⭐'.repeat(v) },
    { key: 'feedback', label: 'Feedback' }
  ]

  return (
    <div>
      <h2 className="page-header"><Utensils size={22} /> FMB Menu</h2>
      
      {/* Entry Form */}
      <div className="card mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-4 border-b pb-2">Add New Menu</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
            <div className="form-group">
              <label className="form-label">Event Date:</label>
              <input type="date" value={form.eventDate} onChange={e => handleChange('eventDate', e.target.value)} className="form-input" />
            </div>
            <div className="form-group md:col-span-2">
              <label className="form-label">Dishes (comma separated):</label>
              <input type="text" value={form.dishes} onChange={e => handleChange('dishes', e.target.value)} className="form-input" placeholder="Dal, Rice, Roti, Sweet" />
            </div>
            <div className="form-group">
              <label className="form-label">Total Cost:</label>
              <input type="number" value={form.cost} onChange={e => handleChange('cost', e.target.value)} className="form-input" placeholder="0" />
            </div>
            <div className="form-group">
              <label className="form-label">Thali Count:</label>
              <input type="number" value={form.thaliCount} onChange={e => handleChange('thaliCount', e.target.value)} className="form-input" placeholder="0" />
            </div>
            <div className="form-group">
              <label className="form-label">Rating (1-5):</label>
              <select value={form.rating} onChange={e => handleChange('rating', e.target.value)} className="form-select">
                <option value="5">5 - Outstanding</option>
                <option value="4">4 - Very Good</option>
                <option value="3">3 - Average</option>
                <option value="2">2 - Below Average</option>
                <option value="1">1 - Poor</option>
              </select>
            </div>
          </div>
          <div className="mt-5">
            <button type="submit" className="btn btn-info"><Plus size={14} /> Add Menu</button>
          </div>
        </form>
      </div>

      {/* Report / List */}
      <FilterPanel fields={filterFields} onFilter={handleFilter} submitLabel="Filter Records" />
      <div className="flex flex-wrap gap-6 mb-4 text-sm bg-white p-3 rounded-lg shadow-sm border border-gray-100">
        <span>Total Cost: <strong className="text-blue-600">₹{totalCost.toLocaleString('en-IN')}</strong></span>
        <span>Total Thalis: <strong className="text-emerald-600">{totalThalis}</strong></span>
        <span>Avg Rating: <strong className="text-amber-600">{avgRating} ⭐</strong></span>
      </div>
      <DataTable columns={columns} data={filtered} title="Menu_Records" />
    </div>
  )
}
