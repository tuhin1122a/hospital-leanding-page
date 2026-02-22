'use client'

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Activity, ArrowDownRight, ArrowUpRight, DollarSign, Users } from 'lucide-react'

const stats = [
  {
    title: 'Total Earnings',
    value: '$424,562',
    trend: '+12.5%',
    positive: true,
    icon: DollarSign,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10'
  },
  {
    title: 'Operating Costs',
    value: '$182,140',
    trend: '+2.1%',
    positive: false,
    icon: Activity,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10'
  },
  {
    title: 'Staff Salaries',
    value: '$145,000',
    trend: '+5.2%',
    positive: false,
    icon: Users,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10'
  },
  {
    title: 'Net Profit',
    value: '$97,422',
    trend: '+18.7%',
    positive: true,
    icon: DollarSign,
    color: 'text-primary',
    bg: 'bg-primary/10'
  }
]

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => {
        const Icon = stat.icon
        return (
          <Card key={i} className="p-6 border-zinc-100 shadow-sm hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-500 group relative overflow-hidden rounded-[2rem]">
            <div className="flex items-start justify-between">
              <div className={cn(stat.bg, stat.color, "p-4 rounded-2xl group-hover:scale-110 transition-transform duration-500 shadow-sm")}>
                <Icon size={24} />
              </div>
              <div className={cn(
                "flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-black",
                stat.positive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
              )}>
                {stat.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.trend}
              </div>
            </div>
            
            <div className="mt-6">
              <p className="text-zinc-500 font-bold text-xs uppercase tracking-widest">{stat.title}</p>
              <h3 className="text-3xl font-black text-zinc-900 mt-1 tracking-tighter">{stat.value}</h3>
            </div>

            {/* Subtle background detail */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-zinc-50 rounded-full group-hover:bg-primary/5 transition-colors duration-500 -z-0"></div>
          </Card>
        )
      })}
    </div>
  )
}
