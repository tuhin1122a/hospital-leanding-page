'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'

interface CreateDepartmentModalProps {
  show: boolean
  onClose: () => void
  onSubmit: (e: React.FormEvent) => void
}

export default function CreateDepartmentModal({ show, onClose, onSubmit }: CreateDepartmentModalProps) {
  const { t } = useLanguage()

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-lg bg-card border border-border rounded-[3rem] shadow-2xl overflow-hidden">
            <div className="p-8 md:p-10">
              <div className="flex items-center justify-between mb-8">
                <div><h2 className="text-2xl font-black text-card-foreground tracking-tighter">{t('Create New Unit')}</h2><p className="text-muted-foreground font-medium">{t('Add a new clinical department')}</p></div>
                <button onClick={onClose} className="p-3 rounded-2xl bg-muted hover:bg-border transition-all text-muted-foreground"><X size={24} /></button>
              </div>
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Department Name')}</label>
                  <input type="text" required placeholder="e.g. Cardiology" className="w-full h-14 px-6 rounded-2xl bg-muted border border-border outline-none transition-all font-bold text-card-foreground" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Head of Department')}</label>
                  <input type="text" required placeholder="Dr. Name" className="w-full h-14 px-6 rounded-2xl bg-muted border border-border outline-none transition-all font-bold text-card-foreground" />
                </div>
                <Button type="submit" className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-background font-black text-lg shadow-xl shadow-primary/20 mt-4">{t('Create Department')}</Button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
