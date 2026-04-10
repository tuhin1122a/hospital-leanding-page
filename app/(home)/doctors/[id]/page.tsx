'use client'

import Header from '@/components/header'
import { Award, CheckCircle2, Clock, GraduationCap, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const doctorData = [
  {
    id: 'shamim-ahmed',
    name: 'Dr. Shamim Ahmed',
    role: 'Senior Consultant & Proprietor',
    specialty: 'Internal Medicine Specialist',
    image: '/doctor-1.jpg',
    bio: 'Dr. Shamim Ahmed is the founder and senior consultant of Nurjahan Private Hospital. With over 25 years of experience in internal medicine, he has treated thousands of patients in the Kumarkhali region.',
    education: 'MBBS (Dhaka), FCPS (Internal Medicine), PGT (Cardiology)',
    expertise: ['Critical Care', 'Internal Medicine', 'Advanced Diagnosis', 'Hospital Management'],
    awards: ['Health Excellence Award 2024', 'Community Service Recognition'],
    availability: 'Sat - Thu: 4:00 PM - 9:00 PM'
  },
  {
    id: 'sarah-rahman',
    name: 'Dr. Sarah Rahman',
    role: 'Consultant Cardiologist',
    specialty: 'Cardiology Specialist',
    image: '/medical-team-1.png',
    bio: 'Dr. Sarah Rahman is a highly skilled cardiologist specializing in non-invasive cardiac diagnostics and heart disease prevention.',
    education: 'MBBS, MD (Cardiology)',
    expertise: ['Echocardiography', 'Heart Failure Management', 'Hypertension Control'],
    awards: ['Young Cardiologist of the Year 2023'],
    availability: 'Mon, Wed, Fri: 10:00 AM - 2:00 PM'
  },
  {
    id: 'faisal-karim',
    name: 'Dr. Faisal Karim',
    role: 'Consultant Orthopedic Surgeon',
    specialty: 'Orthopedic Surgery',
    image: '/medical-team-2.png',
    bio: 'Dr. Faisal Karim specializes in trauma surgery and joint replacement, helping patients regain their mobility with modern orthopedic techniques.',
    education: 'MBBS, MS (Orthopedics)',
    expertise: ['Joint Replacement', 'Trauma Surgery', 'Sports Injury'],
    awards: ['Best Surgical Performance 2024'],
    availability: 'Sun, Tue, Thu: 3:00 PM - 7:00 PM'
  }
]

export default function DoctorDetails() {
  const params = useParams()
  const doctor = doctorData.find(d => d.id === params.id)

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-bold">Doctor not found.</p>
        <Link href="/" className="ml-4 text-primary">Back to Home</Link>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Page Header */}
      <div className="pt-32 pb-20 bg-gradient-to-b from-[#f8faff] to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-full bg-[#1a4bde]/[0.02] rounded-bl-[200px] -z-0" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <Link href="/" className="inline-flex items-center text-sm font-bold text-[#1a4bde] mb-8 hover:translate-x-[-4px] transition-transform">
             ← Back to All Specialists
          </Link>
          
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-start">
             {/* Doctor Poster */}
             <div className="w-full lg:w-[400px] shrink-0">
                <div className="relative aspect-[3/4] rounded-[40px] overflow-hidden shadow-[0_30px_80px_-15px_rgba(0,0,0,0.15)] bg-slate-100">
                   <Image src={doctor.image} alt={doctor.name} fill className="object-cover" />
                </div>
             </div>

             {/* Doctor Info */}
             <div className="flex-1 space-y-8">
                <div>
                   <span className="text-[11px] font-black tracking-[0.2em] text-[#1a4bde] uppercase bg-[#1a4bde]/10 px-4 py-2 rounded-full inline-block mb-4">{doctor.specialty}</span>
                   <h1 className="text-5xl lg:text-7xl font-black text-[#0a1b4d] tracking-tighter leading-none mb-4">{doctor.name}</h1>
                   <p className="text-2xl font-bold text-[#64748b]">{doctor.role}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-50">
                      <div className="w-12 h-12 rounded-xl bg-[#1a4bde]/10 flex items-center justify-center">
                         <GraduationCap className="w-6 h-6 text-[#1a4bde]" />
                      </div>
                      <div>
                         <p className="text-[10px] font-bold text-[#1a4bde] uppercase tracking-wider">Qualifications</p>
                         <p className="text-sm font-bold text-[#0a1b4d]">{doctor.education}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-50">
                      <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                         <Clock className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                         <p className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">Availability</p>
                         <p className="text-sm font-bold text-[#0a1b4d]">{doctor.availability}</p>
                      </div>
                   </div>
                </div>

                <div className="space-y-4">
                   <h3 className="text-xl font-black text-[#0a1b4d]">Expertise & Specializations</h3>
                   <div className="flex flex-wrap gap-2">
                      {doctor.expertise.map((exp, i) => (
                         <div key={i} className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                            <CheckCircle2 className="w-4 h-4 text-[#1a4bde]" />
                            <span className="text-sm font-bold text-[#0a1b4d]">{exp}</span>
                         </div>
                      ))}
                   </div>
                </div>

                <Link href="/contact" className="inline-block bg-[#0a1b4d] hover:bg-[#1a4bde] text-white px-10 py-5 rounded-2xl font-black shadow-xl shadow-[#0a1b4d]/20 transition-all hover:scale-105 active:scale-95">
                   Request An Appointment
                </Link>
             </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-24 bg-white">
         <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-12">
               <div className="space-y-6">
                  <h2 className="text-3xl font-black text-[#0a1b4d]">Professional Biography</h2>
                  <p className="text-lg text-[#64748b] leading-relaxed font-medium">
                     {doctor.bio}
                  </p>
               </div>

               <div className="space-y-6">
                  <h2 className="text-3xl font-black text-[#0a1b4d]">Awards & Accolades</h2>
                  <div className="space-y-4">
                     {doctor.awards.map((award, i) => (
                        <div key={i} className="flex items-center gap-4 bg-slate-50 p-6 rounded-3xl border border-slate-100">
                           <Award className="w-8 h-8 text-[#1a4bde]" />
                           <p className="text-lg font-bold text-[#0a1b4d]">{award}</p>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            <div className="space-y-8">
               <div className="bg-[#0a1b4d] rounded-[40px] p-8 text-white space-y-6 shadow-2xl">
                  <h3 className="text-xl font-bold">Visiting Location</h3>
                  <div className="flex items-start gap-4">
                     <MapPin className="w-6 h-6 shrink-0 text-[#1a4bde]" />
                     <p className="font-medium opacity-90">Nurjahan Hospital-2, Panti, Kumarkhali, Kushtia</p>
                  </div>
                  <hr className="opacity-20" />
                  <div className="space-y-4">
                     <p className="text-sm font-bold opacity-70 uppercase tracking-widest">Hospital Emergency</p>
                     <p className="text-3xl font-black">999</p>
                  </div>
                  <Link href="/contact" className="block w-full bg-[#1a4bde] py-4 rounded-2xl text-center font-bold hover:bg-white hover:text-[#0a1b4d] transition-all">
                     Get Directions
                  </Link>
               </div>
            </div>
         </div>
      </section>
    </main>
  )
}
