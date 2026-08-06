import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useSidebar } from '../../context/SidebarContext'
import {
  LayoutDashboard, BookOpen, TrendingUp, GraduationCap, Monitor,
  Users, Wallet, Globe, Scale, Utensils, BarChart3, Building,
  Heart, Home, Smartphone, Settings, LogOut, ChevronDown,
  ChevronRight, Search, Menu, FileText, Send, MessageSquare,
  UserPlus, List, DollarSign, CreditCard, BookOpenCheck,
  ClipboardList, PieChart, Calendar, Key, FolderOpen
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
    key: 'deeniyah',
    label: 'Deeniyah - Religious Affairs',
    icon: BookOpen,
    children: [
      {
        key: 'deeniyah-amal',
        label: 'Amal Report',
        icon: FileText,
        children: [
          { key: 'amal-summary', label: 'Summary', path: '/deeniyah/amal-report' },
          { key: 'amal-detail', label: 'Detail List', path: '/deeniyah/amal-report?view=detail' }
        ]
      },
      { key: 'wafat', label: 'Wafat Update', icon: ClipboardList, path: '/deeniyah/wafat-update' }
    ]
  },
  {
    key: 'marafiq',
    label: 'Marafiq Burhaniyah - Upliftment',
    icon: TrendingUp,
    children: [
      {
        key: 'muwasaat',
        label: 'Muwasaat',
        icon: Heart,
        children: [
          { key: 'muwasaat-entry', label: 'Entry', path: '/marafiq/muwasaat-entry' },
          { key: 'muwasaat-report', label: 'Report', path: '/marafiq/muwasaat-report' }
        ]
      }
    ]
  },
  {
    key: 'talimiyah',
    label: 'Talimiyah - Education Affairs',
    icon: GraduationCap,
    children: [
      { key: 'sabaq', label: 'Sabaq Attendance Report', icon: BookOpenCheck, path: '/talimiyah/sabaq-attendance' }
    ]
  },
  {
    key: 'dakheliyah',
    label: 'Dakheliyah - Internal Affairs',
    icon: Monitor,
    children: [
      {
        key: 'messaging',
        label: 'Messaging',
        icon: MessageSquare,
        children: [
          { key: 'send-all', label: 'Send to All', path: '/dakheliyah/send-message' },
          { key: 'msg-report', label: 'Report', path: '/dakheliyah/message-report' }
        ]
      }
    ]
  },
  {
    key: 'mawareed',
    label: 'Mawareed bashariya - HR',
    icon: Users,
    children: [
      {
        key: 'groups',
        label: 'Group / Committees',
        icon: Users,
        children: [
          { key: 'add-member', label: 'Add Member', path: '/mawareed/add-member' },
          { key: 'member-list', label: 'Member List', path: '/mawareed/member-list' }
        ]
      }
    ]
  },
  {
    key: 'maliyah',
    label: 'Maliyah - Accounts/Budget',
    icon: Wallet,
    children: [
      {
        key: 'accounts',
        label: 'Accounts',
        icon: DollarSign,
        children: [
          {
            key: 'entry',
            label: 'Entry',
            children: [
              { key: 'daily-collection', label: 'Daily Collection', path: '/maliyah/daily-collection' },
              { key: 'voucher-entry', label: 'Voucher Entry', path: '/maliyah/voucher-entry' }
            ]
          },
          {
            key: 'reports',
            label: 'Reports',
            children: [
              { key: 'ind-ledger', label: 'Individual Ledger', path: '/maliyah/individual-ledger' },
              { key: 'coll-report', label: 'Collection Report', path: '/maliyah/collection-report' },
              { key: 'due-list', label: 'Due List', path: '/maliyah/due-list' },
              { key: 'day-book', label: 'Day Book', path: '/maliyah/day-book' }
            ]
          },
          {
            key: 'utility',
            label: 'Utility',
            children: [
              { key: 'hof-list', label: 'HOF List', path: '/maliyah/hof-list' },
              { key: 'mumineen', label: 'Mumineen Filter', path: '/maliyah/mumineen-filter' }
            ]
          }
        ]
      },
      {
        key: 'sabil-menu',
        label: 'Sabil',
        icon: CreditCard,
        children: [
          { key: 'sabil-entry', label: 'Sabil Entry', path: '/maliyah/sabil-entry' },
          { key: 'sabil-report', label: 'Sabil Report', path: '/maliyah/sabil-report' }
        ]
      }
    ]
  },
  {
    key: 'kharejiyah',
    label: 'Kharejiyah - PR',
    icon: Globe,
    children: [
      { key: 'khar-report', label: 'Report', icon: FileText, path: '/kharejiyah/report' }
    ]
  },
  {
    key: 'qaza',
    label: 'Qaza - Legal Affairs',
    icon: Scale,
    children: [
      { key: 'qaza-report', label: 'Umoor Qaza Report', icon: FileText, path: '/qaza/report' }
    ]
  },
  {
    key: 'fmb',
    label: 'FMB / Niyaz',
    icon: Utensils,
    children: [
      {
        key: 'fmb-master',
        label: 'FMB Master',
        icon: FolderOpen,
        children: [
          { key: 'thali-entry', label: 'Thali Master Entry', path: '/fmb/thali-master' },
          { key: 'thali-report', label: 'Thali Report', path: '/fmb/thali-report' }
        ]
      },
      {
        key: 'menu',
        label: 'Menu',
        icon: List,
        children: [
          { key: 'menu-manage', label: 'Add / Edit Menu', path: '/fmb/menu-manage' },
          { key: 'menu-report', label: 'Menu Report', path: '/fmb/menu-report' }
        ]
      }
    ]
  },
  {
    key: 'iqtesadiyah',
    label: 'Iqtesadiyah - Finance & Business',
    icon: BarChart3,
    children: [
      { key: 'qardan', label: 'Qardan Hasana', icon: PieChart, path: '/iqtesadiyah/qardan-hasana' }
    ]
  },
  {
    key: 'amlaak',
    label: 'Amlaak - Waqf / Properties',
    icon: Building,
    children: [
      { key: 'properties', label: 'Property List', icon: Building, path: '/iqtesadiyah/qardan-hasana' }
    ]
  },
  {
    key: 'sehat',
    label: 'Sehat - Health Affairs',
    icon: Heart,
    children: [
      { key: 'doctors', label: 'Doctors Directory', icon: UserPlus, path: '/sehat/doctors-directory' }
    ]
  },
  {
    key: 'hallbooking',
    label: 'Hall Booking',
    icon: Home,
    children: [
      { key: 'booking-reg', label: 'Registration', icon: Calendar, path: '/hall-booking/booking' },
      { key: 'booking-report', label: 'Report', icon: FileText, path: '/hall-booking/report' }
    ]
  },
  {
    key: 'app',
    label: 'App',
    icon: Smartphone,
    children: [
      { key: 'install-summary', label: 'Install Summary', icon: PieChart, path: '/app/install-summary' },
      { key: 'rsvp', label: 'RSVP Report', icon: ClipboardList, path: '/app/rsvp-report' }
    ]
  },
  {
    key: 'tools',
    label: 'Tools',
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
    if (child.children) return child.children.some(gc => {
      if (gc.path && location.pathname === gc.path) return true
      if (gc.children) return gc.children.some(ggc => location.pathname === ggc.path)
      return false
    })
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
              maxHeight: isOpen ? '1000px' : '0',
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
  const [search, setSearch] = useState('')

  const filteredMenu = search
    ? menuConfig.filter(item => {
        const label = item.label.toLowerCase()
        const q = search.toLowerCase()
        if (label.includes(q)) return true
        if (item.children) {
          return item.children.some(c => {
            if (c.label.toLowerCase().includes(q)) return true
            if (c.children) return c.children.some(gc => gc.label.toLowerCase().includes(q))
            return false
          })
        }
        return false
      })
    : menuConfig

  return (
    <aside
      className={`fixed top-0 left-0 h-screen z-50 flex flex-col transition-all duration-300 ${
        isCollapsed ? 'w-[60px]' : 'w-[270px]'
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

      {/* Search */}
      {!isCollapsed && (
        <div className="px-3 py-2">
          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-white/10 border border-white/10 rounded text-white text-xs placeholder:text-white/40 outline-none focus:border-blue-400/50"
            />
          </div>
        </div>
      )}

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-1">
        {filteredMenu.map(item => (
          <MenuItem key={item.key} item={item} depth={0} />
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-white/10">
        <button
          onClick={logout}
          className="sidebar-item w-full text-red-400 hover:text-red-300 hover:bg-red-500/10"
        >
          <LogOut size={18} className="shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  )
}
