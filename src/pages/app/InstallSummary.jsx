import { useState } from 'react'
import { useData } from '../../context/DataContext'
import FilterPanel from '../../components/ui/FilterPanel'
import DataTable from '../../components/ui/DataTable'
import StatCard from '../../components/ui/StatCard'
import { Smartphone, Users, Download } from 'lucide-react'

export default function InstallSummary() {
  const { members, dropdownOptions } = useData()
  const [filtered, setFiltered] = useState([])
  const [hasSearched, setHasSearched] = useState(false)

  const filterFields = [
    { key: 'mohalla', label: 'Mohalla', type: 'select', options: dropdownOptions.mohallas },
    { key: 'reportType', label: 'Report Type', type: 'select', options: ['Summary', 'Detail'] }
  ]

  const handleFilter = (values) => {
    setHasSearched(true)
    const mohallas = values.mohalla ? [values.mohalla] : dropdownOptions.mohallas
    const summary = mohallas.map(m => {
      const mohallaMembers = members.filter(mem => mem.mohalla === m)
      const hofCount = mohallaMembers.filter(mem => mem.hofOrFm === 'HOF').length
      return {
        id: m,
        sector: 'Mohammedi',
        mohalla: m,
        familyNos: hofCount,
        totalMembers: mohallaMembers.length,
        installed: Math.floor(mohallaMembers.length * 0.7),
        notInstalled: Math.ceil(mohallaMembers.length * 0.3),
        percentage: '70%'
      }
    })
    setFiltered(summary)
  }

  const columns = [
    { key: 'sector', label: 'Sector' },
    { key: 'mohalla', label: 'Mohalla' },
    { key: 'familyNos', label: 'Family Nos' },
    { key: 'totalMembers', label: 'Total Members' },
    { key: 'installed', label: 'Installed', render: v => <span className="text-green-600 font-semibold">{v}</span> },
    { key: 'notInstalled', label: 'Not Installed', render: v => <span className="text-red-600 font-semibold">{v}</span> },
    { key: 'percentage', label: 'Install %' }
  ]

  return (
    <div>
      <h2 className="page-header"><Smartphone size={22} /> App Install Summary</h2>
      <FilterPanel fields={filterFields} onFilter={handleFilter} />
      {hasSearched && <DataTable columns={columns} data={filtered} title="Install_Summary" />}
    </div>
  )
}
