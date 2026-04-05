'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, CheckCircle, Lock, Mail, Stethoscope } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const API = 'http://localhost:5000'

type Step = 'email' | 'otp' | 'newpass' | 'done'

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [newPass, setNewPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // ── Step 1: Email submit ──────────────────────────────────────
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return setError('Email দিন।')
    setError('')
    setIsLoading(true)
    try {
      const res = await fetch(`${API}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        throw new Error(d.message || 'Request failed')
      }
      setStep('otp')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  // ── Step 2: OTP verify ────────────────────────────────────────
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length !== 6) return setError('6-digit OTP দিন।')
    setError('')
    setIsLoading(true)
    try {
      const res = await fetch(`${API}/auth/verify-reset-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        throw new Error(d.message || 'Invalid OTP')
      }
      setStep('newpass')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  // ── Step 3: New password ──────────────────────────────────────
  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPass.length < 8) return setError('Password অন্তত 8 character হতে হবে।')
    if (newPass !== confirmPass) return setError('Password দুটো মিলছে না।')
    setError('')
    setIsLoading(true)
    try {
      const res = await fetch(`${API}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword: newPass }),
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        throw new Error(d.message || 'Reset failed')
      }
      setStep('done')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const strength = (() => {
    if (!newPass) return null
    if (newPass.length < 6) return { label: 'Weak', color: 'bg-red-500', w: 'w-1/4', text: 'text-red-500' }
    if (newPass.length < 10) return { label: 'Fair', color: 'bg-amber-500', w: 'w-2/4', text: 'text-amber-500' }
    if (newPass.length < 14) return { label: 'Good', color: 'bg-blue-500', w: 'w-3/4', text: 'text-blue-500' }
    return { label: 'Strong', color: 'bg-emerald-500', w: 'w-full', text: 'text-emerald-500' }
  })()

  const stepLabels: Record<Step, string> = {
    email: 'Email দিন',
    otp: 'OTP Verify',
    newpass: 'নতুন Password',
    done: 'সম্পন্ন',
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-0" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] -z-0" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/20 dark:border-zinc-800 rounded-3xl shadow-2xl p-8 md:p-10">

          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-5"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center shadow-2xl shadow-primary/30">
                {step === 'done' ? <CheckCircle size={32} className="text-white" /> : <Lock size={32} className="text-white" />}
              </div>
            </motion.div>
            <h1 className="text-3xl font-black text-foreground mb-2 tracking-tighter">
              Nurjahan<span className="text-primary italic">Hospital</span>
            </h1>
            <p className="text-muted-foreground font-medium text-sm">Password Reset</p>
          </div>

          {/* Progress steps */}
          {step !== 'done' && (
            <div className="flex items-center gap-2 mb-8">
              {(['email', 'otp', 'newpass'] as Step[]).map((s, i) => (
                <div key={s} className="flex-1 flex items-center gap-2">
                  <div className={`w-full h-1.5 rounded-full transition-all duration-500 ${
                    step === s ? 'bg-primary' :
                    ['email', 'otp', 'newpass'].indexOf(step) > i ? 'bg-primary' : 'bg-muted'
                  }`} />
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mb-5 p-4 bg-red-100 rounded-2xl border-2 border-red-500/20 text-red-600 text-sm font-bold text-center">
              {error}
            </div>
          )}

          <AnimatePresence mode="wait">

            {/* ── STEP 1: Email ── */}
            {step === 'email' && (
              <motion.form key="email" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
                onSubmit={handleEmailSubmit} className="space-y-5"
              >
                <div>
                  <p className="text-sm text-muted-foreground font-medium mb-5 text-center">
                    আপনার registered email দিন। সেখানে একটি <span className="text-primary font-black">6-digit OTP</span> পাঠানো হবে।
                  </p>
                  <label className="block text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">Email Address</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full h-13 pl-10 pr-4 py-3.5 rounded-2xl border-2 border-primary/20 bg-primary/5 focus:border-primary focus:ring-4 focus:ring-primary/10 text-foreground placeholder:text-muted-foreground font-medium outline-none transition-all"
                      autoFocus
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-13 py-3.5 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-black text-sm rounded-2xl shadow-xl shadow-primary/30 transition-all disabled:opacity-70"
                >
                  {isLoading ? 'পাঠাচ্ছি...' : 'OTP পাঠান →'}
                </button>
              </motion.form>
            )}

            {/* ── STEP 2: OTP ── */}
            {step === 'otp' && (
              <motion.form key="otp" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
                onSubmit={handleOtpSubmit} className="space-y-5"
              >
                <p className="text-sm text-muted-foreground font-medium text-center">
                  <span className="text-primary font-black">{email}</span> এ পাঠানো 6-digit OTP দিন
                </p>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">OTP Code</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={otp}
                    onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="000000"
                    className="w-full py-4 px-5 rounded-2xl border-2 border-primary/20 bg-primary/5 focus:border-primary focus:ring-4 focus:ring-primary/10 text-foreground font-mono font-black text-center text-2xl tracking-[0.4em] outline-none transition-all"
                    autoFocus
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading || otp.length < 6}
                  className="w-full py-3.5 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-black text-sm rounded-2xl shadow-xl shadow-primary/30 transition-all disabled:opacity-70"
                >
                  {isLoading ? 'Verifying...' : 'Verify করুন →'}
                </button>
                <button type="button" onClick={() => handleEmailSubmit({ preventDefault: () => {} } as any)}
                  className="w-full text-xs font-bold text-muted-foreground hover:text-primary transition-colors">
                  OTP আসেনি? আবার পাঠান
                </button>
              </motion.form>
            )}

            {/* ── STEP 3: New Password ── */}
            {step === 'newpass' && (
              <motion.form key="newpass" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
                onSubmit={handlePasswordReset} className="space-y-5"
              >
                <p className="text-sm text-muted-foreground font-medium text-center">নতুন password সেট করুন</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">নতুন Password</label>
                    <input
                      type="password"
                      value={newPass}
                      onChange={e => setNewPass(e.target.value)}
                      placeholder="••••••••"
                      className="w-full py-3.5 px-5 rounded-2xl border-2 border-primary/20 bg-primary/5 focus:border-primary focus:ring-4 focus:ring-primary/10 text-foreground font-bold outline-none transition-all"
                    />
                    {strength && (
                      <div className="mt-2 space-y-1">
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className={`h-full rounded-full transition-all duration-500 ${strength.color} ${strength.w}`} />
                        </div>
                        <p className={`text-[10px] font-black uppercase tracking-widest ${strength.text}`}>{strength.label}</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">Confirm Password</label>
                    <input
                      type="password"
                      value={confirmPass}
                      onChange={e => setConfirmPass(e.target.value)}
                      placeholder="••••••••"
                      className="w-full py-3.5 px-5 rounded-2xl border-2 border-primary/20 bg-primary/5 focus:border-primary focus:ring-4 focus:ring-primary/10 text-foreground font-bold outline-none transition-all"
                    />
                    {confirmPass && (
                      <p className={`text-[10px] font-black uppercase tracking-widest mt-1 ${newPass === confirmPass ? 'text-emerald-500' : 'text-red-500'}`}>
                        {newPass === confirmPass ? '✓ মিলছে' : '✗ মিলছে না'}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading || newPass.length < 8 || newPass !== confirmPass}
                  className="w-full py-3.5 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-black text-sm rounded-2xl shadow-xl shadow-primary/30 transition-all disabled:opacity-70"
                >
                  {isLoading ? 'Saving...' : 'Password Reset করুন →'}
                </button>
              </motion.form>
            )}

            {/* ── STEP 4: Done ── */}
            {step === 'done' && (
              <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6 py-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto"
                >
                  <CheckCircle size={40} className="text-emerald-500" />
                </motion.div>
                <div>
                  <h2 className="text-2xl font-black text-foreground mb-2">সফল!</h2>
                  <p className="text-muted-foreground font-medium text-sm">
                    আপনার password সফলভাবে reset হয়েছে।<br />নতুন password দিয়ে login করুন।
                  </p>
                </div>
                <Link href="/login"
                  className="block w-full py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-black text-sm rounded-2xl shadow-xl shadow-primary/30 text-center transition-all hover:from-primary/90 hover:to-secondary/90"
                >
                  Login করুন →
                </Link>
              </motion.div>
            )}

          </AnimatePresence>

          {/* Back to login */}
          {step !== 'done' && (
            <Link href="/login"
              className="mt-6 flex items-center justify-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft size={14} />
              Login পেজে ফিরে যান
            </Link>
          )}
        </div>
      </motion.div>
    </div>
  )
}
