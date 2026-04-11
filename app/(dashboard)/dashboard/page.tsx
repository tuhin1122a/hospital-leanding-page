'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import RecentAppointments from '@/components/dashboard/recent-appointments'
import StatCards from '@/components/dashboard/stat-cards'
import { useLanguage } from '@/contexts/LanguageContext'
import DashboardCharts from '@/components/dashboard/overview/DashboardCharts'
import WelcomeCard from '@/components/dashboard/overview/WelcomeCard'
import { useState, useEffect } from 'react'
import { 
  PlusCircle, 
  Calendar as CalendarIcon, 
  UserPlus, 
  CreditCard, 
  Bell, 
  Zap, 
  MoreVertical, 
  ChevronRight 
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import { getAccessToken } from '@/lib/utils'

const API = process.env.NEXT_PUBLIC_API_URL
const authHeader = () => ({ Authorization: `Bearer ${getAccessToken()}` })

export default function DashboardPage() {
  const { t } = useLanguage()
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    const handleReAuth = async () => {
      // 1. First try with current accessToken from cookies
      let token = getAccessToken()
      
      if (!token) {
        // If no access token, try to refresh immediately
        const success = await refreshSession()
        if (!success) {
           window.location.href = '/login'
           return
        }
        token = getAccessToken()
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
                headers: { Authorization: `Bearer ${getAccessToken()}` }
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
        patientStats={stats?.patientStats}
      />

      {role === 'PATIENT' ? (
        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm text-center">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
             <CalendarIcon className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight mb-2">
            {stats?.isNewUser ? 'Welcome to your Patient Portal' : 'Your Medical Overview'}
          </h2>
          <p className="text-slate-500 font-medium mb-8 max-w-lg mx-auto">
            {stats?.isNewUser 
              ? 'You have successfully created your account. Book an appointment or message the reception to get started with your treatment.' 
              : 'You can view your medical records, book new appointments, and message your doctor directly from this portal.'}
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <button 
              onClick={() => window.location.href = '/dashboard/appointments'}
              className="bg-[#1a4bde] hover:bg-[#1a4bde]/90 text-white font-bold px-8 h-12 rounded-xl transition-all shadow-lg hover:-translate-y-1"
            >
              Book Appointment
            </button>
            <button 
              onClick={() => window.location.href = '/dashboard/messages'}
              className="bg-white border-2 border-slate-200 hover:border-[#1a4bde] text-slate-700 hover:text-[#1a4bde] font-bold px-8 h-12 rounded-xl transition-all flex items-center gap-2 hover:-translate-y-1"
            >
               <Bell className="w-4 h-4" /> Message {stats?.isNewUser ? 'Reception' : 'Doctor'}
            </button>
          </div>
          {!stats?.isNewUser && (
            <div className="mt-8 pt-8 border-t border-slate-100 flex justify-center">
              <button 
                onClick={() => window.location.href = '/dashboard/records'}
                className="text-[#1a4bde] font-black uppercase text-sm tracking-wider flex items-center gap-2 hover:gap-4 transition-all"
              >
                View Full Medical History <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          <DashboardCharts 
            monthlyHistory={stats?.monthlyHistory || []} 
            departmentLoad={stats?.departmentLoad || []} 
            userRole={role}
          />

          <RecentAppointments userRole={role} userName={profile?.name} />
        </>
      )}
    </div>
  )
}
