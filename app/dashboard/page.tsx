'use client'

import React, { useState, useEffect } from 'react'
import RecentAppointments from '@/components/dashboard/recent-appointments'
import StatCards from '@/components/dashboard/stat-cards'
import { motion } from 'framer-motion'
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts'
import { useLanguage } from '@/contexts/LanguageContext'
import { Info, User } from 'lucide-react'

export default function DashboardPage() {
  const { t } = useLanguage()
  const [stats, setStats] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
        if (!token) return

        const res = await fetch('http://localhost:5000/stats/overview', {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (res.ok) {
          const data = await res.json()
          setStats(data)
        }
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (isLoading) return <div className="p-20 text-center font-black animate-pulse text-muted-foreground">{t('Loading System Data...')}</div>

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-4xl font-black text-card-foreground tracking-tighter">{t('System Overview')}</h1>
          <p className="text-muted-foreground font-medium text-lg">{t("Welcome back! Here's what's happening today.")}</p>
        </motion.div>
        
        <div className="flex items-center gap-3">
          <div className="flex -space-x-3">
            {stats?.activeStaff?.map((s: any) => (
              <div key={s.id} className="w-10 h-10 rounded-lg border-4 border-border/50 bg-zinc-200 overflow-hidden shadow-sm">
                {s.profilePic ? (
                  <img src={s.profilePic} alt={s.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary uppercase font-black text-xs">
                    {s.name[0]}
                  </div>
                )}
              </div>
            ))}
            <div className="w-10 h-10 rounded-lg border-4 border-border/50 bg-primary text-background flex items-center justify-center text-[10px] font-black shadow-sm">
              +{stats?.activeStaff?.length || 0}
            </div>
          </div>
          <span className="text-sm font-bold text-muted-foreground/70 ml-2">{t('Active Staff')}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <StatCards 
        earnings={stats?.earnings} 
        salaries={stats?.salaries} 
        patients={stats?.patients} 
        netProfit={stats?.netProfit} 
      />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Area Chart */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border shadow-sm p-8 flex flex-col">
          <div className="flex justify-between items-start mb-10">
            <div>
              <h3 className="text-xl font-black text-card-foreground tracking-tight">{t('Patient Statistics')}</h3>
              <p className="text-sm text-muted-foreground font-medium">{t('Real-time inflow and revenue analysis')}</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-xl text-[10px] font-black uppercase tracking-widest text-muted-foreground">
               <Info size={12} /> {t('LAST 7 MONTHS')}
            </div>
          </div>
          
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats?.monthlyHistory}>
                <defs>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#a1a1aa', fontSize: 12, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#a1a1aa', fontSize: 12, fontWeight: 700 }}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontWeight: 800 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#0ea5e9" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorPv)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Bar Chart */}
        <div className="bg-card rounded-2xl border border-border shadow-sm p-8 flex flex-col">
          <h3 className="text-xl font-black text-card-foreground tracking-tight mb-2">{t('Department Load')}</h3>
          <p className="text-sm text-muted-foreground font-medium mb-10 text-balance">{t('Appointment distribution across units')}</p>
          
          <div className="h-64 mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.departmentLoad}>
                <Bar dataKey="value" radius={[10, 10, 10, 10]}>
                  {stats?.departmentLoad?.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} opacity={0.8} />
                  ))}
                </Bar>
                <Tooltip 
                   cursor={{fill: 'transparent'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontWeight: 800 }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-8 space-y-4 max-h-48 overflow-y-auto custom-scrollbar pr-2">
            {stats?.departmentLoad?.map((dept: any, i: number) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: dept.color }} />
                  <span className="text-sm font-bold text-muted-foreground">{t(dept.name)}</span>
                </div>
                <span className="text-sm font-black text-card-foreground">{dept.value} {t('Appts')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tables Section */}
      <RecentAppointments />
    </div>
  )
}
