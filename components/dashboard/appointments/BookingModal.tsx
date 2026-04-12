'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, User, Calendar, Clock, Stethoscope, ChevronRight, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'

interface Doctor {
  id: string
  name: string
  email: string
  profilePic?: string
  doctorProfile?: {
    specialty: string
    department: string
    fee: number
    experience?: string
    availableDays: string[]
    startTime: string
    endTime: string
    slotDuration: number
    isActive: boolean
  }
}

interface Patient {
  id: string
  name: string
  patientId: string
}

interface BookingModalProps {
  show: boolean
  onClose: () => void
  patients: Patient[]
  doctors: Doctor[]
  onSubmit: (data: any) => void
  isSubmitting: boolean
  role?: string
}

const DAY_LABELS: Record<string, string> = {
  MON: 'সোম', TUE: 'মঙ্গল', WED: 'বুধ', THU: 'বৃহঃ', FRI: 'শুক্র', SAT: 'শনি', SUN: 'রবি'
}

const API = process.env.NEXT_PUBLIC_API_URL
const getToken = () => {
  if (typeof window === 'undefined') return ''
  return document.cookie.split('; ').find(r => r.startsWith('accessToken='))?.split('=')[1] || ''
}
const authHeader = () => ({ Authorization: `Bearer ${getToken()}`, 'Content-Type': 'application/json' })

export default function BookingModal({ show, onClose, patients, doctors, onSubmit, isSubmitting, role }: BookingModalProps) {
  const { t } = useLanguage()

  const [step, setStep] = useState(1) // 1=doctor, 2=date+slot, 3=patient+confirm
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedPatient, setSelectedPatient] = useState('')
  const [notes, setNotes] = useState('')
  const [slots, setSlots] = useState<{ slots: string[]; booked: string[]; fee: number; notAvailable?: boolean; dayName?: string }>({ slots: [], booked: [], fee: 500 })
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [doctorSearch, setDoctorSearch] = useState('')
  const [patientSearch, setPatientSearch] = useState('')

  // Reset on open
  useEffect(() => {
    if (show) {
      setStep(1); setSelectedDoctor(null); setSelectedDate(new Date().toISOString().split('T')[0])
      setSelectedTime(''); setSelectedPatient(''); setNotes(''); setDoctorSearch(''); setPatientSearch('')
    }
  }, [show])

  // Fetch slots when doctor + date changes
  useEffect(() => {
    if (selectedDoctor && selectedDate && step === 2) {
      setLoadingSlots(true)
      setSelectedTime('')
      fetch(`${API}/doctors/${selectedDoctor.id}/slots?date=${selectedDate}`, { headers: authHeader() })
        .then(r => r.json())
        .then(d => setSlots(d))
        .catch(() => setSlots({ slots: [], booked: [], fee: selectedDoctor.doctorProfile?.fee || 500 }))
        .finally(() => setLoadingSlots(false))
    }
  }, [selectedDoctor, selectedDate, step])

  const filteredDoctors = Array.isArray(doctors) ? doctors.filter(d =>
    d.name?.toLowerCase().includes(doctorSearch.toLowerCase()) ||
    d.doctorProfile?.specialty?.toLowerCase().includes(doctorSearch.toLowerCase()) ||
    d.doctorProfile?.department?.toLowerCase().includes(doctorSearch.toLowerCase())
  ) : []

  const filteredPatients = Array.isArray(patients) ? patients.filter(p =>
    p.name?.toLowerCase().includes(patientSearch.toLowerCase()) ||
    p.patientId?.toLowerCase().includes(patientSearch.toLowerCase())
  ) : []

  const handleSubmit = () => {
    if (!selectedDoctor || !selectedDate || !selectedTime || (role !== 'PATIENT' && !selectedPatient)) return
    onSubmit({
      doctorId: selectedDoctor.id,
      patientId: role === 'PATIENT' ? 'self' : selectedPatient,
      appointmentDate: selectedDate,
      appointmentTime: selectedTime,
      notes,
    })
  }

  // Min date = today
  const today = new Date().toISOString().split('T')[0]

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => !isSubmitting && onClose()} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <motion.div initial={{ opacity: 0, scale: 0.92, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative w-full max-w-2xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-border flex items-center justify-between shrink-0">
              <div>
                <h2 className="text-xl font-black text-card-foreground tracking-tight">{t('Book Appointment')}</h2>
                <div className="flex items-center gap-2 mt-1">
                  {[1,2,3].map(s => (
                    <div key={s} className="flex items-center gap-1">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black transition-all ${step >= s ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>{s}</div>
                      {s < 3 && <div className={`w-8 h-0.5 rounded-full transition-all ${step > s ? 'bg-primary' : 'bg-muted'}`} />}
                    </div>
                  ))}
                  <span className="text-xs font-bold text-muted-foreground ml-2">
                    {step === 1 ? t('Select Doctor') : step === 2 ? t('Date & Time') : t('Patient & Confirm')}
                  </span>
                </div>
              </div>
              <button onClick={onClose} className="p-2 rounded-xl bg-muted hover:bg-border transition-all"><X size={20} /></button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto flex-1 p-6">
              <AnimatePresence mode="wait">

                {/* STEP 1: Doctor Selection */}
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                    <input type="text" placeholder={t('Search doctor by name or specialty...')} value={doctorSearch}
                      onChange={e => setDoctorSearch(e.target.value)}
                      className="w-full h-12 px-4 rounded-xl bg-muted border border-border outline-none font-medium text-sm" />

                    {filteredDoctors.length === 0 ? (
                      <div className="text-center py-10 text-muted-foreground font-medium">
                        <Stethoscope size={40} className="mx-auto mb-3 opacity-30" />
                        {t('No doctors found')}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {filteredDoctors.map(doc => {
                          const profile = doc.doctorProfile
                          const isActive = profile?.isActive !== false
                          return (
                            <button key={doc.id} onClick={() => { if (isActive) setSelectedDoctor(doc) }}
                              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                                selectedDoctor?.id === doc.id
                                  ? 'border-primary bg-primary/5'
                                  : isActive ? 'border-border hover:border-primary/40 hover:bg-muted/50' : 'border-border/50 opacity-50 cursor-not-allowed'
                              }`}
                            >
                              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center overflow-hidden shrink-0">
                                {doc.profilePic
                                  ? <img src={doc.profilePic} className="w-full h-full object-cover" alt={doc.name || ''} />
                                  : <span className="text-lg font-black text-primary">{(doc.name || 'D')[0]}</span>}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-black text-card-foreground">{doc.name}</p>
                                <p className="text-xs font-bold text-muted-foreground">{profile?.specialty || 'General'} · {profile?.department || '—'}</p>
                                <div className="flex items-center gap-3 mt-1">
                                  <span className="text-xs font-black text-primary">৳{profile?.fee || 500}</span>
                                  {profile?.availableDays?.length ? (
                                    <span className="text-xs text-muted-foreground">
                                      {profile.availableDays.map(d => DAY_LABELS[d] || d).join(', ')}
                                    </span>
                                  ) : null}
                                  {!isActive && <span className="text-[10px] font-black text-red-500 bg-red-50 px-2 py-0.5 rounded-full">Inactive</span>}
                                </div>
                              </div>
                              {selectedDoctor?.id === doc.id && <CheckCircle2 size={20} className="text-primary shrink-0" />}
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* STEP 2: Date & Time Slot */}
                {step === 2 && selectedDoctor && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    {/* Doctor Summary */}
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/40 border border-border">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <span className="font-black text-primary">{(selectedDoctor.name || 'D')[0]}</span>
                      </div>
                      <div>
                        <p className="font-black text-card-foreground text-sm">{selectedDoctor.name}</p>
                        <p className="text-xs text-muted-foreground">{selectedDoctor.doctorProfile?.specialty} · ৳{selectedDoctor.doctorProfile?.fee}</p>
                      </div>
                    </div>

                    {/* Available Days Info */}
                    {selectedDoctor.doctorProfile?.availableDays?.length ? (
                      <div>
                        <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">{t('Available Days')}</p>
                        <div className="flex flex-wrap gap-2">
                          {['MON','TUE','WED','THU','FRI','SAT','SUN'].map(d => (
                            <span key={d} className={`px-3 py-1 rounded-lg text-xs font-black ${
                              selectedDoctor.doctorProfile!.availableDays.includes(d) ? 'bg-primary text-white' : 'bg-muted text-muted-foreground/50'
                            }`}>{DAY_LABELS[d]}</span>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {/* Date Picker */}
                    <div>
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2 block">{t('Select Date')}</label>
                      <input type="date" min={today} value={selectedDate}
                        onChange={e => setSelectedDate(e.target.value)}
                        className="w-full h-12 px-4 rounded-xl bg-muted border border-border outline-none font-bold text-card-foreground" />
                    </div>

                    {/* Time Slots */}
                    <div>
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2 block">{t('Select Time Slot')}</label>
                      {loadingSlots ? (
                        <div className="flex items-center gap-2 py-6 justify-center text-muted-foreground">
                          <Loader2 size={18} className="animate-spin" /> <span className="text-sm font-bold">{t('Loading slots...')}</span>
                        </div>
                      ) : slots.notAvailable ? (
                        <div className="flex items-center gap-2 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-700">
                          <AlertCircle size={18} />
                          <span className="text-sm font-bold">{t('Doctor not available on')} {slots.dayName}. {t('Please choose another date.')}</span>
                        </div>
                      ) : slots.slots.length === 0 ? (
                        <div className="flex items-center gap-2 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600">
                          <AlertCircle size={18} />
                          <span className="text-sm font-bold">{t('No slots available for this date. All booked.')}</span>
                        </div>
                      ) : (
                        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                          {slots.slots.map(slot => (
                            <button key={slot} onClick={() => setSelectedTime(slot)}
                              className={`py-2.5 rounded-xl text-xs font-black transition-all border-2 ${
                                selectedTime === slot
                                  ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30'
                                  : 'border-border hover:border-primary/50 hover:bg-primary/5 text-card-foreground'
                              }`}
                            >{slot}</button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Patient + Confirm */}
                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    {/* Booking Summary */}
                    <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 space-y-2">
                      <p className="text-xs font-black uppercase tracking-widest text-primary">Booking Summary</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div><span className="text-muted-foreground">Doctor:</span> <span className="font-black ml-1">{selectedDoctor?.name}</span></div>
                        <div><span className="text-muted-foreground">Date:</span> <span className="font-black ml-1">{selectedDate}</span></div>
                        <div><span className="text-muted-foreground">Time:</span> <span className="font-black ml-1 text-primary">{selectedTime}</span></div>
                        <div><span className="text-muted-foreground">Fee:</span> <span className="font-black ml-1">৳{selectedDoctor?.doctorProfile?.fee}</span></div>
                      </div>
                    </div>

                    {/* Patient Select (Hide if PATIENT role) */}
                    {role !== 'PATIENT' && (
                      <div>
                        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2 block">{t('Select Patient')}</label>
                        <input type="text" placeholder={t('Search patient by name or ID...')} value={patientSearch}
                          onChange={e => setPatientSearch(e.target.value)}
                          className="w-full h-11 px-4 rounded-xl bg-muted border border-border outline-none font-medium text-sm mb-2" />
                        <div className="max-h-48 overflow-y-auto space-y-2">
                          {filteredPatients.slice(0, 10).map(p => (
                            <button key={p.id} onClick={() => setSelectedPatient(p.id)}
                              className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${
                                selectedPatient === p.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40'
                              }`}
                            >
                              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                                <User size={14} className="text-muted-foreground" />
                              </div>
                              <div>
                                <p className="font-black text-sm text-card-foreground">{p.name}</p>
                                <p className="text-xs text-muted-foreground">ID: {p.patientId}</p>
                              </div>
                              {selectedPatient === p.id && <CheckCircle2 size={16} className="text-primary ml-auto shrink-0" />}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Notes */}
                    <div>
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2 block">{t('Notes (Optional)')}</label>
                      <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2}
                        placeholder={t('Any special notes or symptoms...')}
                        className="w-full px-4 py-3 rounded-xl bg-muted border border-border outline-none font-medium text-sm resize-none" />
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border flex justify-between gap-4">
              {step > 1 ? (
                <Button variant="outline" onClick={() => setStep(step - 1)} className="h-14 px-8 rounded-xl font-black">{t('Back')}</Button>
              ) : <div></div>}
              {step < 3 ? (
                <Button onClick={() => setStep(step + 1)} disabled={step === 1 ? !selectedDoctor : (!selectedDate || !selectedTime)} className="h-14 px-8 rounded-xl font-black gap-2 disabled:bg-muted-foreground">
                  {t('Next Steps')} <ChevronRight size={18} />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isSubmitting || (role !== 'PATIENT' && !selectedPatient)} className="h-14 px-8 rounded-xl font-black gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-70">
                  {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle2 size={18} />}
                  {t('Confirm Booking')}
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
