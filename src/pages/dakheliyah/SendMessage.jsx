import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { Send, MessageSquare, Users, Filter, CheckCircle2, PhoneCall, Sparkles, Mail, FileText } from 'lucide-react'

export default function SendMessage() {
  const { dropdownOptions, addMessage } = useData()
  const [form, setForm] = useState({
    to: 'All Members',
    location: '',
    type: 'WhatsApp',
    message: ''
  })

  const [toast, setToast] = useState(false)

  const handleChange = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.message.trim()) {
      alert('Please enter message text to broadcast.')
      return
    }

    addMessage({
      date: new Date().toISOString().split('T')[0],
      to: form.location ? `${form.to} (${form.location})` : form.to,
      message: form.message,
      type: form.type,
      status: 'Delivered',
      sentBy: 'Admin',
      recipients: form.to === 'All Members' ? 450 : form.to === 'HOF Only' ? 180 : 35
    })

    setToast(`Broadcast message queued & sent via ${form.type}!`)
    setTimeout(() => setToast(false), 3500)

    setForm(prev => ({ ...prev, message: '' }))
  }

  const recipientCount = form.to === 'All Members' ? 450 : form.to === 'HOF Only' ? 180 : 35

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2.5">
            <Send className="text-emerald-600" size={26} />
            Broadcast Messaging Center
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Send instant WhatsApp, SMS, and Email announcements to Jamaat members and HOFs
          </p>
        </div>
      </div>

      {toast && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center gap-3 shadow-sm">
          <CheckCircle2 size={22} className="text-emerald-600 shrink-0" />
          <p className="text-xs font-semibold">{toast}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Send Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5 text-xs">
          <h2 className="text-sm font-bold text-slate-800 border-b pb-2 flex items-center gap-2">
            <MessageSquare size={16} className="text-emerald-600" />
            Compose Broadcast Message
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Send To (Audience) *</label>
              <select
                value={form.to}
                onChange={e => handleChange('to', e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-800"
              >
                <option value="All Members">All Jamaat Members (450+)</option>
                <option value="HOF Only">Head of Family (HOF Only)</option>
                <option value="Committee Members">Committee & Masoolaat</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Mohalla Location Filter</label>
              <select
                value={form.location}
                onChange={e => handleChange('location', e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
              >
                <option value="">All Mohallas</option>
                {(dropdownOptions?.mohallas || ['Saifee Mohalla', 'Najmi Mohalla', 'Fakhri Mohalla']).map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Messaging Channel *</label>
              <select
                value={form.type}
                onChange={e => handleChange('type', e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-emerald-700"
              >
                <option value="WhatsApp">WhatsApp Broadcast</option>
                <option value="SMS">SMS Gateway</option>
                <option value="Email">Email Announcement</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-slate-700">Message Content *</label>
              <span className="text-[11px] text-slate-400 font-mono">{form.message.length} characters</span>
            </div>
            <textarea
              required
              rows={6}
              value={form.message}
              onChange={e => handleChange('message', e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-xs focus:outline-none focus:border-emerald-500"
              placeholder="Type your official announcement or circular text here..."
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <span className="text-xs text-slate-500">
              Estimated Recipients: <strong className="text-emerald-600 font-mono">{recipientCount} Mumineen</strong>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setForm(prev => ({ ...prev, message: '' }))}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
              >
                Clear
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg shadow-sm transition-colors"
              >
                <Send size={14} />
                Send Broadcast Now
              </button>
            </div>
          </div>
        </form>

        {/* Live Message Preview */}
        <div className="bg-slate-900 text-white p-6 rounded-xl shadow-md space-y-4 border border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
              <MessageSquare size={14} />
              {form.type} Message Preview
            </h3>

            <div className="bg-slate-800/90 border border-emerald-900/60 p-4 rounded-xl space-y-2 shadow-inner">
              <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                <span className="text-xs font-bold text-emerald-300">Jamaat Official ({form.type})</span>
                <span className="text-[10px] text-slate-400">Just Now</span>
              </div>
              <p className="text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
                {form.message || 'Your message text will preview here as it will appear on recipient phones...'}
              </p>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-3">
            Channel: <strong className="text-emerald-400">{form.type}</strong> • Target: <strong className="text-white">{form.to}</strong>
          </div>
        </div>
      </div>
    </div>
  )
}
