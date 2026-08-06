import { useData } from '../../context/DataContext'

export default function BookingReceipt() {
  const { hallBookings } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Hall Booking Official Receipt & Deposit Slip</h1>
        <p className="text-sm text-slate-500">Print booking confirmation and security deposit refund vouchers</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Receipt #</th>
              <th className="p-3">Hall Name</th>
              <th className="p-3">Applicant Name</th>
              <th className="p-3">Event Date</th>
              <th className="p-3 text-right">Rent Paid</th>
              <th className="p-3 text-right">Deposit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {hallBookings.map(b => (
              <tr key={b.id}>
                <td className="p-3 font-mono font-semibold text-blue-700">HB-100{b.id}</td>
                <td className="p-3 font-medium text-slate-800">{b.hallName}</td>
                <td className="p-3">{b.applicantName}</td>
                <td className="p-3">{b.eventDate}</td>
                <td className="p-3 text-right font-bold text-slate-700">₹{b.rentAmount.toLocaleString()}</td>
                <td className="p-3 text-right font-bold text-emerald-600">₹{b.deposit.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
