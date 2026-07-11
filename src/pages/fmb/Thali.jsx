import { useState } from 'react'
import { useData } from '../../context/DataContext'
import FilterPanel from '../../components/ui/FilterPanel'
import DataTable from '../../components/ui/DataTable'
import { showToast } from '../../components/ui/Toast'
import { Utensils } from 'lucide-react'

export default function Thali() {
  const { thali, members, dropdownOptions, addThali } = useData()
  const [filtered, setFiltered] = useState(thali)
  const [form, setForm] = useState({
    thaliNo: '',
    sabilNo: '',
    itsId: '',
    name: '',
    size: 'Full',
    mohalla: dropdownOptions.mohallas[0],
    distributor: '',
    status: 'Active',
    startDate: new Date().toISOString().split('T')[0]
  })

  // Filter Panel Configuration
  const filterFields = [
    { key: 'mohalla', label: 'Location', type: 'select', options: dropdownOptions.mohallas },
    { key: 'status', label: 'Status', type: 'select', options: dropdownOptions.thaliStatuses },
    { key: 'size', label: 'Size', type: 'select', options: dropdownOptions.thaliSizes }
  ]

  const handleFilter = (values) => {
    let result = [...thali]
    if (values.mohalla) result = result.filter(t => t.mohalla === values.mohalla)
    if (values.status) result = result.filter(t => t.status === values.status)
    if (values.size) result = result.filter(t => t.size === values.size)
    setFiltered(result)
  }

  // Form Handling
  const handleChange = (key, value) => {
    setForm(prev => {
      const next = { ...prev, [key]: value }
      if (key === 'itsId') {
        const found = members.find(m => m.itsId === value)
        if (found) {
          next.name = found.name
          next.sabilNo = found.sabilNo
          next.mohalla = found.mohalla
        }
      }
      return next
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.thaliNo || !form.name) {
      showToast('Please fill required fields', 'error')
      return
    }
    
    // Optimistic update for local list
    const newEntry = { ...form, id: Date.now() }
    addThali(newEntry)
    setFiltered(prev => [newEntry, ...prev])
    
    showToast('Thali registered successfully!', 'success')
    setForm(prev => ({ ...prev, thaliNo: '', itsId: '', name: '', sabilNo: '' }))
  }

  // Table Columns
  const columns = [
    { key: 'thaliNo', label: 'Thali No.' },
    { key: 'sabilNo', label: 'Sabil' },
    { key: 'itsId', label: 'ITS ID' },
    { key: 'name', label: 'Name' },
    { key: 'size', label: 'Size' },
    { key: 'mohalla', label: 'Mohalla' },
    { key: 'distributor', label: 'Distributor' },
    { key: 'status', label: 'Status', render: v => <span className={`badge ${v === 'Active' ? 'badge-success' : 'badge-danger'}`}>{v}</span> },
    { key: 'startDate', label: 'Start Date' }
  ]

  return (
    <div>
      <h2 className="page-header"><Utensils size={22} /> FMB Thali</h2>
      
      {/* Entry Form */}
      <div className="card mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-4 border-b pb-2">Register New Thali</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-4">
            <div className="form-group">
              <label className="form-label">ITS ID:</label>
              <input type="text" value={form.itsId} onChange={e => handleChange('itsId', e.target.value)} className="form-input" placeholder="Auto-fills details" />
            </div>
            <div className="form-group">
              <label className="form-label">Name *:</label>
              <input type="text" value={form.name} onChange={e => handleChange('name', e.target.value)} className="form-input" required />
            </div>
            <div className="form-group">
              <label className="form-label">Thali No *:</label>
              <input type="text" value={form.thaliNo} onChange={e => handleChange('thaliNo', e.target.value)} className="form-input" required />
            </div>
            <div className="form-group">
              <label className="form-label">Sabil No:</label>
              <input type="text" value={form.sabilNo} onChange={e => handleChange('sabilNo', e.target.value)} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Size:</label>
              <select value={form.size} onChange={e => handleChange('size', e.target.value)} className="form-select">
                {dropdownOptions.thaliSizes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Mohalla:</label>
              <select value={form.mohalla} onChange={e => handleChange('mohalla', e.target.value)} className="form-select">
                {dropdownOptions.mohallas.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Status:</label>
              <select value={form.status} onChange={e => handleChange('status', e.target.value)} className="form-select">
                {dropdownOptions.thaliStatuses.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div className="mt-5">
            <button type="submit" className="btn btn-info">Register Thali</button>
          </div>
        </form>
      </div>

      {/* Report / List */}
      <FilterPanel fields={filterFields} onFilter={handleFilter} submitLabel="Filter Records" />
      <DataTable columns={columns} data={filtered} title="Thali_List" showColumnToggle />
    </div>
  )
}
