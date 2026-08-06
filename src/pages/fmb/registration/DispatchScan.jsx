import { useState } from 'react'
import { useData } from '../../../context/DataContext'
import { QrCode, CheckCircle2 } from 'lucide-react'

export default function DispatchScan() {
  const { thalis } = useData()
  const [scannedCode, setScannedCode] = useState('')
  const [scannedItem, setScannedItem] = useState(null)

  const handleScan = (e) => {
    e.preventDefault()
    const found = thalis.find(t => t.thaliNo === scannedCode || t.itsId === scannedCode)
    setScannedItem(found || 'not_found')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <QrCode className="text-blue-600" /> RFID / Barcode Dispatch Scan Terminal
        </h1>
        <p className="text-sm text-slate-500">Scan thali barcode or enter thali number during daily dispatch</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm max-w-lg text-xs space-y-4">
        <form onSubmit={handleScan} className="flex gap-2">
          <input
            type="text"
            value={scannedCode}
            onChange={e => setScannedCode(e.target.value)}
            placeholder="Scan Thali Barcode / T-01..."
            className="flex-1 p-2.5 border rounded-lg bg-slate-50 text-sm outline-none focus:bg-white"
            autoFocus
          />
          <button type="submit" className="px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
            Dispatch
          </button>
        </form>

        {scannedItem && scannedItem !== 'not_found' && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 flex items-center gap-3">
            <CheckCircle2 size={24} className="text-emerald-600" />
            <div>
              <p className="font-bold text-sm">Dispatched Thali #{scannedItem.thaliNo}</p>
              <p className="text-xs text-emerald-700">{scannedItem.name} | {scannedItem.location}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
