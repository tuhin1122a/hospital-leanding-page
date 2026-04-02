export default function Services() {
  const services = [
    {
      title: 'Emergency ICU (24/7)',
      desc: 'Advanced Intensive Care Unit with multi-parameter monitoring and dedicated life-support systems.',
      bg: 'bg-[#F2F5FF]',
      icon: <Activity className="text-primary w-5 h-5" />
    },
    {
      title: 'Advanced Diagnostic Lab',
      desc: 'Experience precision with our high-tech automated machines for blood, urine, and biochemical tests.',
      bg: 'bg-[#F7F2FF]',
      icon: <ShieldCheck className="text-purple-500 w-5 h-5" />
    },
    {
      title: 'Modern Operation Theater',
      desc: 'Fully equipped sterile surgical suites featuring premium anesthesia and surgical medical technology.',
      bg: 'bg-[#F2F9FF]',
      icon: <Mic className="text-blue-400 w-5 h-5" />
    },
    {
      title: 'Digital X-Ray & Imaging',
      desc: 'High-resolution digital X-ray and 4D color ultrasonography for accurate disease detection.',
      bg: 'bg-[#F9F2FF]',
      icon: <Layers className="text-indigo-400 w-5 h-5" />
    },
    {
      title: 'Pediatric & Neonatal Care',
      desc: 'Specialized intensive care for newborns and children using ultra-modern medical machines.',
      bg: 'bg-[#F2F2FF]',
      icon: <HeartPulse className="text-blue-600 w-5 h-5" />
    },
    {
      title: 'Premium In-Patient Rooms',
      desc: 'Comfortable, hygienic, and premium cabin facilities for a better patient recovery experience.',
      bg: 'bg-[#F2FBFF]',
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
            <Button className="mt-8 bg-secondary hover:bg-secondary/90 text-white font-bold rounded-full px-8 py-5 transition-all shadow-lg shadow-secondary/20">
              Discover More
            </Button>
          </div>
          <p className="text-muted-foreground text-sm max-w-md leading-relaxed font-medium lg:text-right">
             Healthcare through cutting-edge medical technology and a human-centric approach. Trusted by millions for over 25 years pharmaceutical healthcare.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`${service.bg} p-10 rounded-2xl flex flex-col justify-between h-full hover:shadow-xl transition-all group`}
            >
              <div className="space-y-6">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-[#011632] leading-snug">
                  {service.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {service.desc}
                </p>
              </div>
              <Button variant="link" className="p-0 text-xs font-bold text-primary mt-8 flex items-center gap-1">
                More info
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { Activity, BarChart3, HeartPulse, Layers, Mic, Settings, ShieldCheck, Stethoscope, Target } from 'lucide-react'
import { Button } from './ui/button'

