import { useData } from '../../../context/DataContext'

export default function MenuEntryEdit() {
  const { inventoryItems } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">FMB Raw Ingredients & Kitchen Inventory</h1>
        <p className="text-sm text-slate-500">Track kitchen inventory stocks, quantities, and rates</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Item Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Stock Quantity</th>
              <th className="p-3">Unit</th>
              <th className="p-3 text-right">Rate / Unit</th>
              <th className="p-3 font-semibold">Min Stock Level</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {inventoryItems.map(item => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="p-3 font-medium text-slate-800">{item.itemName}</td>
                <td className="p-3 text-slate-600">{item.category}</td>
                <td className="p-3 font-bold text-blue-700">{item.quantity}</td>
                <td className="p-3">{item.unit}</td>
                <td className="p-3 text-right font-semibold text-emerald-600">₹{item.ratePerUnit}</td>
                <td className="p-3 text-slate-500">{item.minStock} {item.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
