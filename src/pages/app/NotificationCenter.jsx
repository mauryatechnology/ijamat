import { useState } from 'react'
import { Send, Bell, CheckCircle2, History, Users, Layers, AlertCircle } from 'lucide-react'

export default function NotificationCenter() {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [targetAudience, setTargetAudience] = useState('All Mumineen')
  const [category, setCategory] = useState('Miqaat & Religious')
  const [sentLog, setSentLog] = useState([
    { id: 1, title: 'Ashara Mubaraka Miqaat Announcement', category: 'Miqaat & Religious', audience: 'All Mumineen', count: 450, time: 'Today, 09:30 AM', status: 'Sent' },
    { id: 2, title: 'FMB Menu Update - Wednesday Niyaz', category: 'FMB Thali', audience: 'All Mumineen', count: 420, time: 'Yesterday, 04:00 PM', status: 'Sent' },
    { id: 3, title: 'Urgent Masool Meeting at Dar-ul-Imarat', category: 'Emergency Alert', audience: 'Masoolaat & Masool', count: 25, time: '3 days ago', status: 'Sent' }
  ])
  const [toast, setToast] = useState(false)

  const handleSend = (e) => {
    e.preventDefault()
    if (!title || !message) {
      alert('Please enter title and message content.')
      return
    }

    const newBroadcast = {
      id: Date.now(),
      title,
      category,
      audience: targetAudience,
      count: targetAudience === 'All Mumineen' ? 450 : 120,
      time: 'Just Now',
      status: 'Sent'
    }

    setSentLog([newBroadcast, ...sentLog])
    setToast(true)
    setTimeout(() => setToast(false), 3500)

    setTitle('')
    setMessage('')
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2.5">
            <Bell className="text-purple-600" size={26} />
            Push Notification Broadcast Center
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Send instant mobile push alerts, Miqaat announcements, and emergency updates to Mumineen mobile apps
          </p>
        </div>
      </div>

      {toast && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center gap-3 shadow-sm">
          <CheckCircle2 size={22} className="text-emerald-600 shrink-0" />
          <p className="text-xs font-semibold">Push notification broadcast successfully delivered to target devices!</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Broadcast Form */}
        <form onSubmit={handleSend} className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 text-xs">
          <h2 className="text-sm font-bold text-slate-800 border-b pb-2 flex items-center gap-2">
            <Send size={16} className="text-purple-600" />
            Compose Broadcast Push Alert
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Target Audience *</label>
              <select
                value={targetAudience}
                onChange={e => setTargetAudience(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-medium"
              >
                <option value="All Mumineen">All Registered Mumineen (450+ Users)</option>
                <option value="Head of Family (HOF)">Head of Family (HOF Only)</option>
                <option value="Masool & Musaeed">Masoolaat & Musaeed Hierarchy</option>
                <option value="Saifee Mohalla">Saifee Mohalla Residents</option>
                <option value="Najmi Mohalla">Najmi Mohalla Residents</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Notification Category *</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-medium"
              >
                <option value="Miqaat & Religious">Miqaat & Religious Announcement</option>
                <option value="FMB Thali">FMB Thali & Menu Update</option>
                <option value="Emergency Alert">Emergency / Urgent Alert</option>
                <option value="General Announcement">General Jamaat Announcement</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Notification Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Subah Fajr Namaaz & Majlis Announcement..."
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Message Body *</label>
            <textarea
              required
              rows={4}
              placeholder="Enter message text that will be displayed on Mumineen mobile lock screens..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
            />
          </div>

          <div className="flex items-center justify-end pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs rounded-lg shadow-sm transition-colors"
            >
              <Send size={15} />
              Broadcast Push Alert
            </button>
          </div>
        </form>

        {/* Device Preview Card */}
        <div className="bg-slate-900 text-white p-6 rounded-xl shadow-md space-y-4 border border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-3 flex items-center gap-2">
              <Bell size={14} />
              Mobile Lockscreen Notification Preview
            </h3>

            <div className="bg-slate-800/90 border border-slate-700 p-4 rounded-xl space-y-2 shadow-inner">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center text-[10px] font-bold">J</div>
                  <span className="text-[11px] font-bold text-purple-300">Jamaat Mobile App</span>
                </div>
                <span className="text-[10px] text-slate-400">Now</span>
              </div>
              <p className="font-bold text-xs text-white">{title || 'Sample Broadcast Title'}</p>
              <p className="text-xs text-slate-300 line-clamp-3">{message || 'Your broadcast message preview will appear here on Mumineen smartphone screens...'}</p>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-3">
            Target Devices: <strong className="text-white">{targetAudience}</strong>
          </div>
        </div>
      </div>

      {/* Broadcast History Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-5 space-y-4">
        <h3 className="text-sm font-bold text-slate-800 border-b pb-2 flex items-center gap-2">
          <History size={16} className="text-purple-600" />
          Recent Broadcast History Log
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-100">
              <tr>
                <th className="py-2.5 px-3">Title</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Audience</th>
                <th className="py-2.5 px-3">Recipients</th>
                <th className="py-2.5 px-3">Sent Time</th>
                <th className="py-2.5 px-3 text-right">Delivery Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {sentLog.map(log => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-slate-900">{log.title}</td>
                  <td className="py-2.5 px-3 font-medium text-slate-600">{log.category}</td>
                  <td className="py-2.5 px-3 text-slate-600">{log.audience}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-purple-600">{log.count} Devices</td>
                  <td className="py-2.5 px-3 font-mono text-slate-400">{log.time}</td>
                  <td className="py-2.5 px-3 text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
