import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { ClipboardList, Plus } from 'lucide-react'

export default function UpliftmentSurvey() {
  const { surveyData, addSurvey } = useData()
  const [familyCode, setFamilyCode] = useState('')
  const [headName, setHeadName] = useState('')
  const [surveyor, setSurveyor] = useState('')
  const [income, setIncome] = useState('')
  const [needCategory, setNeedCategory] = useState('Medical & Financial')

  const handleAdd = (e) => {
    e.preventDefault()
    addSurvey({
      familyCode,
      headName,
      surveyor,
      surveyDate: new Date().toISOString().split('T')[0],
      incomeCategory: income,
      housingStatus: 'Owned',
      familySize: 5,
      needCategory,
      verifiedBy: 'Committee'
    })
    alert('Upliftment Survey Record Added!')
    setFamilyCode('')
    setHeadName('')
    setIncome('')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Marafiq / Upliftment Family Survey</h1>
        <p className="text-sm text-slate-500">Comprehensive survey records for family socio-economic upliftment</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <h2 className="font-semibold text-slate-700 text-sm border-b pb-2 flex items-center gap-2">
            <ClipboardList size={16} className="text-emerald-600" /> New Family Survey Entry
          </h2>
          <form onSubmit={handleAdd} className="space-y-3">
            <div><label className="block font-semibold mb-1">Family Code / Sabil #</label><input type="text" value={familyCode} onChange={e => setFamilyCode(e.target.value)} placeholder="Sabil #" className="w-full p-2 border rounded bg-slate-50" required /></div>
            <div><label className="block font-semibold mb-1">Head of Family</label><input type="text" value={headName} onChange={e => setHeadName(e.target.value)} placeholder="Name" className="w-full p-2 border rounded bg-slate-50" required /></div>
            <div><label className="block font-semibold mb-1">Surveyor Name</label><input type="text" value={surveyor} onChange={e => setSurveyor(e.target.value)} placeholder="Surveyor" className="w-full p-2 border rounded bg-slate-50" required /></div>
            <div><label className="block font-semibold mb-1">Income Band</label><input type="text" value={income} onChange={e => setIncome(e.target.value)} placeholder="e.g. Below 25,000/mo" className="w-full p-2 border rounded bg-slate-50" required /></div>
            <div>
              <label className="block font-semibold mb-1">Assistance Category</label>
              <select value={needCategory} onChange={e => setNeedCategory(e.target.value)} className="w-full p-2 border rounded bg-slate-50">
                <option value="Medical & Financial">Medical & Financial</option>
                <option value="Education">Education</option>
                <option value="Housing">Housing</option>
                <option value="Business Support">Business Support</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-emerald-600 text-white py-2 rounded font-medium">Save Survey Entry</button>
          </form>
        </div>

        <div className="md:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-100 border-b">
                <th className="p-3">Sabil #</th>
                <th className="p-3">Head of Family</th>
                <th className="p-3">Survey Date</th>
                <th className="p-3">Assistance Needed</th>
                <th className="p-3">Surveyor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {surveyData.map(s => (
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-semibold text-emerald-600">{s.familyCode}</td>
                  <td className="p-3 font-medium text-slate-800">{s.headName}</td>
                  <td className="p-3">{s.surveyDate}</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] bg-blue-100 text-blue-800 font-semibold">{s.needCategory}</span></td>
                  <td className="p-3 text-slate-600">{s.surveyor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
