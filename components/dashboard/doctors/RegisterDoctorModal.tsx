'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'

interface RegisterDoctorModalProps {
  show: boolean
  onClose: () => void
  onSubmit: (e: React.FormEvent) => void
}

export default function RegisterDoctorModal({ show, onClose, onSubmit }: RegisterDoctorModalProps) {
  const { t } = useLanguage()

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
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="flex justify-center mb-8">
                   <div className="w-32 h-32 rounded-xl bg-muted border-2 border-dashed border-border flex flex-col items-center justify-center text-muted-foreground hover:border-primary/50 cursor-pointer transition-all">
                      <Upload size={24} className="mb-2" />
                      <span className="text-[10px] font-black uppercase tracking-widest">{t('Upload Photo')}</span>
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Full Name')}</label>
                    <input type="text" required placeholder="Dr. Rajesh Sharma" className="w-full h-14 px-6 rounded-2xl bg-muted border border-border outline-none transition-all font-bold text-card-foreground" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Specialty')}</label>
                    <select className="w-full h-14 px-6 rounded-2xl bg-muted border border-border outline-none transition-all font-bold text-card-foreground">
                       <option>Cardiology</option>
                       <option>Neurology</option>
                       <option>Orthopedics</option>
                       <option>Pediatrics</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Experience')}</label>
                    <input type="text" required placeholder="e.g. 15 Years" className="w-full h-14 px-6 rounded-2xl bg-muted border border-border outline-none transition-all font-bold text-card-foreground" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Phone Number')}</label>
                    <input type="tel" required placeholder="+880 1XXX XXXXXX" className="w-full h-14 px-6 rounded-2xl bg-muted border border-border outline-none transition-all font-bold text-card-foreground" />
                  </div>
                </div>
                <Button type="submit" className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-background font-black text-lg shadow-xl shadow-primary/20 mt-4">{t('Confirm Registration')}</Button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
