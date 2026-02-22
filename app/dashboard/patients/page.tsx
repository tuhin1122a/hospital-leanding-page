'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Download, Filter, Mail, MoreVertical, Phone, Plus, Search } from 'lucide-react'

const patients = [
  { id: 'PT-001', name: 'Zayn Malik', age: 32, sex: 'Male', blood: 'O+', contact: '+880 1711-000000', status: 'Inpatient', room: '302-B', condition: 'Stable' },
  { id: 'PT-002', name: 'Emma Watson', age: 28, sex: 'Female', blood: 'A-', contact: '+880 1822-111111', status: 'Outpatient', room: '-', condition: 'Recovering' },
  { id: 'PT-003', name: 'Robert Downey', age: 45, sex: 'Male', blood: 'B+', contact: '+880 1933-222222', status: 'Emergency', room: 'ICU-04', condition: 'Critical' },
  { id: 'PT-004', name: 'Scarlett Johansson', age: 30, sex: 'Female', blood: 'AB+', contact: '+880 1644-333333', status: 'Inpatient', room: '205-A', condition: 'Observation' },
  { id: 'PT-005', name: 'Tom Holland', age: 24, sex: 'Male', blood: 'O-', contact: '+880 1555-444444', status: 'Discharged', room: '-', condition: 'Healthy' },
  { id: 'PT-006', name: 'Benedict Cumberbatch', age: 48, sex: 'Male', blood: 'A+', contact: '+880 1366-555555', status: 'Inpatient', room: '401-C', condition: 'Surgery Planned' },
]

export default function PatientsPage() {
  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-zinc-900 tracking-tighter text-balance">Patient Registry</h1>
          <p className="text-zinc-500 font-medium text-lg mt-1">Management and secure storage of health records</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button className="h-14 px-8 rounded-2xl bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-black border-none transition-all">
            <Download size={20} className="mr-2" /> Export
          </Button>
          <Button className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black shadow-xl shadow-primary/20 transition-all">
            <Plus size={20} className="mr-2" /> Add New Patient
          </Button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row items-center gap-6">
        <div className="relative flex-grow w-full">
           <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400" />
           <input 
            type="text" 
            placeholder="Search by name, ID, or phone number..." 
            className="w-full h-16 pl-16 pr-8 rounded-3xl bg-white border border-zinc-100 shadow-sm focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-zinc-900"
           />
        </div>
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <Button variant="outline" className="h-16 px-8 rounded-3xl border-zinc-200 font-black text-zinc-600">
            <Filter size={18} className="mr-2 text-primary" /> Filter
          </Button>
          <select className="h-16 px-8 rounded-3xl border border-zinc-200 bg-white font-black text-zinc-600 outline-none focus:ring-4 focus:ring-primary/5">
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
            className="group relative bg-white rounded-[3rem] border border-zinc-100 p-8 hover:shadow-2xl hover:shadow-zinc-200/50 transition-all duration-500 cursor-pointer"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-16 h-16 rounded-[1.5rem] bg-zinc-50 border border-zinc-100 flex items-center justify-center text-primary font-black text-2xl group-hover:bg-primary group-hover:text-white transition-all">
                {patient.name[0]}
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge className={cn(
                  "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-none shadow-sm",
                  patient.status === 'Emergency' ? 'bg-red-500 text-white' : 
                  patient.status === 'Inpatient' ? 'bg-blue-500 text-white' : 
                  patient.status === 'Outpatient' ? 'bg-emerald-500 text-white' : 'bg-zinc-400 text-white'
                )}>
                  {patient.status}
                </Badge>
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{patient.id}</span>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-black text-zinc-900 tracking-tight mb-2">{patient.name}</h3>
              <div className="flex items-center gap-4 text-zinc-500 font-bold text-sm">
                <span>{patient.age} Years</span>
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-200" />
                <span>{patient.sex}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-200" />
                <span className="text-primary">{patient.blood}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
               <div className="p-4 rounded-2xl bg-zinc-50/80 border border-zinc-100/50">
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Room</p>
                  <p className="font-black text-zinc-900">{patient.room}</p>
               </div>
               <div className="p-4 rounded-2xl bg-zinc-50/80 border border-zinc-100/50">
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Condition</p>
                  <p className={cn(
                    "font-black",
                    patient.condition === 'Critical' ? 'text-red-500' : 'text-zinc-900'
                  )}>{patient.condition}</p>
               </div>
            </div>

            <div className="flex items-center gap-3 pt-6 border-t border-zinc-50">
              <button className="flex-grow flex items-center justify-center gap-2 h-12 rounded-xl bg-zinc-50 hover:bg-zinc-100 text-zinc-600 transition-all">
                <Phone size={16} />
                <span className="text-sm font-bold">Call</span>
              </button>
              <button className="flex-grow flex items-center justify-center gap-2 h-12 rounded-xl bg-zinc-50 hover:bg-zinc-100 text-zinc-600 transition-all">
                <Mail size={16} />
                <span className="text-sm font-bold">Message</span>
              </button>
              <button className="h-12 w-12 rounded-xl bg-zinc-50 hover:bg-zinc-100 flex items-center justify-center text-zinc-400 transition-all">
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
