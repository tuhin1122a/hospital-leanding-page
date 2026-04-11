'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Eye, EyeOff, Lock, Mail, Stethoscope, KeyRound, RefreshCcw, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useRef } from 'react'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  // 2FA state
  const [twoFactorStep, setTwoFactorStep] = useState(false)
  const [userId, setUserId] = useState('')
  const [twoFactorCode, setTwoFactorCode] = useState(['', '', '', '', '', ''])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const router = useRouter()

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    if (!email || !password) {
      setError('Please enter both email and password.')
      return
    }

    setError('')
    setSuccess('')
    setIsLoading(true)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.message || 'Invalid credentials')
      }

      const data = await res.json()

      if (data.requiresTwoFactor) {
        setUserId(data.userId)
        setTwoFactorStep(true)
        return
      }

      const store = rememberMe ? localStorage : sessionStorage
      store.setItem('refreshToken', data.refreshToken)
      document.cookie = `accessToken=${data.accessToken}; path=/; max-age=${rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60}; SameSite=Lax`
      
      let redirectPath = '/dashboard'
      try {
        const payload = JSON.parse(atob(data.accessToken.split('.')[1]));
        if (payload.role === 'RECEPTIONIST') redirectPath = '/dashboard/appointments';
        else if (payload.role === 'DOCTOR') redirectPath = '/dashboard/patients';
        else if (payload.role === 'PATIENT') redirectPath = '/dashboard';
      } catch (e) {}
      
      window.location.href = redirectPath
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !email || !password) {
      setError('Please fill in all fields.')
      return
    }

    setError('')
    setSuccess('')
    setIsLoading(true)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.message || 'Registration failed')
      }

      const data = await res.json()

      const store = rememberMe ? localStorage : sessionStorage
      store.setItem('refreshToken', data.refreshToken)
      document.cookie = `accessToken=${data.accessToken}; path=/; max-age=${rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60}; SameSite=Lax`
      
      setSuccess('Account created successfully! Redirecting...')
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 1000)

    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const verifyTwoFactor = async (token: string) => {
    if (token.length !== 6) return
    setError('')
    setIsLoading(true)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin/2fa`, {
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
      store.setItem('refreshToken', data.refreshToken)
      document.cookie = `accessToken=${data.accessToken}; path=/; max-age=${rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60}; SameSite=Lax`

      let redirectPath = '/dashboard'
      try {
        const payload = JSON.parse(atob(data.accessToken.split('.')[1]));
        if (payload.role === 'RECEPTIONIST') redirectPath = '/dashboard/appointments';
        else if (payload.role === 'DOCTOR') redirectPath = '/dashboard/patients';
        else if (payload.role === 'PATIENT') redirectPath = '/dashboard';
      } catch (e) {}

      window.location.href = redirectPath
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

  const handleDigitChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    const updated = [...twoFactorCode]
    updated[index] = value.slice(-1)
    setTwoFactorCode(updated)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

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
      if (pasted.length === 6) {
        verifyTwoFactor(pasted)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-0"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] -z-0"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/20 dark:border-zinc-800 rounded-2xl shadow-2xl p-8 md:p-10 relative overflow-hidden">
          
          <div className="text-center mb-8">
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="inline-block mb-6">
              <div className="w-16 h-16 flex items-center justify-center overflow-hidden">
                <img src="/favicon (2).png" alt="Logo" className="w-full h-full object-contain" />
              </div>
            </motion.div>
            <h1 className="text-4xl font-black text-foreground mb-2 tracking-tighter">
              Nurjahan<span className="text-primary italic">Hospital</span>
            </h1>
            <p className="text-muted-foreground font-medium text-sm">
              {twoFactorStep ? '2-Step Verification' : 'Your Health, Our Priority'}
            </p>
          </div>

          {!twoFactorStep && (
            <div className="flex p-1 mb-8 bg-muted rounded-xl">
              <button
                onClick={() => { setIsLogin(true); setError(''); setSuccess(''); }}
                className={`flex-1 py-2.5 text-sm font-black rounded-lg transition-all ${isLogin ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Sign In
              </button>
              <button
                onClick={() => { setIsLogin(false); setError(''); setSuccess(''); }}
                className={`flex-1 py-2.5 text-sm font-black rounded-lg transition-all ${!isLogin ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Create Account
              </button>
            </div>
          )}

          {error && <div className="mb-6 p-4 bg-red-100 rounded-xl border border-red-200 text-red-600 text-sm font-bold text-center">{error}</div>}
          {success && <div className="mb-6 p-4 bg-emerald-100 rounded-xl border border-emerald-200 text-emerald-600 text-sm font-bold text-center">{success}</div>}

          <AnimatePresence mode="wait">
            {twoFactorStep ? (
              <motion.div key="2fa" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
                <p className="text-center text-sm text-muted-foreground font-medium mb-8">
                  Enter the <span className="text-primary font-black">6-digit code</span> from your Authenticator App
                </p>

                <form onSubmit={handleTwoFactorSubmit} className="space-y-8">
                  <div className="flex justify-center gap-3" onPaste={handlePaste}>
                    {twoFactorCode.map((digit, i) => (
                      <input key={i} ref={(el) => { inputRefs.current[i] = el }} type="text" inputMode="numeric" maxLength={1} value={digit}
                        onChange={(e) => handleDigitChange(i, e.target.value)} onKeyDown={(e) => handleDigitKeyDown(i, e)}
                        className="w-12 h-14 text-center text-2xl font-black rounded-xl border-2 border-primary/20 bg-primary/5 focus:border-primary focus:ring-4 focus:ring-primary/10 text-foreground outline-none transition-all"
                        autoFocus={i === 0}
                      />
                    ))}
                  </div>

                  <Button type="submit" disabled={isLoading || twoFactorCode.join('').length < 6}
                    className="w-full h-14 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-black text-base rounded-xl shadow-xl shadow-primary/30 transition-all group">
                    {isLoading ? 'Verifying...' : 'Verify & Sign In'}
                    {!isLoading && <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />}
                  </Button>
                </form>

                <button onClick={() => { setTwoFactorStep(false); setError(''); setTwoFactorCode(['', '', '', '', '', '']); }}
                  className="mt-6 w-full flex items-center justify-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
                  <RefreshCcw size={14} /> Back to login
                </button>
              </motion.div>
            ) : isLogin ? (
              <motion.div key="login" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.2 }}>
                <form onSubmit={handleLogin} className="space-y-5 mb-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-wider text-muted-foreground ml-1">Email</label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                      <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}
                        className="h-14 pl-12 pr-4 rounded-xl border-2 border-primary/20 bg-primary/5 focus:border-primary text-foreground placeholder:text-muted-foreground font-medium" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-wider text-muted-foreground ml-1">Password</label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                      <input type={showPassword ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-14 pl-12 pr-12 rounded-xl border-2 border-primary/20 bg-primary/5 focus:border-primary focus:ring-4 focus:ring-primary/10 text-foreground placeholder:text-muted-foreground font-medium outline-none transition-all" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="w-4 h-4 rounded border-primary/30 accent-primary" />
                      <span className="text-sm font-bold text-muted-foreground group-hover:text-foreground transition-colors">Remember me</span>
                    </label>
                    <Link href="/forgot-password" className="text-sm font-bold text-primary hover:underline">Forgot password?</Link>
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full h-14 bg-gradient-to-r from-primary to-secondary text-white font-black text-base rounded-xl shadow-xl shadow-primary/30 group mt-4">
                    {isLoading ? 'Signing In...' : 'Sign In'}
                    {!isLoading && <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />}
                  </Button>
                </form>
              </motion.div>
            ) : (
              <motion.div key="register" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                <form onSubmit={handleRegister} className="space-y-4 mb-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-wider text-muted-foreground ml-1">Full Name</label>
                    <div className="relative">
                      <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                      <Input type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)}
                        className="h-14 pl-12 pr-4 rounded-xl border-2 border-primary/20 bg-primary/5 focus:border-primary text-foreground placeholder:text-muted-foreground font-medium" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-wider text-muted-foreground ml-1">Email</label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                      <Input type="email" placeholder="patient@example.com" value={email} onChange={(e) => setEmail(e.target.value)}
                        className="h-14 pl-12 pr-4 rounded-xl border-2 border-primary/20 bg-primary/5 focus:border-primary text-foreground placeholder:text-muted-foreground font-medium" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-wider text-muted-foreground ml-1">Password</label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                      <input type={showPassword ? 'text' : 'password'} placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-14 pl-12 pr-12 rounded-xl border-2 border-primary/20 bg-primary/5 focus:border-primary focus:ring-4 focus:ring-primary/10 text-foreground placeholder:text-muted-foreground font-medium outline-none transition-all" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full h-14 bg-gradient-to-r from-primary to-secondary text-white font-black text-base rounded-xl shadow-xl shadow-primary/30 group mt-4">
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                    {!isLoading && <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />}
                  </Button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {!twoFactorStep && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border"></div></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-3 text-muted-foreground font-black tracking-widest bg-white dark:bg-zinc-900">Or</span></div>
              </div>
              <button type="button" onClick={() => { window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google` }}
                className="w-full h-14 bg-white border-2 border-slate-100 hover:border-primary/30 text-slate-900 font-black text-sm rounded-xl transition-all flex items-center justify-center gap-3 shadow-sm hover:bg-slate-50">
                <svg viewBox="0 0 24 24" className="w-6 h-6">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
            </>
          )}

        </div>
      </motion.div>
    </div>
  )
}
