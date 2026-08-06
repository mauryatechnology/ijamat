import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { ClipboardList, Search, Filter, Download, CheckCircle2, XCircle, HelpCircle, Users } from 'lucide-react'

export default function RSVPReport() {
  const { members, events } = useData()

  const [selectedEvent, setSelectedEvent] = useState(events[0]?.name || 'Ashara Mubaraka Majlis')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [search, setSearch] = useState('')

  // Map Mumineen to RSVP responses
  const rsvpList = members.map((m, idx) => ({
    ...m,
    rsvpStatus: idx % 3 === 0 ? 'Confirmed' : idx % 3 === 1 ? 'Declined' : 'Tentative',
    guestCount: idx % 4 === 0 ? 2 : idx % 4 === 1 ? 0 : 1,
    submittedAt: `Today, 0${(idx % 9) + 1}:30 PM`
  }))

  const filteredRsvp = rsvpList.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.itsId.includes(search) ||
      (item.sabilNo && item.sabilNo.includes(search))

    const matchesStatus = selectedStatus === 'All' || item.rsvpStatus === selectedStatus

    return matchesSearch && matchesStatus
  })

  const totalConfirmed = rsvpList.filter(r => r.rsvpStatus === 'Confirmed').length
  const totalDeclined = rsvpList.filter(r => r.rsvpStatus === 'Declined').length
  const totalTentative = rsvpList.filter(r => r.rsvpStatus === 'Tentative').length
  const totalGuests = rsvpList.reduce((sum, r) => sum + r.guestCount, 0)

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2.5">
            <ClipboardList className="text-blue-600" size={26} />
            Miqaat & Event RSVP Attendance Report
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Real-time tracking of Mumineen event RSVPs, headcounts, and guest confirmations via Mobile App
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
        >
          <Download size={14} />
          Export RSVP List
        </button>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Confirmed Attendees</p>
            <p className="text-2xl font-extrabold text-emerald-600 mt-1">{totalConfirmed}</p>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <CheckCircle2 size={24} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Tentative / Maybe</p>
            <p className="text-2xl font-extrabold text-amber-600 mt-1">{totalTentative}</p>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
            <HelpCircle size={24} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Declined / Regrets</p>
            <p className="text-2xl font-extrabold text-red-600 mt-1">{totalDeclined}</p>
          </div>
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
            <XCircle size={24} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Additional Guests</p>
            <p className="text-2xl font-extrabold text-purple-600 mt-1">{totalGuests}</p>
          </div>
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
            <Users size={24} />
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <select
            value={selectedEvent}
            onChange={e => setSelectedEvent(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none text-slate-800 font-bold"
          >
            {events.map(ev => (
              <option key={ev.id} value={ev.name}>{ev.name} ({ev.date})</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none text-slate-700 font-semibold"
          >
            <option value="All">All RSVP Statuses</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Tentative">Tentative</option>
            <option value="Declined">Declined</option>
          </select>
        </div>

        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search ITS, Name, Sabil..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* RSVP Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold text-xs uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">ITS ID</th>
                <th className="py-3 px-4">Mumineen Name</th>
                <th className="py-3 px-4">HOF / FM</th>
                <th className="py-3 px-4">Sabil No</th>
                <th className="py-3 px-4">Mohalla</th>
                <th className="py-3 px-4">RSVP Status</th>
                <th className="py-3 px-4 text-center">Guests</th>
                <th className="py-3 px-4 text-right">Submitted At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredRsvp.length > 0 ? (
                filteredRsvp.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-blue-600 text-xs">{item.itsId}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{item.name}</td>
                    <td className="py-3 px-4 text-xs font-semibold text-slate-600">{item.hofOrFm || 'HOF'}</td>
                    <td className="py-3 px-4 text-xs font-mono font-medium text-slate-700">#{item.sabilNo || 'N/A'}</td>
                    <td className="py-3 px-4 text-xs text-slate-600">{item.mohalla || 'Saifee Mohalla'}</td>
                    <td className="py-3 px-4 text-xs">
                      <span className={`px-2.5 py-1 rounded font-bold text-xs ${
                        item.rsvpStatus === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                        item.rsvpStatus === 'Tentative' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {item.rsvpStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-slate-800">{item.guestCount}</td>
                    <td className="py-3 px-4 text-right font-mono text-xs text-slate-400">{item.submittedAt}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400 text-xs">
                    No RSVP records found matching criteria.
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
