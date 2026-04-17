'use client'

import React, { useState, useEffect } from 'react'
import Header from '@/components/header'
import { Award, CheckCircle2, Clock, GraduationCap, MapPin, Stethoscope } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function DoctorDetails() {
  const params = useParams()
  const [doctor, setDoctor] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDoctor = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors/${params.id}`)
            if (res.ok) {
                const data = await res.json()
                setDoctor(data)
            }
        } catch (error) {
            console.error("Failed to fetch doctor details", error)
        } finally {
            setIsLoading(false)
        }
    }
    fetchDoctor()
  }, [params.id])

  if (isLoading) {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
        </div>
    )
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white space-y-6">
        <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center">
            <Stethoscope size={40} className="text-red-500" />
        </div>
        <div className="text-center">
            <p className="text-3xl font-black text-[#0a1b4d] tracking-tighter">Doctor Profile Not Found</p>
            <p className="text-muted-foreground font-medium mt-2">The specialist you're looking for might have been relocated.</p>
        </div>
        <Link href="/" className="px-8 py-3 bg-[#0a1b4d] text-white rounded-xl font-bold hover:bg-[#1a4bde] transition-all">
            Back to Home
        </Link>
      </div>
    )
  }

  const profile = doctor.doctorProfile || {}

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Page Header */}
      <div className="pt-32 pb-20 bg-gradient-to-b from-[#f8faff] to-white relative overflow-hidden font-anek">
        <div className="absolute top-0 right-0 w-[40%] h-full bg-[#1a4bde]/[0.02] rounded-bl-[200px] -z-0" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <Link href="/doctors" className="inline-flex items-center text-sm font-bold text-[#1a4bde] mb-8 hover:translate-x-[-4px] transition-all gap-2">
             <span className="w-8 h-8 rounded-full bg-[#1a4bde]/5 flex items-center justify-center">←</span> Back to All Specialists
          </Link>
          
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-start">
             {/* Doctor Poster */}
             <div className="w-full lg:w-[380px] shrink-0">
                <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden shadow-[0_30px_80px_-15px_rgba(0,0,0,0.15)] bg-slate-100 border-4 border-white">
                   <img src={doctor.profilePic || '/placeholder.jpg'} alt={doctor.name} className="w-full h-full object-cover" />
                </div>
             </div>

             {/* Doctor Info */}
             <div className="flex-1 space-y-8">
                <div>
                   <span className="text-[11px] font-black tracking-[0.2em] text-[#1a4bde] uppercase bg-[#1a4bde]/10 px-4 py-2 rounded-full inline-block mb-4">{profile.specialty || 'Medical Specialist'}</span>
                   <h1 className="text-5xl lg:text-7xl font-black text-[#0a1b4d] tracking-tighter leading-tight mb-4">{doctor.name}</h1>
                   <p className="text-2xl font-bold text-[#64748b]">{profile.department || 'Consultant'}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-50 group hover:border-[#1a4bde]/20 transition-all">
                      <div className="w-14 h-14 rounded-2xl bg-[#1a4bde]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                         <GraduationCap className="w-7 h-7 text-[#1a4bde]" />
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-[#1a4bde] uppercase tracking-widest mb-1 opacity-70">Qualifications</p>
                         <p className="text-[15px] font-bold text-[#0a1b4d]">{profile.education || 'Advanced Degree'}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-50 group hover:border-orange-200 transition-all">
                      <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                         <Clock className="w-7 h-7 text-orange-600" />
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-1 opacity-70">Visiting Hours</p>
                         <p className="text-[15px] font-bold text-[#0a1b4d]">{profile.startTime} - {profile.endTime}</p>
                      </div>
                   </div>
                </div>

                <div className="space-y-4">
                   <h3 className="text-xl font-black text-[#0a1b4d] flex items-center gap-2">
                       <Stethoscope size={20} className="text-[#1a4bde]" /> Expertise & Specializations
                   </h3>
                   <div className="flex flex-wrap gap-2">
                      {(profile.expertise?.length > 0 ? profile.expertise : ['Clinical Consultation', 'Emergency Care', 'Patient Diagnosis']).map((exp: string, i: number) => (
                         <div key={i} className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 hover:bg-white hover:border-[#1a4bde]/20 transition-all">
                            <CheckCircle2 className="w-4 h-4 text-[#1a4bde]" />
                            <span className="text-sm font-bold text-[#0a1b4d]">{exp}</span>
                         </div>
                      ))}
                   </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-4">
                    <Link href={`/#booking`} className="inline-flex h-16 px-12 items-center justify-center bg-[#0a1b4d] hover:bg-[#1a4bde] text-white rounded-2xl font-black shadow-xl shadow-[#0a1b4d]/20 transition-all hover:scale-105 active:scale-95 text-lg">
                       Book Free Appointment
                    </Link>
                    <div className="h-16 px-8 rounded-2xl border-2 border-slate-100 flex items-center gap-3">
                        <span className="text-sm font-bold text-slate-400">Consultation Fee</span>
                        <span className="text-2xl font-black text-[#0a1b4d]">৳{profile.fee}</span>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-24 bg-white font-anek">
         <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-16">
               <div className="space-y-6">
                  <h2 className="text-4xl font-black text-[#0a1b4d] tracking-tighter">Professional Biography</h2>
                  <div className="w-20 h-1.5 bg-[#1a4bde] rounded-full" />
                  <p className="text-[18px] text-[#64748b] leading-relaxed font-bold">
                     {profile.bio || `Dr. ${doctor.name} is a dedicated healthcare professional at Nurjahan Hospital-2. With extensive experience in ${profile.specialty}, providing patient-centered care and utilizing modern diagnostic techniques.`}
                  </p>
               </div>

               {profile.awards?.length > 0 && (
                <div className="space-y-8">
                    <h2 className="text-4xl font-black text-[#0a1b4d] tracking-tighter">Awards & Accolades</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {profile.awards.map((award: string, i: number) => (
                            <div key={i} className="flex items-center gap-4 bg-slate-50 p-6 rounded-3xl border border-slate-100 hover:shadow-lg transition-all">
                                <div className="w-12 h-12 rounded-2xl bg-[#1a4bde]/10 flex items-center justify-center shrink-0">
                                    <Award className="w-7 h-7 text-[#1a4bde]" />
                                </div>
                                <p className="text-lg font-bold text-[#0a1b4d]">{award}</p>
                            </div>
                        ))}
                    </div>
                </div>
               )}
            </div>

            <div className="space-y-8">
               <div className="bg-[#0a1b4d] rounded-[48px] p-10 text-white space-y-8 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <h3 className="text-2xl font-black tracking-tight">Visiting Location</h3>
                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-[#1a4bde]" />
                     </div>
                     <p className="font-bold text-lg opacity-90 leading-tight">Nurjahan Hospital-2, Panti, Kumarkhali, Kushtia</p>
                  </div>
                  <hr className="opacity-10" />
                  <div className="space-y-4">
                     <p className="text-[10px] font-black opacity-50 uppercase tracking-[0.2em]">Medical Concierge</p>
                     <p className="text-4xl font-black tracking-tighter">01722-414025</p>
                  </div>
                  <Link href="/contact" className="block w-full bg-[#1a4bde] py-5 rounded-2xl text-center font-black text-lg hover:bg-white hover:text-[#0a1b4d] transition-all shadow-xl shadow-[#1a4bde]/20">
                     Get Directions
                  </Link>
               </div>
            </div>
         </div>
      </section>
    </main>
  )
}

