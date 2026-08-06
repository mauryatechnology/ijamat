import { useState } from 'react'
import { FileSpreadsheet, Upload } from 'lucide-react'

export default function ImportSabil() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Import Sabil Master (Excel / CSV)</h1>
        <p className="text-sm text-slate-500">Bulk import new Sabil accounts from central ITS portal export</p>
      </div>
      <div className="max-w-md bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs space-y-4">
        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50 space-y-2">
          <FileSpreadsheet size={36} className="mx-auto text-blue-600" />
          <p className="font-semibold">Upload Sabil Master CSV</p>
          <input type="file" accept=".csv, .xlsx" className="text-xs" />
        </div>
        <button onClick={() => alert('Sabil master data imported!')} className="w-full bg-blue-600 text-white py-2 rounded font-medium">Upload & Sync</button>
      </div>
    </div>
  )
}

export function ImportTakhmeen() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Import Takhmeen Amounts</h1>
        <p className="text-sm text-slate-500">Bulk upload approved takhmeen figures for session</p>
      </div>
      <div className="max-w-md bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs space-y-4">
        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50 space-y-2">
          <FileSpreadsheet size={36} className="mx-auto text-emerald-600" />
          <p className="font-semibold">Upload Takhmeen Excel</p>
          <input type="file" accept=".csv, .xlsx" className="text-xs" />
        </div>
        <button onClick={() => alert('Takhmeen amounts imported!')} className="w-full bg-emerald-600 text-white py-2 rounded font-medium">Import Takhmeen</button>
      </div>
    </div>
  )
}

export function ImportUpdSabilITS() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Import & Sync Sabil ITS Data</h1>
        <p className="text-sm text-slate-500">Sync ITS personal info updates with local Sabil cards</p>
      </div>
      <div className="max-w-md bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs space-y-4">
        <button onClick={() => alert('ITS data synced with 18 Sabil records!')} className="w-full bg-indigo-600 text-white py-2 rounded font-medium">Sync Latest ITS Data</button>
      </div>
    </div>
  )
}

export function SabilTakhProposed() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Proposed Takhmeen Schedule</h1>
        <p className="text-sm text-slate-500">Review proposed takhmeen increments for upcoming session</p>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Sabil #</th>
              <th className="p-3">Name</th>
              <th className="p-3 text-right">Current Takhmeen</th>
              <th className="p-3 text-right text-blue-600 font-bold">Proposed Takhmeen</th>
              <th className="p-3 text-right text-emerald-600">Increment %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="p-3 font-mono font-semibold">1</td>
              <td className="p-3 font-medium">Mohd Hussain bhai Rangwala</td>
              <td className="p-3 text-right">₹12,000</td>
              <td className="p-3 text-right text-blue-600 font-bold">₹14,000</td>
              <td className="p-3 text-right text-emerald-600">+16.6%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function ImportTakhProposed() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Import Proposed Takhmeen List</h1>
        <p className="text-sm text-slate-500">Upload proposal spreadsheet from Masool meeting</p>
      </div>
      <div className="max-w-md bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs space-y-4">
        <input type="file" accept=".csv, .xlsx" className="text-xs" />
        <button onClick={() => alert('Proposed takhmeen imported!')} className="w-full bg-blue-600 text-white py-2 rounded font-medium">Import Proposals</button>
      </div>
    </div>
  )
}
