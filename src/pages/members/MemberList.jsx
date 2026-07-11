import { useState } from 'react'
import { useData } from '../../context/DataContext'
import FilterPanel from '../../components/ui/FilterPanel'
import DataTable from '../../components/ui/DataTable'
import { Users } from 'lucide-react'

export default function MemberList() {
  const { members, dropdownOptions } = useData()
  const [filtered, setFiltered] = useState(members)

  const filterFields = [
    { key: 'mohalla', label: 'Location', type: 'select', options: dropdownOptions.mohallas },
    { key: 'hofOrFm', label: 'HOF / FM', type: 'select', options: [{ value: 'HOF', label: 'HOF Only' }, { value: 'FM', label: 'FM Only' }] },
    { key: 'gender', label: 'Gender', type: 'select', options: [{ value: 'M', label: 'Male' }, { value: 'F', label: 'Female' }] },
    { key: 'ageFrom', label: 'Age From', type: 'number', placeholder: '0' },
    { key: 'ageTo', label: 'Age To', type: 'number', placeholder: '100' },
    { key: 'maritalStatus', label: 'Marital Status', type: 'select', options: dropdownOptions.maritalStatuses },
    { key: 'bloodGroup', label: 'Blood Group', type: 'select', options: dropdownOptions.bloodGroups }
  ]

  const handleFilter = (values) => {
    let result = [...members]
    if (values.mohalla) result = result.filter(m => m.mohalla === values.mohalla)
    if (values.hofOrFm) result = result.filter(m => m.hofOrFm === values.hofOrFm)
    if (values.gender) result = result.filter(m => m.gender === values.gender)
    if (values.ageFrom) result = result.filter(m => m.age >= Number(values.ageFrom))
    if (values.ageTo) result = result.filter(m => m.age <= Number(values.ageTo))
    if (values.maritalStatus) result = result.filter(m => m.maritalStatus === values.maritalStatus)
    if (values.bloodGroup) result = result.filter(m => m.bloodGroup === values.bloodGroup)
    setFiltered(result)
  }

  const columns = [
    { key: 'itsId', label: 'ITS ID' },
    { key: 'name', label: 'Name' },
    { key: 'sabilNo', label: 'Sabil' },
    { key: 'age', label: 'Age' },
    { key: 'gender', label: 'Gender' },
    { key: 'hofOrFm', label: 'HOF/FM', filterType: 'checkbox', filterOptions: ['HOF', 'FM'] },
    { key: 'mobile', label: 'Mobile' },
    { key: 'mohalla', label: 'Mohalla' },
    { key: 'occupation', label: 'Occupation' },
    { key: 'bloodGroup', label: 'Blood Group' },
    { key: 'isActive', label: 'Status', render: v => <span className={`badge ${v ? 'badge-success' : 'badge-danger'}`}>{v ? 'Active' : 'Inactive'}</span> }
  ]

  return (
    <div>
      <h2 className="page-header"><Users size={22} /> Member Directory</h2>
      <FilterPanel fields={filterFields} onFilter={handleFilter} submitLabel="Apply Filters" />
      <DataTable columns={columns} data={filtered} title="Member_Directory" showColumnToggle />
    </div>
  )
}
