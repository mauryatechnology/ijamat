import { useState, useMemo } from 'react'
import { useData } from '../../context/DataContext'
import { Download, SlidersHorizontal, Search, RefreshCw, FileSpreadsheet } from 'lucide-react'

export default function SurveyReport() {
  const { surveyData, members, dropdownOptions } = useData()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMohalla, setSelectedMohalla] = useState('All')
  const [selectedSector, setSelectedSector] = useState('All')
  const [selectedSubSector, setSelectedSubSector] = useState('All')
  const [selectedSurveyStatus, setSelectedSurveyStatus] = useState('All')

  // Column visibility state
  const [visibleCols, setVisibleCols] = useState({
    location: true,
    sector: true,
    subSector: true,
    sabil: true,
    itsId: true,
    name: true,
    age: true,
    gender: true,
    address: true,
    mobile: true,
    fmbMasool: true,
    thaliNo: true,
    survey: true,
    filledBy: true,
    filledDate: true
  })

  const [showColVisMenu, setShowColVisMenu] = useState(false)

  // Merge survey data with member details for comprehensive table
  const enrichedData = useMemo(() => {
    return surveyData.map((s, idx) => {
      const member = members.find(m => m.sabilNo === s.familyCode || m.itsId === s.familyCode) || members[idx % members.length] || {}
      return {
        id: s.id,
        location: member.mohalla || 'Saifee Mohalla',
        sector: member.sector || 'Sector A',
        subSector: member.subSector || 'Sub-Sector 1',
        sabil: s.familyCode || member.sabilNo || 'S-101',
        itsId: member.itsId || '40493729',
        name: s.headName || member.name || 'Member Name',
        age: member.age || 42,
        gender: member.gender || 'Male',
        address: member.address || 'Zampa Bazaar',
        mobile: member.phone || '9825098250',
        fmbMasool: member.masool || 'Mohd bhai Rangwala',
        thaliNo: member.thaliNo || `T-0${(idx % 30) + 1}`,
        survey: 'Filled',
        filledBy: s.surveyor || 'Ali Asghar',
        filledDate: s.surveyDate || '2024-06-12 10:30 AM'
      }
    })
  }, [surveyData, members])

  const filteredData = useMemo(() => {
    return enrichedData.filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.itsId.toString().includes(searchQuery) ||
        item.sabil.toString().includes(searchQuery) ||
        item.mobile.includes(searchQuery)

      const matchesMohalla = selectedMohalla === 'All' || item.location === selectedMohalla
      const matchesSector = selectedSector === 'All' || item.sector === selectedSector
      const matchesSubSector = selectedSubSector === 'All' || item.subSector === selectedSubSector
      const matchesStatus = selectedSurveyStatus === 'All' || item.survey === selectedSurveyStatus

      return matchesSearch && matchesMohalla && matchesSector && matchesSubSector && matchesStatus
    })
  }, [enrichedData, searchQuery, selectedMohalla, selectedSector, selectedSubSector, selectedSurveyStatus])

  const handleExportCSV = () => {
    const headers = ["Location", "Sector", "Sub-Sector", "Sabil", "ITS ID", "Name", "Age", "Gender", "Mobile", "FMB Masool", "Thali No", "Survey Status", "Filled By", "Filled Date"]
    const rows = filteredData.map(d => [
      d.location, d.sector, d.subSector, d.sabil, d.itsId, `"${d.name}"`, d.age, d.gender, d.mobile, `"${d.fmbMasool}"`, d.thaliNo, d.survey, `"${d.filledBy}"`, d.filledDate
    ])
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n")
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `survey_report_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const toggleCol = (key) => {
    setVisibleCols(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <FileSpreadsheet className="text-blue-600" /> Comprehensive Survey Master Report
          </h1>
          <p className="text-sm text-slate-500">Full audit log of community survey records with location, sector & demographic filters</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleExportCSV}
            className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
          >
            <Download size={14} /> Export Excel (XLSX/CSV)
          </button>
          <div className="relative">
            <button 
              onClick={() => setShowColVisMenu(!showColVisMenu)}
              className="px-3 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
            >
              <SlidersHorizontal size={14} /> Column Visibility ({Object.values(visibleCols).filter(Boolean).length})
            </button>

            {showColVisMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 shadow-xl rounded-xl p-3 z-20 text-xs space-y-2 max-h-80 overflow-y-auto">
                <h4 className="font-bold text-slate-700 border-b pb-1">Toggle Columns</h4>
                {Object.keys(visibleCols).map(col => (
                  <label key={col} className="flex items-center gap-2 capitalize text-slate-600 hover:text-slate-900 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={visibleCols[col]} 
                      onChange={() => toggleCol(col)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    {col.replace(/([A-Z])/g, ' $1')}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter Toolbar Panel */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div>
            <label className="block font-semibold mb-1 text-slate-600">Location / Mohalla</label>
            <select 
              value={selectedMohalla} 
              onChange={e => setSelectedMohalla(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white transition outline-none"
            >
              <option value="All">All Locations ({dropdownOptions.mohallas.length})</option>
              {dropdownOptions.mohallas.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-600">Sector</label>
            <select 
              value={selectedSector} 
              onChange={e => setSelectedSector(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white transition outline-none"
            >
              <option value="All">All Sectors</option>
              {dropdownOptions.sectors.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-600">Sub-Sector</label>
            <select 
              value={selectedSubSector} 
              onChange={e => setSelectedSubSector(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white transition outline-none"
            >
              <option value="All">All Sub-Sectors</option>
              {dropdownOptions.subSectors.map(ss => <option key={ss} value={ss}>{ss}</option>)}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-600">Survey Status</label>
            <select 
              value={selectedSurveyStatus} 
              onChange={e => setSelectedSurveyStatus(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white transition outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Filled">Filled</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-600">Search Sabil / ITS / Name</label>
            <div className="relative">
              <input 
                type="text" 
                value={searchQuery} 
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search member..."
                className="w-full pl-8 pr-2 py-2 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white transition outline-none"
              />
              <Search size={14} className="absolute left-2.5 top-2.5 text-slate-400" />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center border-t pt-3 text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Showing {filteredData.length} of {enrichedData.length} survey entries</span>
            {(selectedMohalla !== 'All' || selectedSector !== 'All' || selectedSubSector !== 'All' || searchQuery !== '') && (
              <button 
                onClick={() => {
                  setSelectedMohalla('All')
                  setSelectedSector('All')
                  setSelectedSubSector('All')
                  setSelectedSurveyStatus('All')
                  setSearchQuery('')
                }}
                className="text-blue-600 hover:underline text-[11px] flex items-center gap-1 font-medium ml-2"
              >
                <RefreshCw size={12} /> Reset Filters
              </button>
            )}
          </div>
          <span className="text-[11px] bg-slate-100 px-2 py-1 rounded border">Active Session: 1445-1446 H</span>
        </div>
      </div>

      {/* Main Datatable */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b text-slate-700 font-semibold">
                {visibleCols.location && <th className="p-3">Location</th>}
                {visibleCols.sector && <th className="p-3">Sector</th>}
                {visibleCols.subSector && <th className="p-3">Sub-Sector</th>}
                {visibleCols.sabil && <th className="p-3">Sabil</th>}
                {visibleCols.itsId && <th className="p-3">ITS ID</th>}
                {visibleCols.name && <th className="p-3">Name</th>}
                {visibleCols.age && <th className="p-3 text-center">Age</th>}
                {visibleCols.gender && <th className="p-3">Gender</th>}
                {visibleCols.mobile && <th className="p-3">Mobile</th>}
                {visibleCols.fmbMasool && <th className="p-3">FMB Masool</th>}
                {visibleCols.thaliNo && <th className="p-3">Thali #</th>}
                {visibleCols.survey && <th className="p-3">Survey</th>}
                {visibleCols.filledBy && <th className="p-3">Filled By</th>}
                {visibleCols.filledDate && <th className="p-3">Filled Date & Time</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.length > 0 ? (
                filteredData.map((row, idx) => (
                  <tr key={row.id || idx} className="hover:bg-slate-50/80 transition">
                    {visibleCols.location && <td className="p-3 text-slate-600 font-medium">{row.location}</td>}
                    {visibleCols.sector && <td className="p-3 text-slate-600">{row.sector}</td>}
                    {visibleCols.subSector && <td className="p-3 text-slate-500">{row.subSector}</td>}
                    {visibleCols.sabil && <td className="p-3 font-mono font-semibold text-blue-700">{row.sabil}</td>}
                    {visibleCols.itsId && <td className="p-3 font-mono text-slate-700">{row.itsId}</td>}
                    {visibleCols.name && <td className="p-3 font-medium text-slate-800">{row.name}</td>}
                    {visibleCols.age && <td className="p-3 text-center">{row.age}</td>}
                    {visibleCols.gender && <td className="p-3 text-slate-600">{row.gender}</td>}
                    {visibleCols.mobile && <td className="p-3 font-mono text-slate-600">{row.mobile}</td>}
                    {visibleCols.fmbMasool && <td className="p-3 text-slate-700">{row.fmbMasool}</td>}
                    {visibleCols.thaliNo && <td className="p-3 font-mono text-amber-700 font-semibold">{row.thaliNo}</td>}
                    {visibleCols.survey && (
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-bold">
                          {row.survey}
                        </span>
                      </td>
                    )}
                    {visibleCols.filledBy && <td className="p-3 text-slate-600">{row.filledBy}</td>}
                    {visibleCols.filledDate && <td className="p-3 text-slate-500 font-mono">{row.filledDate}</td>}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={14} className="p-8 text-center text-slate-500">
                    No survey records match the selected filters. Try resetting the search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
