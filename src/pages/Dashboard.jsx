import { useState } from 'react'
import { useData } from '../context/DataContext'
import StatCard from '../components/ui/StatCard'
import AreaChartWidget from '../components/charts/AreaChart'
import PieChartWidget from '../components/charts/PieChart'
import DataTable from '../components/ui/DataTable'
import { CreditCard, Utensils, DollarSign } from 'lucide-react'

export default function Dashboard() {
  const { dashboardStats, members, collections } = useData()
  const [profileSearch, setProfileSearch] = useState('')
  const [profileResult, setProfileResult] = useState(null)

  const handleProfileSearch = () => {
    if (!profileSearch) return
    const found = members.find(m =>
      m.sabilNo === profileSearch || m.itsId === profileSearch
    )
    setProfileResult(found || 'not_found')
  }

  const onlinePaymentColumns = [
    { key: 'date', label: 'Date' },
    { key: 'receiptNo', label: 'R.No.' },
    { key: 'sabilNo', label: 'Sabil' },
    { key: 'name', label: 'Name' },
    { key: 'head', label: 'Head' },
    { key: 'amount', label: 'Amount', render: (v) => `₹${Number(v).toLocaleString('en-IN')}` }
  ]

  const recentOnline = collections.filter(c => c.mode === 'UPI' || c.mode === 'Online' || c.mode === 'Bank Transfer')

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Profile Search Card */}
        <div className="stat-card bg-gradient-to-br from-blue-600 to-blue-800">
          <h3 className="text-lg font-semibold mb-2 text-white">Profile Lookup</h3>
          <p className="text-xs opacity-80 mb-2">Sabil / ITS / File No.:</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={profileSearch}
              onChange={e => setProfileSearch(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleProfileSearch()}
              placeholder="e.g. 1012"
              className="flex-1 px-3 py-1.5 bg-white/20 border border-white/30 rounded text-white placeholder:text-white/50 text-sm outline-none focus:bg-white/30"
            />
            <button
              onClick={handleProfileSearch}
              className="px-3 py-1.5 bg-white text-blue-700 rounded font-semibold text-sm hover:bg-white/90 transition-colors"
            >
              Go!
            </button>
          </div>
          {profileResult && profileResult !== 'not_found' && (
            <p className="text-xs mt-2 font-medium text-blue-100">{profileResult.name}</p>
          )}
          {profileResult === 'not_found' && (
            <p className="text-xs mt-2 opacity-70">Not Found</p>
          )}
        </div>

        <StatCard
          title="Total Sabil"
          value={dashboardStats.totalSabil}
          subtitle={dashboardStats.sabilBreakdown}
          color="blue"
          icon={CreditCard}
        />

        <StatCard
          title="Total Thali"
          value={dashboardStats.totalThali}
          subtitle={dashboardStats.thaliBreakdown}
          color="green"
          icon={Utensils}
        />

        <StatCard
          title="Today Collection"
          value={dashboardStats.todayCollection}
          subtitle="Today's total"
          color="cyan"
          icon={DollarSign}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AreaChartWidget
          data={dashboardStats.collectionTrend}
          dataKey="total"
          xKey="date"
          title="Collection 5 Days Details"
        />

        <PieChartWidget
          data={dashboardStats.locationDues}
          dataKey="amount"
          nameKey="name"
          title="FMB Location Wise Dues"
        />
      </div>

      {/* Online Payment Table */}
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-3">Online Payment Receipts</h3>
        <DataTable
          columns={onlinePaymentColumns}
          data={recentOnline}
          showFilters={false}
          showExport={false}
          showPagination={false}
          showSearch={false}
          emptyMessage="No online payments recorded"
        />
      </div>
    </div>
  )
}
