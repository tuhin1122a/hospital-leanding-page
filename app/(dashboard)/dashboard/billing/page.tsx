'use client'

import React, { useState } from 'react'
import { CreditCard, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import BillingStats from '@/components/dashboard/billing/BillingStats'
import InvoiceTable from '@/components/dashboard/billing/InvoiceTable'
import NewInvoiceModal from '@/components/dashboard/billing/NewInvoiceModal'

const API = 'http://localhost:5000/billing'
const PATIENTS_API = 'http://localhost:5000/patients'
const APPROVALS_API = 'http://localhost:5000/approvals'
const getToken = () => localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken') || ''
const authHeader = () => ({ Authorization: `Bearer ${getToken()}`, 'Content-Type': 'application/json' })

export default function BillingPage() {
  const { t } = useLanguage(); const queryClient = useQueryClient()
  const [showModal, setShowModal] = useState(false); const [searchQuery, setSearchQuery] = useState('')
  const [formData, setFormData] = useState({ patientId: '', items: [{ name: '', price: 0 }], discount: 0, paidAmount: 0 })

  const { data: invoices = [], isLoading } = useQuery({ queryKey: ['invoices'], queryFn: () => fetch(API, { headers: authHeader() }).then(r => r.json()).then(d => Array.isArray(d) ? d : Array.isArray(d?.data) ? d.data : Array.isArray(d?.invoices) ? d.invoices : []) })
  const { data: patients = [] } = useQuery({ queryKey: ['patients-list'], queryFn: () => fetch(PATIENTS_API, { headers: authHeader() }).then(r => r.json()).then(d => Array.isArray(d) ? d : Array.isArray(d?.data) ? d.data : Array.isArray(d?.patients) ? d.patients : []) })

  const createMutation = useMutation({
    mutationFn: (data: any) => fetch(API, { method: 'POST', headers: authHeader(), body: JSON.stringify(data) }).then(r => r.ok ? r.json() : r.json().then(e => { throw e })),
    onSuccess: () => { toast.success(t('Invoice created successfully!')); setShowModal(false); setFormData({ patientId: '', items: [{ name: '', price: 0 }], discount: 0, paidAmount: 0 }); queryClient.invalidateQueries({ queryKey: ['invoices'] }) },
    onError: () => toast.error(t('Failed to create invoice'))
  })

  const discountMutation = useMutation({
    mutationFn: (payload: any) => fetch(APPROVALS_API, { method: 'POST', headers: authHeader(), body: JSON.stringify(payload) }).then(r => r.ok ? r.json() : r.json().then(e => { throw e })),
    onSuccess: () => toast.success(t('Discount request sent to Admin'))
  })

  const handleRequestDiscount = (inv: any) => {
    const amount = prompt(t("Enter requested discount amount:")); if (!amount || isNaN(Number(amount))) return
    discountMutation.mutate({ requestedBy: 'system', type: 'DISCOUNT', description: `Discount for ${inv.invoiceNo}`, amount: Number(amount), referenceId: inv.id })
  }

  const calculateTotal = () => formData.items.reduce((sum: number, item: any) => sum + (item.price || 0), 0)
  const filtered = invoices.filter((inv: any) => inv.invoiceNo?.toLowerCase().includes(searchQuery.toLowerCase()) || inv.patient?.name?.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div><h1 className="text-4xl font-black text-card-foreground tracking-tighter">{t('Finance & Billing')}</h1><p className="text-muted-foreground font-medium text-lg mt-1">{t('Manage hospital revenue and patient invoices')}</p></div>
        <Button onClick={() => setShowModal(true)} className="h-14 px-8 rounded-2xl bg-foreground text-background font-black shadow-xl shadow-zinc-950/20"><CreditCard size={20} className="mr-2" /> {t('New Invoice')}</Button>
      </div>

      <BillingStats invoices={invoices} />

      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden text-card-foreground">
        <div className="p-10 flex flex-col lg:flex-row items-center justify-between gap-8 border-b border-border/50">
           <div className="relative flex-grow w-full"><Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/70" /><input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={t("Search by invoice ID or patient name...")} className="w-full h-14 pl-16 pr-8 rounded-2xl bg-muted border border-border outline-none transition-all font-bold" /></div>
        </div>
        {isLoading ? <div className="p-10 space-y-4">{[1,2,3].map(i => <div key={i} className="h-16 rounded-xl bg-muted animate-pulse" />)}</div> : <InvoiceTable invoices={filtered} onRequestDiscount={handleRequestDiscount} />}
      </div>

      <NewInvoiceModal show={showModal} onClose={() => setShowModal(false)} patients={patients} formData={formData} setFormData={setFormData} onAddItem={() => setFormData({ ...formData, items: [...formData.items, { name: '', price: 0 }] })} onRemoveItem={(i) => setFormData({ ...formData, items: formData.items.filter((_:any, idx:number) => idx !== i) })} totalAmount={calculateTotal()} onSubmit={(e) => { e.preventDefault(); createMutation.mutate({ ...formData, totalAmount: calculateTotal() }) }} isSubmitting={createMutation.isPending} />
    </div>
  )
}
