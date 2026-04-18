import { useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Clock, Ticket } from 'lucide-react'
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] } }) }

const successData = [ { name: 'Mon', rate: 92 }, { name: 'Tue', rate: 88 }, { name: 'Wed', rate: 95 }, { name: 'Thu', rate: 91 }, { name: 'Fri', rate: 97 }, { name: 'Sat', rate: 94 }, { name: 'Sun', rate: 96 } ]
const speedData = [ { name: '00:00', speed: 85 }, { name: '04:00', speed: 72 }, { name: '08:00', speed: 95 }, { name: '12:00', speed: 110 }, { name: '16:00', speed: 88 }, { name: '20:00', speed: 67 }, { name: '23:59', speed: 78 } ]
const ticketsData = [ { name: 'Jan', tickets: 120 }, { name: 'Feb', tickets: 180 }, { name: 'Mar', tickets: 240 }, { name: 'Apr', tickets: 310 }, { name: 'May', tickets: 280 }, { name: 'Jun', tickets: 420 }, { name: 'Jul', tickets: 380 } ]
const platformData = [ { name: 'Ticketmaster', value: 42, color: '#2563eb' }, { name: 'StubHub', value: 25, color: '#3b82f6' }, { name: 'SeatGeek', value: 18, color: '#60a5fa' }, { name: 'Vivid Seats', value: 10, color: '#93c5fd' }, { name: 'Other', value: 5, color: '#e2e8f0' } ]

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ padding: '8px 16px', borderRadius: 12, background: 'rgba(255, 255, 255, 0.95)', border: '1px solid rgba(15, 23, 42, 0.08)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <p className="text-xs" style={{ color: '#64748b', marginBottom: 4 }}>{label}</p>
      <p className="text-sm font-semibold text-slate-900">{payload[0].value}</p>
    </div>
  )
}

function MetricCard({ icon: Icon, label, value, sub, color, delay }) {
  return (
    <motion.div className="glass-card" style={{ padding: 24 }} variants={fadeUp} custom={delay}>
      <div className="flex items-center" style={{ gap: 12, marginBottom: 12 }}>
        <div className="flex items-center justify-center shrink-0" style={{ width: 40, height: 40, borderRadius: 12, background: `${color}15` }}>
          <Icon size={20} style={{ color }} />
        </div>
        <div>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
          <p className="text-xs" style={{ color: '#64748b' }}>{label}</p>
        </div>
      </div>
      {sub && <p className="text-xs" style={{ color: '#16a34a' }}>{sub}</p>}
    </motion.div>
  )
}

export default function Analytics() {
  const [range, setRange] = useState('7d')

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.06 } } }}>
      <motion.div variants={fadeUp} className="flex flex-wrap items-start justify-between" style={{ marginBottom: 32, gap: 16 }}>
        <div><h2 className="text-2xl font-bold text-slate-900" style={{ marginBottom: 4 }}>Analytics</h2><p className="text-sm" style={{ color: '#64748b' }}>Performance insights and ticket acquisition metrics.</p></div>
        <div className="flex items-center rounded-lg overflow-hidden glass-card" style={{ padding: 4 }}>
          {['24h', '7d', '30d', '90d'].map(r => (
            <button
              key={r} className="text-xs font-medium"
              style={{ padding: '6px 14px', borderRadius: 8, cursor: 'pointer', border: 'none', color: range === r ? '#0f172a' : '#64748b', background: range === r ? 'rgba(15, 23, 42, 0.05)' : 'transparent', transition: 'background 0.15s ease' }}
              onClick={() => setRange(r)}
            >{r}</button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 16, marginBottom: 32 }}>
        <MetricCard icon={BarChart3} label="Success Rate" value="94.7%" sub="↑ 2.3% vs last week" color="#2563eb" delay={0} />
        <MetricCard icon={Clock} label="Avg Response" value="73ms" sub="↓ 12ms improvement" color="#f59e0b" delay={1} />
        <MetricCard icon={Ticket} label="Tickets Secured" value="1,247" sub="↑ 18% growth" color="#16a34a" delay={2} />
        <MetricCard icon={TrendingUp} label="Revenue Saved" value="$48.2K" sub="vs retail pricing" color="#3b82f6" delay={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 16, marginBottom: 16 }}>
        <motion.div variants={fadeUp} custom={4} className="glass-card" style={{ padding: 24 }}>
          <h3 className="text-base font-semibold text-slate-900" style={{ marginBottom: 24 }}>Success Rate Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={successData}>
              <defs><linearGradient id="successGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2563eb" stopOpacity={0.2} /><stop offset="100%" stopColor="#2563eb" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,23,42,0.06)" />
              <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} domain={[80, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="rate" stroke="#2563eb" strokeWidth={2} fill="url(#successGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={fadeUp} custom={5} className="glass-card" style={{ padding: 24 }}>
          <h3 className="text-base font-semibold text-slate-900" style={{ marginBottom: 24 }}>Response Speed (ms)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={speedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,23,42,0.06)" />
              <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="speed" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4, fill: '#f59e0b', strokeWidth: 0 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: 16 }}>
        <motion.div variants={fadeUp} custom={6} className="lg:col-span-2 glass-card" style={{ padding: 24 }}>
          <h3 className="text-base font-semibold text-slate-900" style={{ marginBottom: 24 }}>Tickets Secured (Monthly)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={ticketsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,23,42,0.06)" />
              <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="tickets" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={fadeUp} custom={7} className="glass-card" style={{ padding: 24 }}>
          <h3 className="text-base font-semibold text-slate-900" style={{ marginBottom: 24 }}>By Platform</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={platformData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" stroke="white" strokeWidth={2}>
                {platformData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
            {platformData.map((p, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center" style={{ gap: 8 }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: p.color, display: 'block', shrink: 0 }} /><span style={{ color: '#475569' }}>{p.name}</span></div>
                <span className="font-medium text-slate-900">{p.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
