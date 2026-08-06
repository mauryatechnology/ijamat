import { useData } from '../../context/DataContext'

export default function CollSummBankSector() {
  const { collections } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Collection Summary — Bank & Sector Wise</h1>
        <p className="text-sm text-slate-500">Cross-tabular report of bank deposits by sector</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Sector</th>
              <th className="p-3">SBI Bank</th>
              <th className="p-3">HDFC Bank</th>
              <th className="p-3">Baroda Bank</th>
              <th className="p-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="p-3 font-medium">Mohammedi Sector</td>
              <td className="p-3">₹45,000</td>
              <td className="p-3">₹28,000</td>
              <td className="p-3">₹15,000</td>
              <td className="p-3 text-right font-bold text-emerald-600">₹88,000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function CollSummBankOverall() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Collection Summary — Bank Overall</h1>
        <p className="text-sm text-slate-500">Bank-wise total collection breakdown</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs max-w-lg">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Bank Name</th>
              <th className="p-3 text-right">Deposited Collection</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr><td className="p-3 font-medium">State Bank of India</td><td className="p-3 text-right font-bold text-emerald-600">₹65,000</td></tr>
            <tr><td className="p-3 font-medium">HDFC Bank</td><td className="p-3 text-right font-bold text-emerald-600">₹32,500</td></tr>
            <tr><td className="p-3 font-medium">Bank of Baroda</td><td className="p-3 text-right font-bold text-emerald-600">₹18,000</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function CollSummRent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Collection Summary — Property Rent</h1>
        <p className="text-sm text-slate-500">Rent collections from Jamaat commercial and residential properties</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Property Name</th>
              <th className="p-3">Tenant Name</th>
              <th className="p-3 text-right">Monthly Rent</th>
              <th className="p-3 text-right">Collected</th>
              <th className="p-3 text-right">Rent Dues</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="p-3 font-medium">Burhaniyah Arcade - Shop 1</td>
              <td className="p-3">Mustafa bhai Merchant</td>
              <td className="p-3 text-right">₹15,000</td>
              <td className="p-3 text-right text-emerald-600 font-medium">₹15,000</td>
              <td className="p-3 text-right text-slate-400">₹0</td>
            </tr>
            <tr>
              <td className="p-3 font-medium">Najmi Complex - Flat 102</td>
              <td className="p-3">Irfan bhai Tenant</td>
              <td className="p-3 text-right">₹8,000</td>
              <td className="p-3 text-right text-emerald-600 font-medium">₹4,000</td>
              <td className="p-3 text-right text-amber-600 font-bold">₹4,000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
