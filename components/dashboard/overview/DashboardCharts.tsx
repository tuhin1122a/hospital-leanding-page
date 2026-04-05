'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Info } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface DashboardChartsProps {
  monthlyHistory: any[]
  departmentLoad: any[]
}

export default function DashboardCharts({ monthlyHistory, departmentLoad }: DashboardChartsProps) {
  const { t } = useLanguage()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Revenue Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="lg:col-span-2 bg-card rounded-2xl border border-border shadow-sm p-8"
      >
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
            <AreaChart data={monthlyHistory}>
              <defs>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1}/><stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#a1a1aa', fontSize: 12, fontWeight: 700 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#a1a1aa', fontSize: 12, fontWeight: 700 }} />
              <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} itemStyle={{ fontWeight: 800 }} />
              <Area type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={4} fillOpacity={1} fill="url(#colorPv)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Department Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-card rounded-2xl border border-border shadow-sm p-8 flex flex-col"
      >
        <h3 className="text-xl font-black text-card-foreground tracking-tight mb-2">{t('Department Load')}</h3>
        <p className="text-sm text-muted-foreground font-medium mb-10 text-balance">{t('Appointment distribution across units')}</p>
        <div className="h-64 mt-auto">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={departmentLoad}>
              <Bar dataKey="value" radius={[10, 10, 10, 10]}>
                {departmentLoad?.map((entry: any, index: number) => <Cell key={`cell-${index}`} fill={entry.color} opacity={0.8} />)}
              </Bar>
              <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} itemStyle={{ fontWeight: 800 }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-8 space-y-4 max-h-48 overflow-y-auto custom-scrollbar pr-2">
          {departmentLoad?.map((dept: any, i: number) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: dept.color }} />
                <span className="text-sm font-bold text-muted-foreground">{t(dept.name)}</span>
              </div>
              <span className="text-sm font-black text-card-foreground">{dept.value} {t('Appts')}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
