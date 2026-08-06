import { useState } from 'react'
import { useData } from '../../context/DataContext'
import DataTable from '../../components/ui/DataTable'
import { showToast } from '../../components/ui/Toast'
import { Utensils, Search } from 'lucide-react'

export default function ThaliMaster() {
  const { thali, members } = useData()
  const [searchType, setSearchType] = useState('sabil')
  const [searchVal, setSearchVal] = useState('')
  const [result, setResult] = useState(null)

  const handleSearch = () => {
    if (!searchVal) return
    let found
    if (searchType === 'sabil') found = thali.find(t => t.sabilNo === searchVal)
    else if (searchType === 'its') found = thali.find(t => t.itsId === searchVal)
    else if (searchType === 'thali') found = thali.find(t => t.thaliNo === searchVal)
    setResult(found || 'not_found')
  }

  return (
    <div>
      <h2 className="page-header"><Utensils size={22} /> Thali Master Entry</h2>
      <div className="card mb-4">
        <p className="text-sm text-gray-600 mb-3">Search by:</p>
        <div className="flex flex-wrap items-end gap-4">
          <div className="form-group">
            <select value={searchType} onChange={e => setSearchType(e.target.value)} className="form-select">
              <option value="sabil">Sabil No.</option>
              <option value="its">ITS ID</option>
              <option value="thali">Thali No.</option>
            </select>
          </div>
          <div className="form-group">
            <input type="text" value={searchVal} onChange={e => setSearchVal(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()} className="form-input w-48" placeholder="Enter value..." />
          </div>
          <button onClick={handleSearch} className="btn btn-info"><Search size={14} /> Search</button>
        </div>
      </div>

      {result && result !== 'not_found' && (
        <div className="card">
          <h3 className="text-base font-semibold text-gray-700 mb-3">Thali Details</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div><span className="text-gray-500">Thali No:</span> <strong>{result.thaliNo}</strong></div>
            <div><span className="text-gray-500">Sabil No:</span> <strong>{result.sabilNo}</strong></div>
            <div><span className="text-gray-500">Name:</span> <strong>{result.name}</strong></div>
            <div><span className="text-gray-500">Size:</span> <strong>{result.size}</strong></div>
            <div><span className="text-gray-500">Mohalla:</span> <strong>{result.mohalla}</strong></div>
            <div><span className="text-gray-500">Distributor:</span> <strong>{result.distributor}</strong></div>
            <div><span className="text-gray-500">Status:</span> <span className={`badge ${result.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>{result.status}</span></div>
            <div><span className="text-gray-500">Start Date:</span> <strong>{result.startDate}</strong></div>
          </div>
        </div>
      )}
      {result === 'not_found' && <div className="card text-center text-gray-400 py-6">No thali record found</div>}
    </div>
  )
}
