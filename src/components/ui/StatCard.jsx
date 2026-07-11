export default function StatCard({ title, value, subtitle, color, icon: Icon, onClick }) {
  const colorMap = {
    purple: 'bg-gradient-to-br from-purple-500 to-purple-700',
    coral: 'bg-gradient-to-br from-red-400 to-rose-500',
    green: 'bg-gradient-to-br from-emerald-500 to-green-600',
    cyan: 'bg-gradient-to-br from-cyan-400 to-cyan-600',
    blue: 'bg-gradient-to-br from-blue-500 to-blue-700',
    amber: 'bg-gradient-to-br from-amber-400 to-amber-600',
  }

  return (
    <div
      className={`stat-card ${colorMap[color] || colorMap.purple}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium opacity-90 mb-1">{title}</h3>
          <p className="text-3xl font-bold">{value}</p>
          {subtitle && <p className="text-xs opacity-75 mt-1">{subtitle}</p>}
        </div>
        {Icon && (
          <div className="p-2 bg-white/20 rounded-lg">
            <Icon size={24} />
          </div>
        )}
      </div>
    </div>
  )
}
