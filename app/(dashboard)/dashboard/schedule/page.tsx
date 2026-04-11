'use client'

import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Save, Clock, Calendar, Users, DollarSign, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import toast from 'react-hot-toast'

const API = process.env.NEXT_PUBLIC_API_URL
const getToken = () => {
  if (typeof window === 'undefined') return ''
  return document.cookie.split('; ').find(r => r.startsWith('accessToken='))?.split('=')[1] || ''
}
const authHeader = () => ({ Authorization: `Bearer ${getToken()}`, 'Content-Type': 'application/json' })

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
const DAY_LABELS: Record<string, string> = {
  MON: 'Monday', TUE: 'Tuesday', WED: 'Wednesday', THU: 'Thursday',
  FRI: 'Friday', SAT: 'Saturday', SUN: 'Sunday'
}

const DEPARTMENTS = [
  'General Medicine', 'Cardiology', 'Neurology', 'Orthopedics',
  'Pediatrics', 'Gynecology', 'Dermatology', 'ENT', 'Oncology',
  'Ophthalmology', 'Psychiatry', 'Urology', 'Nephrology',
]

export default function DoctorSchedulePage() {
  const { t } = useLanguage()
  const queryClient = useQueryClient()

  const { data: profile, isLoading } = useQuery({
    queryKey: ['my-doctor-profile'],
    queryFn: () => fetch(`${API}/doctors/me/profile`, { headers: authHeader() }).then(r => r.json()),
  })

  const [form, setForm] = useState({
    specialty: '', department: 'General Medicine', fee: 500,
    experience: '', bio: '', availableDays: ['MON', 'TUE', 'WED', 'THU', 'FRI'],
    startTime: '09:00', endTime: '17:00', slotDuration: 30, maxPatients: 20, isActive: true,
  })

  // Fill form from fetched profile
  React.useEffect(() => {
    if (profile && !profile.message) {
      setForm({
        specialty: profile.specialty || '',
        department: profile.department || 'General Medicine',
        fee: profile.fee || 500,
        experience: profile.experience || '',
        bio: profile.bio || '',
        availableDays: profile.availableDays || ['MON', 'TUE', 'WED', 'THU', 'FRI'],
        startTime: profile.startTime || '09:00',
        endTime: profile.endTime || '17:00',
        slotDuration: profile.slotDuration || 30,
        maxPatients: profile.maxPatients || 20,
        isActive: profile.isActive !== false,
      })
    }
  }, [profile])

  const saveMutation = useMutation({
    mutationFn: () => fetch(`${API}/doctors/me/profile`, {
      method: 'POST', headers: authHeader(), body: JSON.stringify(form),
    }).then(r => r.ok ? r.json() : r.json().then(e => { throw e })),
    onSuccess: () => {
      toast.success('Schedule saved successfully!')
      queryClient.invalidateQueries({ queryKey: ['my-doctor-profile'] })
    },
    onError: () => toast.error('Failed to save schedule'),
  })

  const toggleDay = (day: string) => {
    setForm(f => ({
      ...f,
      availableDays: f.availableDays.includes(day)
        ? f.availableDays.filter(d => d !== day)
        : [...f.availableDays, day],
    }))
  }

  // Preview: how many slots
  const calcSlots = () => {
    const [sh, sm] = form.startTime.split(':').map(Number)
    const [eh, em] = form.endTime.split(':').map(Number)
    const total = (eh * 60 + em) - (sh * 60 + sm)
    return Math.floor(total / form.slotDuration)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-card-foreground tracking-tighter">{t('My Schedule')}</h1>
          <p className="text-muted-foreground font-medium mt-1">{t('Set your availability, fees, and consultation schedule')}</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <div onClick={() => setForm(f => ({ ...f, isActive: !f.isActive }))}
              className={`w-12 h-6 rounded-full transition-all relative ${form.isActive ? 'bg-emerald-500' : 'bg-muted'}`}>
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${form.isActive ? 'left-7' : 'left-1'}`} />
            </div>
            <span className="text-sm font-black">{form.isActive ? t('Active') : t('Inactive')}</span>
          </label>
        </div>
      </div>

      {/* Profile section */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
        <h2 className="font-black text-lg flex items-center gap-2"><Users size={20} className="text-primary" /> {t('Professional Info')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground block mb-1.5">{t('Specialty')}</label>
            <input type="text" value={form.specialty} onChange={e => setForm(f => ({ ...f, specialty: e.target.value }))}
              placeholder="e.g. Cardiologist, Neurologist..."
              className="w-full h-12 px-4 rounded-xl bg-muted border border-border outline-none font-bold" />
          </div>
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground block mb-1.5">{t('Department')}</label>
            <select value={form.department} onChange={e => setForm(f => ({ ...f, department: e.target.value }))}
              className="w-full h-12 px-4 rounded-xl bg-muted border border-border outline-none font-bold">
              {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground block mb-1.5"><DollarSign size={12} className="inline" /> {t('Consultation Fee')} (৳)</label>
            <input type="number" value={form.fee} onChange={e => setForm(f => ({ ...f, fee: Number(e.target.value) }))}
              className="w-full h-12 px-4 rounded-xl bg-muted border border-border outline-none font-black text-primary text-lg" />
          </div>
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground block mb-1.5">{t('Experience')}</label>
            <input type="text" value={form.experience} onChange={e => setForm(f => ({ ...f, experience: e.target.value }))}
              placeholder="e.g. 10 Years"
              className="w-full h-12 px-4 rounded-xl bg-muted border border-border outline-none font-bold" />
          </div>
        </div>
        <div>
          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground block mb-1.5">{t('Short Bio')}</label>
          <textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} rows={2}
            placeholder={t('Brief professional description...')}
            className="w-full px-4 py-3 rounded-xl bg-muted border border-border outline-none font-medium text-sm resize-none" />
        </div>
      </div>

      {/* Available Days */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <h2 className="font-black text-lg flex items-center gap-2"><Calendar size={20} className="text-primary" /> {t('Available Days')}</h2>
        <div className="flex flex-wrap gap-3">
          {DAYS.map(day => (
            <button key={day} onClick={() => toggleDay(day)}
              className={`px-5 py-3 rounded-xl font-black text-sm transition-all border-2 ${
                form.availableDays.includes(day)
                  ? 'border-primary bg-primary text-white shadow-lg shadow-primary/20'
                  : 'border-border hover:border-primary/40 text-muted-foreground'
              }`}
            >
              {DAY_LABELS[day]}
            </button>
          ))}
        </div>
      </div>

      {/* Time Settings */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
        <h2 className="font-black text-lg flex items-center gap-2"><Clock size={20} className="text-primary" /> {t('Consultation Hours')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground block mb-1.5">{t('Start Time')}</label>
            <input type="time" value={form.startTime} onChange={e => setForm(f => ({ ...f, startTime: e.target.value }))}
              className="w-full h-12 px-4 rounded-xl bg-muted border border-border outline-none font-bold" />
          </div>
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground block mb-1.5">{t('End Time')}</label>
            <input type="time" value={form.endTime} onChange={e => setForm(f => ({ ...f, endTime: e.target.value }))}
              className="w-full h-12 px-4 rounded-xl bg-muted border border-border outline-none font-bold" />
          </div>
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground block mb-1.5">{t('Slot Duration')} (min)</label>
            <select value={form.slotDuration} onChange={e => setForm(f => ({ ...f, slotDuration: Number(e.target.value) }))}
              className="w-full h-12 px-4 rounded-xl bg-muted border border-border outline-none font-bold">
              <option value={15}>15 minutes</option>
              <option value={20}>20 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={45}>45 minutes</option>
              <option value={60}>60 minutes</option>
            </select>
          </div>
        </div>

        {/* Slot Preview */}
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
          <p className="text-sm font-black text-primary">
            📋 {calcSlots()} {t('slots per day')} · {form.startTime} – {form.endTime} · {form.slotDuration}min each
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {t('Patients can book any available slot in this range')}
          </p>
        </div>
      </div>

      {/* Save Button */}
      <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}
        className="h-14 px-10 rounded-2xl bg-primary font-black text-base shadow-xl shadow-primary/20 gap-2">
        {saveMutation.isPending ? <><Loader2 size={18} className="animate-spin" /> {t('Saving...')}</> : <><Save size={18} /> {t('Save Schedule')}</>}
      </Button>
    </div>
  )
}
