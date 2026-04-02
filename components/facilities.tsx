import React from 'react'
import { Cpu, Zap, Activity, Microscope, Layers, Settings } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function MedicalFacilities() {
  const facilities = [
    {
      id: 'mri-imaging',
      name: 'Advanced MRI Imaging',
      tech: 'High-Field Precision',
      desc: 'Our new MRI suite provides ultra-clear diagnostic imaging for neuro and orthopedic needs.',
      image: '/mri-machine.png',
      icon: <Layers className="w-6 h-6 text-[#1a4bde]" />
    },
    {
      id: 'icu-monitoring',
      name: 'ICU Critical Monitoring',
      tech: 'Life-Support Technology',
      desc: 'State-of-the-art bedside multi-parameter monitors for 24/7 critical patient oversight.',
      image: '/icu-monitor.png',
      icon: <Activity className="w-6 h-6 text-[#f36424]" />
    },
    {
      id: 'operation-suite',
      name: 'Sterile Operation Suite',
      tech: 'Micro-Surgical Tech',
      desc: 'Modern surgical lighting and anesthesia systems for safe and complex procedures.',
      image: '/hero-doctor.png',
      icon: <Settings className="w-6 h-6 text-[#1a4bde]" />
    },
    {
      id: 'lab-diagnosis',
      name: 'Digital Lab Diagnosis',
      tech: 'Fully Automated',
      desc: 'Top-tier biochemical analyzers for instant and accurate pathology reports.',
      image: '/dashboard/dashboard-preview.png',
      icon: <Microscope className="w-6 h-6 text-[#f36424]" />
    }
  ]

  return (
    <section className="py-24 bg-[#f8faff] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-black text-[#0a1b4d] tracking-tight">
            Our Premium <span className="text-[#1a4bde]">Medical Technology</span>
          </h2>
          <p className="text-[#64748b] font-medium max-w-2xl mx-auto">
            Nurjahan Hospital-2 invest in the worlds most advanced medical machines to provide you with accurate diagnosis and premium healthcare.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {facilities.map((f, i) => (
            <Link key={i} href={`/facilities/${f.id}`} className="bg-white rounded-[40px] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.06)] overflow-hidden border border-white hover:shadow-2xl transition-all duration-700 group flex flex-col md:flex-row block">
              <div className="md:w-1/2 h-[300px] relative overflow-hidden">
                <Image src={f.image} alt={f.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1b4d]/40 to-transparent" />
              </div>
              <div className="md:w-1/2 p-8 flex flex-col justify-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-2 group-hover:bg-[#1a4bde]/10 transition-colors">
                  {f.icon}
                </div>
                <div>
                   <h4 className="text-[10px] font-black text-[#1a4bde] uppercase tracking-[0.2em] mb-1">{f.tech}</h4>
                   <h3 className="text-2xl font-black text-[#0a1b4d] tracking-tight leading-none">{f.name}</h3>
                </div>
                <p className="text-sm text-[#64748b] leading-relaxed font-medium">
                  {f.desc}
                </p>
                <div className="text-[13px] font-black text-[#1a4bde] uppercase tracking-[0.1em] border-b-2 border-[#1a4bde]/20 group-hover:border-[#1a4bde] transition-all w-fit cursor-pointer translate-y-2">
                  Learn about Tech
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

