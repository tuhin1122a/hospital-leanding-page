'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Hotel, Stethoscope, Users, Activity, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface DepartmentCardProps {
  unit: any
  index: number
}

export default function DepartmentCard({ unit, index }: DepartmentCardProps) {
  const { t } = useLanguage()

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.05 }}>
      <Card className="p-8 border-border rounded-2xl shadow-sm hover:shadow-2xl hover:shadow-zinc-200/50 transition-all duration-500 group cursor-pointer overflow-hidden relative">
        <div className="flex justify-between items-start mb-10">
           <div className={`p-5 rounded-xl transition-transform duration-500 group-hover:scale-110 ${unit.bg} ${unit.color}`}>
              <Hotel size={32} />
           </div>
           <Badge className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-none ${
             unit.status === 'Active' ? 'bg-emerald-500 text-background' : unit.status === 'Critical Load' ? 'bg-red-500 text-background' : 'bg-zinc-400 text-background'
           }`}>
             {unit.status}
           </Badge>
        </div>

        <div className="space-y-2 mb-8">
           <h3 className="text-3xl font-black text-card-foreground tracking-tighter">{unit.name}</h3>
           <p className="text-sm font-bold text-muted-foreground/70 flex items-center gap-2">
              <Stethoscope size={14} className="text-primary" />
              H.O.D: {unit.head}
           </p>
        </div>

        <div className="grid grid-cols-3 gap-4 py-6 border-y border-border/50 mb-8">
           <div className="text-center">
              <div className="flex justify-center mb-1 text-muted-foreground/70"><Users size={16} /></div>
              <p className="text-lg font-black text-card-foreground">{unit.doctors}</p>
              <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground/70">{t('Doctors')}</p>
           </div>
           <div className="text-center">
              <div className="flex justify-center mb-1 text-muted-foreground/70"><Activity size={16} /></div>
              <p className="text-lg font-black text-card-foreground">{unit.capacity}</p>
              <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground/70">{t('Capacity')}</p>
           </div>
           <div className="text-center">
              <div className="flex justify-center mb-1 text-muted-foreground/70"><Users size={16} /></div>
              <p className="text-lg font-black text-card-foreground">{unit.patients}</p>
              <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground/70">{t('Patients')}</p>
           </div>
        </div>

        <button className="w-full h-14 rounded-2xl bg-muted group-hover:bg-primary group-hover:text-background flex items-center justify-center font-black text-sm transition-all gap-2 group/btn">
           {t('Manage Resources')}
           <ChevronRight size={18} className="translate-x-0 group-hover/btn:translate-x-1 transition-transform" />
        </button>

        <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20 -z-0 ${unit.bg}`} />
      </Card>
    </motion.div>
  )
}
