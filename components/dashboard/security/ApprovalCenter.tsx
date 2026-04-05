'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Clock, Check, X, UserCheck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/contexts/LanguageContext'

interface ApprovalCenterProps {
  approvals: any[]
  onAction: (id: string, status: 'APPROVED' | 'REJECTED') => void
  isLoading: boolean
}

export default function ApprovalCenter({ approvals, onAction, isLoading }: ApprovalCenterProps) {
  const { t } = useLanguage()

  return (
    <div className="bg-card rounded-[3rem] border border-border p-10 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />
      <div className="flex items-center justify-between mb-10 relative z-10">
        <div><h3 className="text-2xl font-black text-card-foreground tracking-tight">{t('Approval Center')}</h3><p className="text-sm text-muted-foreground font-medium">{t('Critical actions requiring administrative authorization')}</p></div>
        <Badge className="bg-primary/10 text-primary border-none text-[10px] font-black tracking-widest px-4 py-1.5 rounded-full">{approvals.filter(a => a.status === 'PENDING').length} {t('Pending Requests')}</Badge>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {isLoading ? [1,2,3].map(i => <div key={i} className="h-48 rounded-[2rem] bg-muted animate-pulse" />) : approvals.length === 0 ? (
          <div className="col-span-full text-center py-20 bg-muted/20 rounded-[2rem] border border-dashed border-border"><UserCheck size={48} className="mx-auto text-muted-foreground/30 mb-4" /><p className="text-lg font-bold text-muted-foreground">{t('No pending approval requests')}</p></div>
        ) : approvals.map((req) => (
          <motion.div key={req.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-6 rounded-[2rem] border border-border bg-card/50 hover:shadow-xl transition-all">
            <div className="flex items-start justify-between mb-4"><div className="p-3 rounded-xl bg-primary/10 text-primary"><Clock size={20} /></div><Badge className={`px-3 py-0.5 rounded-full text-[9px] font-black uppercase border-none ${req.status === 'PENDING' ? 'bg-amber-500 text-background' : req.status === 'APPROVED' ? 'bg-emerald-500 text-background' : 'bg-red-500 text-background'}`}>{req.status}</Badge></div>
            <h4 className="font-black text-card-foreground text-lg mb-1 leading-tight">{req.type}</h4><p className="text-xs font-bold text-muted-foreground/80 mb-4">{req.description}</p>
            {req.amount && <div className="mb-6 bg-muted/50 p-3 rounded-xl inline-block border border-border/50"><p className="text-[9px] font-black uppercase text-muted-foreground/70 mb-0.5">{t('Amount')}</p><p className="text-lg font-black text-card-foreground tracking-tighter">${req.amount.toLocaleString()}</p></div>}
            {req.status === 'PENDING' && <div className="flex gap-2"><button onClick={() => onAction(req.id, 'APPROVED')} className="flex-grow h-12 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-background font-black text-xs transition-all flex items-center justify-center gap-1"><Check size={16} /> {t('Approve')}</button><button onClick={() => onAction(req.id, 'REJECTED')} className="flex-grow h-12 rounded-xl bg-red-500 hover:bg-red-600 text-background font-black text-xs transition-all flex items-center justify-center gap-1"><X size={16} /> {t('Reject')}</button></div>}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
