'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Palette } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface ThemePickerProps {
  current: string
  onSelect: (id: string) => void
}

const themes = [
  { id: 'light', label: 'Blue', color: '#0066FF', bg: 'bg-blue-500' },
  { id: 'emerald', label: 'Emerald', color: '#10B981', bg: 'bg-emerald-500' },
  { id: 'rose', label: 'Rose', color: '#E11D48', bg: 'bg-rose-500' },
  { id: 'amber', label: 'Amber', color: '#F59E0B', bg: 'bg-amber-500' },
  { id: 'dark', label: 'Dark', color: '#18181B', bg: 'bg-zinc-950' },
]

export default function ThemePicker({ current, onSelect }: ThemePickerProps) {
  const { t } = useLanguage()

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card rounded-xl border border-border p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-8"><div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center"><Palette size={18} className="text-primary" /></div><div><h3 className="font-black text-card-foreground">{t('Theme & Appearance')}</h3><p className="text-xs text-muted-foreground font-medium">{t('Choose your preferred color palette')}</p></div></div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {themes.map((th) => (
          <button key={th.id} onClick={() => onSelect(th.id)} className={`relative flex flex-col items-center gap-3 p-5 rounded-lg border-2 transition-all duration-300 group ${current === th.id ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10' : 'border-border bg-muted/50 hover:border-primary/40 hover:bg-muted'}`}>
            <div className={`w-10 h-10 rounded-xl ${th.bg} shadow-lg`} />
            <span className="text-xs font-black text-card-foreground tracking-tight">{t(th.label) || th.label}</span>
            {current === th.id && <div className="absolute top-3 right-3 w-4 h-4 bg-primary rounded-full flex items-center justify-center"><div className="w-1.5 h-1.5 bg-white rounded-full" /></div>}
          </button>
        ))}
      </div>
    </motion.div>
  )
}
