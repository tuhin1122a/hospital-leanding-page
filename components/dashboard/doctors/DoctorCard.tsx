'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Phone, GraduationCap, MoreHorizontal } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface DoctorCardProps {
  doctor: any
  index: number
}

export default function DoctorCard({ doctor, index }: DoctorCardProps) {
  const { t } = useLanguage()

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
      <Card className="p-0 border-border rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-zinc-200/50 transition-all duration-500 relative group">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div className="relative">
              <img src={doctor.image} alt={doctor.name} className="w-20 h-20 rounded-2xl object-cover border-4 border-card shadow-xl" />
              <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-card ${doctor.status === 'On Duty' ? 'bg-emerald-500' : 'bg-zinc-400'}`} />
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
                {doctor.specialty}
              </Badge>
              <span className="text-[10px] font-black text-muted-foreground/70 uppercase tracking-widest">{doctor.id}</span>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <h3 className="text-2xl font-black text-card-foreground tracking-tight leading-none">{doctor.name}</h3>
            <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground">
              <div className="flex items-center gap-1"><GraduationCap size={14} className="text-primary" /> {doctor.experience}</div>
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-200" />
              <div className="flex items-center gap-1 text-card-foreground">★ {doctor.rating}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted rounded-2xl p-4 text-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 mb-1">{t('Patients')}</p>
              <p className="text-xl font-black text-card-foreground">1.2k+</p>
            </div>
            <div className="bg-muted rounded-2xl p-4 text-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 mb-1">{t('Today')}</p>
              <p className="text-xl font-black text-card-foreground">{doctor.appointments}</p>
            </div>
          </div>
        </div>

        <div className="px-8 pb-8 pt-4 flex items-center gap-3 border-t border-border/50 bg-muted/30">
          <button className="flex-grow h-12 rounded-xl bg-card border border-border hover:bg-muted flex items-center justify-center text-muted-foreground transition-all font-bold text-sm gap-2">
             <Phone size={16} /> {t('Contact')}
          </button>
          <button className="flex-grow h-12 rounded-xl bg-primary text-background hover:bg-primary/90 flex items-center justify-center transition-all font-bold text-sm gap-2 shadow-lg shadow-primary/20">
             {t('Schedule')}
          </button>
          <button className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground/70 hover:text-muted-foreground hover:bg-muted transition-all">
            <MoreHorizontal size={18} />
          </button>
        </div>
      </Card>
    </motion.div>
  )
}
