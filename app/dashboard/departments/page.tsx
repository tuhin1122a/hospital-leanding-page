'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Activity, ChevronRight, Hotel, Plus, Stethoscope, Users } from 'lucide-react'

const units = [
  { name: 'Cardiology', head: 'Dr. Rajesh Sharma', doctors: 12, capacity: '85%', status: 'Active', patients: 142, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { name: 'Neurology', head: 'Dr. Priya Kapoor', doctors: 8, capacity: '92%', status: 'Active', patients: 98, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { name: 'Orthopedics', head: 'Dr. Arjun Patel', doctors: 15, capacity: '60%', status: 'Active', patients: 110, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { name: 'Oncology', head: 'Dr. Anjali Mehta', doctors: 10, capacity: '45%', status: 'In Maintenance', patients: 45, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { name: 'Emergency', head: 'Dr. Vikram Singh', doctors: 22, capacity: '98%', status: 'Critical Load', patients: 85, color: 'text-red-500', bg: 'bg-red-500/10' },
  { name: 'Pediatrics', head: 'Dr. Sneha Gupta', doctors: 6, capacity: '70%', status: 'Active', patients: 62, color: 'text-pink-500', bg: 'bg-pink-500/10' },
]

export default function DepartmentsPage() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-zinc-900 tracking-tighter">Clinical Departments</h1>
          <p className="text-zinc-500 font-medium text-lg mt-1">Operational management of specialized medical wings</p>
        </div>
        <Button className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black shadow-xl shadow-primary/20 transition-all">
          <Plus size={20} className="mr-2" /> Create New Unit
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {units.map((unit, i) => (
          <motion.div
            key={unit.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="p-8 border-zinc-100 rounded-[3rem] shadow-sm hover:shadow-2xl hover:shadow-zinc-200/50 transition-all duration-500 group cursor-pointer overflow-hidden relative">
              <div className="flex justify-between items-start mb-10">
                 <div className={cn("p-5 rounded-[2rem] transition-transform duration-500 group-hover:scale-110", unit.bg, unit.color)}>
                    <Hotel size={32} />
                 </div>
                 <Badge className={cn(
                   "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-none",
                   unit.status === 'Active' ? 'bg-emerald-500 text-white' : 
                   unit.status === 'Critical Load' ? 'bg-red-500 text-white' : 'bg-zinc-400 text-white'
                 )}>
                   {unit.status}
                 </Badge>
              </div>

              <div className="space-y-2 mb-8">
                 <h3 className="text-3xl font-black text-zinc-900 tracking-tighter">{unit.name}</h3>
                 <p className="text-sm font-bold text-zinc-400 flex items-center gap-2">
                    <Stethoscope size={14} className="text-primary" />
                    H.O.D: {unit.head}
                 </p>
              </div>

              <div className="grid grid-cols-3 gap-4 py-6 border-y border-zinc-50 mb-8">
                 <div className="text-center">
                    <div className="flex justify-center mb-1 text-zinc-400"><Users size={16} /></div>
                    <p className="text-lg font-black text-zinc-900">{unit.doctors}</p>
                    <p className="text-[10px] uppercase font-black tracking-widest text-zinc-400">Doctors</p>
                 </div>
                 <div className="text-center">
                    <div className="flex justify-center mb-1 text-zinc-400"><Activity size={16} /></div>
                    <p className="text-lg font-black text-zinc-900">{unit.capacity}</p>
                    <p className="text-[10px] uppercase font-black tracking-widest text-zinc-400">Capacity</p>
                 </div>
                 <div className="text-center">
                    <div className="flex justify-center mb-1 text-zinc-400"><Users size={16} /></div>
                    <p className="text-lg font-black text-zinc-900">{unit.patients}</p>
                    <p className="text-[10px] uppercase font-black tracking-widest text-zinc-400">Patients</p>
                 </div>
              </div>

              <button className="w-full h-14 rounded-2xl bg-zinc-50 group-hover:bg-primary group-hover:text-white flex items-center justify-center font-black text-sm transition-all gap-2 group/btn">
                 Manage Resources
                 <ChevronRight size={18} className="translate-x-0 group-hover/btn:translate-x-1 transition-transform" />
              </button>

              {/* Background accent */}
              <div className={cn("absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20 -z-0", unit.bg)} />
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ')
}
