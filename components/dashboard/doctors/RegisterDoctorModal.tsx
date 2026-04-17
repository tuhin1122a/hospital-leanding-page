'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import toast from 'react-hot-toast'

interface RegisterDoctorModalProps {
  show: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function RegisterDoctorModal({ show, onClose, onSuccess }: RegisterDoctorModalProps) {
  const { t } = useLanguage()
  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: 'doctor123',
    profilePic: '',
    specialty: 'General Medicine',
    department: 'General Medicine',
    experience: '',
    fee: 500
  })

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const getCookie = (name: string) => document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop()
    const token = getCookie('accessToken')
    
    setIsUploading(true)
    const formDataUpload = new FormData()
    formDataUpload.append('image', file)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload/image?folder=doctors`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formDataUpload
      })
      if (res.ok) {
        const data = await res.json()
        setFormData({ ...formData, profilePic: data.url })
        toast.success('Photo uploaded!')
      }
    } catch (error) {
      toast.error('Upload failed')
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const getCookie = (name: string) => document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop()
    const token = getCookie('accessToken')

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            profilePic: formData.profilePic,
            role: 'DOCTOR'
        })
      })

      if (res.ok) {
        const user = await res.json()
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors/${user.id}/profile`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                specialty: formData.specialty,
                department: formData.department,
                experience: formData.experience,
                fee: Number(formData.fee)
            })
        })
        toast.success(t('Doctor registered successfully!'))
        onSuccess()
      } else {
        const err = await res.json()
        toast.error(err.message || 'Failed to register')
      }
    } catch (error) {
      toast.error('Connection error')
    }
  }

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-8 md:p-10 max-h-[90vh] overflow-y-auto custom-scrollbar">
              <div className="flex items-center justify-between mb-8">
                <div><h2 className="text-3xl font-black text-card-foreground tracking-tighter">{t('Register New Doctor')}</h2><p className="text-muted-foreground font-medium">{t('Add a new specialist to the medical faculty')}</p></div>
                <button onClick={onClose} className="p-3 rounded-2xl bg-muted hover:bg-border transition-all text-muted-foreground"><X size={24} /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex justify-center mb-8">
                    <div className="relative group">
                        <input type="file" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer z-10" accept="image/*" />
                        <div className="w-32 h-32 rounded-3xl bg-muted border-2 border-dashed border-border flex flex-col items-center justify-center text-muted-foreground group-hover:border-primary/50 transition-all overflow-hidden relative">
                           {formData.profilePic ? (
                               <img src={formData.profilePic} className="w-full h-full object-cover" />
                           ) : (
                               <>
                                 {isUploading ? <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" /> : <Save size={24} className="mb-2" />}
                                 <span className="text-[10px] font-black uppercase tracking-widest text-center px-2">{t('Upload Photo')}</span>
                               </>
                           )}
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Full Name')}</label>
                    <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Dr. Rajesh Sharma" className="w-full h-14 px-6 rounded-2xl bg-muted border border-border outline-none transition-all font-bold text-card-foreground" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Email Address')}</label>
                    <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="doctor@hospital.com" className="w-full h-14 px-6 rounded-2xl bg-muted border border-border outline-none transition-all font-bold text-card-foreground" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Specialty')}</label>
                    <input type="text" required value={formData.specialty} onChange={e => setFormData({...formData, specialty: e.target.value})} className="w-full h-14 px-6 rounded-2xl bg-muted border border-border outline-none transition-all font-bold text-card-foreground" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Experience')}</label>
                    <input type="text" required value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} placeholder="e.g. 15 Years" className="w-full h-14 px-6 rounded-2xl bg-muted border border-border outline-none transition-all font-bold text-card-foreground" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Consultation Fee')}</label>
                    <input type="number" required value={formData.fee} onChange={e => setFormData({...formData, fee: Number(e.target.value)})} className="w-full h-14 px-6 rounded-2xl bg-muted border border-border outline-none transition-all font-bold text-card-foreground" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Department')}</label>
                    <input type="text" required value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} className="w-full h-14 px-6 rounded-2xl bg-muted border border-border outline-none transition-all font-bold text-card-foreground" />
                  </div>
                </div>
                <Button type="submit" className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-background font-black text-lg shadow-xl shadow-primary/20 mt-4 gap-2">
                    <Save size={20} /> {t('Confirm Registration')}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
