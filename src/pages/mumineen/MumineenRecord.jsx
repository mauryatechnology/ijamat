import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useData } from '../../context/DataContext'
import {
  FileText, Search, User, Phone, MapPin, Briefcase,
  ShieldCheck, CreditCard, Utensils, HeartHandshake, FileCheck,
  Printer, ArrowLeft, CheckCircle, AlertCircle
} from 'lucide-react'

export default function MumineenRecord() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const {
    members,
    sabil,
    thali,
    dues,
    qardLoans,
    razaForms
  } = useData()

  const urlIts = searchParams.get('its') || ''
  const [inputIts, setInputIts] = useState(urlIts)
  const [selectedIts, setSelectedIts] = useState(urlIts || (members[0]?.itsId || ''))
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (urlIts) {
      setSelectedIts(urlIts)
      setInputIts(urlIts)
    }
  }, [urlIts])

  // Find target member
  const member = members.find(m => m.itsId === selectedIts)

  // Find related family members (same Sabil No)
  const familyMembers = member
    ? members.filter(m => m.sabilNo === member.sabilNo)
    : []

  // Find Sabil details
  const sabilInfo = sabil.find(s => s.sabilNo === member?.sabilNo)

  // Find Thali details
  const thaliInfo = thali.find(t => t.itsId === selectedIts || t.sabilNo === member?.sabilNo)

  // Find Dues details
  const dueInfo = dues.find(d => d.itsId === selectedIts)

  // Find Qard Loans
  const loans = qardLoans.filter(l => l.itsId === selectedIts)

  // Find Raza Forms
  const razas = razaForms.filter(r => r.itsId === selectedIts)

  const handleSearch = (e) => {
    e.preventDefault()
    if (!inputIts.trim()) return
    setSelectedIts(inputIts.trim())
    setSearchParams({ its: inputIts.trim() })
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Top Header & Search Bar */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => navigate('/mumineen/list')}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <FileText className="text-blue-600" size={24} />
              Mumineen 360° Record Lookup
            </h1>
            <p className="text-slate-500 text-xs mt-0.5">
              Enter ITS Number to fetch complete profile, family, sabil, and accounts details
            </p>
          </div>
        </div>

        {/* ITS Lookup Search Form */}
        <form onSubmit={handleSearch} className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Enter ITS (e.g. 40493729)..."
              value={inputIts}
              onChange={e => setInputIts(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 font-mono font-semibold"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors shrink-0"
          >
            Fetch Record
          </button>
        </form>
      </div>

      {member ? (
        <>
          {/* Member Main Profile Banner */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 rounded-xl shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-inner shrink-0">
                {member.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold">{member.name}</h2>
                  <span className={`px-2.5 py-0.5 rounded text-xs font-semibold ${
                    member.hofOrFm === 'HOF' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                  }`}>
                    {member.hofOrFm || 'HOF'}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 mt-2 font-mono">
                  <span>ITS: <strong className="text-white">{member.itsId}</strong></span>
                  <span>Sabil: <strong className="text-white">#{member.sabilNo || 'N/A'}</strong></span>
                  <span>Age/Gender: <strong className="text-white">{member.age ? `${member.age} yrs` : 'N/A'} ({member.gender})</strong></span>
                  <span>Blood: <strong className="text-white">{member.bloodGroup || 'N/A'}</strong></span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto border-t md:border-t-0 border-slate-700 pt-4 md:pt-0">
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 bg-slate-700/60 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-600 transition-colors flex items-center gap-1.5"
              >
                <Printer size={14} />
                Print Profile
              </button>
            </div>
          </div>

          {/* Record Navigation Tabs */}
          <div className="flex border-b border-slate-200 bg-white px-4 rounded-xl shadow-sm gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <User size={14} />
              Personal Info
            </button>

            <button
              onClick={() => setActiveTab('family')}
              className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'family'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <ShieldCheck size={14} />
              Family Tree ({familyMembers.length})
            </button>

            <button
              onClick={() => setActiveTab('sabil')}
              className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'sabil'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <CreditCard size={14} />
              Sabil & Dues
            </button>

            <button
              onClick={() => setActiveTab('fmb')}
              className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'fmb'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <Utensils size={14} />
              FMB Thali
            </button>

            <button
              onClick={() => setActiveTab('finance')}
              className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'finance'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <HeartHandshake size={14} />
              Qard & Raza ({loans.length + razas.length})
            </button>
          </div>

          {/* TAB 1: Personal Overview */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Demographics */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-800 border-b pb-2 flex items-center gap-2">
                  <User size={16} className="text-blue-600" />
                  Demographics & Identity
                </h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block">ITS Number</span>
                    <span className="font-bold text-slate-800 font-mono">{member.itsId}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Sabil Card No</span>
                    <span className="font-bold text-slate-800 font-mono">#{member.sabilNo || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Full Name</span>
                    <span className="font-semibold text-slate-800">{member.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">HOF / FM Status</span>
                    <span className="font-semibold text-slate-800">{member.hofOrFm || 'HOF'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Age & Gender</span>
                    <span className="font-semibold text-slate-800">{member.age || 'N/A'} yrs ({member.gender === 'M' ? 'Male' : 'Female'})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Blood Group</span>
                    <span className="font-semibold text-slate-800">{member.bloodGroup || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Marital Status</span>
                    <span className="font-semibold text-slate-800">{member.maritalStatus || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Misaaq Status</span>
                    <span className="font-semibold text-slate-800">{member.misaaq || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Contact & Location */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-800 border-b pb-2 flex items-center gap-2">
                  <Phone size={16} className="text-blue-600" />
                  Contact & Location Info
                </h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block">Mobile Phone</span>
                    <span className="font-semibold text-slate-800">{member.mobile || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">WhatsApp Phone</span>
                    <span className="font-semibold text-slate-800">{member.whatsapp || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Email Address</span>
                    <span className="font-semibold text-slate-800">{member.email || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Mohalla</span>
                    <span className="font-semibold text-slate-800">{member.mohalla || 'Saifee Mohalla'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Sector</span>
                    <span className="font-semibold text-slate-800">{member.sector || 'Mohammedi'}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 block">Full Residential Address</span>
                    <span className="font-semibold text-slate-800">{member.address || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Profession & Qualification */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 md:col-span-2">
                <h3 className="text-sm font-bold text-slate-800 border-b pb-2 flex items-center gap-2">
                  <Briefcase size={16} className="text-blue-600" />
                  Education & Profession
                </h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block">Occupation / Profession</span>
                    <span className="font-semibold text-slate-800">{member.occupation || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Qualification / Degree</span>
                    <span className="font-semibold text-slate-800">{member.qualification || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Family Tree */}
          {activeTab === 'family' && (
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-800 border-b pb-2 flex items-center justify-between">
                <span>Family Members under Sabil #{member.sabilNo}</span>
                <span className="text-xs text-slate-500 font-normal">{familyMembers.length} Members Registered</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {familyMembers.map(fm => (
                  <div
                    key={fm.id}
                    onClick={() => {
                      setSelectedIts(fm.itsId)
                      setInputIts(fm.itsId)
                      setSearchParams({ its: fm.itsId })
                    }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      fm.itsId === selectedIts
                        ? 'border-blue-500 bg-blue-50/50 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-blue-600">{fm.itsId}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                        fm.hofOrFm === 'HOF' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {fm.hofOrFm || 'FM'}
                      </span>
                    </div>
                    <p className="font-bold text-slate-900 text-sm mt-1">{fm.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {fm.gender === 'M' ? 'Male' : 'Female'} • {fm.age ? `${fm.age} yrs` : 'N/A'} • {fm.occupation || 'N/A'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Sabil & Dues */}
          {activeTab === 'sabil' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-800 border-b pb-2 flex items-center gap-2">
                  <CreditCard size={16} className="text-blue-600" />
                  Sabil Master Info
                </h3>
                {sabilInfo ? (
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block">Sabil Card No</span>
                      <span className="font-mono font-bold text-slate-800">#{sabilInfo.sabilNo}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Yearly Takhmeen</span>
                      <span className="font-bold text-emerald-600">₹{sabilInfo.takhmeenAmount?.toLocaleString() || 0}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Paid Amount</span>
                      <span className="font-bold text-blue-600">₹{sabilInfo.paidAmount?.toLocaleString() || 0}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Current Balance Dues</span>
                      <span className="font-bold text-red-600">₹{(sabilInfo.takhmeenAmount - sabilInfo.paidAmount)?.toLocaleString() || 0}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">No active Sabil card record found for this Mumineen.</p>
                )}
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-800 border-b pb-2 flex items-center gap-2">
                  <FileText size={16} className="text-blue-600" />
                  Pending Due Record
                </h3>
                {dueInfo ? (
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block">Total Outstanding Due</span>
                      <span className="font-bold text-red-600 text-sm">₹{dueInfo.amount?.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Due Type / Head</span>
                      <span className="font-semibold text-slate-800">{dueInfo.dueHead || 'Sabil Takhmeen'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Due Month/Year</span>
                      <span className="font-semibold text-slate-800">{dueInfo.month || 'Current Session'}</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-emerald-600 text-xs font-semibold py-2">
                    <CheckCircle size={16} />
                    <span>No pending dues! All clear.</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: FMB Thali */}
          {activeTab === 'fmb' && (
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-800 border-b pb-2 flex items-center gap-2">
                <Utensils size={16} className="text-blue-600" />
                Faiz al-Mawaid al-Burhaniyah (FMB) Record
              </h3>
              {thaliInfo ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <span className="text-slate-400 block">Thali Number</span>
                    <span className="font-mono font-bold text-slate-900 text-sm">#{thaliInfo.thaliNo}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <span className="text-slate-400 block">Thali Size</span>
                    <span className="font-bold text-slate-900 text-sm">{thaliInfo.thaliSize || 'Standard'}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <span className="text-slate-400 block">Status</span>
                    <span className="font-bold text-emerald-600 text-sm">{thaliInfo.status || 'Active'}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <span className="text-slate-400 block">Delivery Zone</span>
                    <span className="font-bold text-slate-900 text-sm">{thaliInfo.zone || 'Zone A'}</span>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-400">No active FMB Thali subscription linked to this member.</p>
              )}
            </div>
          )}

          {/* TAB 5: Finance & Raza */}
          {activeTab === 'finance' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Qard Hasana */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-800 border-b pb-2 flex items-center gap-2">
                  <HeartHandshake size={16} className="text-blue-600" />
                  Qardan Hasana Loan Accounts ({loans.length})
                </h3>
                {loans.length > 0 ? (
                  <div className="space-y-3">
                    {loans.map(loan => (
                      <div key={loan.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs space-y-1">
                        <div className="flex items-center justify-between font-bold">
                          <span>Loan #{loan.loanNo}</span>
                          <span className="text-blue-600">₹{loan.loanAmount?.toLocaleString()}</span>
                        </div>
                        <p className="text-slate-500">Balance: ₹{loan.balance?.toLocaleString()} • Status: {loan.status}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">No Qardan Hasana loans registered.</p>
                )}
              </div>

              {/* Raza Forms */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-800 border-b pb-2 flex items-center gap-2">
                  <FileCheck size={16} className="text-blue-600" />
                  Raza Applications ({razas.length})
                </h3>
                {razas.length > 0 ? (
                  <div className="space-y-3">
                    {razas.map(raza => (
                      <div key={raza.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs space-y-1">
                        <div className="flex items-center justify-between font-bold">
                          <span>{raza.razaType}</span>
                          <span className={`px-2 py-0.5 rounded ${raza.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                            {raza.status}
                          </span>
                        </div>
                        <p className="text-slate-500">Submitted on: {raza.date}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">No Raza form applications on record.</p>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white p-12 rounded-xl border border-slate-200 shadow-sm text-center space-y-3">
          <AlertCircle size={40} className="text-amber-500 mx-auto" />
          <h2 className="text-lg font-bold text-slate-800">Mumineen Record Not Found</h2>
          <p className="text-slate-500 text-xs max-w-md mx-auto">
            No Mumineen found with ITS Number <strong className="font-mono text-slate-800">"{selectedIts}"</strong>. Please verify the ITS number or select from the directory.
          </p>
          <button
            onClick={() => navigate('/mumineen/list')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-medium shadow-sm hover:bg-blue-700 transition-colors"
          >
            Go to Mumineen Directory
          </button>
        </div>
      )}
    </div>
  )
}
