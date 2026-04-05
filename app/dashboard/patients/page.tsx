'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Filter, Mail, MoreVertical, Phone, Plus, Search, X, User, MapPin, Calendar, Activity, FlaskConical, ClipboardList, CreditCard, History } from 'lucide-react'
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
  const [selectedPatient, setSelectedPatient] = useState<any>(null)
  const [showHistoryModal, setShowHistoryModal] = useState(false)
  const [historyLoading, setHistoryLoading] = useState(false)
  const [historyData, setHistoryData] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const fetchHistory = async (patient: any) => {
    setSelectedPatient(patient)
    setShowHistoryModal(true)
    setHistoryLoading(true)
    try {
      const res = await fetch(`${API}/${patient.id}`, { headers: authHeader() })
      if (res.ok) {
        const data = await res.json()
        setHistoryData(data)
      }
    } catch (err) {
      toast.error('Failed to load history')
    } finally {
      setHistoryLoading(false)
    }
  }

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
  const [isAddingRecord, setIsAddingRecord] = useState(false)
  const [newRecordData, setNewRecordData] = useState({ diagnosis: '', symptoms: '', notes: '' })

  const handleAddRecord = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newRecordData.diagnosis) return toast.error('Diagnosis is required')
    
    setIsSubmitting(true)
    try {
      const res = await fetch(`http://localhost:5000/patients/${selectedPatient.id}/records`, {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(newRecordData)
      })
      if (res.ok) {
        toast.success('Medical record added successfully!')
        setIsAddingRecord(false)
        setNewRecordData({ diagnosis: '', symptoms: '', notes: '' })
        fetchHistory(selectedPatient) // Refresh history
      } else {
        toast.error('Failed to save record')
      }
    } catch (err) {
      toast.error('Network error')
    } finally {
      setIsSubmitting(false)
    }
  }

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
              <Card 
                onClick={() => fetchHistory(patient)}
                className="group relative bg-card rounded-[3rem] border border-border p-8 hover:shadow-2xl hover:shadow-zinc-200/50 transition-all duration-500 cursor-pointer overflow-hidden"
              >
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
      {/* History Modal */}
      <AnimatePresence>
        {showHistoryModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
             <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setShowHistoryModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-5xl bg-card border border-border rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row h-[85vh]"
            >
              {/* Sidebar Info */}
              <div className="w-full md:w-80 bg-muted/30 border-r border-border p-8 flex flex-col items-center">
                <div className="w-24 h-24 rounded-[2rem] bg-primary flex items-center justify-center text-background text-4xl font-black mb-6 shadow-xl shadow-primary/20">
                  {selectedPatient?.name[0]}
                </div>
                <h2 className="text-2xl font-black text-card-foreground text-center mb-1">{selectedPatient?.name}</h2>
                <Badge className="mb-8 uppercase tracking-widest text-[10px] rounded-full px-4">{selectedPatient?.patientId}</Badge>
                
                <div className="w-full space-y-4 font-bold text-sm text-muted-foreground">
                  <div className="flex justify-between py-2 border-b border-border/50">
                    <span>{t('Age')}</span>
                    <span className="text-card-foreground">{selectedPatient?.age} Yrs</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border/50">
                    <span>{t('Gender')}</span>
                    <span className="text-card-foreground">{selectedPatient?.gender}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border/50">
                    <span>{t('Blood')}</span>
                    <span className="text-primary">{selectedPatient?.bloodGroup}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border/50">
                     <span>{t('Phone')}</span>
                     <span className="text-card-foreground">{selectedPatient?.phone}</span>
                  </div>
                </div>

                <div className="mt-auto w-full">
                  <Button className="w-full h-14 rounded-2xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all font-black">
                    <Download className="mr-2" size={18} /> {t('Print EHR')}
                  </Button>
                </div>
              </div>

              {/* Content Tabs */}
              <div className="flex-grow flex flex-col overflow-hidden bg-card/50 backdrop-blur-sm">
                <div className="p-8 pb-0 flex items-center justify-between">
                  <div className="flex gap-2">
                    {['Overview', 'Records', 'Labs', 'Billing'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setHistoryData({ ...historyData, activeTab: tab })}
                        className={cn(
                          "px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all",
                          (historyData?.activeTab || 'Overview') === tab 
                            ? "bg-primary text-background shadow-lg shadow-primary/20" 
                            : "hover:bg-muted text-muted-foreground"
                        )}
                      >
                        {t(tab)}
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={() => setShowHistoryModal(false)}
                    className="p-3 rounded-2xl bg-muted hover:bg-border transition-all text-muted-foreground"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex-grow p-8 overflow-y-auto custom-scrollbar">
                  {historyLoading ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4 text-muted-foreground">
                       <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-rotate" />
                       <p className="font-bold">{t('Assembling history...')}</p>
                    </div>
                  ) : (
                    <div className="space-y-8 animate-in fade-in duration-500">
                      {/* Overview Tab */}
                      {(historyData?.activeTab || 'Overview') === 'Overview' && (
                        <div className="space-y-8">
                           {/* Stats Cards */}
                           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div className="p-4 rounded-3xl bg-blue-50/50 border border-blue-100 flex flex-col">
                                 <span className="text-[10px] font-black uppercase text-blue-500 mb-1">{t('Total Visits')}</span>
                                 <span className="text-2xl font-black text-blue-900">{(historyData?.appointments?.length || 0) + (historyData?.admissions?.length || 0)}</span>
                              </div>
                              <div className="p-4 rounded-3xl bg-purple-50/50 border border-purple-100 flex flex-col">
                                 <span className="text-[10px] font-black uppercase text-purple-500 mb-1">{t('Assessments')}</span>
                                 <span className="text-2xl font-black text-purple-900">{historyData?.records?.length || 0}</span>
                              </div>
                              <div className="p-4 rounded-3xl bg-amber-50/50 border border-amber-100 flex flex-col">
                                 <span className="text-[10px] font-black uppercase text-amber-500 mb-1">{t('Lab Tests')}</span>
                                 <span className="text-2xl font-black text-amber-900">{historyData?.labTests?.length || 0}</span>
                              </div>
                              <div className="p-4 rounded-3xl bg-emerald-50/50 border border-emerald-100 flex flex-col">
                                 <span className="text-[10px] font-black uppercase text-emerald-500 mb-1">{t('Total Paid')}</span>
                                 <span className="text-2xl font-black text-emerald-900">
                                   ৳{historyData?.billings?.reduce((acc: number, b: any) => acc + (b.paidAmount || 0), 0)}
                                 </span>
                              </div>
                           </div>

                           {/* Timeline Section */}
                           <div>
                              <div className="flex items-center gap-2 mb-6">
                                 <History size={18} className="text-primary" />
                                 <h4 className="text-lg font-black tracking-tight">{t('Timeline of Care')}</h4>
                              </div>
                              <div className="space-y-6 relative ml-3">
                                 <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
                                 {[...(historyData?.admissions || []), ...(historyData?.appointments || [])]
                                   .sort((a,b) => new Date(b.createdAt || b.appointmentDate).getTime() - new Date(a.createdAt || a.appointmentDate).getTime())
                                   .map((event: any, idx: number) => (
                                   <div key={idx} className="relative pl-8 group">
                                      <div className="absolute left-[-4px] top-1.5 w-2 h-2 rounded-full bg-primary border-4 border-background group-hover:scale-150 transition-all shadow-sm" />
                                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 p-4 rounded-2xl bg-muted/20 border border-border/50 hover:bg-muted/40 transition-all">
                                         <div>
                                            <div className="flex items-center gap-2 mb-1">
                                               <Badge variant="outline" className="text-[9px] uppercase font-black tracking-widest h-5 px-2">
                                                 {event.wardNo ? 'Admission' : 'Appointment'}
                                               </Badge>
                                               <span className="text-xs font-bold text-muted-foreground">
                                                  {new Date(event.createdAt || event.appointmentDate).toLocaleDateString()}
                                               </span>
                                            </div>
                                            <p className="font-bold text-card-foreground">{event.reason || event.department}</p>
                                         </div>
                                         <div className="text-right">
                                            <p className="text-xs font-bold text-muted-foreground">{t('Attended By')}</p>
                                            <p className="text-sm font-black text-primary">{event.doctorInCharge || event.doctorName}</p>
                                         </div>
                                      </div>
                                   </div>
                                 ))}
                                 {(!historyData?.admissions?.length && !historyData?.appointments?.length) && (
                                   <p className="text-muted-foreground font-medium italic text-sm ml-8">{t('No visit history recorded')}</p>
                                 )}
                              </div>
                           </div>
                        </div>
                      )}

                      {/* Records Tab */}
                      {(historyData?.activeTab === 'Records') && (
                        <div className="space-y-6">
                           <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <ClipboardList size={18} className="text-primary" />
                                <h4 className="text-lg font-black tracking-tight">{t('Medical Assessments')}</h4>
                              </div>
                              <Button 
                                onClick={() => setIsAddingRecord(true)}
                                variant="outline" size="sm" 
                                className="h-9 px-4 rounded-xl border-dashed border-primary/40 text-primary font-bold hover:bg-primary/5 text-xs"
                              >
                                 <Plus size={14} className="mr-1" /> {t('New Record')}
                              </Button>
                           </div>
                           
                           {isAddingRecord && (
                             <motion.form 
                               initial={{ opacity: 0, height: 0 }}
                               animate={{ opacity: 1, height: 'auto' }}
                               onSubmit={handleAddRecord} 
                               className="p-6 rounded-3xl bg-muted/20 border border-primary/20 space-y-4 mb-6"
                             >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                   <div className="space-y-1">
                                      <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">{t('Diagnosis')} *</label>
                                      <input 
                                        type="text" required
                                        value={newRecordData.diagnosis}
                                        onChange={(e) => setNewRecordData({...newRecordData, diagnosis: e.target.value})}
                                        className="w-full h-10 px-4 rounded-xl bg-card border border-border focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-sm"
                                      />
                                   </div>
                                   <div className="space-y-1">
                                      <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">{t('Symptoms')}</label>
                                      <input 
                                        type="text"
                                        value={newRecordData.symptoms}
                                        onChange={(e) => setNewRecordData({...newRecordData, symptoms: e.target.value})}
                                        className="w-full h-10 px-4 rounded-xl bg-card border border-border focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-sm"
                                      />
                                   </div>
                                </div>
                                <div className="space-y-1">
                                   <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">{t('Notes')}</label>
                                   <textarea 
                                     rows={3}
                                     value={newRecordData.notes}
                                     onChange={(e) => setNewRecordData({...newRecordData, notes: e.target.value})}
                                     className="w-full p-4 rounded-xl bg-card border border-border focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-sm resize-none"
                                   />
                                </div>
                                <div className="flex gap-2 justify-end">
                                   <Button type="button" variant="ghost" className="rounded-xl h-10 px-6 font-bold" onClick={() => setIsAddingRecord(false)}>
                                      {t('Cancel')}
                                   </Button>
                                   <Button type="submit" disabled={isSubmitting} className="rounded-xl h-10 px-8 font-black">
                                      {isSubmitting ? t('Saving...') : t('Save Record')}
                                   </Button>
                                </div>
                             </motion.form>
                           )}

                           <div className="space-y-4">
                              {historyData?.records?.length > 0 ? historyData.records.map((rec: any, i: number) => (
                                <div key={i} className="p-6 rounded-3xl bg-card border border-border shadow-sm hover:shadow-md transition-all">
                                   <div className="flex justify-between items-start mb-4">
                                      <span className="text-xs font-bold text-muted-foreground">{new Date(rec.createdAt).toLocaleDateString()}</span>
                                      <div className="flex items-center gap-2">
                                         {rec.vitals && Object.entries(rec.vitals).map(([k,v]: any) => (
                                           <Badge key={k} variant="secondary" className="text-[9px] font-black uppercase tracking-tighter bg-zinc-100 text-zinc-600">
                                              {k}: {v}
                                           </Badge>
                                         ))}
                                      </div>
                                   </div>
                                   <h5 className="text-lg font-black text-card-foreground mb-2">{rec.diagnosis}</h5>
                                   <p className="text-sm font-medium text-muted-foreground leading-relaxed">{rec.notes}</p>
                                </div>
                              )) : (
                                <div className="text-center py-12 rounded-3xl border border-dashed border-border bg-muted/5">
                                   <ClipboardList size={32} className="mx-auto text-muted-foreground/30 mb-3" />
                                   <p className="text-muted-foreground font-bold">{t('No medical records found')}</p>
                                </div>
                              )}
                           </div>
                        </div>
                      )}

                      {/* Labs Tab */}
                      {(historyData?.activeTab === 'Labs') && (
                        <div className="space-y-6">
                           <div className="flex items-center gap-2 mb-2">
                             <FlaskConical size={18} className="text-primary" />
                             <h4 className="text-lg font-black tracking-tight">{t('Laboratory & Diagnostic Tests')}</h4>
                           </div>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {historyData?.labTests?.length > 0 ? historyData.labTests.map((test: any, i: number) => (
                                <div key={i} className="p-5 rounded-3xl bg-card border border-border relative overflow-hidden group">
                                   <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[4rem] flex items-center justify-center -mr-8 -mt-8 group-hover:bg-primary/10 transition-all">
                                      <FlaskConical size={20} className="text-primary/30 mr-4 mt-4" />
                                   </div>
                                   <Badge className={cn(
                                     "mb-3 px-3 py-1 rounded-full text-[9px] font-black",
                                     test.status === 'COMPLETED' ? "bg-emerald-500" : "bg-amber-500"
                                   )}>
                                     {test.status}
                                   </Badge>
                                   <h5 className="font-black text-card-foreground mb-2">{test.testName}</h5>
                                   <div className="flex justify-between items-end">
                                      <div className="text-xs font-bold text-muted-foreground">
                                         <p>{t('Date')}: {new Date(test.date).toLocaleDateString()}</p>
                                         <p className="text-primary mt-1">{test.result || t('Awaiting result...')}</p>
                                      </div>
                                      {test.reportUrl && (
                                        <button className="h-8 w-8 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary flex items-center justify-center transition-all">
                                          <Download size={14} />
                                        </button>
                                      )}
                                   </div>
                                </div>
                              )) : (
                                <div className="col-span-2 text-center py-12 rounded-3xl border border-dashed border-border bg-muted/5">
                                   <FlaskConical size={32} className="mx-auto text-muted-foreground/30 mb-3" />
                                   <p className="text-muted-foreground font-bold">{t('No lab tests recorded')}</p>
                                </div>
                              )}
                           </div>
                        </div>
                      )}

                      {/* Billing Tab */}
                      {(historyData?.activeTab === 'Billing') && (
                        <div className="space-y-6">
                           <div className="flex items-center gap-2 mb-2">
                             <CreditCard size={18} className="text-primary" />
                             <h4 className="text-lg font-black tracking-tight">{t('Billing & Payments')}</h4>
                           </div>
                           <div className="space-y-4">
                              {historyData?.billings?.length > 0 ? historyData.billings.map((bill: any, i: number) => (
                                <div key={i} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-card border border-border hover:border-primary/20 transition-all">
                                   <div className="flex items-center gap-4">
                                      <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-500">
                                         <CreditCard size={20} />
                                      </div>
                                      <div>
                                         <h5 className="font-black text-card-foreground">{bill.invoiceNo}</h5>
                                         <p className="text-xs font-bold text-muted-foreground">{new Date(bill.createdAt).toLocaleDateString()}</p>
                                      </div>
                                   </div>
                                   <div className="flex items-center gap-8">
                                      <div className="text-right">
                                         <p className="text-xs font-extrabold text-muted-foreground uppercase">{t('Total')}</p>
                                         <p className="text-lg font-black text-card-foreground">৳{bill.totalAmount}</p>
                                      </div>
                                      <div className="text-right">
                                         <p className="text-xs font-extrabold text-muted-foreground uppercase">{t('Paid')}</p>
                                         <p className="text-lg font-black text-emerald-600">৳{bill.paidAmount}</p>
                                      </div>
                                      <Badge className={cn(
                                        "px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest",
                                        bill.status === 'PAID' ? "bg-emerald-500" : "bg-red-500"
                                      )}>
                                        {bill.status}
                                      </Badge>
                                      <button className="h-10 w-10 rounded-xl bg-muted hover:bg-zinc-200 flex items-center justify-center text-muted-foreground transition-all">
                                        <Download size={16} />
                                      </button>
                                   </div>
                                </div>
                              )) : (
                                <div className="text-center py-12 rounded-3xl border border-dashed border-border bg-muted/5">
                                   <CreditCard size={32} className="mx-auto text-muted-foreground/30 mb-3" />
                                   <p className="text-muted-foreground font-bold">{t('No financial records found')}</p>
                                </div>
                              )}
                           </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
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
