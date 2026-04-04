'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Hotel, Plus, Search, X, User, 
  Calendar, Activity, LogOut, ArrowRight,
  ClipboardCheck, Clock
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const API = 'http://localhost:5000/admissions'
const PATIENTS_API = 'http://localhost:5000/patients'

function getToken() { return localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken') || '' }
function authHeader() { return { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'application/json' } }

export default function AdmissionsPage() {
  const { t } = useLanguage()
  const [admissions, setAdmissions] = useState<any[]>([])
  const [patients, setPatients] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Form State
  const [formData, setFormData] = useState({
    patientId: '',
    wardNo: '',
    bedNo: '',
    doctorInCharge: '',
    reason: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const [admRes, patRes] = await Promise.all([
        fetch(API, { headers: authHeader() }),
        fetch(PATIENTS_API, { headers: authHeader() })
      ])
      
      if (admRes.ok && patRes.ok) {
        setAdmissions(await admRes.json())
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

  const handleAdmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.patientId || !formData.wardNo || !formData.bedNo) {
      return toast.error('Please fill required fields')
    }
    
    setIsSubmitting(true)
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(formData)
      })
      
      if (res.ok) {
        toast.success(`Patient admitted successfully!`)
        setShowModal(false)
        setFormData({ patientId: '', wardNo: '', bedNo: '', doctorInCharge: '', reason: '' })
        fetchData()
      } else {
        const data = await res.json()
        toast.error(data.message || 'Admission failed')
      }
    } catch (err) {
      toast.error('Network error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDischarge = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to discharge ${name}?`)) return
    
    try {
      const res = await fetch(`${API}/${id}/discharge`, {
        method: 'PATCH',
        headers: authHeader()
      })
      if (res.ok) {
        toast.success('Patient discharged')
        fetchData()
      }
    } catch (err) {
      toast.error('Failed to discharge')
    }
  }

  const filteredAdmissions = admissions.filter(a => 
    a.patient?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.patient?.patientId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.wardNo?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-card-foreground tracking-tighter">{t('Current Admissions')}</h1>
          <p className="text-muted-foreground font-medium text-lg mt-1">{t('Manage indoor patients and bed assignments')}</p>
        </div>
        <Button 
          onClick={() => setShowModal(true)}
          className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-background font-black shadow-xl shadow-primary/20 transition-all flex items-center gap-2"
        >
          <Plus size={20} /> {t('New Admission')}
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-2xl">
         <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/70" />
         <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t("Search by patient name, ID, or ward...")} 
          className="w-full h-16 pl-16 pr-8 rounded-3xl bg-card border border-border shadow-sm focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-card-foreground"
         />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
           {[1,2,3].map(i => <div key={i} className="h-64 rounded-[3rem] bg-muted animate-pulse" />)}
        </div>
      ) : filteredAdmissions.length === 0 ? (
        <div className="text-center py-20 bg-muted/30 rounded-[3rem] border border-dashed border-border">
          <Hotel size={48} className="mx-auto text-muted-foreground/40 mb-4" />
          <p className="text-xl font-bold text-muted-foreground">{t('No active admissions')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredAdmissions.map((adm, i) => (
            <motion.div
              key={adm.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="p-8 rounded-[3rem] border border-border bg-card hover:shadow-2xl transition-all duration-500 overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[5rem] -mr-8 -mt-8 transition-all group-hover:bg-primary/10" />
                
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                      <User size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-card-foreground tracking-tight">{adm.patient?.name}</h3>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{adm.patient?.patientId}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 rounded-2xl bg-muted/50 border border-border/50">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{t('Ward / Room')}</p>
                    <p className="text-sm font-black text-card-foreground">{adm.wardNo}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-muted/50 border border-border/50">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{t('Bed No')}</p>
                    <p className="text-sm font-black text-card-foreground">#{adm.bedNo}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                    <Activity size={14} className="text-primary" />
                    {adm.doctorInCharge || 'Assigning Doctor...'}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                    <Clock size={14} className="text-primary" />
                    {new Date(adm.admissionDate).toLocaleString()}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-6 border-t border-border/50">
                   <button 
                    onClick={() => handleDischarge(adm.id, adm.patient?.name)}
                    className="flex items-center justify-center gap-2 h-12 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all font-bold text-sm"
                   >
                     <LogOut size={16} /> {t('Discharge')}
                   </button>
                   <button className="flex items-center justify-center gap-2 h-12 rounded-xl bg-muted hover:bg-secondary text-muted-foreground transition-all font-bold text-sm">
                     <ArrowRight size={16} /> {t('Billing')}
                   </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Admission Modal */}
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
                    <h2 className="text-2xl font-black text-card-foreground tracking-tighter">{t('New Admission')}</h2>
                    <p className="text-muted-foreground font-medium">{t('Assign a bed to an existing patient')}</p>
                  </div>
                  <button 
                    onClick={() => setShowModal(false)}
                    className="p-3 rounded-2xl bg-muted hover:bg-border transition-all text-muted-foreground"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleAdmit} className="space-y-6">
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
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Ward / Dept')}</label>
                      <input 
                        type="text" required
                        value={formData.wardNo}
                        onChange={(e) => setFormData({...formData, wardNo: e.target.value})}
                        placeholder="e.g. General Ward-A"
                        className="w-full h-14 px-6 rounded-2xl bg-muted border border-border focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-card-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Bed Number')}</label>
                      <input 
                        type="text" required
                        value={formData.bedNo}
                        onChange={(e) => setFormData({...formData, bedNo: e.target.value})}
                        placeholder="e.g. 102"
                        className="w-full h-14 px-6 rounded-2xl bg-muted border border-border focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-card-foreground"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Doctor In-Charge')}</label>
                    <input 
                      type="text"
                      value={formData.doctorInCharge}
                      onChange={(e) => setFormData({...formData, doctorInCharge: e.target.value})}
                      placeholder="Doctor Name"
                      className="w-full h-14 px-6 rounded-2xl bg-muted border border-border focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-card-foreground"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-background font-black text-lg shadow-xl shadow-primary/20 transition-all mt-4"
                  >
                    {isSubmitting ? t('Admitting...') : t('Confirm Admission')}
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
