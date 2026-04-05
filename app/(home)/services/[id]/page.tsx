'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { CheckCircle2, Star, Clock, Phone, ArrowRight, ShieldCheck } from 'lucide-react'

const servicesData = [
  {
    id: 'emergency-icu',
    title: 'Emergency ICU (24/7)',
    desc: 'Our Intensive Care Unit (ICU) provides specialized monitoring and treatment for patients with life-threatening conditions.',
    longDesc: 'Nurjahan Hospital-2 ICU is designed to provide the highest level of care. We use multi-parameter monitoring systems that track heart rate, blood pressure, oxygen saturation, and more in real-time. Our medical staff is specifically trained in critical care medicine and advanced life support.',
    image: '/icu-monitor.png',
    features: ['24/7 Vital Monitoring', 'Advanced Ventilator Support', 'Expert Critical Care Nursing', 'Isolation Rooms Available'],
    benefit: 'Immediate life-saving intervention with high-tech automated care.'
  },
  {
    id: 'diagnostic-lab',
    title: 'Advanced Diagnostic Lab',
    desc: 'Premium quality laboratory services featuring fully automated biochemistry and pathology systems.',
    longDesc: 'Our diagnostic lab is equipped with the latest biochemical and clinical analyzers. This automation reduces human error and provides results in record time. From Routine blood tests to complex pathology, we handle everything with extreme precision.',
    image: '/specialist-doctors.png',
    features: ['Fully Automated Analyzers', 'Real-time Result Tracking', 'High-quality Reagents', 'Certified Lab Technologists'],
    benefit: '100% Accurate reports for precise clinical diagnosis.'
  },
  {
    id: 'operation-theater',
    title: 'Modern Operation Theater',
    desc: 'High-tech surgical suites designed for standard and complex operative procedures.',
    longDesc: 'The OT suites at Nurjahan Hospital-2 are equipped with LED surgical lights, high-precision anesthesia machines, and advanced sterilization units. We maintain a zero-infection policy with modern air-filtration and sterile management.',
    image: '/medical-team-2.png',
    features: ['Laminar Air-flow System', 'High-precision Anesthesia', 'Micro-surgical Units', 'Recovery Lounge'],
    benefit: 'Safe and successful surgical outcomes with premium medical support.'
  },
  {
    id: 'digital-imaging',
    title: 'Digital X-Ray & Imaging',
    desc: 'World-class imaging services including Digital X-Ray and 4D Color Ultrasonography.',
    longDesc: 'We use high-frequency digital X-ray machines that provide clear, detailed images at lower radiation levels. Our 4D USG systems are used for detailed fetal imaging and deep-tissue analysis with extreme clarity.',
    image: '/mri-machine.png',
    features: ['Low Radiation Digital X-Ray', '4D Color Ultrasonography', 'Expert Radiologists', 'Teleradiology Support'],
    benefit: 'High-resolution imaging for early and accurate disease detection.'
  },
  {
    id: 'pediatric-care',
    title: 'Pediatric & Neonatal Care',
    desc: 'Specialized healthcare for infants and children with dedicated pediatric specialists.',
    longDesc: 'Our Pediatric department is child-friendly and equipped with neonatal incubators and phototherapy units. We provide comprehensive care from birth through childhood, including immunizations and emergency pediatric support.',
    image: '/medical-team-1.png',
    features: ['Neonatal Incubator Support', 'Pediatric Emergency Care', 'Vaccination Program', 'Dedicated Kids Ward'],
    benefit: 'Gentle and specialized medical care for your precious ones.'
  },
  {
    id: 'recovery-rooms',
    title: 'Premium Recovery Rooms',
    desc: 'Experience patient-centric healing in our premium cabin and recovery facilities.',
    longDesc: 'Our recovery rooms are designed for comfort and privacy. Each premium cabin features high-adjustable beds, oxygen supply, and dedicated nursing call systems. A hygienic and peaceful environment accelerate the healing process.',
    image: '/hero-doctor.png',
    features: ['Luxury Cabin Facilities', 'Family Waiting Areas', 'Central Oxygen Supply', '24/7 Nursing Call'],
    benefit: 'A peaceful, home-like environment for faster patient recovery.'
  }
]

export default function ServiceDetails() {
  const params = useParams()
  const service = servicesData.find(s => s.id === params.id)

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-bold">Service not found.</p>
        <Link href="/" className="ml-4 text-primary underline">Back to Home</Link>
      </div>
    )
  }

  return (
    <div className="bg-white">
      
      {/* Hero Header Section */}
      <div className="pt-32 pb-20 bg-[#f8faff] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-full bg-[#1a4bde]/[0.03] rounded-bl-[200px] -z-0" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
           <Link href="/#services" className="inline-flex items-center text-sm font-bold text-[#1a4bde] mb-8 hover:translate-x-[-4px] transition-transform">
              ← Back to All Services
           </Link>
           
           <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="flex-1 space-y-8">
                 <div>
                    <h1 className="text-5xl lg:text-7xl font-black text-[#0a1b4d] tracking-tighter leading-[1.05] mb-6">
                       {service.title}
                    </h1>
                    <p className="text-xl text-[#64748b] leading-relaxed font-medium">
                       {service.desc}
                    </p>
                 </div>

                 <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-[#1a4bde] font-bold">
                       <ShieldCheck className="w-6 h-6" />
                       <span>Certified Service</span>
                    </div>
                    <div className="flex items-center gap-2 text-orange-600 font-bold">
                       <Clock className="w-6 h-6" />
                       <span>24/7 Available</span>
                    </div>
                 </div>

                 <Link href="/contact">
                   <button className="bg-[#1a4bde] text-white px-10 py-5 rounded-2xl font-black shadow-xl shadow-[#1a4bde]/25 hover:scale-105 active:scale-95 transition-all mt-4 flex items-center gap-3">
                      Book This Service <ArrowRight className="w-5 h-5" />
                   </button>
                 </Link>
              </div>

              <div className="w-full lg:w-[500px]">
                 <div className="relative aspect-video lg:aspect-square rounded-[50px] overflow-hidden shadow-2xl border-[12px] border-white group">
                    <Image src={service.image} alt={service.title} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Content Section */}
      <section className="py-24 bg-white">
         <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-12">
               <div className="space-y-6">
                  <h2 className="text-4xl font-black text-[#0a1b4d] tracking-tight">Professional Overview</h2>
                  <p className="text-lg text-[#64748b] leading-relaxed font-medium">
                     {service.longDesc}
                  </p>
               </div>

               <div className="bg-[#f8faff] p-10 rounded-[40px] space-y-6 border border-slate-50">
                  <h3 className="text-2xl font-black text-[#0a1b4d]">Why Choose This Service?</h3>
                  <p className="text-[#1a4bde] font-bold text-xl">{service.benefit}</p>
                  <ul className="space-y-4">
                     {service.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-3 text-[#0a1b4d] font-bold">
                           <div className="w-6 h-6 rounded-full bg-[#1a4bde] flex items-center justify-center shrink-0">
                              <CheckCircle2 className="w-4 h-4 text-white" />
                           </div>
                           {feat}
                        </li>
                     ))}
                  </ul>
               </div>
            </div>

            <div className="space-y-10">
               <div className="bg-[#0a1b4d] rounded-[50px] p-12 text-white space-y-8 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
                  <h3 className="text-3xl font-black tracking-tight">Inquiry & Consultation</h3>
                  <p className="text-white/70 font-medium leading-relaxed">
                     Need more details about our {service.title.toLowerCase()} facilities? Our specialist team is ready to answer all your queries.
                  </p>
                  
                  <div className="space-y-6">
                     <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                           <Phone className="w-7 h-7 text-[#1a4bde]" />
                        </div>
                        <div>
                           <p className="text-xs uppercase font-black tracking-widest opacity-60">Call Us 24/7</p>
                           <p className="text-2xl font-black">999</p>
                        </div>
                     </div>
                     <Link href="/contact" className="block w-full bg-[#1a4bde] py-5 rounded-2xl text-center font-black hover:bg-white hover:text-[#0a1b4d] transition-all duration-300">
                        Schedule Visitation
                     </Link>
                  </div>
               </div>

               {/* Quick Stats/Badge */}
               <div className="bg-slate-50 p-8 rounded-[40px] border border-slate-100 flex items-center gap-6">
                   <div className="flex -space-x-3">
                      {[1,2,3,4].map(i => (
                         <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 overflow-hidden relative">
                            <Image src={`/medical-team-${i % 2 + 1}.png`} alt="Team" fill className="object-cover" />
                         </div>
                      ))}
                   </div>
                   <div>
                      <p className="text-[13px] font-black text-[#0a1b4d]">Trusted by 500+ Patients</p>
                      <div className="flex items-center gap-1">
                         {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                         <span className="text-[11px] font-bold text-[#64748b] ml-1">Excellent Care</span>
                      </div>
                   </div>
               </div>
            </div>
         </div>
      </section>

    </div>
  )
}
