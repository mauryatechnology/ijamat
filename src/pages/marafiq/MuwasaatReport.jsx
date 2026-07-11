import { useState } from 'react'
import { useData } from '../../context/DataContext'
import FilterPanel from '../../components/ui/FilterPanel'
import DataTable from '../../components/ui/DataTable'
import { FileText } from 'lucide-react'
import { formatCurrency } from '../../utils/formatters'

export default function MuwasaatReport() {
  const { muwasaat } = useData()
  const [filtered, setFiltered] = useState(muwasaat)

  const filterFields = [
    { key: 'fromDate', label: 'From Date', type: 'date' },
    { key: 'toDate', label: 'To Date', type: 'date' },
    { key: 'mode', label: 'Mode', type: 'select', options: ['Cash', 'Cheque', 'Bank Transfer'] }
  ]

  const handleFilter = (values) => {
    let result = [...muwasaat]
    if (values.fromDate) result = result.filter(m => m.date >= values.fromDate)
    if (values.toDate) result = result.filter(m => m.date <= values.toDate)
    if (values.mode) result = result.filter(m => m.mode === values.mode)
    setFiltered(result)
  }

  const columns = [
    { key: 'date', label: 'Date' },
    { key: 'code', label: 'Code' },
    { key: 'issuedTo', label: 'Issued To' },
    { key: 'forPurpose', label: 'Purpose' },
    { key: 'amount', label: 'Amount', render: v => formatCurrency(v) },
    { key: 'mode', label: 'Mode' },
    { key: 'by', label: 'Issued By' },
    { key: 'status', label: 'Status', render: v => <span className={`badge ${v === 'Completed' ? 'badge-success' : 'badge-warning'}`}>{v}</span> }
  ]

  const totalAmount = filtered.reduce((s, m) => s + m.amount, 0)

  return (
    <div>
      <h2 className="page-header"><FileText size={22} /> Muwasaat Report</h2>
      <FilterPanel fields={filterFields} onFilter={handleFilter} />
      <div className="mb-3 text-sm font-medium">
        Total Issued Amount: <strong className="text-blue-600 text-lg">{formatCurrency(totalAmount)}</strong>
      </div>
      <DataTable columns={columns} data={filtered} title="Muwasaat_Report" />
    </div>
  )
}
