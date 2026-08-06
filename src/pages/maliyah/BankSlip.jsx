import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { Printer, Building2 } from 'lucide-react'

export default function BankSlip() {
  const { bankReconciliation } = useData()
  const [bank, setBank] = useState('State Bank of India')

  const filteredCheques = bankReconciliation.filter(b => b.bank === bank)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Bank Cheque Deposit Slip</h1>
          <p className="text-sm text-slate-500">Prepare bank pay-in slip for cheque deposits</p>
        </div>
        <button onClick={() => window.print()} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2">
          <Printer size={16} /> Print Bank Slip
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex gap-4 items-center print:hidden text-xs">
        <label className="font-semibold text-slate-600">Select Bank:</label>
        <select value={bank} onChange={e => setBank(e.target.value)} className="p-2 border rounded bg-slate-50">
          <option value="State Bank of India">State Bank of India</option>
          <option value="HDFC Bank">HDFC Bank</option>
          <option value="Bank of Baroda">Bank of Baroda</option>
          <option value="ICICI Bank">ICICI Bank</option>
        </select>
      </div>

      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm max-w-2xl mx-auto space-y-4 text-xs">
        <div className="flex justify-between items-center border-b pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Building2 size={20} className="text-blue-600" /> {bank}
            </h2>
            <p className="text-slate-500">Cheque Pay-in Slip / Deposit Schedule</p>
          </div>
          <div className="text-right">
            <span className="block font-semibold">Date: {new Date().toLocaleDateString()}</span>
            <span className="text-slate-500">Jamaat Account: 30491823901</span>
          </div>
        </div>

        <table className="w-full text-left border-collapse border border-slate-200">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-2">Cheque No</th>
              <th className="p-2">Drawn On</th>
              <th className="p-2">Sabil #</th>
              <th className="p-2">Payer Name</th>
              <th className="p-2 text-right">Amount (₹)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredCheques.map(c => (
              <tr key={c.id}>
                <td className="p-2 font-mono font-semibold">{c.chequeNo}</td>
                <td className="p-2">{c.bank}</td>
                <td className="p-2">{c.sabilNo}</td>
                <td className="p-2">{c.name}</td>
                <td className="p-2 text-right font-bold text-emerald-600">₹{c.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between border-t pt-4 text-sm font-bold">
          <span>Total Cheques: {filteredCheques.length}</span>
          <span className="text-blue-700">Total Amount: ₹{filteredCheques.reduce((sum, c) => sum + c.amount, 0).toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}
