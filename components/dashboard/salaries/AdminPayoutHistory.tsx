'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { DollarSign } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

interface AdminPayoutHistoryProps {
  history: any[]
}

export default function AdminPayoutHistory({ history }: AdminPayoutHistoryProps) {
  const { t } = useLanguage()

  return (
    <Card className="rounded-2xl border border-border overflow-hidden shadow-sm flex flex-col h-full bg-slate-50/50">
      <div className="p-6 border-b border-border bg-card">
        <h2 className="text-xl font-black tracking-tight">{t('Recent Payouts')}</h2>
        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-0.5">{t('Live record log')}</p>
      </div>
      <div className="flex-grow overflow-y-auto max-h-[680px] custom-scrollbar p-2">
        {history.length === 0 ? (
          <div className="text-center py-20 opacity-30 font-black uppercase text-[10px] tracking-widest">{t('No history')}</div>
        ) : history.map((h, i) => (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            key={i} 
            className="p-4 mb-2 bg-card rounded-xl border border-border shadow-sm flex items-center justify-between hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:rotate-12 transition-transform">
                <DollarSign size={18} />
              </div>
              <div>
                <p className="font-bold text-xs truncate max-w-[120px]">{h.user?.name}</p>
                <p className="text-[9px] text-muted-foreground font-black uppercase">{t('Month')}: {h.month}/{h.year}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-black text-sm text-emerald-600">+${h.amount.toLocaleString()}</p>
              <p className="text-[9px] text-muted-foreground font-semibold uppercase">{new Date(h.paymentDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  )
}
