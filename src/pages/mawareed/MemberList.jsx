import { useData } from '../../context/DataContext'
import DataTable from '../../components/ui/DataTable'
import { Users } from 'lucide-react'

export default function MemberList() {
  const { members } = useData()

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
      <h2 className="page-header"><Users size={22} /> Member List</h2>
      <DataTable columns={columns} data={members} title="Member_List" showColumnToggle />
    </div>
  )
}
