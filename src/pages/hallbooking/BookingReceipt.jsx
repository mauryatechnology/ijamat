import { useState } from 'react'
import { Printer, Send, Users, ShieldAlert, HeartPulse, DollarSign, Bell } from 'lucide-react'

export default function BookingReceipt() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Hall Booking Print Receipt & Security Deposit</h1>
        <p className="text-sm text-slate-500">Generate print vouchers and security deposit refund records</p>
      </div>

      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm max-w-md space-y-4 text-xs">
        <div className="flex justify-between border-b pb-3 items-center">
          <h2 className="font-bold text-base text-blue-800">Booking Voucher #HB-902</h2>
          <button onClick={() => window.print()} className="p-2 bg-slate-100 rounded border hover:bg-slate-200 flex items-center gap-1">
            <Printer size={14} /> Print
          </button>
        </div>
        <div className="space-y-1">
          <p><strong>Hall Name:</strong> Saifee Hall</p>
          <p><strong>Booked By:</strong> Akbar bhai Rampura wala</p>
          <p><strong>Rent Amount:</strong> ₹15,000</p>
          <p><strong>Security Deposit:</strong> ₹5,000 (Refundable)</p>
        </div>
      </div>
    </div>
  )
}

export function NotificationCenter() {
  const [msg, setMsg] = useState('')
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Mobile Push Notification Broadcast</h1>
        <p className="text-sm text-slate-500">Send urgent push notifications to all Mumineen mobile apps</p>
      </div>

      <div className="max-w-md bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs space-y-3">
        <label className="block font-semibold">Notification Title & Body</label>
        <textarea rows={4} value={msg} onChange={e => setMsg(e.target.value)} placeholder="Type announcement..." className="w-full p-2 border rounded bg-slate-50" />
        <button onClick={() => { alert('Push notification broadcasted!'); setMsg(''); }} className="w-full bg-blue-600 text-white py-2 rounded font-medium flex items-center justify-center gap-2">
          <Send size={14} /> Broadcast Notification
        </button>
      </div>
    </div>
  )
}

export function UserActivityLog() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">User Login & Mobile App Activity Audit</h1>
        <p className="text-sm text-slate-500">Audit trail of member app logins and system actions</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Timestamp</th>
              <th className="p-3">ITS ID / User</th>
              <th className="p-3">Action Performed</th>
              <th className="p-3">IP Address</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr><td className="p-3">2024-08-06 09:12 AM</td><td className="p-3 font-semibold">40493729 (admin)</td><td className="p-3">Login Success</td><td className="p-3 font-mono">192.168.1.45</td></tr>
            <tr><td className="p-3">2024-08-06 09:15 AM</td><td className="p-3 font-semibold">20394810 (user)</td><td className="p-3">Thali Skip Request Submitted</td><td className="p-3 font-mono">106.210.42.11</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function GovtLiaison() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Kharejiyah / Municipal & Waqf Liaison</h1>
        <p className="text-sm text-slate-500">Manage government licenses, municipal permits, and Waqf board records</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs max-w-md space-y-2">
        <div className="flex justify-between py-2 border-b"><span>Waqf Registration #:</span><span className="font-bold text-blue-700">WQ-90218-MH</span></div>
        <div className="flex justify-between py-2 border-b"><span>Municipal License Status:</span><span className="font-bold text-emerald-600">Active (Valid till Dec 2025)</span></div>
      </div>
    </div>
  )
}

export function MedicalCamp() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Sehat / Medical Camps & Health Drives</h1>
        <p className="text-sm text-slate-500">Schedule health checkup camps, blood donation drives, and medical aid</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs max-w-md space-y-2">
        <h2 className="font-bold border-b pb-2 text-sm text-slate-800">Upcoming Medical Camps</h2>
        <p className="text-slate-600 font-medium">Free Eye Checkup & Blood Donation Camp — Aug 20, 2024 at Saifee Hall</p>
      </div>
    </div>
  )
}

export function StaffSalary() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Mawareed Staff Payroll & Salary Management</h1>
        <p className="text-sm text-slate-500">Process monthly staff salaries, allowances, and provident funds</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Staff Name</th>
              <th className="p-3">Designation</th>
              <th className="p-3 text-right">Basic Salary</th>
              <th className="p-3 text-right">Net Monthly Salary</th>
              <th className="p-3">Payment Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr><td className="p-3 font-semibold">Tahir Husain</td><td className="p-3">Jamaat Accountant</td><td className="p-3 text-right">₹35,000</td><td className="p-3 text-right font-bold text-emerald-600">₹35,000</td><td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-semibold">Paid</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function CircularAnnounce() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dakheliyah Official Circulars & Notices</h1>
        <p className="text-sm text-slate-500">Publish official Jamaat circulars for display and mobile app view</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs max-w-md space-y-3">
        <input type="text" placeholder="Circular Heading" className="w-full p-2 border rounded bg-slate-50" />
        <textarea rows={3} placeholder="Circular Content Details..." className="w-full p-2 border rounded bg-slate-50" />
        <button onClick={() => alert('Circular published!')} className="w-full bg-blue-600 text-white py-2 rounded font-medium">Publish Circular</button>
      </div>
    </div>
  )
}

export function BusinessDirectory() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Iqtesadiyah Business Directory</h1>
        <p className="text-sm text-slate-500">Directory of Mumineen businesses and commercial enterprises</p>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Business Name</th>
              <th className="p-3">Proprietor</th>
              <th className="p-3">Category</th>
              <th className="p-3">Contact #</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr><td className="p-3 font-semibold text-slate-800">Saifee Hardware & Tools</td><td className="p-3">Akbar bhai Rampura wala</td><td className="p-3">Hardware & Building Materials</td><td className="p-3">9876543210</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function TajaratRaza() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Tajarat Raza & Clearances</h1>
        <p className="text-sm text-slate-500">Track business commencement Raza requests</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs max-w-md">
        <p className="text-emerald-700 font-medium">✓ All recent Tajarat Raza applications approved.</p>
      </div>
    </div>
  )
}
