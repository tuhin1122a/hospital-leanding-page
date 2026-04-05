'use client'

import React from 'react'
import { Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useLanguage } from '@/contexts/LanguageContext'

export default function SecuritySettings() {
  const { t } = useLanguage()
  const origins = [
    { country: 'USA', city: 'Washington', count: 12, flag: '🇺🇸' },
    { country: 'BD', city: 'Dhaka', count: 452, flag: '🇧🇩' },
    { country: 'UK', city: 'London', count: 5, flag: '🇬🇧' },
  ]

  return (
    <div className="space-y-8">
      <Card className="p-8 rounded-2xl border-border bg-foreground text-background relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-xl font-black tracking-tight mb-2">{t('Multi-Factor Auth')}</h3><p className="text-sm text-muted-foreground/70 font-medium mb-10">{t('Enhanced account protection')}</p>
          <div className="flex items-center justify-between p-5 rounded-2xl bg-foreground/90 border border-zinc-800 mb-6">
            <div className="flex items-center gap-3"><Smartphone className="text-primary" /><div><p className="text-sm font-black">{t('Mobile App')}</p><p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{t('Active')}</p></div></div>
          </div>
          <Button className="w-full h-14 rounded-2xl hover:bg-zinc-700 text-background font-black transition-all">{t('Revoke All Access')}</Button>
        </div>
      </Card>
      <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
        <h3 className="text-lg font-black text-card-foreground mb-6">{t('Login Origins')}</h3>
        <div className="space-y-6">
          {origins.map((o, i) => (
            <div key={i} className="flex items-center justify-between"><div className="flex items-center gap-3"><span className="text-2xl">{o.flag}</span><div><p className="text-sm font-black text-card-foreground">{o.city}</p><p className="text-[10px] text-muted-foreground/70 font-bold uppercase tracking-widest">{o.country}</p></div></div><span className="text-sm font-black text-muted-foreground/70">{o.count} {t('Logins')}</span></div>
          ))}
        </div>
      </div>
    </div>
  )
}
