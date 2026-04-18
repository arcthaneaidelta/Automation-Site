import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const loadingSteps = [
  'Initializing Monitoring Engine…',
  'Calibrating Detection Algorithms…',
  'Optimizing Checkout Routes…',
  'Establishing Secure Connections…',
  'System Ready.',
]

export default function LoadingScreen() {
  const [step, setStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setStep(prev => (prev < loadingSteps.length - 1 ? prev + 1 : prev))
    }, 600)

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100
        return Math.min(prev + Math.random() * 8 + 2, 100)
      })
    }, 80)

    return () => {
      clearInterval(stepInterval)
      clearInterval(progressInterval)
    }
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: '#f8fafc' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div
        className="absolute pointer-events-none"
        style={{
          width: 480, height: 480, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center w-full" style={{ maxWidth: 320, padding: 24 }}>
        <motion.div
          className="flex items-center"
          style={{ gap: 12, marginBottom: 48 }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
            <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#logo-grad-ls)" />
            <path d="M16 24L22 30L32 18" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
              <linearGradient id="logo-grad-ls" x1="4" y1="4" x2="44" y2="44">
                <stop stopColor="#3b82f6" />
                <stop offset="1" stopColor="#2563eb" />
              </linearGradient>
            </defs>
          </svg>
          <span className="text-2xl font-bold tracking-tight text-slate-900">VelocityTix</span>
        </motion.div>

        <motion.div className="w-full" style={{ marginBottom: 32 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className="w-full rounded-full overflow-hidden" style={{ height: 4, background: 'rgba(59, 130, 246, 0.15)' }}>
            <div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #2563eb, #3b82f6, #60a5fa)', width: `${progress}%`, transition: 'width 0.1s linear' }}
            />
          </div>
        </motion.div>

        <div style={{ height: 24 }} className="flex items-center justify-center w-full">
          <AnimatePresence mode="wait">
            <motion.p
              key={step}
              className="text-sm font-medium tracking-wide text-center"
              style={{ color: '#64748b' }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {loadingSteps[step]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
