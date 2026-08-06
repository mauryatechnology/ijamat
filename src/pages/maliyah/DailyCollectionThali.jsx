import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { Utensils, Save, CheckCircle } from 'lucide-react'

export default function DailyCollectionThali() {
  const { thali, addCollection } = useData()
  const [sabilNo, setSabilNo] = useState('')
  const [amount, setAmount] = useState('')
  const [mode, setMode] = useState('Cash')
  const [collector, setCollector] = useState('Akbar bhai Rampura wala')

  const handleSubmit = (e) => {
    e.preventDefault()
    addCollection({
      date: new Date().toISOString().split('T')[0],
      receiptNo: `TH-${Math.floor(100 + Math.random() * 900)}`,
      sabilNo,
      name: thali.find(t => t.sabilNo === sabilNo)?.name || `Sabil #${sabilNo}`,
      head: 'FMB / Thali',
      amount: Number(amount),
      mode,
      collectedBy: collector,
      session: '2017-2018',
      remarks: 'Daily Thali Collection'
    })
    setAmount('')
    alert('Thali collection recorded successfully!')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Daily Collection (Thali)</h1>
        <p className="text-sm text-slate-500">Record daily Faiz ul Mawaid al Burhaniyah (FMB) thali contributions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="font-semibold text-slate-700 text-lg border-b pb-2 flex items-center gap-2">
            <Utensils size={18} className="text-amber-600" /> Thali Collection Entry
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-600 mb-1">Select Thali / Sabil</label>
              <select
                value={sabilNo}
                onChange={e => setSabilNo(e.target.value)}
                className="w-full p-2 border rounded-lg bg-slate-50 outline-none focus:border-blue-500"
                required
              >
                <option value="">-- Select Member --</option>
                {thali.map(t => (
                  <option key={t.id} value={t.sabilNo}>
                    Thali #{t.thaliNo} (Sabil #{t.sabilNo}) - {t.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-600 mb-1">Amount (₹)</label>
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="w-full p-2 border rounded-lg bg-slate-50"
                placeholder="Amount"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-600 mb-1">Payment Mode</label>
              <select
                value={mode}
                onChange={e => setMode(e.target.value)}
                className="w-full p-2 border rounded-lg bg-slate-50"
              >
                <option value="Cash">Cash</option>
                <option value="UPI">UPI</option>
                <option value="Cheque">Cheque</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-600 mb-1">Collected By</label>
              <input
                type="text"
                value={collector}
                onChange={e => setCollector(e.target.value)}
                className="w-full p-2 border rounded-lg bg-slate-50"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 rounded-lg text-sm flex items-center justify-center gap-2"
            >
              <Save size={16} /> Save Collection
            </button>
          </form>
        </div>

        <div className="md:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="font-semibold text-slate-700 text-lg mb-4">Active Thali Members</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-600 border-b">
                  <th className="p-3">Thali #</th>
                  <th className="p-3">Sabil #</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Size</th>
                  <th className="p-3">Mohalla</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {thali.map(t => (
                  <tr key={t.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-semibold text-amber-600">{t.thaliNo}</td>
                    <td className="p-3">{t.sabilNo}</td>
                    <td className="p-3 font-medium text-slate-800">{t.name}</td>
                    <td className="p-3">{t.size || 'Full'}</td>
                    <td className="p-3">{t.mohalla}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
