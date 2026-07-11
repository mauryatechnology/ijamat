import { useState } from 'react'
import { useData } from '../../context/DataContext'
import FilterPanel from '../../components/ui/FilterPanel'
import DataTable from '../../components/ui/DataTable'
import { Globe } from 'lucide-react'

export default function KharejiyahReport() {
  const { members, dropdownOptions } = useData()
  const [filtered, setFiltered] = useState([])
  const [hasSearched, setHasSearched] = useState(false)

  const filterFields = [
    { key: 'sector', label: 'Sector', type: 'select', options: dropdownOptions.sectors },
    { key: 'mohalla', label: 'Location', type: 'select', options: dropdownOptions.mohallas },
    { key: 'hofOrFm', label: 'HOF / All', type: 'select', options: [{ value: 'HOF', label: 'HOF Only' }, { value: '', label: 'All Members' }] }
  ]

  const handleFilter = (values) => {
    setHasSearched(true)
    let result = [...members]
    if (values.sector) result = result.filter(m => m.sector === values.sector)
    if (values.mohalla) result = result.filter(m => m.mohalla === values.mohalla)
    if (values.hofOrFm) result = result.filter(m => m.hofOrFm === values.hofOrFm)
    setFiltered(result)
  }

  const columns = [
    { key: 'itsId', label: 'ITS ID' },
    { key: 'name', label: 'Name' },
    { key: 'hofOrFm', label: 'HOF/FM' },
    { key: 'age', label: 'Age' },
    { key: 'gender', label: 'Gender' },
    { key: 'mobile', label: 'Mobile' },
    { key: 'mohalla', label: 'Mohalla' },
    { key: 'address', label: 'Address' }
  ]

  return (
    <div>
      <h2 className="page-header"><Globe size={22} /> Kharejiyah Report</h2>
      <FilterPanel fields={filterFields} onFilter={handleFilter} />
      {hasSearched && <DataTable columns={columns} data={filtered} title="Kharejiyah_Report" showColumnToggle />}
    </div>
  )
}
