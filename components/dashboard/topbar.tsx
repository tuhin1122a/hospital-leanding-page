'use client'

import { useState, useEffect, useRef } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, ChevronDown, Search, User, Upload } from 'lucide-react'
import toast from 'react-hot-toast'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Topbar({ role, setRole }: { role: string, setRole: (role: string) => void }) {
  const [userProfile, setUserProfile] = useState<any>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('accessToken')
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
    fetchProfile()
  }, [])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const token = localStorage.getItem('accessToken')
    if (!token) {
      toast.error("Please login first")
      return
    }

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
        toast.success("Profile picture updated successfully!", { id: uploadToast })
      } else {
        toast.error('Failed to update picture', { id: uploadToast })
      }
    } catch (err) {
      console.error(err)
      toast.error("Upload failed", { id: uploadToast })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="h-20 bg-card dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-8 flex items-center justify-between sticky top-0 z-40 shadow-sm">
      <div className="flex items-center gap-4 bg-slate-100 dark:bg-slate-700 px-4 py-2.5 rounded-2xl w-96 border border-slate-200 dark:border-slate-600 transition-all focus-within:bg-card dark:focus-within:bg-slate-800 focus-within:ring-2 focus-within:ring-primary/10">
        <Search size={18} className="text-slate-400 dark:text-slate-500" />
        <input 
          type="text" 
          placeholder={t("Search patient, record, appointment...")} 
          className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-400 dark:placeholder:text-slate-500 dark:text-background font-medium"
        />
      </div>

      <div className="flex items-center gap-6">
        {/* Role Switcher for Demo */}
        <div className="flex items-center gap-2 pr-6 border-r border-slate-200 dark:border-slate-700">
           <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{t('Current Role:')}</span>
           <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-lg font-bold text-xs uppercase tracking-tight outline-none">
              {role}
              <ChevronDown size={14} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-xl border-slate-200 shadow-xl">
              <DropdownMenuLabel>{t('Select Demo Role')}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setRole('admin')} className="font-bold cursor-pointer">{t('Administrator')}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRole('doctor')} className="font-bold cursor-pointer">{t('Doctor View')}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRole('receptionist')} className="font-bold cursor-pointer">{t('Receptionist View')}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <button className="relative p-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all group">
          <Bell size={20} className="text-slate-600 dark:text-slate-300 group-hover:text-primary" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-card dark:border-slate-800"></span>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 outline-none group hover:bg-slate-100 dark:hover:bg-slate-700 p-1.5 rounded-2xl transition-all">
            <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-600 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:bg-primary group-hover:text-background transition-all overflow-hidden relative">
              {isUploading ? (
                <span className="text-[10px] font-bold animate-pulse">...</span>
              ) : userProfile?.profilePic ? (
                <img src={userProfile.profilePic} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User size={20} />
              )}
            </div>
            <div className="text-left hidden lg:block">
              <p className="text-sm font-black text-slate-900 dark:text-background leading-none">
                {userProfile?.name || 'John Doe'}
              </p>
              <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">
                {t(userProfile?.role || 'Super Admin')}
              </p>
            </div>
            <ChevronDown size={14} className="text-slate-400 dark:text-slate-500" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-xl border-slate-200 shadow-xl">
             <DropdownMenuLabel>{t('Account Settings')}</DropdownMenuLabel>
             <DropdownMenuSeparator />
             <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
             <DropdownMenuItem onClick={() => fileInputRef.current?.click()} className="font-bold p-3 cursor-pointer flex items-center gap-2">
               <Upload size={14} /> {t('Update Profile Pic')}
             </DropdownMenuItem>
             <DropdownMenuItem className="font-bold p-3">{t('View Profile')}</DropdownMenuItem>
             <DropdownMenuItem className="font-bold p-3">{t('Account Security')}</DropdownMenuItem>
             <DropdownMenuSeparator />
             <DropdownMenuItem className="font-bold p-3 text-red-500 cursor-pointer">
               <a href="/login">{t('Sign Out')}</a>
             </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
