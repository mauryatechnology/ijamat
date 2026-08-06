import { useData } from '../../context/DataContext'
import DataTable from '../../components/ui/DataTable'
import { PieChart, Users } from 'lucide-react'
import { formatCurrency } from '../../utils/formatters'

export default function QardanHasana() {
  const { qardanHasana } = useData()

  const columns = [
    { key: 'photo', label: 'Photo', sortable: false, filterable: false, width: '60px',
      render: () => <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center"><Users size={16} className="text-gray-400" /></div>
    },
    { key: 'itsId', label: 'ITS ID' },
    { key: 'name', label: 'Name' },
    { key: 'formNo', label: 'Form No.' },
    { key: 'hofOrFm', label: 'HOF/FM' },
    { key: 'age', label: 'Age' },
    { key: 'gender', label: 'Gender' },
    { key: 'purpose', label: 'Purpose' },
    { key: 'amountApproved', label: 'Approved', render: v => formatCurrency(v) },
    { key: 'amountPaid', label: 'Paid', render: v => formatCurrency(v) },
    { key: 'balance', label: 'Balance', render: v => <span className={v > 0 ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'}>{formatCurrency(v)}</span> },
    { key: 'status', label: 'Status', render: v => <span className={`badge ${v === 'Active' ? 'badge-warning' : 'badge-success'}`}>{v}</span> },
    { key: 'husainSchemeActive', label: 'Husain Scheme', filterType: 'checkbox', filterOptions: ['Yes', 'No'] }
  ]

  return (
    <div>
      <h2 className="page-header"><PieChart size={22} /> Qardan Hasana Report</h2>
      <DataTable columns={columns} data={qardanHasana} title="Qardan_Hasana" showColumnToggle />
    </div>
  )
}
