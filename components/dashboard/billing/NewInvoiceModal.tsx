'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'

interface NewInvoiceModalProps {
  show: boolean
  onClose: () => void
  patients: any[]
  formData: any
  setFormData: (data: any) => void
  onSubmit: (e: React.FormEvent) => void
  isSubmitting: boolean
  onAddItem: () => void
  onRemoveItem: (index: number) => void
  totalAmount: number
}

export default function NewInvoiceModal({ show, onClose, patients, formData, setFormData, onSubmit, isSubmitting, onAddItem, onRemoveItem, totalAmount }: NewInvoiceModalProps) {
  const { t } = useLanguage()

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => !isSubmitting && onClose()} className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-card border border-border rounded-[3rem] shadow-2xl overflow-hidden"
          >
            <div className="p-8 md:p-10 max-h-[90vh] overflow-y-auto custom-scrollbar">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-black text-card-foreground tracking-tighter">{t('Create New Invoice')}</h2>
                  <p className="text-muted-foreground font-medium">{t('Generate printable billing for patient')}</p>
                </div>
                <button onClick={onClose} className="p-3 rounded-2xl bg-muted hover:bg-border transition-all text-muted-foreground"><X size={24} /></button>
              </div>

              <form onSubmit={onSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Select Patient')}</label>
                  <select value={formData.patientId} onChange={(e) => setFormData({...formData, patientId: e.target.value})}
                    className="w-full h-14 px-6 rounded-2xl bg-muted border border-border outline-none transition-all font-black text-card-foreground focus:ring-4 focus:ring-primary/10"
                  >
                    <option value="">{t('Choose a patient...')}</option>
                    {patients.map(p => <option key={p.id} value={p.id}>{p.name} ({p.patientId})</option>)}
                  </select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between px-1">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">{t('Invoice Items')}</label>
                    <button type="button" onClick={onAddItem} className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline flex items-center gap-1">
                      <Plus size={14} /> {t('Add Item')}
                    </button>
                  </div>
                  
                  {formData.items.map((item: any, index: number) => (
                    <div key={index} className="flex gap-4 items-end bg-muted/30 p-4 rounded-2xl border border-border/50">
                      <div className="flex-grow space-y-1">
                        <input type="text" required placeholder="Item Description" value={item.name}
                          onChange={(e) => {
                            const newItems = [...formData.items]
                            newItems[index].name = e.target.value
                            setFormData({ ...formData, items: newItems })
                          }}
                          className="w-full h-12 px-5 rounded-xl bg-card border border-border outline-none font-bold text-sm"
                        />
                      </div>
                      <div className="w-32 space-y-1">
                        <input type="number" required placeholder="0.00" value={item.price || ''}
                          onChange={(e) => {
                            const newItems = [...formData.items]
                            newItems[index].price = Number(e.target.value)
                            setFormData({ ...formData, items: newItems })
                          }}
                          className="w-full h-12 px-5 rounded-xl bg-card border border-border outline-none font-bold text-sm"
                        />
                      </div>
                      <button type="button" onClick={() => onRemoveItem(index)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={18} /></button>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-border/50">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Initial Paid Amount')}</label>
                    <input type="number" value={formData.paidAmount || ''} onChange={(e) => setFormData({...formData, paidAmount: Number(e.target.value)})} placeholder="0.00"
                      className="w-full h-14 px-6 rounded-2xl bg-muted border border-border outline-none transition-all font-bold"
                    />
                  </div>
                  <div className="bg-primary/5 rounded-2xl p-6 flex flex-col justify-center items-end">
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary/70 mb-1">{t('Grand Total')}</p>
                    <p className="text-3xl font-black text-primary tracking-tighter">${totalAmount.toLocaleString()}</p>
                  </div>
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-background font-black text-lg shadow-xl shadow-primary/20 mt-4">
                  {isSubmitting ? t('Generating Invoice...') : t('Save & Create Invoice')}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
