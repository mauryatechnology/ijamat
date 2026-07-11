import { useState } from 'react'
import { useData } from '../../context/DataContext'
import FilterPanel from '../../components/ui/FilterPanel'
import DataTable from '../../components/ui/DataTable'
import { Users } from 'lucide-react'

export default function HOFList() {
  const { members, dropdownOptions } = useData()
  const [filtered, setFiltered] = useState(members)

  const filterFields = [
    { key: 'mohalla', label: 'Location', type: 'select', options: dropdownOptions.mohallas },
    { key: 'sector', label: 'Sector', type: 'select', options: dropdownOptions.sectors },
    { key: 'hofOrFm', label: 'HOF / FM', type: 'select', options: dropdownOptions.hofFm },
    { key: 'gender', label: 'Gender', type: 'select', options: [{ value: 'M', label: 'Male' }, { value: 'F', label: 'Female' }] }
  ]

  const handleFilter = (values) => {
    let result = [...members]
    if (values.mohalla) result = result.filter(m => m.mohalla === values.mohalla)
    if (values.sector) result = result.filter(m => m.sector === values.sector)
    if (values.hofOrFm) result = result.filter(m => m.hofOrFm === values.hofOrFm)
    if (values.gender) result = result.filter(m => m.gender === values.gender)
    setFiltered(result)
  }

  const columns = [
    { key: 'photo', label: 'Photo', sortable: false, filterable: false, width: '60px',
      render: () => (
        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
          <Users size={16} className="text-gray-400" />
        </div>
      )
    },
    { key: 'itsId', label: 'ITS ID' },
    { key: 'name', label: 'Name' },
    { key: 'hofOrFm', label: 'HOF/FM', filterType: 'checkbox', filterOptions: ['HOF', 'FM'] },
    { key: 'age', label: 'Age' },
    { key: 'gender', label: 'Gender' },
    { key: 'mobile', label: 'Personal Mobile No.' },
    { key: 'address', label: 'Address' },
    { key: 'mohalla', label: 'Mohalla', filterType: 'checkbox', filterOptions: dropdownOptions.mohallas }
  ]

  return (
    <div>
      <h2 className="page-header"><Users size={22} /> HOF List</h2>
      <FilterPanel fields={filterFields} onFilter={handleFilter} />
      <DataTable columns={columns} data={filtered} title="HOF_List" showColumnToggle />
    </div>
  )
}
