import { useData } from '../context/DataContext'
import StatCard from '../components/ui/StatCard'
import AreaChartWidget from '../components/charts/AreaChart'
import PieChartWidget from '../components/charts/PieChart'
import DataTable from '../components/ui/DataTable'
import { Users, CreditCard, Utensils, DollarSign } from 'lucide-react'

export default function Dashboard() {
  const { dashboardStats, collections, members } = useData()

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
    <div>
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Members"
          value={members.length}
          subtitle={`${members.filter(m => m.hofOrFm === 'HOF').length} Families`}
          color="purple"
          icon={Users}
        />

        <StatCard
          title="Total Sabil"
          value={dashboardStats.totalSabil}
          subtitle={dashboardStats.sabilBreakdown}
          color="coral"
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
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
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Recent Online Payments</h3>
        <DataTable
          columns={onlinePaymentColumns}
          data={recentOnline.slice(0, 5)}
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
