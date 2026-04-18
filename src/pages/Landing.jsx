import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, Shield, Clock, BarChart3, ArrowRight, ChevronDown } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] } }),
}

function useInView(ref, threshold = 0.15) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref, threshold])
  return inView
}

function Section({ children, className = '', id }) {
  const ref = useRef(null)
  const inView = useInView(ref)
  return (
    <motion.section ref={ref} id={id} className={className} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}>
      {children}
    </motion.section>
  )
}

const features = [
  { icon: Zap, title: 'Lightning Fast', desc: 'Sub-100ms detection and checkout speeds powered by our proprietary engine.' },
  { icon: Shield, title: 'Enterprise Security', desc: 'Bank-grade encryption with SOC 2 compliance and zero-trust architecture.' },
  { icon: Clock, title: '24/7 Monitoring', desc: 'Continuous scanning across all major platforms with intelligent alerts.' },
  { icon: BarChart3, title: 'Deep Analytics', desc: 'Real-time insights, success metrics, and performance benchmarking.' },
]

const steps = [
  { num: '01', title: 'Configure', desc: 'Set your target event, sections, and quantity preferences.' },
  { num: '02', title: 'Monitor', desc: 'Our engine continuously scans for availability across platforms.' },
  { num: '03', title: 'Detect', desc: 'Instant notification when matching tickets become available.' },
  { num: '04', title: 'Checkout', desc: 'Automated fast-checkout secures your tickets in milliseconds.' },
]

const metrics = [
  { value: '99.7%', label: 'Success Rate' },
  { value: '<80ms', label: 'Avg Response' },
  { value: '10M+', label: 'Tickets Secured' },
  { value: '24/7', label: 'Uptime' },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen" style={{ background: '#f8fafc' }}>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
        style={{ height: 64, padding: '0 32px', background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(15, 23, 42, 0.08)' }}
      >
        <div className="flex items-center" style={{ gap: 12 }}>
          <div className="flex items-center justify-center shrink-0" style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #2563eb, #3b82f6)' }}>
            <Zap size={16} color="white" />
          </div>
          <span className="text-base font-bold text-slate-900 tracking-tight">VelocityTix</span>
        </div>
        <div className="hidden md:flex items-center" style={{ gap: 32 }}>
          <a href="#features" className="text-sm font-medium" style={{ color: '#64748b', transition: 'color 0.15s' }}>Features</a>
          <a href="#how-it-works" className="text-sm font-medium" style={{ color: '#64748b', transition: 'color 0.15s' }}>How it Works</a>
          <a href="#metrics" className="text-sm font-medium" style={{ color: '#64748b', transition: 'color 0.15s' }}>Performance</a>
          <button className="btn-primary text-sm" onClick={() => navigate('/dashboard')}>
            Launch App <ArrowRight size={14} />
          </button>
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center text-center" style={{ paddingTop: 160, paddingBottom: 120, paddingLeft: 24, paddingRight: 24 }}>
        <motion.div
          className="inline-flex items-center rounded-full text-xs font-medium"
          style={{ gap: 8, padding: '6px 16px', marginBottom: 32, background: 'rgba(59, 130, 246, 0.1)', color: '#2563eb', border: '1px solid rgba(59, 130, 246, 0.15)' }}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="status-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#3b82f6', display: 'block' }} />
          Now Processing 50K+ Events
        </motion.div>

        <motion.h1
          className="font-extrabold leading-tight text-slate-900"
          style={{ fontSize: 'clamp(36px, 5vw, 64px)', marginBottom: 24, maxWidth: 800 }}
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span>Real-Time Ticket</span><br />
          <span className="gradient-text">Automation. Zero Delay.</span>
        </motion.h1>

        <motion.p
          className="leading-relaxed"
          style={{ fontSize: 'clamp(16px, 1.8vw, 18px)', maxWidth: 560, marginBottom: 48, color: '#475569' }}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
        >
          Enterprise-grade monitoring and checkout automation that secures tickets
          the moment they become available. Built for speed. Designed for scale.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center" style={{ gap: 16 }}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }}
        >
          <button className="btn-primary" style={{ padding: '14px 32px', fontSize: 16 }} onClick={() => navigate('/dashboard')}>
            Get Started <ArrowRight size={16} />
          </button>
          <button className="btn-secondary" style={{ padding: '14px 32px', fontSize: 16 }} onClick={() => navigate('/monitoring')}>
            See Demo
          </button>
        </motion.div>

        <motion.div
          className="flex flex-col items-center" style={{ marginTop: 64, gap: 8 }}
          animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-xs font-medium" style={{ color: '#64748b' }}>Scroll</span>
          <ChevronDown size={16} style={{ color: '#64748b' }} />
        </motion.div>
      </div>

      <Section id="features" className="page-container section-spacing">
        <motion.div variants={fadeUp} style={{ marginBottom: 64, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: '#3b82f6', marginBottom: 12 }}>Features</p>
          <h2 className="text-4xl font-bold text-slate-900" style={{ marginBottom: 16 }}>Everything You Need</h2>
          <p className="text-base" style={{ color: '#475569', maxWidth: 480 }}>
            A complete platform for ticket acquisition, from monitoring to secure checkout.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <motion.div key={f.title} variants={fadeUp} custom={i} className="glass-card glass-card-hover" style={{ padding: 32 }}>
              <div className="flex items-center justify-center" style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(59, 130, 246, 0.1)', marginBottom: 24 }}>
                <f.icon size={22} style={{ color: '#3b82f6' }} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900" style={{ marginBottom: 8 }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="how-it-works" className="page-container section-spacing">
        <motion.div variants={fadeUp} style={{ marginBottom: 64, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: '#3b82f6', marginBottom: 12 }}>How It Works</p>
          <h2 className="text-4xl font-bold text-slate-900">Four Simple Steps</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <motion.div key={s.num} variants={fadeUp} custom={i} className="text-center">
              <div className="text-5xl font-black" style={{ color: 'rgba(59, 130, 246, 0.15)', marginBottom: 16 }}>{s.num}</div>
              <h3 className="text-base font-semibold text-slate-900" style={{ marginBottom: 8 }}>{s.title}</h3>
              <p className="text-sm" style={{ color: '#475569' }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="metrics" className="page-container section-spacing">
        <motion.div variants={fadeUp} style={{ marginBottom: 64, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: '#3b82f6', marginBottom: 12 }}>Performance</p>
          <h2 className="text-4xl font-bold text-slate-900">Built for Speed</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((m, i) => (
            <motion.div key={m.label} variants={fadeUp} custom={i} className="glass-card text-center" style={{ padding: 32 }}>
              <div className="text-4xl font-extrabold gradient-text" style={{ marginBottom: 8 }}>{m.value}</div>
              <p className="text-sm font-medium" style={{ color: '#475569' }}>{m.label}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="page-container" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h2 className="text-5xl font-bold text-slate-900" style={{ marginBottom: 24 }}>Ready to Automate?</h2>
          <p className="text-lg" style={{ color: '#475569', maxWidth: 480, marginBottom: 48 }}>
            Join thousands of professionals who never miss a ticket again.
          </p>
          <button className="btn-primary" style={{ padding: '16px 40px', fontSize: 16 }} onClick={() => navigate('/dashboard')}>
            Launch Dashboard <ArrowRight size={16} />
          </button>
        </motion.div>
      </Section>

      <footer className="border-t" style={{ borderColor: 'rgba(15, 23, 42, 0.08)' }}>
        <div className="page-container flex items-center justify-between" style={{ padding: '48px 24px' }}>
          <div className="flex items-center" style={{ gap: 12 }}>
            <div className="flex items-center justify-center" style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg, #2563eb, #3b82f6)' }}>
              <Zap size={14} color="white" />
            </div>
            <span className="text-sm font-semibold text-slate-900">VelocityTix</span>
          </div>
          <p className="text-xs" style={{ color: '#64748b' }}>© 2026 VelocityTix. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
