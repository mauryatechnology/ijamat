import { createContext, useContext, useState, useCallback } from 'react'
import membersData from '../data/members.json'
import sabilData from '../data/sabil.json'
import thaliData from '../data/thali.json'
import collectionsData from '../data/collections.json'
import duesData from '../data/dues.json'
import messagesData from '../data/messages.json'
import doctorsData from '../data/doctors.json'
import eventsData from '../data/events.json'
import hallBookingsData from '../data/hallBookings.json'
import qardanHasanaData from '../data/qardanHasana.json'
import vouchersData from '../data/vouchers.json'
import menuItemsData from '../data/menuItems.json'
import sectorsData from '../data/sectors.json'
import dropdownOptionsData from '../data/dropdownOptions.json'
import dashboardStatsData from '../data/dashboardStats.json'
import muwasaatData from '../data/muwasaat.json'
import attendanceData from '../data/attendance.json'

const DataContext = createContext(null)

export function DataProvider({ children }) {
  const [members, setMembers] = useState(membersData)
  const [sabil, setSabil] = useState(sabilData)
  const [thali, setThali] = useState(thaliData)
  const [collections, setCollections] = useState(collectionsData)
  const [dues, setDues] = useState(duesData)
  const [messages, setMessages] = useState(messagesData)
  const [doctors, setDoctors] = useState(doctorsData)
  const [events] = useState(eventsData)
  const [hallBookings, setHallBookings] = useState(hallBookingsData)
  const [qardanHasana] = useState(qardanHasanaData)
  const [vouchers, setVouchers] = useState(vouchersData)
  const [menuItems, setMenuItems] = useState(menuItemsData)
  const [muwasaat, setMuwasaat] = useState(muwasaatData)
  const [attendance] = useState(attendanceData)

  const addCollection = useCallback((entry) => {
    setCollections(prev => [{ id: Date.now(), ...entry }, ...prev])
  }, [])

  const addMember = useCallback((member) => {
    setMembers(prev => [{ id: Date.now(), ...member }, ...prev])
  }, [])

  const addVoucher = useCallback((voucher) => {
    setVouchers(prev => [{ id: Date.now(), ...voucher }, ...prev])
  }, [])

  const addMessage = useCallback((msg) => {
    setMessages(prev => [{ id: Date.now(), ...msg }, ...prev])
  }, [])

  const addDoctor = useCallback((doc) => {
    setDoctors(prev => [{ id: Date.now(), ...doc }, ...prev])
  }, [])

  const addBooking = useCallback((booking) => {
    setHallBookings(prev => [{ id: Date.now(), ...booking }, ...prev])
  }, [])

  const addMuwasaat = useCallback((entry) => {
    setMuwasaat(prev => [{ id: Date.now(), ...entry }, ...prev])
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
      doctors, events, hallBookings, qardanHasana, vouchers,
      menuItems, muwasaat, attendance,
      sectors: sectorsData,
      dropdownOptions: dropdownOptionsData,
      dashboardStats: dashboardStatsData,
      addCollection, addMember, addVoucher, addMessage,
      addDoctor, addBooking, addMuwasaat, addMenuItem,
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
