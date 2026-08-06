import { useState } from 'react'
import { useData } from '../../../context/DataContext'
import { Save } from 'lucide-react'

export default function RegManual() {
  const { addFmbRegistration, dropdownOptions } = useData()
  const [thaliNo, setThaliNo] = useState('')
  const [sabilNo, setSabilNo] = useState('')
  const [name, setName] = useState('')
  const [size, setSize] = useState('Full')
  const [mohalla, setMohalla] = useState('Saifee Mohalla')
  const [distributor, setDistributor] = useState('Zone A - Akbar bhai Rampura wala')

  const handleSubmit = (e) => {
    e.preventDefault()
    addFmbRegistration({
      thaliNo,
      sabilNo,
      name,
      size,
      mohalla,
      distributor,
      status: 'Active',
      registrationDate: new Date().toISOString().split('T')[0]
    })
    alert(`Thali #${thaliNo} manually registered!`)
    setThaliNo('')
    setSabilNo('')
    setName('')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Manual Thali Registration</h1>
        <p className="text-sm text-slate-500">Manually register or override FMB thali allocation</p>
      </div>

      <div className="max-w-xl bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Thali Number</label>
              <input type="text" value={thaliNo} onChange={e => setThaliNo(e.target.value)} placeholder="T-001" className="w-full p-2 border rounded bg-slate-50" required />
            </div>
            <div>
              <label className="block font-semibold mb-1">Sabil Number</label>
              <input type="text" value={sabilNo} onChange={e => setSabilNo(e.target.value)} placeholder="Sabil #" className="w-full p-2 border rounded bg-slate-50" required />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Member Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" className="w-full p-2 border rounded bg-slate-50" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Thali Size</label>
              <select value={size} onChange={e => setSize(e.target.value)} className="w-full p-2 border rounded bg-slate-50">
                <option value="Full">Full</option>
                <option value="Half">Half</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1">Mohalla</label>
              <select value={mohalla} onChange={e => setMohalla(e.target.value)} className="w-full p-2 border rounded bg-slate-50">
                {dropdownOptions.mohallas.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Distributor Zone</label>
            <select value={distributor} onChange={e => setDistributor(e.target.value)} className="w-full p-2 border rounded bg-slate-50">
              {dropdownOptions.dispatchZones.map(z => <option key={z} value={z}>{z}</option>)}
            </select>
          </div>

          <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-lg text-sm flex items-center justify-center gap-2">
            <Save size={16} /> Save Manual Registration
          </button>
        </form>
      </div>
    </div>
  )
}

export function RegReport() {
  const { fmbRegistration } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">FMB Registration Master Report</h1>
        <p className="text-sm text-slate-500">Comprehensive report of all registered FMB thalis</p>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Thali #</th>
              <th className="p-3">Sabil #</th>
              <th className="p-3">Name</th>
              <th className="p-3">Mohalla</th>
              <th className="p-3">Size</th>
              <th className="p-3">Reg Date</th>
              <th className="p-3">Distributor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {fmbRegistration.registrations.map(r => (
              <tr key={r.id}>
                <td className="p-3 font-mono font-semibold text-amber-600">{r.thaliNo}</td>
                <td className="p-3">{r.sabilNo}</td>
                <td className="p-3 font-medium">{r.name}</td>
                <td className="p-3">{r.mohalla}</td>
                <td className="p-3">{r.size}</td>
                <td className="p-3">{r.registrationDate}</td>
                <td className="p-3 text-slate-600">{r.distributor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function DispatchScan() {
  const { fmbRegistration, updateFmbDispatch } = useData()
  const [scanCode, setScanCode] = useState('')

  const handleScan = (e) => {
    e.preventDefault()
    const found = fmbRegistration.registrations.find(r => r.thaliNo === scanCode || r.sabilNo === scanCode)
    if (found) {
      updateFmbDispatch(found.id, { dispatchStatus: 'Dispatched', lastDispatchDate: new Date().toISOString().split('T')[0] })
      alert(`Thali #${found.thaliNo} dispatched successfully!`)
      setScanCode('')
    } else {
      alert('Thali code not found!')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Daily Dispatch Scanning (Barcode / RFID)</h1>
        <p className="text-sm text-slate-500">Scan thali barcode during kitchen dispatch</p>
      </div>

      <div className="max-w-md bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs space-y-4">
        <form onSubmit={handleScan} className="space-y-3">
          <label className="block font-semibold">Scan Barcode / Thali No</label>
          <input
            type="text"
            value={scanCode}
            onChange={e => setScanCode(e.target.value)}
            placeholder="Scan T-001..."
            className="w-full p-3 border-2 border-blue-500 rounded text-base font-mono bg-blue-50/50 outline-none"
            autoFocus
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-medium">Record Dispatch</button>
        </form>
      </div>
    </div>
  )
}

export function DispatchReport() {
  const { fmbRegistration } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Daily Dispatch Audit Report</h1>
        <p className="text-sm text-slate-500">Log of daily scanned thali dispatches</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Thali #</th>
              <th className="p-3">Sabil #</th>
              <th className="p-3">Name</th>
              <th className="p-3">Dispatch Status</th>
              <th className="p-3">Last Dispatched</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {fmbRegistration.registrations.map(r => (
              <tr key={r.id}>
                <td className="p-3 font-mono font-semibold text-amber-600">{r.thaliNo}</td>
                <td className="p-3">{r.sabilNo}</td>
                <td className="p-3 font-medium">{r.name}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${r.dispatchStatus === 'Dispatched' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                    {r.dispatchStatus}
                  </span>
                </td>
                <td className="p-3 text-slate-600">{r.lastDispatchDate || 'Not scanned today'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function ThaliDistributor() {
  const { fmbRegistration } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Distributor Thali Information</h1>
        <p className="text-sm text-slate-500">Thali lists grouped by assigned distributor zones</p>
      </div>

      <div className="space-y-4 text-xs">
        {fmbRegistration.setup.distributors.map(d => {
          const list = fmbRegistration.registrations.filter(r => r.distributor === d)
          return (
            <div key={d} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <h2 className="font-bold text-base text-blue-700 border-b pb-2">{d} ({list.length} Thalis)</h2>
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-100 border-b">
                    <th className="p-2">Thali #</th>
                    <th className="p-2">Name</th>
                    <th className="p-2">Size</th>
                    <th className="p-2">Mohalla</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {list.map(r => (
                    <tr key={r.id}>
                      <td className="p-2 font-mono font-semibold">{r.thaliNo}</td>
                      <td className="p-2 font-medium">{r.name}</td>
                      <td className="p-2">{r.size}</td>
                      <td className="p-2 text-slate-600">{r.mohalla}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        })}
      </div>
    </div>
  )
}
