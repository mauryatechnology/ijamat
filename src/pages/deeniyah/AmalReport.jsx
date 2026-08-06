import { useState } from 'react'
import { useData } from '../../context/DataContext'
import FilterPanel from '../../components/ui/FilterPanel'
import DataTable from '../../components/ui/DataTable'
import { BookOpen } from 'lucide-react'

export default function AmalReport() {
  const { members, dropdownOptions } = useData()
  const [filtered, setFiltered] = useState([])
  const [hasSearched, setHasSearched] = useState(false)

  const filterFields = [
    { key: 'amalType', label: 'Amal Type', type: 'select', options: dropdownOptions.amalTypes },
    { key: 'sector', label: 'Sector', type: 'select', options: dropdownOptions.sectors },
    { key: 'fromDate', label: 'From Date', type: 'date' },
    { key: 'toDate', label: 'To Date', type: 'date' }
  ]

  const handleFilter = (values) => {
    setHasSearched(true)
    // Generate sample amal data from members
    const amalData = members.filter(m => m.hofOrFm === 'HOF').map((m, i) => ({
      id: m.id,
      sabilNo: m.sabilNo,
      itsId: m.itsId,
      name: m.name,
      mohalla: m.mohalla,
      amalType: values.amalType || 'Namaz',
      status: i % 3 === 0 ? 'Present' : i % 3 === 1 ? 'Absent' : 'Excused',
      date: values.fromDate || '2020-11-16'
    }))
    let result = amalData
    if (values.sector) result = result.filter(a => members.find(m => m.itsId === a.itsId)?.sector === values.sector)
    setFiltered(result)
  }

  const columns = [
    { key: 'sabilNo', label: 'Sabil No.' },
    { key: 'itsId', label: 'ITS ID' },
    { key: 'name', label: 'Name' },
    { key: 'mohalla', label: 'Mohalla' },
    { key: 'amalType', label: 'Amal Type' },
    { key: 'status', label: 'Status', render: v => (
      <span className={`badge ${v === 'Present' ? 'badge-success' : v === 'Absent' ? 'badge-danger' : 'badge-warning'}`}>{v}</span>
    )},
    { key: 'date', label: 'Date' }
  ]

  return (
    <div>
      <h2 className="page-header"><BookOpen size={22} /> Amal Report</h2>
      <FilterPanel fields={filterFields} onFilter={handleFilter} />
      {hasSearched && <DataTable columns={columns} data={filtered} title="Amal_Report" showColumnToggle />}
    </div>
  )
}
