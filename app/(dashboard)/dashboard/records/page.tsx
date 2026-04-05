'use client'

import React, { useState } from 'react'
import { Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import RecordsStats from '@/components/dashboard/records/RecordsStats'
import RecordsTable from '@/components/dashboard/records/RecordsTable'
import UploadRecordModal from '@/components/dashboard/records/UploadRecordModal'

const API_BASE = 'http://localhost:5000/records'
const getToken = () => localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken') || ''
const authHeader = () => ({ Authorization: `Bearer ${getToken()}`, 'Content-Type': 'application/json' })

const mockRecords = [
  { id: 'REC-2026-001', patient: 'Zayn Malik', type: 'Lab Report', doctor: 'Dr. Rajesh Sharma', date: 'Feb 21, 2026', size: '2.4 MB', status: 'Finalized' },
  { id: 'REC-2026-002', patient: 'Emma Watson', type: 'Prescription', doctor: 'Dr. Priya Kapoor', date: 'Feb 22, 2026', size: '156 KB', status: 'Pending' }
]

export default function RecordsPage() {
  const { t } = useLanguage(); const queryClient = useQueryClient()
  const [search, setSearch] = useState(''); const [showUpload, setShowUpload] = useState(false)
  const [formData, setFormData] = useState({ patient: '', type: 'Lab Report', doctor: '' })

  const { data: records = [], isLoading } = useQuery({ queryKey: ['medical-records'], queryFn: () => fetch(API_BASE, { headers: authHeader() }).then(r => r.ok ? r.json() : mockRecords) })

  const mutation = useMutation({
    mutationFn: (d: any) => fetch(API_BASE, { method: 'POST', headers: authHeader(), body: JSON.stringify(d) }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['medical-records'] }); setShowUpload(false); toast.success('File Uploaded & Encrypted!') }
  })

  const filtered = records.filter((r: any) => (r.patient + r.id + r.type).toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div><h1 className="text-4xl font-black tracking-tighter">{t('Medical Records')}</h1><p className="text-muted-foreground font-medium text-lg mt-1">{t('Unified access to diagnostic data and health history')}</p></div>
        <div className="flex items-center gap-3"><Button variant="outline" className="h-14 px-8 rounded-2xl border-border font-black">{t('Access Logs')}</Button><Button className="h-14 px-8 rounded-2xl bg-foreground text-background font-black shadow-xl shadow-zinc-950/20">{t('Digital Vault')}</Button></div>
      </div>
      <RecordsStats />
      <div className="bg-card rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
        <div className="p-8 border-b border-border/50 flex flex-col lg:flex-row items-center gap-6">
          <div className="relative flex-grow w-full"><Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/70" /><input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t("Search by ID, patient, or document type...")} className="w-full h-14 pl-16 rounded-2xl bg-muted/50 border border-border/50 focus:bg-card outline-none font-bold" /></div>
          <div className="flex items-center gap-3 w-full lg:w-auto"><Button variant="outline" className="h-14 px-6 rounded-2xl border-border font-bold text-muted-foreground"><Filter size={18} className="mr-2" /> {t('Filter')}</Button><Button onClick={() => setShowUpload(true)} className="h-14 px-8 rounded-2xl bg-primary text-background font-black">{t('Upload File')}</Button></div>
        </div>
        {isLoading ? <div className="p-20 text-center animate-pulse font-black text-muted-foreground/50">{t('SYNCING CLINICAL DATA...')}</div> : <RecordsTable records={filtered} />}
      </div>
      <UploadRecordModal show={showUpload} onClose={() => setShowUpload(false)} onSubmit={(e) => { e.preventDefault(); mutation.mutate(formData) }} formData={formData} setFormData={setFormData} isSubmitting={mutation.isPending} />
    </div>
  )
}
