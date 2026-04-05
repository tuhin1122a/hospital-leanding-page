'use client'

import React, { useState } from 'react'
import { Filter, Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import DoctorCard from '@/components/dashboard/doctors/DoctorCard'
import RegisterDoctorModal from '@/components/dashboard/doctors/RegisterDoctorModal'

const doctors = [
  { id: 'DOC-001', name: 'Dr. Rajesh Sharma', specialty: 'Cardiology', experience: '18 Years', rating: 4.9, status: 'On Duty', appointments: 12, image: 'https://i.pravatar.cc/150?u=1' },
  { id: 'DOC-002', name: 'Dr. Priya Kapoor', specialty: 'Neurology', experience: '16 Years', rating: 4.9, status: 'On Break', appointments: 8, image: 'https://i.pravatar.cc/150?u=2' },
  { id: 'DOC-003', name: 'Dr. Arjun Patel', specialty: 'Orthopedics', experience: '20 Years', rating: 4.8, status: 'On Duty', appointments: 15, image: 'https://i.pravatar.cc/150?u=3' },
  { id: 'DOC-004', name: 'Dr. Anjali Mehta', specialty: 'Oncology', experience: '17 Years', rating: 4.9, status: 'Off Duty', appointments: 0, image: 'https://i.pravatar.cc/150?u=4' },
  { id: 'DOC-005', name: 'Dr. Vikram Singh', specialty: 'Emergency', experience: '19 Years', rating: 4.8, status: 'On Duty', appointments: 22, image: 'https://i.pravatar.cc/150?u=5' },
  { id: 'DOC-006', name: 'Dr. Sneha Gupta', specialty: 'General Medicine', experience: '15 Years', rating: 4.9, status: 'On Duty', appointments: 10, image: 'https://i.pravatar.cc/150?u=6' },
]

export default function DoctorsPage() {
  const { t } = useLanguage(); const [showModal, setShowModal] = useState(false); const [searchQuery, setSearchQuery] = useState('')
  const filtered = doctors.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.specialty.toLowerCase().includes(searchQuery.toLowerCase()) || d.id.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div><h1 className="text-4xl font-black text-card-foreground tracking-tighter">{t('Medical Faculty')}</h1><p className="text-muted-foreground font-medium text-lg mt-1">{t('Manage specialist rosters and clinical schedules')}</p></div>
        <Button onClick={() => setShowModal(true)} className="h-14 px-8 rounded-2xl bg-primary font-black shadow-xl shadow-primary/20 transition-all gap-2"><Plus size={20} /> {t('Register New Doctor')}</Button>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-6">
        <div className="relative flex-grow w-full"><Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/70" /><input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={t("Search by name, specialty, or ID...")} className="w-full h-16 pl-16 pr-8 rounded-2xl bg-card border border-border shadow-sm focus:ring-4 focus:ring-primary/5 outline-none font-bold text-card-foreground" /></div>
        <Button variant="outline" className="h-16 px-8 rounded-2xl border-border font-black text-muted-foreground gap-2"><Filter size={18} className="text-primary" /> {t('Filter')}</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filtered.map((doctor, i) => <DoctorCard key={doctor.id} doctor={doctor} index={i} />)}
      </div>

      <RegisterDoctorModal show={showModal} onClose={() => setShowModal(false)} onSubmit={(e) => { e.preventDefault(); setShowModal(false) }} />
    </div>
  )
}
