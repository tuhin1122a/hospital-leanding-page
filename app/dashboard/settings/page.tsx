'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import {
    Bell,
    Camera,
    ChevronRight,
    Computer,
    CreditCard,
    Database,
    Globe,
    Lock,
    Palette,
    Shield,
    Sparkles,
    User,
    Zap,
    Users,
    Search,
    Trash2,
    ShieldCheck,
    Mail
} from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTheme } from '@/contexts/ThemeContext'
import { motion, AnimatePresence } from 'framer-motion'

const themes = [
  { id: 'light', label: 'Blue', color: '#0066FF', bg: 'bg-blue-500' },
  { id: 'emerald', label: 'Emerald', color: '#10B981', bg: 'bg-emerald-500' },
  { id: 'rose', label: 'Rose', color: '#E11D48', bg: 'bg-rose-500' },
  { id: 'amber', label: 'Amber', color: '#F59E0B', bg: 'bg-amber-500' },
  { id: 'dark', label: 'Dark', color: '#18181B', bg: 'bg-zinc-950' },
]

const sections = [
  { icon: Bell, label: 'Notifications', desc: 'Email, SMS, push alerts', color: 'from-purple-500 to-violet-600', shadow: 'shadow-purple-200' },
  { icon: Zap, label: 'Integrations', desc: 'Connect third-party apps', color: 'from-amber-400 to-orange-500', shadow: 'shadow-amber-200' },
  { icon: Database, label: 'Data & Backup', desc: 'Export and storage config', color: 'from-emerald-400 to-teal-500', shadow: 'shadow-emerald-200' },
  { icon: CreditCard, label: 'Billing', desc: 'Subscription & payments', color: 'from-pink-400 to-rose-500', shadow: 'shadow-pink-200' },
  { icon: Shield, label: 'API Keys', desc: 'Developer access & webhooks', color: 'from-blue-400 to-indigo-500', shadow: 'shadow-blue-200' },
  { icon: Lock, label: 'Security', desc: 'Password & 2FA settings', color: 'from-red-400 to-rose-600', shadow: 'shadow-red-200' },
  { icon: Users, label: 'Access Control', desc: 'Manage staff permissions', color: 'from-indigo-500 to-blue-600', shadow: 'shadow-indigo-200' },
]

export default function SettingsPage() {
  const { t, lang, setLang } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [userProfile, setUserProfile] = useState<any>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const accessRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const lsToken = localStorage.getItem('accessToken')
    const ssToken = sessionStorage.getItem('accessToken')
    const token = lsToken || ssToken
    if (token) {
      fetch('http://localhost:5000/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => setUserProfile(data))
      .catch(err => console.error(err))
    }
  }, [])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const lsToken = localStorage.getItem('accessToken')
    const ssToken = sessionStorage.getItem('accessToken')
    const token = lsToken || ssToken
    if (!token) return
    const formData = new FormData()
    formData.append('file', file)
    setIsUploading(true)
    const uploadToast = toast.loading('Uploading profile picture...')
    try {
      const res = await fetch('http://localhost:5000/users/profile-pic', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      })
      if (res.ok) {
        const updatedUser = await res.json()
        setUserProfile(updatedUser)
        window.dispatchEvent(new Event('profileUpdated'))
        toast.success("Profile picture updated!", { id: uploadToast })
      } else {
        toast.error('Failed to update picture', { id: uploadToast })
      }
    } catch (err) {
      toast.error('Upload failed', { id: uploadToast })
    } finally {
      setIsUploading(false)
    }
  }

  // ─── Access Control State ───
  const [allUsers, setAllUsers] = useState<any[]>([])
  const [isLoadingUsers, setIsLoadingUsers] = useState(false)
  const [accessSearch, setAccessSearch] = useState('')
  const [showAccessControl, setShowAccessControl] = useState(false)

  const fetchAllUsers = async () => {
    setIsLoadingUsers(true)
    const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
    try {
      const res = await fetch('http://localhost:5000/users', {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setAllUsers(data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoadingUsers(false)
    }
  }

  const handleUpdatePerm = async (id: string, current: string[], perm: string) => {
    const updated = current.includes(perm) 
      ? current.filter(p => p !== perm) 
      : [...current, perm]
    if (updated.length > 0 && !updated.includes('READ')) updated.push('READ')
    
    const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
    try {
      const res = await fetch(`http://localhost:5000/users/${id}/permissions`, {
        method: 'POST',
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ permissions: updated })
      })
      if (res.ok) {
        toast.success('Access updated')
        fetchAllUsers()
      }
    } catch (err) {
      toast.error('Failed to update')
    }
  }

  const handleDeleteUser = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return
    const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
    try {
      const res = await fetch(`http://localhost:5000/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.ok) {
        toast.success('User deleted')
        fetchAllUsers()
      }
    } catch {
      toast.error('Network error')
    }
  }

  const roleMatch = userProfile?.role?.toUpperCase() === 'ADMIN' || userProfile?.role === 'Super Admin'
  
  useEffect(() => {
    if (roleMatch) {
      fetchAllUsers()
    }
  }, [userProfile, roleMatch])

  return (
    <div className="max-w-6xl mx-auto space-y-10">

      {/* ─── Page Header ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-card-foreground tracking-tighter">{t('System Settings')}</h1>
          <p className="text-muted-foreground font-medium text-lg mt-1">{t('Configure your clinical environment and user preferences')}</p>
        </div>
        <Button className="h-14 px-10 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black shadow-xl shadow-primary/20 transition-all">
          <Sparkles size={18} className="mr-2" /> {t('Save Changes')}
        </Button>
      </div>

      {/* ─── Profile Hero Card ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-[3rem] border border-border overflow-hidden shadow-sm"
      >
        {/* Banner */}
        <div className="h-36 bg-gradient-to-r from-primary via-primary/80 to-accent relative">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        {/* Profile Row */}
        <div className="px-10 pb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 -mt-16">
            <div className="flex items-end gap-6">
              {/* Avatar */}
              <div className="relative group shrink-0">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-32 h-32 rounded-[2rem] border-4 border-card shadow-2xl overflow-hidden cursor-pointer relative"
                >
                  {isUploading ? (
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-black text-sm animate-pulse">...</span>
                    </div>
                  ) : (
                    <img
                      src={userProfile?.profilePic || "https://i.pravatar.cc/150?u=admin"}
                      className="w-full h-full object-cover"
                      alt="Profile"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all gap-1">
                    <Camera size={20} className="text-white" />
                    <span className="text-white text-[10px] font-black uppercase tracking-widest">{t('Update')}</span>
                  </div>
                </div>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-2 border-card flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-white rounded-full" />
                </div>
              </div>

              {/* Name & Role */}
              <div className="mb-2">
                <h2 className="text-2xl font-black text-card-foreground tracking-tight">
                  {userProfile?.name || 'Administrator'}
                </h2>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mt-1">
                  {userProfile?.role || 'Super Admin'} · Nurjahan Hospital
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 mb-2">
              {[
                { label: 'Role', value: userProfile?.role || 'Admin' },
                { label: 'Status', value: 'Active' },
                { label: 'Since', value: '2024' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-lg font-black text-card-foreground">{stat.value}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── Preferences Grid ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Profile Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-[2.5rem] border border-border p-8 space-y-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
              <User size={18} className="text-primary" />
            </div>
            <div>
              <h3 className="font-black text-card-foreground">{t('Profile Information')}</h3>
              <p className="text-xs text-muted-foreground font-medium">{t('Your basic account details')}</p>
            </div>
          </div>

          {[
            { label: t('Full Name'), value: userProfile?.name || '', type: 'text' },
            { label: t('Email Address'), value: userProfile?.email || '', type: 'email' },
          ].map((field, i) => (
            <div key={i} className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{field.label}</label>
              <input
                type={field.type}
                value={field.value}
                readOnly
                className="w-full h-13 px-5 py-3.5 rounded-2xl bg-muted border border-border outline-none font-bold text-card-foreground text-sm cursor-not-allowed opacity-80"
              />
            </div>
          ))}
        </motion.div>

        {/* Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-card rounded-[2.5rem] border border-border p-8 space-y-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Globe size={18} className="text-primary" />
            </div>
            <div>
              <h3 className="font-black text-card-foreground">{t('Preferences')}</h3>
              <p className="text-xs text-muted-foreground font-medium">{t('Language, timezone & region')}</p>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t('Language')}</label>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as 'en' | 'bn')}
              className="w-full h-13 px-5 py-3.5 rounded-2xl bg-muted border border-border outline-none font-bold text-card-foreground text-sm"
            >
              <option value="en">{t('English (US)')}</option>
              <option value="bn">{t('Bengali')}</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t('Timezone')}</label>
            <select className="w-full h-13 px-5 py-3.5 rounded-2xl bg-muted border border-border outline-none font-bold text-card-foreground text-sm">
              <option>Dhaka (GMT+6)</option>
              <option>London (GMT+0)</option>
              <option>New York (GMT-5)</option>
            </select>
          </div>
        </motion.div>
      </div>

      {/* ─── Theme Picker ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-[2.5rem] border border-border p-8"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Palette size={18} className="text-primary" />
          </div>
          <div>
            <h3 className="font-black text-card-foreground">{t('Theme & Appearance')}</h3>
            <p className="text-xs text-muted-foreground font-medium">{t('Choose your preferred color palette')}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {themes.map((th) => (
            <button
              key={th.id}
              onClick={() => setTheme(th.id as any)}
              className={`relative flex flex-col items-center gap-3 p-5 rounded-[1.5rem] border-2 transition-all duration-300 group ${
                theme === th.id
                  ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                  : 'border-border bg-muted/50 hover:border-primary/40 hover:bg-muted'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl ${th.bg} shadow-lg`} />
              <span className="text-xs font-black text-card-foreground tracking-tight">{t(th.label) || th.label}</span>
              {theme === th.id && (
                <div className="absolute top-3 right-3 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                </div>
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ─── Settings Modules ─── */}
      <div>
        <h3 className="text-xl font-black text-card-foreground tracking-tight mb-6">{t('Settings Modules')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sections.filter(s => s.label !== 'Access Control' || roleMatch).map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i + 0.25 }}
            >
              <div 
                onClick={() => {
                  if (section.label === 'Access Control') {
                    setShowAccessControl(!showAccessControl)
                    setTimeout(() => accessRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
                  }
                }}
                className={`bg-card border border-border rounded-[2rem] p-6 group cursor-pointer hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 flex items-center gap-5 ${
                  section.label === 'Access Control' && showAccessControl ? 'ring-2 ring-primary bg-primary/5' : ''
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${section.color} flex items-center justify-center shadow-lg ${section.shadow} shrink-0`}>
                  <section.icon size={22} className="text-white" />
                </div>
                <div className="flex-grow">
                  <h4 className="font-black text-card-foreground text-sm">{t(section.label) || section.label}</h4>
                  <p className="text-xs text-muted-foreground font-medium mt-0.5">{t(section.desc) || section.desc}</p>
                </div>
                <ChevronRight size={18} className={`text-muted-foreground group-hover:text-primary transition-all duration-300 ${
                  section.label === 'Access Control' && showAccessControl ? 'rotate-90 text-primary' : 'group-hover:translate-x-1'
                }`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ─── Access Control Section (Super Admin Only) ─── */}
      <AnimatePresence>
        {roleMatch && showAccessControl && (
          <motion.div
            ref={accessRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="bg-card rounded-[3rem] border border-border overflow-hidden shadow-sm"
          >
          <div className="p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 shadow-xl shadow-indigo-500/5">
                  <ShieldCheck size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-card-foreground tracking-tighter">{t('Staff Access Control')}</h3>
                  <p className="text-sm font-medium text-muted-foreground">{t('Manage granular permissions for all users')}</p>
                </div>
              </div>
              <div className="relative w-full md:w-80">
                <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground/60" />
                <input 
                  type="text"
                  placeholder={t('Search staff...')}
                  value={accessSearch}
                  onChange={e => setAccessSearch(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 rounded-xl bg-muted border border-border focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-sm"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50 text-left">
                    <th className="pb-4 px-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t('User')}</th>
                    <th className="pb-4 px-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t('Role')}</th>
                    <th className="pb-4 px-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">{t('Permissions')}</th>
                    <th className="pb-4 px-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">{t('Action')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {allUsers.filter(u => u.name?.toLowerCase().includes(accessSearch.toLowerCase())).map((u) => (
                    <tr key={u.id} className="group hover:bg-muted/30 transition-colors">
                      <td className="py-5 px-2">
                        <div className="flex items-center gap-3">
                          <img src={u.profilePic || "https://i.pravatar.cc/150?u="+u.id} className="w-10 h-10 rounded-xl object-cover shadow-sm" />
                          <div>
                            <p className="text-sm font-black text-card-foreground leading-none">{u.name}</p>
                            <p className="text-[10px] font-bold text-muted-foreground mt-1 lowercase">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 px-2">
                        <Badge variant="outline" className="bg-muted border-border text-primary font-black text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full">
                          {u.role}
                        </Badge>
                      </td>
                      <td className="py-5 px-2">
                        <div className="flex items-center justify-center gap-4">
                          {['READ', 'EDIT', 'DELETE'].map(p => {
                            const has = (u.permissions || []).includes(p)
                            return (
                              <button
                                key={p}
                                onClick={() => handleUpdatePerm(u.id, u.permissions || [], p)}
                                className={`flex flex-col items-center gap-1.5 transition-all group/perm`}
                              >
                                <span className={`text-[12px] font-black uppercase tracking-wider transition-colors ${
                                  has ? 'text-primary' : 'text-zinc-500 dark:text-zinc-400 group-hover/perm:text-zinc-800 dark:group-hover/perm:text-zinc-200'
                                }`}>{t(p)}</span>
                                <div className={`w-14 h-2.5 rounded-full transition-all ${
                                  has ? 'bg-primary shadow-[0_0_12px_rgba(var(--primary),0.6)]' : 'bg-muted-foreground/30'
                                }`} />
                              </button>
                            )
                          })}
                        </div>
                      </td>
                      <td className="py-5 px-2 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleDeleteUser(u.id, u.name)}
                            className="p-2.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                          >
                            <Trash2 size={16} />
                          </button>
                          <button className="p-2.5 rounded-xl bg-muted text-muted-foreground hover:bg-border transition-all">
                            <ChevronRight size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {allUsers.length === 0 && !isLoadingUsers && (
                    <tr>
                      <td colSpan={4} className="py-20 text-center text-muted-foreground font-bold italic">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
            </motion.div>
          )}
        </AnimatePresence>

    </div>
  )
}
