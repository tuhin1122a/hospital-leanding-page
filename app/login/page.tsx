'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Eye, EyeOff, Lock, Mail, Stethoscope, KeyRound, RefreshCcw } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useRef } from 'react'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  // 2FA state
  const [twoFactorStep, setTwoFactorStep] = useState(false)
  const [userId, setUserId] = useState('')
  const [twoFactorCode, setTwoFactorCode] = useState(['', '', '', '', '', ''])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const router = useRouter()

  const handleLogin = async (e?: React.FormEvent, submitEmail?: string, submitPassword?: string) => {
    if (e) e.preventDefault()

    const loginEmail = submitEmail || email
    const loginPassword = submitPassword || password

    if (!loginEmail || !loginPassword) {
      setError('Please enter both email and password.')
      return
    }

    setError('')
    setIsLoading(true)

    try {
      const res = await fetch('http://localhost:5000/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.message || 'Invalid credentials')
      }

      const data = await res.json()

      // ---- 2FA চাইলে ----
      if (data.requiresTwoFactor) {
        setUserId(data.userId)
        setTwoFactorStep(true)
        return
      }

      // ---- Normal login ----
      const store = rememberMe ? localStorage : sessionStorage
      store.setItem('accessToken', data.accessToken)
      store.setItem('refreshToken', data.refreshToken)
      window.location.href = '/dashboard'
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  // token string সরাসরি নেয় — state stale হওয়ার সমস্যা নেই
  const verifyTwoFactor = async (token: string) => {
    if (token.length !== 6) return
    setError('')
    setIsLoading(true)

    try {
      const res = await fetch('http://localhost:5000/auth/signin/2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, token }),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.message || 'Invalid authenticator code')
      }

      const data = await res.json()
      const store = rememberMe ? localStorage : sessionStorage
      store.setItem('accessToken', data.accessToken)
      store.setItem('refreshToken', data.refreshToken)
      window.location.href = '/dashboard'
    } catch (err: any) {
      setError(err.message || 'Verification failed.')
      setTwoFactorCode(['', '', '', '', '', ''])
      inputRefs.current[0]?.focus()
    } finally {
      setIsLoading(false)
    }
  }

  const handleTwoFactorSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    const token = twoFactorCode.join('')
    verifyTwoFactor(token)
  }

  // যেকোনো box-এ digit পরিবর্তন হলে — সব 6টা ভরা থাকলে auto-verify
  const handleDigitChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    const updated = [...twoFactorCode]
    updated[index] = value.slice(-1)
    setTwoFactorCode(updated)

    // পরের box-এ focus
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // সব 6 digit পূর্ণ হলে সাথে সাথে verify — updated array থেকে token নাও
    const token = updated.join('')
    if (token.length === 6 && !updated.includes('')) {
      verifyTwoFactor(token)
    }
  }

  const handleDigitKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !twoFactorCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (pasted) {
      const digits = pasted.split('')
      const updated = ['', '', '', '', '', '']
      digits.forEach((d, i) => { if (i < 6) updated[i] = d })
      setTwoFactorCode(updated)
      inputRefs.current[Math.min(pasted.length - 1, 5)]?.focus()
      // paste করে 6 digit পাওয়া গেলে auto-verify
      if (pasted.length === 6) {
        verifyTwoFactor(pasted)
      }
    }
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-0"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] -z-0"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Login Card */}
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/20 dark:border-zinc-800 rounded-3xl shadow-2xl p-8 md:p-12">

          {/* Header */}
          <div className="text-center mb-10">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-6"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center shadow-2xl shadow-primary/30">
                {twoFactorStep
                  ? <KeyRound size={32} className="text-white" />
                  : <Stethoscope size={32} className="text-white" />
                }
              </div>
            </motion.div>
            <h1 className="text-4xl font-black text-foreground mb-3 tracking-tighter">
              Nurjahan<span className="text-primary italic">Hospital</span>
            </h1>
            <p className="text-muted-foreground font-medium text-base">
              {twoFactorStep ? '2-Step Verification' : 'Private Hospital & Diagnostic Center - 2'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 rounded-2xl border-2 border-red-500/20 text-red-600 text-sm font-bold text-center">
              {error}
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* ──────── 2FA STEP ──────── */}
            {twoFactorStep ? (
              <motion.div
                key="2fa"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-center text-sm text-muted-foreground font-medium mb-8">
                  আপনার Authenticator App থেকে <span className="text-primary font-black">6-digit code</span> দিন
                </p>

                <form onSubmit={handleTwoFactorSubmit} className="space-y-8">
                  {/* OTP Boxes */}
                  <div className="flex justify-center gap-3" onPaste={handlePaste}>
                    {twoFactorCode.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => { inputRefs.current[i] = el }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleDigitChange(i, e.target.value)}
                        onKeyDown={(e) => handleDigitKeyDown(i, e)}
                        className="w-12 h-14 text-center text-2xl font-black rounded-2xl border-2 border-primary/20 bg-primary/5 focus:border-primary focus:ring-4 focus:ring-primary/10 text-foreground outline-none transition-all"
                        autoFocus={i === 0}
                      />
                    ))}
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading || twoFactorCode.join('').length < 6}
                    className="w-full h-14 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-black text-base rounded-2xl shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all group disabled:opacity-70"
                  >
                    {isLoading ? 'Verifying...' : 'Verify & Sign In'}
                    {!isLoading && <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />}
                  </Button>
                </form>

                {/* Back button */}
                <button
                  onClick={() => {
                    setTwoFactorStep(false)
                    setError('')
                    setTwoFactorCode(['', '', '', '', '', ''])
                  }}
                  className="mt-6 w-full flex items-center justify-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors"
                >
                  <RefreshCcw size={14} />
                  অন্য account দিয়ে login করুন
                </button>
              </motion.div>

            ) : (
              /* ──────── NORMAL LOGIN STEP ──────── */
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleLogin} className="space-y-6 mb-8">
                  {/* Email Field */}
                  <div className="space-y-3">
                    <label className="block text-sm font-black uppercase tracking-wide text-foreground">Email Address</label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-14 pl-12 pr-4 rounded-2xl border-2 border-primary/20 bg-primary/5 focus:border-primary focus:ring-4 focus:ring-primary/10 text-foreground placeholder:text-muted-foreground font-medium transition-all"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-3">
                    <label className="block text-sm font-black uppercase tracking-wide text-foreground">Password</label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-14 pl-12 pr-12 rounded-2xl border-2 border-primary/20 bg-primary/5 focus:border-primary focus:ring-4 focus:ring-primary/10 text-foreground placeholder:text-muted-foreground font-medium transition-all outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80 transition-colors"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded-md border-2 border-primary/30 accent-primary cursor-pointer"
                      />
                      <span className="text-sm font-bold text-muted-foreground group-hover:text-foreground transition-colors">
                        Remember me
                      </span>
                    </label>
                    <Link href="/forgot-password" className="text-sm font-bold text-primary hover:text-primary/80 transition-colors">
                      Forgot password?
                    </Link>
                  </div>

                  {/* Login Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-14 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-black text-base rounded-2xl shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all group disabled:opacity-70"
                  >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                    {!isLoading && <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />}
                  </Button>
                </form>


              </motion.div>
            )}
          </AnimatePresence>
        </div>


      </motion.div>
    </div>
  )
}
