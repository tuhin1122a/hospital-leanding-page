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
    const handleReAuth = async () => {
      // 1. First try with current accessToken from cookies
      const getCookie = (name: string) => document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop()
      let token = getCookie('accessToken')
      
      if (!token) {
        // If no access token, try to refresh immediately
        const success = await refreshSession()
        if (!success) {
           window.location.href = '/login'
           return
        }
        token = getCookie('accessToken')
      }

      try {
        const res = await fetch(`${API}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        
        if (res.ok) {
           setProfile(await res.json())
        } else if (res.status === 401) {
           // Token expired? Try refreshing.
           const success = await refreshSession()
           if (success) {
              // Retry me once more
              const retryRes = await fetch(`${API}/auth/me`, {
                headers: { Authorization: `Bearer ${getCookie('accessToken')}` }
              })
              if (retryRes.ok) setProfile(await retryRes.json())
              else window.location.href = '/login'
           } else {
              window.location.href = '/login'
           }
        }
      } catch (err) {
         window.location.href = '/login'
      }
    }

    const refreshSession = async () => {
       const refreshToken = localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken')
       if (!refreshToken) return false

       try {
          const res = await fetch(`${API}/auth/refresh`, {
             headers: { Authorization: `Bearer ${refreshToken}` }
          })
          if (res.ok) {
             const data = await res.json()
             // Set new access token cookie
             document.cookie = `accessToken=${data.accessToken}; path=/; max-age=86400; SameSite=Lax`
             return true
          }
          return false
       } catch (e) {
          return false
       }
    }

    handleReAuth()
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
