import { useState } from 'react'
import { useData } from '../../context/DataContext'
import FilterPanel from '../../components/ui/FilterPanel'
import DataTable from '../../components/ui/DataTable'
import { BookOpen } from 'lucide-react'
import { formatCurrency } from '../../utils/formatters'

export default function DayBook() {
  const { vouchers } = useData()
  const [filtered, setFiltered] = useState(vouchers)

  const filterFields = [
    { key: 'fromDate', label: 'From Date', type: 'date', defaultValue: '2020-11-16' },
    { key: 'toDate', label: 'To Date', type: 'date', defaultValue: '2020-11-21' }
  ]

  const handleFilter = (values) => {
    let result = [...vouchers]
    if (values.fromDate) result = result.filter(v => v.date >= values.fromDate)
    if (values.toDate) result = result.filter(v => v.date <= values.toDate)
    setFiltered(result)
  }

  const columns = [
    { key: 'date', label: 'Date' },
    { key: 'voucherNo', label: 'Voucher No.' },
    { key: 'type', label: 'Type', render: v => <span className={`badge ${v === 'Receipt' ? 'badge-success' : v === 'Payment' ? 'badge-danger' : 'badge-info'}`}>{v}</span> },
    { key: 'narration', label: 'Narration' },
    { key: 'debitAccount', label: 'Debit' },
    { key: 'creditAccount', label: 'Credit' },
    { key: 'amount', label: 'Amount', render: v => formatCurrency(v) }
  ]

  return (
    <div>
      <h2 className="page-header"><BookOpen size={22} /> Day Book</h2>
      <FilterPanel fields={filterFields} onFilter={handleFilter} />
      <DataTable columns={columns} data={filtered} title="Day_Book" />
    </div>
  )
}
