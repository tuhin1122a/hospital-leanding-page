'use client'

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Send, Download } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface InvoiceTableProps {
  invoices: any[]
  onRequestDiscount: (invoice: any) => void
}

export default function InvoiceTable({ invoices, onRequestDiscount }: InvoiceTableProps) {
  const { t } = useLanguage()

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-border/50">
            <TableHead className="px-10 py-5 font-black uppercase tracking-widest text-[10px] text-muted-foreground/70">{t('Invoice ID')}</TableHead>
            <TableHead className="px-10 py-5 font-black uppercase tracking-widest text-[10px] text-muted-foreground/70">{t('Patient')}</TableHead>
            <TableHead className="px-10 py-5 font-black uppercase tracking-widest text-[10px] text-muted-foreground/70">{t('Date')}</TableHead>
            <TableHead className="px-10 py-5 font-black uppercase tracking-widest text-[10px] text-muted-foreground/70">{t('Total Amount')}</TableHead>
            <TableHead className="px-10 py-5 font-black uppercase tracking-widest text-[10px] text-muted-foreground/70">{t('Paid')}</TableHead>
            <TableHead className="px-10 py-5 font-black uppercase tracking-widest text-[10px] text-muted-foreground/70">{t('Dues')}</TableHead>
            <TableHead className="px-10 py-5 font-black uppercase tracking-widest text-[10px] text-muted-foreground/70">{t('Status')}</TableHead>
            <TableHead className="px-10 py-5 font-black uppercase tracking-widest text-[10px] text-muted-foreground/70 text-right">{t('Action')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((inv, i) => (
            <TableRow key={i} className="group border-border/50 hover:bg-muted/50 transition-colors">
              <TableCell className="px-10 py-6"><span className="font-black text-card-foreground tracking-tight">{inv.invoiceNo}</span></TableCell>
              <TableCell className="px-10 py-6 font-bold text-muted-foreground">{inv.patient?.name}</TableCell>
              <TableCell className="px-10 py-6 text-sm font-bold text-muted-foreground">{new Date(inv.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className="px-10 py-6"><span className="font-black text-card-foreground">${inv.totalAmount.toLocaleString()}</span></TableCell>
              <TableCell className="px-10 py-6 font-bold text-emerald-600">${inv.paidAmount.toLocaleString()}</TableCell>
              <TableCell className="px-10 py-6 font-bold text-amber-600">${inv.dueAmount.toLocaleString()}</TableCell>
              <TableCell className="px-10 py-6">
                <Badge className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-none shadow-sm ${
                  inv.status === 'PAID' ? 'bg-emerald-500 text-background' : 
                  inv.status === 'PARTIAL' ? 'bg-amber-500 text-background' : 'bg-red-500 text-background'
                }`}>
                  {inv.status}
                </Badge>
              </TableCell>
              <TableCell className="px-10 py-6 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button onClick={() => onRequestDiscount(inv)} title={t('Request Discount')} className="p-2.5 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all"><Send size={18} /></button>
                  <button className="p-2.5 rounded-xl bg-muted text-muted-foreground/70 hover:text-primary hover:bg-primary/5 transition-all"><Download size={18} /></button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
