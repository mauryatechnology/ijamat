import { useState } from 'react'
import { useData } from '../../context/DataContext'
import FilterPanel from '../../components/ui/FilterPanel'
import DataTable from '../../components/ui/DataTable'
import { ClipboardList } from 'lucide-react'

export default function RSVPReport() {
  const { members, events, dropdownOptions } = useData()
  const [filtered, setFiltered] = useState([])
  const [hasSearched, setHasSearched] = useState(false)

  const eventOptions = events.map(e => ({ value: e.name, label: e.name }))

  const filterFields = [
    { key: 'event', label: 'Event', type: 'select', options: eventOptions },
    { key: 'mohalla', label: 'Location', type: 'select', options: dropdownOptions.mohallas },
    { key: 'gender', label: 'Gender', type: 'select', options: [{ value: 'M', label: 'Male' }, { value: 'F', label: 'Female' }] },
    { key: 'rsvpStatus', label: 'RSVP Status', type: 'select', options: dropdownOptions.rsvpStatuses }
  ]

  const handleFilter = (values) => {
    setHasSearched(true)
    let result = members.map((m, i) => ({
      ...m,
      rsvpStatus: i % 3 === 0 ? 'Confirm' : i % 3 === 1 ? 'Not Confirm' : 'Maybe',
      guest: i % 5 === 0 ? 1 : 0,
      masool: i < 5 ? 'Yes' : ''
    }))
    if (values.mohalla) result = result.filter(m => m.mohalla === values.mohalla)
    if (values.gender) result = result.filter(m => m.gender === values.gender)
    if (values.rsvpStatus) result = result.filter(m => m.rsvpStatus === values.rsvpStatus)
    setFiltered(result)
  }

  const columns = [
    { key: 'sNo', label: 'S.No.', render: (_, __, i) => i + 1 },
    { key: 'mohalla', label: 'Location', filterType: 'checkbox', filterOptions: dropdownOptions.mohallas },
    { key: 'sabilNo', label: 'Sabil No.' },
    { key: 'itsId', label: 'ITS ID' },
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' },
    { key: 'gender', label: 'Gender' },
    { key: 'misaaq', label: 'Misaaq' },
    { key: 'mobile', label: 'Mobile No.' },
    { key: 'rsvpStatus', label: 'RSVP Status', render: v => (
      <span className={`badge ${v === 'Confirm' ? 'badge-success' : v === 'Not Confirm' ? 'badge-danger' : 'badge-warning'}`}>{v}</span>
    )},
    { key: 'guest', label: 'Guest' },
    { key: 'masool', label: 'Masool' }
  ]

  return (
    <div>
      <h2 className="page-header"><ClipboardList size={22} /> RSVP Report</h2>
      <FilterPanel fields={filterFields} onFilter={handleFilter} />
      {hasSearched && <DataTable columns={columns} data={filtered} title="RSVP_Report" showColumnToggle />}
    </div>
  )
}
