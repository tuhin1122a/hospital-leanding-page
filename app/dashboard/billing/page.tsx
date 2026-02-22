'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { CreditCard, DollarSign, Download, ExternalLink, FileCheck, Filter, Search, Wallet } from 'lucide-react'

const invoices = [
  { id: 'INV-001', patient: 'Ahmed Khan', date: 'Feb 23, 2026', amount: '$1,240.00', method: 'Credit Card', status: 'Paid' },
  { id: 'INV-002', patient: 'Sara Perveen', date: 'Feb 22, 2026', amount: '$450.00', method: 'Insurance', status: 'Pending' },
  { id: 'INV-003', patient: 'John Doe', date: 'Feb 21, 2026', amount: '$8,200.00', method: 'Bank Transfer', status: 'Paid' },
  { id: 'INV-004', patient: 'Rita Miller', date: 'Feb 20, 2026', amount: '$120.00', method: 'Cash', status: 'Overdue' },
  { id: 'INV-005', patient: 'Vikram Malhotra', date: 'Feb 19, 2026', amount: '$4,560.00', method: 'Insurance', status: 'Paid' },
]

export default function BillingPage() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-zinc-900 tracking-tighter">Finance & Billing</h1>
          <p className="text-zinc-500 font-medium text-lg mt-1">Manage hospital revenue, insurance claims, and patient invoices</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-14 px-8 rounded-2xl bg-white border-zinc-200 text-zinc-600 font-black shadow-sm">
             Insurance Claims
          </Button>
          <Button className="h-14 px-8 rounded-2xl bg-zinc-950 text-white font-black hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-950/20">
             <CreditCard size={20} className="mr-2" /> New Invoice
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         {[
           { label: 'Total Earnings', value: '$1.2M', icon: DollarSign, color: 'text-emerald-500', trend: '+14% this month' },
           { label: 'Operational Cost', value: '$450K', icon: Wallet, color: 'text-amber-500', trend: 'Maintenance & Utility' },
           { label: 'Staff Salaries', value: '$320K', icon: FileCheck, color: 'text-blue-500', trend: '142 active personnel' },
           { label: 'Net Profit', value: '$430K', icon: CreditCard, color: 'text-primary', trend: '+8% from last month' },
         ].map((stat, i) => (
           <Card key={i} className="p-8 border-none rounded-[2.5rem] bg-white shadow-xl shadow-zinc-200/40 relative overflow-hidden group">
              <div className="relative z-10 flex items-start justify-between">
                 <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">{stat.label}</p>
                    <h4 className="text-3xl font-black text-zinc-900 tracking-tighter">{stat.value}</h4>
                    <p className="text-[10px] font-bold text-zinc-400 mt-4 flex items-center gap-1">
                       <span className={stat.color}>{stat.trend}</span>
                    </p>
                 </div>
                 <div className={cn("p-4 rounded-2xl bg-zinc-50 ", stat.color)}>
                    <stat.icon size={28} />
                 </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-zinc-50 rounded-full group-hover:scale-125 transition-transform duration-700 -z-0" />
           </Card>
         ))}
      </div>

      <div className="bg-white rounded-[2.5rem] border border-zinc-100 shadow-sm overflow-hidden">
        <div className="p-10 flex flex-col lg:flex-row items-center justify-between gap-8 border-b border-zinc-50">
           <div className="relative flex-grow w-full">
              <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input 
                type="text" 
                placeholder="Search by invoice ID or patient name..." 
                className="w-full h-14 pl-16 pr-8 rounded-2xl bg-zinc-50 border border-zinc-100 focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-zinc-900"
              />
           </div>
           <div className="flex items-center gap-4 w-full lg:w-auto">
              <Button variant="outline" className="h-14 px-8 rounded-2xl border-zinc-200 font-bold text-zinc-600">
                 <Filter size={18} className="mr-2" /> Filter Invoices
              </Button>
           </div>
        </div>

        <div className="overflow-x-auto">
           <Table>
              <TableHeader>
                 <TableRow className="hover:bg-transparent border-zinc-50">
                    <TableHead className="px-10 py-5 font-black uppercase tracking-widest text-[10px] text-zinc-400">Invoice ID</TableHead>
                    <TableHead className="px-10 py-5 font-black uppercase tracking-widest text-[10px] text-zinc-400">Patient</TableHead>
                    <TableHead className="px-10 py-5 font-black uppercase tracking-widest text-[10px] text-zinc-400">Date</TableHead>
                    <TableHead className="px-10 py-5 font-black uppercase tracking-widest text-[10px] text-zinc-400">Amount</TableHead>
                    <TableHead className="px-10 py-5 font-black uppercase tracking-widest text-[10px] text-zinc-400">Payment</TableHead>
                    <TableHead className="px-10 py-5 font-black uppercase tracking-widest text-[10px] text-zinc-400">Status</TableHead>
                    <TableHead className="px-10 py-5 font-black uppercase tracking-widest text-[10px] text-zinc-400 text-right">Actions</TableHead>
                 </TableRow>
              </TableHeader>
              <TableBody>
                 {invoices.map((inv, i) => (
                   <TableRow key={i} className="group border-zinc-50 hover:bg-zinc-50/50 transition-colors">
                      <TableCell className="px-10 py-6">
                         <span className="font-black text-zinc-900 tracking-tight">{inv.id}</span>
                      </TableCell>
                      <TableCell className="px-10 py-6 font-bold text-zinc-600">{inv.patient}</TableCell>
                      <TableCell className="px-10 py-6 text-sm font-bold text-zinc-500">{inv.date}</TableCell>
                      <TableCell className="px-10 py-6">
                         <span className="font-black text-zinc-900">{inv.amount}</span>
                      </TableCell>
                      <TableCell className="px-10 py-6 font-bold text-zinc-400 text-xs uppercase tracking-widest">{inv.method}</TableCell>
                      <TableCell className="px-10 py-6">
                         <Badge className={cn(
                           "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-none shadow-sm",
                           inv.status === 'Paid' ? 'bg-emerald-500 text-white' : 
                           inv.status === 'Pending' ? 'bg-amber-500 text-white' : 'bg-red-500 text-white'
                         )}>
                           {inv.status}
                         </Badge>
                      </TableCell>
                      <TableCell className="px-10 py-6 text-right">
                         <div className="flex items-center justify-end gap-2">
                            <button className="p-2.5 rounded-xl bg-zinc-50 text-zinc-400 hover:text-primary hover:bg-primary/5 transition-all">
                               <Download size={18} />
                            </button>
                            <button className="p-2.5 rounded-xl bg-zinc-50 text-zinc-400 hover:text-primary hover:bg-primary/5 transition-all">
                               <ExternalLink size={18} />
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
