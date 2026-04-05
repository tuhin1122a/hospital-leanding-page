'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, User, Calendar, Phone, Mail, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'

interface RegisterPatientModalProps {
  show: boolean
  onClose: () => void
  onSubmit: (e: React.FormEvent) => void
  formData: any
  setFormData: (data: any) => void
  isSubmitting: boolean
}

export default function RegisterPatientModal({ show, onClose, onSubmit, formData, setFormData, isSubmitting }: RegisterPatientModalProps) {
  const { t } = useLanguage()

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => !isSubmitting && onClose()} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-2xl bg-card border border-border rounded-[3rem] shadow-2xl overflow-hidden">
            <div className="p-8 md:p-10 max-h-[90vh] overflow-y-auto custom-scrollbar">
              <div className="flex items-center justify-between mb-8">
                <div><h2 className="text-3xl font-black text-card-foreground tracking-tighter">{t('Register Patient')}</h2><p className="text-muted-foreground font-medium">{t('Add new patient to hospital records')}</p></div>
                <button onClick={onClose} className="p-3 rounded-2xl bg-muted hover:bg-border transition-all text-muted-foreground"><X size={24} /></button>
              </div>
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2"><label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Full Name')} *</label>
                    <div className="relative"><User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" /><input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="John Doe" className="w-full h-14 pl-14 px-6 rounded-2xl bg-muted border border-border focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold" /></div>
                  </div>
                  <div className="space-y-2"><label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Age')} *</label>
                    <div className="relative"><Calendar size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" /><input type="number" required value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} placeholder="32" className="w-full h-14 pl-14 px-6 rounded-2xl bg-muted border border-border focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold" /></div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2"><label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Phone Number')} *</label>
                    <div className="relative"><Phone size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" /><input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="+880" className="w-full h-14 pl-14 px-6 rounded-2xl bg-muted border border-border focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold" /></div>
                  </div>
                  <div className="space-y-2"><label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Email')}</label>
                    <div className="relative"><Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" /><input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="john@example.com" className="w-full h-14 pl-14 px-6 rounded-2xl bg-muted border border-border focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold" /></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <select value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})} className="h-14 px-6 rounded-2xl bg-muted border border-border font-black text-sm outline-none focus:ring-4 focus:ring-primary/10"><option value="Male">Male</option><option value="Female">Female</option></select>
                  <select value={formData.bloodGroup} onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})} className="h-14 px-6 rounded-2xl bg-muted border border-border font-black text-sm outline-none focus:ring-4 focus:ring-primary/10">{['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}</select>
                </div>
                <div className="space-y-2"><label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Address')}</label><textarea rows={3} value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} placeholder="123 Hospital Road" className="w-full p-4 rounded-2xl bg-muted border border-border outline-none transition-all font-bold text-sm resize-none" /></div>
                <Button type="submit" disabled={isSubmitting} className="w-full h-16 rounded-2xl bg-primary text-background font-black text-lg shadow-xl shadow-primary/20">{isSubmitting ? t('Registering...') : t('Register Information')}</Button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
