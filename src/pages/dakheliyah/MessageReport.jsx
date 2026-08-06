import { useState } from 'react'
import { useData } from '../../context/DataContext'
import FilterPanel from '../../components/ui/FilterPanel'
import DataTable from '../../components/ui/DataTable'
import { MessageSquare } from 'lucide-react'

export default function MessageReport() {
  const { messages } = useData()
  const [filtered, setFiltered] = useState(messages)

  const filterFields = [
    { key: 'fromDate', label: 'From Date', type: 'date' },
    { key: 'toDate', label: 'To Date', type: 'date' },
    { key: 'type', label: 'Type', type: 'select', options: ['SMS', 'WhatsApp'] }
  ]

  const handleFilter = (values) => {
    let result = [...messages]
    if (values.fromDate) result = result.filter(m => m.date >= values.fromDate)
    if (values.toDate) result = result.filter(m => m.date <= values.toDate)
    if (values.type) result = result.filter(m => m.type === values.type)
    setFiltered(result)
  }

  const columns = [
    { key: 'date', label: 'Date' },
    { key: 'to', label: 'Sent To' },
    { key: 'type', label: 'Type', render: v => <span className={`badge ${v === 'WhatsApp' ? 'badge-success' : 'badge-info'}`}>{v}</span> },
    { key: 'message', label: 'Message', render: v => <span className="text-xs line-clamp-2">{v}</span> },
    { key: 'recipients', label: 'Recipients' },
    { key: 'status', label: 'Status', render: v => <span className={`badge ${v === 'Delivered' ? 'badge-success' : 'badge-danger'}`}>{v}</span> },
    { key: 'sentBy', label: 'Sent By' }
  ]

  return (
    <div>
      <h2 className="page-header"><MessageSquare size={22} /> Message Report</h2>
      <FilterPanel fields={filterFields} onFilter={handleFilter} />
      <DataTable columns={columns} data={filtered} title="Message_Report" />
    </div>
  )
}
