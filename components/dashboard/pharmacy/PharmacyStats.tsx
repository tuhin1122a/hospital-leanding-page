'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { Package, AlertCircle, TrendingUp, ShoppingCart } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function PharmacyStats() {
  const { t } = useLanguage()
  const stats = [
    { label: t('Total Items'), value: '2,456', icon: Package, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: t('Out Of Stock'), value: '12', icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
    { label: t('Daily Sales'), value: '৳4,562', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: t('Orders'), value: '45', icon: ShoppingCart, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((s, i) => (
        <Card key={i} className="p-6 border-border rounded-xl shadow-sm flex items-center justify-between group overflow-hidden relative transition-all hover:shadow-md">
          <div><p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 mb-1">{s.label}</p><h4 className="text-2xl font-black text-card-foreground tracking-tight">{s.value}</h4></div>
          <div className={`${s.bg} ${s.color} w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}><s.icon size={24} /></div>
        </Card>
      ))}
    </div>
  )
}
