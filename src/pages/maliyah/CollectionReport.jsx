import { useState } from 'react'
import { useData } from '../../context/DataContext'
import FilterPanel from '../../components/ui/FilterPanel'
import DataTable from '../../components/ui/DataTable'
import { FileText } from 'lucide-react'
import { formatCurrency } from '../../utils/formatters'

export default function CollectionReport() {
  const { collections, dropdownOptions } = useData()
  const [filtered, setFiltered] = useState(collections)

  const filterFields = [
    { key: 'head', label: 'Collection Head', type: 'select', options: dropdownOptions.collectionHeads },
    { key: 'fromDate', label: 'From Date', type: 'date' },
    { key: 'toDate', label: 'To Date', type: 'date' },
    { key: 'mode', label: 'Mode', type: 'select', options: dropdownOptions.paymentModes },
    { key: 'collectedBy', label: 'Collected By', type: 'select', options: dropdownOptions.collectors }
  ]

  const handleFilter = (values) => {
    let result = [...collections]
    if (values.head) result = result.filter(c => c.head === values.head)
    if (values.fromDate) result = result.filter(c => c.date >= values.fromDate)
    if (values.toDate) result = result.filter(c => c.date <= values.toDate)
    if (values.mode) result = result.filter(c => c.mode === values.mode)
    if (values.collectedBy) result = result.filter(c => c.collectedBy === values.collectedBy)
    setFiltered(result)
  }

  const totalAmount = filtered.reduce((sum, c) => sum + c.amount, 0)

  const columns = [
    { key: 'date', label: 'Date' },
    { key: 'receiptNo', label: 'Receipt No.' },
    { key: 'sabilNo', label: 'Sabil' },
    { key: 'name', label: 'Name' },
    { key: 'head', label: 'Head' },
    { key: 'amount', label: 'Amount', render: v => formatCurrency(v) },
    { key: 'mode', label: 'Mode' },
    { key: 'collectedBy', label: 'Collected By' },
    { key: 'remarks', label: 'Remarks' }
  ]

  return (
    <div>
      <h2 className="page-header"><FileText size={22} /> Collection Report</h2>
      <FilterPanel fields={filterFields} onFilter={handleFilter} submitLabel="Show Report" />
      <div className="mb-2 text-sm font-medium text-gray-600">
        Total Collection: <span className="text-emerald-600 text-lg font-bold">{formatCurrency(totalAmount)}</span>
      </div>
      <DataTable columns={columns} data={filtered} title="Collection_Report" showColumnToggle />
    </div>
  )
}
