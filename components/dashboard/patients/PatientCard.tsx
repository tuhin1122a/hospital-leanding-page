'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Phone, MapPin, Activity, MoreVertical } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface PatientCardProps {
  patient: any
  index: number
  onClick: () => void
}

export default function PatientCard({ patient, index, onClick }: PatientCardProps) {
  const { t } = useLanguage()

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
      <Card onClick={onClick} className="group relative bg-card rounded-[3rem] border border-border p-8 hover:shadow-2xl hover:shadow-zinc-200/50 transition-all duration-500 cursor-pointer overflow-hidden">
        <div className="flex justify-between items-start mb-6">
          <div className="w-16 h-16 rounded-[1.5rem] bg-muted border border-border flex items-center justify-center text-primary font-black text-2xl group-hover:bg-primary group-hover:text-background transition-all">{patient.name[0]}</div>
          <div className="flex flex-col items-end gap-2">
            <Badge className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-none shadow-sm bg-primary text-background">{patient.admissions?.length > 0 ? 'Inpatient' : 'Outpatient'}</Badge>
            <span className="text-[10px] font-black text-muted-foreground/70 uppercase tracking-widest">{patient.patientId}</span>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-black text-card-foreground tracking-tight mb-2">{patient.name}</h3>
          <div className="flex items-center gap-4 text-muted-foreground font-bold text-sm">
            <span>{patient.age} Years</span><span className="w-1.5 h-1.5 rounded-full bg-zinc-200" /><span>{patient.gender}</span><span className="w-1.5 h-1.5 rounded-full bg-zinc-200" /><span className="text-primary">{patient.bloodGroup}</span>
          </div>
        </div>

        <div className="space-y-3 mb-8">
           <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground"><Phone size={14} className="text-primary" />{patient.phone}</div>
           <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground"><MapPin size={14} className="text-primary" /><span className="truncate">{patient.address || 'No address provided'}</span></div>
        </div>

        <div className="flex items-center gap-3 pt-6 border-t border-border/50">
          <button className="flex-grow flex items-center justify-center gap-2 h-12 rounded-xl bg-muted hover:bg-secondary text-muted-foreground transition-all"><Phone size={16} /><span className="text-sm font-bold">{t('Call')}</span></button>
          <button className="flex-grow flex items-center justify-center gap-2 h-12 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all"><Activity size={16} /><span className="text-sm font-bold">{t('Admit')}</span></button>
          <button className="h-12 w-12 rounded-xl bg-muted hover:bg-secondary flex items-center justify-center text-muted-foreground/70 transition-all"><MoreVertical size={18} /></button>
        </div>
      </Card>
    </motion.div>
  )
}
