'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Phone, GraduationCap, MoreHorizontal, Trash2, CalendarDays } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface DoctorCardProps {
  doctor: any
  index: number
  onDelete?: () => void
  onSchedule?: () => void
}

export default function DoctorCard({ doctor, index, onDelete, onSchedule }: DoctorCardProps) {
  const { t } = useLanguage()
  const profile = doctor.doctorProfile || {}

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
      <Card className="p-0 border-border rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-zinc-200/50 transition-all duration-500 relative group">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div className="relative">
              <img src={doctor.profilePic || `https://i.pravatar.cc/150?u=${doctor.id}`} alt={doctor.name} className="w-20 h-20 rounded-2xl object-cover border-4 border-card shadow-xl" />
              <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-card ${profile.isActive ? 'bg-emerald-500' : 'bg-zinc-400'}`} />
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
                {profile.specialty || 'General'}
              </Badge>
              <span className="text-[10px] font-black text-muted-foreground/70 uppercase tracking-widest">{doctor.id.slice(-6)}</span>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <h3 className="text-2xl font-black text-card-foreground tracking-tight leading-none">{doctor.name}</h3>
            <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground">
              <div className="flex items-center gap-1"><GraduationCap size={14} className="text-primary" /> {profile.experience || 'NEW'}</div>
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-200" />
              <div className="flex items-center gap-1 text-card-foreground">★ 5.0</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted rounded-2xl p-4 text-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 mb-1">{t('Department')}</p>
              <p className="text-sm font-black text-card-foreground truncate">{profile.department || 'General'}</p>
            </div>
            <div className="bg-muted rounded-2xl p-4 text-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 mb-1">{t('Fee')}</p>
              <p className="text-sm font-black text-card-foreground">৳{profile.fee || 500}</p>
            </div>
          </div>
        </div>

        <div className="px-8 pb-8 pt-4 flex flex-col gap-3 border-t border-border/50 bg-muted/30">
          <div className="flex gap-3 w-full">
            <button 
                onClick={onSchedule}
                className="flex-grow h-12 rounded-xl bg-card border border-border hover:bg-muted flex items-center justify-center text-muted-foreground transition-all font-bold text-sm gap-2"
            >
                <CalendarDays size={16} /> {t('Manage Profile')}
            </button>
            <button 
                onClick={onDelete}
                className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center text-red-500/70 hover:text-red-500 hover:bg-red-50 transition-all"
            >
                <Trash2 size={18} />
            </button>
          </div>
          <a
            href={`/doctors/${doctor.id}`}
            target="_blank"
            className="w-full h-12 rounded-xl bg-[#0a1b4d] text-white flex items-center justify-center font-black text-sm gap-2 hover:scale-[1.02] transition-all shadow-lg shadow-[#0a1b4d]/20"
          >
            {t('View Live Profile')}
          </a>
        </div>
      </Card>
    </motion.div>
  )
}


