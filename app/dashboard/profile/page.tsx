'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Camera, Mail, Shield, Clock, User, BadgeCheck, Calendar, Activity } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const { t } = useLanguage()
  const [userProfile, setUserProfile] = useState<any>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

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
    const uploadToast = toast.loading('Uploading...')
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
        toast.success('Profile picture updated!', { id: uploadToast })
      } else {
        toast.error('Failed to update', { id: uploadToast })
      }
    } catch {
      toast.error('Upload failed', { id: uploadToast })
    } finally {
      setIsUploading(false)
    }
  }

  const stats = [
    { label: 'Role', value: userProfile?.role || 'Admin', icon: BadgeCheck, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Status', value: 'Active', icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Member Since', value: userProfile?.createdAt ? new Date(userProfile.createdAt).getFullYear().toString() : '2024', icon: Calendar, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Last Login', value: 'Today', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  ]

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-4xl font-black text-card-foreground tracking-tighter">{t('View Profile')}</h1>
        <p className="text-muted-foreground font-medium text-lg mt-1">{t('Your personal account information')}</p>
      </div>

      {/* Profile Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-[3rem] border border-border overflow-hidden shadow-sm"
      >
        {/* Banner */}
        <div className="h-44 bg-gradient-to-br from-primary via-primary/70 to-blue-400 relative">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Ccircle cx='20' cy='20' r='3'/%3E%3C/g%3E%3C/svg%3E")` }}
          />
        </div>

        {/* Profile Info */}
        <div className="px-10 pb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 -mt-16">
            {/* Avatar */}
            <div className="flex items-end gap-6">
              <div className="relative group shrink-0">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-32 h-32 rounded-[2rem] border-4 border-card shadow-2xl overflow-hidden cursor-pointer"
                >
                  {isUploading ? (
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-black text-sm animate-pulse">...</span>
                    </div>
                  ) : userProfile?.profilePic ? (
                    <img src={userProfile.profilePic} className="w-full h-full object-cover" alt="Profile" />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <User size={40} className="text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all gap-1">
                    <Camera size={20} className="text-white" />
                    <span className="text-white text-[10px] font-black uppercase tracking-widest">Change</span>
                  </div>
                </div>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-2 -right-2 w-9 h-9 bg-primary rounded-full border-2 border-card flex items-center justify-center hover:bg-primary/90 transition-all"
                >
                  <Camera size={14} className="text-primary-foreground" />
                </button>
              </div>

              <div className="mb-2">
                <h2 className="text-2xl font-black text-card-foreground tracking-tight">
                  {userProfile?.name || 'Administrator'}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <BadgeCheck size={14} className="text-primary" />
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                    {userProfile?.role || 'Super Admin'}
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={() => window.location.href = '/dashboard/settings'}
              className="mb-2 h-12 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black shadow-lg shadow-primary/20"
            >
              Edit in Settings
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
            className="bg-card rounded-[2rem] border border-border p-6 flex items-center gap-4"
          >
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center shrink-0`}>
              <stat.icon size={20} className={stat.color} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{stat.label}</p>
              <p className="text-lg font-black text-card-foreground mt-0.5">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-[2.5rem] border border-border p-8 space-y-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
              <User size={18} className="text-primary" />
            </div>
            <h3 className="font-black text-card-foreground">Account Details</h3>
          </div>

          {[
            { label: 'Full Name', value: userProfile?.name || '—', icon: User },
            { label: 'Email', value: userProfile?.email || '—', icon: Mail },
            { label: 'Role', value: userProfile?.role || '—', icon: Shield },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-muted/50">
              <item.icon size={16} className="text-muted-foreground shrink-0" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{item.label}</p>
                <p className="font-bold text-card-foreground text-sm mt-0.5">{item.value}</p>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-card rounded-[2.5rem] border border-border p-8 space-y-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Activity size={18} className="text-primary" />
            </div>
            <h3 className="font-black text-card-foreground">Activity Overview</h3>
          </div>

          {[
            { label: 'Total Logins', value: '142' },
            { label: 'Reports Generated', value: '38' },
            { label: 'Patients Handled', value: '204' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-muted/50">
              <p className="text-sm font-bold text-muted-foreground">{item.label}</p>
              <p className="font-black text-card-foreground">{item.value}</p>
            </div>
          ))}
        </motion.div>
      </div>

    </div>
  )
}
