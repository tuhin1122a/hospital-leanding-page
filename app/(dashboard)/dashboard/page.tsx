'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import RecentAppointments from '@/components/dashboard/recent-appointments'
import StatCards from '@/components/dashboard/stat-cards'
import { useLanguage } from '@/contexts/LanguageContext'
import DashboardCharts from '@/components/dashboard/overview/DashboardCharts'
import WelcomeCard from '@/components/dashboard/overview/WelcomeCard'
import { useState, useEffect } from 'react'
import { PlusCircle, Calendar as CalendarIcon, UserPlus, CreditCard, Bell, Zap, MoreVertical } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const API = process.env.NEXT_PUBLIC_API_URL
const getToken = () => localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
const authHeader = () => ({ Authorization: `Bearer ${getToken()}` })

export default function DashboardPage() {
  const { t } = useLanguage()
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
      if (!token) return
      try {
        const res = await fetch(`${API}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (res.ok) setProfile(await res.json())
      } catch (err) {}
    }
    fetchProfile()
  }, [])

  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => fetch(`${API}/stats/overview`, { headers: authHeader() }).then(r => r.json()),
    refetchInterval: 30000, // Refresh every 30 seconds
  })

  if (isLoading) return <div className="p-20 text-center font-black animate-pulse text-muted-foreground">{t('Loading System Data...')}</div>

  const role = profile?.role || 'ADMIN'

  return (
    <div className="space-y-10">
      <WelcomeCard userName={profile?.name || 'Admin'} userRole={role} activeStaff={stats?.activeStaff} />
      
      <StatCards 
        earnings={stats?.earnings} 
        salaries={stats?.salaries} 
        patients={stats?.patients} 
        netProfit={stats?.netProfit} 
        userRole={role}
      />

      <DashboardCharts 
        monthlyHistory={stats?.monthlyHistory || []} 
        departmentLoad={stats?.departmentLoad || []} 
        userRole={role}
      />

      <RecentAppointments userRole={role} userName={profile?.name} />
    </div>
  )
}
