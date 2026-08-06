import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { showToast } from '../../components/ui/Toast'
import DataTable from '../../components/ui/DataTable'
import { Heart, Plus } from 'lucide-react'

export default function DoctorsDirectory() {
  const { doctors, addDoctor } = useData()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    code: '', name: '', qualification: '', specialization: '',
    otherDetails: '', availableOn: '', priority: '', phone: ''
  })

  const handleChange = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.specialization) { showToast('Name and Specialization required', 'error'); return }
    addDoctor({ ...form, code: `D${String(doctors.length + 1).padStart(3, '0')}`, priority: Number(form.priority) || doctors.length + 1 })
    showToast('Doctor added successfully!', 'success')
    setForm({ code: '', name: '', qualification: '', specialization: '', otherDetails: '', availableOn: '', priority: '', phone: '' })
    setShowForm(false)
  }

  const columns = [
    { key: 'action', label: 'Action', sortable: false, filterable: false, render: () => (
      <button className="btn btn-primary text-xs py-1 px-2">Edit</button>
    )},
    { key: 'code', label: 'Code' },
    { key: 'name', label: 'Doctor Name' },
    { key: 'qualification', label: 'Qualification' },
    { key: 'specialization', label: 'Specialization' },
    { key: 'otherDetails', label: 'Other Details' },
    { key: 'availableOn', label: 'Available on Every' },
    { key: 'phone', label: 'Phone' },
    { key: 'priority', label: 'Priority' }
  ]

  return (
    <div>
      <h2 className="page-header"><Heart size={22} /> Doctors Directory</h2>
      <div className="mb-4">
        <button onClick={() => setShowForm(!showForm)} className="btn btn-danger">
          <Plus size={14} /> Insert New Record
        </button>
      </div>

      {showForm && (
        <div className="card mb-4">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
              <div className="form-group"><label className="form-label">Doctor Name *:</label><input type="text" value={form.name} onChange={e => handleChange('name', e.target.value)} className="form-input" required /></div>
              <div className="form-group"><label className="form-label">Qualification:</label><input type="text" value={form.qualification} onChange={e => handleChange('qualification', e.target.value)} className="form-input" /></div>
              <div className="form-group"><label className="form-label">Specialization *:</label><input type="text" value={form.specialization} onChange={e => handleChange('specialization', e.target.value)} className="form-input" required /></div>
              <div className="form-group"><label className="form-label">Other Details:</label><input type="text" value={form.otherDetails} onChange={e => handleChange('otherDetails', e.target.value)} className="form-input" /></div>
              <div className="form-group"><label className="form-label">Available On:</label><input type="text" value={form.availableOn} onChange={e => handleChange('availableOn', e.target.value)} className="form-input" placeholder="Monday, Wednesday" /></div>
              <div className="form-group"><label className="form-label">Phone:</label><input type="tel" value={form.phone} onChange={e => handleChange('phone', e.target.value)} className="form-input" /></div>
            </div>
            <div className="mt-4 flex gap-3">
              <button type="submit" className="btn btn-info">Save</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn bg-gray-200 text-gray-700">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <DataTable columns={columns} data={doctors} title="Doctors_Directory" />
    </div>
  )
}
