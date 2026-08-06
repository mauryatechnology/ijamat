import { useState } from 'react'
import { Upload, FileSpreadsheet, Check } from 'lucide-react'

export default function ImportReceipt() {
  const [file, setFile] = useState(null)
  const [uploaded, setUploaded] = useState(false)

  const handleUpload = (e) => {
    e.preventDefault()
    if (!file) return
    setUploaded(true)
    setTimeout(() => {
      alert('15 receipts imported into Daily Collection successfully!')
      setUploaded(false)
      setFile(null)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Bulk Import Receipts (Excel / CSV)</h1>
        <p className="text-sm text-slate-500">Upload bulk collection receipt files from bank statements or offline logs</p>
      </div>

      <div className="max-w-xl bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 text-xs">
        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center space-y-3 bg-slate-50">
          <FileSpreadsheet size={40} className="mx-auto text-emerald-600" />
          <div>
            <span className="font-semibold text-slate-700 block">Drag & Drop CSV / Excel file here</span>
            <span className="text-slate-400 text-[11px]">Supports .xlsx, .xls, .csv files</span>
          </div>
          <input
            type="file"
            accept=".csv, .xlsx, .xls"
            onChange={e => setFile(e.target.files[0])}
            className="hidden"
            id="receipt-file-input"
          />
          <label htmlFor="receipt-file-input" className="inline-block px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg text-slate-700 cursor-pointer font-medium">
            Browse File
          </label>
          {file && <div className="text-emerald-700 font-semibold mt-2">Selected: {file.name}</div>}
        </div>

        <button
          onClick={handleUpload}
          disabled={!file || uploaded}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-lg text-sm flex items-center justify-center gap-2 disabled:bg-slate-300"
        >
          <Upload size={16} /> {uploaded ? 'Importing Data...' : 'Start Import'}
        </button>
      </div>
    </div>
  )
}
