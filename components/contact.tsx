'use client'

import Image from 'next/image'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useNotificationSound } from '@/hooks/useSound'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Loader2 } from 'lucide-react'

export default function ScheduleSection() {
  const { playNotification } = useNotificationSound()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', phone: '', email: '', message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1200))
    setIsSubmitting(false)
    setSubmitted(true)
    playNotification()
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section id="contact" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Doctor Image with Opening Time */}
          <div className="relative">
            <div className="relative z-10 w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image src="/masked-doctor.png" alt="Schedule doctor" fill className="object-cover" />
              
              {/* Opening Time Overlay */}
              <div className="absolute bottom-10 left-10 right-10 bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20">
                <h4 className="text-xl font-bold text-primary mb-4">Opening time</h4>
                <div className="space-y-2 text-sm font-semibold text-[#011632]">
                  <div className="flex justify-between border-b pb-2">
                    <span>Sunday</span>
                    <span>08:00 am - 10:00 pm</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span>Friday</span>
                    <span>08:00 am - 04:00 pm</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative background element */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl z-0"></div>
          </div>

          {/* Right: Contact Form */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-black text-[#0a1b4d] tracking-tight leading-tight">
                Schedule <span className="text-[#1a4bde]">A Call With Us</span> <br />
                Safe &amp; Advanced <span className="text-[#1a4bde]">Medical Care</span>
              </h2>
              <p className="text-[#64748b] text-[15.5px] leading-relaxed font-semibold">
                Nurjahan Hospital-2 is committed to providing reliable health support for the Panti community. Fill out the form and our specialist will connect with you soon.
              </p>
            </div>

            {/* Success Message */}
            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.97 }}
                  className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 px-5 py-4 rounded-2xl font-semibold text-sm shadow-sm"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                  <span>আপনার appointment সফলভাবে submit হয়েছে! আমরা শীঘ্রই যোগাযোগ করবো। 🎉</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input 
                  placeholder="First Name" 
                  className="h-14 bg-[#F9FAFB] border-none rounded-xl"
                  value={formData.firstName}
                  onChange={e => setFormData(p => ({ ...p, firstName: e.target.value }))}
                />
                <Input 
                  placeholder="Last Name" 
                  className="h-14 bg-[#F9FAFB] border-none rounded-xl"
                  value={formData.lastName}
                  onChange={e => setFormData(p => ({ ...p, lastName: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input 
                  placeholder="Phone Number" 
                  className="h-14 bg-[#F9FAFB] border-none rounded-xl"
                  value={formData.phone}
                  onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                />
                <Input 
                  placeholder="Email" 
                  className="h-14 bg-[#F9FAFB] border-none rounded-xl"
                  value={formData.email}
                  onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                />
              </div>
              <Input 
                placeholder="Messages" 
                className="h-24 bg-[#F9FAFB] border-none rounded-xl align-top pt-4"
                value={formData.message}
                onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
              />
              
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="bg-secondary hover:bg-secondary/90 text-white font-bold rounded-full px-12 py-7 transition-all shadow-lg shadow-secondary/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Book Appointment'
                )}
              </Button>
            </form>
          </div>
          
        </div>
      </div>
    </section>
  )
}
