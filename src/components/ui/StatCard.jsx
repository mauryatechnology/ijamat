export default function StatCard({ title, value, subtitle, color, icon: Icon, onClick }) {
  const colorMap = {
    blue: 'bg-gradient-to-br from-blue-600 to-blue-800',
    purple: 'bg-gradient-to-br from-indigo-600 to-blue-700',
    coral: 'bg-gradient-to-br from-blue-700 to-indigo-800',
    green: 'bg-gradient-to-br from-emerald-600 to-emerald-800',
    cyan: 'bg-gradient-to-br from-slate-800 to-slate-900',
    amber: 'bg-gradient-to-br from-amber-500 to-amber-700',
  }

  return (
    <div
      className={`stat-card ${colorMap[color] || colorMap.blue}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium opacity-90 mb-1">{title}</h3>
          <p className="text-3xl font-bold">{value}</p>
          {subtitle && <p className="text-xs opacity-75 mt-1">{subtitle}</p>}
        </div>
        {Icon && (
          <div className="p-2 bg-white/20 rounded-lg shrink-0">
            <Icon size={24} />
          </div>
        )}
      </div>
    </div>
  )
}
