'use client'

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Printer, Send, Download } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface InvoiceTableProps {
  invoices: any[]
  onRequestDiscount: (invoice: any) => void
}

export default function InvoiceTable({ invoices, onRequestDiscount }: InvoiceTableProps) {
  const { t } = useLanguage()

  const handlePrint = (inv: any) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    const html = `
      <html>
        <head>
          <title>Invoice - ${inv.invoiceNo}</title>
          <style>
            body { font-family: system-ui, sans-serif; color: #111; padding: 40px; }
            .header { text-align: center; border-bottom: 2px solid #eee; padding-bottom: 20px; margin-bottom: 20px; }
            .header h1 { margin: 0; font-size: 24px; }
            .header p { margin: 5px 0; color: #555; }
            .details { display: flex; justify-content: space-between; margin-bottom: 40px; }
            .total { text-align: right; margin-top: 40px; font-size: 20px; font-weight: bold; border-top: 2px solid #eee; padding-top: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
            th { background-color: #f9f9f9; }
          </style>
        </head>
        <body>
          <div class="header">
             <h1>Nurjahan Private Hospital & Diagnostic Center-2</h1>
             <p>24/7 World-class healthcare</p>
          </div>
          <div class="details">
            <div>
              <strong>Invoice To:</strong><br/>
              ${inv.patient?.name}<br/>
              Patient ID: ${inv.patient?.patientId}
            </div>
            <div style="text-align: right;">
              <strong>Invoice No:</strong> ${inv.invoiceNo}<br/>
              <strong>Date:</strong> ${new Date(inv.createdAt).toLocaleDateString()}<br/>
              <strong>Status:</strong> ${inv.status}
            </div>
          </div>
          <table>
             <thead><tr><th>Description</th><th>Amount</th></tr></thead>
             <tbody>
               <tr><td>Medical Services / Treatments</td><td>$${inv.totalAmount.toLocaleString()}</td></tr>
             </tbody>
          </table>
          <div class="total">
             <p>Total Amount: $${inv.totalAmount.toLocaleString()}</p>
             <p style="color: green;">Paid Amount: $${inv.paidAmount.toLocaleString()}</p>
             <p style="color: red;">Due Amount: $${inv.dueAmount.toLocaleString()}</p>
          </div>
          <script>window.print(); setTimeout(() => window.close(), 500);</script>
        </body>
      </html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();
  }

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
                  <button onClick={() => handlePrint(inv)} title={t('Print Invoice')} className="p-2.5 rounded-xl bg-muted text-muted-foreground/70 hover:text-primary hover:bg-primary/5 transition-all"><Printer size={18} /></button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
