'use client'

import { Activity, HeartPulse, Layers, Mic, ShieldCheck, Target } from 'lucide-react'
import Link from 'next/link'
import { ServiceCard } from './service-card'
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
            <h2 className="text-4xl lg:text-5xl font-black text-[#011632] tracking-tighter">
              Services <span className="text-primary italic">We Provide</span>
            </h2>
            <Link href="/contact">
              <Button className="mt-8 bg-secondary hover:bg-secondary/90 text-white font-bold rounded-xl px-10 py-6 transition-all shadow-[0_12px_25px_rgba(255,107,53,0.25)] border-0 h-fit hover:scale-105 active:scale-95 cursor-pointer">
                Discover All Medical Services
              </Button>
            </Link>
          </div>
          <p className="text-[#64748b] text-lg max-w-md leading-relaxed font-medium lg:text-right text-balance">
             Healthcare through cutting-edge medical technology and a human-centric approach trusted for over 25 years.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}


