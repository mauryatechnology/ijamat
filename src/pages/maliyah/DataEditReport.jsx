import { useData } from '../../context/DataContext'

export default function DataEditReport() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Data Edit / Removal Audit Log</h1>
        <p className="text-sm text-slate-500">Audit trial of modified or deleted receipt entries and vouchers</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-600 border-b">
              <th className="p-3">Audit ID</th>
              <th className="p-3">Timestamp</th>
              <th className="p-3">User</th>
              <th className="p-3">Action</th>
              <th className="p-3">Target Record</th>
              <th className="p-3">Old Value</th>
              <th className="p-3">New Value</th>
              <th className="p-3">Reason</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr className="hover:bg-slate-50">
              <td className="p-3 font-mono font-semibold">AUD-001</td>
              <td className="p-3 text-slate-500">2024-08-04 11:30</td>
              <td className="p-3 font-medium">admin</td>
              <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-800">Edit</span></td>
              <td className="p-3">Receipt VC-002</td>
              <td className="p-3 text-red-600">₹2,500</td>
              <td className="p-3 text-emerald-600 font-semibold">₹3,000</td>
              <td className="p-3">Correction of cash typo</td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="p-3 font-mono font-semibold">AUD-002</td>
              <td className="p-3 text-slate-500">2024-08-02 09:15</td>
              <td className="p-3 font-medium">admin</td>
              <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-red-100 text-red-800">Remove</span></td>
              <td className="p-3">Voucher JV-012</td>
              <td className="p-3 text-slate-600">₹5,000</td>
              <td className="p-3 text-slate-400">Deleted</td>
              <td className="p-3">Duplicate entry created by mistake</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
