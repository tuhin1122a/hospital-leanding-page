'use client'

import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { Camera } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface SettingsHeroProps {
  user: any
  isUploading: boolean
  onFileSelect: (file: File) => void
}

export default function SettingsHero({ user, isUploading, onFileSelect }: SettingsHeroProps) {
  const { t } = useLanguage(); const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
      <div className="h-36 bg-gradient-to-r from-primary via-primary/80 to-accent relative"><div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} /></div>
      <div className="px-10 pb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 -mt-16">
          <div className="flex items-end gap-6">
            <div className="relative group shrink-0">
              <div onClick={() => !isUploading && fileInputRef.current?.click()} className="w-32 h-32 rounded-xl border-4 border-card shadow-2xl overflow-hidden cursor-pointer relative bg-muted">
                {isUploading ? <div className="w-full h-full flex items-center justify-center bg-primary/10"><span className="text-primary font-black text-sm animate-pulse">...</span></div> : <img src={user?.profilePic || "https://i.pravatar.cc/150?u=admin"} className="w-full h-full object-cover" alt="" />}
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all gap-1"><Camera size={20} className="text-white" /><span className="text-white text-[10px] font-black uppercase tracking-widest">{t('Update')}</span></div>
              </div>
              <input type="file" ref={fileInputRef} onChange={(e) => e.target.files?.[0] && onFileSelect(e.target.files[0])} className="hidden" accept="image/*" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-2 border-card flex items-center justify-center"><div className="w-2.5 h-2.5 bg-white rounded-full" /></div>
            </div>
            <div className="mb-2"><h2 className="text-2xl font-black text-card-foreground tracking-tight">{user?.name || 'Administrator'}</h2><p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mt-1">{user?.role || 'Super Admin'} · Nurjahan Hospital</p></div>
          </div>
          <div className="flex items-center gap-6 mb-2">
            {[{ label: t('Role'), value: user?.role || 'Admin' }, { label: t('Status'), value: t('Active') }, { label: t('Since'), value: '2024' }].map((s, i) => (
              <div key={i} className="text-center"><p className="text-lg font-black text-card-foreground">{s.value}</p><p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{s.label}</p></div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
