import { useState } from 'react'
import { useData } from '../context/DataContext'
import { showToast } from '../components/ui/Toast'
import FilterPanel from '../components/ui/FilterPanel'
import DataTable from '../components/ui/DataTable'
import { MessageSquare, Send } from 'lucide-react'

export default function Messages() {
  const { dropdownOptions, messages, addMessage } = useData()
  const [filtered, setFiltered] = useState(messages)

  // Form State
  const [form, setForm] = useState({
    to: 'All Members', location: '', type: 'WhatsApp', message: ''
  })

  // Filter Configuration
  const filterFields = [
    { key: 'fromDate', label: 'From Date', type: 'date' },
    { key: 'toDate', label: 'To Date', type: 'date' },
    { key: 'type', label: 'Type', type: 'select', options: ['SMS', 'WhatsApp'] }
  ]

  const handleFilter = (values) => {
    let result = [...messages]
    if (values.fromDate) result = result.filter(m => m.date >= values.fromDate)
    if (values.toDate) result = result.filter(m => m.date <= values.toDate)
    if (values.type) result = result.filter(m => m.type === values.type)
    setFiltered(result)
  }

  // Form Handling
  const handleChange = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.message) { showToast('Please enter a message', 'error'); return }
    
    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      to: form.location || form.to,
      message: form.message,
      type: form.type,
      status: 'Delivered',
      sentBy: 'Admin',
      recipients: form.to === 'All Members' ? 42 : 10
    }

    addMessage(newEntry)
    setFiltered(prev => [newEntry, ...prev])
    
    showToast(`Message sent via ${form.type}!`, 'success')
    setForm(prev => ({ ...prev, message: '' }))
  }

  // Table Columns
  const columns = [
    { key: 'date', label: 'Date' },
    { key: 'to', label: 'Sent To' },
    { key: 'type', label: 'Type', render: v => <span className={`badge ${v === 'WhatsApp' ? 'badge-success' : 'badge-info'}`}>{v}</span> },
    { key: 'message', label: 'Message', render: v => <span className="text-xs line-clamp-2">{v}</span> },
    { key: 'recipients', label: 'Recipients' },
    { key: 'status', label: 'Status', render: v => <span className={`badge ${v === 'Delivered' ? 'badge-success' : 'badge-danger'}`}>{v}</span> },
    { key: 'sentBy', label: 'Sent By' }
  ]

  return (
    <div>
      <h2 className="page-header"><MessageSquare size={22} /> Messaging Center</h2>
      
      {/* Compose Form */}
      <div className="card mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-4 border-b pb-2">Compose Broadcast</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
            <div className="form-group">
              <label className="form-label">Send To:</label>
              <select value={form.to} onChange={e => handleChange('to', e.target.value)} className="form-select">
                <option value="All Members">All Members</option>
                <option value="HOF Only">HOF Only</option>
                <option value="Committee Members">Committee Members</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Location Filter:</label>
              <select value={form.location} onChange={e => handleChange('location', e.target.value)} className="form-select">
                <option value="">All Locations</option>
                {dropdownOptions.mohallas.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Type:</label>
              <select value={form.type} onChange={e => handleChange('type', e.target.value)} className="form-select">
                {dropdownOptions.messageTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-group md:col-span-3">
              <label className="form-label">Message:</label>
              <textarea
                value={form.message}
                onChange={e => handleChange('message', e.target.value)}
                className="form-input min-h-[100px] resize-y"
                placeholder="Type your message here..."
              />
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <button type="submit" className="btn btn-info px-6"><Send size={14} /> Send Message</button>
            <button type="button" onClick={() => setForm(prev => ({ ...prev, message: '' }))} className="btn bg-gray-200 text-gray-700 hover:bg-gray-300">Clear</button>
          </div>
        </form>
      </div>

      {/* Report / List */}
      <FilterPanel fields={filterFields} onFilter={handleFilter} submitLabel="Filter History" />
      <DataTable columns={columns} data={filtered} title="Message_History" showColumnToggle />
    </div>
  )
}
