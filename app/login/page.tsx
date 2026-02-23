'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { ArrowRight, Eye, EyeOff, Lock, Mail, Shield, Stethoscope } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Demo - redirect to dashboard
    router.push('/dashboard')
  }

  const demoLogins = [
    { role: 'Admin', email: 'admin@carepulse.com', password: 'demo123' },
    { role: 'Doctor', email: 'doctor@carepulse.com', password: 'demo123' },
    { role: 'Receptionist', email: 'receptionist@carepulse.com', password: 'demo123' },
  ]

  const quickLogin = (demoEmail: string) => {
    setEmail(demoEmail)
    setPassword('demo123')
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
          <div className="text-center mb-12">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-6"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center shadow-2xl shadow-primary/30">
                <Stethoscope size={32} className="text-white" />
              </div>
            </motion.div>
            <h1 className="text-4xl font-black text-foreground mb-3 tracking-tighter">
              Care<span className="text-primary italic">Pulse</span>
            </h1>
            <p className="text-muted-foreground font-medium text-base">Hospital Management System</p>
          </div>

          {/* Form */}
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
                <input type="checkbox" className="w-4 h-4 rounded-md border-2 border-primary/30 accent-primary cursor-pointer" />
                <span className="text-sm font-bold text-muted-foreground group-hover:text-foreground transition-colors">Remember me</span>
              </label>
              <Link href="#" className="text-sm font-bold text-primary hover:text-primary/80 transition-colors">
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full h-14 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-black text-base rounded-2xl shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all group"
            >
              Sign In
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          {/* Divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-zinc-900 text-muted-foreground font-bold">Demo Access</span>
            </div>
          </div>

          {/* Quick Login Options */}
          <div className="space-y-2 mb-8">
            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">Try demo accounts:</p>
            {demoLogins.map((demo) => (
              <button
                key={demo.role}
                onClick={() => quickLogin(demo.email)}
                className="w-full px-4 py-3 rounded-xl border-2 border-primary/20 hover:border-primary hover:bg-primary/5 text-left font-bold text-sm transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-foreground font-black">{demo.role}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{demo.email}</p>
                  </div>
                  <Shield size={16} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground font-medium">
              Demo Account - for testing purposes only
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-muted-foreground font-medium">
            Access the complete hospital management demo
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            All departments, features, and modules available for testing
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
