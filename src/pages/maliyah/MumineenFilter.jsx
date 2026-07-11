import { useState } from 'react'
import { useData } from '../../context/DataContext'
import FilterPanel from '../../components/ui/FilterPanel'
import DataTable from '../../components/ui/DataTable'
import { Filter } from 'lucide-react'

export default function MumineenFilter() {
  const { members, dropdownOptions } = useData()
  const [filtered, setFiltered] = useState([])
  const [hasSearched, setHasSearched] = useState(false)

  const filterFields = [
    { key: 'mohalla', label: 'Location', type: 'select', options: dropdownOptions.mohallas },
    { key: 'sector', label: 'Sector', type: 'select', options: dropdownOptions.sectors },
    { key: 'gender', label: 'Gender', type: 'select', options: [{ value: 'M', label: 'Male' }, { value: 'F', label: 'Female' }] },
    { key: 'ageFrom', label: 'Age From', type: 'number', placeholder: '0' },
    { key: 'ageTo', label: 'Age To', type: 'number', placeholder: '100' },
    { key: 'maritalStatus', label: 'Marital Status', type: 'select', options: dropdownOptions.maritalStatuses },
    { key: 'bloodGroup', label: 'Blood Group', type: 'select', options: dropdownOptions.bloodGroups },
    { key: 'hofOrFm', label: 'HOF / FM', type: 'select', options: dropdownOptions.hofFm },
    { key: 'onlyHOF', label: 'HOF Only', type: 'checkbox', checkLabel: 'Show only HOF members' }
  ]

  const handleFilter = (values) => {
    setHasSearched(true)
    let result = [...members]
    if (values.mohalla) result = result.filter(m => m.mohalla === values.mohalla)
    if (values.sector) result = result.filter(m => m.sector === values.sector)
    if (values.gender) result = result.filter(m => m.gender === values.gender)
    if (values.ageFrom) result = result.filter(m => m.age >= Number(values.ageFrom))
    if (values.ageTo) result = result.filter(m => m.age <= Number(values.ageTo))
    if (values.maritalStatus) result = result.filter(m => m.maritalStatus === values.maritalStatus)
    if (values.bloodGroup) result = result.filter(m => m.bloodGroup === values.bloodGroup)
    if (values.hofOrFm) result = result.filter(m => m.hofOrFm === values.hofOrFm)
    if (values.onlyHOF) result = result.filter(m => m.hofOrFm === 'HOF')
    setFiltered(result)
  }

  const columns = [
    { key: 'sabilNo', label: 'Sabil' },
    { key: 'itsId', label: 'ITS ID' },
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' },
    { key: 'gender', label: 'Gender' },
    { key: 'hofOrFm', label: 'HOF/FM' },
    { key: 'mobile', label: 'Mobile' },
    { key: 'mohalla', label: 'Mohalla' },
    { key: 'maritalStatus', label: 'Misaaq' },
    { key: 'bloodGroup', label: 'Blood Group' },
    { key: 'occupation', label: 'Occupation' }
  ]

  return (
    <div>
      <h2 className="page-header"><Filter size={22} /> Mumineen Filter</h2>
      <FilterPanel fields={filterFields} onFilter={handleFilter} submitLabel="Filter" />
      {hasSearched && <DataTable columns={columns} data={filtered} title="Mumineen_Filter" showColumnToggle />}
    </div>
  )
}
