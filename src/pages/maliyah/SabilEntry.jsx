import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { showToast } from '../../components/ui/Toast'
import { CreditCard } from 'lucide-react'

export default function SabilEntry() {
  const { dropdownOptions, members, addSabil } = useData()
  const [form, setForm] = useState({
    sabilNo: '', itsId: '', name: '', type: 'Regular', mohalla: '', sector: 'Mohammedi',
    takhmeen: '', openingBalance: '0', startDate: new Date().toISOString().split('T')[0]
  })

  const handleChange = (key, value) => {
    setForm(prev => {
      const next = { ...prev, [key]: value }
      if (key === 'itsId') {
        const found = members.find(m => m.itsId === value)
        if (found) { next.name = found.name; next.mohalla = found.mohalla }
      }
      return next
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.sabilNo || !form.name) { showToast('Please fill required fields', 'error'); return }
    addSabil({ ...form, takhmeen: Number(form.takhmeen), openingBalance: Number(form.openingBalance), status: 'Active' })
    showToast('Sabil entry created!', 'success')
    setForm(prev => ({ ...prev, sabilNo: '', itsId: '', name: '', takhmeen: '', openingBalance: '0' }))
  }

  return (
    <div>
      <h2 className="page-header"><CreditCard size={22} /> Sabil Entry</h2>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
            <div className="form-group"><label className="form-label">Sabil No.:</label><input type="text" value={form.sabilNo} onChange={e => handleChange('sabilNo', e.target.value)} className="form-input" /></div>
            <div className="form-group"><label className="form-label">ITS ID:</label><input type="text" value={form.itsId} onChange={e => handleChange('itsId', e.target.value)} className="form-input" /></div>
            <div className="form-group"><label className="form-label">Name:</label><input type="text" value={form.name} onChange={e => handleChange('name', e.target.value)} className="form-input" /></div>
            <div className="form-group"><label className="form-label">Type:</label><select value={form.type} onChange={e => handleChange('type', e.target.value)} className="form-select">{dropdownOptions.sabilTypes.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
            <div className="form-group"><label className="form-label">Mohalla:</label><select value={form.mohalla} onChange={e => handleChange('mohalla', e.target.value)} className="form-select"><option value="">Select</option>{dropdownOptions.mohallas.map(m => <option key={m} value={m}>{m}</option>)}</select></div>
            <div className="form-group"><label className="form-label">Takhmeen:</label><input type="number" value={form.takhmeen} onChange={e => handleChange('takhmeen', e.target.value)} className="form-input" placeholder="0" /></div>
            <div className="form-group"><label className="form-label">Opening Balance:</label><input type="number" value={form.openingBalance} onChange={e => handleChange('openingBalance', e.target.value)} className="form-input" /></div>
            <div className="form-group"><label className="form-label">Start Date:</label><input type="date" value={form.startDate} onChange={e => handleChange('startDate', e.target.value)} className="form-input" /></div>
          </div>
          <div className="mt-6"><button type="submit" className="btn btn-info px-8 py-2.5">Save Sabil</button></div>
        </form>
      </div>
    </div>
  )
}
