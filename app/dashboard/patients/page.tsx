'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Download, Filter, Mail, MoreVertical, Phone, Plus, Search } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const patients = [
  { id: 'PT-001', name: 'Zayn Malik', age: 32, sex: 'Male', blood: 'O+', contact: '+880 1711-000000', status: 'Inpatient', room: '302-B', condition: 'Stable' },
  { id: 'PT-002', name: 'Emma Watson', age: 28, sex: 'Female', blood: 'A-', contact: '+880 1822-111111', status: 'Outpatient', room: '-', condition: 'Recovering' },
  { id: 'PT-003', name: 'Robert Downey', age: 45, sex: 'Male', blood: 'B+', contact: '+880 1933-222222', status: 'Emergency', room: 'ICU-04', condition: 'Critical' },
  { id: 'PT-004', name: 'Scarlett Johansson', age: 30, sex: 'Female', blood: 'AB+', contact: '+880 1644-333333', status: 'Inpatient', room: '205-A', condition: 'Observation' },
  { id: 'PT-005', name: 'Tom Holland', age: 24, sex: 'Male', blood: 'O-', contact: '+880 1555-444444', status: 'Discharged', room: '-', condition: 'Healthy' },
  { id: 'PT-006', name: 'Benedict Cumberbatch', age: 48, sex: 'Male', blood: 'A+', contact: '+880 1366-555555', status: 'Inpatient', room: '401-C', condition: 'Surgery Planned' },
]

export default function PatientsPage() {
  const { t } = useLanguage()

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-card-foreground tracking-tighter text-balance">{t('Patient Registry')}</h1>
          <p className="text-muted-foreground font-medium text-lg mt-1">{t('Management and secure storage of health records')}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button className="h-14 px-8 rounded-2xl bg-secondary hover:bg-zinc-200 text-card-foreground font-black border-none transition-all">
            <Download size={20} className="mr-2" /> {t('Export')}
          </Button>
          <Button className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-background font-black shadow-xl shadow-primary/20 transition-all">
            <Plus size={20} className="mr-2" /> {t('Add New Patient')}
          </Button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row items-center gap-6">
        <div className="relative flex-grow w-full">
           <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/70" />
           <input 
            type="text" 
            placeholder={t("Search by name, ID, or phone number...")} 
            className="w-full h-16 pl-16 pr-8 rounded-3xl bg-card border border-border shadow-sm focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-card-foreground"
           />
        </div>
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <Button variant="outline" className="h-16 px-8 rounded-3xl border-border font-black text-muted-foreground">
            <Filter size={18} className="mr-2 text-primary" /> {t('Filter')}
          </Button>
          <select className="h-16 px-8 rounded-3xl border border-border bg-card font-black text-muted-foreground outline-none focus:ring-4 focus:ring-primary/5">
            <option>All Status</option>
            <option>Inpatient</option>
            <option>Outpatient</option>
            <option>Emergency</option>
            <option>Discharged</option>
          </select>
        </div>
      </div>

      {/* Patient Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {patients.map((patient, i) => (
          <motion.div
            key={patient.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group relative bg-card rounded-[3rem] border border-border p-8 hover:shadow-2xl hover:shadow-zinc-200/50 transition-all duration-500 cursor-pointer"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-16 h-16 rounded-[1.5rem] bg-muted border border-border flex items-center justify-center text-primary font-black text-2xl group-hover:bg-primary group-hover:text-background transition-all">
                {patient.name[0]}
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge className={cn(
                  "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-none shadow-sm",
                  patient.status === 'Emergency' ? 'bg-red-500 text-background' : 
                  patient.status === 'Inpatient' ? 'bg-blue-500 text-background' : 
                  patient.status === 'Outpatient' ? 'bg-emerald-500 text-background' : 'bg-zinc-400 text-background'
                )}>
                  {patient.status}
                </Badge>
                <span className="text-[10px] font-black text-muted-foreground/70 uppercase tracking-widest">{patient.id}</span>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-black text-card-foreground tracking-tight mb-2">{patient.name}</h3>
              <div className="flex items-center gap-4 text-muted-foreground font-bold text-sm">
                <span>{patient.age} Years</span>
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-200" />
                <span>{patient.sex}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-200" />
                <span className="text-primary">{patient.blood}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
               <div className="p-4 rounded-2xl bg-muted/80 border border-border/50">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 mb-1">{t('Room')}</p>
                  <p className="font-black text-card-foreground">{patient.room}</p>
               </div>
               <div className="p-4 rounded-2xl bg-muted/80 border border-border/50">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 mb-1">{t('Condition')}</p>
                  <p className={cn(
                    "font-black",
                    patient.condition === 'Critical' ? 'text-red-500' : 'text-card-foreground'
                  )}>{patient.condition}</p>
               </div>
            </div>

            <div className="flex items-center gap-3 pt-6 border-t border-border/50">
              <button className="flex-grow flex items-center justify-center gap-2 h-12 rounded-xl bg-muted hover:bg-secondary text-muted-foreground transition-all">
                <Phone size={16} />
                <span className="text-sm font-bold">{t('Call')}</span>
              </button>
              <button className="flex-grow flex items-center justify-center gap-2 h-12 rounded-xl bg-muted hover:bg-secondary text-muted-foreground transition-all">
                <Mail size={16} />
                <span className="text-sm font-bold">{t('Message')}</span>
              </button>
              <button className="h-12 w-12 rounded-xl bg-muted hover:bg-secondary flex items-center justify-center text-muted-foreground/70 transition-all">
                <MoreVertical size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ')
}
