'use client'

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Activity, ArrowDownRight, ArrowUpRight, DollarSign, Users, HeartPulse, CreditCard } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface StatCardsProps {
  earnings?: number;
  salaries?: number;
  patients?: number;
  netProfit?: number;
}

export default function StatCards({ earnings = 0, salaries = 0, patients = 0, netProfit = 0 }: StatCardsProps) {
  const { t } = useLanguage()

  const stats = [
    {
      title: 'Total Earnings',
      value: `$${earnings.toLocaleString()}`,
      trend: '+12.5%',
      positive: true,
      icon: DollarSign,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10'
    },
    {
      title: 'Total Patients',
      value: patients.toLocaleString(),
      trend: '+24',
      positive: true,
      icon: HeartPulse,
      color: 'text-rose-500',
      bg: 'bg-rose-500/10'
    },
    {
      title: 'Staff Salaries',
      value: `$${salaries.toLocaleString()}`,
      trend: '+5.2%',
      positive: false,
      icon: CreditCard,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    {
      title: 'Net Profit',
      value: `$${netProfit.toLocaleString()}`,
      trend: '+18.7%',
      positive: true,
      icon: Activity,
      color: 'text-primary',
      bg: 'bg-primary/10'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => {
        const Icon = stat.icon
        return (
          <Card key={i} className="p-6 border-border shadow-sm hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-500 group relative overflow-hidden rounded-2xl">
            <div className="flex items-start justify-between">
              <div className={cn(stat.bg, stat.color, "p-4 rounded-xl group-hover:scale-110 transition-transform duration-500 shadow-sm")}>
                <Icon size={24} />
              </div>
              <div className={cn(
                "flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-black",
                stat.positive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
              )}>
                {stat.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.trend}
              </div>
            </div>
            
            <div className="mt-6">
              <p className="text-muted-foreground font-black text-[10px] uppercase tracking-widest">{t(stat.title)}</p>
              <h3 className="text-3xl font-black text-card-foreground mt-1 tracking-tighter">{stat.value}</h3>
            </div>

            {/* Subtle background detail */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-muted rounded-full group-hover:bg-primary/5 transition-colors duration-500 -z-0"></div>
          </Card>
        )
      })}
    </div>
  )
}
