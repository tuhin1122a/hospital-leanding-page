'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { User, Globe } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface GeneralPreferencesProps {
  user: any
  lang: string
  setLang: (l: 'en' | 'bn') => void
}

export default function GeneralPreferences({ user, lang, setLang }: GeneralPreferencesProps) {
  const { t } = useLanguage()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-[2.5rem] border border-border p-8 space-y-6 shadow-sm">
        <div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center"><User size={18} className="text-primary" /></div><div><h3 className="font-black text-card-foreground">{t('Profile Information')}</h3><p className="text-xs text-muted-foreground font-medium">{t('Your basic account details')}</p></div></div>
        {[{ label: t('Full Name'), value: user?.name || '', type: 'text' }, { label: t('Email Address'), value: user?.email || '', type: 'email' }].map((f, i) => (
          <div key={i} className="space-y-1.5"><label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{f.label}</label><input type={f.type} value={f.value} readOnly className="w-full h-13 px-5 py-3.5 rounded-2xl bg-muted border border-border outline-none font-bold text-card-foreground text-sm cursor-not-allowed opacity-80" /></div>
        ))}
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-card rounded-[2.5rem] border border-border p-8 space-y-6 shadow-sm">
        <div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center"><Globe size={18} className="text-primary" /></div><div><h3 className="font-black text-card-foreground">{t('Preferences')}</h3><p className="text-xs text-muted-foreground font-medium">{t('Language, timezone & region')}</p></div></div>
        <div className="space-y-1.5"><label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t('Language')}</label><select value={lang} onChange={(e) => setLang(e.target.value as 'en' | 'bn')} className="w-full h-13 px-5 py-3.5 rounded-2xl bg-muted border border-border outline-none font-bold text-card-foreground text-sm"><option value="en">{t('English (US)')}</option><option value="bn">{t('Bengali')}</option></select></div>
        <div className="space-y-1.5"><label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t('Timezone')}</label><select className="w-full h-13 px-5 py-3.5 rounded-2xl bg-muted border border-border outline-none font-bold text-card-foreground text-sm"><option>Dhaka (GMT+6)</option><option>London (GMT+0)</option><option>New York (GMT-5)</option></select></div>
      </motion.div>
    </div>
  )
}
