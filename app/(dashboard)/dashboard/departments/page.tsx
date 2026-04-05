'use client'

import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import DepartmentCard from '@/components/dashboard/departments/DepartmentCard'
import CreateDepartmentModal from '@/components/dashboard/departments/CreateDepartmentModal'

const units = [
  { name: 'Cardiology', head: 'Dr. Rajesh Sharma', doctors: 12, capacity: '85%', status: 'Active', patients: 142, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { name: 'Neurology', head: 'Dr. Priya Kapoor', doctors: 8, capacity: '92%', status: 'Active', patients: 98, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { name: 'Orthopedics', head: 'Dr. Arjun Patel', doctors: 15, capacity: '60%', status: 'Active', patients: 110, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { name: 'Oncology', head: 'Dr. Anjali Mehta', doctors: 10, capacity: '45%', status: 'In Maintenance', patients: 45, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { name: 'Emergency', head: 'Dr. Vikram Singh', doctors: 22, capacity: '98%', status: 'Critical Load', patients: 85, color: 'text-red-500', bg: 'bg-red-500/10' },
  { name: 'Pediatrics', head: 'Dr. Sneha Gupta', doctors: 6, capacity: '70%', status: 'Active', patients: 62, color: 'text-pink-500', bg: 'bg-pink-500/10' },
]

export default function DepartmentsPage() {
  const { t } = useLanguage(); const [showModal, setShowModal] = useState(false)

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-card-foreground tracking-tighter">{t('Clinical Departments')}</h1>
          <p className="text-muted-foreground font-medium text-lg mt-1">{t('Operational management of specialized medical wings')}</p>
        </div>
        <Button onClick={() => setShowModal(true)} className="h-14 px-8 rounded-2xl bg-primary font-black shadow-xl shadow-primary/20 transition-all gap-2"><Plus size={20} /> {t('Create New Unit')}</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {units.map((unit, i) => <DepartmentCard key={unit.name} unit={unit} index={i} />)}
      </div>

      <CreateDepartmentModal show={showModal} onClose={() => setShowModal(false)} onSubmit={(e) => { e.preventDefault(); setShowModal(false) }} />
    </div>
  )
}
