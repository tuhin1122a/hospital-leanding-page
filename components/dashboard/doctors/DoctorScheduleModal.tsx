'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Save, Clock, CalendarDays } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import toast from 'react-hot-toast'

interface DoctorScheduleModalProps {
  show: boolean
  doctor: any
  onClose: () => void
  onSuccess: () => void
}

export default function DoctorScheduleModal({ show, doctor, onClose, onSuccess }: DoctorScheduleModalProps) {
  const { t } = useLanguage()
  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState({
    profilePic: '',
    specialty: '',
    department: '',
    bio: '',
    education: '',
    expertise: '',
    awards: '',
    fee: 500,
    isActive: true,
    availableDays: [] as string[],
    startTime: '09:00',
    endTime: '17:00'
  })

  useEffect(() => {
    if (doctor) {
      const p = doctor.doctorProfile || {}
      setFormData({
        profilePic: doctor.profilePic || '',
        specialty: p.specialty || '',
        department: p.department || '',
        bio: p.bio || '',
        education: p.education || '',
        expertise: (p.expertise || []).join(', '),
        awards: (p.awards || []).join(', '),
        fee: p.fee || 500,
        isActive: p.isActive ?? true,
        availableDays: p.availableDays || [],
        startTime: p.startTime || '09:00',
        endTime: p.endTime || '17:00'
      })
    }
  }, [doctor])

  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

  const toggleDay = (day: string) => {
    setFormData(prev => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter(d => d !== day)
        : [...prev.availableDays, day]
    }))
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const getCookie = (name: string) => document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop()
    const token = getCookie('accessToken')
    setIsUploading(true)
    const fd = new FormData()
    fd.append('image', file)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload/image?folder=doctors`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd
      })
      if (res.ok) {
        const data = await res.json()
        setFormData({ ...formData, profilePic: data.url })
        toast.success('Photo updated!')
      }
    } catch (error) { toast.error('Upload failed') } finally { setIsUploading(false) }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const getCookie = (name: string) => document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop()
    const token = getCookie('accessToken')

    try {
      // 1. Update User Profile Pic
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${doctor.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ profilePic: formData.profilePic })
      })

      // 2. Update Profile
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors/${doctor.id}/profile`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            specialty: formData.specialty,
            department: formData.department,
            bio: formData.bio,
            education: formData.education,
            expertise: formData.expertise.split(',').map(s => s.trim()).filter(s => s !== ''),
            awards: formData.awards.split(',').map(s => s.trim()).filter(s => s !== ''),
            fee: formData.fee,
            isActive: formData.isActive,
            availableDays: formData.availableDays,
            startTime: formData.startTime,
            endTime: formData.endTime
        })
      })

      if (res.ok) {
        toast.success('Doctor profile updated')
        onSuccess()
        onClose()
      } else {
        toast.error('Failed to update')
      }
    } catch (error) {
      toast.error('Connection error')
    }
  }

  return (
    <AnimatePresence>
      {show && doctor && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-2xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-8 md:p-10 max-h-[90vh] overflow-y-auto custom-scrollbar font-anek">
              <div className="flex items-center justify-between mb-8">
                <div><h2 className="text-3xl font-black text-card-foreground tracking-tighter">{t('Manage Profile & Schedule')}</h2><p className="text-muted-foreground font-medium">{doctor.name}</p></div>
                <button onClick={onClose} className="p-3 rounded-2xl bg-muted hover:bg-border transition-all text-muted-foreground"><X size={24} /></button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="flex justify-center mb-8">
                    <div className="relative group">
                        <input type="file" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer z-10" accept="image/*" />
                        <div className="w-28 h-28 rounded-[32px] bg-muted border-4 border-dashed border-border flex flex-col items-center justify-center text-muted-foreground group-hover:border-primary/50 transition-all overflow-hidden relative">
                           {formData.profilePic ? (
                               <img src={formData.profilePic} className="w-full h-full object-cover" />
                           ) : (
                               <>
                                 {isUploading ? <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary border-t-transparent" /> : <Save size={20} />}
                               </>
                           )}
                           <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                               <p className="text-[10px] font-black text-white uppercase">Change</p>
                           </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Specialty')}</label>
                        <input type="text" value={formData.specialty} onChange={e => setFormData({...formData, specialty: e.target.value})} className="w-full h-14 px-6 rounded-2xl bg-muted border border-border outline-none font-bold text-card-foreground" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Department')}</label>
                        <input type="text" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} className="w-full h-14 px-6 rounded-2xl bg-muted border border-border outline-none font-bold text-card-foreground" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Professional Bio')}</label>
                    <textarea value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} className="w-full p-6 rounded-2xl bg-muted border border-border outline-none font-bold text-card-foreground min-h-[120px]" />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Education / Qualifications')}</label>
                    <input type="text" value={formData.education} onChange={e => setFormData({...formData, education: e.target.value})} className="w-full h-14 px-6 rounded-2xl bg-muted border border-border outline-none font-bold text-card-foreground" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Expertise (comma separated)')}</label>
                        <input type="text" value={formData.expertise} onChange={e => setFormData({...formData, expertise: e.target.value})} className="w-full h-14 px-6 rounded-2xl bg-muted border border-border outline-none font-bold text-card-foreground" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Awards (comma separated)')}</label>
                        <input type="text" value={formData.awards} onChange={e => setFormData({...formData, awards: e.target.value})} className="w-full h-14 px-6 rounded-2xl bg-muted border border-border outline-none font-bold text-card-foreground" />
                    </div>
                </div>

                <div className="flex items-center gap-4 bg-muted/50 p-6 rounded-2xl border border-border shadow-sm">
                    <input 
                        type="checkbox" 
                        id="isActive"
                        checked={formData.isActive}
                        onChange={e => setFormData({...formData, isActive: e.target.checked})}
                        className="w-6 h-6 rounded-lg accent-primary" 
                    />
                    <label htmlFor="isActive" className="text-lg font-black text-card-foreground tracking-tight">{t('Is Doctor On Duty?')}</label>
                </div>

                <div className="space-y-4">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                        <CalendarDays size={14} className="text-primary" /> {t('Available Days')}
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {days.map(day => (
                            <button
                                key={day}
                                type="button"
                                onClick={() => toggleDay(day)}
                                className={`px-4 py-2 rounded-xl font-bold text-sm transition-all border ${
                                    formData.availableDays.includes(day)
                                    ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105'
                                    : 'bg-muted text-muted-foreground border-border hover:bg-border'
                                }`}
                            >
                                {day}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                             <Clock size={14} className="text-primary" /> {t('Start Time')}
                        </label>
                        <input type="time" value={formData.startTime} onChange={e => setFormData({...formData, startTime: e.target.value})} className="w-full h-14 px-6 rounded-2xl bg-muted border border-border outline-none font-bold text-card-foreground" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                             <Clock size={14} className="text-primary" /> {t('End Time')}
                        </label>
                        <input type="time" value={formData.endTime} onChange={e => setFormData({...formData, endTime: e.target.value})} className="w-full h-14 px-6 rounded-2xl bg-muted border border-border outline-none font-bold text-card-foreground" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Consultation Fee')}</label>
                    <div className="relative">
                        <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-primary">৳</span>
                        <input type="number" value={formData.fee} onChange={e => setFormData({...formData, fee: Number(e.target.value)})} className="w-full h-14 pl-10 pr-6 rounded-2xl bg-muted border border-border outline-none font-bold text-card-foreground" />
                    </div>
                </div>

                <Button type="submit" className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-background font-black text-lg shadow-xl shadow-primary/20 mt-4 gap-2 transition-all active:scale-[0.98]">
                    <Save size={20} /> {t('Save Total Profile')}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
