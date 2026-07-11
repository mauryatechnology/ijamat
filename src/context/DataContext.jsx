import { createContext, useContext, useState, useCallback } from 'react'
import membersData from '../data/members.json'
import sabilData from '../data/sabil.json'
import thaliData from '../data/thali.json'
import collectionsData from '../data/collections.json'
import duesData from '../data/dues.json'
import messagesData from '../data/messages.json'
import hallBookingsData from '../data/hallBookings.json'
import menuItemsData from '../data/menuItems.json'
import dropdownOptionsData from '../data/dropdownOptions.json'
import dashboardStatsData from '../data/dashboardStats.json'

const DataContext = createContext(null)

export function DataProvider({ children }) {
  const [members, setMembers] = useState(membersData)
  const [sabil, setSabil] = useState(sabilData)
  const [thali, setThali] = useState(thaliData)
  const [collections, setCollections] = useState(collectionsData)
  const [dues, setDues] = useState(duesData)
  const [messages, setMessages] = useState(messagesData)
  const [hallBookings, setHallBookings] = useState(hallBookingsData)
  const [menuItems, setMenuItems] = useState(menuItemsData)

  const addCollection = useCallback((entry) => {
    setCollections(prev => [{ id: Date.now(), ...entry }, ...prev])
  }, [])

  const addMember = useCallback((member) => {
    setMembers(prev => [{ id: Date.now(), ...member }, ...prev])
  }, [])

  const addMessage = useCallback((msg) => {
    setMessages(prev => [{ id: Date.now(), ...msg }, ...prev])
  }, [])

  const addBooking = useCallback((booking) => {
    setHallBookings(prev => [{ id: Date.now(), ...booking }, ...prev])
  }, [])

  const addMenuItem = useCallback((item) => {
    setMenuItems(prev => [{ id: Date.now(), ...item }, ...prev])
  }, [])

  const addSabil = useCallback((entry) => {
    setSabil(prev => [{ id: Date.now(), ...entry }, ...prev])
  }, [])

  const addThali = useCallback((entry) => {
    setThali(prev => [{ id: Date.now(), ...entry }, ...prev])
  }, [])

  return (
    <DataContext.Provider value={{
      members, sabil, thali, collections, dues, messages,
      hallBookings, menuItems,
      dropdownOptions: dropdownOptionsData,
      dashboardStats: dashboardStatsData,
      addCollection, addMember, addMessage,
      addBooking, addMenuItem,
      addSabil, addThali
    }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (!context) throw new Error('useData must be used within DataProvider')
  return context
}
