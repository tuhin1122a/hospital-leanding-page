'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Briefcase, Calendar, Filter, MoreVertical, Phone, Plus, Search } from 'lucide-react'

const staff = [
  { id: 'STF-001', name: 'Zoya Rahman', role: 'Head Nurse', dept: 'ICU', experience: '12 Years', status: 'On Shift', image: 'https://i.pravatar.cc/150?u=11' },
  { id: 'STF-002', name: 'Kabir Ahmed', role: 'Lab Technician', dept: 'Pathology', experience: '6 Years', status: 'On Shift', image: 'https://i.pravatar.cc/150?u=12' },
  { id: 'STF-003', name: 'Sneha Kapur', role: 'Chief Pharmacist', dept: 'Pharmacy', experience: '15 Years', status: 'Break', image: 'https://i.pravatar.cc/150?u=13' },
  { id: 'STF-004', name: 'Arjun Das', role: 'Administrator', dept: 'Front Office', experience: '8 Years', status: 'Off Duty', image: 'https://i.pravatar.cc/150?u=14' },
  { id: 'STF-005', name: 'Riya Sen', role: 'Nursing Supervisor', dept: 'Emergency', experience: '10 Years', status: 'On Shift', image: 'https://i.pravatar.cc/150?u=15' },
  { id: 'STF-006', name: 'Amit Shah', role: 'IT Manager', dept: 'Systems', experience: '7 Years', status: 'On Shift', image: 'https://i.pravatar.cc/150?u=16' },
]

export default function StaffPage() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-zinc-900 tracking-tighter">Medical & Support Staff</h1>
          <p className="text-zinc-500 font-medium text-lg mt-1">Manage personnel, shift rotations, and department assignments</p>
        </div>
        <Button className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black shadow-xl shadow-primary/20 transition-all">
          <Plus size={20} className="mr-2" /> Add Staff Member
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-6">
        <div className="relative flex-grow w-full">
           <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400" />
           <input 
            type="text" 
            placeholder="Search by name, role, or ID..." 
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
        {staff.map((member, i) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="p-0 border-zinc-100 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:shadow-zinc-200/50 transition-all duration-500 relative group">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="relative">
                    <img src={member.image} alt={member.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-lg" />
                    <div className={cn(
                      "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white",
                      member.status === 'On Shift' ? 'bg-emerald-500' : 
                      member.status === 'Break' ? 'bg-amber-500' : 'bg-zinc-400'
                    )} />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant="outline" className="bg-zinc-50 border-zinc-100 text-zinc-500 font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
                      {member.dept} Unit
                    </Badge>
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{member.id}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <h3 className="text-xl font-black text-zinc-900 tracking-tight leading-none">{member.name}</h3>
                  <div className="flex items-center gap-3 text-xs font-bold text-zinc-500">
                    <div className="flex items-center gap-1">
                      <Briefcase size={14} className="text-primary" />
                      {member.role}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-zinc-50/50 rounded-2xl p-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Tenure</p>
                    <p className="text-md font-black text-zinc-900">{member.experience}</p>
                  </div>
                  <div className="bg-zinc-50/50 rounded-2xl p-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Status</p>
                    <p className={cn(
                      "text-md font-black",
                      member.status === 'On Shift' ? 'text-emerald-600' : 'text-zinc-500'
                    )}>{member.status}</p>
                  </div>
                </div>
              </div>

              <div className="px-8 pb-8 pt-4 flex items-center gap-3 border-t border-zinc-50 bg-zinc-50/30">
                <button className="flex-grow h-12 rounded-xl bg-white border border-zinc-100 hover:bg-zinc-50 flex items-center justify-center text-zinc-600 transition-all font-bold text-sm gap-2">
                   <Phone size={16} /> Call
                </button>
                <button className="flex-grow h-12 rounded-xl bg-white border border-zinc-100 hover:bg-zinc-50 flex items-center justify-center text-zinc-600 transition-all font-bold text-sm gap-2">
                   <Calendar size={16} /> Shifts
                </button>
                <button className="w-12 h-12 rounded-xl bg-white border border-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50 transition-all">
                  <MoreVertical size={18} />
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
