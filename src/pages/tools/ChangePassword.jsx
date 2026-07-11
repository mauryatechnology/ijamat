import { useState } from 'react'
import { showToast } from '../../components/ui/Toast'
import { Key } from 'lucide-react'

export default function ChangePassword() {
  const [form, setForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' })

  const handleChange = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.oldPassword !== 'hamid@123') {
      showToast('Old password is incorrect', 'error'); return
    }
    if (form.newPassword.length < 6) {
      showToast('New password must be at least 6 characters', 'error'); return
    }
    if (form.newPassword !== form.confirmPassword) {
      showToast('Passwords do not match', 'error'); return
    }
    showToast('Password changed successfully!', 'success')
    setForm({ oldPassword: '', newPassword: '', confirmPassword: '' })
  }

  return (
    <div>
      <h2 className="page-header"><Key size={22} /> Change Password</h2>
      <div className="card max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label className="form-label">Old Password:</label>
            <input type="password" value={form.oldPassword} onChange={e => handleChange('oldPassword', e.target.value)} className="form-input" required />
          </div>
          <div className="form-group">
            <label className="form-label">New Password:</label>
            <input type="password" value={form.newPassword} onChange={e => handleChange('newPassword', e.target.value)} className="form-input" required />
          </div>
          <div className="form-group">
            <label className="form-label">Re-type New Password:</label>
            <input type="password" value={form.confirmPassword} onChange={e => handleChange('confirmPassword', e.target.value)} className="form-input" required />
          </div>
          <button type="submit" className="btn btn-info px-8 py-2.5">Change Password</button>
        </form>
      </div>
    </div>
  )
}
