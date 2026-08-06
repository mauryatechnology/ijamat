import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { showToast } from '../../components/ui/Toast'
import { FileText } from 'lucide-react'

export default function VoucherEntry() {
  const { dropdownOptions, addVoucher } = useData()
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    narration: '', debitAccount: '', creditAccount: '', amount: '', type: 'Journal'
  })

  const handleChange = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.narration || !form.amount || !form.debitAccount || !form.creditAccount) {
      showToast('Please fill all required fields', 'error'); return
    }
    addVoucher({ ...form, amount: Number(form.amount), voucherNo: `JV-${Date.now().toString().slice(-6)}` })
    showToast('Voucher saved successfully!', 'success')
    setForm(prev => ({ ...prev, narration: '', debitAccount: '', creditAccount: '', amount: '' }))
  }

  return (
    <div>
      <h2 className="page-header"><FileText size={22} /> Voucher Entry</h2>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div className="form-group">
              <label className="form-label">Date:</label>
              <input type="date" value={form.date} onChange={e => handleChange('date', e.target.value)} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Type:</label>
              <select value={form.type} onChange={e => handleChange('type', e.target.value)} className="form-select">
                <option value="Journal">Journal</option><option value="Receipt">Receipt</option><option value="Payment">Payment</option>
              </select>
            </div>
            <div className="form-group md:col-span-2">
              <label className="form-label">Narration:</label>
              <input type="text" value={form.narration} onChange={e => handleChange('narration', e.target.value)} className="form-input" placeholder="Enter narration..." />
            </div>
            <div className="form-group">
              <label className="form-label">Debit Account:</label>
              <select value={form.debitAccount} onChange={e => handleChange('debitAccount', e.target.value)} className="form-select">
                <option value="">Select Account</option>
                {dropdownOptions.accountHeads.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Credit Account:</label>
              <select value={form.creditAccount} onChange={e => handleChange('creditAccount', e.target.value)} className="form-select">
                <option value="">Select Account</option>
                {dropdownOptions.accountHeads.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Amount:</label>
              <input type="number" value={form.amount} onChange={e => handleChange('amount', e.target.value)} className="form-input" placeholder="0" />
            </div>
          </div>
          <div className="mt-6">
            <button type="submit" className="btn btn-info px-8 py-2.5">Submit Voucher</button>
          </div>
        </form>
      </div>
    </div>
  )
}
