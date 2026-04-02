'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { useParams } from 'next/navigation'
import { Cpu, ShieldCheck, Zap, Activity, Microscope, ArrowRight, Settings } from 'lucide-react'

const techData = [
  {
    id: 'mri-imaging',
    name: 'Advanced MRI Imaging',
    tech: 'High-Field Precision (1.5T/3.0T)',
    desc: 'Experience the pinnacle of diagnostic imaging with our state-of-the-art MRI suite.',
    longDesc: 'Our MRI imaging system at Nurjahan Hospital-2 provides ultra-high-resolution images of internal organs and tissues. It is essential for neurological, orthopedic, and cardiac diagnostics. Our facility ensures patient comfort with faster scan times and reduced noise levels.',
    image: '/mri-machine.png',
    specs: ['High-Field Magnet Technology', 'Fast Acquisition Sequences', 'Non-Invasive Diagnostics', 'AI-Enhanced Image Reconstruction'],
    impact: 'Enables early detection of complex diseases with 99.9% clarity.'
  },
  {
    id: 'icu-monitoring',
    name: 'ICU Critical Monitoring',
    tech: 'Multi-Parameter Life Support',
    desc: 'Round-the-clock intensive monitoring for critical patients with real-time data sync.',
    longDesc: 'Our ICU technology includes synchronized bedside monitors that track every vital sign—ECG, SpO2, NIBP, and Respiratory rates. This data is centrally monitored by our expert team to ensure immediate life-saving intervention if any parameter fluctuates.',
    image: '/icu-monitor.png',
    specs: ['Centralized Monitoring Hub', 'Real-time Vital Analytics', 'Automated Alarm Systems', 'Touchscreen Interface'],
    impact: 'Reduces emergency response time to less than 10 seconds.'
  },
  {
    id: 'operation-suite',
    name: 'Sterile Operation Suite',
    tech: 'Integrated Surgical Control',
    desc: 'Modern surgical suites featuring LED lighting and precision anesthesia management.',
    longDesc: 'The Nurjahan Hospital-2 OT complex is a sterile environment equipped with laminar airflow and shadowless LED surgical lights. Our anesthesia systems are digital, allowing for precise control and safety during complex major surgeries.',
    image: '/hero-doctor.png',
    specs: ['Shadowless LED Lighting', 'Digital Anesthesia Stations', 'HEPA Filtered Airflow', 'Advanced Sterilization Units'],
    impact: 'Ensures 100% sterile environment for major surgical procedures.'
  },
  {
    id: 'lab-diagnosis',
    name: 'Digital Lab Diagnosis',
    tech: 'Automated Biochemical Analyzers',
    desc: 'High-speed automated pathology lab for error-free clinical reports.',
    longDesc: 'Our laboratory features fully automated biochemistry and hematology analyzers. These machines can process hundreds of samples per hour with extreme precision, ensuring that the diagnosis is based on reliable, machine-verified data.',
    image: '/dashboard/dashboard-preview.png',
    specs: ['Fully Automated Sampling', 'Laser-Based Hematology', 'Biochecmial Tracking', 'Digital Report Delivery'],
    impact: 'Provides accurate diagnostic reports within record time.'
  }
]

export default function TechDetails() {
  const params = useParams()
  const tech = techData.find(t => t.id === params.id)

  if (!tech) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-bold">Technology not found.</p>
        <Link href="/" className="ml-4 text-primary">Back to Home</Link>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Visual Header */}
      <div className="pt-32 pb-20 bg-gradient-to-tr from-[#0a1b4d] to-[#1a4bde] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/svg-patterns/circuit.svg')] opacity-10" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
           <Link href="/#technology" className="inline-flex items-center text-sm font-bold text-white/70 mb-8 hover:text-white transition-colors">
              ← Explore All Technology
           </Link>
           
           <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="flex-1 space-y-8">
                 <div>
                    <span className="text-[11px] font-black tracking-[0.3em] text-[#ff6b35] uppercase bg-white/10 px-4 py-2 rounded-full inline-block mb-4">{tech.tech}</span>
                    <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none mb-6">{tech.name}</h1>
                    <p className="text-xl text-white/70 leading-relaxed font-medium">
                       {tech.desc}
                    </p>
                 </div>

                 <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-2 text-white font-bold">
                       <ShieldCheck className="w-6 h-6 text-[#ff6b35]" />
                       <span>Precision Certified</span>
                    </div>
                    <div className="flex items-center gap-2 text-white font-bold">
                       <Zap className="w-6 h-6 text-[#ff6b35]" />
                       <span>High Efficiency</span>
                    </div>
                 </div>
              </div>

              <div className="w-full lg:w-[500px]">
                 <div className="relative aspect-square rounded-[60px] overflow-hidden shadow-2xl border-[15px] border-white/10 backdrop-blur-3xl group">
                    <Image src={tech.image} alt={tech.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Main Analysis Section */}
      <section className="py-24 bg-white">
         <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-12">
               <div className="space-y-6">
                  <h2 className="text-4xl font-black text-[#0a1b4d] tracking-tight">Technical Evolution</h2>
                  <p className="text-lg text-[#64748b] leading-relaxed font-medium">
                     {tech.longDesc}
                  </p>
               </div>

               <div className="bg-[#f8faff] p-12 rounded-[50px] border border-slate-50 space-y-8">
                  <h3 className="text-2xl font-black text-[#0a1b4d]">Clinical Impact</h3>
                  <div className="p-6 bg-white rounded-3xl shadow-sm border border-slate-100">
                     <p className="text-[#1a4bde] font-black text-2xl tracking-tight leading-tight">{tech.impact}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {tech.specs.map((spec, i) => (
                        <div key={i} className="flex items-center gap-3">
                           <div className="w-2 h-2 rounded-full bg-[#ff6b35]" />
                           <span className="text-sm font-bold text-[#0a1b4d]">{spec}</span>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            <div className="space-y-10">
               <div className="bg-[#f36424] rounded-[50px] p-12 text-white space-y-8 shadow-2xl shadow-orange-600/20">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                     <Cpu className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-black tracking-tight leading-none">Experience Our Technology</h3>
                  <p className="text-white/80 font-medium leading-relaxed">
                     Nurjahan Hospital-2 is committed to bringing the world's most advanced medical machines to your doorstep in Kumarkhali.
                  </p>
                  <Link href="/contact" className="block w-full bg-white text-[#f36424] py-5 rounded-2xl text-center font-black hover:bg-[#0a1b4d] hover:text-white transition-all duration-300">
                     Schedule A Visitation
                  </Link>
               </div>
               
               <div className="p-1 place-items-center">
                  <p className="text-[11px] font-black text-[#64748b] uppercase tracking-[0.2em] mb-4">Official Diagnostic Partner</p>
                  <div className="flex gap-8 opacity-40 grayscale pointer-events-none">
                     <div className="w-24 h-8 bg-slate-400 rounded" />
                     <div className="w-24 h-8 bg-slate-400 rounded" />
                  </div>
               </div>
            </div>
         </div>
      </section>

      <Footer />
    </main>
  )
}
