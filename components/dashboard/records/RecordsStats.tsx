'use client'

import React from 'react'
import { FileText, Clock, ShieldAlert, Eye } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function RecordsStats() {
  const { t } = useLanguage()
  const stats = [
    { label: t('Total Records'), value: '14,235', icon: FileText, color: 'text-primary', bg: 'bg-primary/10' },
    { label: t('Cloud Storage'), value: '82%', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { label: t('Encryption'), value: 'AES-256', icon: ShieldAlert, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: t('Recent Access'), value: '142', icon: Eye, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((s, i) => (
        <div key={i} className="bg-card p-6 rounded-[2rem] border border-border shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
          <div className={`p-4 rounded-2xl ${s.bg} flex items-center justify-center`}><s.icon size={20} className={s.color} /></div>
          <div><p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 leading-none mb-1">{s.label}</p><p className="text-xl font-black text-card-foreground">{s.value}</p></div>
        </div>
      ))}
    </div>
  )
}
