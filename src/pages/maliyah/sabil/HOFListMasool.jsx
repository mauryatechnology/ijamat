import { useData } from '../../../context/DataContext'

export default function HOFListMasool() {
  const { masoolData, members } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">HOF List for Masool Assignment</h1>
        <p className="text-sm text-slate-500">HOF directory mapped to assigned Masools and Musaeeds</p>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b text-slate-600">
              <th className="p-3">Sabil #</th>
              <th className="p-3">ITS ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Mohalla</th>
              <th className="p-3">Assigned Masool</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {members.filter(m => m.hofOrFm === 'HOF').slice(0, 10).map((m, idx) => (
              <tr key={m.id}>
                <td className="p-3 font-mono font-semibold">{m.sabilNo}</td>
                <td className="p-3">{m.itsId}</td>
                <td className="p-3 font-medium text-slate-800">{m.name}</td>
                <td className="p-3">{m.mohalla}</td>
                <td className="p-3 text-blue-700 font-medium">{masoolData.masools[idx % masoolData.masools.length]?.name || 'Mohd Hussain bhai'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function HOFFile() {
  const { members } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">HOF File Export & Archival</h1>
        <p className="text-sm text-slate-500">Full HOF dossier file data view</p>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">ITS ID</th>
              <th className="p-3">HOF Name</th>
              <th className="p-3">Sabil #</th>
              <th className="p-3">Address</th>
              <th className="p-3">Mobile</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {members.filter(m => m.hofOrFm === 'HOF').slice(0, 8).map(m => (
              <tr key={m.id}>
                <td className="p-3 font-mono font-semibold">{m.itsId}</td>
                <td className="p-3 font-medium">{m.name}</td>
                <td className="p-3">{m.sabilNo}</td>
                <td className="p-3">{m.address}</td>
                <td className="p-3">{m.mobile}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function TakhmeenSummary() {
  const { takhmeenData } = useData()
  const totalCurr = takhmeenData.reduce((sum, t) => sum + t.currentTakhmeen, 0)
  const totalProp = takhmeenData.reduce((sum, t) => sum + t.proposedTakhmeen, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Takhmeen Executive Summary</h1>
        <p className="text-sm text-slate-500">Comparative session-wise takhmeen totals and growth rate</p>
      </div>
      <div className="grid grid-cols-2 gap-4 text-xs">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-slate-500 block font-semibold">Current Session Takhmeen</span>
          <span className="text-2xl font-bold text-slate-800">₹{totalCurr.toLocaleString()}</span>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-slate-500 block font-semibold">Proposed Session Takhmeen</span>
          <span className="text-2xl font-bold text-blue-600">₹{totalProp.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}

export function TakhmeenForm() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Takhmeen Commitment Form</h1>
        <p className="text-sm text-slate-500">Blank form for collecting member takhmeen proposals</p>
      </div>
      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm max-w-md mx-auto space-y-4 text-xs">
        <h2 className="text-center font-bold text-base border-b pb-2 uppercase">Annual Takhmeen Declaration</h2>
        <div><label className="block font-semibold mb-1">Sabil Number:</label><input type="text" className="w-full p-2 border rounded bg-slate-50" /></div>
        <div><label className="block font-semibold mb-1">Proposed Takhmeen (₹):</label><input type="number" className="w-full p-2 border rounded bg-slate-50" /></div>
        <button onClick={() => alert('Proposal submitted!')} className="w-full bg-blue-600 text-white py-2 rounded font-medium">Submit Proposal</button>
      </div>
    </div>
  )
}
