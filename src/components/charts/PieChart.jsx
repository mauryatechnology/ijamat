import { PieChart as RechartsPie, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = ['#880808', '#d4af37', '#262626', '#666666', '#b31e1e', '#f97066', '#eab308']

export default function PieChartWidget({ data, dataKey = 'amount', nameKey = 'name', title }) {
  const total = data.reduce((sum, d) => sum + (d[dataKey] || 0), 0)

  const renderLabel = ({ name, value }) => {
    const pct = total > 0 ? ((value / total) * 100).toFixed(1) : 0
    return `${name} - Rs.${value.toLocaleString('en-IN')} (${pct}%)`
  }

  return (
    <div className="card">
      {title && (
        <div className="card-header">
          <h3 className="text-base font-semibold text-gray-700">{title}</h3>
        </div>
      )}
      <ResponsiveContainer width="100%" height={320}>
        <RechartsPie>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={40}
            dataKey={dataKey}
            nameKey={nameKey}
            label={renderLabel}
            labelLine={{ stroke: '#94a3b8', strokeWidth: 1 }}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => `Rs. ${Number(value).toLocaleString('en-IN')}`}
            contentStyle={{
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '12px'
            }}
          />
        </RechartsPie>
      </ResponsiveContainer>
    </div>
  )
}
