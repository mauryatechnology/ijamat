import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { FileText, Search, ShieldCheck, Activity, Smartphone, Download, Filter } from 'lucide-react'

export default function UserActivityLog() {
  const { members } = useData()

  const [search, setSearch] = useState('')
  const [filterAction, setFilterAction] = useState('All')

  const actionsList = [
    'Viewed FMB Daily Niyaz Menu',
    'Submitted Raza Application for Nikah',
    'Checked Sabil Yearly Takhmeen Balance',
    'Submitted Miqaat Event RSVP (Confirmed)',
    'Downloaded Sabil Receipt PDF',
    'Updated Family Contact Number',
    'Requested Amil Saheb Mulaqat Appointment'
  ]

  // Enriched User Activity Telemetry dataset
  const activityLogs = members.map((m, idx) => ({
    id: idx + 1,
    itsId: m.itsId,
    name: m.name,
    action: actionsList[idx % actionsList.length],
    device: idx % 2 === 0 ? 'Android App v2.4.1' : 'iOS App v2.4.0',
    ipAddress: `192.168.1.${10 + idx}`,
    timestamp: idx % 3 === 0 ? 'Just Now' : idx % 3 === 1 ? `Today, 10:${15 + idx} AM` : `Yesterday, 06:45 PM`
  }))

  const filteredLogs = activityLogs.filter(log => {
    const matchesSearch =
      log.name.toLowerCase().includes(search.toLowerCase()) ||
      log.itsId.includes(search) ||
      log.action.toLowerCase().includes(search.toLowerCase())

    const matchesAction = filterAction === 'All' || log.action === filterAction

    return matchesSearch && matchesAction
  })

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2.5">
            <Activity className="text-purple-600" size={26} />
            ITS Mobile App Activity Audit Telemetry
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Real-time security telemetry, login events, and feature usage audit logs from Mumineen mobile apps
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
        >
          <Download size={14} />
          Export Audit Log
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Today's App Sessions</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">342 Sessions</p>
          </div>
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
            <Activity size={24} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Feature Interactions</p>
            <p className="text-2xl font-extrabold text-emerald-600 mt-1">1,280 Actions</p>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <Smartphone size={24} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Security Audit Status</p>
            <p className="text-2xl font-extrabold text-blue-600 mt-1">100% Normal</p>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <ShieldCheck size={24} />
          </div>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search ITS, Name, Action..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Filter size={14} />
            <span>Action Filter:</span>
          </div>

          <select
            value={filterAction}
            onChange={e => setFilterAction(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none text-slate-700 font-semibold"
          >
            <option value="All">All Actions</option>
            {actionsList.map((act, i) => (
              <option key={i} value={act}>{act}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold text-xs uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">ITS ID</th>
                <th className="py-3 px-4">User Name</th>
                <th className="py-3 px-4">Action Performed</th>
                <th className="py-3 px-4">Device & App</th>
                <th className="py-3 px-4">IP Address</th>
                <th className="py-3 px-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredLogs.length > 0 ? (
                filteredLogs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-purple-600 text-xs">{log.itsId}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{log.name}</td>
                    <td className="py-3 px-4 font-medium text-slate-800 text-xs">{log.action}</td>
                    <td className="py-3 px-4 text-xs text-slate-500 font-mono">{log.device}</td>
                    <td className="py-3 px-4 text-xs font-mono text-slate-400">{log.ipAddress}</td>
                    <td className="py-3 px-4 text-right font-mono text-xs text-slate-500">{log.timestamp}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 text-xs">
                    No activity telemetry records found matching criteria.
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
