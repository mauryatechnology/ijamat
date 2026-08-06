import { useData } from '../../../context/DataContext'

export default function AddressWiseFamilyList() {
  const { members } = useData()

  const groupedByMohalla = members.reduce((acc, curr) => {
    if (!acc[curr.mohalla]) acc[curr.mohalla] = []
    acc[curr.mohalla].push(curr)
    return acc
  }, {})

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Address & Mohalla-Wise Family Directory</h1>
        <p className="text-sm text-slate-500">Grouped directory of families by residence mohalla</p>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedByMohalla).map(([mohalla, familyList]) => (
          <div key={mohalla} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 text-xs">
            <h2 className="font-bold text-base text-blue-700 border-b pb-2">{mohalla} ({familyList.length} Members)</h2>
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-100 border-b">
                  <th className="p-2">Sabil #</th>
                  <th className="p-2">ITS ID</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">HOF/FM</th>
                  <th className="p-2">Address</th>
                  <th className="p-2">Mobile</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {familyList.map(m => (
                  <tr key={m.id}>
                    <td className="p-2 font-mono font-semibold">{m.sabilNo}</td>
                    <td className="p-2">{m.itsId}</td>
                    <td className="p-2 font-medium">{m.name}</td>
                    <td className="p-2">{m.hofOrFm}</td>
                    <td className="p-2 text-slate-600">{m.address}</td>
                    <td className="p-2">{m.mobile}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  )
}
