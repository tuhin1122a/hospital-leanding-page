'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'

interface AdmissionModalProps {
  show: boolean
  onClose: () => void
  patients: any[]
  formData: any
  setFormData: (data: any) => void
  onSubmit: (e: React.FormEvent) => void
  isSubmitting: boolean
}

export default function AdmissionModal({ show, onClose, patients, formData, setFormData, onSubmit, isSubmitting }: AdmissionModalProps) {
  const { t } = useLanguage()

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => !isSubmitting && onClose()} className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-8 md:p-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-black text-card-foreground tracking-tighter">{t('New Admission')}</h2>
                  <p className="text-muted-foreground font-medium">{t('Assign a bed to an existing patient')}</p>
                </div>
                <button onClick={onClose} className="p-3 rounded-2xl bg-muted hover:bg-border transition-all text-muted-foreground"><X size={24} /></button>
              </div>

              <form onSubmit={onSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Select Patient')}</label>
                  <select value={formData.patientId} onChange={(e) => setFormData({...formData, patientId: e.target.value})}
                    className="w-full h-14 px-6 rounded-2xl bg-muted border border-border focus:ring-4 focus:ring-primary/10 outline-none transition-all font-black text-card-foreground"
                  >
                    <option value="">{t('Choose a patient...')}</option>
                    {patients.map(p => <option key={p.id} value={p.id}>{p.name} ({p.patientId})</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Ward / Dept')}</label>
                    <input type="text" required value={formData.wardNo} onChange={(e) => setFormData({...formData, wardNo: e.target.value})} placeholder="e.g. Ward-A"
                      className="w-full h-14 px-6 rounded-2xl bg-muted border border-border focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Bed Number')}</label>
                    <input type="text" required value={formData.bedNo} onChange={(e) => setFormData({...formData, bedNo: e.target.value})} placeholder="e.g. 102"
                      className="w-full h-14 px-6 rounded-2xl bg-muted border border-border focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Doctor In-Charge')}</label>
                  <input type="text" value={formData.doctorInCharge} onChange={(e) => setFormData({...formData, doctorInCharge: e.target.value})} placeholder="Doctor Name"
                    className="w-full h-14 px-6 rounded-2xl bg-muted border border-border focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold"
                  />
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-background font-black text-lg shadow-xl shadow-primary/20 mt-4">
                  {isSubmitting ? t('Admitting...') : t('Confirm Admission')}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
