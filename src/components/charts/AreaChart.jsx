import { AreaChart as RechartsArea, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function AreaChartWidget({ data, dataKey = 'total', xKey = 'date', title, color = '#2563EB' }) {
  return (
    <div className="card">
      {title && (
        <div className="card-header">
          <h3 className="text-base font-semibold text-gray-700">{title}</h3>
        </div>
      )}
      <ResponsiveContainer width="100%" height={280}>
        <RechartsArea data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.8} />
              <stop offset="95%" stopColor={color} stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey={xKey} tick={{ fontSize: 11 }} stroke="#94a3b8" />
          <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            fillOpacity={1}
            fill="url(#areaGradient)"
            strokeWidth={2}
            dot={{ r: 4, fill: color, stroke: 'white', strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
        </RechartsArea>
      </ResponsiveContainer>
    </div>
  )
}
