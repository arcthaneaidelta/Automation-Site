import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LayoutDashboard, Search, ShoppingCart, Users, BarChart3, Settings, Zap, ChevronRight, Bell, LogOut } from 'lucide-react'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/monitoring', icon: Search, label: 'Monitoring' },
  { to: '/checkout', icon: ShoppingCart, label: 'Checkout' },
  { to: '/sessions', icon: Users, label: 'Sessions' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export default function Layout() {
  const location = useLocation()
  const currentPage = navItems.find(item => item.to === location.pathname)

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#f8fafc' }}>
      <aside
        className="hidden lg:flex w-64 flex-col shrink-0 border-r"
        style={{ background: 'rgba(255, 255, 255, 0.8)', borderColor: 'rgba(15, 23, 42, 0.08)' }}
      >
        <div className="flex items-center gap-3" style={{ padding: '24px 24px 16px' }}>
          <div className="flex items-center justify-center shrink-0" style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #2563eb, #3b82f6)' }}>
            <Zap size={18} color="white" />
          </div>
          <span className="text-lg font-bold text-slate-900 tracking-tight">VelocityTix</span>
        </div>

        <nav className="flex-1 overflow-y-auto" style={{ padding: '8px 12px' }}>
          {navItems.map(item => {
            const Icon = item.icon
            const isActive = location.pathname === item.to
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className="relative flex items-center gap-3 rounded-lg text-sm font-medium"
                style={{
                  padding: '10px 12px', marginBottom: 4,
                  color: isActive ? '#0f172a' : '#64748b',
                  background: isActive ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                  transition: 'background 0.15s ease, color 0.15s ease',
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.15)' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <Icon size={18} className="relative z-10 shrink-0" style={{ color: isActive ? '#3b82f6' : undefined }} />
                <span className="relative z-10">{item.label}</span>
                {isActive && <ChevronRight size={14} className="ml-auto relative z-10 shrink-0" style={{ color: '#3b82f6' }} />}
              </NavLink>
            )
          })}
        </nav>

        <div className="border-t" style={{ padding: 16, borderColor: 'rgba(15, 23, 42, 0.08)' }}>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center shrink-0 text-xs font-semibold text-white" style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #2563eb, #3b82f6)' }}>
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">John Doe</p>
              <p className="text-xs truncate" style={{ color: '#64748b' }}>Enterprise Plan</p>
            </div>
            <button className="shrink-0 flex items-center justify-center" style={{ width: 32, height: 32, borderRadius: 8, color: '#64748b', background: 'transparent', border: 'none', cursor: 'pointer' }}>
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header
          className="flex items-center justify-between shrink-0 border-b"
          style={{ height: 64, padding: '0 32px', background: 'rgba(255, 255, 255, 0.6)', borderColor: 'rgba(15, 23, 42, 0.08)', backdropFilter: 'blur(12px)' }}
        >
          <h1 className="text-lg font-semibold text-slate-900">{currentPage?.label || 'Dashboard'}</h1>
          <div className="flex items-center" style={{ gap: 16 }}>
            <div className="flex items-center text-xs font-medium" style={{ gap: 8, padding: '6px 12px', borderRadius: 9999, background: 'rgba(34, 197, 94, 0.1)', color: '#16a34a' }}>
              <span className="status-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#16a34a', display: 'block' }} />
              System Online
            </div>
            <button className="relative flex items-center justify-center" style={{ width: 36, height: 36, borderRadius: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b' }}>
              <Bell size={18} />
              <span style={{ position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: '50%', background: '#3b82f6' }} />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto grid-pattern" style={{ padding: 32 }}>
          <div style={{ maxWidth: 1280, marginLeft: 'auto', marginRight: 'auto' }}>
            <motion.div key={location.pathname} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}>
              <Outlet />
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}
