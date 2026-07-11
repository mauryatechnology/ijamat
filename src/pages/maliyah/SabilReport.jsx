import { useData } from '../../context/DataContext'
import DataTable from '../../components/ui/DataTable'
import { CreditCard } from 'lucide-react'
import { formatCurrency } from '../../utils/formatters'

export default function SabilReport() {
  const { sabil } = useData()

  const columns = [
    { key: 'sabilNo', label: 'Sabil No.' },
    { key: 'itsId', label: 'ITS ID' },
    { key: 'name', label: 'Name' },
    { key: 'type', label: 'Type' },
    { key: 'mohalla', label: 'Mohalla' },
    { key: 'takhmeen', label: 'Takhmeen', render: v => formatCurrency(v) },
    { key: 'openingBalance', label: 'Opening Bal.', render: v => formatCurrency(v) },
    { key: 'status', label: 'Status', render: v => <span className={`badge ${v === 'Active' ? 'badge-success' : 'badge-danger'}`}>{v}</span> },
    { key: 'startDate', label: 'Start Date' }
  ]

  return (
    <div>
      <h2 className="page-header"><CreditCard size={22} /> Sabil Report</h2>
      <DataTable columns={columns} data={sabil} title="Sabil_Report" showColumnToggle />
    </div>
  )
}
