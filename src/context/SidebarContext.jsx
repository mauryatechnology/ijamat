import { createContext, useContext, useState } from 'react'

const SidebarContext = createContext(null)

export function SidebarProvider({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [openMenus, setOpenMenus] = useState({})

  const toggleSidebar = () => setIsCollapsed(prev => !prev)

  const toggleMenu = (menuKey) => {
    setOpenMenus(prev => ({ ...prev, [menuKey]: !prev[menuKey] }))
  }

  const isMenuOpen = (menuKey) => !!openMenus[menuKey]

  return (
    <SidebarContext.Provider value={{
      isCollapsed,
      toggleSidebar,
      toggleMenu,
      isMenuOpen
    }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) throw new Error('useSidebar must be used within SidebarProvider')
  return context
}
