import { useState } from 'react'
import { useData } from '../../context/DataContext'
import {
  ShieldCheck, Users, Plus, Search, Filter, Key, CheckCircle2,
  XCircle, Edit3, Eye, Trash2, UserCheck, Lock, Shield, User,
  DollarSign, Check, X
} from 'lucide-react'

// Application Full Permission Matrix Dictionary
export const APP_MODULE_PERMISSIONS = [
  { key: 'dashboard', label: 'Dashboard & Overview', category: 'General' },
  { key: 'mumineen_dir', label: 'Mumineen Directory & Profile Records', category: 'Mumineen' },

  // 12 Umoor
  { key: 'umoor_deeniyah', label: '1. Umoor Deeniyah (Sabaq, Amal, Niyaaz, Wafat)', category: '12 Umoor' },
  { key: 'umoor_talimiyah', label: '2. Umoor Talimiyah (Education & Attendance)', category: '12 Umoor' },
  { key: 'umoor_maliyah', label: '3. Umoor Maliyah (Sabil, Daily Collection, Ledgers)', category: '12 Umoor' },
  { key: 'umoor_marafiq', label: '4. Umoor Marafiq (Upliftment & Muwasaat)', category: '12 Umoor' },
  { key: 'umoor_sehat', label: '5. Umoor Sehat (Healthcare, Camps, Nazafat)', category: '12 Umoor' },
  { key: 'umoor_iqtesadiyah', label: '6. Umoor Iqtesadiyah (Qardan Hasana & Business)', category: '12 Umoor' },
  { key: 'umoor_qaza', label: '7. Umoor Qaza (Judicial & Legal Disputes)', category: '12 Umoor' },
  { key: 'umoor_dakheliyah', label: '8. Umoor Dakheliyah (Internal & Announcements)', category: '12 Umoor' },
  { key: 'umoor_kharejiyah', label: '9. Umoor Kharejiyah (External Affairs & Govt)', category: '12 Umoor' },
  { key: 'umoor_mawareed', label: '10. Umoor Mawareed (HR & Staff Directory)', category: '12 Umoor' },
  { key: 'umoor_fmb', label: '11. Faiz al-Mawaid al-Burhaniyah (FMB Thali & Costing)', category: '12 Umoor' },
  { key: 'umoor_hallbooking', label: '12. Hall Booking & Venue Facilities', category: '12 Umoor' },

  // Special Management Modules
  { key: 'finance_mgmt', label: 'Finance Management (P&L, Expenditure, Assets)', category: 'Finance' },
  { key: 'amil_appointment', label: 'Amil Saheb Appointment & Token Management', category: 'Administration' },
  { key: 'broadcast_messaging', label: 'Broadcast Messaging (WhatsApp & SMS Center)', category: 'Communication' },
  { key: 'mobile_app_mgmt', label: 'Mobile App Management (Analytics & Push Alerts)', category: 'Mobile App' },
  { key: 'tools_admin', label: 'Tools & System Administration Permissions', category: 'Admin Tools' }
]

export default function StaffManagement() {
  const { userPermissions, updateUserPermission, addStaffUser, deleteStaffUser } = useData()

  const staffList = userPermissions?.users || []

  const [search, setSearch] = useState('')
  const [filterRole, setFilterRole] = useState('All')
  const [filterStatus, setFilterStatus] = useState('All')

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false)
  const [viewingStaff, setViewingStaff] = useState(null)
  const [editingStaff, setEditingStaff] = useState(null)
  const [toastMsg, setToastMsg] = useState(false)

  // Add Staff Form State
  const [addForm, setAddForm] = useState({
    userId: '',
    name: '',
    role: 'Collector',
    category: 'Finance',
    mobile: '',
    email: '',
    salary: '',
    password: '',
    permissions: ['dashboard', 'mumineen_dir', 'umoor_maliyah']
  })

  // Filter staff members
  const filteredStaff = staffList.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.userId.toLowerCase().includes(search.toLowerCase()) ||
      (user.role && user.role.toLowerCase().includes(search.toLowerCase()))

    const matchesRole = filterRole === 'All' || user.role === filterRole
    const matchesStatus = filterStatus === 'All' || user.status === filterStatus

    return matchesSearch && matchesRole && matchesStatus
  })

  const totalStaff = staffList.length
  const activeStaff = staffList.filter(s => s.status === 'Active').length
  const superAdmins = staffList.filter(s => s.role === 'Super Admin' || s.permissions.includes('all')).length

  // Toggle permission checkbox in Add Form
  const toggleAddPermission = (permKey) => {
    setAddForm(prev => {
      const exists = prev.permissions.includes(permKey)
      const newPerms = exists
        ? prev.permissions.filter(p => p !== permKey)
        : [...prev.permissions, permKey]
      return { ...prev, permissions: newPerms }
    })
  }

  // Toggle permission checkbox in Edit Form
  const toggleEditPermission = (permKey) => {
    if (!editingStaff) return
    const isSuperAdmin = editingStaff.permissions.includes('all')
    if (isSuperAdmin) return

    const exists = editingStaff.permissions.includes(permKey)
    const updatedPerms = exists
      ? editingStaff.permissions.filter(p => p !== permKey)
      : [...editingStaff.permissions, permKey]

    setEditingStaff({ ...editingStaff, permissions: updatedPerms })
  }

  // Select All Permissions
  const selectAllPermissions = (target) => {
    const allKeys = APP_MODULE_PERMISSIONS.map(p => p.key)
    if (target === 'add') {
      setAddForm(prev => ({ ...prev, permissions: allKeys }))
    } else if (editingStaff) {
      setEditingStaff(prev => ({ ...prev, permissions: allKeys }))
    }
  }

  // Deselect All Permissions
  const deselectAllPermissions = (target) => {
    if (target === 'add') {
      setAddForm(prev => ({ ...prev, permissions: ['dashboard'] }))
    } else if (editingStaff) {
      setEditingStaff(prev => ({ ...prev, permissions: ['dashboard'] }))
    }
  }

  // Handle Add Staff Submit
  const handleAddSubmit = (e) => {
    e.preventDefault()
    if (!addForm.userId || !addForm.name) {
      alert('Please fill out Staff User ID and Name.')
      return
    }

    addStaffUser(addForm)
    setShowAddModal(false)
    setToastMsg(`Staff member ${addForm.name} created successfully with specified permissions!`)
    setTimeout(() => setToastMsg(false), 3500)

    setAddForm({
      userId: '',
      name: '',
      role: 'Collector',
      category: 'Finance',
      mobile: '',
      email: '',
      salary: '',
      password: '',
      permissions: ['dashboard', 'mumineen_dir', 'umoor_maliyah']
    })
  }

  // Handle Edit Staff Submit
  const handleEditSubmit = (e) => {
    e.preventDefault()
    if (!editingStaff) return

    updateUserPermission(editingStaff.id, {
      name: editingStaff.name,
      role: editingStaff.role,
      category: editingStaff.category,
      mobile: editingStaff.mobile,
      status: editingStaff.status,
      permissions: editingStaff.permissions
    })

    setEditingStaff(null)
    setToastMsg(`Staff profile and permissions updated successfully!`)
    setTimeout(() => setToastMsg(false), 3500)
  }

  // Toggle Active/Inactive
  const toggleStatus = (staff) => {
    const newStatus = staff.status === 'Active' ? 'Inactive' : 'Active'
    updateUserPermission(staff.id, { status: newStatus })
  }

  // Handle Delete
  const handleDelete = (staffId, name) => {
    if (confirm(`Are you sure you want to delete staff member "${name}"?`)) {
      deleteStaffUser(staffId)
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2.5">
            <ShieldCheck className="text-blue-600" size={26} />
            Staff Management & Module Access Permissions
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Manage staff profiles, assign granular application module permissions, and control access rights
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg shadow-sm transition-colors"
        >
          <Plus size={18} />
          Create New Staff Member
        </button>
      </div>

      {toastMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center gap-3 shadow-sm">
          <CheckCircle2 size={22} className="text-emerald-600 shrink-0" />
          <p className="text-xs font-semibold">{toastMsg}</p>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Staff Registered</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">{totalStaff}</p>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <Users size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Staff Members</p>
            <p className="text-2xl font-extrabold text-emerald-600 mt-1">{activeStaff}</p>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <UserCheck size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Super Admins</p>
            <p className="text-2xl font-extrabold text-purple-600 mt-1">{superAdmins}</p>
          </div>
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
            <Shield size={24} />
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search Staff Name, User ID, Role..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Filter size={14} />
            <span>Filters:</span>
          </div>

          <select
            value={filterRole}
            onChange={e => setFilterRole(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none text-slate-700 font-semibold"
          >
            <option value="All">All Roles</option>
            <option value="Super Admin">Super Admin</option>
            <option value="Admin">Admin</option>
            <option value="Collector">Collector</option>
            <option value="Masool">Masool</option>
            <option value="Viewer">Viewer</option>
          </select>

          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none text-slate-700 font-semibold"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold text-xs uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Staff User ID</th>
                <th className="py-3 px-4">Staff Member Name</th>
                <th className="py-3 px-4">Role & Category</th>
                <th className="py-3 px-4">Allowed Module Permissions</th>
                <th className="py-3 px-4">Account Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredStaff.length > 0 ? (
                filteredStaff.map(staff => {
                  const isAll = staff.permissions?.includes('all')
                  const permCount = isAll ? APP_MODULE_PERMISSIONS.length : (staff.permissions?.length || 0)

                  return (
                    <tr key={staff.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-blue-600 text-xs">
                        {staff.userId}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {staff.name}
                        {staff.mobile && <div className="text-xs text-slate-400 font-normal font-mono">📞 {staff.mobile}</div>}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-800 text-xs">{staff.role}</div>
                        <div className="text-[11px] text-slate-500">{staff.category || 'General'}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                          isAll ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {isAll ? 'Full System Access (ALL)' : `${permCount} / ${APP_MODULE_PERMISSIONS.length} Modules Allowed`}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => toggleStatus(staff)}
                          className={`px-2.5 py-0.5 rounded text-xs font-bold transition-colors ${
                            staff.status === 'Active' ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' : 'bg-red-100 text-red-800 hover:bg-red-200'
                          }`}
                        >
                          {staff.status || 'Active'}
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setViewingStaff(staff)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                            title="View Profile & Permissions Matrix"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => setEditingStaff({ ...staff })}
                            className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
                            title="Edit Staff Profile & Permissions"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(staff.id, staff.name)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            title="Delete Staff Account"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 text-xs">
                    No staff members found matching criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE NEW STAFF MODAL WITH PERMISSIONS MATRIX */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-2xl w-full p-6 space-y-5 my-8">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100">
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <UserCheck size={20} className="text-blue-600" />
                Create New Staff Member & Module Permissions
              </h2>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              {/* Basic Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Staff User ID *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. staff_maliyah1"
                    value={addForm.userId}
                    onChange={e => setAddForm({ ...addForm, userId: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alihusain bhai Accountant"
                    value={addForm.name}
                    onChange={e => setAddForm({ ...addForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={addForm.password}
                    onChange={e => setAddForm({ ...addForm, password: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Staff Role *</label>
                  <select
                    value={addForm.role}
                    onChange={e => setAddForm({ ...addForm, role: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-800"
                  >
                    <option value="Super Admin">Super Admin (Full Access)</option>
                    <option value="Admin">Admin</option>
                    <option value="Collector">Collector / Cashier</option>
                    <option value="Masool">Masool / Coordinator</option>
                    <option value="Viewer">Viewer (Read Only)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category / Department</label>
                  <select
                    value={addForm.category}
                    onChange={e => setAddForm({ ...addForm, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <option value="Finance">Finance & Maliyah</option>
                    <option value="FMB">FMB Kitchen</option>
                    <option value="Deeniyah">Deeniyah Affairs</option>
                    <option value="Admin">Administration</option>
                    <option value="General">General Staff</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Mobile Phone</label>
                  <input
                    type="text"
                    placeholder="e.g. 9876543210"
                    value={addForm.mobile}
                    onChange={e => setAddForm({ ...addForm, mobile: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              {/* Granular Permissions Matrix */}
              <div className="space-y-2 border-t border-slate-100 pt-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-800 uppercase tracking-wider text-xs flex items-center gap-1.5">
                    <Key size={14} className="text-blue-600" />
                    Granular Application Module Permissions Matrix
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => selectAllPermissions('add')}
                      className="text-[11px] text-blue-600 hover:underline font-semibold"
                    >
                      Select All
                    </button>
                    <span className="text-slate-300">|</span>
                    <button
                      type="button"
                      onClick={() => deselectAllPermissions('add')}
                      className="text-[11px] text-slate-500 hover:underline font-medium"
                    >
                      Deselect All
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto p-3 bg-slate-50 rounded-xl border border-slate-200">
                  {APP_MODULE_PERMISSIONS.map(perm => {
                    const isChecked = addForm.permissions.includes(perm.key)
                    return (
                      <label
                        key={perm.key}
                        className={`flex items-center gap-2 p-2 rounded-lg border text-xs cursor-pointer transition-colors ${
                          isChecked
                            ? 'bg-blue-50 border-blue-300 text-blue-900 font-semibold'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleAddPermission(perm.key)}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="truncate">{perm.label}</span>
                      </label>
                    )
                  })}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm"
                >
                  Save Staff Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT STAFF & PERMISSIONS MODAL */}
      {editingStaff && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-2xl w-full p-6 space-y-5 my-8">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100">
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <Edit3 size={20} className="text-blue-600" />
                Edit Staff Profile & Module Permissions ({editingStaff.userId})
              </h2>
              <button onClick={() => setEditingStaff(null)} className="text-slate-400 hover:text-slate-600 p-1">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={editingStaff.name}
                    onChange={e => setEditingStaff({ ...editingStaff, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Role</label>
                  <select
                    value={editingStaff.role}
                    onChange={e => setEditingStaff({ ...editingStaff, role: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold"
                  >
                    <option value="Super Admin">Super Admin</option>
                    <option value="Admin">Admin</option>
                    <option value="Collector">Collector</option>
                    <option value="Masool">Masool</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Account Status</label>
                  <select
                    value={editingStaff.status}
                    onChange={e => setEditingStaff({ ...editingStaff, status: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Permissions matrix */}
              <div className="space-y-2 border-t border-slate-100 pt-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-800 uppercase tracking-wider text-xs flex items-center gap-1.5">
                    <Key size={14} className="text-blue-600" />
                    Allowed Module Access Permissions
                  </label>
                  {!editingStaff.permissions.includes('all') && (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => selectAllPermissions('edit')}
                        className="text-[11px] text-blue-600 hover:underline font-semibold"
                      >
                        Select All
                      </button>
                      <span className="text-slate-300">|</span>
                      <button
                        type="button"
                        onClick={() => deselectAllPermissions('edit')}
                        className="text-[11px] text-slate-500 hover:underline font-medium"
                      >
                        Deselect All
                      </button>
                    </div>
                  )}
                </div>

                {editingStaff.permissions.includes('all') ? (
                  <div className="p-4 bg-purple-50 border border-purple-200 text-purple-900 rounded-xl font-bold text-xs">
                    🛡️ Super Admin User has full unrestricted access to all application modules.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto p-3 bg-slate-50 rounded-xl border border-slate-200">
                    {APP_MODULE_PERMISSIONS.map(perm => {
                      const isChecked = editingStaff.permissions.includes(perm.key)
                      return (
                        <label
                          key={perm.key}
                          className={`flex items-center gap-2 p-2 rounded-lg border text-xs cursor-pointer transition-colors ${
                            isChecked
                              ? 'bg-blue-50 border-blue-300 text-blue-900 font-semibold'
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleEditPermission(perm.key)}
                            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="truncate">{perm.label}</span>
                        </label>
                      )
                    })}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingStaff(null)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm"
                >
                  Update Staff Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW STAFF 360 PERMISSIONS MODAL */}
      {viewingStaff && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-xl w-full p-6 space-y-5 my-8">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100">
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <Eye size={20} className="text-blue-600" />
                Staff 360° Profile & Permissions Matrix
              </h2>
              <button onClick={() => setViewingStaff(null)} className="text-slate-400 hover:text-slate-600 p-1">
                <X size={18} />
              </button>
            </div>

            {/* Profile Info */}
            <div className="bg-slate-900 text-white p-5 rounded-xl shadow-md space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-blue-400 font-bold">{viewingStaff.userId}</span>
                <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                  viewingStaff.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                }`}>
                  {viewingStaff.status || 'Active'}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white">{viewingStaff.name}</h3>
              <p className="text-xs text-slate-300">
                Role: <strong className="text-white">{viewingStaff.role}</strong> • Category: <strong className="text-white">{viewingStaff.category || 'General'}</strong>
              </p>
            </div>

            {/* Permission Matrix Visual List */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center justify-between border-b pb-2">
                <span>Application Module Access Status</span>
                <span className="text-blue-600 font-mono text-xs">
                  {viewingStaff.permissions.includes('all') ? 'All 17 Allowed' : `${viewingStaff.permissions.length} Allowed`}
                </span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                {APP_MODULE_PERMISSIONS.map(perm => {
                  const isAllowed = viewingStaff.permissions.includes('all') || viewingStaff.permissions.includes(perm.key)
                  return (
                    <div
                      key={perm.key}
                      className={`p-2 rounded-lg border text-xs flex items-center justify-between ${
                        isAllowed ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900 font-medium' : 'bg-red-50/40 border-red-100 text-slate-400 line-through'
                      }`}
                    >
                      <span className="truncate">{perm.label}</span>
                      {isAllowed ? (
                        <Check size={14} className="text-emerald-600 shrink-0" />
                      ) : (
                        <X size={14} className="text-red-400 shrink-0" />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="flex items-center justify-end pt-2 border-t border-slate-100">
              <button
                onClick={() => setViewingStaff(null)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-lg text-xs"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
