'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/contexts/LanguageContext'

interface AppointmentItemProps {
  app: any
  index: number
  role?: string
  onCancel?: (id: string) => void
}

export default function AppointmentItem({ app, index, role, onCancel }: AppointmentItemProps) {
  const { t } = useLanguage()

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
      className="group flex flex-col md:flex-row md:items-center gap-6 p-6 rounded-xl border border-border/50 hover:bg-muted/30 transition-all cursor-pointer"
    >
      <div className="flex flex-col items-center justify-center w-24 h-24 rounded-2xl bg-primary/5 text-primary">
         <p className="text-[10px] font-black uppercase tracking-tighter">{t('SL NO')}</p>
         <p className="text-3xl font-black">#{app.serialNo}</p>
      </div>

      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6">
         <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 mb-1">{t('Specialist')}</p>
            <div className="flex items-center gap-2">
               <p className="text-lg font-black text-card-foreground">{app.doctorName}</p>
               <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest border-primary/20 text-primary">{app.department}</Badge>
            </div>
         </div>
         <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 mb-1">{t('Patient Information')}</p>
            <p className="text-lg font-black text-card-foreground">{app.patient?.name}</p>
            <p className="text-xs font-bold text-muted-foreground">ID: {app.patient?.patientId}</p>
         </div>
      </div>
      <div className="md:text-right flex flex-col items-end gap-2">
         {app.status === 'PENDING' && role === 'PATIENT' && (
            <button 
              onClick={(e) => { e.stopPropagation(); if (confirm('Are you sure you want to cancel this appointment?')) onCancel?.(app.id) }} 
              className="text-[10px] font-black uppercase text-red-500 hover:text-red-600 transition-colors bg-red-50 hover:bg-red-100 px-3 py-1 rounded-lg"
            >
              Cancel Appointment
            </button>
         )}
         <Badge className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-none shadow-sm ${app.status === 'PENDING' ? 'bg-amber-500 text-background' : app.status === 'CANCELLED' ? 'bg-red-500 text-background' : 'bg-emerald-500 text-background'}`}>
           {app.status}
         </Badge>
         <p className="text-xs font-bold text-muted-foreground/70">{new Date(app.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
      </div>
    </motion.div>
  )
}
