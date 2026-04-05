'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { User, Activity, Clock, LogOut, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface AdmissionCardProps {
  adm: any
  index: number
  onDischarge: (id: string, name: string) => void
}

export default function AdmissionCard({ adm, index, onDischarge }: AdmissionCardProps) {
  const { t } = useLanguage()

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
      <Card className="p-8 rounded-2xl border border-border bg-card hover:shadow-2xl transition-all duration-500 overflow-hidden relative group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[5rem] -mr-8 -mt-8 transition-all group-hover:bg-primary/10" />
        
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <User size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black text-card-foreground tracking-tight">{adm.patient?.name}</h3>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{adm.patient?.patientId}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-muted/50 border border-border/50">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{t('Ward / Room')}</p>
            <p className="text-sm font-black text-card-foreground">{adm.wardNo}</p>
          </div>
          <div className="p-4 rounded-2xl bg-muted/50 border border-border/50">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{t('Bed No')}</p>
            <p className="text-sm font-black text-card-foreground">#{adm.bedNo}</p>
          </div>
        </div>

        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
            <Activity size={14} className="text-primary" />
            {adm.doctorInCharge || t('Assigning Doctor...')}
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
            <Clock size={14} className="text-primary" />
            {new Date(adm.admissionDate).toLocaleString()}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-6 border-t border-border/50">
           <button 
            onClick={() => onDischarge(adm.id, adm.patient?.name)}
            className="flex items-center justify-center gap-2 h-12 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all font-bold text-sm"
           >
             <LogOut size={16} /> {t('Discharge')}
           </button>
           <button className="flex items-center justify-center gap-2 h-12 rounded-xl bg-muted hover:bg-secondary text-muted-foreground transition-all font-bold text-sm">
             <ArrowRight size={16} /> {t('Billing')}
           </button>
        </div>
      </Card>
    </motion.div>
  )
}
