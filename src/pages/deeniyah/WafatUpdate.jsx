import { useState } from 'react'
import { showToast } from '../../components/ui/Toast'
import { ClipboardList } from 'lucide-react'
import { useData } from '../../context/DataContext'

export default function WafatUpdate() {
  const { members } = useData()
  const [form, setForm] = useState({ itsId: '', name: '', date: '', details: '' })

  const handleChange = (key, value) => {
    setForm(prev => {
      const next = { ...prev, [key]: value }
      if (key === 'itsId') {
        const found = members.find(m => m.itsId === value)
        next.name = found ? found.name : ''
      }
      return next
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.itsId || !form.date) { showToast('Please fill required fields', 'error'); return }
    showToast('Wafat update saved successfully', 'success')
    setForm({ itsId: '', name: '', date: '', details: '' })
  }

  return (
    <div>
      <h2 className="page-header"><ClipboardList size={22} /> Wafat Update</h2>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div className="form-group"><label className="form-label">ITS ID:</label><input type="text" value={form.itsId} onChange={e => handleChange('itsId', e.target.value)} className="form-input" /></div>
            <div className="form-group"><label className="form-label">Name:</label><input type="text" value={form.name} readOnly className="form-input bg-gray-50" /></div>
            <div className="form-group"><label className="form-label">Date of Wafat:</label><input type="date" value={form.date} onChange={e => handleChange('date', e.target.value)} className="form-input" /></div>
            <div className="form-group"><label className="form-label">Details:</label><textarea value={form.details} onChange={e => handleChange('details', e.target.value)} className="form-input min-h-[80px]" /></div>
          </div>
          <div className="mt-6"><button type="submit" className="btn btn-info px-8 py-2.5">Save Update</button></div>
        </form>
      </div>
    </div>
  )
}
