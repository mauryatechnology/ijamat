import { useData } from '../../context/DataContext'
import { Scale } from 'lucide-react'

export default function QazaAll() {
  const { qazaCases } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Qaza All Master Cases Directory</h1>
        <p className="text-sm text-slate-500">Comprehensive list of all Qaza, arbitration, and dispute cases</p>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Case #</th>
              <th className="p-3">Parties</th>
              <th className="p-3">Category</th>
              <th className="p-3">Filing Date</th>
              <th className="p-3">Next Hearing</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {qazaCases.map(c => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="p-3 font-mono font-semibold text-indigo-600">{c.caseNo}</td>
                <td className="p-3 font-medium text-slate-800">{c.partyA} vs {c.partyB}</td>
                <td className="p-3">{c.caseType}</td>
                <td className="p-3">{c.fileDate}</td>
                <td className="p-3 text-slate-600">{c.nextHearing}</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] bg-amber-100 text-amber-800 font-semibold">{c.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function Vasiyat() {
  const { qazaCases } = useData()
  const list = qazaCases.filter(c => c.caseType.toLowerCase().includes('vasiyat') || c.caseType.toLowerCase().includes('will'))
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Vasiyat (Wills & Testament) Cases</h1>
        <p className="text-sm text-slate-500">Registration and dispute settlement of Vasiyat and estate wills</p>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Case #</th>
              <th className="p-3">Estate / Testator</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {list.map(c => (
              <tr key={c.id}>
                <td className="p-3 font-mono font-semibold text-indigo-600">{c.caseNo}</td>
                <td className="p-3 font-medium">{c.partyA}</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-semibold">{c.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function Partnership() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Partnership & Business Agreement Disputes</h1>
        <p className="text-sm text-slate-500">Arbitration for business partnership settlements</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs max-w-md">
        <p className="text-slate-600">Active partnership arbitration cases under Qaza review.</p>
      </div>
    </div>
  )
}

export function HaramInvestments() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Haram Investments & Interest Resolution</h1>
        <p className="text-sm text-slate-500">Guidance and resolution on non-compliant investment cases</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs max-w-md">
        <p className="text-emerald-700 font-medium">✓ Consultation and resolution logs active.</p>
      </div>
    </div>
  )
}
