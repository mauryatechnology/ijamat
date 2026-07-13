export default function StatCard({ title, value, subtitle, color, icon: Icon, onClick }) {
  const colorMap = {
    purple: 'bg-gradient-to-br from-primary to-[#540505]',
    coral: 'bg-gradient-to-br from-red-600 to-[#801010]',
    green: 'bg-gradient-to-br from-emerald-600 to-green-800',
    cyan: 'bg-gradient-to-br from-brand-charcoal to-[#0d0d0d]',
    blue: 'bg-gradient-to-br from-[#aa8412] to-amber-700',
    amber: 'bg-gradient-to-br from-amber-500 to-amber-700',
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
