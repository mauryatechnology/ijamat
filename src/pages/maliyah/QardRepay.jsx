import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { Search, DollarSign, Save } from 'lucide-react'

export default function QardRepay() {
  const { qardLoans, addQardRepayment } = useData()
  const [selectedLoanId, setSelectedLoanId] = useState('')
  const [amount, setAmount] = useState('')
  const [mode, setMode] = useState('Cash')
  const [receiptNo, setReceiptNo] = useState(`QR-${Math.floor(100 + Math.random() * 900)}`)

  const activeLoans = qardLoans.filter(l => l.status === 'Active')
  const selectedLoan = qardLoans.find(l => l.id === Number(selectedLoanId))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedLoan || !amount) return
    addQardRepayment(selectedLoan.id, {
      date: new Date().toISOString().split('T')[0],
      amount: Number(amount),
      receiptNo,
      mode
    })
    setAmount('')
    alert('Qard Repayment recorded successfully!')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Qard Hasana Repay Entry</h1>
          <p className="text-sm text-slate-500">Record loan installment repayments</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="font-semibold text-slate-700 text-lg border-b pb-2">Repayment Form</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Select Active Loan</label>
              <select 
                value={selectedLoanId} 
                onChange={e => setSelectedLoanId(e.target.value)}
                className="w-full p-2 border rounded-lg text-sm bg-slate-50 outline-none focus:border-blue-500"
                required
              >
                <option value="">-- Select Member Loan --</option>
                {activeLoans.map(loan => (
                  <option key={loan.id} value={loan.id}>
                    Sabil #{loan.sabilNo} - {loan.name} (Bal: ₹{loan.balance})
                  </option>
                ))}
              </select>
            </div>

            {selectedLoan && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs space-y-1 text-blue-900">
                <p><strong>Total Loan:</strong> ₹{selectedLoan.loanAmount}</p>
                <p><strong>Total Repaid:</strong> ₹{selectedLoan.totalRepaid}</p>
                <p><strong>Remaining Balance:</strong> ₹{selectedLoan.balance}</p>
                <p><strong>Monthly Installment:</strong> ₹{selectedLoan.monthlyInstalment}</p>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Receipt No</label>
              <input 
                type="text" 
                value={receiptNo} 
                onChange={e => setReceiptNo(e.target.value)}
                className="w-full p-2 border rounded-lg text-sm bg-slate-50" 
                required 
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Repayment Amount (₹)</label>
              <input 
                type="number" 
                value={amount} 
                onChange={e => setAmount(e.target.value)}
                className="w-full p-2 border rounded-lg text-sm bg-slate-50" 
                placeholder="Enter amount" 
                required 
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Payment Mode</label>
              <select 
                value={mode} 
                onChange={e => setMode(e.target.value)}
                className="w-full p-2 border rounded-lg text-sm bg-slate-50"
              >
                <option value="Cash">Cash</option>
                <option value="UPI">UPI</option>
                <option value="Cheque">Cheque</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg text-sm flex items-center justify-center gap-2"
            >
              <Save size={16} /> Save Repayment
            </button>
          </form>
        </div>

        <div className="md:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="font-semibold text-slate-700 text-lg mb-4">Active Loans & Repayment History</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-600 border-b">
                  <th className="p-3">Loan ID</th>
                  <th className="p-3">Sabil</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Total Loan</th>
                  <th className="p-3">Repaid</th>
                  <th className="p-3">Balance</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {qardLoans.map(loan => (
                  <tr key={loan.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-semibold">{loan.loanId}</td>
                    <td className="p-3">{loan.sabilNo}</td>
                    <td className="p-3 font-medium text-slate-800">{loan.name}</td>
                    <td className="p-3">₹{loan.loanAmount.toLocaleString()}</td>
                    <td className="p-3 text-emerald-600">₹{loan.totalRepaid.toLocaleString()}</td>
                    <td className="p-3 text-amber-600 font-semibold">₹{loan.balance.toLocaleString()}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        loan.status === 'Active' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {loan.status}
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
