'use client'

import React, { useState } from 'react'
import { Filter, Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import DoctorCard from '@/components/dashboard/doctors/DoctorCard'
import RegisterDoctorModal from '@/components/dashboard/doctors/RegisterDoctorModal'
import DoctorScheduleModal from '@/components/dashboard/doctors/DoctorScheduleModal'

export default function DoctorsPage() {
  const { t } = useLanguage(); 
  const [showModal, setShowModal] = useState(false); 
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('')
  const [doctors, setDoctors] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchDoctors = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors`)
      if (res.ok) {
        const data = await res.json()
        setDoctors(data)
      }
    } catch (error) {
      console.error("Failed to fetch doctors", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDoctors()
  }, [])

  const filtered = doctors.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    d.doctorProfile?.specialty?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this doctor?')) return
    const getCookie = (name: string) => document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop()
    const token = getCookie('accessToken')

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
        })
        if (res.ok) {
            toast.success('Doctor removed')
            fetchDoctors()
        }
    } catch (error) {
        toast.error('Failed to remove doctor')
    }
  }

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
        {isLoading ? (
             [1,2,3].map(i => <div key={i} className="h-96 bg-muted animate-pulse rounded-3xl" />)
        ) : (
            filtered.map((doctor, i) => (
                <DoctorCard 
                    key={doctor.id} 
                    doctor={doctor} 
                    index={i} 
                    onDelete={() => handleDelete(doctor.id)} 
                    onSchedule={() => {
                        setSelectedDoctor(doctor)
                        setShowScheduleModal(true)
                    }}
                />
            ))
        )}
      </div>

      <RegisterDoctorModal 
        show={showModal} 
        onClose={() => setShowModal(false)} 
        onSuccess={() => {
            setShowModal(false)
            fetchDoctors()
        }} 
      />

      <DoctorScheduleModal
        show={showScheduleModal}
        doctor={selectedDoctor}
        onClose={() => setShowScheduleModal(false)}
        onSuccess={() => {
            setShowScheduleModal(false)
            fetchDoctors()
        }}
      />
    </div>
  )
}

import toast from 'react-hot-toast'
import { useEffect } from 'react'

