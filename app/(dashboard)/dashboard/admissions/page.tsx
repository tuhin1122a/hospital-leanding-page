'use client'

import React, { useState } from 'react'
import { Plus, Search, Hotel, LayoutGrid, List } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/contexts/LanguageContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import AdmissionCard from '@/components/dashboard/admissions/AdmissionCard'
import AdmissionModal from '@/components/dashboard/admissions/AdmissionModal'

const API = `${process.env.NEXT_PUBLIC_API_URL}/admissions`
const PATIENTS_API = `${process.env.NEXT_PUBLIC_API_URL}/patients`
const getToken = () => localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken') || ''
const authHeader = () => ({ Authorization: `Bearer ${getToken()}`, 'Content-Type': 'application/json' })

const WARDS = [
  { name: 'General Ward - Male', beds: 10, prefix: 'M' },
  { name: 'General Ward - Female', beds: 10, prefix: 'F' },
  { name: 'ICU', beds: 5, prefix: 'ICU' },
  { name: 'CCU', beds: 5, prefix: 'CCU' },
]

export default function AdmissionsPage() {
  const { t } = useLanguage(); const queryClient = useQueryClient()
  const [showModal, setShowModal] = useState(false); const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list')
  const [formData, setFormData] = useState({ patientId: '', wardNo: '', bedNo: '', doctorInCharge: '', reason: '' })

  const { data: admissions = [], isLoading: loadingAdm } = useQuery({ queryKey: ['admissions'], queryFn: () => fetch(API, { headers: authHeader() }).then(r => r.json()).then(d => Array.isArray(d) ? d : Array.isArray(d?.data) ? d.data : []) })
  const { data: patients = [] } = useQuery({ queryKey: ['patients-list'], queryFn: () => fetch(PATIENTS_API, { headers: authHeader() }).then(r => r.json()).then(d => Array.isArray(d) ? d : Array.isArray(d?.data) ? d.data : Array.isArray(d?.patients) ? d.patients : []) })

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
        <Button onClick={() => setShowModal(true)} className="h-14 px-8 rounded-2xl bg-primary text-primary-foreground font-black shadow-xl shadow-primary/20 gap-2"><Plus size={20} /> {t('New Admission')}</Button>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:max-w-2xl">
           <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/70" />
           <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={t("Search by patient name, ID, or ward...")} 
            className="w-full h-16 pl-16 pr-8 rounded-2xl bg-card border border-border shadow-sm focus:ring-4 focus:ring-primary/5 outline-none font-bold text-card-foreground"
           />
        </div>
        <div className="flex bg-muted p-1 rounded-2xl border border-border shadow-sm shrink-0">
          <button onClick={() => setViewMode('list')} className={`px-6 py-3 rounded-xl font-black text-sm flex items-center gap-2 transition-all ${viewMode === 'list' ? 'bg-card text-primary shadow-lg border border-border/50' : 'text-muted-foreground hover:text-card-foreground'}`}>
             <List size={18} /> {t('List View')}
          </button>
          <button onClick={() => setViewMode('map')} className={`px-6 py-3 rounded-xl font-black text-sm flex items-center gap-2 transition-all ${viewMode === 'map' ? 'bg-card text-primary shadow-lg border border-border/50' : 'text-muted-foreground hover:text-card-foreground'}`}>
             <LayoutGrid size={18} /> {t('Bed Map')}
          </button>
        </div>
      </div>

      {loadingAdm ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
           {[1,2,3].map(i => <div key={i} className="h-64 rounded-2xl bg-muted animate-pulse" />)}
        </div>
      ) : filtered.length === 0 && viewMode === 'list' ? (
          <div className="text-center py-20 bg-muted/30 rounded-2xl border border-dashed border-border">
          <Hotel size={48} className="mx-auto text-muted-foreground/40 mb-4" />
          <p className="text-xl font-bold text-muted-foreground">{t('No active admissions')}</p>
        </div>
      ) : viewMode === 'list' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filtered.map((adm: any, i: number) => (
            <AdmissionCard key={adm.id} adm={adm} index={i} onDischarge={(id, name) => confirm(t('Are you sure you want to discharge') + ` ${name}?`) && dischargeMutation.mutate(id)} />
          ))}
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {WARDS.map((ward, idx) => {
             // Create an array mapping each bed index to a potential admission
             const bedArray = Array.from({ length: ward.beds }, (_, i) => {
               const bedLabel = `${ward.prefix}-${i + 1}`
               // Strictly match both ward and bed or loosely match if ward string contains ward name
               const occupant = admissions.find((a: any) => {
                 const aw = a.wardNo?.toUpperCase() || ''
                 const ab = a.bedNo?.toUpperCase() || ''
                 return aw.includes(ward.prefix) && (ab === bedLabel || ab === String(i + 1) || aw === bedLabel)
               })
               return { bedLabel, occupant }
             })
             
             return (
               <div key={idx} className="bg-card rounded-[2rem] border border-border p-8 shadow-sm">
                 <div className="flex justify-between items-center mb-8 border-b border-border/50 pb-4">
                   <h3 className="text-2xl font-black text-card-foreground flex items-center gap-3">
                     <Hotel className="text-primary" size={24} /> {ward.name}
                   </h3>
                   <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                     <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-emerald-500/20 border-2 border-emerald-500" /> Available</div>
                     <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-red-500/20 border-2 border-red-500" /> Occupied</div>
                   </div>
                 </div>
                 
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
                   {bedArray.map((bed, bedIdx) => (
                     <div 
                       key={bedIdx} 
                       className={`relative p-5 rounded-3xl border-2 transition-all ${
                         bed.occupant 
                           ? 'bg-red-500/5 border-red-500 hover:bg-red-500/10' 
                           : 'bg-emerald-500/5 border-emerald-500/50 border-dashed hover:border-emerald-500 hover:bg-emerald-500/10'
                       }`}
                     >
                       <Badge variant="outline" className={`absolute -top-3 -right-3 text-[10px] font-black uppercase tracking-widest bg-background ${bed.occupant ? 'text-red-500 border-red-500' : 'text-emerald-600 border-emerald-500'}`}>
                         {bed.bedLabel}
                       </Badge>
                       
                       {bed.occupant ? (
                         <div className="text-center pt-2">
                           <div className="w-12 h-12 mx-auto rounded-full bg-red-500/10 flex items-center justify-center text-red-500 font-bold text-xl mb-3 shadow-inner">
                             {bed.occupant.patient?.name?.[0] || 'P'}
                           </div>
                           <p className="font-black text-card-foreground text-sm truncate px-1" title={bed.occupant.patient?.name}>{bed.occupant.patient?.name}</p>
                           <p className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground mt-1 mb-4">{t('Dr.')} {bed.occupant.doctorInCharge}</p>
                           <Button size="sm" variant="outline" onClick={() => dischargeMutation.mutate(bed.occupant.id)} className="w-full h-8 text-[10px] font-black uppercase tracking-widest border-red-500/20 text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/20">
                             {t('Discharge')}
                           </Button>
                         </div>
                       ) : (
                         <div className="flex flex-col items-center justify-center h-[140px] text-emerald-500/50">
                           <LayoutGrid size={32} className="mb-2 opacity-50" />
                           <p className="font-black text-xs uppercase tracking-widest">{t('Available')}</p>
                           <button onClick={() => { setFormData({ ...formData, wardNo: ward.name, bedNo: bed.bedLabel }); setShowModal(true) }} className="mt-4 px-4 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest opacity-0 hover:opacity-100 group-hover:opacity-100 focus:opacity-100">
                             {t('Assign')}
                           </button>
                         </div>
                       )}
                     </div>
                   ))}
                 </div>
               </div>
             )
          })}
        </div>
      )}

      <AdmissionModal show={showModal} onClose={() => setShowModal(false)} patients={patients} formData={formData} setFormData={setFormData} onSubmit={(e) => { e.preventDefault(); admitMutation.mutate(formData) }} isSubmitting={admitMutation.isPending} />
    </div>
  )
}
