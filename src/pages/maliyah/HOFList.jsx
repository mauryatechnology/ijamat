import { useState, useMemo } from 'react'
import { useData } from '../../context/DataContext'
import { Users, Download, Search, RefreshCw, FileText } from 'lucide-react'

export default function HOFList() {
  const { members, dropdownOptions } = useData()

  const [mohalla, setMohalla] = useState('All')
  const [shopLocation, setShopLocation] = useState('All')
  const [sector, setSector] = useState('All')
  const [subSector, setSubSector] = useState('All')
  const [masool, setMasool] = useState('All')
  const [musaeed, setMusaeed] = useState('All')
  const [masoolaat, setMasoolaat] = useState('All')
  const [musaedaat, setMusaedaat] = useState('All')
  const [gender, setGender] = useState('All')
  const [laagat, setLaagat] = useState('All')
  const [childUpto, setChildUpto] = useState('')
  const [multiInput, setMultiInput] = useState('')

  const filteredMembers = useMemo(() => {
    return members.filter(m => {
      if (mohalla !== 'All' && m.mohalla !== mohalla) return false
      if (shopLocation !== 'All' && m.shopLocation !== shopLocation) return false
      if (sector !== 'All' && m.sector !== sector) return false
      if (subSector !== 'All' && m.subSector !== subSector) return false
      if (masool !== 'All' && m.masool !== masool) return false
      if (musaeed !== 'All' && m.musaeed !== musaeed) return false
      if (masoolaat !== 'All' && m.masoolaat !== masoolaat) return false
      if (musaedaat !== 'All' && m.musaedaat !== musaedaat) return false
      if (gender !== 'All' && m.gender !== gender) return false
      if (laagat !== 'All' && m.laagat !== laagat) return false
      if (childUpto !== '' && m.age > Number(childUpto)) return false

      if (multiInput.trim() !== '') {
        const ids = multiInput.split(/[\s,]+/).map(s => s.trim()).filter(Boolean)
        const matchSabil = ids.includes(m.sabilNo?.toString())
        const matchITS = ids.includes(m.itsId?.toString())
        if (!matchSabil && !matchITS) return false
      }

      return true
    })
  }, [members, mohalla, shopLocation, sector, subSector, masool, musaeed, masoolaat, musaedaat, gender, laagat, childUpto, multiInput])

  const handleExportCSV = () => {
    const headers = ["S.No.", "Sabil", "ITS ID", "Name", "Gender", "Age", "Mohalla", "Sector", "Sub-Sector", "Mobile No.", "Masool"]
    const rows = filteredMembers.map((m, idx) => [
      idx + 1, m.sabilNo, m.itsId, `"${m.name}"`, m.gender, m.age, `"${m.mohalla}"`, m.sector, m.subSector, m.phone, `"${m.masool || ''}"`
    ])
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n")
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `hof_list_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleReset = () => {
    setMohalla('All')
    setShopLocation('All')
    setSector('All')
    setSubSector('All')
    setMasool('All')
    setMusaeed('All')
    setMasoolaat('All')
    setMusaedaat('All')
    setGender('All')
    setLaagat('All')
    setChildUpto('')
    setMultiInput('')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Users className="text-blue-600" /> Head of Family (HOF) List & Demographic Filter
          </h1>
          <p className="text-sm text-slate-500">Search and generate custom HOF demographic lists with full sector & committee filters</p>
        </div>
        <button
          onClick={handleExportCSV}
          className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
        >
          <Download size={14} /> Export to Excel
        </button>
      </div>

      {/* Filter Form Panel */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs space-y-4">
        <h2 className="font-bold border-b pb-2 text-sm text-slate-800 flex items-center gap-2">
          <Search size={16} className="text-blue-600" /> Filter Criteria
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block font-semibold mb-1 text-slate-600">Location / Mohalla</label>
            <select value={mohalla} onChange={e => setMohalla(e.target.value)} className="w-full p-2 border rounded bg-slate-50">
              <option value="All">All Locations</option>
              {dropdownOptions.mohallas.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-600">Shop Location</label>
            <select value={shopLocation} onChange={e => setShopLocation(e.target.value)} className="w-full p-2 border rounded bg-slate-50">
              <option value="All">All Shop Locations</option>
              {dropdownOptions.shopLocations.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-600">Sector</label>
            <select value={sector} onChange={e => setSector(e.target.value)} className="w-full p-2 border rounded bg-slate-50">
              <option value="All">All Sectors</option>
              {dropdownOptions.sectors.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-600">Sub-Sector</label>
            <select value={subSector} onChange={e => setSubSector(e.target.value)} className="w-full p-2 border rounded bg-slate-50">
              <option value="All">All Sub-Sectors</option>
              {dropdownOptions.subSectors.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-600">Masool</label>
            <select value={masool} onChange={e => setMasool(e.target.value)} className="w-full p-2 border rounded bg-slate-50">
              <option value="All">All Masools</option>
              {dropdownOptions.masools.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-600">Musaeed</label>
            <select value={musaeed} onChange={e => setMusaeed(e.target.value)} className="w-full p-2 border rounded bg-slate-50">
              <option value="All">All Musaeeds</option>
              {dropdownOptions.musaeeds.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-600">Masoolaat</label>
            <select value={masoolaat} onChange={e => setMasoolaat(e.target.value)} className="w-full p-2 border rounded bg-slate-50">
              <option value="All">All Masoolaat</option>
              {dropdownOptions.masoolaats.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-600">Musaedaat</label>
            <select value={musaedaat} onChange={e => setMusaedaat(e.target.value)} className="w-full p-2 border rounded bg-slate-50">
              <option value="All">All Musaedaat</option>
              {dropdownOptions.musaedaats.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-600">Laagat Category</label>
            <select value={laagat} onChange={e => setLaagat(e.target.value)} className="w-full p-2 border rounded bg-slate-50">
              <option value="All">All Laagats</option>
              {dropdownOptions.laagats.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-600">Gender</label>
            <select value={gender} onChange={e => setGender(e.target.value)} className="w-full p-2 border rounded bg-slate-50">
              <option value="All">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-600">Child Up to Age</label>
            <input type="number" value={childUpto} onChange={e => setChildUpto(e.target.value)} placeholder="e.g. 12" className="w-full p-2 border rounded bg-slate-50" />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-600">Multiple Sabil / ITS IDs</label>
            <input type="text" value={multiInput} onChange={e => setMultiInput(e.target.value)} placeholder="Comma-separated IDs..." className="w-full p-2 border rounded bg-slate-50" />
          </div>
        </div>

        <div className="flex justify-between items-center border-t pt-3">
          <span className="font-semibold text-slate-700">Total HOF Records Matched: {filteredMembers.length}</span>
          <button onClick={handleReset} className="text-blue-600 hover:underline text-xs flex items-center gap-1 font-semibold">
            <RefreshCw size={12} /> Reset All Filters
          </button>
        </div>
      </div>

      {/* Datatable */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">S.No.</th>
              <th className="p-3">Sabil #</th>
              <th className="p-3">ITS ID</th>
              <th className="p-3">HOF Name</th>
              <th className="p-3">Gender</th>
              <th className="p-3">Age</th>
              <th className="p-3">Mohalla</th>
              <th className="p-3">Mobile No.</th>
              <th className="p-3">Assigned Masool</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredMembers.map((m, idx) => (
              <tr key={m.id} className="hover:bg-slate-50">
                <td className="p-3 text-slate-500 font-mono">{idx + 1}</td>
                <td className="p-3 font-mono font-semibold text-blue-700">{m.sabilNo}</td>
                <td className="p-3 font-mono">{m.itsId}</td>
                <td className="p-3 font-medium text-slate-800">{m.name}</td>
                <td className="p-3">{m.gender}</td>
                <td className="p-3">{m.age}</td>
                <td className="p-3">{m.mohalla}</td>
                <td className="p-3 font-mono text-slate-600">{m.phone}</td>
                <td className="p-3 text-slate-600">{m.masool || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
