import { useState } from 'react'
import { useData } from '../../context/DataContext'
import DataTable from '../../components/ui/DataTable'
import { FileText, Search } from 'lucide-react'
import { formatCurrency } from '../../utils/formatters'

export default function IndividualLedger() {
  const { collections, dues, sabil } = useData()
  const [searchSabil, setSearchSabil] = useState('')
  const [selectedSabil, setSelectedSabil] = useState(null)

  const handleSearch = () => {
    const found = sabil.find(s => s.sabilNo === searchSabil)
    setSelectedSabil(found || null)
  }

  const sabilCollections = selectedSabil
    ? collections.filter(c => c.sabilNo === selectedSabil.sabilNo)
    : []

  const sabilDues = selectedSabil
    ? dues.filter(d => d.sabilNo === selectedSabil.sabilNo)
    : []

  const columns = [
    { key: 'date', label: 'Date' },
    { key: 'receiptNo', label: 'Receipt No.' },
    { key: 'head', label: 'Head' },
    { key: 'amount', label: 'Amount', render: v => formatCurrency(v) },
    { key: 'mode', label: 'Mode' },
    { key: 'remarks', label: 'Remarks' }
  ]

  const dueColumns = [
    { key: 'head', label: 'Head' },
    { key: 'dueAmount', label: 'Due Amount', render: v => formatCurrency(v) },
    { key: 'paidAmount', label: 'Paid', render: v => formatCurrency(v) },
    { key: 'balance', label: 'Balance', render: v => <span className={v > 0 ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'}>{formatCurrency(v)}</span> },
    { key: 'session', label: 'Session' }
  ]

  return (
    <div>
      <h2 className="page-header"><FileText size={22} /> Individual Ledger</h2>

      <div className="card mb-4">
        <div className="flex flex-wrap items-end gap-4">
          <div className="form-group">
            <label className="form-label">Sabil No.:</label>
            <input
              type="text"
              value={searchSabil}
              onChange={e => setSearchSabil(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              className="form-input w-40"
              placeholder="Enter Sabil No."
            />
          </div>
          <div className="form-group">
            <label className="form-label">Session:</label>
            <input type="text" value="2017-2018" readOnly className="form-input w-32 bg-gray-50" />
          </div>
          <button onClick={handleSearch} className="btn btn-info mb-0.5">
            <Search size={14} /> Search
          </button>
        </div>
      </div>

      {selectedSabil && (
        <>
          <div className="card mb-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div><span className="text-gray-500">Sabil No:</span> <strong>{selectedSabil.sabilNo}</strong></div>
              <div><span className="text-gray-500">Name:</span> <strong>{selectedSabil.name}</strong></div>
              <div><span className="text-gray-500">ITS ID:</span> <strong>{selectedSabil.itsId}</strong></div>
              <div><span className="text-gray-500">Mohalla:</span> <strong>{selectedSabil.mohalla}</strong></div>
              <div><span className="text-gray-500">Type:</span> <strong>{selectedSabil.type}</strong></div>
              <div><span className="text-gray-500">Status:</span> <span className="badge badge-success">{selectedSabil.status}</span></div>
            </div>
          </div>

          <h3 className="text-base font-semibold text-gray-700 mb-2">Outstanding Dues</h3>
          <DataTable columns={dueColumns} data={sabilDues} showFilters={false} showExport={false} showPagination={false} showSearch={false} />

          <h3 className="text-base font-semibold text-gray-700 mb-2 mt-4">Payment History</h3>
          <DataTable columns={columns} data={sabilCollections} showFilters={false} title="Ledger" />
        </>
      )}

      {searchSabil && !selectedSabil && (
        <div className="card text-center text-gray-400 py-8">No sabil found with number "{searchSabil}"</div>
      )}
    </div>
  )
}
