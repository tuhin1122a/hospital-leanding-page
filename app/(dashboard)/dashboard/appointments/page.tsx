'use client'

import React, { useState } from 'react'
import { Plus, Calendar, LayoutList, Clock3, CheckCircle2, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import AppointmentItem from '@/components/dashboard/appointments/AppointmentItem'
import QueueStats from '@/components/dashboard/appointments/QueueStats'
import BookingModal from '@/components/dashboard/appointments/BookingModal'

const API = process.env.NEXT_PUBLIC_API_URL
const getToken = () => {
  if (typeof window === 'undefined') return ''
  return document.cookie.split('; ').find(r => r.startsWith('accessToken='))?.split('=')[1] || ''
}
const authHeader = () => ({ Authorization: `Bearer ${getToken()}`, 'Content-Type': 'application/json' })

const TABS = [
  { key: 'all',       label: 'All',       icon: LayoutList },
  { key: 'PENDING',   label: 'Pending',   icon: Clock3 },
  { key: 'CONFIRMED', label: 'Confirmed', icon: CheckCircle2 },
  { key: 'COMPLETED', label: 'Completed', icon: CheckCircle2 },
  { key: 'CANCELLED', label: 'Cancelled', icon: XCircle },
]

export default function AppointmentsPage() {
  const { t } = useLanguage()
  const queryClient = useQueryClient()
  const [showModal, setShowModal] = useState(false)
  const [activeTab, setActiveTab] = useState('all')

  // Get current user role from token
  const [role, setRole] = useState('')
  React.useEffect(() => {
    const token = getToken()
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        setRole(payload.role || '')
      } catch {}
    }
  }, [])

  // Fetch appointments
  const { data: appointments = [], isLoading } = useQuery({
    queryKey: ['appointments'],
    queryFn: () => fetch(`${API}/appointments`, { headers: authHeader() })
      .then(r => r.json())
      .then(d => Array.isArray(d) ? d : Array.isArray(d?.data) ? d.data : []),
  })

  // Fetch patients (for booking)
  const { data: patients = [] } = useQuery({
    queryKey: ['patients-list'],
    queryFn: () => fetch(`${API}/patients`, { headers: authHeader() })
      .then(r => r.json())
      .then(d => Array.isArray(d) ? d : Array.isArray(d?.data) ? d.data : Array.isArray(d?.patients) ? d.patients : []),
  })

  // Fetch doctors list (for booking modal)
  const { data: doctors = [] } = useQuery({
    queryKey: ['doctors-list'],
    queryFn: () => fetch(`${API}/doctors`, { headers: authHeader() })
      .then(r => r.json())
      .then(d => Array.isArray(d) ? d : []),
  })

  const bookMutation = useMutation({
    mutationFn: (data: any) => {
      const endpoint = role === 'PATIENT' ? `${API}/appointments/book-self` : `${API}/appointments`
      return fetch(endpoint, {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data),
      }).then(r => r.ok ? r.json() : r.json().then(e => { throw e }))
    },
    onSuccess: () => {
      toast.success(t('Appointment booked successfully!'))
      setShowModal(false)
      queryClient.invalidateQueries({ queryKey: ['appointments'] })
    },
    onError: (err: any) => toast.error(err?.message || t('Failed to book appointment')),
  })

  // Filter by tab
  const filtered = activeTab === 'all'
    ? appointments
    : appointments.filter((a: any) => a.status === activeTab)

  // Tab counts
  const counts: Record<string, number> = { all: appointments.length }
  appointments.forEach((a: any) => { counts[a.status] = (counts[a.status] || 0) + 1 })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-card-foreground tracking-tighter">{t('Appointments')}</h1>
          <p className="text-muted-foreground font-medium text-lg mt-1">{t('Manage doctor consultations and patient queues')}</p>
        </div>
        {['ADMIN', 'RECEPTIONIST', 'PATIENT'].includes(role) && (
          <Button onClick={() => setShowModal(true)} className="h-14 px-8 rounded-2xl bg-primary font-black shadow-xl shadow-primary/20 gap-2">
            <Plus size={18} /> {t('Book Appointment')}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Left: List */}
        <div className="xl:col-span-3 space-y-6">
          {/* Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {TABS.map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-black whitespace-nowrap transition-all ${
                  activeTab === tab.key ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-muted text-muted-foreground hover:bg-border'
                }`}
              >
                {t(tab.label)}
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-md ${activeTab === tab.key ? 'bg-white/20' : 'bg-background'}`}>
                  {counts[tab.key] || 0}
                </span>
              </button>
            ))}
          </div>

          {/* Appointment List */}
          <div className="bg-card rounded-2xl border border-border p-6 min-h-[500px]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-black text-card-foreground">
                {new Date().toLocaleDateString('en-BD', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </h2>
              <span className="text-xs font-black text-muted-foreground">{filtered.length} {t('appointments')}</span>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => <div key={i} className="h-24 rounded-2xl bg-muted animate-pulse" />)}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 bg-muted/20 rounded-xl border border-dashed border-border">
                <Calendar size={48} className="mx-auto text-muted-foreground/30 mb-4" />
                <p className="text-lg font-bold text-muted-foreground">{t('No appointments found')}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((app: any, i: number) => (
                  <AppointmentItem key={app.id} app={app} index={i} role={role}
                    onCancel={(id) => fetch(`${API}/appointments/${id}/status`, {
                      method: 'PATCH', headers: authHeader(), body: JSON.stringify({ status: 'CANCELLED' })
                    }).then(() => queryClient.invalidateQueries({ queryKey: ['appointments'] }))}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Stats */}
        <QueueStats appointments={appointments} />
      </div>

      {/* Booking Modal */}
      <BookingModal
        show={showModal}
        onClose={() => setShowModal(false)}
        role={role}
        patients={patients}
        doctors={doctors}
        onSubmit={(data) => bookMutation.mutate(data)}
        isSubmitting={bookMutation.isPending}
      />
    </div>
  )
}
