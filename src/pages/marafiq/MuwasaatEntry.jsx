import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { showToast } from '../../components/ui/Toast'
import { Heart } from 'lucide-react'

export default function MuwasaatEntry() {
  const { members, addMuwasaat } = useData()
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    by: 'Mohd Hussain bhai Rangwala',
    issuedTo: '',
    itsId: '',
    forPurpose: '',
    amount: '',
    mode: 'Cash',
    chequeNo: '',
    chequeName: ''
  })

  const handleChange = (key, value) => {
    setForm(prev => {
      const next = { ...prev, [key]: value }
      if (key === 'itsId') {
        const found = members.find(m => m.itsId === value)
        next.issuedTo = found ? found.name : ''
      }
      return next
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.issuedTo || !form.amount) { showToast('Please fill required fields', 'error'); return }
    addMuwasaat({
      ...form,
      amount: Number(form.amount),
      code: `MW-${Date.now().toString().slice(-6)}`,
      status: 'Completed'
    })
    showToast('Muwasaat entry saved successfully!', 'success')
    setForm(prev => ({
      ...prev,
      issuedTo: '', itsId: '', forPurpose: '', amount: '', chequeNo: '', chequeName: ''
    }))
  }

  return (
    <div>
      <h2 className="page-header"><Heart size={22} /> Muwasaat Entry</h2>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
            <div className="form-group"><label className="form-label">Date:</label><input type="date" value={form.date} onChange={e => handleChange('date', e.target.value)} className="form-input" /></div>
            <div className="form-group"><label className="form-label">By:</label><input type="text" value={form.by} readOnly className="form-input bg-gray-50" /></div>
            <div className="form-group"><label className="form-label">ITS ID:</label><input type="text" value={form.itsId} onChange={e => handleChange('itsId', e.target.value)} className="form-input" placeholder="Search by ITS" /></div>
            <div className="form-group"><label className="form-label">Issued To *:</label><input type="text" value={form.issuedTo} onChange={e => handleChange('issuedTo', e.target.value)} className="form-input" required /></div>
            <div className="form-group"><label className="form-label">For Purpose *:</label><input type="text" value={form.forPurpose} onChange={e => handleChange('forPurpose', e.target.value)} className="form-input" required /></div>
            <div className="form-group"><label className="form-label">Amount *:</label><input type="number" value={form.amount} onChange={e => handleChange('amount', e.target.value)} className="form-input" required /></div>
            <div className="form-group"><label className="form-label">Mode:</label><select value={form.mode} onChange={e => handleChange('mode', e.target.value)} className="form-select"><option value="Cash">Cash</option><option value="Cheque">Cheque</option><option value="Bank Transfer">Bank Transfer</option></select></div>
            {form.mode === 'Cheque' && (
              <>
                <div className="form-group"><label className="form-label">Cheque No:</label><input type="text" value={form.chequeNo} onChange={e => handleChange('chequeNo', e.target.value)} className="form-input" /></div>
                <div className="form-group"><label className="form-label">Bank Name:</label><input type="text" value={form.chequeName} onChange={e => handleChange('chequeName', e.target.value)} className="form-input" /></div>
              </>
            )}
          </div>
          <div className="mt-6"><button type="submit" className="btn btn-info px-8 py-2.5">Save Entry</button></div>
        </form>
      </div>
    </div>
  )
}
