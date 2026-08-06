import { useData } from '../../context/DataContext'

export default function BookingCalendar() {
  const { hallBookings } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Jamaat Hall Availability Calendar</h1>
        <p className="text-sm text-slate-500">View upcoming hall reservations and schedule availability</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-xs">
        <p className="font-semibold text-slate-700 mb-4">Scheduled Hall Reservations: {hallBookings.length}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hallBookings.map(b => (
            <div key={b.id} className="p-4 bg-slate-50 border rounded-lg">
              <span className="font-bold text-blue-700 block">{b.hallName}</span>
              <span className="text-slate-600 block">{b.eventDate} ({b.slot})</span>
              <span className="text-slate-800 font-medium block mt-1">Booked by: {b.applicantName}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
