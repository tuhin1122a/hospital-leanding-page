'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Clock, Download, Eye, FileText, Filter, Search, ShieldAlert, User } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const records = [
  { id: 'REC-2026-001', patient: 'Zayn Malik', type: 'Lab Report', doctor: 'Dr. Rajesh Sharma', date: 'Feb 21, 2026', size: '2.4 MB', status: 'Finalized' },
  { id: 'REC-2026-002', patient: 'Emma Watson', type: 'Prescription', doctor: 'Dr. Priya Kapoor', date: 'Feb 22, 2026', size: '156 KB', status: 'Pending' },
  { id: 'REC-2026-003', patient: 'Robert Downey', type: 'X-Ray Scan', doctor: 'Dr. Arjun Patel', date: 'Feb 19, 2026', size: '12.8 MB', status: 'Finalized' },
  { id: 'REC-2026-004', patient: 'Scarlett Johansson', type: 'Surgery Summary', doctor: 'Dr. Vikram Singh', date: 'Feb 15, 2026', size: '842 KB', status: 'Archived' },
  { id: 'REC-2026-005', patient: 'Tom Holland', type: 'Vaccination', doctor: 'Dr. Sneha Gupta', date: 'Feb 10, 2026', size: '42 KB', status: 'Finalized' },
]

export default function RecordsPage() {
  const { t } = useLanguage()

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-card-foreground tracking-tighter">{t('Medical Records')}</h1>
          <p className="text-muted-foreground font-medium text-lg mt-1">{t('Unified access to diagnostic data and health history')}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-14 px-8 rounded-2xl border-border text-muted-foreground font-black">
             {t('Access Logs')}
          </Button>
          <Button className="h-14 px-8 rounded-2xl bg-foreground text-background font-black hover:hover:bg-foreground/80 transition-all shadow-xl shadow-zinc-950/20">
             {t('Digital Vault')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: t('Total Records'), value: '14,235', icon: FileText, color: 'text-primary' },
           { label: t('Cloud Storage'), value: '82%', icon: Clock, color: 'text-amber-500' },
           { label: t('Encryption'), value: 'AES-256', icon: ShieldAlert, color: 'text-emerald-500' },
           { label: t('Recent Access'), value: '142', icon: Eye, color: 'text-purple-500' },
         ].map((stat, i) => (
           <div key={i} className="bg-card p-6 rounded-[2rem] border border-border shadow-sm flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-muted flex items-center justify-center">
                 <stat.icon className={stat.color} />
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 leading-none mb-1">{stat.label}</p>
                 <p className="text-xl font-black text-card-foreground">{stat.value}</p>
              </div>
           </div>
         ))}
      </div>

      <div className="bg-card rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
        <div className="p-8 border-b border-border/50 flex flex-col lg:flex-row items-center gap-6">
           <div className="relative flex-grow w-full">
              <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/70" />
              <input 
                type="text" 
                placeholder={t("Search by ID, patient, or document type...")} 
                className="w-full h-14 pl-16 pr-8 rounded-2xl bg-muted/50 border border-border/50 focus:bg-card focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-card-foreground"
              />
           </div>
           <div className="flex items-center gap-3 w-full lg:w-auto">
             <Button variant="outline" className="h-14 px-6 rounded-2xl border-border font-bold text-muted-foreground">
               <Filter size={18} className="mr-2" /> {t('Filter')}
             </Button>
             <Button className="h-14 px-8 rounded-2xl bg-primary text-background font-black">
               {t('Upload File')}
             </Button>
           </div>
        </div>

        <div className="overflow-x-auto">
           <Table>
              <TableHeader>
                 <TableRow className="hover:bg-transparent border-border/50">
                    <TableHead className="px-8 py-5 font-black uppercase tracking-widest text-[10px] text-muted-foreground/70">{t('Document ID')}</TableHead>
                    <TableHead className="px-8 py-5 font-black uppercase tracking-widest text-[10px] text-muted-foreground/70">{t('Patient')}</TableHead>
                    <TableHead className="px-8 py-5 font-black uppercase tracking-widest text-[10px] text-muted-foreground/70">{t('Type')}</TableHead>
                    <TableHead className="px-8 py-5 font-black uppercase tracking-widest text-[10px] text-muted-foreground/70">{t('Specialist')}</TableHead>
                    <TableHead className="px-8 py-5 font-black uppercase tracking-widest text-[10px] text-muted-foreground/70">{t('Date')}</TableHead>
                    <TableHead className="px-8 py-5 font-black uppercase tracking-widest text-[10px] text-muted-foreground/70">{t('Status')}</TableHead>
                    <TableHead className="px-8 py-5 font-black uppercase tracking-widest text-[10px] text-muted-foreground/70 text-right">{t('Action')}</TableHead>
                 </TableRow>
              </TableHeader>
              <TableBody>
                 {records.map((record, i) => (
                   <TableRow key={i} className="group border-border/50 hover:bg-muted/50 transition-colors">
                      <TableCell className="px-8 py-6">
                         <div className="flex items-center gap-3">
                            <FileText size={18} className="text-primary opacity-40" />
                            <span className="font-black text-card-foreground tracking-tight">{record.id}</span>
                         </div>
                      </TableCell>
                      <TableCell className="px-8 py-6 font-bold text-muted-foreground">{record.patient}</TableCell>
                      <TableCell className="px-8 py-6">
                         <Badge variant="outline" className="font-black text-[10px] uppercase tracking-wider bg-muted border-border text-muted-foreground/70 px-3 py-1 rounded-lg">
                           {record.type}
                         </Badge>
                      </TableCell>
                      <TableCell className="px-8 py-6 font-bold text-muted-foreground">
                         <div className="flex items-center gap-2">
                            <User size={14} className="text-primary/40" />
                            {record.doctor}
                         </div>
                      </TableCell>
                      <TableCell className="px-8 py-6">
                         <div className="flex flex-col leading-none">
                            <span className="font-bold text-card-foreground text-sm mb-1">{record.date}</span>
                            <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground/70">{record.size}</span>
                         </div>
                      </TableCell>
                      <TableCell className="px-8 py-6">
                         <Badge className={cn(
                           "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-none shadow-sm",
                           record.status === 'Finalized' ? 'bg-emerald-500 text-background' : 
                           record.status === 'Pending' ? 'bg-amber-500 text-background' : 'bg-zinc-400 text-background'
                         )}>
                           {t(record.status)}
                         </Badge>
                      </TableCell>
                      <TableCell className="px-8 py-6 text-right">
                         <div className="flex items-center justify-end gap-2 pr-2">
                            <button className="p-2.5 rounded-xl bg-muted text-muted-foreground/70 hover:text-primary hover:bg-primary/5 transition-all">
                               <Eye size={18} />
                            </button>
                            <button className="p-2.5 rounded-xl bg-muted text-muted-foreground/70 hover:text-primary hover:bg-primary/5 transition-all">
                               <Download size={18} />
                            </button>
                         </div>
                      </TableCell>
                   </TableRow>
                 ))}
              </TableBody>
           </Table>
        </div>
      </div>
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ')
}
