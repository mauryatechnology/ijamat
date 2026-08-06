import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { FileText, Printer, Calendar, ArrowUpRight, ArrowDownRight, CheckCircle2, AlertTriangle } from 'lucide-react'

export default function ProfitLossReport() {
  const { accountsLedger } = useData()

  const accounts = accountsLedger?.accounts || []
  const transactions = accountsLedger?.transactions || []

  const [fiscalYear, setFiscalYear] = useState('2024-2025')

  // Map income and expense accounts
  const incomeAccounts = accounts.filter(a => a.type === 'Income')
  const expenseAccounts = accounts.filter(a => a.type === 'Expense')

  // Calculate totals per income account
  const incomeDetails = incomeAccounts.map(acc => {
    const txns = transactions.filter(t => t.accountCode === acc.code)
    const amount = txns.reduce((sum, t) => sum + (t.credit || 0) - (t.debit || 0), 0)
    return { ...acc, amount }
  })

  // Calculate totals per expense account
  const expenseDetails = expenseAccounts.map(acc => {
    const txns = transactions.filter(t => t.accountCode === acc.code)
    const amount = txns.reduce((sum, t) => sum + (t.debit || 0) - (t.credit || 0), 0)
    return { ...acc, amount }
  })

  const totalIncome = incomeDetails.reduce((sum, item) => sum + item.amount, 0)
  const totalExpenditure = expenseDetails.reduce((sum, item) => sum + item.amount, 0)

  const netSurplus = totalIncome - totalExpenditure
  const isSurplus = netSurplus >= 0

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2.5">
            <FileText className="text-blue-600" size={26} />
            Profit & Loss Statement (Income & Expenditure Account)
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Formal financial audit statement of Jamaat revenue, operating expenses, and net surplus
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg">
            <Calendar size={14} className="text-slate-400" />
            <span>Fiscal Year:</span>
            <select
              value={fiscalYear}
              onChange={e => setFiscalYear(e.target.value)}
              className="bg-transparent outline-none text-blue-600 font-bold"
            >
              <option value="2024-2025">FY 2024-2025</option>
              <option value="2023-2024">FY 2023-2024</option>
            </select>
          </div>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
          >
            <Printer size={14} />
            Print P&L Statement
          </button>
        </div>
      </div>

      {/* Main Statement Sheet */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        {/* Printable Letterhead Header */}
        <div className="text-center border-b pb-6 border-slate-200 space-y-1">
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-wide">
            JAMAAT MANAGEMENT PLATFORM
          </h2>
          <p className="text-sm font-bold text-blue-600 uppercase tracking-widest">
            Statement of Income & Expenditure (Profit & Loss)
          </p>
          <p className="text-xs text-slate-500 font-mono">
            For the Financial Year ended 31st March ({fiscalYear})
          </p>
        </div>

        {/* Financial Summary Highlight Banner */}
        <div className={`p-4 rounded-xl border flex items-center justify-between ${
          isSurplus
            ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
            : 'bg-red-50 border-red-200 text-red-900'
        }`}>
          <div className="flex items-center gap-3">
            {isSurplus ? (
              <CheckCircle2 size={24} className="text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle size={24} className="text-red-600 shrink-0" />
            )}
            <div>
              <p className="font-bold text-sm">
                {isSurplus ? 'Net Surplus (Profit)' : 'Net Deficit (Loss)'} for the Year: ₹{Math.abs(netSurplus).toLocaleString()}
              </p>
              <p className="text-xs opacity-80">
                {isSurplus
                  ? 'Jamaat revenues exceeded total operating expenditures for the period.'
                  : 'Operating expenditures exceeded revenues for the period.'}
              </p>
            </div>
          </div>
          <div className="text-right font-mono text-xl font-extrabold">
            ₹{totalIncome.toLocaleString()} <span className="text-xs text-slate-400 font-normal">Income</span>
          </div>
        </div>

        {/* Two-Column Profit & Loss Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* EXPENDITURE COLUMN */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="bg-red-50/80 px-4 py-3 border-b border-red-100 flex items-center justify-between text-red-900">
              <h3 className="font-bold text-sm uppercase tracking-wider flex items-center gap-1.5">
                <ArrowDownRight size={16} className="text-red-600" />
                EXPENDITURE (EXPENSES)
              </h3>
              <span className="text-xs font-mono font-bold">Code / Amount</span>
            </div>

            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase border-b border-slate-100">
                <tr>
                  <th className="py-2.5 px-4">Expense Head Account</th>
                  <th className="py-2.5 px-4 text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {expenseDetails.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-800">{item.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">Code: {item.code}</div>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-semibold text-slate-900">
                      ₹{item.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-100 font-bold border-t-2 border-slate-200 text-slate-900">
                <tr>
                  <td className="py-3 px-4 uppercase">TOTAL EXPENDITURE</td>
                  <td className="py-3 px-4 text-right font-mono text-sm text-red-600">
                    ₹{totalExpenditure.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* INCOME COLUMN */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="bg-emerald-50/80 px-4 py-3 border-b border-emerald-100 flex items-center justify-between text-emerald-900">
              <h3 className="font-bold text-sm uppercase tracking-wider flex items-center gap-1.5">
                <ArrowUpRight size={16} className="text-emerald-600" />
                INCOME (REVENUE)
              </h3>
              <span className="text-xs font-mono font-bold">Code / Amount</span>
            </div>

            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase border-b border-slate-100">
                <tr>
                  <th className="py-2.5 px-4">Revenue Head Account</th>
                  <th className="py-2.5 px-4 text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {incomeDetails.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-800">{item.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">Code: {item.code}</div>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-semibold text-slate-900">
                      ₹{item.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-100 font-bold border-t-2 border-slate-200 text-slate-900">
                <tr>
                  <td className="py-3 px-4 uppercase">TOTAL INCOME</td>
                  <td className="py-3 px-4 text-right font-mono text-sm text-emerald-600">
                    ₹{totalIncome.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Grand Total & Net Surplus Summary Table */}
        <div className="border-2 border-slate-900 rounded-xl p-5 bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-slate-400 uppercase tracking-widest font-bold">Final Audit Balance</span>
            <h4 className="text-xl font-bold mt-0.5">NET SURPLUS / (DEFICIT)</h4>
          </div>

          <div className="text-right">
            <p className={`text-3xl font-mono font-extrabold ${isSurplus ? 'text-emerald-400' : 'text-red-400'}`}>
              ₹{netSurplus.toLocaleString()}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              Income: ₹{totalIncome.toLocaleString()} — Expenditure: ₹{totalExpenditure.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Audit Signatures section for print */}
        <div className="pt-10 grid grid-cols-3 gap-8 text-center text-xs text-slate-600">
          <div className="border-t border-slate-300 pt-2">
            <p className="font-bold text-slate-800">Prepared By</p>
            <p className="text-[10px] text-slate-400">Accountant / Cashier</p>
          </div>
          <div className="border-t border-slate-300 pt-2">
            <p className="font-bold text-slate-800">Checked By</p>
            <p className="text-[10px] text-slate-400">Internal Auditor</p>
          </div>
          <div className="border-t border-slate-300 pt-2">
            <p className="font-bold text-slate-800">Approved By</p>
            <p className="text-[10px] text-slate-400">President / Secretary</p>
          </div>
        </div>
      </div>
    </div>
  )
}
