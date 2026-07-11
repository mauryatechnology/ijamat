import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { showToast } from '../../components/ui/Toast'
import { CirclePlus } from 'lucide-react'

export default function DailyCollection() {
  const { dropdownOptions, members, addCollection } = useData()
  const [form, setForm] = useState({
    head: 'Barkat-E-Burhaniyah', session: '2017-2018', collectedBy: '',
    rvType: 'VC', rvNo: '', date: new Date().toISOString().split('T')[0],
    sabilNo: '', name: '', amount: '', remarks: '',
    type: 'Receipt', mode: 'Cash', selectName: '', chequeNo: '', bank: ''
  })

  const handleChange = (key, value) => {
    setForm(prev => {
      const next = { ...prev, [key]: value }
      if (key === 'sabilNo') {
        const found = members.find(m => m.sabilNo === value)
        next.name = found ? found.name : 'Not Found'
      }
      return next
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.sabilNo || !form.amount) {
      showToast('Please fill Sabil No. and Amount', 'error')
      return
    }
    addCollection({
      date: form.date,
      receiptNo: `${form.rvType}-${Date.now().toString().slice(-6)}`,
      sabilNo: form.sabilNo,
      name: form.name,
      head: form.head,
      amount: Number(form.amount),
      mode: form.mode,
      collectedBy: form.collectedBy,
      session: form.session,
      remarks: form.remarks
    })
    showToast('Collection entry saved successfully!', 'success')
    setForm(prev => ({ ...prev, sabilNo: '', name: '', amount: '', remarks: '' }))
  }

  return (
    <div>
      <h2 className="page-header"><CirclePlus size={22} /> Daily Collection Entry</h2>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
            <div className="form-group">
              <label className="form-label">Collection Head:</label>
              <select value={form.head} onChange={e => handleChange('head', e.target.value)} className="form-select">
                {dropdownOptions.collectionHeads.map(h => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Session:</label>
              <input type="text" value={form.session} readOnly className="form-input bg-gray-50" />
            </div>
            <div className="form-group">
              <label className="form-label">Collection By:</label>
              <select value={form.collectedBy} onChange={e => handleChange('collectedBy', e.target.value)} className="form-select">
                <option value="">Select...</option>
                {dropdownOptions.collectors.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">R/V No.:</label>
              <div className="flex gap-2">
                <select value={form.rvType} onChange={e => handleChange('rvType', e.target.value)} className="form-select w-24">
                  {dropdownOptions.rvTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <input type="text" value={form.rvNo} onChange={e => handleChange('rvNo', e.target.value)} className="form-input flex-1" placeholder="Auto" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">R.Date:</label>
              <input type="date" value={form.date} onChange={e => handleChange('date', e.target.value)} className="form-input" />
            </div>
            <div></div>
            <div className="form-group">
              <label className="form-label">Sabil:</label>
              <input type="text" value={form.sabilNo} onChange={e => handleChange('sabilNo', e.target.value)} className="form-input" placeholder="Enter Sabil No." />
            </div>
            <div className="form-group">
              <label className="form-label">Name:</label>
              <span className={`mt-2 text-sm font-medium ${form.name === 'Not Found' ? 'text-red-500' : 'text-gray-700'}`}>
                {form.name || '—'}
              </span>
            </div>
            <div></div>
            <div className="form-group">
              <label className="form-label">Amount:</label>
              <input type="number" value={form.amount} onChange={e => handleChange('amount', e.target.value)} className="form-input" placeholder="0" />
            </div>
            <div className="form-group">
              <label className="form-label">Remarks:</label>
              <input type="text" value={form.remarks} onChange={e => handleChange('remarks', e.target.value)} className="form-input" />
            </div>
            <div></div>
            <div className="form-group">
              <label className="form-label">Type:</label>
              <select value={form.type} onChange={e => handleChange('type', e.target.value)} className="form-select">
                <option value="Receipt">Receipt</option>
                <option value="Payment">Payment</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Mode:</label>
              <div className="flex gap-2">
                <select value={form.mode} onChange={e => handleChange('mode', e.target.value)} className="form-select flex-1">
                  {dropdownOptions.paymentModes.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                {form.mode === 'Cheque' && (
                  <input type="text" value={form.chequeNo} onChange={e => handleChange('chequeNo', e.target.value)} className="form-input w-32" placeholder="Cheque No." />
                )}
              </div>
            </div>
            <div></div>
            <div className="form-group">
              <label className="form-label">Select Name:</label>
              <select value={form.selectName} onChange={e => {
                handleChange('selectName', e.target.value)
                const member = members.find(m => m.name === e.target.value)
                if (member) handleChange('sabilNo', member.sabilNo)
              }} className="form-select">
                <option value="">Select from the list</option>
                {members.filter(m => m.hofOrFm === 'HOF').map(m => (
                  <option key={m.id} value={m.name}>{m.name} (Sabil: {m.sabilNo})</option>
                ))}
              </select>
            </div>
            {form.mode === 'Cheque' && (
              <>
                <div className="form-group">
                  <label className="form-label">Chq/DD:</label>
                  <input type="text" value={form.chequeNo} onChange={e => handleChange('chequeNo', e.target.value)} className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Bank:</label>
                  <select value={form.bank} onChange={e => handleChange('bank', e.target.value)} className="form-select">
                    <option value="">Select Bank</option>
                    {dropdownOptions.banks.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </>
            )}
          </div>
          <div className="mt-6">
            <button type="submit" className="btn btn-info px-8 py-2.5 text-base">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}
