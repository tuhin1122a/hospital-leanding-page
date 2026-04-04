'use client'

import { useState, useEffect } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, ChevronDown, LogOut, Search, User } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Topbar() {
  const [userProfile, setUserProfile] = useState<any>(null)
  const { t } = useLanguage()

  const fetchProfile = async () => {
    const lsToken = localStorage.getItem('accessToken')
    const ssToken = sessionStorage.getItem('accessToken')
    const token = lsToken || ssToken
    if (!token) return
    try {
      const res = await fetch('http://localhost:5000/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setUserProfile(data)
      }
    } catch (err) {
      console.error("Failed to fetch profile", err)
    }
  }

  const handleLogout = async () => {
    const lsToken = localStorage.getItem('accessToken')
    const ssToken = sessionStorage.getItem('accessToken')
    const token = lsToken || ssToken
    try {
      if (token) {
        await fetch('http://localhost:5000/auth/logout', {
          headers: { Authorization: `Bearer ${token}` }
        })
      }
    } catch (err) {
      console.error('Logout request failed', err)
    } finally {
      // Remember Me যেটাই হোক — দুটো storage-ই clear করো
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      sessionStorage.removeItem('accessToken')
      sessionStorage.removeItem('refreshToken')
      window.location.href = '/login'
    }
  }

  useEffect(() => {
    fetchProfile()
    const handleProfileUpdated = () => fetchProfile()
    window.addEventListener('profileUpdated', handleProfileUpdated)
    return () => window.removeEventListener('profileUpdated', handleProfileUpdated)
  }, [])

  return (
    <div className="h-20 bg-card border-b border-border px-8 flex items-center justify-between sticky top-0 z-40 shadow-sm">
      {/* Search */}
      <div className="flex items-center gap-4 bg-muted px-4 py-2.5 rounded-2xl w-96 border border-border transition-all focus-within:bg-card focus-within:ring-2 focus-within:ring-primary/10">
        <Search size={18} className="text-muted-foreground" />
        <input
          type="text"
          placeholder={t("Search patient, record, appointment...")}
          className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground font-medium text-card-foreground"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative p-2.5 rounded-xl bg-muted hover:bg-border transition-all group">
          <Bell size={20} className="text-muted-foreground group-hover:text-primary" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-card"></span>
        </button>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 outline-none group hover:bg-muted p-1.5 rounded-2xl transition-all">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all overflow-hidden relative">
              {userProfile?.profilePic ? (
                <img src={userProfile.profilePic} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User size={20} />
              )}
            </div>
            <div className="text-left hidden lg:block">
              <p className="text-sm font-black text-card-foreground leading-none">
                {userProfile?.name || 'Admin'}
              </p>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">
                {t(userProfile?.role || 'Super Admin')}
              </p>
            </div>
            <ChevronDown size={14} className="text-muted-foreground" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56 rounded-xl border-border shadow-xl">
            <DropdownMenuLabel>{t('Account Settings')}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="font-bold p-3 cursor-pointer">
              <a href="/dashboard/profile">{t('View Profile')}</a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="font-bold p-3 cursor-pointer">
              <a href="/dashboard/account-security">{t('Account Security')}</a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="font-bold p-3 text-red-500 cursor-pointer focus:text-red-500 focus:bg-red-50 dark:focus:bg-red-950/30 flex items-center gap-2"
            >
              <LogOut size={14} />
              {t('Sign Out')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
