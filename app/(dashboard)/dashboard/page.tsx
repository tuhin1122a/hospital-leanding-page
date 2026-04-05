'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import RecentAppointments from '@/components/dashboard/recent-appointments'
import StatCards from '@/components/dashboard/stat-cards'
import { useLanguage } from '@/contexts/LanguageContext'
import DashboardHeader from '@/components/dashboard/overview/DashboardHeader'
import DashboardCharts from '@/components/dashboard/overview/DashboardCharts'

const API = process.env.NEXT_PUBLIC_API_URL
const getToken = () => localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
const authHeader = () => ({ Authorization: `Bearer ${getToken()}` })

export default function DashboardPage() {
  const { t } = useLanguage()

  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => fetch(`${API}/stats/overview`, { headers: authHeader() }).then(r => r.json()),
    refetchInterval: 30000, // Refresh every 30 seconds
  })

  if (isLoading) return <div className="p-20 text-center font-black animate-pulse text-muted-foreground">{t('Loading System Data...')}</div>

  return (
    <div className="space-y-10">
      <DashboardHeader activeStaff={stats?.activeStaff} />
      
      <StatCards 
        earnings={stats?.earnings} 
        salaries={stats?.salaries} 
        patients={stats?.patients} 
        netProfit={stats?.netProfit} 
      />

      <DashboardCharts 
        monthlyHistory={stats?.monthlyHistory || []} 
        departmentLoad={stats?.departmentLoad || []} 
      />

      <RecentAppointments />
    </div>
  )
}
