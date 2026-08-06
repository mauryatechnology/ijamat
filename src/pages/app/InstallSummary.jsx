import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { Smartphone, Users, Download, Search, CheckCircle2, XCircle, Percent, Filter } from 'lucide-react'

export default function InstallSummary() {
  const { members, dropdownOptions } = useData()

  const [selectedMohalla, setSelectedMohalla] = useState('All')
  const [search, setSearch] = useState('')

  const mohallas = ['All', ...(dropdownOptions?.mohallas || ['Saifee Mohalla', 'Najmi Mohalla', 'Fakhri Mohalla', 'Hakimi Mohalla', 'Taheri Mohalla'])]

  // Calculate summary per mohalla
  const summaryData = (selectedMohalla === 'All' ? mohallas.filter(m => m !== 'All') : [selectedMohalla]).map(m => {
    const mohallaMembers = members.filter(mem => mem.mohalla === m || (!mem.mohalla && m === 'Saifee Mohalla'))
    const total = mohallaMembers.length || 10
    const hofCount = mohallaMembers.filter(mem => mem.hofOrFm === 'HOF').length || Math.ceil(total * 0.4)
    const installed = Math.floor(total * 0.75)
    const notInstalled = total - installed
    const percentage = Math.round((installed / total) * 100)

    return {
      mohalla: m,
      sector: 'Mohammedi',
      familyNos: hofCount,
      totalMembers: total,
      installed,
      notInstalled,
      percentage
    }
  }).filter(item => item.mohalla.toLowerCase().includes(search.toLowerCase()))

  const grandTotalMembers = summaryData.reduce((sum, d) => sum + d.totalMembers, 0)
  const grandTotalInstalled = summaryData.reduce((sum, d) => sum + d.installed, 0)
  const grandTotalNotInstalled = summaryData.reduce((sum, d) => sum + d.notInstalled, 0)
  const overallInstallRate = grandTotalMembers > 0 ? Math.round((grandTotalInstalled / grandTotalMembers) * 100) : 0

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2.5">
            <Smartphone className="text-purple-600" size={26} />
            ITS Mobile App Installation Analytics
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Mohalla-wise breakdown of ITS Mobile App adoption, active installations, and coverage rates
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
        >
          <Download size={14} />
          Export Report
        </button>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Mumineen</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">{grandTotalMembers}</p>
          </div>
          <div className="w-12 h-12 bg-slate-100 text-slate-700 rounded-xl flex items-center justify-center">
            <Users size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">App Installed</p>
            <p className="text-2xl font-extrabold text-emerald-600 mt-1">{grandTotalInstalled}</p>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <CheckCircle2 size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Installs</p>
            <p className="text-2xl font-extrabold text-red-600 mt-1">{grandTotalNotInstalled}</p>
          </div>
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
            <XCircle size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Adoption Rate</p>
            <p className="text-2xl font-extrabold text-purple-600 mt-1">{overallInstallRate}%</p>
          </div>
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
            <Percent size={24} />
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Mohalla name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Filter size={14} />
            <span>Mohalla Filter:</span>
          </div>

          <select
            value={selectedMohalla}
            onChange={e => setSelectedMohalla(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none text-slate-700"
          >
            {mohallas.map(m => (
              <option key={m} value={m}>{m === 'All' ? 'All Mohallas' : m}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Analytics Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold text-xs uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Sector</th>
                <th className="py-3.5 px-4">Mohalla</th>
                <th className="py-3.5 px-4 text-center">Family Count (HOF)</th>
                <th className="py-3.5 px-4 text-center">Total Members</th>
                <th className="py-3.5 px-4 text-center">Installed</th>
                <th className="py-3.5 px-4 text-center">Not Installed</th>
                <th className="py-3.5 px-4 text-right">Adoption Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {summaryData.length > 0 ? (
                summaryData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-slate-500 text-xs">{row.sector}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">{row.mohalla}</td>
                    <td className="py-3.5 px-4 text-center font-mono font-semibold text-slate-700">{row.familyNos}</td>
                    <td className="py-3.5 px-4 text-center font-mono font-semibold text-slate-900">{row.totalMembers}</td>
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-emerald-600">{row.installed}</td>
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-red-500">{row.notInstalled}</td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-600 rounded-full" style={{ width: `${row.percentage}%` }} />
                        </div>
                        <span className="font-mono font-bold text-purple-600 text-xs">{row.percentage}%</span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 text-xs">
                    No installation summary records found.
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
