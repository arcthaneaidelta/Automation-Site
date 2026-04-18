import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Play, Pause, RotateCcw, AlertCircle, CheckCircle2, Loader2, Radio } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] } }),
}

const platforms = ['Ticketmaster', 'StubHub', 'SeatGeek', 'Vivid Seats', 'AXS']
const sections = ['Floor', 'Lower Bowl', 'Upper Deck', 'VIP Box', 'General Admission', 'Pit']
const events = ['Taylor Swift – Eras Tour @ SoFi Stadium', 'Coldplay – Music of the Spheres @ MetLife', 'NBA Finals Game 7 @ Chase Center', 'Beyoncé – Renaissance Tour @ Wembley', 'Formula 1 – Monaco Grand Prix']

const statusColors = {
  searching: { bg: 'rgba(59, 130, 246, 0.1)', text: '#3b82f6' },
  found: { bg: 'rgba(245, 158, 11, 0.1)', text: '#f59e0b' },
  reserved: { bg: 'rgba(22, 163, 74, 0.1)', text: '#16a34a' },
  expired: { bg: 'rgba(220, 38, 38, 0.1)', text: '#dc2626' },
}

const statusIcons = { searching: Loader2, found: AlertCircle, reserved: CheckCircle2, expired: AlertCircle }

function TicketResult({ ticket }) {
  const status = statusColors[ticket.status]
  const StatusIcon = statusIcons[ticket.status]

  return (
    <motion.div
      className="glass-card" style={{ padding: 20 }}
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between" style={{ marginBottom: 12 }}>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-900">{ticket.section}</p>
          <p className="text-xs" style={{ color: '#64748b', marginTop: 2 }}>{ticket.event}</p>
        </div>
        <span
          className="flex items-center text-xs font-medium shrink-0"
          style={{ gap: 6, padding: '4px 10px', borderRadius: 9999, marginLeft: 12, background: status.bg, color: status.text }}
        >
          <StatusIcon size={12} className={ticket.status === 'searching' ? 'animate-spin' : ''} />
          {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
        </span>
      </div>
      <div className="flex flex-wrap items-center text-xs" style={{ gap: 8, color: '#64748b' }}>
        <span>Row {ticket.row}</span><span>•</span><span>Seats {ticket.seats}</span><span>•</span>
        <span className="font-semibold text-slate-900">${ticket.price}</span>
        <span style={{ marginLeft: 'auto', color: '#475569' }}>{ticket.time}</span>
      </div>
    </motion.div>
  )
}

export default function Monitoring() {
  const [platform, setPlatform] = useState('Ticketmaster')
  const [section, setSection] = useState('Floor')
  const [quantity, setQuantity] = useState(2)
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [results, setResults] = useState([])
  const [scanCount, setScanCount] = useState(0)

  const generateTicket = useCallback(() => {
    const statuses = ['searching', 'found', 'reserved', 'found', 'searching']
    return {
      id: Date.now() + Math.random(),
      section: sections[Math.floor(Math.random() * sections.length)],
      event: events[Math.floor(Math.random() * events.length)],
      row: Math.floor(Math.random() * 30) + 1,
      seats: `${Math.floor(Math.random() * 20) + 1}-${Math.floor(Math.random() * 20) + 21}`,
      price: (Math.floor(Math.random() * 800) + 150).toFixed(0),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      time: 'Just now',
    }
  }, [])

  useEffect(() => {
    if (!isMonitoring) return
    const interval = setInterval(() => {
      setResults(prev => {
        const updated = prev.map(t => {
          if (t.status === 'searching' && Math.random() > 0.6) return { ...t, status: 'found', time: 'Just now' }
          if (t.status === 'found' && Math.random() > 0.7) return { ...t, status: 'reserved', time: 'Just now' }
          return t
        })
        if (Math.random() > 0.4) return [generateTicket(), ...updated].slice(0, 8)
        return updated
      })
      setScanCount(prev => prev + Math.floor(Math.random() * 50) + 10)
    }, 2000)
    return () => clearInterval(interval)
  }, [isMonitoring, generateTicket])

  const handleStart = () => { setIsMonitoring(true); setResults([generateTicket()]); setScanCount(0) }
  const handleStop = () => setIsMonitoring(false)
  const handleReset = () => { setIsMonitoring(false); setResults([]); setScanCount(0) }

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.06 } } }}>
      <motion.div variants={fadeUp} style={{ marginBottom: 32 }}>
        <h2 className="text-2xl font-bold text-slate-900" style={{ marginBottom: 4 }}>Monitoring Panel</h2>
        <p className="text-sm" style={{ color: '#64748b' }}>Configure and start real-time ticket monitoring.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: 24 }}>
        <motion.div variants={fadeUp} custom={1} className="glass-card" style={{ padding: 24 }}>
          <h3 className="text-base font-semibold text-slate-900" style={{ marginBottom: 24 }}>Configuration</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label className="block text-xs font-medium" style={{ color: '#475569', marginBottom: 8 }}>Platform</label>
              <select className="input-field" value={platform} onChange={e => setPlatform(e.target.value)}>
                {platforms.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium" style={{ color: '#475569', marginBottom: 8 }}>Target Section</label>
              <select className="input-field" value={section} onChange={e => setSection(e.target.value)}>
                {sections.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium" style={{ color: '#475569', marginBottom: 8 }}>Quantity</label>
              <div className="flex items-center" style={{ gap: 12 }}>
                <button className="flex items-center justify-center text-slate-900 font-medium" style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(15, 23, 42, 0.05)', border: '1px solid rgba(15, 23, 42, 0.1)', cursor: 'pointer' }} onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <span className="text-lg font-semibold text-slate-900" style={{ width: 32, textAlign: 'center' }}>{quantity}</span>
                <button className="flex items-center justify-center text-slate-900 font-medium" style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(15, 23, 42, 0.05)', border: '1px solid rgba(15, 23, 42, 0.1)', cursor: 'pointer' }} onClick={() => setQuantity(Math.min(10, quantity + 1))}>+</button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium" style={{ color: '#475569', marginBottom: 8 }}>Max Price</label>
              <input className="input-field" type="text" placeholder="$500" />
            </div>
            <div>
              <label className="block text-xs font-medium" style={{ color: '#475569', marginBottom: 8 }}>Preferences</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['Aisle seats preferred', 'Even rows only', 'Adjacent seats'].map(pref => (
                  <label key={pref} className="flex items-center cursor-pointer" style={{ gap: 8 }}>
                    <input type="checkbox" style={{ width: 16, height: 16, accentColor: '#2563eb' }} defaultChecked={pref.includes('Adjacent')} />
                    <span className="text-sm" style={{ color: '#64748b' }}>{pref}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex" style={{ gap: 12, marginTop: 32 }}>
            {!isMonitoring ? (
              <button className="btn-primary flex-1" onClick={handleStart}><Play size={16} /> Start Monitoring</button>
            ) : (
              <button className="flex-1 flex items-center justify-center text-sm font-medium" style={{ gap: 8, padding: '12px 16px', borderRadius: 12, cursor: 'pointer', background: 'rgba(220, 38, 38, 0.1)', color: '#dc2626', border: '1px solid rgba(220, 38, 38, 0.2)' }} onClick={handleStop}><Pause size={16} /> Stop</button>
            )}
            <button className="flex items-center justify-center" style={{ width: 44, height: 44, borderRadius: 12, cursor: 'pointer', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', border: '1px solid rgba(59, 130, 246, 0.15)' }} onClick={handleReset}><RotateCcw size={16} /></button>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} custom={2} className="lg:col-span-2" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="glass-card flex flex-wrap items-center justify-between" style={{ padding: 16, gap: 12 }}>
            <div className="flex items-center" style={{ gap: 12 }}>
              {isMonitoring && (
                <div className="flex items-center" style={{ gap: 8 }}><Radio size={16} style={{ color: '#dc2626' }} className="animate-pulse" /><span className="text-sm font-medium" style={{ color: '#dc2626' }}>LIVE</span></div>
              )}
              <span className="text-sm" style={{ color: '#64748b' }}>{isMonitoring ? `Scanning ${platform} • ${section} • ${quantity} tickets` : 'Monitoring paused'}</span>
            </div>
            <div className="flex items-center text-xs" style={{ gap: 24, color: '#64748b' }}>
              <span>Scans: <span className="text-slate-900 font-medium">{scanCount.toLocaleString()}</span></span>
              <span>Results: <span className="text-slate-900 font-medium">{results.length}</span></span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <AnimatePresence>
              {results.length === 0 ? (
                <motion.div className="glass-card flex flex-col items-center justify-center text-center" style={{ padding: '64px 24px' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Search size={40} style={{ color: '#cbd5e1', marginBottom: 16 }} />
                  <p className="text-sm font-medium text-slate-900" style={{ marginBottom: 4 }}>Ready to Monitor</p>
                  <p className="text-xs" style={{ color: '#64748b' }}>Configure your preferences and start scanning.</p>
                </motion.div>
              ) : (
                results.map(ticket => <TicketResult key={ticket.id} ticket={ticket} />)
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
