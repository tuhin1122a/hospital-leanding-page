'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Filter, Mail, MoreVertical, Phone, Plus, Search, X, User, MapPin, Calendar, Activity } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const API = 'http://localhost:5000/patients'

function getToken() { return localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken') || '' }
function authHeader() { return { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'application/json' } }

export default function PatientsPage() {
  const { t } = useLanguage()
  const [patients, setPatients] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: 'Male',
    age: '',
    bloodGroup: 'O+',
    address: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchPatients = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(API, { headers: authHeader() })
      if (res.ok) {
        const data = await res.json()
        setPatients(data)
      } else {
        toast.error('Failed to fetch patients')
      }
    } catch (err) {
      toast.error('Network error')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPatients()
  }, [])

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.phone || !formData.age) {
      return toast.error('Please fill required fields')
    }
    
    setIsSubmitting(true)
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({
          ...formData,
          age: parseInt(formData.age as string)
        })
      })
      
      if (res.ok) {
        toast.success(`Patient registered successfully!`)
        setShowModal(false)
        setFormData({ name: '', email: '', phone: '', gender: 'Male', age: '', bloodGroup: 'O+', address: '' })
        fetchPatients()
      } else {
        const data = await res.json()
        toast.error(data.message || 'Registration failed')
      }
    } catch (err) {
      toast.error('Network error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const filteredPatients = patients.filter(p => 
    p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.patientId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.phone?.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
          <Button 
            onClick={() => setShowModal(true)}
            className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-background font-black shadow-xl shadow-primary/20 transition-all"
          >
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
           {[1,2,3].map(i => <div key={i} className="h-80 rounded-[3rem] bg-muted animate-pulse" />)}
        </div>
      ) : filteredPatients.length === 0 ? (
        <div className="text-center py-20 bg-muted/30 rounded-[3rem] border border-dashed border-border">
          <User size={48} className="mx-auto text-muted-foreground/40 mb-4" />
          <p className="text-xl font-bold text-muted-foreground">{t('No patients found')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredPatients.map((patient, i) => (
            <motion.div
              key={patient.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="group relative bg-card rounded-[3rem] border border-border p-8 hover:shadow-2xl hover:shadow-zinc-200/50 transition-all duration-500 cursor-pointer overflow-hidden">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-muted border border-border flex items-center justify-center text-primary font-black text-2xl group-hover:bg-primary group-hover:text-background transition-all">
                    {patient.name[0]}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={cn(
                      "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-none shadow-sm bg-primary text-background"
                    )}>
                      {patient.admissions?.length > 0 ? 'Inpatient' : 'Outpatient'}
                    </Badge>
                    <span className="text-[10px] font-black text-muted-foreground/70 uppercase tracking-widest">{patient.patientId}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-black text-card-foreground tracking-tight mb-2">{patient.name}</h3>
                  <div className="flex items-center gap-4 text-muted-foreground font-bold text-sm">
                    <span>{patient.age} Years</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-200" />
                    <span>{patient.gender}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-200" />
                    <span className="text-primary">{patient.bloodGroup}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                   <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                      <Phone size={14} className="text-primary" />
                      {patient.phone}
                   </div>
                   <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                      <MapPin size={14} className="text-primary" />
                      <span className="truncate">{patient.address || 'No address provided'}</span>
                   </div>
                </div>

                <div className="flex items-center gap-3 pt-6 border-t border-border/50">
                  <button className="flex-grow flex items-center justify-center gap-2 h-12 rounded-xl bg-muted hover:bg-secondary text-muted-foreground transition-all">
                    <Phone size={16} />
                    <span className="text-sm font-bold">{t('Call')}</span>
                  </button>
                  <button className="flex-grow flex items-center justify-center gap-2 h-12 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all">
                    <Activity size={16} />
                    <span className="text-sm font-bold">{t('Admit')}</span>
                  </button>
                  <button className="h-12 w-12 rounded-xl bg-muted hover:bg-secondary flex items-center justify-center text-muted-foreground/70 transition-all">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Registration Modal */}
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
              className="relative w-full max-w-2xl bg-card border border-border rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 md:p-10 max-h-[90vh] overflow-y-auto custom-scrollbar">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-black text-card-foreground tracking-tighter">{t('Register Patient')}</h2>
                    <p className="text-muted-foreground font-medium">{t('Add new patient to hospital records')}</p>
                  </div>
                  <button 
                    onClick={() => setShowModal(false)}
                    className="p-3 rounded-2xl bg-muted hover:bg-border transition-all text-muted-foreground"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleRegister} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Full Name')} *</label>
                      <div className="relative">
                        <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" />
                        <input 
                          type="text" required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="e.g. John Doe"
                          className="w-full h-14 pl-14 pr-6 rounded-2xl bg-muted border border-border focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-card-foreground"
                        />
                      </div>
                    </div>

                    {/* Age */}
                    <div className="space-y-2">
                       <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Age')} *</label>
                       <div className="relative">
                         <Calendar size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" />
                         <input 
                           type="number" required
                           value={formData.age}
                           onChange={(e) => setFormData({...formData, age: e.target.value})}
                           placeholder="32"
                           className="w-full h-14 pl-14 pr-6 rounded-2xl bg-muted border border-border focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-card-foreground"
                         />
                       </div>
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                       <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Phone Number')} *</label>
                       <div className="relative">
                         <Phone size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" />
                         <input 
                           type="tel" required
                           value={formData.phone}
                           onChange={(e) => setFormData({...formData, phone: e.target.value})}
                           placeholder="+880 1XXX XXXXXX"
                           className="w-full h-14 pl-14 pr-6 rounded-2xl bg-muted border border-border focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-card-foreground"
                         />
                       </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                       <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Email (Optional)')}</label>
                       <div className="relative">
                         <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" />
                         <input 
                           type="email"
                           value={formData.email}
                           onChange={(e) => setFormData({...formData, email: e.target.value})}
                           placeholder="john@example.com"
                           className="w-full h-14 pl-14 pr-6 rounded-2xl bg-muted border border-border focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-card-foreground"
                         />
                       </div>
                    </div>

                    {/* Gender */}
                    <div className="space-y-2">
                       <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Gender')}</label>
                       <select 
                         value={formData.gender}
                         onChange={(e) => setFormData({...formData, gender: e.target.value})}
                         className="w-full h-14 px-6 rounded-2xl bg-muted border border-border focus:ring-4 focus:ring-primary/10 outline-none transition-all font-black text-card-foreground"
                       >
                         <option value="Male">Male</option>
                         <option value="Female">Female</option>
                         <option value="Other">Other</option>
                       </select>
                    </div>

                    {/* Blood Group */}
                    <div className="space-y-2">
                       <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Blood Group')}</label>
                       <select 
                         value={formData.bloodGroup}
                         onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}
                         className="w-full h-14 px-6 rounded-2xl bg-muted border border-border focus:ring-4 focus:ring-primary/10 outline-none transition-all font-black text-card-foreground"
                       >
                         {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(bg => (
                           <option key={bg} value={bg}>{bg}</option>
                         ))}
                       </select>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                     <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Full Address')}</label>
                     <div className="relative">
                       <MapPin size={18} className="absolute left-5 top-5 text-primary" />
                       <textarea 
                         rows={3}
                         value={formData.address}
                         onChange={(e) => setFormData({...formData, address: e.target.value})}
                         placeholder="123 Hospital Road, City, State"
                         className="w-full pt-4 pl-14 pr-6 rounded-2xl bg-muted border border-border focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-card-foreground resize-none"
                       />
                     </div>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-background font-black text-lg shadow-xl shadow-primary/20 transition-all mt-4"
                  >
                    {isSubmitting ? t('Registering...') : t('Register Information')}
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
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ')
}
