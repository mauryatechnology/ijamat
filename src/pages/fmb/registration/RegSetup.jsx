import { useState } from 'react'
import { useData } from '../../../context/DataContext'

export default function RegSetup() {
  const { fmbRegistration } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">FMB Thali Registration Setup</h1>
        <p className="text-sm text-slate-500">Configure registration session parameters and dispatch zones</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm max-w-lg space-y-4 text-xs">
        <h2 className="font-bold border-b pb-2 text-sm text-slate-800">Active Registration Session</h2>
        <div className="space-y-2">
          <p><strong>Session:</strong> {fmbRegistration.setup.session}</p>
          <p><strong>Start Date:</strong> {fmbRegistration.setup.startDate}</p>
          <p><strong>End Date:</strong> {fmbRegistration.setup.endDate}</p>
          <p><strong>Supported Sizes:</strong> {fmbRegistration.setup.sizes.join(', ')}</p>
        </div>
      </div>
    </div>
  )
}
