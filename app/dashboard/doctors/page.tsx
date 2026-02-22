'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Filter, GraduationCap, MoreHorizontal, Phone, Plus, Search } from 'lucide-react'

const doctors = [
  { id: 'DOC-001', name: 'Dr. Rajesh Sharma', specialty: 'Cardiology', experience: '18 Years', rating: 4.9, status: 'On Duty', appointments: 12, image: 'https://i.pravatar.cc/150?u=1' },
  { id: 'DOC-002', name: 'Dr. Priya Kapoor', specialty: 'Neurology', experience: '16 Years', rating: 4.9, status: 'On Break', appointments: 8, image: 'https://i.pravatar.cc/150?u=2' },
  { id: 'DOC-003', name: 'Dr. Arjun Patel', specialty: 'Orthopedics', experience: '20 Years', rating: 4.8, status: 'On Duty', appointments: 15, image: 'https://i.pravatar.cc/150?u=3' },
  { id: 'DOC-004', name: 'Dr. Anjali Mehta', specialty: 'Oncology', experience: '17 Years', rating: 4.9, status: 'Off Duty', appointments: 0, image: 'https://i.pravatar.cc/150?u=4' },
  { id: 'DOC-005', name: 'Dr. Vikram Singh', specialty: 'Emergency', experience: '19 Years', rating: 4.8, status: 'On Duty', appointments: 22, image: 'https://i.pravatar.cc/150?u=5' },
  { id: 'DOC-006', name: 'Dr. Sneha Gupta', specialty: 'General Medicine', experience: '15 Years', rating: 4.9, status: 'On Duty', appointments: 10, image: 'https://i.pravatar.cc/150?u=6' },
]

export default function DoctorsPage() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-zinc-900 tracking-tighter">Medical Faculty</h1>
          <p className="text-zinc-500 font-medium text-lg mt-1">Manage specialist rosters and clinical schedules</p>
        </div>
        <Button className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black shadow-xl shadow-primary/20 transition-all">
          <Plus size={20} className="mr-2" /> Register New Doctor
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-6">
        <div className="relative flex-grow w-full">
           <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400" />
           <input 
            type="text" 
            placeholder="Search by name, specialty, or ID..." 
            className="w-full h-16 pl-16 pr-8 rounded-3xl bg-white border border-zinc-100 shadow-sm focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-zinc-900"
           />
        </div>
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <Button variant="outline" className="h-16 px-8 rounded-3xl border-zinc-200 font-black text-zinc-600">
            <Filter size={18} className="mr-2 text-primary" /> Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {doctors.map((doctor, i) => (
          <motion.div
            key={doctor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="p-0 border-zinc-100 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:shadow-zinc-200/50 transition-all duration-500 relative group">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="relative">
                    <img src={doctor.image} alt={doctor.name} className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-xl" />
                    <div className={cn(
                      "absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-white",
                      doctor.status === 'On Duty' ? 'bg-emerald-500' : 'bg-zinc-400'
                    )} />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
                      {doctor.specialty}
                    </Badge>
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{doctor.id}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <h3 className="text-2xl font-black text-zinc-900 tracking-tight leading-none">{doctor.name}</h3>
                  <div className="flex items-center gap-3 text-xs font-bold text-zinc-500">
                    <div className="flex items-center gap-1">
                      <GraduationCap size={14} className="text-primary" />
                      {doctor.experience}
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-200" />
                    <div className="flex items-center gap-1 text-zinc-900">
                      ★ {doctor.rating}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-zinc-50 rounded-2xl p-4 text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Patients</p>
                    <p className="text-xl font-black text-zinc-900">1.2k+</p>
                  </div>
                  <div className="bg-zinc-50 rounded-2xl p-4 text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Today</p>
                    <p className="text-xl font-black text-zinc-900">{doctor.appointments}</p>
                  </div>
                </div>
              </div>

              <div className="px-8 pb-8 pt-4 flex items-center gap-3 border-t border-zinc-50 bg-zinc-50/30">
                <button className="flex-grow h-12 rounded-xl bg-white border border-zinc-100 hover:bg-zinc-50 flex items-center justify-center text-zinc-600 transition-all font-bold text-sm gap-2">
                   <Phone size={16} /> Contact
                </button>
                <button className="flex-grow h-12 rounded-xl bg-primary text-white hover:bg-primary/90 flex items-center justify-center transition-all font-bold text-sm gap-2 shadow-lg shadow-primary/20">
                   Schedule
                </button>
                <button className="w-12 h-12 rounded-xl bg-white border border-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50 transition-all">
                  <MoreHorizontal size={18} />
                </button>
              </div>
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
