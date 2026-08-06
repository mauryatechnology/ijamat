import { useState } from 'react'
import { useData } from '../../../context/DataContext'

export default function SabilCardTakhmeen() {
  const { takhmeenData } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Sabil Card Takhmeen Master</h1>
        <p className="text-sm text-slate-500">View and update annual takhmeen commitments for current session</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b text-slate-600">
              <th className="p-3">Sabil #</th>
              <th className="p-3">ITS ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Session</th>
              <th className="p-3 text-right">Current Takhmeen</th>
              <th className="p-3 text-right">Proposed Takhmeen</th>
              <th className="p-3 text-right text-emerald-600">Collected</th>
              <th className="p-3 text-right text-amber-600">Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {takhmeenData.map(t => (
              <tr key={t.id} className="hover:bg-slate-50">
                <td className="p-3 font-mono font-semibold">{t.sabilNo}</td>
                <td className="p-3 text-slate-500">{t.itsId}</td>
                <td className="p-3 font-medium text-slate-800">{t.name}</td>
                <td className="p-3">{t.session}</td>
                <td className="p-3 text-right">₹{t.currentTakhmeen.toLocaleString()}</td>
                <td className="p-3 text-right text-blue-600 font-semibold">₹{t.proposedTakhmeen.toLocaleString()}</td>
                <td className="p-3 text-right text-emerald-600">₹{t.collected.toLocaleString()}</td>
                <td className="p-3 text-right font-bold text-amber-600">₹{t.balance.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
