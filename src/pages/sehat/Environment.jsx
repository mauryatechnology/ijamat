import { Leaf, Activity, Sparkles, Trophy } from 'lucide-react'

export default function Environment() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Environment & Eco-Drive Initiatives</h1>
        <p className="text-sm text-slate-500">Sehat & Environment tree plantation and green energy drives</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs max-w-md space-y-2">
        <h2 className="font-bold border-b pb-2 text-sm text-slate-800 flex items-center gap-2">
          <Leaf size={18} className="text-emerald-600" /> Green Jamaat Drive
        </h2>
        <p className="text-slate-600">50 trees planted across Jamaat premises. Solar energy conversion complete.</p>
      </div>
    </div>
  )
}

export function HealthRecord() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Mumineen Health Records Register</h1>
        <p className="text-sm text-slate-500">Centralized medical history and health insurance records</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs max-w-md space-y-2">
        <h2 className="font-bold border-b pb-2 text-sm text-slate-800 flex items-center gap-2">
          <Activity size={18} className="text-red-600" /> Electronic Health Register
        </h2>
        <p className="text-slate-600">Health profiles updated for active sabil members.</p>
      </div>
    </div>
  )
}

export function Nazafat() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Nazafat & Cleanliness Audit</h1>
        <p className="text-sm text-slate-500">Regular cleanliness and hygiene inspections for kitchen & mohalla</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs max-w-md space-y-2">
        <h2 className="font-bold border-b pb-2 text-sm text-slate-800 flex items-center gap-2">
          <Sparkles size={18} className="text-amber-500" /> Nazafat Certification
        </h2>
        <p className="text-emerald-700 font-medium">✓ kitchen & Mawaid rating: 5 Star Nazafat Grade.</p>
      </div>
    </div>
  )
}

export function Sports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Sports & Youth Fitness Events</h1>
        <p className="text-sm text-slate-500">Youth sports tournaments, marathons, and physical fitness programs</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs max-w-md space-y-2">
        <h2 className="font-bold border-b pb-2 text-sm text-slate-800 flex items-center gap-2">
          <Trophy size={18} className="text-indigo-600" /> Annual Jamaat Sports League
        </h2>
        <p className="text-slate-600">Badminton, Cricket & Football tournaments scheduled for winter session.</p>
      </div>
    </div>
  )
}
