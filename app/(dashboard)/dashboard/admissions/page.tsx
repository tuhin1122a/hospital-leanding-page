'use client'

import React, { useState } from 'react'
import { Plus, Search, Hotel } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import AdmissionCard from '@/components/dashboard/admissions/AdmissionCard'
import AdmissionModal from '@/components/dashboard/admissions/AdmissionModal'

const API = 'http://localhost:5000/admissions'
const PATIENTS_API = 'http://localhost:5000/patients'
const getToken = () => localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken') || ''
const authHeader = () => ({ Authorization: `Bearer ${getToken()}`, 'Content-Type': 'application/json' })

export default function AdmissionsPage() {
  const { t } = useLanguage(); const queryClient = useQueryClient()
  const [showModal, setShowModal] = useState(false); const [searchQuery, setSearchQuery] = useState('')
  const [formData, setFormData] = useState({ patientId: '', wardNo: '', bedNo: '', doctorInCharge: '', reason: '' })

  const { data: admissions = [], isLoading: loadingAdm } = useQuery({ queryKey: ['admissions'], queryFn: () => fetch(API, { headers: authHeader() }).then(r => r.json()) })
  const { data: patients = [] } = useQuery({ queryKey: ['patients-list'], queryFn: () => fetch(PATIENTS_API, { headers: authHeader() }).then(r => r.json()) })

  const admitMutation = useMutation({
    mutationFn: (data: any) => fetch(API, { method: 'POST', headers: authHeader(), body: JSON.stringify(data) }).then(r => r.ok ? r.json() : r.json().then(e => { throw e })),
    onSuccess: () => { toast.success(t('Patient admitted successfully!')); setShowModal(false); setFormData({ patientId: '', wardNo: '', bedNo: '', doctorInCharge: '', reason: '' }); queryClient.invalidateQueries({ queryKey: ['admissions'] }) },
    onError: (err: any) => toast.error(err.message || t('Admission failed'))
  })

  const dischargeMutation = useMutation({
    mutationFn: (id: string) => fetch(`${API}/${id}/discharge`, { method: 'PATCH', headers: authHeader() }).then(r => r.ok ? r.json() : r.json().then(e => { throw e })),
    onSuccess: () => { toast.success(t('Patient discharged')); queryClient.invalidateQueries({ queryKey: ['admissions'] }) },
    onError: () => toast.error(t('Failed to discharge'))
  })

  const filtered = admissions.filter((a: any) => a.patient?.name?.toLowerCase().includes(searchQuery.toLowerCase()) || a.patient?.patientId?.toLowerCase().includes(searchQuery.toLowerCase()) || a.wardNo?.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-card-foreground tracking-tighter">{t('Current Admissions')}</h1>
          <p className="text-muted-foreground font-medium text-lg mt-1">{t('Manage indoor patients and bed assignments')}</p>
        </div>
        <Button onClick={() => setShowModal(true)} className="h-14 px-8 rounded-2xl bg-primary font-black shadow-xl shadow-primary/20 gap-2"><Plus size={20} /> {t('New Admission')}</Button>
      </div>

      <div className="relative max-w-2xl">
         <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/70" />
         <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={t("Search by patient name, ID, or ward...")} 
          className="w-full h-16 pl-16 pr-8 rounded-3xl bg-card border border-border shadow-sm focus:ring-4 focus:ring-primary/5 outline-none font-bold text-card-foreground"
         />
      </div>

      {loadingAdm ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
           {[1,2,3].map(i => <div key={i} className="h-64 rounded-[3rem] bg-muted animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-muted/30 rounded-[3rem] border border-dashed border-border">
          <Hotel size={48} className="mx-auto text-muted-foreground/40 mb-4" />
          <p className="text-xl font-bold text-muted-foreground">{t('No active admissions')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filtered.map((adm: any, i: number) => (
            <AdmissionCard key={adm.id} adm={adm} index={i} onDischarge={(id, name) => confirm(t('Are you sure you want to discharge') + ` ${name}?`) && dischargeMutation.mutate(id)} />
          ))}
        </div>
      )}

      <AdmissionModal show={showModal} onClose={() => setShowModal(false)} patients={patients} formData={formData} setFormData={setFormData} onSubmit={(e) => { e.preventDefault(); admitMutation.mutate(formData) }} isSubmitting={admitMutation.isPending} />
    </div>
  )
}
