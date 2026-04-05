'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Shield } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface AccountDetailsProps { user: any }

export default function AccountDetails({ user }: AccountDetailsProps) {
  const { t } = useLanguage()
  const items = [
    { label: t('Full Name'), value: user?.name || '—', icon: User },
    { label: t('Email Address'), value: user?.email || '—', icon: Mail },
    { label: t('Access Level'), value: user?.role || '—', icon: Shield },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card rounded-[2.5rem] border border-border p-8 space-y-5 shadow-sm">
      <div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center"><User size={18} className="text-primary" /></div><h3 className="font-black text-card-foreground">{t('Account Details')}</h3></div>
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-muted/50 border border-transparent hover:border-border transition-all">
          <item.icon size={16} className="text-muted-foreground shrink-0" />
          <div><p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{item.label}</p><p className="font-bold text-card-foreground text-sm mt-0.5">{item.value}</p></div>
        </div>
      ))}
    </motion.div>
  )
}
