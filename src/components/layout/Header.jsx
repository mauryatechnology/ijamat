import { LogOut, Menu } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useSidebar } from '../../context/SidebarContext'

export default function Header() {
  const { user, logout } = useAuth()
  const { toggleSidebar, isCollapsed } = useSidebar()

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 py-2.5">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
          >
            <Menu size={20} />
          </button>
          <span className="text-sm text-gray-600 font-medium">{user?.name || 'Administrator'}</span>
        </div>

        <h1 className="text-xl md:text-2xl font-semibold text-blue-800 tracking-wide select-none">
          iJamaat
        </h1>

        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-xs text-gray-400">
            Last Login : {user?.lastLogin || 'N/A'}
          </span>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 transition-colors"
          >
            Log Out <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  )
}
