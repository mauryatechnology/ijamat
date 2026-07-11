import { useState } from 'react'
import { useData } from '../../context/DataContext'
import FilterPanel from '../../components/ui/FilterPanel'
import DataTable from '../../components/ui/DataTable'
import { FileText } from 'lucide-react'
import { formatCurrency } from '../../utils/formatters'

export default function BookingReport() {
  const { hallBookings, dropdownOptions } = useData()
  const [filtered, setFiltered] = useState(hallBookings)

  const filterFields = [
    { key: 'venue', label: 'Venue', type: 'select', options: dropdownOptions.bookingVenues },
    { key: 'status', label: 'Status', type: 'select', options: dropdownOptions.bookingStatuses },
    { key: 'fromDate', label: 'From Date', type: 'date' },
    { key: 'toDate', label: 'To Date', type: 'date' }
  ]

  const handleFilter = (values) => {
    let result = [...hallBookings]
    if (values.venue) result = result.filter(b => b.venue === values.venue)
    if (values.status) result = result.filter(b => b.status === values.status)
    if (values.fromDate) result = result.filter(b => b.date >= values.fromDate)
    if (values.toDate) result = result.filter(b => b.date <= values.toDate)
    setFiltered(result)
  }

  const columns = [
    { key: 'date', label: 'Date' },
    { key: 'venue', label: 'Venue' },
    { key: 'slot', label: 'Slot' },
    { key: 'bookedBy', label: 'Booked By' },
    { key: 'purpose', label: 'Purpose' },
    { key: 'amount', label: 'Amount', render: v => formatCurrency(v) },
    { key: 'status', label: 'Status', render: v => (
      <span className={`badge ${v === 'Confirmed' ? 'badge-success' : v === 'Pending' ? 'badge-warning' : 'badge-danger'}`}>{v}</span>
    )},
    { key: 'addons', label: 'Add-ons', render: v => Array.isArray(v) ? v.join(', ') : '' },
    { key: 'phone', label: 'Phone' }
  ]

  return (
    <div>
      <h2 className="page-header"><FileText size={22} /> Booking Report</h2>
      <FilterPanel fields={filterFields} onFilter={handleFilter} />
      <DataTable columns={columns} data={filtered} title="Booking_Report" showColumnToggle />
    </div>
  )
}
