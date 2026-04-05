'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Bell, Zap, Database, CreditCard, Shield, Lock, Users, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface SettingsModulesProps {
  roleMatch: boolean
  showAccess: boolean
  onToggleAccess: () => void
}

const sections = [
  { icon: Bell, label: 'Notifications', desc: 'Email, SMS, push alerts', color: 'from-purple-500 to-violet-600', shadow: 'shadow-purple-200' },
  { icon: Zap, label: 'Integrations', desc: 'Connect third-party apps', color: 'from-amber-400 to-orange-500', shadow: 'shadow-amber-200' },
  { icon: Database, label: 'Data & Backup', desc: 'Export and storage config', color: 'from-emerald-400 to-teal-500', shadow: 'shadow-emerald-200' },
  { icon: CreditCard, label: 'Billing', desc: 'Subscription & payments', color: 'from-pink-400 to-rose-500', shadow: 'shadow-pink-200' },
  { icon: Shield, label: 'API Keys', desc: 'Developer access & webhooks', color: 'from-blue-400 to-indigo-500', shadow: 'shadow-blue-200' },
  { icon: Lock, label: 'Security', desc: 'Password & 2FA settings', color: 'from-red-400 to-rose-600', shadow: 'shadow-red-200' },
  { icon: Users, label: 'Access Control', desc: 'Manage staff permissions', color: 'from-indigo-500 to-blue-600', shadow: 'shadow-indigo-200' },
]

export default function SettingsModules({ roleMatch, showAccess, onToggleAccess }: SettingsModulesProps) {
  const { t } = useLanguage()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {sections.filter(s => s.label !== 'Access Control' || roleMatch).map((s, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i + 0.25 }}>
          <div onClick={() => s.label === 'Access Control' && onToggleAccess()} className={`bg-card border border-border rounded-[2rem] p-6 group cursor-pointer hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 flex items-center gap-5 ${s.label === 'Access Control' && showAccess ? 'ring-2 ring-primary bg-primary/5' : ''}`}>
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-lg ${s.shadow} shrink-0`}><s.icon size={22} className="text-white" /></div>
            <div className="flex-grow"><h4 className="font-black text-card-foreground text-sm">{t(s.label)}</h4><p className="text-xs text-muted-foreground font-medium mt-0.5">{t(s.desc)}</p></div>
            <ChevronRight size={18} className={`text-muted-foreground group-hover:text-primary transition-all duration-300 ${s.label === 'Access Control' && showAccess ? 'rotate-90 text-primary' : 'group-hover:translate-x-1'}`} />
          </div>
        </motion.div>
      ))}
    </div>
  )
}
