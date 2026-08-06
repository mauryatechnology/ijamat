import { useState } from 'react'
import { showToast } from '../../components/ui/Toast'

export default function NotificationCenter() {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')

  const handleSend = (e) => {
    e.preventDefault()
    showToast('Push Notification Broadcast Sent to All Mobile Users!')
    setTitle('')
    setMessage('')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Mobile App Push Notification Broadcast</h1>
        <p className="text-sm text-slate-500">Send instant alerts to Mumineen mobile applications</p>
      </div>

      <form onSubmit={handleSend} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm max-w-md text-xs space-y-4">
        <div>
          <label className="block font-semibold mb-1">Notification Title</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required placeholder="e.g. Miqaat Announcement..." className="w-full p-2 border rounded bg-slate-50" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Message Body</label>
          <textarea value={message} onChange={e => setMessage(e.target.value)} required placeholder="Enter broadcast message details..." className="w-full p-2 border rounded bg-slate-50 h-24" />
        </div>
        <button type="submit" className="w-full py-2 bg-purple-600 text-white font-semibold rounded hover:bg-purple-700">
          Broadcast Push Alert
        </button>
      </form>
    </div>
  )
}
