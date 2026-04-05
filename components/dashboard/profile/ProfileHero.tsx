'use client'

import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { Camera, User, BadgeCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'

interface ProfileHeroProps {
  user: any
  isUploading: boolean
  onFileSelect: (file: File) => void
}

export default function ProfileHero({ user, isUploading, onFileSelect }: ProfileHeroProps) {
  const { t } = useLanguage(); const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-[3rem] border border-border overflow-hidden shadow-sm">
      <div className="h-44 bg-gradient-to-br from-primary via-primary/70 to-blue-400 relative">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Ccircle cx='20' cy='20' r='3'/%3E%3C/g%3E%3C/svg%3E")` }} />
      </div>
      <div className="px-10 pb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 -mt-16">
          <div className="flex items-end gap-6">
            <div className="relative group shrink-0">
              <div onClick={() => !isUploading && fileInputRef.current?.click()} className="w-32 h-32 rounded-[2.5rem] border-4 border-card shadow-2xl overflow-hidden cursor-pointer bg-muted">
                {isUploading ? <div className="w-full h-full flex items-center justify-center bg-primary/10"><span className="text-primary font-black text-xs animate-pulse">...</span></div> : user?.profilePic ? <img src={user.profilePic} className="w-full h-full object-cover" alt="" /> : <div className="w-full h-full flex items-center justify-center"><User size={40} className="text-muted-foreground" /></div>}
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all gap-1"><Camera size={20} className="text-white" /><span className="text-white text-[10px] font-black uppercase tracking-widest">{t('Change')}</span></div>
              </div>
              <input type="file" ref={fileInputRef} onChange={(e) => e.target.files?.[0] && onFileSelect(e.target.files[0])} className="hidden" accept="image/*" />
              <button onClick={() => fileInputRef.current?.click()} className="absolute -bottom-2 -right-2 w-9 h-9 bg-primary rounded-full border-2 border-card flex items-center justify-center hover:bg-primary/90 transition-all"><Camera size={14} className="text-primary-foreground" /></button>
            </div>
            <div className="mb-2"><h2 className="text-3xl font-black text-card-foreground tracking-tighter">{user?.name || 'Administrator'}</h2><div className="flex items-center gap-2 mt-1"><BadgeCheck size={16} className="text-primary" /><p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{user?.role || 'Super Admin'}</p></div></div>
          </div>
          <Button onClick={() => window.location.href = '/dashboard/settings'} className="mb-2 h-12 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black shadow-lg shadow-primary/20">{t('Edit Account')}</Button>
        </div>
      </div>
    </motion.div>
  )
}
