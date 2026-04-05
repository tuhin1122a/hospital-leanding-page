'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Sun, Cloud, CalendarDays, Users } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface DashboardHeaderProps {
  activeStaff?: number | any[]
}

export default function DashboardHeader({ activeStaff = 0 }: DashboardHeaderProps) {
  const { t } = useLanguage()
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  const activeStaffCount = Array.isArray(activeStaff)
    ? activeStaff.length
    : typeof activeStaff === 'number'
    ? activeStaff
    : activeStaff && typeof activeStaff === 'object'
    ? 1 // single staff object returned instead of count
    : 0

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-4">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <Sun className="text-amber-500 animate-pulse" size={24} />
          <h1 className="text-4xl font-black tracking-tighter text-card-foreground">
            {t('Good Morning, Admin')}
          </h1>
        </div>
        <div className="flex items-center gap-4 text-muted-foreground font-bold">
          <div className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl shadow-sm text-sm">
            <CalendarDays size={16} className="text-primary" />
            {today}
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl shadow-sm text-sm text-emerald-600">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            {activeStaffCount} {t('Active Personnel')}
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="hidden lg:flex items-center gap-4">
         <div className="bg-card border border-border p-4 rounded-lg shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
               <Cloud size={24} />
            </div>
            <div>
               <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground leading-none mb-1">{t('Weather')}</p>
               <p className="text-xl font-bold text-card-foreground leading-none tracking-tight">28°C Dhaka</p>
            </div>
         </div>
      </motion.div>
    </div>
  )
}
