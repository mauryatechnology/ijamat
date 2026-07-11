import { useState } from 'react'
import { useData } from '../../context/DataContext'
import FilterPanel from '../../components/ui/FilterPanel'
import DataTable from '../../components/ui/DataTable'
import { GraduationCap } from 'lucide-react'

export default function SabaqAttendance() {
  const { attendance, dropdownOptions } = useData()
  const [filtered, setFiltered] = useState(attendance)

  const filterFields = [
    { key: 'group', label: 'Group', type: 'select', options: ['Sabaq Group A', 'Sabaq Group B', 'Sabaq Group C'] },
    { key: 'type', label: 'Type', type: 'select', options: ['Quran', 'Deeni Taalim', 'Hifzul Quran'] },
    { key: 'fromDate', label: 'From Date', type: 'date' },
    { key: 'toDate', label: 'To Date', type: 'date' }
  ]

  const handleFilter = (values) => {
    let result = [...attendance]
    if (values.group) result = result.filter(a => a.group === values.group)
    if (values.type) result = result.filter(a => a.type === values.type)
    if (values.fromDate) result = result.filter(a => a.date >= values.fromDate)
    if (values.toDate) result = result.filter(a => a.date <= values.toDate)
    setFiltered(result)
  }

  const columns = [
    { key: 'date', label: 'Date' },
    { key: 'group', label: 'Group' },
    { key: 'type', label: 'Type' },
    { key: 'presentCount', label: 'Present' },
    { key: 'totalCount', label: 'Total' },
    { key: 'percentage', label: 'Attendance %', render: (_, row) => {
      const pct = ((row.presentCount / row.totalCount) * 100).toFixed(0)
      return <span className={`font-semibold ${pct >= 80 ? 'text-green-600' : pct >= 50 ? 'text-amber-600' : 'text-red-600'}`}>{pct}%</span>
    }},
    { key: 'absentees', label: 'Absentees', render: v => Array.isArray(v) && v.length > 0 ? v.join(', ') : '—' }
  ]

  return (
    <div>
      <h2 className="page-header"><GraduationCap size={22} /> Sabaq Attendance Report</h2>
      <FilterPanel fields={filterFields} onFilter={handleFilter} />
      <DataTable columns={columns} data={filtered} title="Sabaq_Attendance" />
    </div>
  )
}
