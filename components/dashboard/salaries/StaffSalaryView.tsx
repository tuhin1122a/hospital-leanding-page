'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TrendingUp, CreditCard } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

interface StaffSalaryViewProps {
  history: any[]
}

export default function StaffSalaryView({ history }: StaffSalaryViewProps) {
  const { t } = useLanguage()

  return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <Card className="p-10 rounded-2xl border border-border shadow-xl flex items-center gap-8 relative overflow-hidden group col-span-1 bg-gradient-to-br from-primary to-primary-foreground text-background">
        <div className="w-20 h-20 bg-background/20 rounded-2xl flex items-center justify-center text-background shrink-0 transform group-hover:rotate-6 transition-transform shadow-inner">
          <CreditCard size={36} />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">{t('Lifetime Earnings')}</p>
          <h3 className="text-5xl font-black tracking-tighter">
            ${history.reduce((acc, h) => acc + h.amount, 0).toLocaleString()}
          </h3>
        </div>
        <div className="absolute -bottom-6 -right-6 text-background/10 scale-150 rotate-12"><TrendingUp size={120} /></div>
      </Card>

      <Card className="lg:col-span-2 rounded-2xl border border-border overflow-hidden shadow-md flex flex-col">
        <div className="p-8 border-b border-border bg-card flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black tracking-tighter">{t('Personal Payment History')}</h2>
            <p className="text-sm text-muted-foreground font-medium">{t('Verified transaction records distributed by administration.')}</p>
          </div>
          <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 rounded-xl px-4 py-2 font-black text-xs uppercase tracking-tighter">
            <TrendingUp size={14} className="mr-2" /> {t('Status: Verified')}
          </Badge>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/30 border-b border-border/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-black text-[11px] uppercase tracking-widest px-8 h-14 text-muted-foreground">{t('Payment Period')}</TableHead>
                <TableHead className="font-black text-[11px] uppercase tracking-widest px-8 h-14 text-muted-foreground">{t('Compensation')}</TableHead>
                <TableHead className="font-black text-[11px] uppercase tracking-widest px-8 h-14 text-muted-foreground">{t('Received On')}</TableHead>
                <TableHead className="font-black text-[11px] uppercase tracking-widest px-8 h-14 text-muted-foreground text-right">{t('Transaction')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.length === 0 ? (
                <TableRow><TableCell colSpan={4} className="text-center py-20 text-muted-foreground font-bold tracking-tight bg-slate-50/50 italic">{t('Your earnings will appear here once distributed.')}</TableCell></TableRow>
              ) : history.map((h, i) => (
                <TableRow key={i} className="hover:bg-muted/20 border-border/40 transition-colors">
                  <TableCell className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <p className="font-black text-lg tracking-tighter">{t('Month')} {h.month}, {h.year}</p>
                    </div>
                  </TableCell>
                  <TableCell className="px-8 font-black text-xl text-emerald-600 tracking-tighter">${h.amount.toLocaleString()}</TableCell>
                  <TableCell className="px-8 text-sm font-bold text-muted-foreground">{new Date(h.paymentDate).toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' })}</TableCell>
                  <TableCell className="px-8 text-right"><Badge className="bg-emerald-600 text-white rounded-lg px-3 py-1 font-black text-[10px] uppercase tracking-widest shadow-md shadow-emerald-500/20">{t('Completed')}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </motion.div>
  )
}
