import { useState } from 'react'
import { useData } from '../../context/DataContext'
import FilterPanel from '../../components/ui/FilterPanel'
import DataTable from '../../components/ui/DataTable'
import { FileText } from 'lucide-react'

export default function MenuReport() {
  const { menuItems } = useData()
  const [filtered, setFiltered] = useState(menuItems)

  const filterFields = [
    { key: 'fromDate', label: 'From Date', type: 'date' },
    { key: 'toDate', label: 'To Date', type: 'date' }
  ]

  const handleFilter = (values) => {
    let result = [...menuItems]
    if (values.fromDate) result = result.filter(m => m.eventDate >= values.fromDate)
    if (values.toDate) result = result.filter(m => m.eventDate <= values.toDate)
    setFiltered(result)
  }

  const totalCost = filtered.reduce((s, m) => s + m.cost, 0)
  const totalThalis = filtered.reduce((s, m) => s + m.thaliCount, 0)
  const avgRating = filtered.length > 0 ? (filtered.reduce((s, m) => s + m.rating, 0) / filtered.length).toFixed(1) : 0

  const columns = [
    { key: 'eventDate', label: 'Date' },
    { key: 'dishes', label: 'Dishes', render: v => Array.isArray(v) ? v.join(', ') : v },
    { key: 'cost', label: 'Cost (₹)', render: v => `₹${Number(v).toLocaleString('en-IN')}` },
    { key: 'thaliCount', label: 'Thalis Served' },
    { key: 'rating', label: 'Rating', render: v => '⭐'.repeat(v) },
    { key: 'feedback', label: 'Feedback' }
  ]

  return (
    <div>
      <h2 className="page-header"><FileText size={22} /> Menu Report</h2>
      <FilterPanel fields={filterFields} onFilter={handleFilter} />
      <div className="flex flex-wrap gap-6 mb-3 text-sm">
        <span>Total Cost: <strong className="text-blue-600">₹{totalCost.toLocaleString('en-IN')}</strong></span>
        <span>Total Thalis: <strong className="text-emerald-600">{totalThalis}</strong></span>
        <span>Avg Rating: <strong className="text-amber-600">{avgRating} ⭐</strong></span>
      </div>
      <DataTable columns={columns} data={filtered} title="Menu_Report" />
    </div>
  )
}
