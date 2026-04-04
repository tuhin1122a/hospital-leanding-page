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
import { CreditCard, DollarSign, Download, ExternalLink, FileCheck, Filter, Search, Wallet, Plus, Trash2, X, Send } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

const API = 'http://localhost:5000/billing'
const PATIENTS_API = 'http://localhost:5000/patients'
const APPROVALS_API = 'http://localhost:5000/approvals'

function getToken() { return localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken') || '' }
function authHeader() { return { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'application/json' } }

export default function BillingPage() {
  const { t } = useLanguage()
  const [invoices, setInvoices] = useState<any[]>([])
  const [patients, setPatients] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Invoice Form State
  const [formData, setFormData] = useState({
    patientId: '',
    items: [{ name: '', price: 0 }],
    discount: 0,
    paidAmount: 0
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const [invRes, patRes] = await Promise.all([
        fetch(API, { headers: authHeader() }),
        fetch(PATIENTS_API, { headers: authHeader() })
      ])
      if (invRes.ok && patRes.ok) {
        setInvoices(await invRes.json())
        setPatients(await patRes.json())
      }
    } catch (err) {
      toast.error('Network error')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const addItem = () => setFormData({ ...formData, items: [...formData.items, { name: '', price: 0 }] })
  const removeItem = (index: number) => {
    const newItems = formData.items.filter((_, i) => i !== index)
    setFormData({ ...formData, items: newItems })
  }

  const calculateTotal = () => {
    return formData.items.reduce((sum, item) => sum + (item.price || 0), 0)
  }

  const handleCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.patientId || formData.items.length === 0) return toast.error('Please add items and select patient')
    
    setIsSubmitting(true)
    const totalAmount = calculateTotal()
    
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({
          ...formData,
          totalAmount
        })
      })
      
      if (res.ok) {
        toast.success(`Invoice created successfully!`)
        setShowModal(false)
        setFormData({ patientId: '', items: [{ name: '', price: 0 }], discount: 0, paidAmount: 0 })
        fetchData()
      } else {
        toast.error('Failed to create invoice')
      }
    } catch (err) {
      toast.error('Network error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const requestDiscount = async (invoice: any) => {
    const discountAmount = prompt("Enter requested discount amount:")
    if (!discountAmount || isNaN(Number(discountAmount))) return
    
    try {
      const res = await fetch(APPROVALS_API, {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({
          requestedBy: 'current-user-id',
          type: 'DISCOUNT',
          description: `Discount requested for ${invoice.invoiceNo}`,
          amount: Number(discountAmount),
          referenceId: invoice.id
        })
      })
      if (res.ok) {
        toast.success('Discount request sent to Admin')
      }
    } catch (err) {
      toast.error('Failed to send request')
    }
  }

  const filteredInvoices = invoices.filter(inv => 
    inv.invoiceNo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.patient?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-card-foreground tracking-tighter">{t('Finance & Billing')}</h1>
          <p className="text-muted-foreground font-medium text-lg mt-1">{t('Manage hospital revenue and patient invoices')}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            onClick={() => setShowModal(true)}
            className="h-14 px-8 rounded-2xl bg-foreground text-background font-black hover:hover:bg-foreground/80 transition-all shadow-xl shadow-zinc-950/20"
          >
             <CreditCard size={20} className="mr-2" /> {t('New Invoice')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         {[
           { label: t('Total Earnings'), value: `$${invoices.reduce((s,i) => s + i.paidAmount, 0).toLocaleString()}`, icon: DollarSign, color: 'text-emerald-500', trend: 'Actual collections' },
           { label: t('Total Receivables'), value: `$${invoices.reduce((s,i) => s + i.dueAmount, 0).toLocaleString()}`, icon: Wallet, color: 'text-amber-500', trend: 'Pending dues' },
           { label: t('Average Invoice'), value: `$${(invoices.reduce((s,i) => s + i.totalAmount, 0) / (invoices.length || 1)).toFixed(0)}`, icon: FileCheck, color: 'text-blue-500', trend: 'Per patient average' },
           { label: t('Total Invoices'), value: invoices.length, icon: CreditCard, color: 'text-primary', trend: 'Lifetime count' },
         ].map((stat, i) => (
           <Card key={i} className="p-8 border-none rounded-[2.5rem] bg-card shadow-xl shadow-zinc-200/40 relative overflow-hidden group">
              <div className="relative z-10 flex items-start justify-between">
                 <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 mb-2">{stat.label}</p>
                    <h4 className="text-3xl font-black text-card-foreground tracking-tighter">{stat.value}</h4>
                    <p className="text-[10px] font-bold text-muted-foreground/70 mt-4 flex items-center gap-1">
                       <span className={stat.color}>{stat.trend}</span>
                    </p>
                 </div>
                 <div className={cn("p-4 rounded-2xl bg-muted ", stat.color)}>
                    <stat.icon size={28} />
                 </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-zinc-100 rounded-full group-hover:scale-125 transition-transform duration-700 -z-0" />
           </Card>
         ))}
      </div>

      <div className="bg-card rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
        <div className="p-10 flex flex-col lg:flex-row items-center justify-between gap-8 border-b border-border/50">
           <div className="relative flex-grow w-full">
              <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/70" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by invoice ID or patient name..." 
                className="w-full h-14 pl-16 pr-8 rounded-2xl bg-muted border border-border focus:bg-card focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-card-foreground"
              />
           </div>
        </div>

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
                 {filteredInvoices.map((inv, i) => (
                   <TableRow key={i} className="group border-border/50 hover:bg-muted/50 transition-colors">
                      <TableCell className="px-10 py-6">
                         <span className="font-black text-card-foreground tracking-tight">{inv.invoiceNo}</span>
                      </TableCell>
                      <TableCell className="px-10 py-6 font-bold text-muted-foreground">{inv.patient?.name}</TableCell>
                      <TableCell className="px-10 py-6 text-sm font-bold text-muted-foreground">{new Date(inv.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="px-10 py-6">
                         <span className="font-black text-card-foreground">${inv.totalAmount.toLocaleString()}</span>
                      </TableCell>
                      <TableCell className="px-10 py-6 font-bold text-emerald-600">${inv.paidAmount.toLocaleString()}</TableCell>
                      <TableCell className="px-10 py-6 font-bold text-amber-600">${inv.dueAmount.toLocaleString()}</TableCell>
                      <TableCell className="px-10 py-6">
                         <Badge className={cn(
                           "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-none shadow-sm",
                           inv.status === 'PAID' ? 'bg-emerald-500 text-background' : 
                           inv.status === 'PARTIAL' ? 'bg-amber-500 text-background' : 'bg-red-500 text-background'
                         )}>
                           {inv.status}
                         </Badge>
                      </TableCell>
                      <TableCell className="px-10 py-6 text-right">
                         <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => requestDiscount(inv)}
                              title={t('Request Discount')}
                              className="p-2.5 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all"
                            >
                               <Send size={18} />
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

      {/* New Invoice Modal */}
       <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => !isSubmitting && setShowModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-card border border-border rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 md:p-10 max-h-[90vh] overflow-y-auto custom-scrollbar">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-black text-card-foreground tracking-tighter">{t('Create New Invoice')}</h2>
                    <p className="text-muted-foreground font-medium">{t('Generate printable billing for patient')}</p>
                  </div>
                  <button onClick={() => setShowModal(false)} className="p-3 rounded-2xl bg-muted hover:bg-border transition-all text-muted-foreground">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleCreateInvoice} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Select Patient')}</label>
                    <select 
                      value={formData.patientId}
                      onChange={(e) => setFormData({...formData, patientId: e.target.value})}
                      className="w-full h-14 px-6 rounded-2xl bg-muted border border-border focus:ring-4 focus:ring-primary/10 outline-none transition-all font-black text-card-foreground"
                    >
                      <option value="">{t('Choose a patient...')}</option>
                      {patients.map(p => (
                        <option key={p.id} value={p.id}>{p.name} ({p.patientId})</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                       <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">{t('Invoice Items')}</label>
                       <button type="button" onClick={addItem} className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline flex items-center gap-1">
                          <Plus size={14} /> {t('Add Item')}
                       </button>
                    </div>
                    
                    {formData.items.map((item, index) => (
                      <div key={index} className="flex gap-4 items-end bg-muted/30 p-4 rounded-2xl border border-border/50">
                        <div className="flex-grow space-y-1">
                           <input 
                             type="text" required
                             placeholder="Item Description"
                             value={item.name}
                             onChange={(e) => {
                               const newItems = [...formData.items]
                               newItems[index].name = e.target.value
                               setFormData({ ...formData, items: newItems })
                             }}
                             className="w-full h-12 px-5 rounded-xl bg-card border border-border outline-none transition-all font-bold text-sm"
                           />
                        </div>
                        <div className="w-32 space-y-1">
                           <input 
                             type="number" required
                             placeholder="0.00"
                             value={item.price || ''}
                             onChange={(e) => {
                               const newItems = [...formData.items]
                               newItems[index].price = Number(e.target.value)
                               setFormData({ ...formData, items: newItems })
                             }}
                             className="w-full h-12 px-5 rounded-xl bg-card border border-border outline-none transition-all font-bold text-sm"
                           />
                        </div>
                        <button type="button" onClick={() => removeItem(index)} className="p-3 text-red-500 hover:bg-red-50 transition-all rounded-xl">
                           <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-6 pt-4 border-t border-border/50">
                    <div className="space-y-2">
                       <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Initial Paid Amount')}</label>
                       <input 
                         type="number"
                         value={formData.paidAmount || ''}
                         onChange={(e) => setFormData({...formData, paidAmount: Number(e.target.value)})}
                         placeholder="0.00"
                         className="w-full h-14 px-6 rounded-2xl bg-muted border border-border outline-none transition-all font-bold text-card-foreground"
                       />
                    </div>
                    <div className="bg-primary/5 rounded-2xl p-6 flex flex-col justify-center items-end">
                       <p className="text-[10px] font-black uppercase tracking-widest text-primary/70 mb-1">{t('Grand Total')}</p>
                       <p className="text-3xl font-black text-primary tracking-tighter">${calculateTotal().toLocaleString()}</p>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-background font-black text-lg shadow-xl shadow-primary/20 transition-all mt-4"
                  >
                    {isSubmitting ? t('Generating Invoice...') : t('Save & Create Invoice')}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ')
}
