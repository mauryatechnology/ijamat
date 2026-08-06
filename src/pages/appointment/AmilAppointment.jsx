import { useState } from 'react'
import { useData } from '../../context/DataContext'
import {
  Calendar, Clock, UserCheck, Search, Plus, CheckCircle2,
  AlertCircle, MapPin, User, FileText, Phone, Sparkles, Filter, X
} from 'lucide-react'

export default function AmilAppointment() {
  const { members } = useData()

  // Amil Saheb Available Slots Data
  const amilDetails = {
    title: 'Janab Amil Saheb',
    name: 'Janab Syedi Amil Saheb Naeemuddin Bhaisaheb',
    jamaat: 'Jamaat-e-Saifee Badri Mohalla',
    office: 'Dar-ul-Imarat, Saifee Masjid Complex',
    todayStatus: 'Active Session Today',
    sessions: [
      { id: 'morn', name: 'Morning Session (Subah Mulaqat)', time: '10:00 AM - 12:30 PM', available: true, maxTokens: 15, bookedCount: 8 },
      { id: 'eve', name: 'Evening Session (Asr Mulaqat)', time: '05:00 PM - 07:00 PM', available: true, maxTokens: 15, bookedCount: 12 },
      { id: 'night', name: 'Night Session (Isha Post-Namaaz)', time: '09:00 PM - 10:30 PM', available: true, maxTokens: 10, bookedCount: 4 }
    ]
  }

  // Initial Mock Appointments List
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      tokenNo: 'AM-101',
      itsId: '40493729',
      name: 'Mohd Hussain bhai Rangwala',
      sabilNo: '1',
      mobile: '9876543210',
      purpose: 'Raza for Nikah & Shadi Program',
      date: new Date().toISOString().split('T')[0],
      slot: 'Morning Session (Subah Mulaqat)',
      time: '10:30 AM',
      status: 'Confirmed',
      notes: 'Nikah dates consultation and raza application'
    },
    {
      id: 2,
      tokenNo: 'AM-102',
      itsId: '40621810',
      name: 'Akbarali bhai Udaipurwala',
      sabilNo: '2',
      mobile: '9876543212',
      purpose: 'Takhmeen & Sabil Consultation',
      date: new Date().toISOString().split('T')[0],
      slot: 'Morning Session (Subah Mulaqat)',
      time: '11:15 AM',
      status: 'Confirmed',
      notes: 'Sabil card update discussion'
    },
    {
      id: 3,
      tokenNo: 'AM-103',
      itsId: '60681946',
      name: 'Irfan bhai Zoeb',
      sabilNo: '4',
      mobile: '9876543215',
      purpose: 'Tajarat Raza & Business Azaan',
      date: new Date().toISOString().split('T')[0],
      slot: 'Evening Session (Asr Mulaqat)',
      time: '05:30 PM',
      status: 'Pending',
      notes: 'New shop opening raza request'
    },
    {
      id: 4,
      tokenNo: 'AM-104',
      itsId: '30456789',
      name: 'Taher bhai Saifuddin',
      sabilNo: '5',
      mobile: '9876543216',
      purpose: 'Health & Dua Request',
      date: new Date().toISOString().split('T')[0],
      slot: 'Night Session (Isha Post-Namaaz)',
      time: '09:15 PM',
      status: 'Completed',
      notes: 'Health update and shafaat dua'
    }
  ])

  // Filter States
  const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0])
  const [filterStatus, setFilterStatus] = useState('All')
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [toastMsg, setToastMsg] = useState(false)

  // Booking Form State
  const [form, setForm] = useState({
    itsId: '',
    name: '',
    sabilNo: '',
    mobile: '',
    purpose: 'Raza for Nikah & Shadi Program',
    date: new Date().toISOString().split('T')[0],
    slot: 'Morning Session (Subah Mulaqat)',
    notes: ''
  })

  // Auto-fill member details on ITS lookup
  const handleItsLookup = (its) => {
    setForm(prev => ({ ...prev, itsId: its }))
    const found = members.find(m => m.itsId === its)
    if (found) {
      setForm(prev => ({
        ...prev,
        name: found.name,
        sabilNo: found.sabilNo || '',
        mobile: found.mobile || ''
      }))
    }
  }

  // Handle Form Submit
  const handleBookingSubmit = (e) => {
    e.preventDefault()
    if (!form.itsId || !form.name) {
      alert('Please enter ITS ID and Name.')
      return
    }

    const newAppointment = {
      id: Date.now(),
      tokenNo: `AM-10${appointments.length + 1}`,
      ...form,
      time: form.slot.includes('Morning') ? '11:30 AM' : form.slot.includes('Evening') ? '06:00 PM' : '09:30 PM',
      status: 'Pending'
    }

    setAppointments(prev => [newAppointment, ...prev])
    setShowModal(false)
    setToastMsg('Appointment requested successfully! Token #' + newAppointment.tokenNo)
    setTimeout(() => setToastMsg(false), 3500)

    setForm({
      itsId: '',
      name: '',
      sabilNo: '',
      mobile: '',
      purpose: 'Raza for Nikah & Shadi Program',
      date: new Date().toISOString().split('T')[0],
      slot: 'Morning Session (Subah Mulaqat)',
      notes: ''
    })
  }

  // Status Update Handler
  const updateStatus = (id, newStatus) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a))
  }

  // Filtered Appointments
  const filteredAppointments = appointments.filter(a => {
    const matchesSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.itsId.includes(search) ||
      a.tokenNo.toLowerCase().includes(search.toLowerCase()) ||
      a.purpose.toLowerCase().includes(search.toLowerCase())

    const matchesStatus = filterStatus === 'All' || a.status === filterStatus

    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2.5">
            <UserCheck className="text-emerald-600" size={26} />
            Janab Amil Saheb Mulaqat & Appointment Booking
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Schedule Mulaqat with Janab Amil Saheb for Raza, Consultation, Takhmeen, and Dua requests
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-lg shadow-sm transition-colors"
        >
          <Plus size={18} />
          Book Mulaqat Appointment
        </button>
      </div>

      {toastMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center gap-3 shadow-sm">
          <CheckCircle2 size={22} className="text-emerald-600 shrink-0" />
          <p className="text-xs font-semibold">{toastMsg}</p>
        </div>
      )}

      {/* Amil Saheb Profile & Available Sessions Card */}
      <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-slate-900 text-white p-6 rounded-xl shadow-md space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-800/60 pb-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-emerald-600 text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-inner shrink-0 border border-emerald-400/30">
              👳🏽‍♂️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-800">
                  {amilDetails.title}
                </span>
                <span className="text-xs text-emerald-300 font-medium">● {amilDetails.todayStatus}</span>
              </div>
              <h2 className="text-xl font-bold mt-1 text-white">{amilDetails.name}</h2>
              <p className="text-xs text-slate-300 flex items-center gap-2 mt-1">
                <MapPin size={13} className="text-emerald-400" />
                {amilDetails.office} ({amilDetails.jamaat})
              </p>
            </div>
          </div>
        </div>

        {/* Sessions Schedule Grid */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-3 flex items-center gap-2">
            <Clock size={14} />
            Today's Available Mulaqat Sessions & Token Status
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {amilDetails.sessions.map(session => (
              <div key={session.id} className="bg-slate-800/80 border border-emerald-900/60 p-4 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-emerald-200">{session.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Active
                  </span>
                </div>
                <p className="text-lg font-mono font-extrabold text-white">{session.time}</p>
                <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                  <span>Tokens Issued: <strong className="text-emerald-400 font-mono">{session.bookedCount} / {session.maxTokens}</strong></span>
                  <span className="text-[11px] text-emerald-400 font-semibold">
                    {session.maxTokens - session.bookedCount} Available
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search Token, ITS, Name, Purpose..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Filter size={14} />
            <span>Status Filter:</span>
          </div>

          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none text-slate-700"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending Approval</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Mulaqat Appointments Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold text-xs uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Token #</th>
                <th className="py-3 px-4">ITS / Mumineen</th>
                <th className="py-3 px-4">Mulaqat Purpose</th>
                <th className="py-3 px-4">Session & Time</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map(app => (
                  <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-mono text-xs font-bold bg-slate-100 px-2 py-1 rounded text-slate-800 border border-slate-200">
                        {app.tokenNo}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{app.name}</div>
                      <div className="text-xs text-slate-400 font-mono">
                        ITS: {app.itsId} • Sabil #{app.sabilNo || 'N/A'} • 📞 {app.mobile || 'N/A'}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-800 text-xs">{app.purpose}</div>
                      {app.notes && <div className="text-[11px] text-slate-500 italic mt-0.5">{app.notes}</div>}
                    </td>
                    <td className="py-3 px-4 text-xs">
                      <div className="font-semibold text-slate-800">{app.slot}</div>
                      <div className="text-slate-500 font-mono mt-0.5">{app.date} @ {app.time}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                        app.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                        app.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                        app.status === 'Completed' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {app.status === 'Pending' && (
                          <button
                            onClick={() => updateStatus(app.id, 'Confirmed')}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-medium transition-colors"
                          >
                            Confirm
                          </button>
                        )}
                        {app.status === 'Confirmed' && (
                          <button
                            onClick={() => updateStatus(app.id, 'Completed')}
                            className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors"
                          >
                            Mark Done
                          </button>
                        )}
                        {app.status !== 'Cancelled' && app.status !== 'Completed' && (
                          <button
                            onClick={() => updateStatus(app.id, 'Cancelled')}
                            className="px-2 py-1 text-red-600 hover:bg-red-50 rounded text-xs font-medium transition-colors"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 text-xs">
                    No appointment requests found matching your filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Book Appointment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100">
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <UserCheck size={20} className="text-emerald-600" />
                Request Amil Saheb Mulaqat Appointment
              </h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">ITS ID *</label>
                  <input
                    type="text"
                    required
                    maxLength={8}
                    placeholder="e.g. 40493729"
                    value={form.itsId}
                    onChange={e => handleItsLookup(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Sabil Number</label>
                  <input
                    type="text"
                    placeholder="e.g. 1"
                    value={form.sabilNo}
                    onChange={e => setForm({ ...form, sabilNo: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Mumineen Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mohd Hussain bhai Rangwala"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Mobile Phone *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 9876543210"
                    value={form.mobile}
                    onChange={e => setForm({ ...form, mobile: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Purpose of Mulaqat *</label>
                <select
                  value={form.purpose}
                  onChange={e => setForm({ ...form, purpose: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium"
                >
                  <option value="Raza for Nikah & Shadi Program">Raza for Nikah & Shadi Program</option>
                  <option value="Takhmeen & Sabil Consultation">Takhmeen & Sabil Consultation</option>
                  <option value="Tajarat Raza & Business Azaan">Tajarat Raza & Business Azaan</option>
                  <option value="Qaza & Legal Dispute Resolution">Qaza & Legal Dispute Resolution</option>
                  <option value="Health & Shafaat Dua Request">Health & Shafaat Dua Request</option>
                  <option value="Personal Mulaqat / Bethak">Personal Mulaqat / Bethak</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Preferred Date *</label>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={e => setForm({ ...form, date: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Preferred Mulaqat Session *</label>
                  <select
                    value={form.slot}
                    onChange={e => setForm({ ...form, slot: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <option value="Morning Session (Subah Mulaqat)">Morning Session (10:00 AM - 12:30 PM)</option>
                    <option value="Evening Session (Asr Mulaqat)">Evening Session (05:00 PM - 07:00 PM)</option>
                    <option value="Night Session (Isha Post-Namaaz)">Night Session (09:00 PM - 10:30 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Special Notes / Details</label>
                <textarea
                  rows={2}
                  placeholder="Provide any additional details or background..."
                  value={form.notes}
                  onChange={e => setForm({ ...form, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow-sm"
                >
                  Submit Mulaqat Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
