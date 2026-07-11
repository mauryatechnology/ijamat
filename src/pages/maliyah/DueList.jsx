import { useState } from 'react'
import { useData } from '../../context/DataContext'
import FilterPanel from '../../components/ui/FilterPanel'
import DataTable from '../../components/ui/DataTable'
import { FileText } from 'lucide-react'
import { formatCurrency } from '../../utils/formatters'

export default function DueList() {
  const { dues, dropdownOptions } = useData()
  const [filtered, setFiltered] = useState(dues)

  const filterFields = [
    { key: 'head', label: 'Collection Head', type: 'select', options: dropdownOptions.collectionHeads },
    { key: 'mohalla', label: 'Location / Mohalla', type: 'select', options: dropdownOptions.mohallas },
    { key: 'session', label: 'Session', type: 'select', options: dropdownOptions.sessions }
  ]

  const handleFilter = (values) => {
    let result = [...dues]
    if (values.head) result = result.filter(d => d.head === values.head)
    if (values.mohalla) result = result.filter(d => d.mohalla === values.mohalla)
    if (values.session) result = result.filter(d => d.session === values.session)
    setFiltered(result)
  }

  const totalDue = filtered.reduce((s, d) => s + d.dueAmount, 0)
  const totalPaid = filtered.reduce((s, d) => s + d.paidAmount, 0)
  const totalBalance = filtered.reduce((s, d) => s + d.balance, 0)

  const columns = [
    { key: 'sabilNo', label: 'Sabil No.' },
    { key: 'name', label: 'Name' },
    { key: 'head', label: 'Head' },
    { key: 'mohalla', label: 'Mohalla' },
    { key: 'dueAmount', label: 'Due Amount', render: v => formatCurrency(v) },
    { key: 'paidAmount', label: 'Paid', render: v => formatCurrency(v) },
    { key: 'balance', label: 'Balance', render: v => <span className={v > 0 ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'}>{formatCurrency(v)}</span> },
    { key: 'session', label: 'Session' }
  ]

  return (
    <div>
      <h2 className="page-header"><FileText size={22} /> Due List</h2>
      <FilterPanel fields={filterFields} onFilter={handleFilter} />
      <div className="flex flex-wrap gap-6 mb-3 text-sm">
        <span>Total Due: <strong className="text-blue-600">{formatCurrency(totalDue)}</strong></span>
        <span>Total Paid: <strong className="text-emerald-600">{formatCurrency(totalPaid)}</strong></span>
        <span>Total Balance: <strong className="text-red-600">{formatCurrency(totalBalance)}</strong></span>
      </div>
      <DataTable columns={columns} data={filtered} title="Due_List" showColumnToggle />
    </div>
  )
}
