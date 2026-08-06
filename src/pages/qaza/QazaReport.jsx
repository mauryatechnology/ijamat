import { useState } from 'react'
import { useData } from '../../context/DataContext'
import FilterPanel from '../../components/ui/FilterPanel'
import DataTable from '../../components/ui/DataTable'
import { Scale, Users } from 'lucide-react'
import { formatCurrency } from '../../utils/formatters'

export default function QazaReport() {
  const { members, dropdownOptions } = useData()
  const [filtered, setFiltered] = useState([])
  const [hasSearched, setHasSearched] = useState(false)

  const filterFields = [
    { key: 'for', label: 'For', type: 'select', options: dropdownOptions.qazaOptions },
    { key: 'hofOrFm', label: 'HOF / All', type: 'select', options: [{ value: 'HOF', label: 'HOF Only' }, { value: '', label: 'All Members' }] },
    { key: 'sector', label: 'Sector', type: 'select', options: dropdownOptions.sectors },
    { key: 'gender', label: 'Gender', type: 'select', options: [{ value: 'M', label: 'Male' }, { value: 'F', label: 'Female' }] },
    { key: 'ageFrom', label: 'Age From', type: 'number', placeholder: '0' },
    { key: 'ageTo', label: 'Age To', type: 'number', placeholder: '100' }
  ]

  const handleFilter = (values) => {
    setHasSearched(true)
    let result = [...members]
    if (values.hofOrFm) result = result.filter(m => m.hofOrFm === values.hofOrFm)
    if (values.sector) result = result.filter(m => m.sector === values.sector)
    if (values.gender) result = result.filter(m => m.gender === values.gender)
    if (values.ageFrom) result = result.filter(m => m.age >= Number(values.ageFrom))
    if (values.ageTo) result = result.filter(m => m.age <= Number(values.ageTo))
    setFiltered(result)
  }

  const columns = [
    { key: 'photo', label: 'Photo', sortable: false, filterable: false, width: '60px',
      render: () => <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center"><Users size={16} className="text-gray-400" /></div>
    },
    { key: 'itsId', label: 'ITS ID' },
    { key: 'name', label: 'Name' },
    { key: 'hofOrFm', label: 'HOF/FM', filterType: 'checkbox', filterOptions: ['HOF', 'FM'] },
    { key: 'age', label: 'Age' },
    { key: 'mobile', label: 'Personal Mobile No.' },
    { key: 'address', label: 'Address' }
  ]

  return (
    <div>
      <h2 className="page-header"><Scale size={22} /> Umoor Qaza Report</h2>
      <FilterPanel fields={filterFields} onFilter={handleFilter} />
      {hasSearched && <DataTable columns={columns} data={filtered} title="Qaza_Report" showColumnToggle />}
    </div>
  )
}
