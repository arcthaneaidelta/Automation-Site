import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Activity, Ticket, CheckCircle, TrendingUp, ArrowUpRight, ArrowDownRight, Zap, Target } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] } }),
}

const stats = [
  { label: 'Active Sessions', value: '24', icon: Activity, trend: '+23%', positive: true, color: '#3b82f6' },
  { label: 'Tickets Secured', value: '1,247', icon: Ticket, trend: '+12%', positive: true, color: '#16a34a' },
  { label: 'Success Rate', value: '94.2%', icon: CheckCircle, trend: '+2.1%', positive: true, color: '#3b82f6' },
  { label: 'Avg Speed', value: '73ms', icon: TrendingUp, trend: '-8ms', positive: true, color: '#f59e0b' },
]

const recentActivity = [
  { id: 1, action: 'Secured 2x Floor Tickets', event: 'Taylor Swift – Eras Tour', time: '2 min ago', platform: 'Ticketmaster', status: 'success' },
  { id: 2, action: 'Started Monitoring', event: 'Coldplay – Music of the Spheres', time: '5 min ago', platform: 'StubHub', status: 'info' },
  { id: 3, action: 'Rate Limit Detected', event: 'NBA Finals Game 7', time: '8 min ago', platform: 'SeatGeek', status: 'warning' },
  { id: 4, action: 'Checkout Failed', event: 'Adele – Vegas Residency', time: '12 min ago', platform: 'Ticketmaster', status: 'error' },
]

const statusColors = {
  success: '#16a34a',
  info: '#3b82f6',
  warning: '#f59e0b',
  error: '#dc2626'
}

export default function Dashboard() {
  const [loadText, setLoadText] = useState('Running at full capacity')
  useEffect(() => {
    const el = setInterval(() => {
      setLoadText(prev => prev.endsWith('...') ? 'Running at full capacity' : prev + '.')
    }, 2000)
    return () => clearInterval(el)
  }, [])

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.06 } } }}>
      <motion.div variants={fadeUp} style={{ marginBottom: 32 }}>
        <h2 className="text-2xl font-bold text-slate-900" style={{ marginBottom: 4 }}>Welcome back, John</h2>
        <p className="text-sm" style={{ color: '#64748b' }}>Here's what's happening across your sessions.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 16, marginBottom: 32 }}>
        {stats.map((stat, i) => (
          <motion.div key={stat.label} variants={fadeUp} custom={i + 1} className="glass-card glass-card-hover" style={{ padding: 24 }}>
            <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
              <div className="flex items-center justify-center rounded-lg" style={{ width: 40, height: 40, background: `${stat.color}15` }}>
                <stat.icon size={20} style={{ color: stat.color }} />
              </div>
              <div className="flex items-center text-xs font-semibold" style={{ gap: 4, padding: '4px 8px', borderRadius: 9999, background: stat.positive ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)', color: stat.positive ? '#16a34a' : '#dc2626' }}>
                {stat.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.trend}
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900" style={{ marginBottom: 4 }}>{stat.value}</p>
            <p className="text-xs font-medium" style={{ color: '#64748b' }}>{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: 24 }}>
        <motion.div variants={fadeUp} custom={5} className="lg:col-span-2 glass-card" style={{ padding: 24 }}>
          <div className="flex flex-wrap items-center justify-between border-b" style={{ paddingBottom: 16, marginBottom: 16, borderColor: 'rgba(15, 23, 42, 0.08)' }}>
            <h3 className="text-base font-semibold text-slate-900">Activity Log</h3>
            <span className="flex items-center text-xs font-medium" style={{ gap: 6, padding: '4px 10px', borderRadius: 9999, background: 'rgba(34, 197, 94, 0.1)', color: '#16a34a' }}>
              <span className="status-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#16a34a', display: 'block' }} /> Live
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {recentActivity.map((activity, i) => (
              <motion.div key={activity.id} className="relative flex items-start" style={{ gap: 16 }} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.1 }}>
                {i !== recentActivity.length - 1 && (
                  <div style={{ position: 'absolute', top: 24, left: 5, width: 2, height: '100%', background: 'rgba(15, 23, 42, 0.06)' }} />
                )}
                <div className="flex items-center justify-center shrink-0" style={{ width: 12, height: 12, borderRadius: '50%', background: statusColors[activity.status], marginTop: 6, border: '3px solid #ffffff', boxShadow: `0 0 0 1px ${statusColors[activity.status]}40` }} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-900">{activity.action}</p>
                  <p className="text-xs" style={{ color: '#64748b', marginTop: 2 }}>{activity.event} • {activity.platform}</p>
                </div>
                <span className="text-xs shrink-0" style={{ color: '#94a3b8' }}>{activity.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeUp} custom={6} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div className="glass-card" style={{ padding: 24 }}>
            <h3 className="text-base font-semibold text-slate-900" style={{ marginBottom: 16 }}>Engine Performance</h3>
            <div className="flex items-center" style={{ gap: 12, marginBottom: 24 }}>
              <div className="flex items-center justify-center shrink-0" style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(59, 130, 246, 0.1)' }}>
                <Zap size={24} style={{ color: '#3b82f6' }} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">{loadText}</p>
                <p className="text-xs" style={{ color: '#64748b', marginTop: 2 }}>14/15 nodes active</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <div className="flex justify-between text-xs" style={{ marginBottom: 6 }}><span style={{ color: '#64748b' }}>CPU Load</span><span className="font-semibold text-slate-900">42%</span></div>
                <div className="rounded-full overflow-hidden" style={{ height: 6, background: 'rgba(15, 23, 42, 0.06)' }}><div className="h-full rounded-full" style={{ width: '42%', background: '#3b82f6' }} /></div>
              </div>
              <div>
                <div className="flex justify-between text-xs" style={{ marginBottom: 6 }}><span style={{ color: '#64748b' }}>Memory</span><span className="font-semibold text-slate-900">71%</span></div>
                <div className="rounded-full overflow-hidden" style={{ height: 6, background: 'rgba(15, 23, 42, 0.06)' }}><div className="h-full rounded-full" style={{ width: '71%', background: '#2563eb' }} /></div>
              </div>
            </div>
          </div>

          <div className="glass-card flex-1 flex flex-col justify-between" style={{ padding: 24 }}>
            <div>
              <div className="flex items-center" style={{ gap: 12, marginBottom: 16 }}>
                <div className="flex items-center justify-center shrink-0" style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(245, 158, 11, 0.1)' }}>
                  <Target size={20} style={{ color: '#f59e0b' }} />
                </div>
                <div><p className="text-sm font-semibold text-slate-900">Most monitored</p></div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="flex items-center justify-between text-xs"><span className="font-medium text-slate-900 truncate">Taylor Swift – Eras</span><span className="shrink-0 font-medium" style={{ color: '#3b82f6', background: 'rgba(59, 130, 246, 0.1)', padding: '2px 8px', borderRadius: 12 }}>24 sessions</span></div>
              <div className="flex items-center justify-between text-xs"><span className="font-medium text-slate-900 truncate">Coldplay – World Tour</span><span className="shrink-0 font-medium" style={{ color: '#3b82f6', background: 'rgba(59, 130, 246, 0.1)', padding: '2px 8px', borderRadius: 12 }}>18 sessions</span></div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
