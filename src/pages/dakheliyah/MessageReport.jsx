import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { MessageSquare, Search, Filter, Download, CheckCircle2, PhoneCall, Mail } from 'lucide-react'

export default function MessageReport() {
  const { messages } = useData()

  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('All')

  const filteredMessages = messages.filter(msg => {
    const matchesSearch =
      msg.to.toLowerCase().includes(search.toLowerCase()) ||
      msg.message.toLowerCase().includes(search.toLowerCase()) ||
      msg.type.toLowerCase().includes(search.toLowerCase())

    const matchesType = filterType === 'All' || msg.type === filterType

    return matchesSearch && matchesType
  })

  const totalSent = messages.reduce((sum, m) => sum + (m.recipients || 1), 0)
  const whatsappCount = messages.filter(m => m.type === 'WhatsApp').length
  const smsCount = messages.filter(m => m.type === 'SMS').length

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2.5">
            <MessageSquare className="text-emerald-600" size={26} />
            Broadcast Message Delivery Report
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Audit logs and delivery status of all WhatsApp, SMS, and Email broadcasts sent to Mumineen
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
        >
          <Download size={14} />
          Export Report
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Recipients Reached</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">{totalSent}</p>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <MessageSquare size={24} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">WhatsApp Broadcasts</p>
            <p className="text-2xl font-extrabold text-emerald-600 mt-1">{whatsappCount}</p>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <PhoneCall size={24} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">SMS / Email Sent</p>
            <p className="text-2xl font-extrabold text-blue-600 mt-1">{smsCount}</p>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <Mail size={24} />
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search message text, audience..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Filter size={14} />
            <span>Channel:</span>
          </div>

          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none text-slate-700 font-semibold"
          >
            <option value="All">All Channels</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="SMS">SMS Gateway</option>
            <option value="Email">Email</option>
          </select>
        </div>
      </div>

      {/* Message Log Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold text-xs uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Channel</th>
                <th className="py-3 px-4">Sent To (Audience)</th>
                <th className="py-3 px-4">Message Content</th>
                <th className="py-3 px-4 text-center">Recipients</th>
                <th className="py-3 px-4">Sent By</th>
                <th className="py-3 px-4 text-right">Delivery Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredMessages.length > 0 ? (
                filteredMessages.map((msg, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 text-xs font-mono text-slate-500">{msg.date}</td>
                    <td className="py-3 px-4 text-xs font-bold">
                      <span className={`px-2 py-0.5 rounded ${msg.type === 'WhatsApp' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}`}>
                        {msg.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-900 text-xs">{msg.to}</td>
                    <td className="py-3 px-4 text-xs text-slate-600 max-w-xs truncate">{msg.message}</td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-slate-800">{msg.recipients || 1}</td>
                    <td className="py-3 px-4 text-xs text-slate-500">{msg.sentBy || 'Admin'}</td>
                    <td className="py-3 px-4 text-right">
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                        {msg.status || 'Delivered'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 text-xs">
                    No message broadcast logs found matching criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
