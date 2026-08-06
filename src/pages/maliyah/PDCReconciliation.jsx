import { useData } from '../../context/DataContext'
import { Check, X, RefreshCw } from 'lucide-react'

export default function PDCReconciliation() {
  const { bankReconciliation, updateBankReconciliation } = useData()

  const handleStatusChange = (id, newStatus) => {
    updateBankReconciliation(id, { status: newStatus, clearanceDate: newStatus === 'Cleared' ? new Date().toISOString().split('T')[0] : '' })
    alert(`Cheque status updated to ${newStatus}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Post Dated Cheque (PDC) Reconciliation</h1>
        <p className="text-sm text-slate-500">Track and clear post-dated cheques deposited in bank accounts</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-600 border-b">
              <th className="p-3">Cheque No</th>
              <th className="p-3">Bank Name</th>
              <th className="p-3">Cheque Date</th>
              <th className="p-3">Sabil #</th>
              <th className="p-3">Name</th>
              <th className="p-3">Head</th>
              <th className="p-3 text-right">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Reconcile Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {bankReconciliation.map(b => (
              <tr key={b.id} className="hover:bg-slate-50">
                <td className="p-3 font-mono font-semibold text-blue-600">{b.chequeNo}</td>
                <td className="p-3">{b.bank}</td>
                <td className="p-3">{b.date}</td>
                <td className="p-3">{b.sabilNo}</td>
                <td className="p-3 font-medium text-slate-800">{b.name}</td>
                <td className="p-3">{b.head}</td>
                <td className="p-3 text-right font-bold text-emerald-600">₹{b.amount.toLocaleString()}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                    b.status === 'Cleared' ? 'bg-emerald-100 text-emerald-800' :
                    b.status === 'Bounced' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {b.status}
                  </span>
                </td>
                <td className="p-3 text-center">
                  {b.status !== 'Cleared' && (
                    <div className="flex justify-center gap-2">
                      <button onClick={() => handleStatusChange(b.id, 'Cleared')} className="px-2 py-1 bg-emerald-600 text-white rounded text-[10px] flex items-center gap-1">
                        <Check size={10} /> Clear
                      </button>
                      <button onClick={() => handleStatusChange(b.id, 'Bounced')} className="px-2 py-1 bg-red-600 text-white rounded text-[10px] flex items-center gap-1">
                        <X size={10} /> Bounce
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
