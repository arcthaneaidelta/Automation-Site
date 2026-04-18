import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Zap, Clock, Wifi, WifiOff, Plus, Trash2 } from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] } }) }

const initialSessions = [
  { id: 1, name: 'Taylor Swift – Eras Tour', platform: 'Ticketmaster', status: 'running', speed: 67, progress: 78, scans: 12480, found: 23 },
  { id: 2, name: 'Coldplay – World Tour', platform: 'StubHub', status: 'running', speed: 43, progress: 45, scans: 8920, found: 11 },
  { id: 3, name: 'NBA Finals Game 7', platform: 'SeatGeek', status: 'paused', speed: 0, progress: 92, scans: 24100, found: 47 },
  { id: 4, name: 'Beyoncé – Renaissance', platform: 'Vivid Seats', status: 'running', speed: 89, progress: 34, scans: 5670, found: 8 },
  { id: 5, name: 'F1 Monaco Grand Prix', platform: 'AXS', status: 'completed', speed: 0, progress: 100, scans: 31200, found: 62 },
  { id: 6, name: 'Adele – Las Vegas Residency', platform: 'Ticketmaster', status: 'running', speed: 55, progress: 61, scans: 9870, found: 15 },
]

const statusConfig = {
  running: { bg: 'rgba(34, 197, 94, 0.1)', text: '#16a34a', dot: '#22c55e', label: 'Running' },
  paused: { bg: 'rgba(245, 158, 11, 0.1)', text: '#d97706', dot: '#f59e0b', label: 'Paused' },
  completed: { bg: 'rgba(59, 130, 246, 0.1)', text: '#2563eb', dot: '#3b82f6', label: 'Completed' },
  error: { bg: 'rgba(239, 68, 68, 0.1)', text: '#dc2626', dot: '#ef4444', label: 'Error' },
}

function SessionCard({ session, onToggle, onDelete }) {
  const [speed, setSpeed] = useState(session.speed)
  const [progress, setProgress] = useState(session.progress)
  const [scans, setScans] = useState(session.scans)

  useEffect(() => {
    if (session.status !== 'running') return
    const interval = setInterval(() => {
      setSpeed(prev => Math.max(20, Math.min(120, prev + (Math.random() - 0.5) * 20)))
      setProgress(prev => Math.min(100, prev + Math.random() * 0.5))
      setScans(prev => prev + Math.floor(Math.random() * 30) + 5)
    }, 2000)
    return () => clearInterval(interval)
  }, [session.status])

  const config = statusConfig[session.status] || statusConfig.error
  const isActive = session.status === 'running'

  return (
    <motion.div className="glass-card glass-card-hover" style={{ padding: 20 }} variants={fadeUp} layout>
      <div className="flex items-start justify-between" style={{ marginBottom: 16, gap: 12 }}>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-900 truncate">{session.name}</p>
          <p className="text-xs" style={{ color: '#64748b', marginTop: 2 }}>{session.platform}</p>
        </div>
        <span className="flex items-center text-xs font-medium shrink-0" style={{ gap: 6, padding: '4px 10px', borderRadius: 9999, background: config.bg, color: config.text }}>
          <span className={isActive ? 'status-dot' : ''} style={{ width: 6, height: 6, borderRadius: '50%', background: config.dot, display: 'block' }} />
          {config.label}
        </span>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div className="flex justify-between text-xs" style={{ marginBottom: 6 }}>
          <span style={{ color: '#64748b' }}>Progress</span>
          <span className="font-semibold text-slate-900">{progress.toFixed(1)}%</span>
        </div>
        <div className="rounded-full overflow-hidden" style={{ height: 6, background: 'rgba(15, 23, 42, 0.05)' }}>
          <div className="h-full rounded-full" style={{ background: session.status === 'completed' ? '#16a34a' : 'linear-gradient(90deg, #2563eb, #3b82f6)', width: `${progress}%`, transition: 'width 0.5s ease' }} />
        </div>
      </div>

      <div className="grid grid-cols-3" style={{ gap: 8, marginBottom: 16 }}>
        {[ { icon: <Zap size={12} style={{ color: '#3b82f6' }} />, label: 'Speed', value: `${Math.round(speed)}ms` }, { icon: <Clock size={12} style={{ color: '#3b82f6' }} />, label: 'Scans', value: scans.toLocaleString() }, { icon: isActive ? <Wifi size={12} style={{ color: '#16a34a' }} /> : <WifiOff size={12} style={{ color: '#64748b' }} />, label: 'Found', value: session.found } ].map(stat => (
          <div key={stat.label} className="text-center" style={{ padding: 8, borderRadius: 8, background: 'rgba(15, 23, 42, 0.03)' }}>
            <div className="flex items-center justify-center" style={{ gap: 4, marginBottom: 2 }}>{stat.icon}<span className="text-xs" style={{ color: '#64748b' }}>{stat.label}</span></div>
            <p className="text-sm font-semibold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="flex" style={{ gap: 8 }}>
        <button
          className="flex-1 flex items-center justify-center text-xs font-medium"
          style={{ gap: 6, padding: '8px 12px', borderRadius: 10, cursor: 'pointer', background: isActive ? 'rgba(245, 158, 11, 0.1)' : 'rgba(34, 197, 94, 0.1)', color: isActive ? '#d97706' : '#16a34a', border: `1px solid ${isActive ? 'rgba(245, 158, 11, 0.15)' : 'rgba(34, 197, 94, 0.15)'}` }}
          onClick={onToggle}
        >
          {isActive ? <><Pause size={12} /> Pause</> : <><Play size={12} /> Resume</>}
        </button>
        <button className="flex items-center justify-center" style={{ width: 36, height: 36, borderRadius: 10, cursor: 'pointer', background: 'rgba(239, 68, 68, 0.1)', color: '#dc2626', border: '1px solid rgba(239, 68, 68, 0.15)' }} onClick={onDelete}>
          <Trash2 size={14} />
        </button>
      </div>
    </motion.div>
  )
}

export default function Sessions() {
  const [sessions, setSessions] = useState(initialSessions)
  const toggleSession = (id) => setSessions(prev => prev.map(s => s.id === id ? { ...s, status: s.status === 'running' ? 'paused' : 'running' } : s))
  const deleteSession = (id) => setSessions(prev => prev.filter(s => s.id !== id))
  const addSession = () => {
    const names = ["Drake – It's All a Blur", 'UFC 310 PPV', 'Wimbledon Finals', 'Super Bowl LXI']
    const plats = ['Ticketmaster', 'StubHub', 'SeatGeek', 'AXS']
    setSessions(prev => [...prev, { id: Date.now(), name: names[Math.floor(Math.random() * names.length)], platform: plats[Math.floor(Math.random() * plats.length)], status: 'running', speed: Math.floor(Math.random() * 60) + 30, progress: 0, scans: 0, found: 0 }])
  }

  const runningCount = sessions.filter(s => s.status === 'running').length
  const totalFound = sessions.reduce((acc, s) => acc + s.found, 0)

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.06 } } }}>
      <motion.div variants={fadeUp} className="flex flex-wrap items-start justify-between" style={{ marginBottom: 32, gap: 16 }}>
        <div><h2 className="text-2xl font-bold text-slate-900" style={{ marginBottom: 4 }}>Session Manager</h2><p className="text-sm" style={{ color: '#64748b' }}>Manage and monitor all active scanning sessions.</p></div>
        <button className="btn-primary" onClick={addSession}><Plus size={16} /> New Session</button>
      </motion.div>
      <motion.div variants={fadeUp} custom={1} className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: 16, marginBottom: 32 }}>
        <div className="glass-card text-center" style={{ padding: 20 }}><p className="text-3xl font-bold text-slate-900">{sessions.length}</p><p className="text-xs" style={{ color: '#64748b', marginTop: 4 }}>Total Sessions</p></div>
        <div className="glass-card text-center" style={{ padding: 20 }}><p className="text-3xl font-bold" style={{ color: '#16a34a' }}>{runningCount}</p><p className="text-xs" style={{ color: '#64748b', marginTop: 4 }}>Active</p></div>
        <div className="glass-card text-center" style={{ padding: 20 }}><p className="text-3xl font-bold gradient-text text-slate-900">{totalFound}</p><p className="text-xs" style={{ color: '#64748b', marginTop: 4 }}>Tickets Found</p></div>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 16 }}>
        {sessions.map(session => <SessionCard key={session.id} session={session} onToggle={() => toggleSession(session.id)} onDelete={() => deleteSession(session.id)} />)}
      </div>
    </motion.div>
  )
}
