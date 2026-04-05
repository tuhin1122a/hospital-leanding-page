'use client'

import React, { useState } from 'react'
import { Plus, Search, Filter, Download, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import PatientCard from '@/components/dashboard/patients/PatientCard'
import RegisterPatientModal from '@/components/dashboard/patients/RegisterPatientModal'
import PatientHistoryModal from '@/components/dashboard/patients/PatientHistoryModal'

const API_BASE = 'http://localhost:5000/patients'
const getToken = () => localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken') || ''
const authHeader = () => ({ Authorization: `Bearer ${getToken()}`, 'Content-Type': 'application/json' })

export default function PatientsPage() {
  const { t } = useLanguage(); const queryClient = useQueryClient()
  const [searchQuery, setSearchQuery] = useState(''); const [showReg, setShowReg] = useState(false)
  const [selected, setSelected] = useState<any>(null); const [showHistory, setShowHistory] = useState(false)
  const [regData, setRegData] = useState({ name: '', email: '', phone: '', gender: 'Male', age: '', bloodGroup: 'O+', address: '' })

  const { data: patients = [], isLoading } = useQuery({ queryKey: ['patients'], queryFn: () => fetch(API_BASE, { headers: authHeader() }).then(r => r.json()) })
  const { data: history, isLoading: histLoading, refetch: refetchHist } = useQuery({ queryKey: ['patient-history', selected?.id], queryFn: () => fetch(`${API_BASE}/${selected.id}`, { headers: authHeader() }).then(r => r.json()), enabled: !!selected && showHistory })

  const regMutation = useMutation({ mutationFn: (d: any) => fetch(API_BASE, { method: 'POST', headers: authHeader(), body: JSON.stringify({...d, age: parseInt(d.age)}) }), onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['patients'] }); setShowReg(false); toast.success('Patient Registered!') } })
  const addRecMutation = useMutation({ mutationFn: (d: any) => fetch(`${API_BASE}/${selected.id}/records`, { method: 'POST', headers: authHeader(), body: JSON.stringify(d) }), onSuccess: () => { refetchHist(); toast.success('Record Added!') } })

  const filtered = patients.filter((p: any) => (p.name + p.patientId + p.phone).toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div><h1 className="text-4xl font-black tracking-tighter">{t('Patient Registry')}</h1><p className="text-muted-foreground font-medium text-lg mt-1">{t('Management and secure storage of health records')}</p></div>
        <div className="flex items-center gap-3"><Button className="h-14 px-8 rounded-2xl bg-secondary font-black"><Download size={20} className="mr-2" /> {t('Export')}</Button><Button onClick={() => setShowReg(true)} className="h-14 px-8 rounded-2xl bg-primary text-background font-black shadow-xl shadow-primary/20"><Plus size={20} className="mr-2" /> {t('Add New Patient')}</Button></div>
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-6">
        <div className="relative flex-grow w-full"><Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/70" /><input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={t("Search by name, ID, or phone number...")} className="w-full h-16 pl-16 rounded-3xl bg-card border border-border outline-none font-bold shadow-sm" /></div>
        <div className="flex items-center gap-3 w-full lg:w-auto"><Button variant="outline" className="h-16 px-8 rounded-3xl font-black text-muted-foreground"><Filter size={18} className="mr-2 text-primary" /> {t('Filter')}</Button></div>
      </div>
      {isLoading ? <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">{[1,2,3].map(i => <div key={i} className="h-80 rounded-[3rem] bg-muted animate-pulse" />)}</div> : filtered.length === 0 ? <div className="text-center py-20 bg-muted/30 rounded-[3rem] border border-dashed"><User size={48} className="mx-auto text-muted-foreground/40 mb-4" /><p className="text-xl font-bold">{t('No patients found')}</p></div> : <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">{filtered.map((p:any, i:number) => <PatientCard key={p.id} patient={p} index={i} onClick={() => { setSelected(p); setShowHistory(true) }} />)}</div>}
      <RegisterPatientModal show={showReg} onClose={() => setShowReg(false)} onSubmit={(e) => { e.preventDefault(); regMutation.mutate(regData) }} formData={regData} setFormData={setRegData} isSubmitting={regMutation.isPending} />
      <PatientHistoryModal show={showHistory} onClose={() => setShowHistory(false)} patient={selected} history={history} isLoading={histLoading} onAddRecord={async (d) => { await addRecMutation.mutateAsync(d) }} />
    </div>
  )
}
