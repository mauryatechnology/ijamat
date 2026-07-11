import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { DataProvider } from './context/DataContext'
import { SidebarProvider } from './context/SidebarContext'
import MainLayout from './components/layout/MainLayout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

// Members
import MemberList from './pages/members/MemberList'
import AddMember from './pages/members/AddMember'

// FMB
import Thali from './pages/fmb/Thali'
import Menu from './pages/fmb/Menu'

// Finance
import Collections from './pages/finance/Collections'
import Sabil from './pages/finance/Sabil'
import DueList from './pages/finance/DueList'

// Hall Booking
import HallBooking from './pages/hallbooking/HallBooking'

// Messages
import Messages from './pages/Messages'

// Tools
import ChangePassword from './pages/tools/ChangePassword'

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
        
        {/* Members */}
        <Route path="members" element={<MemberList />} />
        <Route path="members/add" element={<AddMember />} />

        {/* FMB */}
        <Route path="fmb/thali" element={<Thali />} />
        <Route path="fmb/menu" element={<Menu />} />

        {/* Finance */}
        <Route path="finance/collections" element={<Collections />} />
        <Route path="finance/sabil" element={<Sabil />} />
        <Route path="finance/dues" element={<DueList />} />

        {/* Hall Booking */}
        <Route path="hall-booking" element={<HallBooking />} />

        {/* Messages */}
        <Route path="messages" element={<Messages />} />

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
