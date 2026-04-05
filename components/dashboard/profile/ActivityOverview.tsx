'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Activity } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ActivityOverview() {
  const { t } = useLanguage()
  const items = [
    { label: t('Total Logins'), value: '142' },
    { label: t('Reports Generated'), value: '38' },
    { label: t('Patients Handled'), value: '204' },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-card rounded-xl border border-border p-8 space-y-5 shadow-sm">
      <div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center"><Activity size={18} className="text-primary" /></div><h3 className="font-black text-card-foreground">{t('Activity Overview')}</h3></div>
      {items.map((item, i) => (
        <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-muted/50 border border-transparent hover:border-border transition-all"><p className="text-sm font-bold text-muted-foreground">{item.label}</p><p className="font-black text-card-foreground">{item.value}</p></div>
      ))}
    </motion.div>
  )
}
