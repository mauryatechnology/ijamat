import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { DataProvider } from './context/DataContext'
import { SidebarProvider } from './context/SidebarContext'
import MainLayout from './components/layout/MainLayout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import DailyCollection from './pages/maliyah/DailyCollection'
import IndividualLedger from './pages/maliyah/IndividualLedger'
import CollectionReport from './pages/maliyah/CollectionReport'
import DueList from './pages/maliyah/DueList'
import HOFList from './pages/maliyah/HOFList'
import MumineenFilter from './pages/maliyah/MumineenFilter'
import VoucherEntry from './pages/maliyah/VoucherEntry'
import DayBook from './pages/maliyah/DayBook'
import SabilEntry from './pages/maliyah/SabilEntry'
import SabilReport from './pages/maliyah/SabilReport'
import ThaliMaster from './pages/fmb/ThaliMaster'
import ThaliReport from './pages/fmb/ThaliReport'
import MenuManage from './pages/fmb/MenuManage'
import MenuReport from './pages/fmb/MenuReport'
import SendMessage from './pages/dakheliyah/SendMessage'
import MessageReport from './pages/dakheliyah/MessageReport'
import MemberList from './pages/mawareed/MemberList'
import AddMember from './pages/mawareed/AddMember'
import AmalReport from './pages/deeniyah/AmalReport'
import WafatUpdate from './pages/deeniyah/WafatUpdate'
import SabaqAttendance from './pages/talimiyah/SabaqAttendance'
import QazaReport from './pages/qaza/QazaReport'
import QardanHasana from './pages/iqtesadiyah/QardanHasana'
import DoctorsDirectory from './pages/sehat/DoctorsDirectory'
import HallBooking from './pages/hallbooking/HallBooking'
import BookingReport from './pages/hallbooking/BookingReport'
import RSVPReport from './pages/app/RSVPReport'
import InstallSummary from './pages/app/InstallSummary'
import ChangePassword from './pages/tools/ChangePassword'
import KharejiyahReport from './pages/kharejiyah/KharejiyahReport'
import MuwasaatEntry from './pages/marafiq/MuwasaatEntry'
import MuwasaatReport from './pages/marafiq/MuwasaatReport'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return children
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />

        {/* Deeniyah - Religious Affairs */}
        <Route path="deeniyah/amal-report" element={<AmalReport />} />
        <Route path="deeniyah/wafat-update" element={<WafatUpdate />} />

        {/* Marafiq - Upliftment */}
        <Route path="marafiq/muwasaat-entry" element={<MuwasaatEntry />} />
        <Route path="marafiq/muwasaat-report" element={<MuwasaatReport />} />

        {/* Talimiyah - Education */}
        <Route path="talimiyah/sabaq-attendance" element={<SabaqAttendance />} />

        {/* Dakheliyah - Internal Affairs */}
        <Route path="dakheliyah/send-message" element={<SendMessage />} />
        <Route path="dakheliyah/message-report" element={<MessageReport />} />

        {/* Mawareed - HR */}
        <Route path="mawareed/add-member" element={<AddMember />} />
        <Route path="mawareed/member-list" element={<MemberList />} />

        {/* Maliyah - Financial */}
        <Route path="maliyah/daily-collection" element={<DailyCollection />} />
        <Route path="maliyah/individual-ledger" element={<IndividualLedger />} />
        <Route path="maliyah/collection-report" element={<CollectionReport />} />
        <Route path="maliyah/due-list" element={<DueList />} />
        <Route path="maliyah/hof-list" element={<HOFList />} />
        <Route path="maliyah/mumineen-filter" element={<MumineenFilter />} />
        <Route path="maliyah/voucher-entry" element={<VoucherEntry />} />
        <Route path="maliyah/day-book" element={<DayBook />} />
        <Route path="maliyah/sabil-entry" element={<SabilEntry />} />
        <Route path="maliyah/sabil-report" element={<SabilReport />} />

        {/* Kharejiyah - External */}
        <Route path="kharejiyah/report" element={<KharejiyahReport />} />

        {/* Qaza - Legal */}
        <Route path="qaza/report" element={<QazaReport />} />

        {/* FMB / Niyaz */}
        <Route path="fmb/thali-master" element={<ThaliMaster />} />
        <Route path="fmb/thali-report" element={<ThaliReport />} />
        <Route path="fmb/menu-manage" element={<MenuManage />} />
        <Route path="fmb/menu-report" element={<MenuReport />} />

        {/* Iqtesadiyah */}
        <Route path="iqtesadiyah/qardan-hasana" element={<QardanHasana />} />

        {/* Sehat */}
        <Route path="sehat/doctors-directory" element={<DoctorsDirectory />} />

        {/* Hall Booking */}
        <Route path="hall-booking/booking" element={<HallBooking />} />
        <Route path="hall-booking/report" element={<BookingReport />} />

        {/* App */}
        <Route path="app/rsvp-report" element={<RSVPReport />} />
        <Route path="app/install-summary" element={<InstallSummary />} />

        {/* Tools */}
        <Route path="tools/change-password" element={<ChangePassword />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <SidebarProvider>
          <AppRoutes />
        </SidebarProvider>
      </DataProvider>
    </AuthProvider>
  )
}
