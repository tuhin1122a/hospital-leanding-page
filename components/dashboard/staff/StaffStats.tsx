'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Users, Briefcase, Zap } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface StaffStatsProps {
  total: number
  doctors: number
}

export default function StaffStats({ total, doctors }: StaffStatsProps) {
  const { t } = useLanguage()
  const stats = [
    { label: 'Total Personnel', value: total, icon: Users, color: 'from-blue-500 to-indigo-600' },
    { label: 'Medical Specialists', value: doctors, icon: Briefcase, color: 'from-emerald-500 to-teal-600' },
    { label: 'Active Shift', value: Math.ceil(total * 0.4), icon: Zap, color: 'from-amber-400 to-orange-500' },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((s, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-card rounded-xl border border-border p-8 flex items-center gap-6 shadow-sm">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-lg text-white`}><s.icon size={24} /></div>
          <div><p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{t(s.label)}</p><p className="text-3xl font-black text-card-foreground tracking-tighter">{s.value}</p></div>
        </motion.div>
      ))}
    </div>
  )
}
