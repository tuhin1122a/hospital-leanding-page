'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, User, Mail, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'

interface AddStaffModalProps {
  show: boolean
  onClose: () => void
  onSubmit: (e: React.FormEvent) => void
  formData: any
  setFormData: (d: any) => void
  isSubmitting: boolean
}

export default function AddStaffModal({ show, onClose, onSubmit, formData, setFormData, isSubmitting }: AddStaffModalProps) {
  const { t } = useLanguage()

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-lg bg-card border border-border rounded-[3rem] shadow-2xl overflow-hidden">
            <div className="p-8 md:p-10">
              <div className="flex items-center justify-between mb-8"><div><h2 className="text-3xl font-black text-card-foreground tracking-tighter">{t('Add New Staff')}</h2><p className="text-muted-foreground font-medium">{t('Create a professional medical account')}</p></div><button onClick={onClose} className="p-3 rounded-2xl bg-muted hover:bg-border transition-all text-muted-foreground"><X size={24} /></button></div>
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="space-y-2"><label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Full Name')}</label><div className="relative"><User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" /><input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. Dr. Jane Smith" className="w-full h-14 pl-14 pr-6 rounded-2xl bg-muted border border-border focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-card-foreground" /></div></div>
                <div className="space-y-2"><label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Email Address')}</label><div className="relative"><Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" /><input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="jane.smith@nurjahan.com" className="w-full h-14 pl-14 pr-6 rounded-2xl bg-muted border border-border focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-card-foreground" /></div></div>
                <div className="space-y-2"><label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Initial Password')}</label><div className="relative"><Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" /><input type="password" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} placeholder="••••••••" className="w-full h-14 pl-14 pr-6 rounded-2xl bg-muted border border-border focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-card-foreground font-mono" /></div></div>
                <div className="space-y-3"><label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Assign Role')}</label><div className="grid grid-cols-3 gap-3">
                  {['DOCTOR', 'RECEPTIONIST', 'ADMIN', 'PHARMACIST', 'STAFF'].map((r) => (
                    <button key={r} type="button" onClick={() => setFormData({...formData, role: r})} className={`h-12 rounded-2xl border-2 font-black text-[10px] transition-all tracking-tight ${formData.role === r ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-muted/50 text-muted-foreground hover:border-border/80'}`}>{t(r)}</button>
                  ))}
                </div></div>
                <div className="space-y-4 pt-4 border-t border-border/50"><label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Select Permissions')}</label><div className="flex items-center gap-6">
                  {['READ', 'EDIT', 'DELETE'].map((p) => (
                    <label key={p} className="flex items-center gap-2 cursor-pointer group"><input type="checkbox" checked={formData.permissions.includes(p)} onChange={(e) => { const updated = e.target.checked ? [...formData.permissions, p] : formData.permissions.filter((x:string) => x !== p); setFormData({...formData, permissions: updated}) }} className="w-5 h-5 rounded-lg border-2 border-primary/20 accent-primary cursor-pointer transition-all" /><span className="text-sm font-black text-muted-foreground group-hover:text-foreground transition-colors">{t(p)}</span></label>
                  ))}
                </div></div>
                <Button type="submit" disabled={isSubmitting} className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-background font-black text-lg shadow-xl shadow-primary/20 transition-all mt-4">{isSubmitting ? t('Creating Account...') : t('Create Staff Account')}</Button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
