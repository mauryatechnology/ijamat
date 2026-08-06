import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useSidebar } from '../../context/SidebarContext'
import {
  LayoutDashboard, BookOpen, GraduationCap,
  Wallet, Globe, Scale, Utensils,
  Heart, Smartphone, Settings, LogOut, ChevronDown,
  Search, Menu, FileText, ClipboardList,
  UserPlus, DollarSign, CreditCard, BookOpenCheck,
  Calendar, Key, FolderOpen, Mail,
  ShieldCheck, Building2, Activity, Layers, List, PieChart, BarChart3, Building
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
    key: 'umoor-12',
    label: '12 Umoor',
    icon: Layers,
    children: [
      {
        key: 'deeniyah',
        label: '1. Umoor Deeniyah',
        icon: BookOpen,
        children: [
          {
            key: 'sabaq-menu',
            label: 'Sabaq',
            icon: BookOpenCheck,
            children: [
              { key: 'sabaq-attendance-rep', label: 'Sabaq Attendance Report', path: '/deeniyah/sabaq/attendance-report' },
              { key: 'sabaq-group-wise', label: 'Sabaq Group Wise', path: '/deeniyah/sabaq/group-wise' },
              { key: 'sabaq-hof-wise', label: 'Sabaq HOF Wise', path: '/deeniyah/sabaq/hof-wise' },
              { key: 'sabaq-masool', label: 'Sabaq Masool', path: '/deeniyah/sabaq/masool' },
              { key: 'sabaq-masool-wise', label: 'Sabaq Masool Wise', path: '/deeniyah/sabaq/masool-wise' },
              { key: 'sabaq-mumineen', label: 'Sabaq Mumineen', path: '/deeniyah/sabaq/mumineen' },
              { key: 'sabaq-summary', label: 'Sabaq Summary', path: '/deeniyah/sabaq/summary' },
              { key: 'sabaq-percentage', label: 'Sabaq Percentage', path: '/deeniyah/sabaq/percentage' },
              { key: 'sabaq-card', label: 'Sabaq Card', path: '/deeniyah/sabaq/card' },
              { key: 'sabaq-card-summary', label: 'Sabaq Card Summary', path: '/deeniyah/sabaq/card-summary' },
              { key: 'sabaq-mumineen-summary', label: 'Sabaq Mumineen Summary', path: '/deeniyah/sabaq/mumineen-summary' },
              { key: 'sabaq-chart', label: 'Sabaq Chart', path: '/deeniyah/sabaq/chart' },
              { key: 'sabaq-non-masool', label: 'Sabaq Non Masool', path: '/deeniyah/sabaq/non-masool' },
              { key: 'sabaq-age-wise', label: 'Sabaq Age Wise', path: '/deeniyah/sabaq/age-wise' },
              { key: 'sabaq-month-wise', label: 'Sabaq Month Wise', path: '/deeniyah/sabaq/month-wise' },
              { key: 'sabaq-year-wise', label: 'Sabaq Year Wise', path: '/deeniyah/sabaq/year-wise' }
            ]
          },
          { key: 'niyaaz-list', label: 'Niyaaz', icon: Utensils, path: '/deeniyah/niyaaz-list' },
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
        key: 'talimiyah',
        label: '2. Umoor Talimiyah',
        icon: GraduationCap,
        children: [
          { key: 'sabaq-attendance', label: 'Sabaq Attendance', path: '/talimiyah/sabaq-attendance' }
        ]
      },
      {
        key: 'maliyah',
        label: '3. Umoor Maliyah',
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
                  { key: 'qard-repay', label: 'Qard Repay', path: '/maliyah/qard-repay' },
                  { key: 'receipt-print', label: 'Receipt Printing', path: '/maliyah/receipt-print' },
                  { key: 'receipt-reprint', label: 'Reprint Receipt', path: '/maliyah/receipt-reprint' },
                  { key: 'daily-collection-thali', label: 'Daily Collection Thali', path: '/maliyah/daily-collection-thali' },
                  { key: 'qard-issue', label: 'Qard Issue Entry', path: '/maliyah/qard-issue' },
                  { key: 'voucher-entry', label: 'Voucher Entry', path: '/maliyah/voucher-entry' }
                ]
              },
              {
                key: 'reports',
                label: 'Reports',
                children: [
                  { key: 'ind-ledger', label: 'Individual Ledger', path: '/maliyah/individual-ledger' },
                  { key: 'due-form', label: 'Due Form', path: '/maliyah/due-form' },
                  { key: 'noc-form', label: 'NOC Form', path: '/maliyah/noc-form' },
                  { key: 'due-form-all', label: 'Due Form All', path: '/maliyah/due-form-all' },
                  { key: 'noc-commitment', label: 'NOC with Commitment', path: '/maliyah/noc-commitment' },
                  { key: 'noc-list', label: 'NOC List', path: '/maliyah/noc-list' },
                  { key: 'coll-detail', label: 'Collection Detail', path: '/maliyah/collection-detail' },
                  { key: 'coll-summary', label: 'Collection Summary', path: '/maliyah/collection-summary' },
                  { key: 'due-list-monthly', label: 'Due List Monthly', path: '/maliyah/due-list-monthly' },
                  { key: 'due-list-column', label: 'Due List Column', path: '/maliyah/due-list-column' },
                  { key: 'due-list', label: 'Due List', path: '/maliyah/due-list' },
                  { key: 'due-list-all', label: 'Due List All', path: '/maliyah/due-list-all' },
                  { key: 'due-summary', label: 'Due Summary', path: '/maliyah/due-summary' },
                  { key: 'bank-slip', label: 'Bank Cheque Slip', path: '/maliyah/bank-slip' },
                  { key: 'due-list-head-sel', label: 'Due List Head Sel', path: '/maliyah/due-list-head-sel' },
                  { key: 'coll-summary-oa', label: 'Collection Summary OA', path: '/maliyah/collection-summary-oa' },
                  { key: 'coll-summ-bank-sector', label: 'Coll Summ Bank Sector', path: '/maliyah/coll-summ-bank-sector' },
                  { key: 'coll-summ-bank-overall', label: 'Coll Summ Bank Overall', path: '/maliyah/coll-summ-bank-overall' },
                  { key: 'coll-summ-rent', label: 'Coll Summ Rent', path: '/maliyah/coll-summ-rent' },
                  { key: 'data-edit-report', label: 'Data Edit/Remove Report', path: '/maliyah/data-edit-report' },
                  { key: 'multiple-ledger', label: 'Multiple Ledger', path: '/maliyah/multiple-ledger' },
                  { key: 'coll-report', label: 'Collection Report', path: '/maliyah/collection-report' },
                  { key: 'day-book', label: 'Day Book', path: '/maliyah/day-book' },
                  { key: 'online-tx', label: 'Online Transaction Report', path: '/maliyah/online-transactions' }
                ]
              },
              {
                key: 'utility',
                label: 'Utility',
                children: [
                  { key: 'hof-list', label: 'HOF List', path: '/maliyah/hof-list' },
                  { key: 'mumineen', label: 'Mumineen Filter', path: '/maliyah/mumineen-filter' },
                  { key: 'daily-due-sms', label: 'Daily Due SMS', path: '/maliyah/daily-due-sms' },
                  { key: 'import-receipt', label: 'Import Receipt', path: '/maliyah/import-receipt' },
                  { key: 'pdc-reconciliation', label: 'PDC Reconciliation', path: '/maliyah/pdc-reconciliation' },
                  { key: 'coll-transfer', label: 'Collection T/f to A/c', path: '/maliyah/collection-transfer' }
                ]
              }
            ]
          },
          {
            key: 'sabil-menu',
            label: 'Sabil',
            icon: CreditCard,
            children: [
              {
                key: 'sabil-entry-group',
                label: 'Entry',
                children: [
                  { key: 'sabil-takh-ob', label: 'Sabil Card Takhmeen+Op.Bal', path: '/maliyah/sabil/card-takhmeen-ob' },
                  { key: 'sabil-takh', label: 'Sabil Card Takhmeen', path: '/maliyah/sabil/card-takhmeen' },
                  { key: 'sabil-cancel', label: 'Sabil Card Cancel', path: '/maliyah/sabil/card-cancel' },
                  { key: 'new-sabil', label: 'New Sabil', path: '/maliyah/sabil/new-sabil' },
                  { key: 'import-sabil', label: 'Import Sabil', path: '/maliyah/sabil/import-sabil' },
                  { key: 'import-takhmeen', label: 'Import Takhmeen', path: '/maliyah/sabil/import-takhmeen' },
                  { key: 'import-its', label: 'Import Upd Sabil ITS Data', path: '/maliyah/sabil/import-upd-sabil-its' },
                  { key: 'takh-proposed', label: 'Sabil Takh Proposed', path: '/maliyah/sabil/takh-proposed' },
                  { key: 'import-takh-proposed', label: 'Import Takh Proposed', path: '/maliyah/sabil/import-takh-proposed' }
                ]
              },
              {
                key: 'sabil-edit-group',
                label: 'Edit',
                children: [
                  { key: 'edit-code', label: 'Edit Code', path: '/maliyah/sabil/edit-code' },
                  { key: 'update-sabil', label: 'Update Sabil', path: '/maliyah/sabil/update-sabil' },
                  { key: 'update-takhmeen', label: 'Update Takhmeen', path: '/maliyah/sabil/update-takhmeen' },
                  { key: 'update-fm', label: 'Update Family Members', path: '/maliyah/sabil/update-family-members' },
                  { key: 'addr-change', label: 'Address Change Request', path: '/maliyah/sabil/address-change-request' },
                  { key: 'manage-buildings', label: 'Manage Buildings', path: '/maliyah/sabil/manage-buildings' }
                ]
              },
              {
                key: 'sabil-reports-group',
                label: 'Reports',
                children: [
                  { key: 'hof-list-rep', label: 'HOF List', path: '/maliyah/hof-list' },
                  { key: 'card-list', label: 'Card List', path: '/maliyah/sabil/card-list' },
                  { key: 'print-card', label: 'Print Sabil Card', path: '/maliyah/sabil/print-card' },
                  { key: 'raza-form', label: 'Raza Form', path: '/maliyah/sabil/raza-form' },
                  { key: 'takh-letter', label: 'Takhmeen Letter', path: '/maliyah/sabil/takhmeen-letter' },
                  { key: 'label-all', label: 'Sabil Label All', path: '/maliyah/sabil/label-all' },
                  { key: 'mumineen-filter-list', label: 'Mumineen Filter List', path: '/maliyah/sabil/mumineen-filter-list' },
                  { key: 'addr-family-list', label: 'Address Wise Family List', path: '/maliyah/sabil/address-family-list' },
                  { key: 'envelope', label: 'Envelope', path: '/maliyah/sabil/envelope' },
                  { key: 'summary-reps', label: 'Summary Reports', path: '/maliyah/sabil/summary-reports' },
                  { key: 'sabil-form', label: 'Sabil Form', path: '/maliyah/sabil/sabil-form' },
                  { key: 'raza-form-list', label: 'Raza Form List', path: '/maliyah/sabil/raza-form-list' },
                  { key: 'raza-form-cancel', label: 'Raza Form Cancel', path: '/maliyah/sabil/raza-form-cancel' },
                  { key: 'hof-list-masool', label: 'HOF List for Masool', path: '/maliyah/sabil/hof-list-masool' },
                  { key: 'hof-file', label: 'HOF File', path: '/maliyah/sabil/hof-file' },
                  { key: 'takh-summary', label: 'Takhmeen Summary', path: '/maliyah/sabil/takhmeen-summary' },
                  { key: 'takh-form', label: 'Takhmeen Form', path: '/maliyah/sabil/takhmeen-form' }
                ]
              },
              {
                key: 'sabil-tools-group',
                label: 'Tools',
                children: [
                  { key: 'noc-auto-clear', label: 'NOC Auto Clear', path: '/maliyah/sabil/noc-auto-clear' },
                  { key: 'change-mobile', label: 'Change Sabil Mobile', path: '/maliyah/sabil/change-mobile' },
                  { key: 'safai-niyaz', label: 'Safai Niyaz', path: '/maliyah/sabil/safai-niyaz' },
                  { key: 'safai-qardan', label: 'Safai Qardan', path: '/maliyah/sabil/safai-qardan' },
                  { key: 'sabil-remove', label: 'Sabil Remove', path: '/maliyah/sabil/sabil-remove' }
                ]
              }
            ]
          },
          {
            key: 'accounting',
            label: 'Accounting',
            icon: FileText,
            children: [
              { key: 'ledger-display', label: 'Ledger Display', path: '/maliyah/accounting/ledger-display' },
              { key: 'trial-balance', label: 'Trial Balance', path: '/maliyah/accounting/trial-balance' },
              { key: 'final-account', label: 'Final Account', path: '/maliyah/accounting/final-account' }
            ]
          }
        ]
      },
      {
        key: 'marafiq',
        label: '4. Umoor Marafiq Burhaniyah',
        icon: Heart,
        children: [
          { key: 'muwasaat-entry', label: 'Muwasaat Entry', path: '/marafiq/muwasaat-entry' },
          { key: 'muwasaat-report', label: 'Muwasaat Report', path: '/marafiq/muwasaat-report' },
          { key: 'upliftment-survey', label: 'Upliftment Survey', path: '/marafiq/upliftment-survey' },
          { key: 'household', label: 'Household & Assets', path: '/marafiq/household' },
          { key: 'housing', label: 'Housing Drive', path: '/marafiq/housing' },
          { key: 'personal-details', label: 'Personal Details Audit', path: '/marafiq/personal-details' },
          { key: 'upliftment-progress', label: 'Upliftment Dashboard', path: '/marafiq/upliftment' }
        ]
      },
      {
        key: 'sehat',
        label: '5. Umoor Sehat',
        icon: Activity,
        children: [
          { key: 'doctors-dir', label: 'Doctors Directory', path: '/sehat/doctors-directory' },
          { key: 'medical-camp', label: 'Medical Camps & Drives', path: '/sehat/medical-camp' },
          { key: 'environment', label: 'Environment Drive', path: '/sehat/environment' },
          { key: 'health-record', label: 'Health Record Register', path: '/sehat/health-record' },
          { key: 'nazafat', label: 'Nazafat Audit', path: '/sehat/nazafat' },
          { key: 'sports', label: 'Sports & Fitness', path: '/sehat/sports' }
        ]
      },
      {
        key: 'iqtesadiyah',
        label: '6. Umoor Iqtesadiyah',
        icon: Building2,
        children: [
          { key: 'qardan-hasana', label: 'Qardan Hasana Scheme', path: '/iqtesadiyah/qardan-hasana' },
          { key: 'business-directory', label: 'Business Directory', path: '/iqtesadiyah/business-directory' },
          { key: 'tajarat-raza', label: 'Tajarat Raza', path: '/iqtesadiyah/tajarat-raza' }
        ]
      },
      {
        key: 'qaza',
        label: '7. Umoor Qaza',
        icon: ShieldCheck,
        children: [
          { key: 'qaza-rep', label: 'Dispute Cases Report', path: '/qaza/report' },
          { key: 'qaza-cases', label: 'Register Qaza Case', path: '/qaza/qaza-cases' },
          { key: 'qaza-all', label: 'All Qaza Cases Master', path: '/qaza/qaza-all' },
          { key: 'vasiyat', label: 'Vasiyat & Wills', path: '/qaza/vasiyat' },
          { key: 'partnership', label: 'Partnership Disputes', path: '/qaza/partnership' },
          { key: 'haram-investments', label: 'Haram Investments', path: '/qaza/haram-investments' },
          { key: 'qaziya', label: 'Qaziya Matters', path: '/qaza/qaziya' },
          { key: 'court-cases', label: 'Civil Court Litigation', path: '/qaza/court-cases' },
          { key: 'sulah-compromise', label: 'Sulah Compromise', path: '/qaza/sulah-compromise' },
          { key: 'inheritance', label: 'Inheritance Distribution', path: '/qaza/inheritance' },
          { key: 'lease-rental', label: 'Lease & Rental', path: '/qaza/lease-rental' },
          { key: 'debt-recovery', label: 'Debt Recovery', path: '/qaza/debt-recovery' },
          { key: 'property-disputes', label: 'Property Boundary Disputes', path: '/qaza/property-disputes' }
        ]
      },
      {
        key: 'dakheliyah',
        label: '8. Umoor Dakheliyah',
        icon: Mail,
        children: [
          { key: 'send-msg', label: 'Send SMS / WhatsApp', path: '/dakheliyah/send-message' },
          { key: 'msg-report', label: 'Message Log', path: '/dakheliyah/message-report' },
          { key: 'circular-announce', label: 'Circulars & Announcements', path: '/dakheliyah/circular-announce' },
          { key: 'survey-report', label: 'Survey & Feedback Report', path: '/dakheliyah/survey-report' }
        ]
      },
      {
        key: 'kharejiyah',
        label: '9. Umoor Kharejiyah',
        icon: Globe,
        children: [
          { key: 'kharejiyah-rep', label: 'External Visitors Report', path: '/kharejiyah/report' },
          { key: 'govt-liaison', label: 'Govt & Waqf Liaison', path: '/kharejiyah/govt-liaison' }
        ]
      },
      {
        key: 'mawareed',
        label: '10. Umoor Mawareed Bashariyah',
        icon: UserPlus,
        children: [
          { key: 'add-member', label: 'Add Member / Staff', path: '/mawareed/add-member' },
          { key: 'member-list', label: 'Staff & Member List', path: '/mawareed/member-list' },
          { key: 'staff-salary', label: 'Staff Payroll & Salary', path: '/mawareed/staff-salary' }
        ]
      },
      {
        key: 'fmb',
        label: '11. Faiz al-Mawaid al-Burhaniyah (FMB)',
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
              { key: 'menu-add', label: 'Add', path: '/fmb/menu/add' },
              { key: 'menu-edit', label: 'Edit', path: '/fmb/menu/edit' },
              { key: 'menu-report-2', label: 'Report', path: '/fmb/menu/report' },
              { key: 'khidmat-assign', label: 'Khidmat Assign', path: '/fmb/menu/khidmat-assign' },
              { key: 'menu-summary', label: 'Summary', path: '/fmb/menu/summary' },
              { key: 'thali-costing-summary', label: 'Thali Costing Summary', path: '/fmb/menu/thali-costing-summary' },
              { key: 'dish-category', label: 'Dish Category', path: '/fmb/menu/dish-category' },
              { key: 'dish-master', label: 'Dish Master', path: '/fmb/menu/dish-master' }
            ]
          },
          {
            key: 'inventory',
            label: 'Inventory',
            children: [
              { key: 'menu-entry-edit', label: 'Menu Entry/Edit', path: '/fmb/inventory/menu-entry-edit' }
            ]
          },
          {
            key: 'registration',
            label: 'Registration',
            children: [
              { key: 'reg-setup', label: 'Registration Setup', path: '/fmb/registration/reg-setup' },
              { key: 'reg-status', label: 'Registration Status', path: '/fmb/registration/reg-status' },
              { key: 'reg-status-size', label: 'Registration Status Size Wise', path: '/fmb/registration/reg-status-size-wise' },
              { key: 'reg-manual', label: 'Registration Manual', path: '/fmb/registration/reg-manual' },
              { key: 'reg-report', label: 'Registration Report', path: '/fmb/registration/reg-report' },
              { key: 'dispatch-scan', label: 'Dispatch Scanning', path: '/fmb/registration/dispatch-scan' },
              { key: 'dispatch-report', label: 'Dispatch Report', path: '/fmb/registration/dispatch-report' },
              { key: 'thali-distributor', label: 'Thali Info for Distributor', path: '/fmb/registration/thali-distributor' }
            ]
          },
          {
            key: 'fmb-app',
            label: 'App',
            children: [
              { key: 'feedback-summary', label: 'Feedback Summary', path: '/fmb/app/feedback-summary' },
              { key: 'skip-thali-report', label: 'Skip Thali Report', path: '/fmb/app/skip-thali-report' },
              { key: 'scanning-report', label: 'Scanning Report', path: '/fmb/app/scanning-report' },
              { key: 'thali-code-update', label: 'Thaali Code Update', path: '/fmb/app/thali-code-update' }
            ]
          }
        ]
      },
      {
        key: 'hall-booking',
        label: '12. Hall Booking & Facilities',
        icon: Calendar,
        children: [
          { key: 'booking-entry', label: 'Book Hall', path: '/hall-booking/booking' },
          { key: 'booking-rep', label: 'Booking Log', path: '/hall-booking/report' },
          { key: 'booking-calendar', label: 'Availability Calendar', path: '/hall-booking/booking-calendar' },
          { key: 'booking-receipt', label: 'Print Receipt & Deposit', path: '/hall-booking/booking-receipt' }
        ]
      }
    ]
  },
  {
    key: 'app-mgmt',
    label: 'Mobile App',
    icon: Smartphone,
    children: [
      { key: 'rsvp-rep', label: 'RSVP Report', path: '/app/rsvp-report' },
      { key: 'install-summ', label: 'App Install Summary', path: '/app/install-summary' },
      { key: 'install-list', label: 'App Install Detail List', path: '/app/install-list' },
      { key: 'push-notify', label: 'Push Notification Broadcast', path: '/app/notification-center' },
      { key: 'user-activity', label: 'User App Activity Audit', path: '/app/user-activity-log' }
    ]
  },
  {
    key: 'tools',
    label: 'Tools & Admin',
    icon: Settings,
    children: [
      { key: 'change-pwd', label: 'Change Password', icon: Key, path: '/tools/change-password' },
      { key: 'edit-user', label: 'Edit User Account', path: '/tools/edit-user' },
      { key: 'user-category-perm', label: 'User Category Permission', path: '/tools/user-category-permission' },
      { key: 'islamic-cal', label: 'Islamic Misri Calendar', path: '/tools/islamic-calendar' },
      { key: 'visit-entry', label: 'Visitor Entry', path: '/tools/visit-entry' },
      { key: 'visit-report', label: 'Visitor Report', path: '/tools/visit-report' },
      { key: 'manage-caption', label: 'Manage Caption', path: '/tools/manage-caption' },
      { key: 'photo-upload', label: 'Photo Upload', path: '/tools/photo-upload' },
      { key: 'doc-upload', label: 'Document Upload', path: '/tools/document-upload' },
      { key: 'live-event', label: 'Live Event', path: '/tools/live-event' },
      { key: 'live-event-perm', label: 'Live Event Permission', path: '/tools/live-event-permission' },
      { key: 'manage-masool', label: 'Manage Masool', path: '/tools/manage-masool' },
      { key: 'manage-musaeed', label: 'Manage Musaeed', path: '/tools/manage-musaeed' },
      { key: 'manage-masoolaat', label: 'Manage Masoolaat', path: '/tools/manage-masoolaat' },
      { key: 'manage-musaedaat', label: 'Manage Musaedaat', path: '/tools/manage-musaedaat' }
    ]
  }
]

function checkIsChildActive(items, currentPath) {
  if (!items || !items.length) return false
  return items.some(child => {
    if (child.path) {
      const basePath = child.path.split('?')[0]
      if (currentPath === child.path || currentPath === basePath) return true
    }
    if (child.children && child.children.length > 0) {
      return checkIsChildActive(child.children, currentPath)
    }
    return false
  })
}

function filterItemsRecursive(items, query) {
  const q = query.toLowerCase()
  return items.reduce((acc, item) => {
    const matchesSelf = item.label.toLowerCase().includes(q)
    const matchingChildren = item.children ? filterItemsRecursive(item.children, query) : []
    if (matchesSelf || matchingChildren.length > 0) {
      acc.push({
        ...item,
        children: item.children ? (matchingChildren.length > 0 ? matchingChildren : item.children) : undefined
      })
    }
    return acc
  }, [])
}

function MenuItem({ item, depth = 0 }) {
  const { toggleMenu, isMenuOpen, isCollapsed } = useSidebar()
  const location = useLocation()
  const hasChildren = item.children && item.children.length > 0

  const isChildActive = hasChildren && checkIsChildActive(item.children, location.pathname)
  const isMenuStateSet = isMenuOpen(item.key) !== undefined && isMenuOpen(item.key) !== null
  const isOpen = isMenuStateSet ? isMenuOpen(item.key) : isChildActive

  const isActive = item.path && (location.pathname === item.path || location.pathname === item.path.split('?')[0])

  const paddingLeft = isCollapsed ? '0.75rem' : `${0.75 + depth * 0.6}rem`
  const IconComp = item.icon

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => toggleMenu(item.key)}
          className={`sidebar-item w-full ${isChildActive ? 'active font-medium' : ''}`}
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
            className="sidebar-submenu overflow-hidden transition-all duration-300 ease-in-out"
            style={{
              maxHeight: isOpen ? '4000px' : '0',
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
    ? filterItemsRecursive(menuConfig, search)
    : menuConfig

  return (
    <aside
      className={`fixed top-0 left-0 h-screen z-50 flex flex-col transition-all duration-300 bg-white border-r border-slate-200 shadow-sm ${
        isCollapsed ? 'w-[64px]' : 'w-[270px]'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-3.5 py-3 border-b border-slate-200 bg-white">
        {isCollapsed ? (
          <img
            src="/favicon.png"
            alt="Jamaat Cloud"
            className="w-8 h-8 object-contain mx-auto transition-all"
          />
        ) : (
          <img
            src="/logo.png"
            alt="Jamaat Cloud - Simplifying Operations"
            className="h-9 object-contain max-w-[190px] transition-all"
          />
        )}
        <button
          onClick={toggleSidebar}
          className="ml-auto text-slate-500 hover:text-slate-900 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          title="Toggle Navigation Sidebar"
        >
          <Menu size={18} />
        </button>
      </div>

      {/* Search */}
      {!isCollapsed && (
        <div className="px-3 py-2 border-b border-slate-100 bg-slate-50/50">
          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search navigation..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-100 border border-slate-200 rounded-md text-slate-900 text-xs placeholder:text-slate-400 outline-none focus:border-blue-600 focus:bg-white transition-colors"
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
      <div className="border-t border-slate-200 p-1 bg-slate-50/50">
        <button
          onClick={logout}
          className="sidebar-item w-full text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md font-semibold"
        >
          <LogOut size={18} className="shrink-0 text-red-500" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  )
}
