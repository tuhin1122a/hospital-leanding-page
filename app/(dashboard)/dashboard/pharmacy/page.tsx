'use client'

import React, { useState } from 'react'
import { Plus, Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import PharmacyStats from '@/components/dashboard/pharmacy/PharmacyStats'
import MedicineCard from '@/components/dashboard/pharmacy/MedicineCard'
import AddInventoryModal from '@/components/dashboard/pharmacy/AddInventoryModal'

const API_BASE = 'http://localhost:5000/pharmacy'
const getToken = () => localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken') || ''
const authHeader = () => ({ Authorization: `Bearer ${getToken()}`, 'Content-Type': 'application/json' })

const mockMeds = [
  { id: 'MD-101', name: 'Paracetamol 500mg', category: 'General', stock: 1240, price: '৳12.50', status: 'In Stock', expiry: 'Jan 2028' },
  { id: 'MD-102', name: 'Amoxicillin 250mg', category: 'Antibiotic', stock: 42, price: '৳45.00', status: 'Low Stock', expiry: 'Dec 2026' }
]

export default function PharmacyPage() {
  const { t } = useLanguage(); const queryClient = useQueryClient()
  const [search, setSearch] = useState(''); const [showAdd, setShowAdd] = useState(false)
  const [formData, setFormData] = useState({ name: '', stock: '', price: '', expiry: '' })

  const { data: meds = [], isLoading } = useQuery({ queryKey: ['pharmacy-inventory'], queryFn: () => fetch(API_BASE, { headers: authHeader() }).then(r => r.ok ? r.json() : mockMeds) })

  const mutation = useMutation({
    mutationFn: (d: any) => fetch(API_BASE, { method: 'POST', headers: authHeader(), body: JSON.stringify(d) }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['pharmacy-inventory'] }); setShowAdd(false); toast.success('Inventory Updated!') }
  })

  const filtered = meds.filter((m: any) => m.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div><h1 className="text-4xl font-black tracking-tighter">{t('Pharmacy Inventory')}</h1><p className="text-muted-foreground font-medium text-lg mt-1">{t('Manage pharmaceutical stocks and procurement orders')}</p></div>
        <div className="flex items-center gap-3"><Button variant="outline" className="h-14 px-8 rounded-2xl bg-card font-black">{t('Purchase Orders')}</Button><Button onClick={() => setShowAdd(true)} className="h-14 px-8 rounded-2xl bg-foreground text-background font-black shadow-xl shadow-zinc-950/20"><Plus size={20} className="mr-2" /> {t('Add Inventory')}</Button></div>
      </div>
      <PharmacyStats />
      <div className="bg-card rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
        <div className="p-10 border-b border-border/50">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-10">
            <h3 className="text-2xl font-black tracking-tighter">{t('Current Stock')}</h3>
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="relative flex-grow"><Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/70" /><input type="text" placeholder={t("Search items...")} value={search} onChange={(e) => setSearch(e.target.value)} className="w-full lg:w-80 h-14 pl-16 rounded-2xl bg-muted border border-border focus:bg-card outline-none font-bold" /></div>
              <Button variant="outline" className="h-14 px-6 rounded-2xl border-border"><Filter size={18} /></Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? [1,2,3].map(i => <div key={i} className="h-48 rounded-[2rem] bg-muted animate-pulse" />) : filtered.map((item: any, i: number) => <MedicineCard key={item.id} item={item} index={i} />)}
          </div>
        </div>
      </div>
      <AddInventoryModal show={showAdd} onClose={() => setShowAdd(false)} onSubmit={(e) => { e.preventDefault(); mutation.mutate(formData) }} formData={formData} setFormData={setFormData} isSubmitting={mutation.isPending} />
    </div>
  )
}
