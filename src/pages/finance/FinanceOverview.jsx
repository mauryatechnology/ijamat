import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../../context/DataContext'
import {
  TrendingUp, Wallet, DollarSign, Building, PieChart,
  ArrowUpRight, ArrowDownRight, CreditCard, Plus, FileText, BarChart3
} from 'lucide-react'

export default function FinanceOverview() {
  const { accountsLedger } = useData()
  const navigate = useNavigate()

  const accounts = accountsLedger?.accounts || []
  const transactions = accountsLedger?.transactions || []

  // Map transactions to account types
  let totalIncome = 0
  let totalExpense = 0
  let totalAsset = 0
  let totalLiability = 0

  const accountMap = {}
  accounts.forEach(acc => {
    accountMap[acc.code] = acc
  })

  transactions.forEach(txn => {
    const acc = accountMap[txn.accountCode]
    if (!acc) return

    if (acc.type === 'Income') {
      totalIncome += (txn.credit || 0) - (txn.debit || 0)
    } else if (acc.type === 'Expense') {
      totalExpense += (txn.debit || 0) - (txn.credit || 0)
    } else if (acc.type === 'Asset') {
      totalAsset += (txn.debit || 0) - (txn.credit || 0)
    } else if (acc.type === 'Liability') {
      totalLiability += (txn.credit || 0) - (txn.debit || 0)
    }
  })

  // Fixed capital assets from accounts (Cash + Bank + FDs)
  const cashAndBankBalance = accounts
    .filter(a => a.group === 'Current Assets' || a.group === 'Investments')
    .reduce((sum, a) => {
      const txns = transactions.filter(t => t.accountCode === a.code)
      const balance = txns.reduce((accSum, t) => accSum + (t.debit || 0) - (t.credit || 0), 0)
      return sum + balance
    }, 0)

  const netSurplus = totalIncome - totalExpense
  const profitMargin = totalIncome > 0 ? ((netSurplus / totalIncome) * 100).toFixed(1) : 0

  // Category breakdown for expenses
  const expenseCategories = accounts
    .filter(a => a.type === 'Expense')
    .map(acc => {
      const txns = transactions.filter(t => t.accountCode === acc.code)
      const amount = txns.reduce((sum, t) => sum + (t.debit || 0) - (t.credit || 0), 0)
      return { name: acc.name, amount }
    })
    .filter(item => item.amount > 0)

  // Category breakdown for income
  const incomeCategories = accounts
    .filter(a => a.type === 'Income')
    .map(acc => {
      const txns = transactions.filter(t => t.accountCode === acc.code)
      const amount = txns.reduce((sum, t) => sum + (t.credit || 0) - (t.debit || 0), 0)
      return { name: acc.name, amount }
    })
    .filter(item => item.amount > 0)

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2.5">
            <TrendingUp className="text-blue-600" size={26} />
            Finance & Accounts Management
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Real-time financial dashboard, income vs expenditure analysis, reserves & net surplus report
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => navigate('/finance/expenditure')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
          >
            <Plus size={14} />
            Record Expense
          </button>
          <button
            onClick={() => navigate('/finance/profit-loss')}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
          >
            <FileText size={14} />
            P&L Statement
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Income</span>
            <div className="w-9 h-9 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
              <ArrowUpRight size={20} />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900">₹{totalIncome.toLocaleString()}</p>
          <p className="text-xs text-emerald-600 font-medium">Sabil, FMB, Niyaz & Hall Bookings</p>
        </div>

        {/* Total Expenditure */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Expenditure</span>
            <div className="w-9 h-9 bg-red-50 text-red-600 rounded-lg flex items-center justify-center">
              <ArrowDownRight size={20} />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900">₹{totalExpense.toLocaleString()}</p>
          <p className="text-xs text-slate-500 font-medium">Salaries, Kitchen & Utilities</p>
        </div>

        {/* Net Profit / Surplus */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Net Surplus (Profit)</span>
            <div className="w-9 h-9 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
              <DollarSign size={20} />
            </div>
          </div>
          <p className={`text-2xl font-extrabold ${netSurplus >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
            ₹{netSurplus.toLocaleString()}
          </p>
          <p className="text-xs text-slate-500 font-medium">Surplus Margin: <strong>{profitMargin}%</strong></p>
        </div>

        {/* Cash & Investment Reserves */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Liquid Reserves & Assets</span>
            <div className="w-9 h-9 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
              <Building size={20} />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900">₹{cashAndBankBalance.toLocaleString()}</p>
          <p className="text-xs text-purple-600 font-medium">Cash in Hand + Bank Deposits</p>
        </div>
      </div>

      {/* Financial Charts & Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income Distribution */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-800 border-b pb-2 flex items-center gap-2">
            <PieChart size={16} className="text-blue-600" />
            Revenue Breakdown by Category
          </h3>

          <div className="space-y-3">
            {incomeCategories.map((item, idx) => {
              const pct = totalIncome > 0 ? ((item.amount / totalIncome) * 100).toFixed(1) : 0
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                    <span>{item.name}</span>
                    <span className="font-mono text-emerald-600">₹{item.amount.toLocaleString()} ({pct}%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Expense Distribution */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-800 border-b pb-2 flex items-center gap-2">
            <BarChart3 size={16} className="text-blue-600" />
            Expenditure Breakdown by Category
          </h3>

          <div className="space-y-3">
            {expenseCategories.map((item, idx) => {
              const pct = totalExpense > 0 ? ((item.amount / totalExpense) * 100).toFixed(1) : 0
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                    <span>{item.name}</span>
                    <span className="font-mono text-red-600">₹{item.amount.toLocaleString()} ({pct}%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-500 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Recent Financial Transactions Log */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-5">
        <div className="flex items-center justify-between border-b pb-3 border-slate-100">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <CreditCard size={16} className="text-blue-600" />
            Recent Accounting Voucher Transactions
          </h3>
          <button
            onClick={() => navigate('/finance/profit-loss')}
            className="text-xs text-blue-600 hover:text-blue-700 font-semibold"
          >
            View P&L Report →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-100">
              <tr>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Voucher No</th>
                <th className="py-2.5 px-3">Account Head</th>
                <th className="py-2.5 px-3">Narration</th>
                <th className="py-2.5 px-3 text-right">Debit (Dr)</th>
                <th className="py-2.5 px-3 text-right">Credit (Cr)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {transactions.slice(0, 8).map(txn => {
                const acc = accountMap[txn.accountCode]
                return (
                  <tr key={txn.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-3 font-mono text-slate-500">{txn.date}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-blue-600">{txn.voucherNo}</td>
                    <td className="py-2.5 px-3 font-semibold text-slate-800">{acc ? acc.name : txn.accountCode}</td>
                    <td className="py-2.5 px-3 text-slate-600">{txn.narration}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-semibold text-red-600">
                      {txn.debit > 0 ? `₹${txn.debit.toLocaleString()}` : '-'}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-semibold text-emerald-600">
                      {txn.credit > 0 ? `₹${txn.credit.toLocaleString()}` : '-'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
