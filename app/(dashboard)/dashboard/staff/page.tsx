'use client'

import React, { useState } from 'react'
import { Plus, Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import StaffStats from '@/components/dashboard/staff/StaffStats'
import StaffGrid from '@/components/dashboard/staff/StaffGrid'
import AddStaffModal from '@/components/dashboard/staff/AddStaffModal'

const USERS_API = 'http://localhost:5000/users'
const getToken = () => localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken') || ''
const authHeader = () => ({ Authorization: `Bearer ${getToken()}`, 'Content-Type': 'application/json' })

export default function StaffPage() {
  const { t } = useLanguage(); const queryClient = useQueryClient()
  const [search, setSearch] = useState(''); const [showAdd, setShowAdd] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'DOCTOR', permissions: ['READ'] })

  const { data: staff = [], isLoading } = useQuery({ queryKey: ['staff'], queryFn: () => fetch(USERS_API, { headers: authHeader() }).then(r => r.json()) })

  const addMutation = useMutation({
    mutationFn: (d: any) => fetch(`${USERS_API}/create`, { method: 'POST', headers: authHeader(), body: JSON.stringify(d) }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['staff'] }); setShowAdd(false); setFormData({ name: '', email: '', password: '', role: 'DOCTOR', permissions: ['READ'] }); toast.success('Staff account created!') }
  })

  const permMutation = useMutation({
    mutationFn: ({ id, permissions }: { id: string, permissions: string[] }) => fetch(`${USERS_API}/${id}/permissions`, { method: 'POST', headers: authHeader(), body: JSON.stringify({ permissions }) }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['staff'] }); toast.success('Permissions updated') }
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => fetch(`${USERS_API}/${id}`, { method: 'DELETE', headers: authHeader() }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['staff'] }); toast.success('Staff member removed') }
  })

  const filtered = staff.filter((s: any) => (s.name + s.email + s.role).toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div><h1 className="text-4xl font-black tracking-tighter">{t('Medical & Support Staff')}</h1><p className="text-muted-foreground font-medium text-lg mt-1">{t('Manage personnel, shift rotations, and department assignments')}</p></div>
        <Button onClick={() => setShowAdd(true)} className="h-14 px-8 rounded-2xl bg-primary text-background font-black shadow-xl shadow-primary/20 transition-all flex items-center gap-2"><Plus size={20} /> {t('Add Staff Member')}</Button>
      </div>
      <StaffStats total={staff.length} doctors={staff.filter((s:any) => s.role === 'DOCTOR').length} />
      <div className="flex flex-col lg:flex-row items-center gap-6">
        <div className="relative flex-grow w-full"><Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/70" /><input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t("Search by name, email, or role...")} className="w-full h-16 pl-16 pr-8 rounded-3xl bg-card border border-border shadow-sm focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-card-foreground" /></div>
        <Button variant="outline" className="h-16 px-8 rounded-3xl border-border font-black text-muted-foreground"><Filter size={18} className="mr-2 text-primary" /> {t('Filter')}</Button>
      </div>
      {isLoading ? <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">{[1,2,3].map(i => <div key={i} className="h-64 rounded-[2.5rem] bg-muted animate-pulse" />)}</div> : <StaffGrid staff={filtered} onUpdatePerm={(id, curr, p) => { const updated = curr.includes(p) ? curr.filter(x => x !== p) : [...curr, p]; if (updated.length > 0 && !updated.includes('READ')) updated.push('READ'); permMutation.mutate({ id, permissions: updated }) }} onDelete={(id, name) => confirm(t(`Are you sure you want to delete ${name}?`)) && deleteMutation.mutate(id)} />}
      <AddStaffModal show={showAdd} onClose={() => setShowAdd(false)} onSubmit={(e) => { e.preventDefault(); addMutation.mutate(formData) }} formData={formData} setFormData={setFormData} isSubmitting={addMutation.isPending} />
    </div>
  )
}
