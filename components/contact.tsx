'use client'

import Image from 'next/image'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useNotificationSound } from '@/hooks/useSound'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Loader2, Calendar as CalendarIcon, Clock, User, Stethoscope, Hash, ChevronRight, ChevronLeft, CreditCard, ClipboardList, Download } from 'lucide-react'
import html2canvas from 'html2canvas'

const API_URL = process.env.NEXT_PUBLIC_API_URL

const DAY_LABELS: Record<string, string> = {
  MON: 'সোম', TUE: 'মঙ্গল', WED: 'বুধ', THU: 'বৃহঃ', FRI: 'শুক্র', SAT: 'শনি', SUN: 'রবি'
}

export default function ScheduleSection() {
  const { playNotification } = useNotificationSound()
  const ticketRef = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(1) // 1: Doctor Select, 2: Info & Time, 3: Success
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedData, setSubmittedData] = useState<any>(null)
  const [doctors, setDoctors] = useState<any[]>([])
  const [slots, setSlots] = useState<string[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
    doctorId: '',
    date: new Date().toISOString().split('T')[0],
    time: '',
    notes: ''
  })

  // Fetch doctors on mount
  useEffect(() => {
    fetch(`${API_URL}/doctors`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        return res.json()
      })
      .then(data => {
        if (Array.isArray(data)) {
          setDoctors(data)
        } else {
          console.error("Expected array of doctors, got:", data)
          setDoctors([])
        }
      })
      .catch(err => {
        console.error("Error fetching doctors:", err)
        setDoctors([])
      })
  }, [])

  // Fetch slots when doctor or date changes
  useEffect(() => {
    if (formData.doctorId && formData.date && step === 2) {
      setLoadingSlots(true)
      fetch(`${API_URL}/doctors/${formData.doctorId}/slots?date=${formData.date}`)
        .then(res => res.json())
        .then(data => {
          setSlots(data.slots || [])
          setLoadingSlots(false)
        })
        .catch(err => {
          console.error("Error fetching slots:", err)
          setLoadingSlots(false)
        })
    }
  }, [formData.doctorId, formData.date, step])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.phone || !formData.doctorId || !formData.time) {
      alert("দয়া করে সব তথ্য পূরণ করুন।")
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch(`${API_URL}/appointments/book-guest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          age: parseInt(formData.age) || 0,
          appointmentDate: formData.date,
          appointmentTime: formData.time,
        }),
      })

      if (!response.ok) throw new Error("Booking failed")

      const result = await response.json()
      setSubmittedData(result)
      playNotification()
      setStep(3)
    } catch (error) {
      console.error("Booking error:", error)
      alert("দুঃখিত, বুকিং করা সম্ভব হয়নি। আবার চেষ্টা করুন।")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDownload = async () => {
    if (ticketRef.current) {
      try {
        const canvas = await html2canvas(ticketRef.current, {
          scale: 3, // Higher resolution
          useCORS: true,
          backgroundColor: '#ffffff',
          logging: false,
        })
        const image = canvas.toDataURL("image/png")
        const link = document.createElement('a')
        link.href = image
        link.download = `Booking_Slip_${submittedData?.serialNo || 'hospital'}.png`
        link.click()
      } catch (err) {
        console.error("Download error:", err)
        alert("স্লিপটি ডাউনলোড করা সম্ভব হয়নি। স্ক্রিনশট নিয়ে রাখুন।")
      }
    }
  }

  const selectedDoctor = Array.isArray(doctors) ? doctors.find(d => d.id === formData.doctorId) : null

  return (
    <section id="contact" className="py-24 bg-white overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-black text-[#0a1b4d] tracking-tight leading-tight" style={{ fontFamily: "'Anek Bangla', sans-serif" }}>
             অনলাইন <span className="text-[#1a4bde]">ডাক্তার বুকিং</span>
          </h2>
          <p className="text-[#64748b] text-lg font-semibold lg:px-12">
             নিচের সহজ ধাপগুলো অনুসরণ করে আপনার পছন্দের ডাক্তার এবং সময় নির্বাচন করুন। কোনো রেজিস্ট্রেশন ছাড়াই বুকিং সম্পন্ন করুন।
          </p>
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-4 pt-6">
             {[1, 2].map(s => (
               <div key={s} className="flex items-center gap-2">
                 <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${step >= s ? 'bg-[#1a4bde] text-white shadow-lg shadow-blue-200' : 'bg-slate-100 text-slate-400'}`}>
                   {s}
                 </div>
                 <span className={`text-xs font-black uppercase tracking-widest ${step >= s ? 'text-[#0a1b4d]' : 'text-slate-300'}`}>
                    {s === 1 ? 'ডাক্তার নির্বাচন' : 'তথ্য ও সময়'}
                 </span>
                 {s === 1 && <div className={`w-12 h-0.5 rounded-full ${step > 1 ? 'bg-[#1a4bde]' : 'bg-slate-100'}`} />}
               </div>
             ))}
          </div>
        </div>

        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: DOCTOR SELECTION */}
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {doctors.length === 0 ? (
                  <div className="col-span-full py-20 flex flex-col items-center justify-center opacity-40">
                    <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
                    <p className="font-bold">ডাক্তারদের তথ্য লোড হচ্ছে...</p>
                  </div>
                ) : (
                  doctors.map((doc: any) => (
                    <div 
                      key={doc.id}
                      className={`group relative bg-white rounded-[32px] p-6 border-2 transition-all duration-500 overflow-hidden cursor-pointer ${
                        formData.doctorId === doc.id ? 'border-[#1a4bde] shadow-2xl shadow-blue-100 -translate-y-2' : 'border-slate-50 hover:border-blue-100 hover:shadow-xl'
                      }`}
                      onClick={() => setFormData(p => ({ ...p, doctorId: doc.id }))}
                    >
                      {/* Doctor Profile Info */}
                      <div className="flex items-start gap-5 mb-6">
                        <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 shrink-0 shadow-inner">
                          {doc.profilePic ? (
                            <Image src={doc.profilePic} alt={doc.name} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-3xl font-black text-slate-300">
                              {doc.name?.[0]}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 pt-1">
                          <h3 className="text-xl font-black text-[#0a1b4d] mb-1 group-hover:text-[#1a4bde] transition-colors">{doc.name}</h3>
                          <p className="text-xs font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full w-fit mb-3 uppercase tracking-wider">
                            {doc.doctorProfile?.specialty || 'General'}
                          </p>
                          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                             <CreditCard size={14} className="text-emerald-500" />
                             ফী: <span className="text-[#0a1b4d] font-black">৳{doc.doctorProfile?.fee || 500}</span>
                          </div>
                        </div>
                      </div>

                      {/* Availability Details */}
                      <div className="space-y-4 pt-4 border-t border-slate-50">
                        <div className="space-y-2">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                              <CalendarIcon size={12} /> কবে বসেন
                           </p>
                           <div className="flex flex-wrap gap-1.5">
                              {doc.doctorProfile?.availableDays?.map((day: string) => (
                                <span key={day} className="px-2 py-1 bg-slate-50 text-[10px] font-black text-[#0a1b4d] rounded-md border border-slate-100">
                                  {DAY_LABELS[day] || day}
                                </span>
                              )) || <span className="text-xs text-slate-400">Not Specified</span>}
                           </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                           <div className="space-y-1">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                 <Clock size={12} /> সময়সূচী
                              </p>
                              <p className="text-sm font-bold text-[#0a1b4d] ml-4">{doc.doctorProfile?.startTime || '09:00'} - {doc.doctorProfile?.endTime || '17:00'}</p>
                           </div>
                           <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${formData.doctorId === doc.id ? 'bg-[#1a4bde] text-white' : 'bg-slate-50 text-slate-300'}`}>
                              <CheckCircle size={18} />
                           </div>
                        </div>
                      </div>

                      {/* Select Overlay (Desktop) */}
                      {formData.doctorId === doc.id && (
                        <div className="absolute top-4 right-4 animate-in fade-in zoom-in duration-300">
                          <span className="bg-[#1a4bde] text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg shadow-blue-200">SELECTED</span>
                        </div>
                      )}
                    </div>
                  ))
                )}

                {/* Next Step Button (Sticky/Fixed style at bottom content area) */}
                <div className="col-span-full pt-12 flex justify-center">
                   <Button 
                    disabled={!formData.doctorId}
                    onClick={() => setStep(2)}
                    className="h-16 px-12 bg-[#0a1b4d] hover:bg-[#1a4bde] text-white rounded-2xl font-black text-lg gap-3 shadow-2xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                   >
                     পরবর্তী ধাপে যান <ChevronRight size={24} />
                   </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: USER DETAILS & TIME SLOT */}
            {step === 2 && selectedDoctor && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="max-w-4xl mx-auto"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-slate-50/50 p-8 lg:p-12 rounded-[48px] border-2 border-slate-50">
                   
                   {/* Left Col: Recap & Time */}
                   <div className="lg:col-span-5 space-y-8">
                      <div className="bg-white p-6 rounded-[32px] shadow-xl shadow-slate-200/50 border border-slate-50 space-y-4">
                         <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Selected Specialist</p>
                         <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center overflow-hidden shrink-0">
                               {selectedDoctor.profilePic ? (
                                 <Image src={selectedDoctor.profilePic} alt={selectedDoctor.name} fill className="object-cover" />
                               ) : <Stethoscope className="text-blue-500" />}
                            </div>
                            <div>
                               <h4 className="font-black text-[#0a1b4d]">{selectedDoctor.name}</h4>
                               <p className="text-xs font-bold text-slate-500">{selectedDoctor.doctorProfile?.specialty}</p>
                            </div>
                         </div>
                         <div className="pt-2 border-t border-slate-50 flex justify-between items-end">
                            <div className="text-xs font-bold text-slate-400">বুকিং করা হচ্ছে:</div>
                            <div className="text-lg font-black text-[#0a1b4d]">৳{selectedDoctor.doctorProfile?.fee}</div>
                         </div>
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-3">
                           <label className="text-sm font-black text-[#0a1b4d] flex items-center gap-2">
                              <CalendarIcon size={16} className="text-blue-600" /> অ্যাপয়েন্টমেন্ট তারিখ
                           </label>
                           <Input 
                            type="date"
                            min={new Date().toISOString().split('T')[0]}
                            className="h-14 bg-white border-2 border-slate-100 rounded-2xl pl-5 font-bold focus:border-blue-400 transition-all outline-none"
                            value={formData.date}
                            onChange={e => setFormData(p => ({ ...p, date: e.target.value }))}
                          />
                        </div>

                        <div className="space-y-3">
                           <label className="text-sm font-black text-[#0a1b4d] flex items-center gap-2">
                              <Clock size={16} className="text-blue-600" /> উপলব্ধ সময় (Slot)
                           </label>
                           <div className="grid grid-cols-3 gap-2">
                              {loadingSlots ? (
                                <div className="col-span-full py-4 flex items-center justify-center gap-2 text-slate-400">
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  <span className="text-xs font-black">স্লট চেক করা হচ্ছে...</span>
                                </div>
                              ) : slots.length === 0 ? (
                                <p className="col-span-full py-4 text-center text-xs font-bold text-red-500 bg-red-50 rounded-xl px-4 border border-red-100">
                                  দুঃখিত, এই তারিখে কোনো স্লট ফাঁকা নেই।
                                </p>
                              ) : (
                                slots.map(slot => (
                                  <button
                                    key={slot}
                                    type="button"
                                    onClick={() => setFormData(p => ({ ...p, time: slot }))}
                                    className={`py-3 rounded-xl text-xs font-black transition-all border-2 ${
                                      formData.time === slot
                                        ? 'bg-[#1a4bde] text-white border-[#1a4bde] shadow-lg shadow-blue-200'
                                        : 'bg-white border-slate-100 text-slate-600 hover:border-blue-300'
                                    }`}
                                  >
                                    {slot}
                                  </button>
                                ))
                              )}
                           </div>
                        </div>
                      </div>
                   </div>

                   {/* Right Col: Personal Info Form */}
                   <div className="lg:col-span-7">
                      <form onSubmit={handleSubmit} className="space-y-5">
                         <div className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                               <div className="space-y-2">
                                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">রুগীর নাম</label>
                                  <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                                    <Input 
                                      placeholder="বিকাশ আহমেদ" 
                                      className="h-14 bg-white border-2 border-slate-100 rounded-2xl pl-12 font-bold focus:border-blue-400 transition-all"
                                      value={formData.name}
                                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                                      required
                                    />
                                  </div>
                               </div>
                               <div className="space-y-2">
                                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">রুগীর বয়স</label>
                                  <div className="relative">
                                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                                    <Input 
                                      type="number"
                                      placeholder="২৭" 
                                      className="h-14 bg-white border-2 border-slate-100 rounded-2xl pl-12 font-bold focus:border-blue-400 transition-all"
                                      value={formData.age}
                                      onChange={e => setFormData(p => ({ ...p, age: e.target.value }))}
                                      required
                                    />
                                  </div>
                               </div>
                            </div>

                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">ফোন নম্বর (যোগাযোগের জন্য)</label>
                               <Input 
                                placeholder="017XXXXXXXX" 
                                className="h-14 bg-white border-2 border-slate-100 rounded-2xl pl-5 font-bold focus:border-blue-400 transition-all"
                                value={formData.phone}
                                onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                                required
                              />
                            </div>

                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">ছোট নোট (যদি থাকে)</label>
                               <div className="relative">
                                  <ClipboardList className="absolute left-4 top-4 text-slate-400 w-5 h-5 pointer-events-none" />
                                  <textarea 
                                    placeholder="আপনার সমস্যা বা লক্ষণ সম্পর্কে সংক্ষেপে লিখুন..." 
                                    className="w-full min-h-[120px] bg-white border-2 border-slate-100 rounded-2xl p-5 pl-12 font-bold focus:border-blue-400 transition-all outline-none resize-none text-[15px]"
                                    value={formData.notes}
                                    onChange={e => setFormData(p => ({ ...p, notes: e.target.value }))}
                                  />
                               </div>
                            </div>
                         </div>

                         <div className="flex gap-4 pt-4">
                            <Button 
                              type="button"
                              onClick={() => setStep(1)}
                              className="h-16 px-6 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-black"
                            >
                              <ChevronLeft size={24} />
                            </Button>
                            <Button 
                              type="submit"
                              disabled={isSubmitting || !formData.time}
                              className="flex-1 h-16 bg-[#1a4bde] hover:bg-[#0a1b4d] text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-100 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
                            >
                              {isSubmitting ? (
                                <>
                                  <Loader2 className="w-6 h-6 animate-spin" />
                                  কনফার্ম করা হচ্ছে...
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="w-6 h-6" />
                                  বুকিং কনফার্ম করুন
                                </>
                              )}
                            </Button>
                         </div>
                      </form>
                   </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: SUCCESS TICKET */}
            {step === 3 && submittedData && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-xl mx-auto"
              >
                 <div ref={ticketRef} className="bg-white rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.1)] border-t-[10px] border-[#1a4bde] overflow-hidden relative">
                    
                    {/* Ticket Header */}
                    <div className="bg-[#1a4bde]/[0.03] p-10 text-center space-y-4">
                       <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-emerald-100">
                          <CheckCircle className="text-white w-10 h-10" />
                       </div>
                       <h3 className="text-3xl font-black text-[#0a1b4d]">ধন্যবাদ! বুকিং সফল হয়েছে।</h3>
                       <p className="text-slate-500 font-bold">আপনার সিরিয়াল নম্বরটি নিচের বক্সে দেওয়া হলো</p>
                    </div>

                    {/* Ticket Details */}
                    <div className="p-10 space-y-8">
                       <div className="flex justify-center">
                          <div className="bg-[#0a1b4d] text-white px-10 py-6 rounded-3xl shadow-2xl relative">
                             <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 text-center mb-1">Serial Number</p>
                             <p className="text-6xl font-black text-center">#{submittedData.serialNo}</p>
                             {/* Decorative cutouts for ticket look */}
                             <div className="absolute top-1/2 -left-3 w-6 h-6 bg-white rounded-full -translate-y-1/2" />
                             <div className="absolute top-1/2 -right-3 w-6 h-6 bg-white rounded-full -translate-y-1/2" />
                          </div>
                       </div>

                       <div className="grid grid-cols-2 gap-8 border-y border-slate-100 py-8">
                          <div className="space-y-1">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><Stethoscope size={10} /> ডাক্তার</p>
                             <p className="font-black text-[#0a1b4d]">{selectedDoctor?.name}</p>
                          </div>
                          <div className="space-y-1 text-right">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-end gap-1.5"><CalendarIcon size={10} /> তারিখ</p>
                             <p className="font-black text-[#0a1b4d]">{formData.date}</p>
                          </div>
                          <div className="space-y-1">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><Clock size={10} /> সময় (Slot)</p>
                             <p className="font-black text-[#0a1b4d]">{formData.time}</p>
                          </div>
                          <div className="space-y-1 text-right">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-end gap-1.5"><User size={10} /> রুগীর নাম</p>
                             <p className="font-black text-[#0a1b4d] truncate">{formData.name}</p>
                          </div>
                       </div>

                       <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 flex gap-4">
                          <Hash className="text-amber-600 w-5 h-5 shrink-0" />
                          <p className="text-sm font-bold text-amber-800 leading-relaxed">
                            অনুগ্রহ করে আপনার নির্ধারিত সময়ের ১৫ মিনিট আগে হাসপাতালে উপস্থিত থাকুন। এই স্লিপটি কাউন্টারে দেখান। ফোনে একটি SMS পৌঁছে যাবে।
                          </p>
                       </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                           <Button 
                            onClick={handleDownload}
                            variant="outline"
                            className="flex-1 h-16 border-2 border-[#1a4bde] text-[#1a4bde] hover:bg-[#1a4bde] hover:text-white font-black rounded-2xl text-lg gap-2"
                           >
                             <Download size={20} /> ডাউনলোড করুন
                           </Button>
                           <Button 
                            onClick={() => { setStep(1); setSubmittedData(null); }}
                            className="flex-1 h-16 bg-[#0a1b4d] hover:bg-[#1a4bde] text-white font-black rounded-2xl text-lg shadow-xl"
                           >
                             আরেকটি বুকিং করুন
                           </Button>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-1/2 -left-4 w-8 h-8 bg-slate-50 rounded-full border border-slate-100" />
                    <div className="absolute top-1/2 -right-4 w-8 h-8 bg-slate-50 rounded-full border border-slate-100" />
                 </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
