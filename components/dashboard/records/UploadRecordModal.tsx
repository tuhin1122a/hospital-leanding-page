'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, FileText, User, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'

interface UploadRecordModalProps {
  show: boolean
  onClose: () => void
  onSubmit: (e: React.FormEvent) => void
  formData: any
  setFormData: (data: any) => void
  isSubmitting: boolean
}

export default function UploadRecordModal({ show, onClose, onSubmit, formData, setFormData, isSubmitting }: UploadRecordModalProps) {
  const { t } = useLanguage()

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-2xl bg-card border border-border rounded-[3rem] shadow-2xl overflow-hidden">
            <div className="p-8 md:p-10 max-h-[90vh] overflow-y-auto custom-scrollbar">
              <div className="flex items-center justify-between mb-8">
                <div><h2 className="text-3xl font-black text-card-foreground tracking-tighter">{t('Upload Medical File')}</h2><p className="text-muted-foreground font-medium">{t('Securely store diagnostic documents')}</p></div>
                <button onClick={onClose} className="p-3 rounded-2xl bg-muted hover:bg-border transition-all"><X size={24} /></button>
              </div>
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2"><label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Patient Name')} *</label>
                     <div className="relative"><User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" /><input type="text" required value={formData.patient} onChange={(e) => setFormData({...formData, patient: e.target.value})} placeholder="Zayn Malik" className="w-full h-14 pl-14 px-6 rounded-2xl bg-muted border border-border outline-none font-bold" /></div>
                   </div>
                   <div className="space-y-2"><label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Document Type')} *</label>
                     <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full h-14 px-6 rounded-2xl bg-muted border border-border font-black text-sm outline-none focus:ring-4 focus:ring-primary/10"><option value="Lab Report">Lab Report</option><option value="Prescription">Prescription</option><option value="X-Ray Scan">X-Ray Scan</option><option value="Surgery Summary">Surgery Summary</option></select>
                   </div>
                </div>
                <div className="space-y-2"><label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Diagnostic Specialist')} *</label>
                   <div className="relative"><ShieldCheck size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" /><input type="text" required value={formData.doctor} onChange={(e) => setFormData({...formData, doctor: e.target.value})} placeholder="Dr. Rajesh Sharma" className="w-full h-14 pl-14 px-6 rounded-2xl bg-muted border border-border outline-none font-bold" /></div>
                </div>
                <div className="p-8 border-2 border-dashed border-border rounded-[2rem] text-center hover:border-primary/40 transition-all cursor-pointer group"><div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all"><FileText className="text-primary" size={24} /></div><p className="font-black text-card-foreground">{t('Drag and drop files here')}</p><p className="text-xs font-bold text-muted-foreground mt-1">{t('Max file size: 50MB (PDF, PNG, JPG)')}</p></div>
                <Button type="submit" disabled={isSubmitting} className="w-full h-16 rounded-2xl bg-primary text-background font-black text-lg shadow-xl shadow-primary/20">{isSubmitting ? t('Encrypting...') : t('Secure Upload')}</Button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
