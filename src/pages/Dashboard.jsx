import { useState } from 'react'
import { useData } from '../context/DataContext'
import { useNavigate } from 'react-router-dom'
import AreaChartWidget from '../components/charts/AreaChart'
import PieChartWidget from '../components/charts/PieChart'
import {
  CreditCard, Utensils, DollarSign, UserCheck, Search, Users,
  Send, Plus, ArrowUpRight, CheckCircle2, Layers, BookOpen,
  GraduationCap, Wallet, Globe, Scale, Heart, Smartphone,
  Building2, Calendar, ShieldCheck, TrendingUp, Sparkles, ChevronRight,
  Clock, Award, Activity
} from 'lucide-react'

export default function Dashboard() {
  const navigate = useNavigate()
  const { dashboardStats, members, collections, razaForms, events } = useData()

  const [profileSearch, setProfileSearch] = useState('')
  const [profileResult, setProfileResult] = useState(null)

  const handleProfileSearch = (e) => {
    if (e) e.preventDefault()
    if (!profileSearch.trim()) return

    const query = profileSearch.trim().toLowerCase()
    const found = members.find(m =>
      (m.sabilNo && m.sabilNo.toString().toLowerCase() === query) ||
      (m.itsId && m.itsId.toString().toLowerCase() === query) ||
      (m.name && m.name.toLowerCase().includes(query))
    )

    setProfileResult(found || 'not_found')
  }

  const onlinePaymentColumns = [
    { key: 'date', label: 'Date' },
    { key: 'receiptNo', label: 'R.No.' },
    { key: 'sabilNo', label: 'Sabil' },
    { key: 'name', label: 'Name' },
    { key: 'head', label: 'Head' },
    { key: 'mode', label: 'Mode' },
    { key: 'amount', label: 'Amount', render: (v) => <span className="font-mono font-bold text-emerald-600">₹{Number(v).toLocaleString('en-IN')}</span> }
  ]

  const recentOnline = collections.slice(0, 6)

  // 12 Umoor Pillars configuration for the Operations Hub
  const umoorPillars = [
    { id: 1, name: 'Deeniyah', label: '1. Umoor Deeniyah', icon: BookOpen, path: '/deeniyah/sabaq/attendance-report', badge: '3 Sabaqs Active', color: 'from-amber-500 to-amber-600' },
    { id: 2, name: 'Talimiyah', label: '2. Umoor Talimiyah', icon: GraduationCap, path: '/talimiyah/sabaq-attendance', badge: '98% Attendance', color: 'from-blue-500 to-blue-600' },
    { id: 3, name: 'Maliyah', label: '3. Umoor Maliyah', icon: Wallet, path: '/maliyah/daily-collection', badge: 'Collection Active', color: 'from-emerald-500 to-emerald-600' },
    { id: 4, name: 'Marafiq', label: '4. Umoor Marafiq', icon: Globe, path: '/marafiq/muwasaat-entry', badge: 'Muwasaat Portal', color: 'from-cyan-500 to-cyan-600' },
    { id: 5, name: 'Sehat', label: '5. Umoor Sehat', icon: Heart, path: '/sehat/doctors-directory', badge: 'Medical Camp', color: 'from-rose-500 to-rose-600' },
    { id: 6, name: 'Iqtesadiyah', label: '6. Umoor Iqtesadiyah', icon: Building2, path: '/iqtesadiyah/qardan-hasana', badge: 'Qardan Scheme', color: 'from-purple-500 to-purple-600' },
    { id: 7, name: 'Qaza', label: '7. Umoor Qaza', icon: Scale, path: '/qaza/report', badge: 'Court & Sulah', color: 'from-indigo-500 to-indigo-600' },
    { id: 8, name: 'Dakheliyah', label: '8. Umoor Dakheliyah', icon: Send, path: '/dakheliyah/send-message', badge: 'Circulars Active', color: 'from-teal-500 to-teal-600' },
    { id: 9, name: 'Kharejiyah', label: '9. Umoor Kharejiyah', icon: ShieldCheck, path: '/kharejiyah/govt-liaison', badge: 'Govt Liaison', color: 'from-sky-500 to-sky-600' },
    { id: 10, name: 'Mawareed', label: '10. Umoor Mawareed', icon: Users, path: '/mawareed/member-list', badge: 'Staff Payroll', color: 'from-orange-500 to-orange-600' },
    { id: 11, name: 'FMB', label: '11. Faiz al-Mawaid', icon: Utensils, path: '/fmb/thali-master', badge: 'Thali Dispatch', color: 'from-emerald-600 to-emerald-700' },
    { id: 12, name: 'Hall Booking', label: '12. Hall Facilities', icon: Calendar, path: '/hall-booking/booking', badge: 'Venue Open', color: 'from-violet-500 to-violet-600' }
  ]

  return (
    <div className="space-y-6 pb-8">
      {/* 🌟 HERO EXECUTIVE BANNER & ITS 360 SEARCH */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 p-6 md:p-8 text-white shadow-xl border border-slate-800">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 -mb-20 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Title & Hijri Date */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-amber-400/20 border border-amber-400/30 text-amber-300 rounded-full text-xs font-semibold tracking-wide flex items-center gap-1.5">
                <Sparkles size={13} className="text-amber-400" />
                15th Shawwal 1446 H
              </span>
              <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 rounded-full text-xs font-semibold">
                Jamaat System Online
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              Jamaat Central Command & Operations ERP
            </h1>
            <p className="text-slate-300 text-xs md:text-sm max-w-xl">
              Unified governance portal managing Mumineen records, 12 Umoor departments, FMB Thali, Finance, and Janab Amil Saheb Mulaqat
            </p>
          </div>

          {/* Smart ITS & Sabil Search Box */}
          <form onSubmit={handleProfileSearch} className="bg-slate-800/90 border border-slate-700/80 p-3 rounded-xl shadow-lg w-full lg:w-96 space-y-2 backdrop-blur-md">
            <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span>ITS / Sabil 360° Quick Lookup</span>
              <span className="text-amber-400 text-[10px]">Instant Search</span>
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={profileSearch}
                  onChange={e => setProfileSearch(e.target.value)}
                  placeholder="Enter ITS ID, Sabil No, or Name..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-900/80 border border-slate-700 rounded-lg text-white placeholder:text-slate-400 outline-none focus:border-amber-400 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs rounded-lg transition-all shadow-md shrink-0"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Action Shortcuts Ribbon */}
        <div className="relative z-10 mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center gap-3 text-xs">
          <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider">Quick Actions:</span>

          <button
            onClick={() => navigate('/mumineen/add')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-200 font-medium transition-colors"
          >
            <Plus size={14} className="text-emerald-400" />
            Add Mumineen
          </button>

          <button
            onClick={() => navigate('/maliyah/daily-collection')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-200 font-medium transition-colors"
          >
            <DollarSign size={14} className="text-emerald-400" />
            Sabil Receipt
          </button>

          <button
            onClick={() => navigate('/appointment')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-200 font-medium transition-colors"
          >
            <UserCheck size={14} className="text-purple-400" />
            Amil Mulaqat Raza
          </button>

          <button
            onClick={() => navigate('/dakheliyah/send-message')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-200 font-medium transition-colors"
          >
            <Send size={14} className="text-blue-400" />
            Broadcast Alert
          </button>
        </div>
      </div>

      {/* SEARCH RESULT OVERLAY / DRAWER */}
      {profileResult && (
        <div className="bg-white rounded-xl border border-blue-200 p-5 shadow-lg space-y-3 relative">
          <button
            onClick={() => setProfileResult(null)}
            className="absolute right-4 top-4 text-xs font-bold text-slate-400 hover:text-slate-600"
          >
            ✕ Close
          </button>

          {profileResult !== 'not_found' ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 border-b pb-3 border-slate-100">
                <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl font-bold flex items-center justify-center text-lg font-mono">
                  {profileResult.sabilNo || 'HOF'}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{profileResult.name}</h3>
                  <p className="text-xs text-slate-500">
                    ITS: <strong className="text-blue-600 font-mono">{profileResult.itsId}</strong> • Mohalla: <strong>{profileResult.mohalla || 'Saifee Mohalla'}</strong>
                  </p>
                </div>
              </div>
              <div className="flex gap-3 text-xs">
                <button
                  onClick={() => navigate('/mumineen/record')}
                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                >
                  View 360° Complete Profile Record
                </button>
              </div>
            </div>
          ) : (
            <p className="text-xs font-semibold text-red-600">No Mumineen record found matching "{profileSearch}". Please try searching by exact ITS ID or Sabil No.</p>
          )}
        </div>
      )}

      {/* 📊 MODERN EXECUTIVE KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Sabil Accounts */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Sabil Accounts</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <CreditCard size={20} />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-2">{dashboardStats.totalSabil}</p>
          <p className="text-xs text-slate-500 mt-1 font-medium">{dashboardStats.sabilBreakdown}</p>
          <div className="mt-3 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: '92%' }} />
          </div>
        </div>

        {/* Card 2: FMB Thali */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Faiz al-Mawaid (FMB)</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Utensils size={20} />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-emerald-600 mt-2">{dashboardStats.totalThali} Thalis</p>
          <p className="text-xs text-slate-500 mt-1 font-medium">{dashboardStats.thaliBreakdown}</p>
          <div className="mt-3 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-600 rounded-full" style={{ width: '88%' }} />
          </div>
        </div>

        {/* Card 3: Today Collections */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Today's Collection</span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <DollarSign size={20} />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-2">{dashboardStats.todayCollection}</p>
          <p className="text-xs text-purple-600 font-semibold mt-1">UPI & Cash Receipts Active</p>
          <div className="mt-3 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-purple-600 rounded-full" style={{ width: '75%' }} />
          </div>
        </div>

        {/* Card 4: Janab Amil Saheb Appointments */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Amil Saheb Mulaqat</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <UserCheck size={20} />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-amber-600 mt-2">7 Tokens Booked</p>
          <p className="text-xs text-slate-500 mt-1 font-medium">Subah & Asr Sessions Open</p>
          <div className="mt-3 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full" style={{ width: '65%' }} />
          </div>
        </div>
      </div>

      {/* 🏛️ 12 UMOOR OPERATIONS HUB */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Layers size={20} className="text-blue-600" />
              12 Umoor Departments Operations Hub
            </h2>
            <p className="text-slate-500 text-xs mt-0.5">
              Live status and single-click access to all 12 Bohra Jamaat governance verticals
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {umoorPillars.map(pillar => {
            const IconComponent = pillar.icon
            return (
              <div
                key={pillar.id}
                onClick={() => navigate(pillar.path)}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md hover:border-slate-300 cursor-pointer transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${pillar.color} text-white flex items-center justify-center shadow-sm`}>
                    <IconComponent size={16} />
                  </div>
                  <ChevronRight size={14} className="text-slate-300 group-hover:text-slate-600 transition-colors" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-xs group-hover:text-blue-600 transition-colors truncate">{pillar.name}</h4>
                  <span className="text-[10px] font-semibold text-slate-500 block truncate mt-0.5">{pillar.badge}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 📈 ANALYTICS CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b pb-2 border-slate-100">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <TrendingUp size={16} className="text-emerald-600" />
              Sabil & Collection Trend (5 Days)
            </h3>
            <span className="text-xs text-slate-400 font-mono">Daily Total</span>
          </div>
          <AreaChartWidget
            data={dashboardStats.collectionTrend}
            dataKey="total"
            xKey="date"
            title=""
          />
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b pb-2 border-slate-100">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <Utensils size={16} className="text-purple-600" />
              FMB Location Wise Dues Breakdown
            </h3>
            <span className="text-xs text-slate-400 font-mono">Mohalla Dues</span>
          </div>
          <PieChartWidget
            data={dashboardStats.locationDues}
            dataKey="amount"
            nameKey="name"
            title=""
          />
        </div>
      </div>

      {/* 🧾 RECENT RECEIPTS & OPERATIONAL TRANSACTIONS */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-5 space-y-4">
        <div className="flex items-center justify-between border-b pb-3 border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <DollarSign size={18} className="text-emerald-600" />
              Recent Collection & Payment Receipts Log
            </h3>
            <p className="text-slate-500 text-xs mt-0.5">Real-time Sabil & FMB receipts recorded across modes</p>
          </div>
          <button
            onClick={() => navigate('/maliyah/collection-report')}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            View Full Report <ArrowUpRight size={14} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Receipt No</th>
                <th className="py-2.5 px-3">Sabil No</th>
                <th className="py-2.5 px-3">Mumineen Name</th>
                <th className="py-2.5 px-3">Payment Head</th>
                <th className="py-2.5 px-3">Mode</th>
                <th className="py-2.5 px-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {recentOnline.map((rec, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-slate-500">{rec.date}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-blue-600">#{rec.receiptNo}</td>
                  <td className="py-2.5 px-3 font-mono font-semibold text-slate-800">#{rec.sabilNo}</td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">{rec.name}</td>
                  <td className="py-2.5 px-3 text-slate-600">{rec.head}</td>
                  <td className="py-2.5 px-3 font-medium">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700 border border-slate-200">
                      {rec.mode}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-600">
                    ₹{Number(rec.amount).toLocaleString('en-IN')}
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
