import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { Building, Wallet, Landmark, DollarSign, ShieldCheck, ArrowUpRight } from 'lucide-react'

export default function InvestmentsAssets() {
  const { accountsLedger } = useData()

  const accounts = accountsLedger?.accounts || []
  const transactions = accountsLedger?.transactions || []

  // Asset Accounts & Investments
  const assetAccounts = accounts.filter(a => a.type === 'Asset')
  const liabilityAccounts = accounts.filter(a => a.type === 'Liability')
  const equityAccounts = accounts.filter(a => a.type === 'Equity')

  // Calculate balances per account
  const accountBalances = accounts.map(acc => {
    const txns = transactions.filter(t => t.accountCode === acc.code)
    let balance = 0
    if (acc.type === 'Asset' || acc.type === 'Expense') {
      balance = txns.reduce((sum, t) => sum + (t.debit || 0) - (t.credit || 0), 0)
    } else {
      balance = txns.reduce((sum, t) => sum + (t.credit || 0) - (t.debit || 0), 0)
    }
    return { ...acc, balance }
  })

  const totalAssets = accountBalances
    .filter(a => a.type === 'Asset')
    .reduce((sum, a) => sum + a.balance, 0)

  const totalInvestments = accountBalances
    .filter(a => a.group === 'Investments')
    .reduce((sum, a) => sum + a.balance, 0)

  const totalBankCash = accountBalances
    .filter(a => a.group === 'Current Assets')
    .reduce((sum, a) => sum + a.balance, 0)

  const totalLoansGiven = accountBalances
    .filter(a => a.group === 'Loans' && a.type === 'Asset')
    .reduce((sum, a) => sum + a.balance, 0)

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2.5">
            <Building className="text-purple-600" size={26} />
            Investments & Assets Portfolio
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Capital assets, fixed bank deposits, liquidity reserves, and Qardan Hasana fund allocations
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Capital Assets</span>
            <div className="w-9 h-9 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
              <Building size={20} />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900">₹{totalAssets.toLocaleString()}</p>
          <p className="text-xs text-purple-600 font-medium">All Assets & Capital Reserves</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fixed Deposits & Investments</span>
            <div className="w-9 h-9 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
              <Landmark size={20} />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900">₹{totalInvestments.toLocaleString()}</p>
          <p className="text-xs text-blue-600 font-medium">Fixed Bank Investment Reserve</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Liquid Cash & Bank</span>
            <div className="w-9 h-9 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
              <Wallet size={20} />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900">₹{totalBankCash.toLocaleString()}</p>
          <p className="text-xs text-emerald-600 font-medium">Cash in Hand + Savings Accounts</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Qardan Hasana Assets</span>
            <div className="w-9 h-9 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900">₹{totalLoansGiven.toLocaleString()}</p>
          <p className="text-xs text-amber-600 font-medium">Active Micro-Loans Outstanding</p>
        </div>
      </div>

      {/* Asset Accounts Breakdown Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-5 space-y-4">
        <h3 className="text-sm font-bold text-slate-800 border-b pb-2 flex items-center gap-2">
          <Landmark size={16} className="text-purple-600" />
          Asset & Investment Ledger Accounts
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold text-xs uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Account Code</th>
                <th className="py-3 px-4">Account Name</th>
                <th className="py-3 px-4">Category Group</th>
                <th className="py-3 px-4">Account Type</th>
                <th className="py-3 px-4 text-right">Current Ledger Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {accountBalances
                .filter(a => a.type === 'Asset' || a.type === 'Equity' || a.type === 'Liability')
                .map(acc => (
                  <tr key={acc.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 text-xs font-mono font-bold text-purple-600">{acc.code}</td>
                    <td className="py-3 px-4 font-semibold text-slate-900">{acc.name}</td>
                    <td className="py-3 px-4 text-xs text-slate-600">{acc.group}</td>
                    <td className="py-3 px-4 text-xs">
                      <span className={`px-2 py-0.5 rounded font-semibold ${
                        acc.type === 'Asset' ? 'bg-purple-100 text-purple-800' :
                        acc.type === 'Equity' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {acc.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-extrabold text-slate-900">
                      ₹{acc.balance.toLocaleString()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
