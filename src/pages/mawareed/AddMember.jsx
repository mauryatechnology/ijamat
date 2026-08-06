import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { showToast } from '../../components/ui/Toast'
import { UserPlus } from 'lucide-react'

export default function AddMember() {
  const { dropdownOptions, addMember } = useData()
  const [form, setForm] = useState({
    itsId: '', name: '', mobile: '', whatsapp: '', email: '',
    gender: 'M', age: '', bloodGroup: '', maritalStatus: 'Single',
    occupation: '', qualification: '', address: '', mohalla: '', sector: 'Mohammedi',
    hofOrFm: 'HOF', sabilNo: ''
  })

  const handleChange = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.itsId || !form.name) { showToast('ITS ID and Name are required', 'error'); return }
    addMember({ ...form, age: Number(form.age), misaaq: form.maritalStatus, photo: null, isActive: true })
    showToast('Member added successfully!', 'success')
    setForm({
      itsId: '', name: '', mobile: '', whatsapp: '', email: '',
      gender: 'M', age: '', bloodGroup: '', maritalStatus: 'Single',
      occupation: '', qualification: '', address: '', mohalla: '', sector: 'Mohammedi',
      hofOrFm: 'HOF', sabilNo: ''
    })
  }

  return (
    <div>
      <h2 className="page-header"><UserPlus size={22} /> Add Member</h2>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
            <div className="form-group"><label className="form-label">ITS ID *:</label><input type="text" value={form.itsId} onChange={e => handleChange('itsId', e.target.value)} className="form-input" required /></div>
            <div className="form-group"><label className="form-label">Full Name *:</label><input type="text" value={form.name} onChange={e => handleChange('name', e.target.value)} className="form-input" required /></div>
            <div className="form-group"><label className="form-label">Sabil No.:</label><input type="text" value={form.sabilNo} onChange={e => handleChange('sabilNo', e.target.value)} className="form-input" /></div>
            <div className="form-group"><label className="form-label">Mobile:</label><input type="tel" value={form.mobile} onChange={e => handleChange('mobile', e.target.value)} className="form-input" /></div>
            <div className="form-group"><label className="form-label">WhatsApp:</label><input type="tel" value={form.whatsapp} onChange={e => handleChange('whatsapp', e.target.value)} className="form-input" /></div>
            <div className="form-group"><label className="form-label">Email:</label><input type="email" value={form.email} onChange={e => handleChange('email', e.target.value)} className="form-input" /></div>
            <div className="form-group"><label className="form-label">Gender:</label><select value={form.gender} onChange={e => handleChange('gender', e.target.value)} className="form-select"><option value="M">Male</option><option value="F">Female</option></select></div>
            <div className="form-group"><label className="form-label">Age:</label><input type="number" value={form.age} onChange={e => handleChange('age', e.target.value)} className="form-input" /></div>
            <div className="form-group"><label className="form-label">Blood Group:</label><select value={form.bloodGroup} onChange={e => handleChange('bloodGroup', e.target.value)} className="form-select"><option value="">Select</option>{dropdownOptions.bloodGroups.map(b => <option key={b} value={b}>{b}</option>)}</select></div>
            <div className="form-group"><label className="form-label">Marital Status:</label><select value={form.maritalStatus} onChange={e => handleChange('maritalStatus', e.target.value)} className="form-select">{dropdownOptions.maritalStatuses.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
            <div className="form-group"><label className="form-label">HOF/FM:</label><select value={form.hofOrFm} onChange={e => handleChange('hofOrFm', e.target.value)} className="form-select">{dropdownOptions.hofFm.map(h => <option key={h} value={h}>{h}</option>)}</select></div>
            <div className="form-group"><label className="form-label">Mohalla:</label><select value={form.mohalla} onChange={e => handleChange('mohalla', e.target.value)} className="form-select"><option value="">Select</option>{dropdownOptions.mohallas.map(m => <option key={m} value={m}>{m}</option>)}</select></div>
            <div className="form-group"><label className="form-label">Occupation:</label><input type="text" value={form.occupation} onChange={e => handleChange('occupation', e.target.value)} className="form-input" /></div>
            <div className="form-group"><label className="form-label">Qualification:</label><input type="text" value={form.qualification} onChange={e => handleChange('qualification', e.target.value)} className="form-input" /></div>
            <div className="form-group lg:col-span-2"><label className="form-label">Address:</label><input type="text" value={form.address} onChange={e => handleChange('address', e.target.value)} className="form-input" /></div>
          </div>
          <div className="mt-6"><button type="submit" className="btn btn-info px-8 py-2.5">Add Member</button></div>
        </form>
      </div>
    </div>
  )
}
