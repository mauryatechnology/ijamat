import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { showToast } from '../../components/ui/Toast'
import DataTable from '../../components/ui/DataTable'
import { CreditCard, Plus } from 'lucide-react'
import { formatCurrency } from '../../utils/formatters'

export default function Sabil() {
  const { dropdownOptions, members, sabil, addSabil } = useData()
  const [filtered, setFiltered] = useState(sabil)
  
  // Form State
  const [form, setForm] = useState({
    sabilNo: '', itsId: '', name: '', type: 'Regular', mohalla: '', sector: 'Mohammedi',
    takhmeen: '', openingBalance: '0', startDate: new Date().toISOString().split('T')[0]
  })

  // Form Handling
  const handleChange = (key, value) => {
    setForm(prev => {
      const next = { ...prev, [key]: value }
      if (key === 'itsId') {
        const found = members.find(m => m.itsId === value)
        if (found) { 
          next.name = found.name
          next.mohalla = found.mohalla 
        }
      }
      return next
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.sabilNo || !form.name) { showToast('Please fill required fields', 'error'); return }
    
    const newEntry = { 
      id: Date.now(),
      ...form, 
      takhmeen: Number(form.takhmeen), 
      openingBalance: Number(form.openingBalance), 
      status: 'Active' 
    }
    
    addSabil(newEntry)
    setFiltered(prev => [newEntry, ...prev])
    
    showToast('Sabil entry created!', 'success')
    setForm(prev => ({ ...prev, sabilNo: '', itsId: '', name: '', takhmeen: '', openingBalance: '0' }))
  }

  // Table Columns
  const columns = [
    { key: 'sabilNo', label: 'Sabil No.' },
    { key: 'itsId', label: 'ITS ID' },
    { key: 'name', label: 'Name' },
    { key: 'type', label: 'Type' },
    { key: 'mohalla', label: 'Mohalla' },
    { key: 'takhmeen', label: 'Takhmeen', render: v => formatCurrency(v) },
    { key: 'openingBalance', label: 'Opening Bal.', render: v => formatCurrency(v) },
    { key: 'status', label: 'Status', render: v => <span className={`badge ${v === 'Active' ? 'badge-success' : 'badge-danger'}`}>{v}</span> },
    { key: 'startDate', label: 'Start Date' }
  ]

  return (
    <div>
      <h2 className="page-header"><CreditCard size={22} /> Sabil Management</h2>
      
      {/* Entry Form */}
      <div className="card mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-4 border-b pb-2">New Sabil Entry</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4">
            <div className="form-group">
              <label className="form-label">Sabil No.:</label>
              <input type="text" value={form.sabilNo} onChange={e => handleChange('sabilNo', e.target.value)} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">ITS ID:</label>
              <input type="text" value={form.itsId} onChange={e => handleChange('itsId', e.target.value)} className="form-input" placeholder="Auto-fills details" />
            </div>
            <div className="form-group">
              <label className="form-label">Name:</label>
              <input type="text" value={form.name} onChange={e => handleChange('name', e.target.value)} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Type:</label>
              <select value={form.type} onChange={e => handleChange('type', e.target.value)} className="form-select">
                {dropdownOptions.sabilTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Mohalla:</label>
              <select value={form.mohalla} onChange={e => handleChange('mohalla', e.target.value)} className="form-select">
                <option value="">Select</option>
                {dropdownOptions.mohallas.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Takhmeen (₹):</label>
              <input type="number" value={form.takhmeen} onChange={e => handleChange('takhmeen', e.target.value)} className="form-input" placeholder="0" />
            </div>
            <div className="form-group">
              <label className="form-label">Opening Balance (₹):</label>
              <input type="number" value={form.openingBalance} onChange={e => handleChange('openingBalance', e.target.value)} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Start Date:</label>
              <input type="date" value={form.startDate} onChange={e => handleChange('startDate', e.target.value)} className="form-input" />
            </div>
          </div>
          <div className="mt-5">
            <button type="submit" className="btn btn-info"><Plus size={14} /> Save Sabil</button>
          </div>
        </form>
      </div>

      {/* List */}
      <DataTable columns={columns} data={filtered} title="Sabil_Records" showColumnToggle />
    </div>
  )
}
