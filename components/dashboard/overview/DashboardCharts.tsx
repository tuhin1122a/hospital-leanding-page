'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Info } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface DashboardChartsProps {
  monthlyHistory: any[]
  departmentLoad: any[]
  userRole?: string
}

export default function DashboardCharts({ monthlyHistory, departmentLoad, userRole = 'ADMIN' }: DashboardChartsProps) {
  const { t } = useLanguage()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 overflow-hidden">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="lg:col-span-2 bg-card rounded-xl md:rounded-2xl border border-border shadow-sm p-4 md:p-8"
      >
        <div className="flex flex-col md:flex-row md:justify-between items-start mb-4 md:mb-10 gap-2">
          <div>
            <h3 className="text-[11px] md:text-xl font-black text-card-foreground tracking-tight line-clamp-1">
               {userRole === 'ADMIN' ? t('Hospital Statistics') : userRole === 'DOCTOR' ? t('Consultation History') : t('Reception Activity')}
            </h3>
            <p className="hidden md:block text-sm text-muted-foreground font-medium">
               {userRole === 'ADMIN' ? t('Real-time inflow and revenue analysis') : userRole === 'DOCTOR' ? t('Monthly patient consultation trends') : t('Patient check-ins and registrations')}
            </p>
          </div>
          <div className="flex items-center gap-1 md:gap-2 px-2 py-1 md:px-4 md:py-2 bg-muted rounded-lg md:rounded-xl text-[8px] md:text-[10px] font-black uppercase tracking-widest text-muted-foreground w-fit">
             <Info className="w-3 h-3 md:w-4 md:h-4" /> <span className="hidden sm:inline">{t('LAST 7 MONTHS')}</span>
          </div>
        </div>
        <div className="h-48 md:h-80 w-full -ml-3 md:ml-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyHistory}>
              <defs>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1}/><stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#a1a1aa', fontSize: 10, fontWeight: 700 }} dy={5} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#a1a1aa', fontSize: 10, fontWeight: 700 }} width={30} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '10px' }} itemStyle={{ fontWeight: 800 }} />
              <Area type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={4} fillOpacity={1} fill="url(#colorPv)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Department Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="lg:col-span-1 bg-card rounded-xl md:rounded-2xl border border-border shadow-sm p-4 md:p-8 flex flex-col"
      >
        <h3 className="text-[11px] md:text-xl font-black text-card-foreground tracking-tight mb-1 md:mb-2 line-clamp-1">
           {userRole === 'ADMIN' ? t('Department Load') : userRole === 'DOCTOR' ? t('Patient Diagnosis') : t('Booking Channels')}
        </h3>
        <p className="hidden md:block text-sm text-muted-foreground font-medium mb-10 text-balance">
           {userRole === 'ADMIN' ? t('Appointment distribution across units') : userRole === 'DOCTOR' ? t('Composition of patient medical needs') : t('Platform distribution for appointments')}
        </p>
        <div className="h-48 md:h-64 mt-auto -ml-3 md:ml-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={departmentLoad}>
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {departmentLoad?.map((entry: any, index: number) => <Cell key={`cell-${index}`} fill={entry.color} opacity={0.8} />)}
              </Bar>
              <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '10px' }} itemStyle={{ fontWeight: 800 }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 md:mt-8 space-y-1.5 md:space-y-4 max-h-24 md:max-h-48 overflow-y-auto custom-scrollbar pr-1 md:pr-2">
          {departmentLoad?.map((dept: any, i: number) => (
            <div key={i} className="flex flex-col xl:flex-row xl:items-center justify-between">
              <div className="flex items-center gap-1.5 md:gap-3">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full shrink-0" style={{ backgroundColor: dept.color }} />
                <span className="text-[9px] md:text-sm font-bold text-muted-foreground truncate">{t(dept.name)}</span>
              </div>
              <span className="text-[10px] md:text-sm font-black text-card-foreground ml-3 xl:ml-0">{dept.value} <span className="hidden sm:inline">{t('Appts')}</span></span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
