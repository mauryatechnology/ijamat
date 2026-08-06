import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../../context/DataContext'
import { Users, Search, Plus, Eye, Phone, Filter, UserCheck, ShieldCheck } from 'lucide-react'

export default function MumineenList() {
  const { members } = useData()
  const navigate = useNavigate()

  const [search, setSearch] = useState('')
  const [filterMohalla, setFilterMohalla] = useState('All')
  const [filterType, setFilterType] = useState('All')

  const mohallas = ['All', ...new Set(members.map(m => m.mohalla).filter(Boolean))]

  const filteredMembers = members.filter(m => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.itsId.includes(search) ||
      m.sabilNo.includes(search) ||
      (m.mobile && m.mobile.includes(search))

    const matchesMohalla = filterMohalla === 'All' || m.mohalla === filterMohalla
    const matchesType = filterType === 'All' || m.hofOrFm === filterType

    return matchesSearch && matchesMohalla && matchesType
  })

  const totalMembers = members.length
  const totalHOF = members.filter(m => m.hofOrFm === 'HOF').length
  const totalFM = members.filter(m => m.hofOrFm === 'FM').length

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2.5">
            <Users className="text-blue-600" size={26} />
            Mumineen Directory
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            View, filter, and manage registered Mumineen profiles across the Jamaat
          </p>
        </div>
        <button
          onClick={() => navigate('/mumineen/add')}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg shadow-sm transition-colors"
        >
          <Plus size={18} />
          Add Mumineen
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Mumineen</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{totalMembers}</p>
          </div>
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
            <Users size={24} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Head of Family (HOF)</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{totalHOF}</p>
          </div>
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
            <ShieldCheck size={24} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Family Members (FM)</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{totalFM}</p>
          </div>
          <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
            <UserCheck size={24} />
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Name, ITS ID, Sabil, Phone..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Filter size={14} />
            <span>Filters:</span>
          </div>

          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-slate-700"
          >
            <option value="All">All Types (HOF & FM)</option>
            <option value="HOF">HOF Only</option>
            <option value="FM">FM Only</option>
          </select>

          <select
            value={filterMohalla}
            onChange={e => setFilterMohalla(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-slate-700"
          >
            {mohallas.map(m => (
              <option key={m} value={m}>{m === 'All' ? 'All Mohallas' : m}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Mumineen List Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold text-xs uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">ITS ID</th>
                <th className="py-3.5 px-4">Name</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Sabil No</th>
                <th className="py-3.5 px-4">Mohalla</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Occupation</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredMembers.length > 0 ? (
                filteredMembers.map(member => (
                  <tr key={member.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono text-xs font-bold text-blue-600">
                      {member.itsId}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900">{member.name}</div>
                      <div className="text-xs text-slate-400">
                        {member.gender === 'M' ? 'Male' : 'Female'} • {member.age ? `${member.age} yrs` : 'N/A'}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
                          member.hofOrFm === 'HOF'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {member.hofOrFm || 'HOF'}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-700">
                      #{member.sabilNo || 'N/A'}
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-600">
                      {member.mohalla || 'Saifee Mohalla'}
                    </td>
                    <td className="py-3 px-4 text-xs">
                      {member.mobile ? (
                        <div className="flex items-center gap-1 text-slate-700">
                          <Phone size={12} className="text-slate-400" />
                          <span>{member.mobile}</span>
                        </div>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-600">
                      {member.occupation || 'N/A'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => navigate(`/mumineen/record?its=${member.itsId}`)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-md text-xs font-medium transition-colors"
                      >
                        <Eye size={14} />
                        View Record
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    No Mumineen records found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
          <span>Showing {filteredMembers.length} of {members.length} Mumineen</span>
        </div>
      </div>
    </div>
  )
}
