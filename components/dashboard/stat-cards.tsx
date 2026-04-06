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
  userRole?: string;
}

export default function StatCards({ earnings = 0, salaries = 0, patients = 0, netProfit = 0, userRole = 'ADMIN' }: StatCardsProps) {
  const { t } = useLanguage()

  let stats: any[] = []

  if (userRole === 'ADMIN') {
    stats = [
      { title: 'Total Earnings', value: `$${earnings.toLocaleString()}`, trend: '+12.5%', positive: true, icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
      { title: 'Total Patients', value: patients.toLocaleString(), trend: '+24', positive: true, icon: HeartPulse, color: 'text-rose-500', bg: 'bg-rose-500/10' },
      { title: 'Staff Salaries', value: `$${salaries.toLocaleString()}`, trend: '+5.2%', positive: false, icon: CreditCard, color: 'text-blue-500', bg: 'bg-blue-500/10' },
      { title: 'Net Profit', value: `$${netProfit.toLocaleString()}`, trend: '+18.7%', positive: true, icon: Activity, color: 'text-primary', bg: 'bg-primary/10' }
    ]
  } else if (userRole === 'DOCTOR') {
    stats = [
      { title: 'My Consultations', value: '124', trend: '+12', positive: true, icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
      { title: 'Patient Recovery', value: '98%', trend: '+2.5%', positive: true, icon: HeartPulse, color: 'text-rose-500', bg: 'bg-rose-500/10' },
      { title: 'Pending Reports', value: '05', trend: '-2', positive: false, icon: Activity, color: 'text-amber-500', bg: 'bg-amber-500/10' },
      { title: 'Next Surgery', value: 'Today', trend: '14:00', positive: true, icon: Activity, color: 'text-blue-500', bg: 'bg-blue-500/10' }
    ]
  } else {
    stats = [
      { title: 'Today Check-ins', value: '15', trend: '+5', positive: true, icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
      { title: 'New Registrations', value: '08', trend: '+2', positive: true, icon: HeartPulse, color: 'text-rose-500', bg: 'bg-rose-500/10' },
      { title: 'Pending Payments', value: '$1,200', trend: '+10%', positive: false, icon: DollarSign, color: 'text-red-500', bg: 'bg-red-500/10' },
      { title: 'Available Rooms', value: '12', trend: 'Empty', positive: true, icon: Activity, color: 'text-blue-500', bg: 'bg-blue-500/10' }
    ]
  }

  return (
    <div className="grid grid-cols-4 gap-2 md:gap-6">
      {stats.map((stat, i) => {
        const Icon = stat.icon
        return (
          <Card key={i} className="p-3 md:p-6 border-border shadow-sm hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-500 group relative overflow-hidden rounded-xl md:rounded-2xl">
            <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-2">
              <div className={cn(stat.bg, stat.color, "p-2 md:p-4 rounded-lg md:rounded-xl group-hover:scale-110 transition-transform duration-500 shadow-sm w-fit")}>
                <Icon className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div className={cn(
                "flex items-center gap-0.5 md:gap-1.5 px-1.5 md:px-2 py-0.5 md:py-1 rounded md:rounded-lg text-[8px] md:text-[10px] font-black w-fit",
                stat.positive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
              )}>
                {stat.positive ? <ArrowUpRight className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" /> : <ArrowDownRight className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" />}
                <span className="hidden sm:inline">{stat.trend}</span>
              </div>
            </div>
            
            <div className="mt-3 md:mt-6">
              <p className="text-muted-foreground font-bold text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-widest line-clamp-1 break-all md:break-normal">{t(stat.title)}</p>
              <h3 className="text-[11px] sm:text-xs md:text-3xl font-black text-card-foreground mt-0.5 md:mt-1 tracking-tighter truncate">{stat.value}</h3>
            </div>

            {/* Subtle background detail */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-muted rounded-full group-hover:bg-primary/5 transition-colors duration-500 -z-0"></div>
          </Card>
        )
      })}
    </div>
  )
}
