'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import {
    ArrowUpRight,
    ChevronLeft,
    ChevronRight,
    Clock,
    MapPin,
    Plus,
    User
} from 'lucide-react'
import { useState } from 'react'

const upcomingSessions = [
  { id: 1, doctor: "Dr. Rajesh Sharma", patient: "Ahmed Khan", date: "Feb 23, 2026", time: "10:30 - 11:00 AM", type: "Cardiology Internal", status: "In-Progress", bg: "bg-blue-500" },
  { id: 2, doctor: "Dr. Priya Kapoor", patient: "Sara Perveen", date: "Feb 23, 2026", time: "11:15 - 11:45 AM", type: "Neurology Check", status: "Upcoming", bg: "bg-purple-500" },
  { id: 3, doctor: "Dr. Arjun Patel", patient: "John Doe", date: "Feb 23, 2026", time: "12:30 - 01:15 PM", type: "Ortho Surgery Consult", status: "Upcoming", bg: "bg-emerald-500" },
  { id: 4, doctor: "Dr. Anjali Mehta", patient: "Rita Miller", date: "Feb 23, 2026", time: "02:15 - 03:00 PM", type: "Oncology Review", status: "Upcoming", bg: "bg-amber-500" },
]

export default function AppointmentsPage() {
  const [view, setView] = useState('list')

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-zinc-900 tracking-tighter">Clinical Schedule</h1>
          <p className="text-zinc-500 font-medium text-lg mt-1">Real-time monitoring of all clinical appointments</p>
        </div>
        
        <div className="flex bg-white p-1 rounded-2xl border border-zinc-100 shadow-sm">
           <button 
            onClick={() => setView('list')}
            className={cn(
              "px-6 py-2.5 rounded-xl text-sm font-black transition-all",
              view === 'list' ? "bg-zinc-900 text-white shadow-lg shadow-zinc-900/20" : "text-zinc-500 hover:text-zinc-900"
            )}
           >
            List View
           </button>
           <button 
            onClick={() => setView('calendar')}
            className={cn(
              "px-6 py-2.5 rounded-xl text-sm font-black transition-all",
              view === 'calendar' ? "bg-zinc-900 text-white shadow-lg shadow-zinc-900/20" : "text-zinc-500 hover:text-zinc-900"
            )}
           >
            Calendar
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
        {/* Left Column: List/Calendar */}
        <div className="xl:col-span-3 space-y-8">
          <div className="bg-white rounded-[3rem] border border-zinc-100 p-10">
             <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-6">
                   <h2 className="text-2xl font-black text-zinc-900 tracking-tight">Monday, 23 February</h2>
                   <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" className="w-10 h-10 rounded-xl border-zinc-100">
                        <ChevronLeft size={18} />
                      </Button>
                      <Button variant="outline" size="icon" className="w-10 h-10 rounded-xl border-zinc-100">
                        <ChevronRight size={18} />
                      </Button>
                   </div>
                </div>
                <Button className="h-12 px-6 rounded-xl bg-primary hover:bg-primary/90 text-white font-black shadow-lg shadow-primary/20">
                  <Plus size={18} className="mr-2" /> Book Appointment
                </Button>
             </div>

             <div className="space-y-4">
                {upcomingSessions.map((session, i) => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group flex flex-col md:flex-row md:items-center gap-6 p-6 rounded-[2rem] border border-zinc-50 hover:border-primary/20 hover:bg-primary/[0.02] transition-all cursor-pointer"
                  >
                    <div className="flex flex-col items-center justify-center w-24 h-24 rounded-2xl bg-zinc-50 text-zinc-400 group-hover:bg-primary group-hover:text-white transition-all">
                       <p className="text-[10px] font-black uppercase tracking-tighter">Start At</p>
                       <p className="text-lg font-black">{session.time.split(' ')[0]}</p>
                    </div>

                    <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-6">
                       <div className="space-y-1">
                          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Specialist</p>
                          <p className="text-lg font-black text-zinc-900">{session.doctor}</p>
                          <div className="flex items-center gap-2 text-xs font-bold text-zinc-500">
                             <MapPin size={12} className="text-primary" /> Room 302, Phase II
                          </div>
                       </div>
                       
                       <div className="space-y-1">
                          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Patient</p>
                          <p className="text-lg font-black text-zinc-900">{session.patient}</p>
                          <div className="flex items-center gap-2 text-xs font-bold text-zinc-500">
                             <User size={12} className="text-primary" /> {session.type}
                          </div>
                       </div>

                       <div className="flex flex-col items-start md:items-end justify-center">
                          <Badge className={cn(
                            "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-none mb-2 shadow-sm",
                            session.status === 'In-Progress' ? 'bg-emerald-500 text-white' : 'bg-zinc-200 text-zinc-600'
                          )}>
                            {session.status}
                          </Badge>
                          <div className="flex items-center gap-2 text-xs font-bold text-zinc-400">
                             <Clock size={12} /> Duration: 45 min
                          </div>
                       </div>
                    </div>
                    
                    <button className="w-12 h-12 rounded-xl bg-zinc-50 group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                       <ArrowUpRight size={20} />
                    </button>
                  </motion.div>
                ))}
             </div>
          </div>
        </div>

        {/* Right Column: Mini Widgets */}
        <div className="space-y-8">
           <Card className="p-8 rounded-[2.5rem] border-zinc-100 shadow-sm bg-zinc-950 text-white relative overflow-hidden">
              <div className="relative z-10">
                 <h3 className="text-lg font-black tracking-tight mb-2">Doctor's Load</h3>
                 <p className="text-sm text-zinc-400 font-medium mb-8">Capacity utilization for today</p>
                 
                 <div className="space-y-6">
                    {[
                      { name: "Dr. Rajesh", load: 85, color: "bg-blue-500" },
                      { name: "Dr. Priya", load: 60, color: "bg-purple-500" },
                      { name: "Dr. Arjun", load: 40, color: "bg-emerald-500" },
                    ].map((doc, i) => (
                      <div key={i} className="space-y-2">
                         <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                            <span>{doc.name}</span>
                            <span>{doc.load}%</span>
                         </div>
                         <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                            <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: `${doc.load}%` }}
                               transition={{ duration: 1, delay: i * 0.2 }}
                               className={cn("h-full rounded-full", doc.color)} 
                            />
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
           </Card>

           <div className="bg-white rounded-[2.5rem] border border-zinc-100 shadow-sm p-8">
              <h3 className="text-lg font-black text-zinc-900 tracking-tight mb-6">Reminders</h3>
              <div className="space-y-4">
                 {[
                   { title: "Staff Meeting", time: "09:00 AM", category: "Hospital" },
                   { title: "Equipment Check", time: "11:30 AM", category: "Maintenance" },
                   { title: "Report Review", time: "04:00 PM", category: "Clinical" },
                 ].map((rem, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-100/50">
                       <div className="w-2 h-2 rounded-full bg-primary" />
                       <div>
                          <p className="text-sm font-black text-zinc-900">{rem.title}</p>
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{rem.time} • {rem.category}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ')
}
