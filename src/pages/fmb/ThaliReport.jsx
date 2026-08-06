import { useState } from 'react'
import { useData } from '../../context/DataContext'
import FilterPanel from '../../components/ui/FilterPanel'
import DataTable from '../../components/ui/DataTable'
import { FileText } from 'lucide-react'

export default function ThaliReport() {
  const { thali, dropdownOptions } = useData()
  const [filtered, setFiltered] = useState(thali)

  const filterFields = [
    { key: 'mohalla', label: 'Location', type: 'select', options: dropdownOptions.mohallas },
    { key: 'status', label: 'Status', type: 'select', options: dropdownOptions.thaliStatuses },
    { key: 'size', label: 'Size', type: 'select', options: dropdownOptions.thaliSizes }
  ]

  const handleFilter = (values) => {
    let result = [...thali]
    if (values.mohalla) result = result.filter(t => t.mohalla === values.mohalla)
    if (values.status) result = result.filter(t => t.status === values.status)
    if (values.size) result = result.filter(t => t.size === values.size)
    setFiltered(result)
  }

  const columns = [
    { key: 'thaliNo', label: 'Thali No.' },
    { key: 'sabilNo', label: 'Sabil' },
    { key: 'itsId', label: 'ITS ID' },
    { key: 'name', label: 'Name' },
    { key: 'size', label: 'Size' },
    { key: 'mohalla', label: 'Mohalla' },
    { key: 'distributor', label: 'Distributor' },
    { key: 'status', label: 'Status', render: v => <span className={`badge ${v === 'Active' ? 'badge-success' : 'badge-danger'}`}>{v}</span> },
    { key: 'startDate', label: 'Start Date' }
  ]

  return (
    <div>
      <h2 className="page-header"><FileText size={22} /> Thali Report</h2>
      <FilterPanel fields={filterFields} onFilter={handleFilter} />
      <DataTable columns={columns} data={filtered} title="Thali_Report" showColumnToggle />
    </div>
  )
}
