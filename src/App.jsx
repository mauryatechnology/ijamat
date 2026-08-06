import { Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import { DataProvider } from './context/DataContext'
import { SidebarProvider } from './context/SidebarContext'
import MainLayout from './components/layout/MainLayout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import MumineenList from './pages/mumineen/MumineenList'
import AddMumineen from './pages/mumineen/AddMumineen'
import MumineenRecord from './pages/mumineen/MumineenRecord'

// Phase 1 Maliyah Accounts imports
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

import QardRepay from './pages/maliyah/QardRepay'
import ReceiptPrint from './pages/maliyah/ReceiptPrint'
import ReceiptReprint from './pages/maliyah/ReceiptReprint'
import DailyCollectionThali from './pages/maliyah/DailyCollectionThali'
import QardIssue from './pages/maliyah/QardIssue'
import DueForm from './pages/maliyah/DueForm'
import NOCForm from './pages/maliyah/NOCForm'
import DueFormAll from './pages/maliyah/DueFormAll'
import NOCCommitment from './pages/maliyah/NOCCommitment'
import NOCList from './pages/maliyah/NOCList'
import CollectionDetail from './pages/maliyah/CollectionDetail'
import CollectionSummary from './pages/maliyah/CollectionSummary'
import DueListMonthly from './pages/maliyah/DueListMonthly'
import DueListColumn from './pages/maliyah/DueListColumn'
import DueListAll from './pages/maliyah/DueListAll'
import DueSummary from './pages/maliyah/DueSummary'
import BankSlip from './pages/maliyah/BankSlip'
import DueListHeadSel from './pages/maliyah/DueListHeadSel'
import CollectionSummaryOA from './pages/maliyah/CollectionSummaryOA'
import CollSummBankSector from './pages/maliyah/CollSummBankSector'
import CollSummBankOverall from './pages/maliyah/CollSummBankOverall'
import CollSummRent from './pages/maliyah/CollSummRent'
import DataEditReport from './pages/maliyah/DataEditReport'
import MultipleLedger from './pages/maliyah/MultipleLedger'
import OnlineTransactions from './pages/maliyah/OnlineTransactions'
import DailyDueSMS from './pages/maliyah/DailyDueSMS'
import ImportReceipt from './pages/maliyah/ImportReceipt'
import PDCReconciliation from './pages/maliyah/PDCReconciliation'
import CollectionTransfer from './pages/maliyah/CollectionTransfer'

// Phase 2 Maliyah Sabil & Accounting imports
import SabilCardTakhmeenOB from './pages/maliyah/sabil/SabilCardTakhmeenOB'
import SabilCardTakhmeen from './pages/maliyah/sabil/SabilCardTakhmeen'
import SabilCardCancel from './pages/maliyah/sabil/SabilCardCancel'
import NewSabil from './pages/maliyah/sabil/NewSabil'
import ImportSabil from './pages/maliyah/sabil/ImportSabil'
import ImportTakhmeen from './pages/maliyah/sabil/ImportTakhmeen'
import ImportUpdSabilITS from './pages/maliyah/sabil/ImportUpdSabilITS'
import SabilTakhProposed from './pages/maliyah/sabil/SabilTakhProposed'
import ImportTakhProposed from './pages/maliyah/sabil/ImportTakhProposed'

import EditCode from './pages/maliyah/sabil/EditCode'
import UpdateSabil from './pages/maliyah/sabil/UpdateSabil'
import UpdateTakhmeen from './pages/maliyah/sabil/UpdateTakhmeen'
import UpdateFamilyMembers from './pages/maliyah/sabil/UpdateFamilyMembers'
import AddressChangeRequest from './pages/maliyah/sabil/AddressChangeRequest'
import ManageBuildings from './pages/maliyah/sabil/ManageBuildings'

import CardList from './pages/maliyah/sabil/CardList'
import PrintSabilCard from './pages/maliyah/sabil/PrintSabilCard'
import RazaForm from './pages/maliyah/sabil/RazaForm'
import TakhmeenLetter from './pages/maliyah/sabil/TakhmeenLetter'
import SabilLabelAll from './pages/maliyah/sabil/SabilLabelAll'
import MumineenFilterList from './pages/maliyah/sabil/MumineenFilterList'
import AddressWiseFamilyList from './pages/maliyah/sabil/AddressWiseFamilyList'
import Envelope from './pages/maliyah/sabil/Envelope'
import SummaryReports from './pages/maliyah/sabil/SummaryReports'
import SabilForm from './pages/maliyah/sabil/SabilForm'
import RazaFormList from './pages/maliyah/sabil/RazaFormList'
import RazaFormCancel from './pages/maliyah/sabil/RazaFormCancel'
import HOFListMasool from './pages/maliyah/sabil/HOFListMasool'
import HOFFile from './pages/maliyah/sabil/HOFFile'
import TakhmeenSummary from './pages/maliyah/sabil/TakhmeenSummary'
import TakhmeenForm from './pages/maliyah/sabil/TakhmeenForm'

import NOCAutoClear from './pages/maliyah/sabil/NOCAutoClear'
import ChangeSabilMobile from './pages/maliyah/sabil/ChangeSabilMobile'
import SafaiNiyaz from './pages/maliyah/sabil/SafaiNiyaz'
import SafaiQardan from './pages/maliyah/sabil/SafaiQardan'
import SabilRemove from './pages/maliyah/sabil/SabilRemove'

import LedgerDisplay from './pages/maliyah/accounting/LedgerDisplay'
import TrialBalance from './pages/maliyah/accounting/TrialBalance'
import FinalAccount from './pages/maliyah/accounting/FinalAccount'

// Phase 3 FMB imports
import ThaliMaster from './pages/fmb/ThaliMaster'
import ThaliReport from './pages/fmb/ThaliReport'
import MenuManage from './pages/fmb/MenuManage'
import MenuReport from './pages/fmb/MenuReport'

import MenuAdd from './pages/fmb/menu/MenuAdd'
import MenuEdit from './pages/fmb/menu/MenuEdit'
import KhidmatAssign from './pages/fmb/menu/KhidmatAssign'
import MenuSummary from './pages/fmb/menu/MenuSummary'
import ThaliCostingSummary from './pages/fmb/menu/ThaliCostingSummary'
import DishCategory from './pages/fmb/menu/DishCategory'
import DishMaster from './pages/fmb/menu/DishMaster'

import MenuEntryEdit from './pages/fmb/inventory/MenuEntryEdit'

import RegSetup from './pages/fmb/registration/RegSetup'
import RegStatus from './pages/fmb/registration/RegStatus'
import RegStatusSizeWise from './pages/fmb/registration/RegStatusSizeWise'
import RegManual from './pages/fmb/registration/RegManual'
import RegReport from './pages/fmb/registration/RegReport'
import DispatchScan from './pages/fmb/registration/DispatchScan'
import DispatchReport from './pages/fmb/registration/DispatchReport'
import ThaliDistributor from './pages/fmb/registration/ThaliDistributor'

import FeedbackSummary from './pages/fmb/app/FeedbackSummary'
import SkipThaliReport from './pages/fmb/app/SkipThaliReport'
import ScanningReport from './pages/fmb/app/ScanningReport'
import ThaliCodeUpdate from './pages/fmb/app/ThaliCodeUpdate'

// Phase 4 Deeniyah & Talimiyah imports
import AmalReport from './pages/deeniyah/AmalReport'
import WafatUpdate from './pages/deeniyah/WafatUpdate'
import NiyaazList from './pages/deeniyah/NiyaazList'

import SabaqAttendanceReport from './pages/deeniyah/sabaq/SabaqAttendanceReport'
import SabaqGroupWise from './pages/deeniyah/sabaq/SabaqGroupWise'
import SabaqHOFWise from './pages/deeniyah/sabaq/SabaqHOFWise'
import SabaqMasool from './pages/deeniyah/sabaq/SabaqMasool'
import SabaqMasoolWise from './pages/deeniyah/sabaq/SabaqMasoolWise'
import SabaqMumineen from './pages/deeniyah/sabaq/SabaqMumineen'
import SabaqSummary from './pages/deeniyah/sabaq/SabaqSummary'
import SabaqPercentage from './pages/deeniyah/sabaq/SabaqPercentage'
import SabaqCard from './pages/deeniyah/sabaq/SabaqCard'
import SabaqCardSummary from './pages/deeniyah/sabaq/SabaqCardSummary'
import SabaqMumineenSummary from './pages/deeniyah/sabaq/SabaqMumineenSummary'
import SabaqChart from './pages/deeniyah/sabaq/SabaqChart'
import SabaqNonMasool from './pages/deeniyah/sabaq/SabaqNonMasool'
import SabaqAgeWise from './pages/deeniyah/sabaq/SabaqAgeWise'
import SabaqMonthWise from './pages/deeniyah/sabaq/SabaqMonthWise'
import SabaqYearWise from './pages/deeniyah/sabaq/SabaqYearWise'

import SabaqAttendance from './pages/talimiyah/SabaqAttendance'

// Phase 5 Tools & Admin imports
import ChangePassword from './pages/tools/ChangePassword'
import EditUser from './pages/tools/EditUser'
import UserCategoryPermission from './pages/tools/UserCategoryPermission'
import IslamicCalendar from './pages/tools/IslamicCalendar'
import VisitEntry from './pages/tools/VisitEntry'
import VisitReport from './pages/tools/VisitReport'
import ManageCaption from './pages/tools/ManageCaption'
import PhotoUpload from './pages/tools/PhotoUpload'
import DocumentUpload from './pages/tools/DocumentUpload'
import LiveEvent from './pages/tools/LiveEvent'
import LiveEventPermission from './pages/tools/LiveEventPermission'
import ManageMasool from './pages/tools/ManageMasool'
import ManageMusaeed from './pages/tools/ManageMusaeed'
import ManageMasoolaat from './pages/tools/ManageMasoolaat'
import ManageMusaedaat from './pages/tools/ManageMusaedaat'

// Phase 6 Remaining Modules imports
import UpliftmentSurvey from './pages/marafiq/UpliftmentSurvey'
import Household from './pages/marafiq/Household'
import Housing from './pages/marafiq/Housing'
import PersonalDetails from './pages/marafiq/PersonalDetails'
import Upliftment from './pages/marafiq/Upliftment'

import QazaCases from './pages/qaza/QazaCases'
import QazaAll from './pages/qaza/QazaAll'
import Vasiyat from './pages/qaza/Vasiyat'
import Partnership from './pages/qaza/Partnership'
import HaramInvestments from './pages/qaza/HaramInvestments'
import Qaziya from './pages/qaza/Qaziya'
import CourtCases from './pages/qaza/CourtCases'
import SulahCompromise from './pages/qaza/SulahCompromise'
import InheritanceDistribution from './pages/qaza/InheritanceDistribution'
import LeaseRentalAgreement from './pages/qaza/LeaseRentalAgreement'
import DebtRecovery from './pages/qaza/DebtRecovery'
import PropertyDisputes from './pages/qaza/PropertyDisputes'

import BookingCalendar from './pages/hallbooking/BookingCalendar'
import BookingReceipt from './pages/hallbooking/BookingReceipt'
import NotificationCenter from './pages/app/NotificationCenter'
import UserActivityLog from './pages/app/UserActivityLog'
import InstallList from './pages/app/InstallList'

import GovtLiaison from './pages/kharejiyah/GovtLiaison'

import MedicalCamp from './pages/sehat/MedicalCamp'
import Environment from './pages/sehat/Environment'
import HealthRecord from './pages/sehat/HealthRecord'
import Nazafat from './pages/sehat/Nazafat'
import Sports from './pages/sehat/Sports'

import StaffSalary from './pages/mawareed/StaffSalary'

import CircularAnnounce from './pages/dakheliyah/CircularAnnounce'
import SurveyReport from './pages/dakheliyah/SurveyReport'

import BusinessDirectory from './pages/iqtesadiyah/BusinessDirectory'
import TajaratRaza from './pages/iqtesadiyah/TajaratRaza'

// Base module imports
import SendMessage from './pages/dakheliyah/SendMessage'
import MessageReport from './pages/dakheliyah/MessageReport'
import MemberList from './pages/mawareed/MemberList'
import AddMember from './pages/mawareed/AddMember'
import QazaReport from './pages/qaza/QazaReport'
import QardanHasana from './pages/iqtesadiyah/QardanHasana'
import DoctorsDirectory from './pages/sehat/DoctorsDirectory'
import HallBooking from './pages/hallbooking/HallBooking'
import BookingReport from './pages/hallbooking/BookingReport'
import RSVPReport from './pages/app/RSVPReport'
import InstallSummary from './pages/app/InstallSummary'
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

        {/* Mumineen Module */}
        <Route path="mumineen/list" element={<MumineenList />} />
        <Route path="mumineen/add" element={<AddMumineen />} />
        <Route path="mumineen/record" element={<MumineenRecord />} />

        {/* Deeniyah - Religious Affairs */}
        <Route path="deeniyah/amal-report" element={<AmalReport />} />
        <Route path="deeniyah/wafat-update" element={<WafatUpdate />} />
        <Route path="deeniyah/niyaaz-list" element={<NiyaazList />} />

        <Route path="deeniyah/sabaq/attendance-report" element={<SabaqAttendanceReport />} />
        <Route path="deeniyah/sabaq/group-wise" element={<SabaqGroupWise />} />
        <Route path="deeniyah/sabaq/hof-wise" element={<SabaqHOFWise />} />
        <Route path="deeniyah/sabaq/masool" element={<SabaqMasool />} />
        <Route path="deeniyah/sabaq/masool-wise" element={<SabaqMasoolWise />} />
        <Route path="deeniyah/sabaq/mumineen" element={<SabaqMumineen />} />
        <Route path="deeniyah/sabaq/summary" element={<SabaqSummary />} />
        <Route path="deeniyah/sabaq/percentage" element={<SabaqPercentage />} />
        <Route path="deeniyah/sabaq/card" element={<SabaqCard />} />
        <Route path="deeniyah/sabaq/card-summary" element={<SabaqCardSummary />} />
        <Route path="deeniyah/sabaq/mumineen-summary" element={<SabaqMumineenSummary />} />
        <Route path="deeniyah/sabaq/chart" element={<SabaqChart />} />
        <Route path="deeniyah/sabaq/non-masool" element={<SabaqNonMasool />} />
        <Route path="deeniyah/sabaq/age-wise" element={<SabaqAgeWise />} />
        <Route path="deeniyah/sabaq/month-wise" element={<SabaqMonthWise />} />
        <Route path="deeniyah/sabaq/year-wise" element={<SabaqYearWise />} />

        {/* Marafiq - Upliftment */}
        <Route path="marafiq/muwasaat-entry" element={<MuwasaatEntry />} />
        <Route path="marafiq/muwasaat-report" element={<MuwasaatReport />} />
        <Route path="marafiq/upliftment-survey" element={<UpliftmentSurvey />} />
        <Route path="marafiq/household" element={<Household />} />
        <Route path="marafiq/housing" element={<Housing />} />
        <Route path="marafiq/personal-details" element={<PersonalDetails />} />
        <Route path="marafiq/upliftment" element={<Upliftment />} />

        {/* Talimiyah - Education */}
        <Route path="talimiyah/sabaq-attendance" element={<SabaqAttendance />} />

        {/* Dakheliyah - Internal Affairs */}
        <Route path="dakheliyah/send-message" element={<SendMessage />} />
        <Route path="dakheliyah/message-report" element={<MessageReport />} />
        <Route path="dakheliyah/circular-announce" element={<CircularAnnounce />} />
        <Route path="dakheliyah/survey-report" element={<SurveyReport />} />

        {/* Mawareed - HR */}
        <Route path="mawareed/add-member" element={<AddMember />} />
        <Route path="mawareed/member-list" element={<MemberList />} />
        <Route path="mawareed/staff-salary" element={<StaffSalary />} />

        {/* Maliyah - Financial & Accounts */}
        <Route path="maliyah/daily-collection" element={<DailyCollection />} />
        <Route path="maliyah/qard-repay" element={<QardRepay />} />
        <Route path="maliyah/receipt-print" element={<ReceiptPrint />} />
        <Route path="maliyah/receipt-reprint" element={<ReceiptReprint />} />
        <Route path="maliyah/daily-collection-thali" element={<DailyCollectionThali />} />
        <Route path="maliyah/qard-issue" element={<QardIssue />} />
        <Route path="maliyah/voucher-entry" element={<VoucherEntry />} />

        <Route path="maliyah/individual-ledger" element={<IndividualLedger />} />
        <Route path="maliyah/due-form" element={<DueForm />} />
        <Route path="maliyah/noc-form" element={<NOCForm />} />
        <Route path="maliyah/due-form-all" element={<DueFormAll />} />
        <Route path="maliyah/noc-commitment" element={<NOCCommitment />} />
        <Route path="maliyah/noc-list" element={<NOCList />} />
        <Route path="maliyah/collection-detail" element={<CollectionDetail />} />
        <Route path="maliyah/collection-summary" element={<CollectionSummary />} />
        <Route path="maliyah/due-list-monthly" element={<DueListMonthly />} />
        <Route path="maliyah/due-list-column" element={<DueListColumn />} />
        <Route path="maliyah/due-list" element={<DueList />} />
        <Route path="maliyah/due-list-all" element={<DueListAll />} />
        <Route path="maliyah/due-summary" element={<DueSummary />} />
        <Route path="maliyah/bank-slip" element={<BankSlip />} />
        <Route path="maliyah/due-list-head-sel" element={<DueListHeadSel />} />
        <Route path="maliyah/collection-summary-oa" element={<CollectionSummaryOA />} />
        <Route path="maliyah/coll-summ-bank-sector" element={<CollSummBankSector />} />
        <Route path="maliyah/coll-summ-bank-overall" element={<CollSummBankOverall />} />
        <Route path="maliyah/coll-summ-rent" element={<CollSummRent />} />
        <Route path="maliyah/data-edit-report" element={<DataEditReport />} />
        <Route path="maliyah/multiple-ledger" element={<MultipleLedger />} />
        <Route path="maliyah/collection-report" element={<CollectionReport />} />
        <Route path="maliyah/day-book" element={<DayBook />} />
        <Route path="maliyah/online-transactions" element={<OnlineTransactions />} />

        <Route path="maliyah/hof-list" element={<HOFList />} />
        <Route path="maliyah/mumineen-filter" element={<MumineenFilter />} />
        <Route path="maliyah/daily-due-sms" element={<DailyDueSMS />} />
        <Route path="maliyah/import-receipt" element={<ImportReceipt />} />
        <Route path="maliyah/pdc-reconciliation" element={<PDCReconciliation />} />
        <Route path="maliyah/collection-transfer" element={<CollectionTransfer />} />

        <Route path="maliyah/sabil-entry" element={<SabilEntry />} />
        <Route path="maliyah/sabil-report" element={<SabilReport />} />
        <Route path="maliyah/sabil/card-takhmeen-ob" element={<SabilCardTakhmeenOB />} />
        <Route path="maliyah/sabil/card-takhmeen" element={<SabilCardTakhmeen />} />
        <Route path="maliyah/sabil/card-cancel" element={<SabilCardCancel />} />
        <Route path="maliyah/sabil/new-sabil" element={<NewSabil />} />
        <Route path="maliyah/sabil/import-sabil" element={<ImportSabil />} />
        <Route path="maliyah/sabil/import-takhmeen" element={<ImportTakhmeen />} />
        <Route path="maliyah/sabil/import-upd-sabil-its" element={<ImportUpdSabilITS />} />
        <Route path="maliyah/sabil/takh-proposed" element={<SabilTakhProposed />} />
        <Route path="maliyah/sabil/import-takh-proposed" element={<ImportTakhProposed />} />

        <Route path="maliyah/sabil/edit-code" element={<EditCode />} />
        <Route path="maliyah/sabil/update-sabil" element={<UpdateSabil />} />
        <Route path="maliyah/sabil/update-takhmeen" element={<UpdateTakhmeen />} />
        <Route path="maliyah/sabil/update-family-members" element={<UpdateFamilyMembers />} />
        <Route path="maliyah/sabil/address-change-request" element={<AddressChangeRequest />} />
        <Route path="maliyah/sabil/manage-buildings" element={<ManageBuildings />} />

        <Route path="maliyah/sabil/card-list" element={<CardList />} />
        <Route path="maliyah/sabil/print-card" element={<PrintSabilCard />} />
        <Route path="maliyah/sabil/raza-form" element={<RazaForm />} />
        <Route path="maliyah/sabil/takhmeen-letter" element={<TakhmeenLetter />} />
        <Route path="maliyah/sabil/label-all" element={<SabilLabelAll />} />
        <Route path="maliyah/sabil/mumineen-filter-list" element={<MumineenFilterList />} />
        <Route path="maliyah/sabil/address-family-list" element={<AddressWiseFamilyList />} />
        <Route path="maliyah/sabil/envelope" element={<Envelope />} />
        <Route path="maliyah/sabil/summary-reports" element={<SummaryReports />} />
        <Route path="maliyah/sabil/sabil-form" element={<SabilForm />} />
        <Route path="maliyah/sabil/raza-form-list" element={<RazaFormList />} />
        <Route path="maliyah/sabil/raza-form-cancel" element={<RazaFormCancel />} />
        <Route path="maliyah/sabil/hof-list-masool" element={<HOFListMasool />} />
        <Route path="maliyah/sabil/hof-file" element={<HOFFile />} />
        <Route path="maliyah/sabil/takhmeen-summary" element={<TakhmeenSummary />} />
        <Route path="maliyah/sabil/takhmeen-form" element={<TakhmeenForm />} />

        <Route path="maliyah/sabil/noc-auto-clear" element={<NOCAutoClear />} />
        <Route path="maliyah/sabil/change-mobile" element={<ChangeSabilMobile />} />
        <Route path="maliyah/sabil/safai-niyaz" element={<SafaiNiyaz />} />
        <Route path="maliyah/sabil/safai-qardan" element={<SafaiQardan />} />
        <Route path="maliyah/sabil/sabil-remove" element={<SabilRemove />} />

        <Route path="maliyah/accounting/ledger-display" element={<LedgerDisplay />} />
        <Route path="maliyah/accounting/trial-balance" element={<TrialBalance />} />
        <Route path="maliyah/accounting/final-account" element={<FinalAccount />} />

        {/* Kharejiyah - External */}
        <Route path="kharejiyah/report" element={<KharejiyahReport />} />
        <Route path="kharejiyah/govt-liaison" element={<GovtLiaison />} />

        {/* Qaza - Legal */}
        <Route path="qaza/report" element={<QazaReport />} />
        <Route path="qaza/qaza-cases" element={<QazaCases />} />
        <Route path="qaza/qaza-all" element={<QazaAll />} />
        <Route path="qaza/vasiyat" element={<Vasiyat />} />
        <Route path="qaza/partnership" element={<Partnership />} />
        <Route path="qaza/haram-investments" element={<HaramInvestments />} />
        <Route path="qaza/qaziya" element={<Qaziya />} />
        <Route path="qaza/court-cases" element={<CourtCases />} />
        <Route path="qaza/sulah-compromise" element={<SulahCompromise />} />
        <Route path="qaza/inheritance" element={<InheritanceDistribution />} />
        <Route path="qaza/lease-rental" element={<LeaseRentalAgreement />} />
        <Route path="qaza/debt-recovery" element={<DebtRecovery />} />
        <Route path="qaza/property-disputes" element={<PropertyDisputes />} />

        {/* FMB / Niyaz */}
        <Route path="fmb/thali-master" element={<ThaliMaster />} />
        <Route path="fmb/thali-report" element={<ThaliReport />} />
        <Route path="fmb/menu-manage" element={<MenuManage />} />
        <Route path="fmb/menu-report" element={<MenuReport />} />

        <Route path="fmb/menu/add" element={<MenuAdd />} />
        <Route path="fmb/menu/edit" element={<MenuEdit />} />
        <Route path="fmb/menu/report" element={<MenuReport />} />
        <Route path="fmb/menu/khidmat-assign" element={<KhidmatAssign />} />
        <Route path="fmb/menu/summary" element={<MenuSummary />} />
        <Route path="fmb/menu/thali-costing-summary" element={<ThaliCostingSummary />} />
        <Route path="fmb/menu/dish-category" element={<DishCategory />} />
        <Route path="fmb/menu/dish-master" element={<DishMaster />} />

        <Route path="fmb/inventory/menu-entry-edit" element={<MenuEntryEdit />} />

        <Route path="fmb/registration/reg-setup" element={<RegSetup />} />
        <Route path="fmb/registration/reg-status" element={<RegStatus />} />
        <Route path="fmb/registration/reg-status-size-wise" element={<RegStatusSizeWise />} />
        <Route path="fmb/registration/reg-manual" element={<RegManual />} />
        <Route path="fmb/registration/reg-report" element={<RegReport />} />
        <Route path="fmb/registration/dispatch-scan" element={<DispatchScan />} />
        <Route path="fmb/registration/dispatch-report" element={<DispatchReport />} />
        <Route path="fmb/registration/thali-distributor" element={<ThaliDistributor />} />

        <Route path="fmb/app/feedback-summary" element={<FeedbackSummary />} />
        <Route path="fmb/app/skip-thali-report" element={<SkipThaliReport />} />
        <Route path="fmb/app/scanning-report" element={<ScanningReport />} />
        <Route path="fmb/app/thali-code-update" element={<ThaliCodeUpdate />} />

        {/* Iqtesadiyah */}
        <Route path="iqtesadiyah/qardan-hasana" element={<QardanHasana />} />
        <Route path="iqtesadiyah/business-directory" element={<BusinessDirectory />} />
        <Route path="iqtesadiyah/tajarat-raza" element={<TajaratRaza />} />

        {/* Sehat */}
        <Route path="sehat/doctors-directory" element={<DoctorsDirectory />} />
        <Route path="sehat/medical-camp" element={<MedicalCamp />} />
        <Route path="sehat/environment" element={<Environment />} />
        <Route path="sehat/health-record" element={<HealthRecord />} />
        <Route path="sehat/nazafat" element={<Nazafat />} />
        <Route path="sehat/sports" element={<Sports />} />

        {/* Hall Booking */}
        <Route path="hall-booking/booking" element={<HallBooking />} />
        <Route path="hall-booking/report" element={<BookingReport />} />
        <Route path="hall-booking/booking-calendar" element={<BookingCalendar />} />
        <Route path="hall-booking/booking-receipt" element={<BookingReceipt />} />

        {/* App */}
        <Route path="app/rsvp-report" element={<RSVPReport />} />
        <Route path="app/install-summary" element={<InstallSummary />} />
        <Route path="app/install-list" element={<InstallList />} />
        <Route path="app/notification-center" element={<NotificationCenter />} />
        <Route path="app/user-activity-log" element={<UserActivityLog />} />

        {/* Tools */}
        <Route path="tools/change-password" element={<ChangePassword />} />
        <Route path="tools/edit-user" element={<EditUser />} />
        <Route path="tools/user-category-permission" element={<UserCategoryPermission />} />
        <Route path="tools/islamic-calendar" element={<IslamicCalendar />} />
        <Route path="tools/visit-entry" element={<VisitEntry />} />
        <Route path="tools/visit-report" element={<VisitReport />} />
        <Route path="tools/manage-caption" element={<ManageCaption />} />
        <Route path="tools/photo-upload" element={<PhotoUpload />} />
        <Route path="tools/document-upload" element={<DocumentUpload />} />
        <Route path="tools/live-event" element={<LiveEvent />} />
        <Route path="tools/live-event-permission" element={<LiveEventPermission />} />
        <Route path="tools/manage-masool" element={<ManageMasool />} />
        <Route path="tools/manage-musaeed" element={<ManageMusaeed />} />
        <Route path="tools/manage-masoolaat" element={<ManageMasoolaat />} />
        <Route path="tools/manage-musaedaat" element={<ManageMusaedaat />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <SidebarProvider>
            <AppRoutes />
          </SidebarProvider>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
