import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { Smartphone, Search, Filter, CheckCircle2, Monitor, Download, SmartphoneNfc } from 'lucide-react'

export default function InstallList() {
  const { members } = useData()

  const [search, setSearch] = useState('')
  const [filterOs, setFilterOs] = useState('All')

  // Enriched app user data from members dataset
  const appUsers = members.map((m, idx) => ({
    ...m,
    deviceOs: idx % 3 === 0 ? 'iOS' : 'Android',
    appVersion: idx % 2 === 0 ? 'v2.4.1' : 'v2.3.8',
    lastActive: idx % 4 === 0 ? 'Just Now' : idx % 4 === 1 ? 'Today, 02:15 PM' : idx % 4 === 2 ? 'Yesterday' : '3 days ago',
    pushStatus: idx % 5 === 0 ? 'Disabled' : 'Enabled'
  }))

  const filteredUsers = appUsers.filter(u => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.itsId.includes(search) ||
      (u.mohalla && u.mohalla.toLowerCase().includes(search.toLowerCase()))

    const matchesOs = filterOs === 'All' || u.deviceOs === filterOs

    return matchesSearch && matchesOs
  })

  const totalAndroid = appUsers.filter(u => u.deviceOs === 'Android').length
  const totalIos = appUsers.filter(u => u.deviceOs === 'iOS').length

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2.5">
            <SmartphoneNfc className="text-blue-600" size={26} />
            Registered App Users Directory
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Detailed registry of Mumineen mobile app installations, device models, and active sessions
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
        >
          <Download size={14} />
          Export User List
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Active App Users</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">{appUsers.length}</p>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <Smartphone size={24} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Android Installations</p>
            <p className="text-2xl font-extrabold text-emerald-600 mt-1">{totalAndroid}</p>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <Monitor size={24} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">iOS (Apple) Installations</p>
            <p className="text-2xl font-extrabold text-purple-600 mt-1">{totalIos}</p>
          </div>
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
            <Smartphone size={24} />
          </div>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search ITS, Name, Mohalla..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Filter size={14} />
            <span>Device OS:</span>
          </div>

          <select
            value={filterOs}
            onChange={e => setFilterOs(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none text-slate-700 font-semibold"
          >
            <option value="All">All Operating Systems</option>
            <option value="Android">Android</option>
            <option value="iOS">iOS (Apple)</option>
          </select>
        </div>
      </div>

      {/* User Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold text-xs uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">ITS ID</th>
                <th className="py-3 px-4">Mumineen Name</th>
                <th className="py-3 px-4">Mohalla</th>
                <th className="py-3 px-4">App Version</th>
                <th className="py-3 px-4">Device OS</th>
                <th className="py-3 px-4">Notifications</th>
                <th className="py-3 px-4 text-right">Last Active Session</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-blue-600 text-xs">{user.itsId}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{user.name}</td>
                    <td className="py-3 px-4 text-xs text-slate-600">{user.mohalla || 'Saifee Mohalla'}</td>
                    <td className="py-3 px-4 text-xs font-mono font-medium text-slate-600">{user.appVersion}</td>
                    <td className="py-3 px-4 text-xs">
                      <span className={`px-2 py-0.5 rounded font-semibold text-[11px] ${
                        user.deviceOs === 'iOS' ? 'bg-purple-100 text-purple-800 border border-purple-200' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}>
                        {user.deviceOs}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs">
                      <span className={`px-2 py-0.5 rounded font-medium text-[11px] ${
                        user.pushStatus === 'Enabled' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {user.pushStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-xs font-mono text-slate-500">{user.lastActive}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 text-xs">
                    No registered app users found matching criteria.
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
