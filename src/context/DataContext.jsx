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
// New data imports — Phase 0
import nocRecordsData from '../data/nocRecords.json'
import qardLoansData from '../data/qardLoans.json'
import receiptLogData from '../data/receiptLog.json'
import sabaqAttendanceData from '../data/sabaqAttendance.json'
import takhmeenDataList from '../data/takhmeenData.json'
import razaFormsData from '../data/razaForms.json'
import fmbRegistrationData from '../data/fmbRegistration.json'
import fmbFeedbackData from '../data/fmbFeedback.json'
import dishMasterData from '../data/dishMaster.json'
import inventoryItemsData from '../data/inventoryItems.json'
import surveyDataList from '../data/surveyData.json'
import qazaCasesData from '../data/qazaCases.json'
import niyazEventsData from '../data/niyazEvents.json'
import visitLogData from '../data/visitLog.json'
import userPermissionsData from '../data/userPermissions.json'
import buildingsMasterData from '../data/buildingsMaster.json'
import masoolDataFile from '../data/masoolData.json'
import accountsLedgerData from '../data/accountsLedger.json'
import bankReconciliationData from '../data/bankReconciliation.json'

const DataContext = createContext(null)

export function DataProvider({ children }) {
  // Existing state
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

  // New state — Phase 0
  const [nocRecords, setNocRecords] = useState(nocRecordsData)
  const [qardLoans, setQardLoans] = useState(qardLoansData)
  const [receiptLog, setReceiptLog] = useState(receiptLogData)
  const [sabaqAttendance] = useState(sabaqAttendanceData)
  const [takhmeenData, setTakhmeenData] = useState(takhmeenDataList)
  const [razaForms, setRazaForms] = useState(razaFormsData)
  const [fmbRegistration, setFmbRegistration] = useState(fmbRegistrationData)
  const [fmbFeedback] = useState(fmbFeedbackData)
  const [dishMaster, setDishMaster] = useState(dishMasterData)
  const [inventoryItems, setInventoryItems] = useState(inventoryItemsData)
  const [surveyData] = useState(surveyDataList)
  const [qazaCases] = useState(qazaCasesData)
  const [niyazEvents, setNiyazEvents] = useState(niyazEventsData)
  const [visitLog, setVisitLog] = useState(visitLogData)
  const [userPermissions, setUserPermissions] = useState(userPermissionsData)
  const [buildingsMaster, setBuildingsMaster] = useState(buildingsMasterData)
  const [masoolData, setMasoolData] = useState(masoolDataFile)
  const [accountsLedger, setAccountsLedger] = useState(accountsLedgerData)
  const [bankReconciliation, setBankReconciliation] = useState(bankReconciliationData)

  // ─── Existing add functions ───
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

  // ─── New add/update functions — Phase 0 ───
  const addNOC = useCallback((noc) => {
    setNocRecords(prev => [{ id: Date.now(), ...noc }, ...prev])
  }, [])

  const updateNOC = useCallback((nocId, updates) => {
    setNocRecords(prev => prev.map(n => n.id === nocId ? { ...n, ...updates } : n))
  }, [])

  const addQardLoan = useCallback((loan) => {
    setQardLoans(prev => [{ id: Date.now(), repayments: [], totalRepaid: 0, balance: loan.loanAmount, ...loan }, ...prev])
  }, [])

  const addQardRepayment = useCallback((loanId, repayment) => {
    setQardLoans(prev => prev.map(loan => {
      if (loan.id === loanId) {
        const newRepayments = [...loan.repayments, repayment]
        const totalRepaid = newRepayments.reduce((sum, r) => sum + r.amount, 0)
        return { ...loan, repayments: newRepayments, totalRepaid, balance: loan.loanAmount - totalRepaid, status: totalRepaid >= loan.loanAmount ? 'Closed' : 'Active' }
      }
      return loan
    }))
  }, [])

  const addReceipt = useCallback((receipt) => {
    setReceiptLog(prev => [{ id: Date.now(), reprintCount: 0, lastReprintAt: null, ...receipt }, ...prev])
  }, [])

  const reprintReceipt = useCallback((receiptNo) => {
    setReceiptLog(prev => prev.map(r => r.receiptNo === receiptNo ? { ...r, reprintCount: r.reprintCount + 1, lastReprintAt: new Date().toISOString() } : r))
  }, [])

  const addNiyazEvent = useCallback((event) => {
    setNiyazEvents(prev => [{ id: Date.now(), ...event }, ...prev])
  }, [])

  const updateNiyazEvent = useCallback((eventId, updates) => {
    setNiyazEvents(prev => prev.map(e => e.id === eventId ? { ...e, ...updates } : e))
  }, [])

  const addRazaForm = useCallback((form) => {
    setRazaForms(prev => [{ id: Date.now(), status: 'Active', cancelledDate: null, cancelReason: '', ...form }, ...prev])
  }, [])

  const cancelRazaForm = useCallback((formId, reason) => {
    setRazaForms(prev => prev.map(f => f.id === formId ? { ...f, status: 'Cancelled', cancelledDate: new Date().toISOString().split('T')[0], cancelReason: reason } : f))
  }, [])

  const addFmbRegistration = useCallback((reg) => {
    setFmbRegistration(prev => ({ ...prev, registrations: [{ id: Date.now(), scanHistory: [], dispatchStatus: 'Pending', ...reg }, ...prev.registrations] }))
  }, [])

  const updateFmbDispatch = useCallback((regId, dispatchData) => {
    setFmbRegistration(prev => ({
      ...prev,
      registrations: prev.registrations.map(r => r.id === regId ? { ...r, ...dispatchData } : r)
    }))
  }, [])

  const addVisit = useCallback((visit) => {
    setVisitLog(prev => [{ id: Date.now(), ...visit }, ...prev])
  }, [])

  const addDish = useCallback((dish) => {
    setDishMaster(prev => ({ ...prev, dishes: [{ id: Date.now(), ...dish }, ...prev.dishes] }))
  }, [])

  const addDishCategory = useCallback((category) => {
    setDishMaster(prev => ({ ...prev, categories: [{ id: Date.now(), ...category }, ...prev.categories] }))
  }, [])

  const addInventoryItem = useCallback((item) => {
    setInventoryItems(prev => [{ id: Date.now(), ...item }, ...prev])
  }, [])

  const updateInventoryItem = useCallback((itemId, updates) => {
    setInventoryItems(prev => prev.map(i => i.id === itemId ? { ...i, ...updates } : i))
  }, [])

  const addBuilding = useCallback((building) => {
    setBuildingsMaster(prev => [{ id: Date.now(), ...building }, ...prev])
  }, [])

  const updateUserPermission = useCallback((userId, updates) => {
    setUserPermissions(prev => ({
      ...prev,
      users: prev.users.map(u => u.id === userId ? { ...u, ...updates } : u)
    }))
  }, [])

  const addStaffUser = useCallback((user) => {
    setUserPermissions(prev => ({
      ...prev,
      users: [{ id: Date.now(), status: 'Active', lastLogin: 'Never', ...user }, ...prev.users]
    }))
  }, [])

  const deleteStaffUser = useCallback((userId) => {
    setUserPermissions(prev => ({
      ...prev,
      users: prev.users.filter(u => u.id !== userId)
    }))
  }, [])

  const addAccountTransaction = useCallback((txn) => {
    setAccountsLedger(prev => ({
      ...prev,
      transactions: [{ id: Date.now(), ...txn }, ...prev.transactions]
    }))
  }, [])

  const addTakhmeen = useCallback((entry) => {
    setTakhmeenData(prev => [{ id: Date.now(), ...entry }, ...prev])
  }, [])

  const updateTakhmeen = useCallback((takhId, updates) => {
    setTakhmeenData(prev => prev.map(t => t.id === takhId ? { ...t, ...updates } : t))
  }, [])

  const updateSabilMobile = useCallback((sabilNo, mobile) => {
    setSabil(prev => prev.map(s => s.sabilNo === sabilNo ? { ...s, mobile } : s))
    setMembers(prev => prev.map(m => m.sabilNo === sabilNo && m.hofOrFm === 'HOF' ? { ...m, mobile } : m))
  }, [])

  const removeSabil = useCallback((sabilNo) => {
    setSabil(prev => prev.filter(s => s.sabilNo !== sabilNo))
  }, [])

  const addMasool = useCallback((masool) => {
    setMasoolData(prev => ({ ...prev, masools: [{ id: Date.now(), ...masool }, ...prev.masools] }))
  }, [])

  const addMusaeed = useCallback((musaeed) => {
    setMasoolData(prev => ({ ...prev, musaeeds: [{ id: Date.now(), ...musaeed }, ...prev.musaeeds] }))
  }, [])

  const addMasoolaat = useCallback((masoolaat) => {
    setMasoolData(prev => ({ ...prev, masoolaats: [{ id: Date.now(), ...masoolaat }, ...prev.masoolaats] }))
  }, [])

  const addMusaedaat = useCallback((musaedaat) => {
    setMasoolData(prev => ({ ...prev, musaedaats: [{ id: Date.now(), ...musaedaat }, ...prev.musaedaats] }))
  }, [])

  const addBankReconciliation = useCallback((entry) => {
    setBankReconciliation(prev => [{ id: Date.now(), ...entry }, ...prev])
  }, [])

  const updateBankReconciliation = useCallback((entryId, updates) => {
    setBankReconciliation(prev => prev.map(b => b.id === entryId ? { ...b, ...updates } : b))
  }, [])

  return (
    <DataContext.Provider value={{
      // Existing data
      members, sabil, thali, collections, dues, messages,
      doctors, events, hallBookings, qardanHasana, vouchers,
      menuItems, muwasaat, attendance,
      sectors: sectorsData,
      dropdownOptions: dropdownOptionsData,
      dashboardStats: dashboardStatsData,
      // New data — Phase 0
      nocRecords, qardLoans, receiptLog, sabaqAttendance,
      takhmeenData, razaForms, fmbRegistration, fmbFeedback,
      dishMaster, inventoryItems, surveyData, qazaCases,
      niyazEvents, visitLog, userPermissions, buildingsMaster,
      masoolData, accountsLedger, bankReconciliation,
      // Existing functions
      addCollection, addMember, addVoucher, addMessage,
      addDoctor, addBooking, addMuwasaat, addMenuItem,
      addSabil, addThali,
      // New functions — Phase 0
      addNOC, updateNOC,
      addQardLoan, addQardRepayment,
      addReceipt, reprintReceipt,
      addNiyazEvent, updateNiyazEvent,
      addRazaForm, cancelRazaForm,
      addFmbRegistration, updateFmbDispatch,
      addVisit,
      addDish, addDishCategory,
      addInventoryItem, updateInventoryItem,
      addBuilding,
      updateUserPermission, addStaffUser, deleteStaffUser,
      addAccountTransaction,
      addTakhmeen, updateTakhmeen,
      updateSabilMobile, removeSabil,
      addMasool, addMusaeed, addMasoolaat, addMusaedaat,
      addBankReconciliation, updateBankReconciliation
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
