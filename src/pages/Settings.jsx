import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, Shield, Zap, Globe, Moon, Smartphone, Mail, Lock, Eye, EyeOff, Save, RotateCcw } from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] } }) }

function Toggle({ enabled, onToggle }) {
  return (
    <button
      className="relative shrink-0"
      style={{ width: 44, height: 24, borderRadius: 12, cursor: 'pointer', border: 'none', background: enabled ? '#2563eb' : '#cbd5e1', transition: 'background 0.15s ease' }}
      onClick={onToggle}
    >
      <div style={{ position: 'absolute', top: 4, left: enabled ? 24 : 4, width: 16, height: 16, borderRadius: '50%', background: 'white', transition: 'left 0.15s ease', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }} />
    </button>
  )
}

function SettingRow({ icon: Icon, title, description, children }) {
  return (
    <div className="flex items-center justify-between border-b last:border-0" style={{ padding: '16px 0', borderColor: 'rgba(15, 23, 42, 0.08)', gap: 16 }}>
      <div className="flex items-center" style={{ gap: 16 }}>
        <div className="flex items-center justify-center shrink-0" style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(59, 130, 246, 0.08)' }}><Icon size={16} style={{ color: '#3b82f6' }} /></div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-900">{title}</p>
          <p className="text-xs" style={{ color: '#64748b', marginTop: 2 }}>{description}</p>
        </div>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  )
}

export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: true, emailAlerts: true, pushAlerts: false, darkMode: false, autoCheckout: true, proxyRotation: true,
    twoFactor: false, antiDetect: true, speedMode: 'balanced', maxSessions: 10, retryAttempts: 3, showPassword: false, saved: false,
  })

  const toggle = (key) => setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  const handleSave = () => { setSettings(prev => ({ ...prev, saved: true })); setTimeout(() => setSettings(prev => ({ ...prev, saved: false })), 2000) }

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.06 } } }}>
      <motion.div variants={fadeUp} className="flex flex-wrap items-start justify-between" style={{ marginBottom: 32, gap: 16 }}>
        <div><h2 className="text-2xl font-bold text-slate-900" style={{ marginBottom: 4 }}>Settings</h2><p className="text-sm" style={{ color: '#64748b' }}>Manage your account and application preferences.</p></div>
        <div className="flex items-center" style={{ gap: 12 }}>
          <button className="btn-secondary"><RotateCcw size={14} /> Reset</button>
          <button className="btn-primary" onClick={handleSave}><Save size={14} /> {settings.saved ? 'Saved ✓' : 'Save Changes'}</button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: 24 }}>
        <div className="lg:col-span-2" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <motion.div variants={fadeUp} custom={1} className="glass-card" style={{ padding: 24 }}>
            <h3 className="text-base font-semibold text-slate-900" style={{ marginBottom: 8 }}>Notifications</h3>
            <p className="text-xs" style={{ color: '#64748b', marginBottom: 16 }}>Configure how you receive alerts and updates.</p>
            <SettingRow icon={Bell} title="Push Notifications" description="Receive push alerts for ticket availability"><Toggle enabled={settings.notifications} onToggle={() => toggle('notifications')} /></SettingRow>
            <SettingRow icon={Mail} title="Email Alerts" description="Get email summaries of monitoring activity"><Toggle enabled={settings.emailAlerts} onToggle={() => toggle('emailAlerts')} /></SettingRow>
            <SettingRow icon={Smartphone} title="Mobile Push" description="Send alerts to your mobile device"><Toggle enabled={settings.pushAlerts} onToggle={() => toggle('pushAlerts')} /></SettingRow>
          </motion.div>

          <motion.div variants={fadeUp} custom={2} className="glass-card" style={{ padding: 24 }}>
            <h3 className="text-base font-semibold text-slate-900" style={{ marginBottom: 8 }}>Automation</h3>
            <p className="text-xs" style={{ color: '#64748b', marginBottom: 16 }}>Configure checkout and monitoring behavior.</p>
            <SettingRow icon={Zap} title="Auto-Checkout" description="Automatically proceed to checkout when tickets are found"><Toggle enabled={settings.autoCheckout} onToggle={() => toggle('autoCheckout')} /></SettingRow>
            <SettingRow icon={Globe} title="Proxy Rotation" description="Automatically rotate proxies to avoid detection"><Toggle enabled={settings.proxyRotation} onToggle={() => toggle('proxyRotation')} /></SettingRow>
            <SettingRow icon={Shield} title="Anti-Detection Mode" description="Use browser fingerprint randomization"><Toggle enabled={settings.antiDetect} onToggle={() => toggle('antiDetect')} /></SettingRow>
            
            <div style={{ marginTop: 16, paddingTop: 16 }}>
              <label className="block text-xs font-medium" style={{ color: '#475569', marginBottom: 8 }}>Speed Mode</label>
              <div className="flex items-center rounded-lg overflow-hidden glass-card" style={{ padding: 4 }}>
                {['conservative', 'balanced', 'aggressive'].map(mode => (
                  <button key={mode} className="flex-1 text-xs font-medium capitalize" style={{ padding: '10px 16px', borderRadius: 8, cursor: 'pointer', border: 'none', color: settings.speedMode === mode ? '#0f172a' : '#64748b', background: settings.speedMode === mode ? 'rgba(15, 23, 42, 0.05)' : 'transparent', transition: 'background 0.15s ease' }} onClick={() => setSettings(prev => ({ ...prev, speedMode: mode }))}>{mode}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 16, marginTop: 16 }}>
              <div><label className="block text-xs font-medium" style={{ color: '#475569', marginBottom: 8 }}>Max Concurrent Sessions</label><input className="input-field" type="number" value={settings.maxSessions} onChange={e => setSettings(prev => ({ ...prev, maxSessions: parseInt(e.target.value) || 1 }))} min={1} max={50} /></div>
              <div><label className="block text-xs font-medium" style={{ color: '#475569', marginBottom: 8 }}>Retry Attempts</label><input className="input-field" type="number" value={settings.retryAttempts} onChange={e => setSettings(prev => ({ ...prev, retryAttempts: parseInt(e.target.value) || 1 }))} min={1} max={10} /></div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} custom={3} className="glass-card" style={{ padding: 24 }}>
            <h3 className="text-base font-semibold text-slate-900" style={{ marginBottom: 8 }}>Security</h3>
            <p className="text-xs" style={{ color: '#64748b', marginBottom: 16 }}>Manage your security preferences.</p>
            <SettingRow icon={Lock} title="Two-Factor Authentication" description="Add an extra layer of security to your account"><Toggle enabled={settings.twoFactor} onToggle={() => toggle('twoFactor')} /></SettingRow>
            <div style={{ marginTop: 16, paddingTop: 16 }}>
              <label className="block text-xs font-medium" style={{ color: '#475569', marginBottom: 8 }}>API Key</label>
              <div className="flex items-center" style={{ gap: 8 }}>
                <input className="input-field flex-1" type={settings.showPassword ? 'text' : 'password'} defaultValue="vtx_sk_live_4eC39HqLyjWDarjtT1zdp7dc" readOnly />
                <button className="flex items-center justify-center shrink-0" style={{ width: 44, height: 44, borderRadius: 12, cursor: 'pointer', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', border: 'none' }} onClick={() => toggle('showPassword')}>{settings.showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} custom={4} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div className="glass-card" style={{ padding: 24 }}>
            <h3 className="text-base font-semibold text-slate-900" style={{ marginBottom: 16 }}>Appearance</h3>
            <SettingRow icon={Moon} title="Dark Mode" description="Use dark theme"><Toggle enabled={settings.darkMode} onToggle={() => toggle('darkMode')} /></SettingRow>
          </div>
          <div className="glass-card" style={{ padding: 24 }}>
            <h3 className="text-base font-semibold text-slate-900" style={{ marginBottom: 16 }}>Current Plan</h3>
            <div style={{ padding: 16, borderRadius: 12, marginBottom: 16, background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.05))', border: '1px solid rgba(59, 130, 246, 0.15)' }}>
              <p className="text-lg font-bold text-blue-600" style={{ marginBottom: 4 }}>Enterprise</p>
              <p className="text-xs" style={{ color: '#64748b' }}>Unlimited sessions & priority support</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }} className="text-xs">
              {[ ['Sessions used', '12 / Unlimited'], ['API calls today', '2,847'], ['Renewal date', 'May 15, 2026'] ].map(([label, value]) => (
                <div key={label} className="flex justify-between" style={{ color: '#64748b' }}><span>{label}</span><span className="text-slate-900 font-medium">{value}</span></div>
              ))}
            </div>
          </div>
          <div className="glass-card" style={{ padding: 24 }}>
            <h3 className="text-base font-semibold text-slate-900" style={{ marginBottom: 16 }}>Support</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button className="btn-secondary w-full" style={{ padding: '10px 16px', fontSize: 13 }}>Contact Support</button>
              <button className="btn-secondary w-full" style={{ padding: '10px 16px', fontSize: 13 }}>View Documentation</button>
              <button className="btn-secondary w-full" style={{ padding: '10px 16px', fontSize: 13 }}>Report a Bug</button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
