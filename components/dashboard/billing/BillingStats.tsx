'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { DollarSign, Wallet, FileCheck, CreditCard } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface BillingStatsProps {
  invoices: any[]
}

export default function BillingStats({ invoices }: BillingStatsProps) {
  const { t } = useLanguage()

  const stats = [
    { label: t('Total Earnings'), value: `$${invoices.reduce((s,i) => s + i.paidAmount, 0).toLocaleString()}`, icon: DollarSign, color: 'text-emerald-500', trend: 'Actual collections' },
    { label: t('Total Receivables'), value: `$${invoices.reduce((s,i) => s + i.dueAmount, 0).toLocaleString()}`, icon: Wallet, color: 'text-amber-500', trend: 'Pending dues' },
    { label: t('Average Invoice'), value: `$${(invoices.reduce((s,i) => s + i.totalAmount, 0) / (invoices.length || 1)).toFixed(0)}`, icon: FileCheck, color: 'text-blue-500', trend: 'Per patient average' },
    { label: t('Total Invoices'), value: invoices.length, icon: CreditCard, color: 'text-primary', trend: 'Lifetime count' },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {stats.map((stat, i) => (
        <Card key={i} className="p-8 border-none rounded-xl bg-card shadow-xl shadow-zinc-200/40 relative overflow-hidden group">
          <div className="relative z-10 flex items-start justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 mb-2">{stat.label}</p>
              <h4 className="text-3xl font-black text-card-foreground tracking-tighter">{stat.value}</h4>
              <p className="text-[10px] font-bold text-muted-foreground/70 mt-4 flex items-center gap-1">
                <span className={stat.color}>{stat.trend}</span>
              </p>
            </div>
            <div className={`p-4 rounded-2xl bg-muted ${stat.color}`}>
              <stat.icon size={28} />
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-zinc-100 rounded-full group-hover:scale-125 transition-transform duration-700 -z-0" />
        </Card>
      ))}
    </div>
  )
}
