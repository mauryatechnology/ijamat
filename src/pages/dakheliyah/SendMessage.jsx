import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { showToast } from '../../components/ui/Toast'
import { Send } from 'lucide-react'

export default function SendMessage() {
  const { dropdownOptions, addMessage } = useData()
  const [form, setForm] = useState({
    to: 'All Members', location: '', type: 'WhatsApp', message: ''
  })

  const handleChange = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.message) { showToast('Please enter a message', 'error'); return }
    addMessage({
      date: new Date().toISOString().split('T')[0],
      to: form.location || form.to,
      message: form.message,
      type: form.type,
      status: 'Delivered',
      sentBy: 'Admin',
      recipients: form.to === 'All Members' ? 42 : 10
    })
    showToast(`Message sent via ${form.type}!`, 'success')
    setForm(prev => ({ ...prev, message: '' }))
  }

  return (
    <div>
      <h2 className="page-header"><Send size={22} /> Send Message to All</h2>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
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
            <div className="form-group md:col-span-2 lg:col-span-3">
              <label className="form-label">Message:</label>
              <textarea
                value={form.message}
                onChange={e => handleChange('message', e.target.value)}
                className="form-input min-h-[120px] resize-y"
                placeholder="Type your message here..."
              />
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <button type="submit" className="btn btn-info px-8 py-2.5"><Send size={14} /> Send Message</button>
            <button type="button" onClick={() => setForm(prev => ({ ...prev, message: '' }))} className="btn bg-gray-200 text-gray-700 hover:bg-gray-300">Clear</button>
          </div>
        </form>
      </div>
    </div>
  )
}
