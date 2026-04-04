'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ArrowUpRight,
    ChevronLeft,
    ChevronRight,
    Clock,
    MapPin,
    Plus,
    User,
    X,
    Calendar as CalendarIcon,
    Stethoscope,
    Activity
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import toast from 'react-hot-toast'

const API = 'http://localhost:5000/appointments'
const PATIENTS_API = 'http://localhost:5000/patients'

function getToken() { return localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken') || '' }
function authHeader() { return { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'application/json' } }

export default function AppointmentsPage() {
  const [view, setView] = useState('list')
  const { t } = useLanguage()
  const [appointments, setAppointments] = useState<any[]>([])
  const [patients, setPatients] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  // Form State
  const [formData, setFormData] = useState({
    patientId: '',
    department: 'General Medicine',
    doctorName: '',
    appointmentDate: new Date().toISOString().split('T')[0],
    fee: 500
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const [appRes, patRes] = await Promise.all([
        fetch(API, { headers: authHeader() }),
        fetch(PATIENTS_API, { headers: authHeader() })
      ])
      if (appRes.ok && patRes.ok) {
        setAppointments(await appRes.json())
        setPatients(await patRes.json())
      }
    } catch (err) {
      toast.error('Network error')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.patientId || !formData.doctorName || !formData.department) {
      return toast.error('Please fill required fields')
    }
    
    setIsSubmitting(true)
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({
          ...formData,
          fee: Number(formData.fee),
          appointmentDate: new Date(formData.appointmentDate).toISOString()
        })
      })
      
      if (res.ok) {
        toast.success(`Appointment booked successfully!`)
        setShowModal(false)
        setFormData({ ...formData, patientId: '', doctorName: '' })
        fetchData()
      } else {
        toast.error('Failed to book appointment')
      }
    } catch (err) {
      toast.error('Network error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-card-foreground tracking-tighter">{t('Clinical Schedule')}</h1>
          <p className="text-muted-foreground font-medium text-lg mt-1">{t('Manage doctor consultations and patient queues')}</p>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="flex bg-card p-1 rounded-2xl border border-border shadow-sm">
              <button 
                onClick={() => setView('list')}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-sm font-black transition-all",
                  view === 'list' ? "bg-foreground/90 text-background shadow-lg shadow-zinc-900/20" : "text-muted-foreground hover:text-card-foreground"
                )}
              >
                {t('List')}
              </button>
              <button 
                onClick={() => setView('calendar')}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-sm font-black transition-all",
                  view === 'calendar' ? "bg-foreground/90 text-background shadow-lg shadow-zinc-900/20" : "text-muted-foreground hover:text-card-foreground"
                )}
              >
                {t('Grid')}
              </button>
           </div>
           <Button 
            onClick={() => setShowModal(true)}
            className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-background font-black shadow-xl shadow-primary/20 transition-all"
           >
             <Plus size={18} className="mr-2" /> {t('Book Appointment')}
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
        <div className="xl:col-span-3 space-y-8">
          <div className="bg-card rounded-[3rem] border border-border p-10 min-h-[600px]">
             <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-6">
                   <h2 className="text-2xl font-black text-card-foreground tracking-tight">{new Date().toDateString()}</h2>
                </div>
             </div>

             {isLoading ? (
                <div className="space-y-4">
                  {[1,2,3].map(i => <div key={i} className="h-24 rounded-2xl bg-muted animate-pulse" />)}
                </div>
             ) : appointments.length === 0 ? (
                <div className="text-center py-20 bg-muted/20 rounded-[2rem] border border-dashed border-border">
                  <CalendarIcon size={48} className="mx-auto text-muted-foreground/30 mb-4" />
                  <p className="text-lg font-bold text-muted-foreground">{t('No appointments found for today')}</p>
                </div>
             ) : (
                <div className="space-y-4">
                   {appointments.map((app, i) => (
                     <motion.div
                       key={app.id}
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: i * 0.05 }}
                       className="group flex flex-col md:flex-row md:items-center gap-6 p-6 rounded-[2rem] border border-border/50 hover:bg-muted/30 transition-all cursor-pointer"
                     >
                       <div className="flex flex-col items-center justify-center w-24 h-24 rounded-2xl bg-primary/5 text-primary">
                          <p className="text-[10px] font-black uppercase tracking-tighter">{t('SL NO')}</p>
                          <p className="text-3xl font-black">#{app.serialNo}</p>
                       </div>

                       <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                             <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 mb-1">{t('Specialist')}</p>
                             <div className="flex items-center gap-2">
                                <p className="text-lg font-black text-card-foreground">{app.doctorName}</p>
                                <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest border-primary/20 text-primary">{app.department}</Badge>
                             </div>
                          </div>
                          <div>
                             <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 mb-1">{t('Patient Information')}</p>
                             <p className="text-lg font-black text-card-foreground">{app.patient?.name}</p>
                             <p className="text-xs font-bold text-muted-foreground">ID: {app.patient?.patientId}</p>
                          </div>
                       </div>
                       
                       <div className="md:text-right">
                          <Badge className={cn(
                            "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-none mb-2 shadow-sm",
                            app.status === 'PENDING' ? 'bg-amber-500 text-background' : 'bg-emerald-500 text-background'
                          )}>
                            {app.status}
                          </Badge>
                          <p className="text-xs font-bold text-muted-foreground/70">{new Date(app.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                       </div>
                     </motion.div>
                   ))}
                </div>
             )}
          </div>
        </div>

        <div className="space-y-8">
           <Card className="p-8 rounded-[2.5rem] border-border shadow-sm bg-foreground text-background relative overflow-hidden">
              <div className="relative z-10">
                 <h3 className="text-lg font-black tracking-tight mb-2">{t('Queue Status')}</h3>
                 <p className="text-sm text-muted-foreground/70 font-medium mb-8">{t('Live monitor of clinic traffic')}</p>
                 
                 <div className="space-y-6">
                    <div className="flex justify-between items-end">
                       <div>
                          <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">{t('Waiting')}</p>
                          <p className="text-4xl font-black text-primary">{appointments.filter(a => a.status === 'PENDING').length}</p>
                       </div>
                       <Activity className="text-primary mb-2" size={32} />
                    </div>
                 </div>
              </div>
           </Card>
        </div>
      </div>

      {/* Booking Modal */}
       <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => !isSubmitting && setShowModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-card border border-border rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 md:p-10">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-black text-card-foreground tracking-tighter">{t('Book Appointment')}</h2>
                    <p className="text-muted-foreground font-medium">{t('Schedule a consultation for a patient')}</p>
                  </div>
                  <button onClick={() => setShowModal(false)} className="p-3 rounded-2xl bg-muted hover:bg-border transition-all text-muted-foreground">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleBook} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Select Patient')}</label>
                    <select 
                      value={formData.patientId}
                      onChange={(e) => setFormData({...formData, patientId: e.target.value})}
                      className="w-full h-14 px-6 rounded-2xl bg-muted border border-border focus:ring-4 focus:ring-primary/10 outline-none transition-all font-black text-card-foreground"
                    >
                      <option value="">{t('Choose a patient...')}</option>
                      {patients.map(p => (
                        <option key={p.id} value={p.id}>{p.name} ({p.patientId})</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Department')}</label>
                      <select 
                        value={formData.department}
                        onChange={(e) => setFormData({...formData, department: e.target.value})}
                        className="w-full h-14 px-6 rounded-2xl bg-muted border border-border focus:ring-4 focus:ring-primary/10 outline-none transition-all font-black text-card-foreground"
                      >
                        <option value="General Medicine">General Medicine</option>
                        <option value="Cardiology">Cardiology</option>
                        <option value="Neurology">Neurology</option>
                        <option value="Orthopedics">Orthopedics</option>
                        <option value="Pediatrics">Pediatrics</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Doctor Name')}</label>
                      <input 
                        type="text" required
                        value={formData.doctorName}
                        onChange={(e) => setFormData({...formData, doctorName: e.target.value})}
                        placeholder="e.g. Dr. Rajesh"
                        className="w-full h-14 px-6 rounded-2xl bg-muted border border-border outline-none transition-all font-bold text-card-foreground"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Date')}</label>
                      <input 
                        type="date" required
                        value={formData.appointmentDate}
                        onChange={(e) => setFormData({...formData, appointmentDate: e.target.value})}
                        className="w-full h-14 px-6 rounded-2xl bg-muted border border-border outline-none transition-all font-bold text-card-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Consultation Fee')}</label>
                      <input 
                        type="number" required
                        value={formData.fee}
                        onChange={(e) => setFormData({...formData, fee: Number(e.target.value)})}
                        className="w-full h-14 px-6 rounded-2xl bg-muted border border-border outline-none transition-all font-bold text-card-foreground"
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-background font-black text-lg shadow-xl shadow-primary/20 transition-all mt-4"
                  >
                    {isSubmitting ? t('Wait...') : t('Confirm Booking')}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ')
}
