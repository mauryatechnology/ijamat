import { useData } from '../../context/DataContext'

export default function NOCCommitment() {
  const { nocRecords } = useData()
  const pendingCommitments = nocRecords.filter(n => n.clearanceStatus === 'Pending' || n.commitmentAmount > 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">NOC with Financial Commitment</h1>
        <p className="text-sm text-slate-500">Track members who were issued NOC with pending due commitments</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-600 border-b">
              <th className="p-3">NOC No</th>
              <th className="p-3">Sabil #</th>
              <th className="p-3">Name</th>
              <th className="p-3">Mohalla</th>
              <th className="p-3">Issue Date</th>
              <th className="p-3">Commitment Note</th>
              <th className="p-3">Committed Amount</th>
              <th className="p-3">Target Date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {pendingCommitments.map(n => (
              <tr key={n.id} className="hover:bg-slate-50">
                <td className="p-3 font-mono font-semibold text-blue-600">{n.nocNo}</td>
                <td className="p-3">{n.sabilNo}</td>
                <td className="p-3 font-medium text-slate-800">{n.name}</td>
                <td className="p-3">{n.mohalla}</td>
                <td className="p-3">{n.issueDate}</td>
                <td className="p-3 text-slate-600">{n.commitment || 'Deferred Payment'}</td>
                <td className="p-3 font-bold text-amber-600">₹{n.commitmentAmount.toLocaleString()}</td>
                <td className="p-3">{n.commitmentDate || 'Next Month'}</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-800">
                    {n.clearanceStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
