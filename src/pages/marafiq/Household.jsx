import { useData } from '../../context/DataContext'

export default function Household() {
  const { surveyData } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Household & Assets Survey Report</h1>
        <p className="text-sm text-slate-500">Marafiq survey metrics on family household amenities and assets</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Sabil #</th>
              <th className="p-3">Head of Family</th>
              <th className="p-3">Family Size</th>
              <th className="p-3">Housing Type</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {surveyData.map(s => (
              <tr key={s.id}>
                <td className="p-3 font-mono font-semibold">{s.familyCode}</td>
                <td className="p-3 font-medium text-slate-800">{s.headName}</td>
                <td className="p-3">{s.familySize} Members</td>
                <td className="p-3">{s.housingStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function Housing() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Housing Assistance & Sanitation Drive</h1>
        <p className="text-sm text-slate-500">Marafiq housing renovation and living condition upliftment</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs max-w-md">
        <p className="text-emerald-700 font-medium">✓ Housing condition audits complete for 25 families.</p>
      </div>
    </div>
  )
}

export function PersonalDetails() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Family Personal Details Audit</h1>
        <p className="text-sm text-slate-500">Comprehensive personal demographic details for upliftment tracking</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs max-w-md">
        <p className="text-slate-600">Demographic profiles synchronized with Jamaat Master Database.</p>
      </div>
    </div>
  )
}

export function Upliftment() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Overall Upliftment Progress Dashboard</h1>
        <p className="text-sm text-slate-500">High-level dashboard for Marafiq Burhaniyah family progress</p>
      </div>
      <div className="grid grid-cols-3 gap-4 text-xs">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"><span className="text-slate-500 font-semibold block">Total Surveyed Families</span><span className="text-3xl font-bold text-blue-700">25</span></div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"><span className="text-slate-500 font-semibold block">Uplifted Families</span><span className="text-3xl font-bold text-emerald-600">18</span></div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"><span className="text-slate-500 font-semibold block">Under Active Support</span><span className="text-3xl font-bold text-amber-600">7</span></div>
      </div>
    </div>
  )
}
