'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Shield, Lock, Smartphone, Eye, EyeOff, Key,
  AlertTriangle, CheckCircle, Clock, Globe, Monitor,
  RefreshCw, QrCode, X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import toast from 'react-hot-toast'

const API = 'http://localhost:5000'

function getToken() { return localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken') || '' }
function authHeader() { return { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'application/json' } }

export default function AccountSecurityPage() {
  const { t } = useLanguage()

  // Password state
  const [currentPw, setCurrentPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [changingPw, setChangingPw] = useState(false)

  // 2FA state
  const [userProfile, setUserProfile] = useState<any>(null)
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [secret2fa, setSecret2fa] = useState('')
  const [totpToken, setTotpToken] = useState('')
  const [loading2fa, setLoading2fa] = useState(false)
  const [show2faSetup, setShow2faSetup] = useState(false)

  // Login history
  const [loginHistory, setLoginHistory] = useState<any[]>([])
  const [loadingHistory, setLoadingHistory] = useState(true)

  useEffect(() => {
    fetch(`${API}/auth/me`, { headers: authHeader() })
      .then(r => r.json()).then(setUserProfile).catch(console.error)

    fetch(`${API}/users/login-history`, { headers: authHeader() })
      .then(r => r.json())
      .then(data => setLoginHistory(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoadingHistory(false))
  }, [])

  // Password strength
  const strength = (() => {
    if (!newPw) return null
    if (newPw.length < 6) return { label: 'Weak', color: 'bg-red-500', w: 'w-1/4', text: 'text-red-500' }
    if (newPw.length < 10) return { label: 'Fair', color: 'bg-amber-500', w: 'w-2/4', text: 'text-amber-500' }
    if (newPw.length < 14) return { label: 'Good', color: 'bg-blue-500', w: 'w-3/4', text: 'text-blue-500' }
    return { label: 'Strong', color: 'bg-emerald-500', w: 'w-full', text: 'text-emerald-500' }
  })()

  const handleChangePassword = async () => {
    if (!currentPw || !newPw || !confirmPw) return toast.error('Please fill all fields')
    if (newPw !== confirmPw) return toast.error('Passwords do not match')
    if (newPw.length < 8) return toast.error('Minimum 8 characters required')
    setChangingPw(true)
    const tid = toast.loading('Updating password...')
    try {
      const res = await fetch(`${API}/users/change-password`, {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ currentPassword: currentPw, newPassword: newPw }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed')
      toast.success('Password updated successfully!', { id: tid })
      setCurrentPw(''); setNewPw(''); setConfirmPw('')
    } catch (e: any) {
      toast.error(e.message, { id: tid })
    } finally {
      setChangingPw(false)
    }
  }

  const handle2FAGenerate = async () => {
    setLoading2fa(true)
    try {
      const res = await fetch(`${API}/users/2fa/generate`, { headers: authHeader() })
      const data = await res.json()
      setQrCode(data.qrCode)
      setSecret2fa(data.secret)
      setShow2faSetup(true)
    } catch {
      toast.error('Failed to generate 2FA secret')
    } finally {
      setLoading2fa(false)
    }
  }

  const handle2FAVerify = async () => {
    if (!totpToken || totpToken.length < 6) return toast.error('Enter 6-digit code')
    setLoading2fa(true)
    const tid = toast.loading('Verifying...')
    try {
      const res = await fetch(`${API}/users/2fa/verify`, {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ token: totpToken }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Invalid code')
      toast.success('2FA Enabled!', { id: tid })
      setUserProfile((p: any) => ({ ...p, twoFactorEnabled: true }))
      setShow2faSetup(false); setQrCode(null); setTotpToken('')
    } catch (e: any) {
      toast.error(e.message, { id: tid })
    } finally {
      setLoading2fa(false)
    }
  }

  const handle2FADisable = async () => {
    setLoading2fa(true)
    const tid = toast.loading('Disabling 2FA...')
    try {
      const res = await fetch(`${API}/users/2fa/disable`, { method: 'DELETE', headers: authHeader() })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed')
      toast.success('2FA Disabled', { id: tid })
      setUserProfile((p: any) => ({ ...p, twoFactorEnabled: false }))
    } catch (e: any) {
      toast.error(e.message, { id: tid })
    } finally {
      setLoading2fa(false)
    }
  }

  const twoFaEnabled = userProfile?.twoFactorEnabled
  const score = twoFaEnabled ? 95 : 72

  // Group by device for "Active Devices"
  const activeDevices = loginHistory
    .filter(l => l.success)
    .reduce((acc: any[], log) => {
      const key = `${log.browser}-${log.os}`
      if (!acc.find(d => d.key === key)) {
        acc.push({ key, browser: log.browser, os: log.os, device: log.device, ip: log.ip, lastSeen: log.createdAt })
      }
      return acc
    }, [])
    .slice(0, 4)

  const formatTime = (iso: string) => {
    const d = new Date(iso)
    const diff = Date.now() - d.getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return 'Just now'
    if (mins < 60) return `${mins} min ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    return d.toLocaleDateString()
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black text-card-foreground tracking-tighter">Account Security</h1>
        <p className="text-muted-foreground font-medium text-lg mt-1">Manage your password, 2FA and login sessions</p>
      </div>

      {/* Security Score Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-primary to-blue-600 rounded-[3rem] p-8 text-primary-foreground relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-[2rem] bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Shield size={36} className="text-white" />
            </div>
            <div>
              <p className="text-white/70 font-bold text-sm uppercase tracking-widest mb-1">Security Score</p>
              <h2 className="text-5xl font-black tracking-tight">{score}<span className="text-2xl text-white/70">/100</span></h2>
              <p className="text-white/70 font-medium text-sm mt-1">{twoFaEnabled ? 'Excellent · 2FA Active' : 'Good · Enable 2FA for better security'}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {[
              { label: 'Password', val: '✓', ok: true },
              { label: '2FA', val: twoFaEnabled ? '✓' : '✗', ok: twoFaEnabled },
              { label: 'Sessions', val: String(activeDevices.length), ok: true },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <p className={`text-2xl font-black ${item.ok ? 'text-white' : 'text-white/40'}`}>{item.val}</p>
                <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Change Password */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-card rounded-[2.5rem] border border-border p-8 space-y-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Lock size={18} className="text-primary" />
            </div>
            <div>
              <h3 className="font-black text-card-foreground">Change Password</h3>
              <p className="text-xs text-muted-foreground font-medium">Update your account password</p>
            </div>
          </div>

          {[
            { label: 'Current Password', value: currentPw, set: setCurrentPw, show: showCurrent, setShow: setShowCurrent, placeholder: '••••••••' },
            { label: 'New Password', value: newPw, set: setNewPw, show: showNew, setShow: setShowNew, placeholder: '••••••••', strength: true },
            { label: 'Confirm New Password', value: confirmPw, set: setConfirmPw, show: showConfirm, setShow: setShowConfirm, placeholder: '••••••••', confirm: true },
          ].map((field, i) => (
            <div key={i} className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{field.label}</label>
              <div className="relative">
                <input
                  type={field.show ? 'text' : 'password'}
                  value={field.value}
                  onChange={e => field.set(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-2xl bg-muted border border-border outline-none font-bold text-card-foreground text-sm pr-12 focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder={field.placeholder}
                />
                <button type="button" onClick={() => field.setShow(!field.show)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-card-foreground transition-colors">
                  {field.show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                {field.confirm && confirmPw && newPw && (
                  <div className="absolute right-10 top-1/2 -translate-y-1/2">
                    {confirmPw === newPw ? <CheckCircle size={16} className="text-emerald-500" /> : <AlertTriangle size={16} className="text-red-500" />}
                  </div>
                )}
              </div>
              {field.strength && strength && (
                <div className="space-y-1 pt-1">
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-500 ${strength.color} ${strength.w}`} />
                  </div>
                  <p className={`text-[10px] font-black uppercase tracking-widest ${strength.text}`}>{strength.label}</p>
                </div>
              )}
            </div>
          ))}

          <Button onClick={handleChangePassword} disabled={changingPw}
            className="w-full py-3.5 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black shadow-lg shadow-primary/20">
            {changingPw ? 'Updating...' : 'Update Password'}
          </Button>
        </motion.div>

        {/* 2FA & API */}
        <div className="space-y-5">
          {/* 2FA Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="bg-card rounded-[2.5rem] border border-border p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                <Smartphone size={18} className="text-purple-500" />
              </div>
              <div>
                <h3 className="font-black text-card-foreground">Two-Factor Auth (TOTP)</h3>
                <p className="text-xs text-muted-foreground font-medium">Google Authenticator / Authy</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/50 mb-4">
              <div>
                <p className="font-bold text-card-foreground text-sm">Authenticator App</p>
                <p className="text-xs text-muted-foreground font-medium">{twoFaEnabled ? 'Active & Secured' : 'Not configured'}</p>
              </div>
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black ${twoFaEnabled ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-500'}`}>
                {twoFaEnabled ? <CheckCircle size={12} /> : <AlertTriangle size={12} />}
                {twoFaEnabled ? 'Enabled' : 'Disabled'}
              </div>
            </div>

            {twoFaEnabled ? (
              <Button onClick={handle2FADisable} disabled={loading2fa} variant="outline"
                className="w-full py-3 rounded-2xl border-red-200 text-red-500 hover:bg-red-50 font-black">
                {loading2fa ? 'Disabling...' : 'Disable 2FA'}
              </Button>
            ) : (
              <Button onClick={handle2FAGenerate} disabled={loading2fa}
                className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black shadow-lg shadow-purple-200 flex items-center justify-center gap-2">
                <QrCode size={16} />
                {loading2fa ? 'Generating...' : 'Setup Google Authenticator'}
              </Button>
            )}
          </motion.div>

          {/* API Key Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-card rounded-[2.5rem] border border-border p-8"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center">
                <Key size={18} className="text-amber-500" />
              </div>
              <div>
                <h3 className="font-black text-card-foreground">API Access</h3>
                <p className="text-xs text-muted-foreground font-medium">Developer API key</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/50 font-mono text-xs text-muted-foreground">
              <span className="flex-grow tracking-wider">sk_live_••••••••••••••••••••••</span>
              <button onClick={() => { navigator.clipboard.writeText('sk_live_example'); toast.success('Copied!') }}
                className="text-primary font-bold hover:text-primary/80 transition-colors">Copy</button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Active Devices */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
        className="bg-card rounded-[2.5rem] border border-border p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Monitor size={18} className="text-primary" />
          </div>
          <div>
            <h3 className="font-black text-card-foreground">Active Devices</h3>
            <p className="text-xs text-muted-foreground font-medium">Devices that have logged into your account</p>
          </div>
        </div>
        {activeDevices.length === 0 ? (
          <p className="text-muted-foreground text-sm font-medium text-center py-4">No active devices found — log in to populate</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeDevices.map((dev, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-muted/40 hover:bg-muted/70 transition-all">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Monitor size={18} className="text-primary" />
                </div>
                <div className="flex-grow min-w-0">
                  <p className="font-bold text-card-foreground text-sm">{dev.browser} · {dev.os}</p>
                  <p className="text-xs text-muted-foreground font-medium">{dev.device} · {dev.ip}</p>
                </div>
                <p className="text-[10px] font-black text-muted-foreground whitespace-nowrap">{formatTime(dev.lastSeen)}</p>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Login History */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="bg-card rounded-[2.5rem] border border-border p-8"
      >
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Clock size={18} className="text-primary" />
            </div>
            <div>
              <h3 className="font-black text-card-foreground">Login History</h3>
              <p className="text-xs text-muted-foreground font-medium">Recent account access ({loginHistory.length} records)</p>
            </div>
          </div>
          <button onClick={() => {
            setLoadingHistory(true)
            fetch(`${API}/users/login-history`, { headers: authHeader() })
              .then(r => r.json()).then(d => setLoginHistory(Array.isArray(d) ? d : []))
              .finally(() => setLoadingHistory(false))
          }} className="p-2.5 rounded-xl bg-muted hover:bg-border transition-all text-muted-foreground">
            <RefreshCw size={16} className={loadingHistory ? 'animate-spin' : ''} />
          </button>
        </div>

        {loadingHistory ? (
          <div className="space-y-3">
            {[1,2,3].map(i => <div key={i} className="h-16 rounded-2xl bg-muted animate-pulse" />)}
          </div>
        ) : loginHistory.length === 0 ? (
          <p className="text-muted-foreground text-sm font-medium text-center py-8">No login history yet</p>
        ) : (
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {loginHistory.map((log, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-muted/40 hover:bg-muted/70 transition-all">
                <div className="flex items-center gap-4">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${log.success ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
                    {log.success ? <CheckCircle size={16} className="text-emerald-500" /> : <AlertTriangle size={16} className="text-red-500" />}
                  </div>
                  <div>
                    <p className="font-bold text-card-foreground text-sm">{log.success ? 'Login successful' : 'Failed attempt'}</p>
                    <p className="text-xs text-muted-foreground font-medium">{log.browser} · {log.os} · {log.device}</p>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <p className="text-xs font-black text-card-foreground">{formatTime(log.createdAt)}</p>
                  <div className="flex items-center gap-1 justify-end mt-1">
                    <Globe size={10} className="text-muted-foreground" />
                    <p className="text-[10px] font-bold text-muted-foreground">{log.ip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* 2FA Setup Modal */}
      <AnimatePresence>
        {show2faSetup && qrCode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget) setShow2faSetup(false) }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-[2.5rem] border border-border p-8 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-card-foreground">Setup Google Authenticator</h3>
                <button onClick={() => setShow2faSetup(false)} className="p-2 rounded-xl bg-muted hover:bg-border transition-all text-muted-foreground">
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-5">
                <p className="text-sm text-muted-foreground font-medium">
                  1. Open <span className="font-black text-card-foreground">Google Authenticator</span> or <span className="font-black text-card-foreground">Authy</span> on your phone.
                </p>
                <p className="text-sm text-muted-foreground font-medium">
                  2. Tap <span className="font-black text-card-foreground">+</span> and scan this QR code:
                </p>

                <div className="flex justify-center p-4 bg-white rounded-2xl">
                  <img src={qrCode} alt="2FA QR Code" className="w-48 h-48" />
                </div>

                <div className="p-3 rounded-2xl bg-muted/50">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Manual Entry Key</p>
                  <p className="font-mono text-xs text-card-foreground break-all">{secret2fa}</p>
                </div>

                <p className="text-sm text-muted-foreground font-medium">
                  3. Enter the <span className="font-black text-card-foreground">6-digit code</span> from the app:
                </p>

                <input
                  type="text"
                  maxLength={6}
                  value={totpToken}
                  onChange={e => setTotpToken(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-5 py-4 rounded-2xl bg-muted border border-border outline-none font-mono font-black text-card-foreground text-center text-xl tracking-[0.5em] focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="000000"
                />

                <Button onClick={handle2FAVerify} disabled={loading2fa || totpToken.length < 6}
                  className="w-full py-3.5 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black shadow-lg shadow-primary/20">
                  {loading2fa ? 'Verifying...' : 'Verify & Enable 2FA'}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
