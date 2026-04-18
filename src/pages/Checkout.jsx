import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Ticket, MapPin, CreditCard, CheckCircle, ArrowRight, ArrowLeft, Lock, Shield, Loader2 } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] } }),
}

const stepLabels = ['Select Ticket', 'Confirm Seats', 'Payment', 'Complete']
const stepIcons = [Ticket, MapPin, CreditCard, CheckCircle]

const ticketOptions = [
  { id: 1, event: 'Taylor Swift – Eras Tour', venue: 'SoFi Stadium, Los Angeles', date: 'Aug 15, 2026', section: 'Floor A', row: '12', seats: '15-16', price: 485 },
  { id: 2, event: 'Coldplay – World Tour', venue: 'MetLife Stadium, NJ', date: 'Sep 3, 2026', section: 'Lower Bowl 108', row: '5', seats: '8-9', price: 320 },
  { id: 3, event: 'NBA Finals Game 7', venue: 'Chase Center, SF', date: 'Jun 22, 2026', section: 'Courtside', row: '1', seats: '3-4', price: 2450 },
  { id: 4, event: 'Beyoncé – Renaissance', venue: 'Wembley Stadium, London', date: 'Jul 18, 2026', section: 'VIP Box', row: 'A', seats: '1-4', price: 1200 },
]

function StepIndicator({ currentStep }) {
  return (
    <div className="flex items-center justify-center" style={{ marginBottom: 48, gap: 0 }}>
      {stepLabels.map((label, i) => {
        const Icon = stepIcons[i]
        const isActive = i === currentStep
        const isDone = i < currentStep
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center" style={{ minWidth: 80 }}>
              <div
                className="flex items-center justify-center"
                style={{
                  width: 40, height: 40, borderRadius: 12, marginBottom: 8,
                  background: isDone ? 'rgba(34, 197, 94, 0.15)' : isActive ? 'rgba(59, 130, 246, 0.15)' : 'rgba(15, 23, 42, 0.05)',
                  border: `1px solid ${isDone ? 'rgba(34, 197, 94, 0.2)' : isActive ? 'rgba(59, 130, 246, 0.2)' : 'rgba(15, 23, 42, 0.08)'}`,
                }}
              >
                {isDone ? <CheckCircle size={18} style={{ color: '#16a34a' }} /> : <Icon size={18} style={{ color: isActive ? '#3b82f6' : '#64748b' }} />}
              </div>
              <span className="text-xs font-medium" style={{ color: isActive ? '#3b82f6' : isDone ? '#16a34a' : '#64748b' }}>{label}</span>
            </div>
            {i < stepLabels.length - 1 && <div style={{ width: 48, height: 1, marginBottom: 24, marginLeft: 4, marginRight: 4, background: isDone ? 'rgba(34, 197, 94, 0.3)' : 'rgba(15, 23, 42, 0.08)' }} />}
          </div>
        )
      })}
    </div>
  )
}

function Step1({ onSelect }) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
      <h3 className="text-lg font-semibold text-slate-900" style={{ marginBottom: 4 }}>Select Your Ticket</h3>
      <p className="text-sm" style={{ color: '#64748b', marginBottom: 24 }}>Choose from available tickets found by the monitoring engine.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {ticketOptions.map(ticket => (
          <div key={ticket.id} className="glass-card glass-card-hover cursor-pointer" style={{ padding: 20 }} onClick={() => onSelect(ticket)}>
            <div className="flex items-start justify-between" style={{ gap: 16 }}>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-900">{ticket.event}</p>
                <p className="text-xs" style={{ color: '#64748b', marginTop: 4 }}>{ticket.venue}</p>
                <div className="flex flex-wrap items-center text-xs" style={{ gap: 8, marginTop: 12, color: '#475569' }}>
                  <span>{ticket.date}</span><span>•</span><span>{ticket.section}</span><span>•</span><span>Row {ticket.row}, Seats {ticket.seats}</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xl font-bold text-slate-900">${ticket.price}</p>
                <p className="text-xs" style={{ color: '#64748b' }}>per ticket</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

// Implement Step2, Step3, Step4 and default export 
// maintaining same structure but with light colors.

function Step2({ ticket, onNext, onBack }) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
      <h3 className="text-lg font-semibold text-slate-900" style={{ marginBottom: 4 }}>Confirm Your Seats</h3>
      <p className="text-sm" style={{ color: '#64748b', marginBottom: 24 }}>Verify your selection before proceeding to payment.</p>

      <div className="glass-card" style={{ padding: 24, marginBottom: 24 }}>
        <div className="flex items-start justify-between" style={{ marginBottom: 24, gap: 12 }}>
          <div>
            <p className="text-base font-semibold text-slate-900">{ticket.event}</p>
            <p className="text-sm" style={{ color: '#64748b', marginTop: 4 }}>{ticket.venue}</p>
          </div>
          <span className="flex items-center text-xs font-medium shrink-0" style={{ gap: 6, padding: '4px 10px', borderRadius: 9999, background: 'rgba(34, 197, 94, 0.1)', color: '#16a34a' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#16a34a', display: 'block' }} /> Reserved
          </span>
        </div>

        <div className="grid grid-cols-2" style={{ gap: 12 }}>
          {[{ label: 'Date', value: ticket.date }, { label: 'Section', value: ticket.section }, { label: 'Row', value: ticket.row }, { label: 'Seats', value: ticket.seats }].map(item => (
            <div key={item.label} style={{ padding: 12, borderRadius: 12, background: 'rgba(15, 23, 42, 0.03)' }}>
              <p className="text-xs" style={{ color: '#64748b', marginBottom: 4 }}>{item.label}</p>
              <p className="text-sm font-semibold text-slate-900">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center border-t" style={{ marginTop: 24, paddingTop: 16, borderColor: 'rgba(15, 23, 42, 0.08)' }}>
          <div>
            <p className="text-xs" style={{ color: '#64748b' }}>Total (2 tickets)</p>
            <p className="text-2xl font-bold text-slate-900">${(ticket.price * 2).toLocaleString()}</p>
          </div>
          <div className="flex items-center text-xs" style={{ gap: 8, color: '#64748b' }}>
            <Lock size={12} /><span>Price locked for 5:00</span>
          </div>
        </div>
      </div>

      <div className="flex" style={{ gap: 12 }}>
        <button className="btn-secondary" onClick={onBack}><ArrowLeft size={16} /> Back</button>
        <button className="btn-primary flex-1" onClick={onNext}>Proceed to Payment <ArrowRight size={16} /></button>
      </div>
    </motion.div>
  )
}

function Step3({ ticket, onNext, onBack }) {
  const [processing, setProcessing] = useState(false)
  const handlePay = () => { setProcessing(true); setTimeout(() => onNext(), 2500) }

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
      <h3 className="text-lg font-semibold text-slate-900" style={{ marginBottom: 4 }}>Payment</h3>
      <p className="text-sm" style={{ color: '#64748b', marginBottom: 24 }}>Complete your purchase securely.</p>

      <div className="glass-card" style={{ padding: 24, marginBottom: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <label className="block text-xs font-medium" style={{ color: '#475569', marginBottom: 8 }}>Cardholder Name</label>
            <input className="input-field" type="text" defaultValue="John Doe" />
          </div>
          ...
          <div>
            <label className="block text-xs font-medium" style={{ color: '#475569', marginBottom: 8 }}>Card Number</label>
            <input className="input-field" type="text" defaultValue="•••• •••• •••• 4242" />
          </div>
          <div className="grid grid-cols-2" style={{ gap: 16 }}>
            <div>
              <label className="block text-xs font-medium" style={{ color: '#475569', marginBottom: 8 }}>Expiry</label>
              <input className="input-field" type="text" defaultValue="12/28" />
            </div>
            <div>
              <label className="block text-xs font-medium" style={{ color: '#475569', marginBottom: 8 }}>CVC</label>
              <input className="input-field" type="text" defaultValue="•••" />
            </div>
          </div>
        </div>

        <div className="border-t" style={{ marginTop: 24, paddingTop: 16, borderColor: 'rgba(15, 23, 42, 0.08)' }}>
          <div className="flex justify-between text-sm" style={{ marginBottom: 8 }}>
            <span style={{ color: '#64748b' }}>Subtotal (2 tickets)</span><span className="text-slate-900">${(ticket.price * 2).toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm" style={{ marginBottom: 12 }}>
            <span style={{ color: '#64748b' }}>Service Fee</span><span className="text-slate-900">$24.99</span>
          </div>
          <div className="flex justify-between text-base font-bold border-t" style={{ paddingTop: 12, borderColor: 'rgba(15, 23, 42, 0.08)' }}>
            <span className="text-slate-900">Total</span><span className="gradient-text text-xl">${(ticket.price * 2 + 24.99).toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center text-xs" style={{ gap: 8, color: '#64748b', marginBottom: 24 }}>
        <Shield size={14} style={{ color: '#3b82f6' }} /><span>Protected by 256-bit SSL encryption</span>
      </div>

      <div className="flex" style={{ gap: 12 }}>
        <button className="btn-secondary" onClick={onBack} disabled={processing}><ArrowLeft size={16} /> Back</button>
        <button className="btn-primary flex-1" onClick={handlePay} disabled={processing} style={processing ? { opacity: 0.7 } : {}}>
          {processing ? <><Loader2 size={16} className="animate-spin" /> Processing…</> : <><Lock size={16} /> Pay ${(ticket.price * 2 + 24.99).toLocaleString()}</>}
        </button>
      </div>
    </motion.div>
  )
}

function Step4({ ticket }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="flex flex-col items-center text-center" style={{ padding: '32px 0' }}>
      <motion.div className="flex items-center justify-center" style={{ width: 80, height: 80, borderRadius: '50%', marginBottom: 24, background: 'rgba(34, 197, 94, 0.1)', border: '2px solid rgba(34, 197, 94, 0.2)' }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.4, delay: 0.15, type: 'spring', stiffness: 200 }}>
        <CheckCircle size={36} style={{ color: '#16a34a' }} />
      </motion.div>
      <h3 className="text-2xl font-bold text-slate-900" style={{ marginBottom: 8 }}>Tickets Secured!</h3>
      <p className="text-sm" style={{ color: '#64748b', maxWidth: 360, marginBottom: 32 }}>Your tickets have been confirmed and a receipt has been sent to your email.</p>
      
      <div className="glass-card text-left w-full" style={{ padding: 24, maxWidth: 400 }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 16, gap: 12 }}>
          <p className="text-sm font-semibold text-slate-900">{ticket.event}</p>
          <span className="text-xs font-medium shrink-0" style={{ padding: '4px 10px', borderRadius: 9999, background: 'rgba(34, 197, 94, 0.1)', color: '#16a34a' }}>Confirmed</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }} className="text-xs">
          {[ ['Order ID', `VTX-${Math.floor(Math.random() * 9000 + 1000)}`], ['Venue', ticket.venue], ['Section / Row', `${ticket.section} / Row ${ticket.row}`], ['Seats', ticket.seats] ].map(([label, value]) => (
            <div key={label} className="flex justify-between" style={{ color: '#64748b' }}>
              <span>{label}</span><span className="text-slate-900 font-medium">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Checkout() {
  const [step, setStep] = useState(0)
  const [selectedTicket, setSelectedTicket] = useState(null)

  const handleSelect = (ticket) => { setSelectedTicket(ticket); setStep(1) }

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.06 } } }}>
      <motion.div variants={fadeUp} style={{ marginBottom: 32 }}>
        <h2 className="text-2xl font-bold text-slate-900" style={{ marginBottom: 4 }}>Checkout Simulator</h2>
        <p className="text-sm" style={{ color: '#64748b' }}>Experience the ultra-fast checkout flow.</p>
      </motion.div>
      <motion.div variants={fadeUp} custom={1} className="glass-card mx-auto" style={{ padding: 32, maxWidth: 640 }}>
        <StepIndicator currentStep={step} />
        <AnimatePresence mode="wait">
          {step === 0 && <Step1 key="s1" onSelect={handleSelect} />}
          {step === 1 && <Step2 key="s2" ticket={selectedTicket} onNext={() => setStep(2)} onBack={() => setStep(0)} />}
          {step === 2 && <Step3 key="s3" ticket={selectedTicket} onNext={() => setStep(3)} onBack={() => setStep(1)} />}
          {step === 3 && <Step4 key="s4" ticket={selectedTicket} />}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
