import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { Wallet, Plus, Search, Filter, Calendar, CheckCircle2, ArrowDownRight, X } from 'lucide-react'

export default function ExpenditureManagement() {
  const { accountsLedger, addAccountTransaction } = useData()

  const accounts = accountsLedger?.accounts || []
  const transactions = accountsLedger?.transactions || []

  // Expense Account categories
  const expenseAccounts = accounts.filter(a => a.type === 'Expense')

  const [search, setSearch] = useState('')
  const [selectedAccount, setSelectedAccount] = useState('All')
  const [showModal, setShowModal] = useState(false)
  const [successMsg, setSuccessMsg] = useState(false)

  // New Expense form state
  const [form, setForm] = useState({
    voucherNo: `PV-00${transactions.length + 1}`,
    date: new Date().toISOString().split('T')[0],
    accountCode: expenseAccounts[0]?.code || '3001',
    amount: '',
    paymentMode: '1001', // 1001 = Cash, 1002 = SBI Bank
    narration: ''
  })

  // Filter transactions for Expenses
  const accountMap = {}
  accounts.forEach(a => { accountMap[a.code] = a })

  const expenseTxns = transactions.filter(txn => {
    const acc = accountMap[txn.accountCode]
    return acc && acc.type === 'Expense' && txn.debit > 0
  })

  const filteredTxns = expenseTxns.filter(txn => {
    const acc = accountMap[txn.accountCode]
    const matchesSearch =
      txn.voucherNo.toLowerCase().includes(search.toLowerCase()) ||
      txn.narration.toLowerCase().includes(search.toLowerCase()) ||
      (acc && acc.name.toLowerCase().includes(search.toLowerCase()))

    const matchesAccount = selectedAccount === 'All' || txn.accountCode === selectedAccount

    return matchesSearch && matchesAccount
  })

  const totalExpenseAmount = expenseTxns.reduce((sum, t) => sum + (t.debit || 0), 0)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.amount || parseFloat(form.amount) <= 0) {
      alert('Please enter a valid expense amount.')
      return
    }

    const amountNum = parseFloat(form.amount)

    // Debit Expense Account
    addAccountTransaction({
      voucherNo: form.voucherNo,
      date: form.date,
      accountCode: form.accountCode,
      debit: amountNum,
      credit: 0,
      narration: form.narration || 'Expense payment'
    })

    // Credit Cash / Bank Account
    addAccountTransaction({
      voucherNo: form.voucherNo,
      date: form.date,
      accountCode: form.paymentMode,
      debit: 0,
      credit: amountNum,
      narration: `Payment for ${form.narration}`
    })

    setShowModal(false)
    setSuccessMsg(true)
    setTimeout(() => setSuccessMsg(false), 3000)

    setForm({
      voucherNo: `PV-00${transactions.length + 3}`,
      date: new Date().toISOString().split('T')[0],
      accountCode: expenseAccounts[0]?.code || '3001',
      amount: '',
      paymentMode: '1001',
      narration: ''
    })
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2.5">
            <Wallet className="text-red-600" size={26} />
            Expenditure & Expense Management
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Monitor, categorize, and log all operating, maintenance, and welfare expenses
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
        >
          <Plus size={18} />
          Record New Expense Voucher
        </button>
      </div>

      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center gap-3">
          <CheckCircle2 size={20} className="text-emerald-600" />
          <p className="text-xs font-semibold">Expense voucher recorded successfully and updated in Ledger!</p>
        </div>
      )}

      {/* Summary KPI */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Recorded Expenditure</span>
          <p className="text-3xl font-extrabold text-red-600 mt-1">₹{totalExpenseAmount.toLocaleString()}</p>
        </div>
        <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
          <ArrowDownRight size={26} />
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search voucher, narration, account..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-red-500 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Filter size={14} />
            <span>Category Filter:</span>
          </div>

          <select
            value={selectedAccount}
            onChange={e => setSelectedAccount(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none text-slate-700"
          >
            <option value="All">All Expense Head Accounts</option>
            {expenseAccounts.map(acc => (
              <option key={acc.code} value={acc.code}>{acc.name} ({acc.code})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Expense Register Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold text-xs uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Voucher No</th>
                <th className="py-3 px-4">Expense Head Account</th>
                <th className="py-3 px-4">Narration / Description</th>
                <th className="py-3 px-4 text-right">Debit Amount (Dr)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredTxns.length > 0 ? (
                filteredTxns.map(txn => {
                  const acc = accountMap[txn.accountCode]
                  return (
                    <tr key={txn.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 text-xs font-mono text-slate-500">{txn.date}</td>
                      <td className="py-3 px-4 text-xs font-mono font-bold text-red-600">{txn.voucherNo}</td>
                      <td className="py-3 px-4 font-semibold text-slate-800 text-xs">
                        {acc ? acc.name : txn.accountCode}
                      </td>
                      <td className="py-3 px-4 text-xs text-slate-600">{txn.narration}</td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-red-600 text-sm">
                        ₹{txn.debit?.toLocaleString()}
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400 text-xs">
                    No expense voucher transactions found matching criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Expense Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100">
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <Wallet size={18} className="text-red-600" />
                Record Expense Payment
              </h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Voucher No</label>
                  <input
                    type="text"
                    required
                    value={form.voucherNo}
                    onChange={e => setForm({ ...form, voucherNo: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Payment Date</label>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={e => setForm({ ...form, date: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Expense Account Head *</label>
                <select
                  value={form.accountCode}
                  onChange={e => setForm({ ...form, accountCode: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium"
                >
                  {expenseAccounts.map(acc => (
                    <option key={acc.code} value={acc.code}>{acc.name} ({acc.code})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Expense Amount (₹) *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 5000"
                    value={form.amount}
                    onChange={e => setForm({ ...form, amount: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-red-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Paid From Mode</label>
                  <select
                    value={form.paymentMode}
                    onChange={e => setForm({ ...form, paymentMode: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <option value="1001">Cash in Hand (1001)</option>
                    <option value="1002">Bank Account - SBI (1002)</option>
                    <option value="1003">Bank Account - HDFC (1003)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Narration / Note</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Monthly electricity bill for Saifee Masjid..."
                  value={form.narration}
                  onChange={e => setForm({ ...form, narration: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-sm"
                >
                  Save Expense Voucher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
