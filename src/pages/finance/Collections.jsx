import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { showToast } from '../../components/ui/Toast'
import FilterPanel from '../../components/ui/FilterPanel'
import DataTable from '../../components/ui/DataTable'
import { formatCurrency } from '../../utils/formatters'
import { Wallet, Plus } from 'lucide-react'

export default function Collections() {
  const { collections, dropdownOptions, members, addCollection } = useData()
  const [filtered, setFiltered] = useState(collections)
  
  // Form State
  const [form, setForm] = useState({
    head: 'Barkat-E-Burhaniyah', session: '2017-2018', collectedBy: '',
    rvType: 'VC', rvNo: '', date: new Date().toISOString().split('T')[0],
    sabilNo: '', name: '', amount: '', remarks: '',
    type: 'Receipt', mode: 'Cash', selectName: '', chequeNo: '', bank: ''
  })

  // Filter Configuration
  const filterFields = [
    { key: 'head', label: 'Collection Head', type: 'select', options: dropdownOptions.collectionHeads },
    { key: 'fromDate', label: 'From Date', type: 'date' },
    { key: 'toDate', label: 'To Date', type: 'date' },
    { key: 'mode', label: 'Mode', type: 'select', options: dropdownOptions.paymentModes },
    { key: 'collectedBy', label: 'Collected By', type: 'select', options: dropdownOptions.collectors }
  ]

  const handleFilter = (values) => {
    let result = [...collections]
    if (values.head) result = result.filter(c => c.head === values.head)
    if (values.fromDate) result = result.filter(c => c.date >= values.fromDate)
    if (values.toDate) result = result.filter(c => c.date <= values.toDate)
    if (values.mode) result = result.filter(c => c.mode === values.mode)
    if (values.collectedBy) result = result.filter(c => c.collectedBy === values.collectedBy)
    setFiltered(result)
  }

  // Form Handling
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
    
    const newEntry = {
      id: Date.now(),
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
    }

    addCollection(newEntry)
    setFiltered(prev => [newEntry, ...prev])
    
    showToast('Collection entry saved successfully!', 'success')
    setForm(prev => ({ ...prev, sabilNo: '', name: '', amount: '', remarks: '' }))
  }

  const totalAmount = filtered.reduce((sum, c) => sum + c.amount, 0)

  // Table Columns
  const columns = [
    { key: 'date', label: 'Date' },
    { key: 'receiptNo', label: 'Receipt No.' },
    { key: 'sabilNo', label: 'Sabil' },
    { key: 'name', label: 'Name' },
    { key: 'head', label: 'Head' },
    { key: 'amount', label: 'Amount', render: v => formatCurrency(v) },
    { key: 'mode', label: 'Mode' },
    { key: 'collectedBy', label: 'Collected By' },
    { key: 'remarks', label: 'Remarks' }
  ]

  return (
    <div>
      <h2 className="page-header"><Wallet size={22} /> Collections & Receipts</h2>
      
      {/* Entry Form */}
      <div className="card mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-4 border-b pb-2">New Collection Entry</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-4">
            <div className="form-group">
              <label className="form-label">Head:</label>
              <select value={form.head} onChange={e => handleChange('head', e.target.value)} className="form-select">
                {dropdownOptions.collectionHeads.map(h => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Date:</label>
              <input type="date" value={form.date} onChange={e => handleChange('date', e.target.value)} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Sabil No:</label>
              <input type="text" value={form.sabilNo} onChange={e => handleChange('sabilNo', e.target.value)} className="form-input" placeholder="Enter Sabil No." />
            </div>
            <div className="form-group">
              <label className="form-label">Name:</label>
              <span className={`mt-2 text-sm font-medium ${form.name === 'Not Found' ? 'text-red-500' : 'text-gray-700'}`}>
                {form.name || '—'}
              </span>
            </div>
            <div className="form-group">
              <label className="form-label">Amount (₹):</label>
              <input type="number" value={form.amount} onChange={e => handleChange('amount', e.target.value)} className="form-input" placeholder="0" />
            </div>
            <div className="form-group">
              <label className="form-label">Mode:</label>
              <select value={form.mode} onChange={e => handleChange('mode', e.target.value)} className="form-select">
                {dropdownOptions.paymentModes.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Collected By:</label>
              <select value={form.collectedBy} onChange={e => handleChange('collectedBy', e.target.value)} className="form-select">
                <option value="">Select...</option>
                {dropdownOptions.collectors.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Remarks:</label>
              <input type="text" value={form.remarks} onChange={e => handleChange('remarks', e.target.value)} className="form-input" />
            </div>
          </div>
          <div className="mt-5">
            <button type="submit" className="btn btn-info"><Plus size={14} /> Submit Entry</button>
          </div>
        </form>
      </div>

      {/* Report / List */}
      <FilterPanel fields={filterFields} onFilter={handleFilter} submitLabel="Filter Records" />
      <div className="mb-4 text-sm font-medium text-gray-600 bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex gap-4">
        <span>Total Collection: <strong className="text-emerald-600 text-lg">{formatCurrency(totalAmount)}</strong></span>
        <span>Records: <strong>{filtered.length}</strong></span>
      </div>
      <DataTable columns={columns} data={filtered} title="Collection_Report" showColumnToggle />
    </div>
  )
}
