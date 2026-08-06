import { useData } from '../../context/DataContext'

export default function CollectionSummary() {
  const { collections } = useData()

  const headTotals = collections.reduce((acc, curr) => {
    acc[curr.head] = (acc[curr.head] || 0) + curr.amount
    return acc
  }, {})

  const modeTotals = collections.reduce((acc, curr) => {
    acc[curr.mode] = (acc[curr.mode] || 0) + curr.amount
    return acc
  }, {})

  const grandTotal = collections.reduce((sum, c) => sum + c.amount, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Collection Summary Report</h1>
        <p className="text-sm text-slate-500">Summary breakdown by collection heads and payment modes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="font-semibold text-slate-700 text-lg border-b pb-2">Head-Wise Summary</h2>
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-100 border-b">
                <th className="p-2">Collection Head</th>
                <th className="p-2 text-right">Total Collected</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {Object.entries(headTotals).map(([head, amount]) => (
                <tr key={head}>
                  <td className="p-2 font-medium">{head}</td>
                  <td className="p-2 text-right font-bold text-emerald-600">₹{amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-50 font-bold border-t">
                <td className="p-2">Total</td>
                <td className="p-2 text-right text-blue-700">₹{grandTotal.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="font-semibold text-slate-700 text-lg border-b pb-2">Mode-Wise Summary</h2>
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-100 border-b">
                <th className="p-2">Payment Mode</th>
                <th className="p-2 text-right">Total Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {Object.entries(modeTotals).map(([mode, amount]) => (
                <tr key={mode}>
                  <td className="p-2 font-medium">{mode}</td>
                  <td className="p-2 text-right font-bold text-emerald-600">₹{amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-50 font-bold border-t">
                <td className="p-2">Total</td>
                <td className="p-2 text-right text-blue-700">₹{grandTotal.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}
