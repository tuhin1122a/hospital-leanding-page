'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { BadgeCheck, Activity, Calendar, Clock } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface ProfileStatsProps { user: any }

export default function ProfileStats({ user }: ProfileStatsProps) {
  const { t } = useLanguage()
  const stats = [
    { label: t('Role'), value: user?.role || 'Admin', icon: BadgeCheck, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: t('Status'), value: t('Active'), icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: t('Member Since'), value: user?.createdAt ? new Date(user.createdAt).getFullYear().toString() : '2024', icon: Calendar, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: t('Last Login'), value: t('Today'), icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((s, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }} className="bg-card rounded-xl border border-border p-6 flex items-center gap-4 hover:shadow-md transition-all">
          <div className={`w-12 h-12 rounded-2xl ${s.bg} flex items-center justify-center shrink-0`}><s.icon size={20} className={s.color} /></div>
          <div><p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{s.label}</p><p className="text-lg font-black text-card-foreground mt-0.5">{s.value}</p></div>
        </motion.div>
      ))}
    </div>
  )
}
