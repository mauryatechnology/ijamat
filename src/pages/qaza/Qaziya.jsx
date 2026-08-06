import { useData } from '../../context/DataContext'

export default function Qaziya() {
  const { qazaCases } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Qaziya & Community Arbitration Matters</h1>
        <p className="text-sm text-slate-500">List of arbitration matters submitted to Jamaat Qaza council</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Case #</th>
              <th className="p-3">Parties Involved</th>
              <th className="p-3">Type</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {qazaCases.map(c => (
              <tr key={c.id}>
                <td className="p-3 font-mono font-semibold text-indigo-600">{c.caseNo}</td>
                <td className="p-3 font-medium">{c.partyA} vs {c.partyB}</td>
                <td className="p-3">{c.caseType}</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-semibold">{c.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function CourtCases() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">External Court & Civil Litigation Cases</h1>
        <p className="text-sm text-slate-500">Audit trail of external civil court cases involving Jamaat properties</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs max-w-md space-y-2">
        <div className="flex justify-between py-2 border-b"><span>Active Civil Suits:</span><span className="font-bold text-amber-600">1 Case</span></div>
        <div className="flex justify-between py-2"><span>Legal Counsel:</span><span className="font-bold text-slate-700">Advocate Burhanuddin</span></div>
      </div>
    </div>
  )
}

export function SulahCompromise() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Sulah / Out-of-Court Compromise Settlements</h1>
        <p className="text-sm text-slate-500">Agreements resolved through Sulah (amicable compromise)</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs max-w-md">
        <p className="text-emerald-700 font-medium">✓ 8 cases successfully resolved via Sulah compromise.</p>
      </div>
    </div>
  )
}

export function InheritanceDistribution() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Miras & Inheritance Distribution</h1>
        <p className="text-sm text-slate-500">Sharia-compliant inheritance property distribution calculator & record</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs max-w-md">
        <p className="text-slate-600">Inheritance distribution certificates processed by Jamaat Qaza.</p>
      </div>
    </div>
  )
}

export function LeaseRentalAgreement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Lease & Rental Agreement Disputes</h1>
        <p className="text-sm text-slate-500">Jamaat shop and residential property rental agreements</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs max-w-md">
        <p className="text-slate-600">All Jamaat rental lease contracts up to date.</p>
      </div>
    </div>
  )
}

export function DebtRecovery() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Commercial Debt Recovery Arbitration</h1>
        <p className="text-sm text-slate-500">Qaza arbitration for commercial payment recoveries</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs max-w-md">
        <p className="text-slate-600">Debt recovery hearing schedules active.</p>
      </div>
    </div>
  )
}

export function PropertyDisputes() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Real Estate & Property Boundary Disputes</h1>
        <p className="text-sm text-slate-500">Property ownership and boundary dispute resolutions</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs max-w-md">
        <p className="text-slate-600">No pending property boundary disputes.</p>
      </div>
    </div>
  )
}
