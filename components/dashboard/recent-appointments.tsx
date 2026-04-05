'use client'

import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Calendar, Clock, MoreHorizontal } from "lucide-react"
import { useLanguage } from '@/contexts/LanguageContext'

const appointments = [
  {
    patient: "Ahmed Khan",
    doctor: "Dr. Rajesh Sharma",
    date: "Feb 23, 2026",
    time: "10:30 AM",
    status: "Confirmed",
    department: "Cardiology",
    type: "Follow-up"
  },
  {
    patient: "Sara Perveen",
    doctor: "Dr. Priya Kapoor",
    date: "Feb 23, 2026",
    time: "11:15 AM",
    status: "Pending",
    department: "Neurology",
    type: "Emergency"
  },
  {
    patient: "John Doe",
    doctor: "Dr. Arjun Patel",
    date: "Feb 23, 2026",
    time: "02:00 PM",
    status: "On-hold",
    department: "Orthopedics",
    type: "Consultation"
  },
  {
    patient: "Rita Miller",
    doctor: "Dr. Anjali Mehta",
    date: "Feb 24, 2026",
    time: "09:00 AM",
    status: "Confirmed",
    department: "Oncology",
    type: "Routine Checkup"
  },
  {
    patient: "Vikram Malhotra",
    doctor: "Dr. Rajesh Sharma",
    date: "Feb 24, 2026",
    time: "04:30 PM",
    status: "Pending",
    department: "Cardiology",
    type: "Surgery Consult"
  }
]

export default function RecentAppointments() {
  const { t } = useLanguage()

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-8 overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-black text-card-foreground tracking-tight">{t('Recent Appointments')}</h3>
          <p className="text-sm text-muted-foreground font-medium">{t('Monitoring patient intake and doctor schedules')}</p>
        </div>
        <button className="px-5 py-2.5 rounded-xl bg-muted text-muted-foreground font-bold text-sm hover:bg-secondary transition-all">
          {t('View All')}
        </button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="font-black text-zinc-950 uppercase text-[10px] tracking-widest px-6 py-4">{t('Patient')}</TableHead>
              <TableHead className="font-black text-zinc-950 uppercase text-[10px] tracking-widest px-6 py-4">{t('Specialist')}</TableHead>
              <TableHead className="font-black text-zinc-950 uppercase text-[10px] tracking-widest px-6 py-4">{t('Schedule')}</TableHead>
              <TableHead className="font-black text-zinc-950 uppercase text-[10px] tracking-widest px-6 py-4">{t('Status')}</TableHead>
              <TableHead className="font-black text-zinc-950 uppercase text-[10px] tracking-widest px-6 py-4 text-right">{t('Action')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appt, i) => (
              <TableRow key={i} className="group border-border/50 hover:bg-muted/50 transition-colors">
                <TableCell className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black text-xs">
                      {appt.patient.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-bold text-card-foreground">{appt.patient}</p>
                      <p className="text-[10px] font-bold text-muted-foreground/70 uppercase tracking-widest">{appt.type}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-5 text-sm font-bold text-muted-foreground">{appt.doctor}</TableCell>
                <TableCell className="px-6 py-5">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-card-foreground">
                      <Calendar size={12} className="text-primary" />
                      {appt.date}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground/70">
                      <Clock size={12} />
                      {appt.time}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-5">
                  <Badge className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border-none shadow-sm",
                    appt.status === 'Confirmed' ? "bg-emerald-500 text-background" : 
                    appt.status === 'Pending' ? "bg-amber-500 text-background" : "bg-zinc-400 text-background"
                  )}>
                    {t(appt.status)}
                  </Badge>
                </TableCell>
                <TableCell className="px-6 py-5 text-right">
                  <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
                    <MoreHorizontal size={18} className="text-muted-foreground/70" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ')
}
