import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'
import { useSidebar } from '../../context/SidebarContext'

export default function MainLayout() {
  const { isCollapsed } = useSidebar()

  return (
    <div className="flex min-h-screen bg-page-bg">
      <Sidebar />
      <div
        className={`flex flex-col flex-1 min-h-screen transition-all duration-300 ${
          isCollapsed ? 'ml-[60px]' : 'ml-[270px]'
        }`}
      >
        <Header />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}
