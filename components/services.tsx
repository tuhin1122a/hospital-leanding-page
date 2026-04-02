'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Activity, BarChart3, HeartPulse, Layers, Mic, Settings, ShieldCheck, Stethoscope, Target } from 'lucide-react'
import { Button } from './ui/button'

export default function Services() {
  const services = [
    {
      id: 'emergency-icu',
      title: 'Emergency ICU (24/7)',
      desc: 'Advanced Intensive Care Unit with multi-parameter monitoring and dedicated life-support systems.',
      bg: 'bg-[#F2F5FF]',
      image: '/icu-monitor.png',
      icon: <Activity className="text-primary w-5 h-5" />
    },
    {
      id: 'diagnostic-lab',
      title: 'Advanced Diagnostic Lab',
      desc: 'Experience precision with our high-tech automated machines for all clinical pathology tests.',
      bg: 'bg-[#F7F2FF]',
      image: '/specialist-doctors.png',
      icon: <ShieldCheck className="text-purple-500 w-5 h-5" />
    },
    {
      id: 'operation-theater',
      title: 'Modern Operation Theater',
      desc: 'Fully equipped sterile surgical suites featuring premium anesthesia and surgical medical technology.',
      bg: 'bg-[#F2F9FF]',
      image: '/medical-team-2.png',
      icon: <Mic className="text-blue-400 w-5 h-5" />
    },
    {
      id: 'digital-imaging',
      title: 'Digital X-Ray & Imaging',
      desc: 'High-resolution digital X-ray and 4D color ultrasonography for accurate disease detection.',
      bg: 'bg-[#F9F2FF]',
      image: '/mri-machine.png',
      icon: <Layers className="text-indigo-400 w-5 h-5" />
    },
    {
      id: 'pediatric-care',
      title: 'Pediatric & Neonatal Care',
      desc: 'Specialized intensive care for newborns and children using ultra-modern medical machines.',
      bg: 'bg-[#F2F2FF]',
      image: '/medical-team-1.png',
      icon: <HeartPulse className="text-blue-600 w-5 h-5" />
    },
    {
      id: 'recovery-rooms',
      title: 'Premium Recovery Rooms',
      desc: 'Comfortable, hygienic, and premium cabin facilities for a better patient recovery experience.',
      bg: 'bg-[#F2FBFF]',
      image: '/hero-doctor.png',
      icon: <Target className="text-cyan-500 w-5 h-5" />
    }
  ]

  return (
    <section id="services" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-16 gap-8">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#011632] tracking-tight">
              Services <span className="text-primary">We Provide</span>
            </h2>
            <Link href="/contact">
              <Button className="mt-8 bg-secondary hover:bg-secondary/90 text-white font-bold rounded-full px-8 py-5 transition-all shadow-lg shadow-secondary/20">
                Discover More
              </Button>
            </Link>
          </div>
          <p className="text-muted-foreground text-sm max-w-md leading-relaxed font-medium lg:text-right">
             Healthcare through cutting-edge medical technology and a human-centric approach. Trusted by millions for over 25 years pharmaceutical healthcare.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link
              key={index}
              href={`/services/${service.id}`}
              className={`${service.bg} rounded-[32px] overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-500 group border border-white/40 block`}
            >
              <div className="h-[220px] relative overflow-hidden">
                 <Image src={service.image} alt={service.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#011632]/40 to-transparent" />
                 <div className="absolute top-6 left-6 w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-all duration-500">
                   {service.icon}
                 </div>
              </div>

              <div className="p-10 flex flex-col justify-between flex-1 space-y-4">
                 <div className="space-y-3">
                   <h3 className="text-xl font-black text-[#011632] leading-tight">
                     {service.title}
                   </h3>
                   <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                     {service.desc}
                   </p>
                 </div>
                 <div className="text-sm font-black text-primary flex items-center gap-1 w-fit group-hover:translate-x-2 transition-transform">
                   Read more about Service
                 </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}


