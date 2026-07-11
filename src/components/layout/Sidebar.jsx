import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useSidebar } from '../../context/SidebarContext'
import {
  LayoutDashboard, Users, Wallet, Utensils, Home, 
  Settings, LogOut, ChevronDown, Menu, MessageSquare,
  FileText, UserPlus, List, DollarSign, CreditCard,
  ClipboardList, Key
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const menuConfig = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard'
  },
  {
    key: 'members',
    label: 'Members',
    icon: Users,
    children: [
      { key: 'member-list', label: 'Member List', path: '/members' },
      { key: 'add-member', label: 'Add Member', path: '/members/add' }
    ]
  },
  {
    key: 'fmb',
    label: 'FMB / Niyaz',
    icon: Utensils,
    children: [
      { key: 'thali', label: 'Thali', path: '/fmb/thali' },
      { key: 'menu', label: 'Menu', path: '/fmb/menu' }
    ]
  },
  {
    key: 'finance',
    label: 'Finance',
    icon: Wallet,
    children: [
      { key: 'collections', label: 'Collections', path: '/finance/collections' },
      { key: 'sabil', label: 'Sabil', path: '/finance/sabil' },
      { key: 'dues', label: 'Due List', path: '/finance/dues' }
    ]
  },
  {
    key: 'hallbooking',
    label: 'Hall Booking',
    icon: Home,
    path: '/hall-booking'
  },
  {
    key: 'messages',
    label: 'Messages',
    icon: MessageSquare,
    path: '/messages'
  },
  {
    key: 'tools',
    label: 'Settings',
    icon: Settings,
    children: [
      { key: 'change-pwd', label: 'Change Password', icon: Key, path: '/tools/change-password' }
    ]
  }
]

function MenuItem({ item, depth = 0 }) {
  const { toggleMenu, isMenuOpen, isCollapsed } = useSidebar()
  const location = useLocation()
  const hasChildren = item.children && item.children.length > 0
  const isOpen = isMenuOpen(item.key)

  const isActive = item.path && location.pathname === item.path
  const isChildActive = hasChildren && item.children.some(child => {
    if (child.path && location.pathname === child.path) return true
    return false
  })

  const paddingLeft = isCollapsed ? '0.75rem' : `${0.75 + depth * 0.75}rem`
  const IconComp = item.icon

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => toggleMenu(item.key)}
          className={`sidebar-item w-full ${isChildActive ? 'active' : ''}`}
          style={{ paddingLeft }}
          title={isCollapsed ? item.label : undefined}
        >
          {IconComp && <IconComp size={depth === 0 ? 18 : 15} className="shrink-0" />}
          {!isCollapsed && (
            <>
              <span className="flex-1 text-left truncate">{item.label}</span>
              <ChevronDown
                size={14}
                className={`shrink-0 transition-transform duration-200 ${isOpen ? '' : '-rotate-90'}`}
              />
            </>
          )}
        </button>
        {!isCollapsed && (
          <div
            className="sidebar-submenu"
            style={{
              maxHeight: isOpen ? '500px' : '0',
              opacity: isOpen ? 1 : 0
            }}
          >
            {item.children.map(child => (
              <MenuItem key={child.key} item={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <NavLink
      to={item.path || '#'}
      className={`sidebar-item ${isActive ? 'active' : ''}`}
      style={{ paddingLeft }}
      title={isCollapsed ? item.label : undefined}
    >
      {IconComp && <IconComp size={depth === 0 ? 18 : 15} className="shrink-0" />}
      {!isCollapsed && <span className="truncate">{item.label}</span>}
    </NavLink>
  )
}

export default function Sidebar() {
  const { isCollapsed, toggleSidebar } = useSidebar()
  const { logout } = useAuth()

  return (
    <aside
      className={`fixed top-0 left-0 h-screen z-50 flex flex-col transition-all duration-300 ${
        isCollapsed ? 'w-[60px]' : 'w-[250px]'
      }`}
      style={{ background: 'linear-gradient(180deg, #1e2a3a 0%, #263544 100%)' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
          iJ
        </div>
        {!isCollapsed && (
          <span className="text-white font-semibold text-lg tracking-wide">iJamaat</span>
        )}
        <button
          onClick={toggleSidebar}
          className="ml-auto text-white/60 hover:text-white p-1 rounded transition-colors"
        >
          <Menu size={18} />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3">
        {menuConfig.map(item => (
          <MenuItem key={item.key} item={item} depth={0} />
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-white/10">
        <button
          onClick={logout}
          className="sidebar-item w-full text-red-400 hover:text-red-300 hover:bg-red-500/10 py-4"
        >
          <LogOut size={18} className="shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  )
}
