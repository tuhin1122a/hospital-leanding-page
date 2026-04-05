'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import NotificationHeader from '@/components/dashboard/notifications/NotificationHeader'
import NotificationFilters from '@/components/dashboard/notifications/NotificationFilters'
import NotificationItem from '@/components/dashboard/notifications/NotificationItem'

const API_BASE = 'http://localhost:5000'
const getToken = () => localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken') || ''
const authHeader = () => ({ Authorization: `Bearer ${getToken()}` })

const mockData = [
  { id: '1', title: 'New Patient Admitted', message: 'John Doe was admitted to Cardiology Wing, Bed 402.', createdAt: new Date().toISOString(), read: false },
  { id: '2', title: 'Payment Received', message: 'Payment of $450 received from Sarah Smith.', createdAt: new Date(Date.now() - 3600000).toISOString(), read: false },
  { id: '3', title: 'Doctor Appointment Added', message: 'Dr. Emily Chen has a new appointment scheduled.', createdAt: new Date(Date.now() - 7200000).toISOString(), read: true }
]

export default function NotificationsPage() {
  const { t } = useLanguage(); const router = useRouter(); const queryClient = useQueryClient()
  const [filter, setFilter] = useState('ALL'); const [searchQuery, setSearchQuery] = useState('')

  const { data: notifications = [], isLoading, refetch } = useQuery({ 
    queryKey: ['notifications'], 
    queryFn: () => fetch(`${API_BASE}/notifications`, { headers: authHeader() }).then(res => res.ok ? res.json() : mockData)
  })

  const markReadMutation = useMutation({
    mutationFn: (id: string) => fetch(`${API_BASE}/notifications/${id}/read`, { method: 'PATCH', headers: authHeader() }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] })
  })

  const filtered = (notifications.length > 0 ? notifications : mockData).filter((n: any) => {
    const matchesSearch = (n.title + ' ' + n.message).toLowerCase().includes(searchQuery.toLowerCase())
    if (!matchesSearch) return false
    if (filter === 'UNREAD') return !n.read
    const c = (n.title + ' ' + n.message).toLowerCase()
    if (filter === 'PAYMENT') return c.includes('payment') || c.includes('paid')
    if (filter === 'APPOINTMENT') return c.includes('appointment')
    if (filter === 'PATIENT') return c.includes('admit') || c.includes('release')
    return true
  })

  const handleMarkAll = async () => {
    const unread = notifications.filter((n:any) => !n.read)
    for (const n of unread) await markReadMutation.mutateAsync(n.id)
    toast.success(t('All notifications marked as read'))
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 pb-32">
      <NotificationHeader onRefresh={refetch} onMarkAllRead={handleMarkAll} />
      <NotificationFilters filter={filter} setFilter={setFilter} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="space-y-4 relative min-h-[400px]">
        {isLoading ? <div className="absolute inset-0 flex items-center justify-center"><div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div></div> : filtered.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center bg-card rounded-2xl border border-border border-dashed"><div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-4"><Info size={32} /></div><h3 className="text-xl font-black">{t("No events found")}</h3></div>
        ) : <AnimatePresence>{filtered.map((n:any, i:number) => <NotificationItem key={n.id} notification={n} index={i} onMarkRead={(id, e) => { e.stopPropagation(); markReadMutation.mutate(id) }} onClick={() => router.push(n.message.toLowerCase().includes('payment') ? '/dashboard/billing' : n.message.toLowerCase().includes('admit') ? '/dashboard/admissions' : '/dashboard/notifications')} />)}</AnimatePresence>}
      </div>
    </div>
  )
}
