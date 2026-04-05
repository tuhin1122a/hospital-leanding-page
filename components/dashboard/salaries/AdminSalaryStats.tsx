'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { DollarSign, CreditCard, User, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface AdminSalaryStatsProps {
  totalCompensation: number
  monthlyPayout: number
  staffCount: number
}

export default function AdminSalaryStats({ totalCompensation, monthlyPayout, staffCount }: AdminSalaryStatsProps) {
  const { t } = useLanguage()

  const stats = [
    { label: 'Total Compensation', value: totalCompensation, icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Monthly Payout', value: monthlyPayout, icon: CreditCard, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Managed Employees', value: staffCount, icon: User, color: 'text-amber-500', bg: 'bg-amber-500/10', noPrefix: true },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {stats.map((stat, i) => (
        <Card key={i} className="p-8 rounded-2xl border border-border shadow-sm flex items-center gap-6 relative overflow-hidden group">
          <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center ${stat.color} shrink-0 transform group-hover:scale-110 transition-transform`}>
            <stat.icon size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{t(stat.label)}</p>
            <h3 className="text-3xl font-black text-card-foreground tracking-tighter">
              {stat.noPrefix ? '' : '$'}{stat.value.toLocaleString()}
            </h3>
          </div>
          {i === 0 && <div className="absolute top-4 right-4 text-emerald-500/20"><ArrowUpRight size={32} /></div>}
        </Card>
      ))}
    </div>
  )
}
