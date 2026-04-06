'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sun, Cloud, CalendarDays, Clock, Users } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface DashboardHeaderProps {
  activeStaff?: number | any[]
}

export default function DashboardHeader({ activeStaff = 0 }: DashboardHeaderProps) {
  const { t } = useLanguage()
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const today = time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  const formattedTime = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })
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

      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4">
         <div className="bg-card border border-border p-4 px-6 rounded-2xl shadow-xl shadow-primary/5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
               <Clock size={24} className="animate-pulse" />
            </div>
            <div>
               <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground leading-none mb-1">{t('Local Time')}</p>
               <p className="text-2xl font-black text-card-foreground leading-none tracking-tighter">{formattedTime}</p>
            </div>
         </div>

         <div className="hidden lg:flex bg-card border border-border p-4 px-6 rounded-2xl shadow-xl shadow-primary/5 items-center gap-4">
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
