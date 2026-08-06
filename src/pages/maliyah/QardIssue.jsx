import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { PlusCircle, Save } from 'lucide-react'

export default function QardIssue() {
  const { members, addQardLoan } = useData()
  const [sabilNo, setSabilNo] = useState('')
  const [loanAmount, setLoanAmount] = useState('')
  const [monthlyInstalment, setMonthlyInstalment] = useState('')
  const [purpose, setPurpose] = useState('Business')
  const [guarantor, setGuarantor] = useState('')

  const selectedMember = members.find(m => m.sabilNo === sabilNo && m.hofOrFm === 'HOF')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedMember || !loanAmount) return
    addQardLoan({
      loanId: `QH-2024-${Math.floor(100 + Math.random() * 900)}`,
      sabilNo: selectedMember.sabilNo,
      itsId: selectedMember.itsId,
      name: selectedMember.name,
      loanAmount: Number(loanAmount),
      monthlyInstalment: Number(monthlyInstalment || loanAmount / 10),
      issueDate: new Date().toISOString().split('T')[0],
      purpose,
      guarantor,
      approvedBy: 'admin',
      status: 'Active'
    })
    setLoanAmount('')
    setMonthlyInstalment('')
    alert('New Qard Hasana Loan Issued Successfully!')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Qard Hasana Issue Entry</h1>
        <p className="text-sm text-slate-500">Disburse new interest-free loan (Qard Hasana) to mumineen</p>
      </div>

      <div className="max-w-2xl bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="font-semibold text-slate-700 text-lg border-b pb-2 flex items-center gap-2">
          <PlusCircle size={18} className="text-emerald-600" /> New Loan Sanction Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-600 mb-1">Select Borrower (HOF)</label>
              <select
                value={sabilNo}
                onChange={e => setSabilNo(e.target.value)}
                className="w-full p-2 border rounded-lg bg-slate-50 outline-none focus:border-blue-500"
                required
              >
                <option value="">-- Select Sabil --</option>
                {members.filter(m => m.hofOrFm === 'HOF').map(m => (
                  <option key={m.id} value={m.sabilNo}>
                    Sabil #{m.sabilNo} - {m.name} ({m.itsId})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-600 mb-1">Purpose of Qard</label>
              <select
                value={purpose}
                onChange={e => setPurpose(e.target.value)}
                className="w-full p-2 border rounded-lg bg-slate-50"
              >
                <option value="Medical">Medical</option>
                <option value="Business">Business</option>
                <option value="Education">Education</option>
                <option value="House Repair">House Repair</option>
                <option value="Marriage">Marriage</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-600 mb-1">Sanctioned Amount (₹)</label>
              <input
                type="number"
                value={loanAmount}
                onChange={e => setLoanAmount(e.target.value)}
                className="w-full p-2 border rounded-lg bg-slate-50"
                placeholder="Loan Amount"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-600 mb-1">Monthly Installment (₹)</label>
              <input
                type="number"
                value={monthlyInstalment}
                onChange={e => setMonthlyInstalment(e.target.value)}
                className="w-full p-2 border rounded-lg bg-slate-50"
                placeholder="Expected monthly repayment"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-600 mb-1">Guarantor Name (Kafil)</label>
            <input
              type="text"
              value={guarantor}
              onChange={e => setGuarantor(e.target.value)}
              className="w-full p-2 border rounded-lg bg-slate-50"
              placeholder="Name of Guarantor Sabil holder"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-lg text-sm flex items-center justify-center gap-2"
          >
            <Save size={16} /> Sanction & Disburse Qard
          </button>
        </form>
      </div>
    </div>
  )
}
