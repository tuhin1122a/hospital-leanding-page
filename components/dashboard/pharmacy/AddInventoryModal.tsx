'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Pill, Package, CreditCard, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'

interface AddInventoryModalProps {
  show: boolean
  onClose: () => void
  onSubmit: (e: React.FormEvent) => void
  formData: any
  setFormData: (data: any) => void
  isSubmitting: boolean
}

export default function AddInventoryModal({ show, onClose, onSubmit, formData, setFormData, isSubmitting }: AddInventoryModalProps) {
  const { t } = useLanguage()

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-8 md:p-10 max-h-[90vh] overflow-y-auto custom-scrollbar">
              <div className="flex items-center justify-between mb-8">
                <div><h2 className="text-3xl font-black text-card-foreground tracking-tighter">{t('Add Inventory')}</h2><p className="text-muted-foreground font-medium">{t('Stock new pharmaceutical supplies')}</p></div>
                <button onClick={onClose} className="p-3 rounded-2xl bg-muted hover:bg-border transition-all"><X size={24} /></button>
              </div>
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2"><label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Medicine Name')} *</label>
                    <div className="relative"><Pill size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" /><input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Paracetamol" className="w-full h-14 pl-14 px-6 rounded-2xl bg-muted border border-border outline-none font-bold" /></div>
                  </div>
                  <div className="space-y-2"><label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Stock Quantity')} *</label>
                    <div className="relative"><Package size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" /><input type="number" required value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} placeholder="100" className="w-full h-14 pl-14 px-6 rounded-2xl bg-muted border border-border outline-none font-bold" /></div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2"><label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Unit Price')} *</label>
                    <div className="relative"><CreditCard size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" /><input type="text" required value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} placeholder="৳10.00" className="w-full h-14 pl-14 px-6 rounded-2xl bg-muted border border-border outline-none font-bold" /></div>
                  </div>
                  <div className="space-y-2"><label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Expiry Date')} *</label>
                    <div className="relative"><Calendar size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" /><input type="text" required value={formData.expiry} onChange={(e) => setFormData({...formData, expiry: e.target.value})} placeholder="MM/YYYY" className="w-full h-14 pl-14 px-6 rounded-2xl bg-muted border border-border outline-none font-bold" /></div>
                  </div>
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full h-16 rounded-2xl bg-primary text-background font-black text-lg shadow-xl shadow-primary/20">{isSubmitting ? t('Saving...') : t('Save Inventory')}</Button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
