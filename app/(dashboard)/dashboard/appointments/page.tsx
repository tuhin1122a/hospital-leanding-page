'use client'

import React, { useState } from 'react'
import { Plus, Calendar, Activity } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import AppointmentItem from '@/components/dashboard/appointments/AppointmentItem'
import QueueStats from '@/components/dashboard/appointments/QueueStats'
import BookingModal from '@/components/dashboard/appointments/BookingModal'

const API = 'http://localhost:5000/appointments'
const PATIENTS_API = 'http://localhost:5000/patients'
const getToken = () => localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken') || ''
const authHeader = () => ({ Authorization: `Bearer ${getToken()}`, 'Content-Type': 'application/json' })

export default function AppointmentsPage() {
  const { t } = useLanguage(); const queryClient = useQueryClient()
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({ patientId: '', department: 'General Medicine', doctorName: '', appointmentDate: new Date().toISOString().split('T')[0], fee: 500 })

  const { data: appointments = [], isLoading } = useQuery({ queryKey: ['appointments'], queryFn: () => fetch(API, { headers: authHeader() }).then(r => r.json()) })
  const { data: patients = [] } = useQuery({ queryKey: ['patients-list'], queryFn: () => fetch(PATIENTS_API, { headers: authHeader() }).then(r => r.json()) })

  const bookMutation = useMutation({
    mutationFn: (data: any) => fetch(API, { method: 'POST', headers: authHeader(), body: JSON.stringify({ ...data, fee: Number(data.fee), appointmentDate: new Date(data.appointmentDate).toISOString() }) }).then(r => r.ok ? r.json() : r.json().then(e => { throw e })),
    onSuccess: () => { toast.success(t('Appointment booked successfully!')); setShowModal(false); setFormData({ ...formData, patientId: '', doctorName: '' }); queryClient.invalidateQueries({ queryKey: ['appointments'] }) },
    onError: () => toast.error(t('Failed to book appointment'))
  })

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-card-foreground tracking-tighter">{t('Clinical Schedule')}</h1>
          <p className="text-muted-foreground font-medium text-lg mt-1">{t('Manage doctor consultations and patient queues')}</p>
        </div>
        <Button onClick={() => setShowModal(true)} className="h-14 px-8 rounded-2xl bg-primary font-black shadow-xl shadow-primary/20 gap-2"><Plus size={18} /> {t('Book Appointment')}</Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
        <div className="xl:col-span-3 space-y-8">
          <div className="bg-card rounded-[3rem] border border-border p-10 min-h-[600px]">
             <div className="flex items-center justify-between mb-10"><h2 className="text-2xl font-black text-card-foreground tracking-tight">{new Date().toDateString()}</h2></div>
             {isLoading ? (
                <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="h-24 rounded-2xl bg-muted animate-pulse" />)}</div>
             ) : appointments.length === 0 ? (
                <div className="text-center py-20 bg-muted/20 rounded-[2rem] border border-dashed border-border"><Calendar size={48} className="mx-auto text-muted-foreground/30 mb-4" /><p className="text-lg font-bold text-muted-foreground">{t('No appointments found for today')}</p></div>
             ) : (
                <div className="space-y-4">{appointments.map((app: any, i: number) => <AppointmentItem key={app.id} app={app} index={i} />)}</div>
             )}
          </div>
        </div>
        <QueueStats appointments={appointments} />
      </div>

      <BookingModal show={showModal} onClose={() => setShowModal(false)} patients={patients} formData={formData} setFormData={setFormData} onSubmit={(e) => { e.preventDefault(); bookMutation.mutate(formData) }} isSubmitting={bookMutation.isPending} />
    </div>
  )
}
