'use client'

import React from 'react'
import { Bell, RefreshCcw, Check } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface NotificationHeaderProps {
  onRefresh: () => void
  onMarkAllRead: () => void
}

export default function NotificationHeader({ onRefresh, onMarkAllRead }: NotificationHeaderProps) {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-card p-6 md:p-8 rounded-[2.5rem] border border-border shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="flex items-center gap-5 relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20 shadow-inner"><Bell size={28} /></div>
        <div><h1 className="text-3xl font-black text-card-foreground tracking-tight">{t("System Activity Center")}</h1><p className="text-sm font-medium text-muted-foreground mt-1">{t("Monitor all clinical and administrative events in real-time.")}</p></div>
      </div>
      <div className="flex items-center gap-3 relative z-10">
        <button onClick={onRefresh} className="p-3 rounded-xl bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all font-bold group border border-transparent shadow-sm" title={t("Refresh")}><RefreshCcw size={18} className="group-hover:-rotate-180 transition-transform duration-500" /></button>
        <button onClick={onMarkAllRead} className="flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:shadow-lg hover:shadow-primary/25 transition-all border border-primary/20"><Check size={16} />{t('Mark All Read')}</button>
      </div>
    </div>
  )
}
