'use client'

import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from '@/components/ui/badge'
import { FileText, User, Eye, Download } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface RecordsTableProps { records: any[] }

export default function RecordsTable({ records }: RecordsTableProps) {
  const { t } = useLanguage()

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader><TableRow className="hover:bg-transparent border-border/50">{['Document ID', 'Patient', 'Type', 'Specialist', 'Date', 'Status', 'Action'].map(h => <TableHead key={h} className="px-8 py-5 font-black uppercase tracking-widest text-[10px] text-muted-foreground/70">{t(h)}</TableHead>)}</TableRow></TableHeader>
        <TableBody>
          {records.map((r, i) => (
            <TableRow key={i} className="group border-border/50 hover:bg-muted/50 transition-colors">
              <TableCell className="px-8 py-6"><div className="flex items-center gap-3"><FileText size={18} className="text-primary opacity-40" /><span className="font-black text-card-foreground tracking-tight">{r.id}</span></div></TableCell>
              <TableCell className="px-8 py-6 font-bold text-muted-foreground">{r.patient}</TableCell>
              <TableCell className="px-8 py-6"><Badge variant="outline" className="font-black text-[10px] uppercase tracking-wider bg-muted border-border text-muted-foreground/70 px-3 py-1 rounded-lg">{t(r.type)}</Badge></TableCell>
              <TableCell className="px-8 py-6 font-bold text-muted-foreground"><div className="flex items-center gap-2"><User size={14} className="text-primary/40" />{r.doctor}</div></TableCell>
              <TableCell className="px-8 py-6"><div className="flex flex-col leading-none"><span className="font-bold text-card-foreground text-sm mb-1">{r.date}</span><span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground/70">{r.size}</span></div></TableCell>
              <TableCell className="px-8 py-6"><Badge className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-none shadow-sm ${r.status === 'Finalized' ? 'bg-emerald-500 text-background' : r.status === 'Pending' ? 'bg-amber-500 text-background' : 'bg-zinc-400 text-background'}`}>{t(r.status)}</Badge></TableCell>
              <TableCell className="px-8 py-6 text-right"><div className="flex items-center justify-end gap-2 pr-2"><button className="p-2.5 rounded-xl bg-muted text-muted-foreground/70 hover:text-primary hover:bg-primary/5 transition-all"><Eye size={18} /></button><button className="p-2.5 rounded-xl bg-muted text-muted-foreground/70 hover:text-primary hover:bg-primary/5 transition-all"><Download size={18} /></button></div></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
