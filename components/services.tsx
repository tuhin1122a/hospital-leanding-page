'use client'

import { motion } from 'framer-motion'
import { Activity, ChevronRight, HeartPulse, Microscope, Radio, Scan, Waves } from 'lucide-react'
import Image from 'next/image'
import { InteractiveSectionBg, ServicesSvgBg } from './svg-patterns'
import { Button } from './ui/button'

const diagnosticServices = [
  {
    title: 'Digital X-Ray',
    description: 'High-resolution imaging with minimal radiation exposure for precise bone and tissue analysis.',
    image: '/x_ray_machine_1771847517546.png',
    icon: Radio,
    color: 'bg-blue-500'
  },
  {
    title: 'Advanced MRI',
    description: 'State-of-the-art magnetic resonance imaging for detailed structural and functional diagnostics.',
    image: '/mri_scanner_1771847551526.png',
    icon: Scan,
    color: 'bg-purple-500'
  },
  {
    title: 'HD Ultrasound',
    description: 'Real-time 4D imaging technology for comprehensive internal examinations and prenatal care.',
    image: '/ultrasound_machine_1771847580933.png',
    icon: Waves,
    color: 'bg-cyan-500'
  },
  {
    title: 'CT Scan',
    description: 'Multi-slice computed tomography for rapid and accurate diagnosis of complex conditions.',
    image: '/ct_scan_machine_1771847703067.png',
    icon: Activity,
    color: 'bg-indigo-500'
  }
]

export default function Services() {
  return (
    <section id="services" className="relative py-32 bg-white dark:bg-zinc-950 overflow-hidden">
      <InteractiveSectionBg />
      <ServicesSvgBg />
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4"
            >
              <Microscope size={14} />
              <span>Diagnostic Excellence</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-6xl font-black text-foreground tracking-tight leading-[1.1]"
            >
              World-Class <br />
              <span className="text-primary italic">Diagnostic Facilities</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-md leading-relaxed font-medium"
          >
            We utilize the latest medical advancements and high-precision machinery to ensure accurate diagnosis and the best possible patient outcomes.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {diagnosticServices.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative h-[450px] rounded-[2.5rem] overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-border/50 shadow-sm hover:shadow-2xl transition-all duration-700"
              >
                {/* Image Background */}
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                  <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                    <div className={`w-14 h-14 ${service.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-black/20 text-white`}>
                      <Icon size={28} />
                    </div>
                    <h3 className="text-3xl font-black text-white mb-3 tracking-tight">{service.title}</h3>
                    <p className="text-zinc-300 text-lg mb-6 max-w-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" className="p-0 text-white hover:text-white hover:bg-transparent font-bold flex items-center gap-2 group/btn">
                        View Details 
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-black transition-all">
                          <ChevronRight size={16} />
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Decorative border on hover */}
                <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 transition-colors duration-500 rounded-[2.5rem] pointer-events-none" />
              </motion.div>
            )
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 p-1 rounded-[3rem] bg-gradient-to-r from-primary/20 via-primary/5 to-primary/20"
        >
          <div className="bg-white dark:bg-zinc-950 rounded-[2.9rem] p-10 lg:p-16 flex flex-col lg:flex-row items-center gap-10">
            <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center flex-shrink-0 animate-pulse">
              <HeartPulse size={40} className="text-primary" />
            </div>
            <div className="flex-grow text-center lg:text-left">
              <h3 className="text-2xl lg:text-3xl font-black text-foreground mb-2 italic tracking-tight">Need a full health checkup?</h3>
              <p className="text-muted-foreground text-lg">Our diagnostic center is open 24/7 for emergency and scheduled screenings.</p>
            </div>
            <Button size="lg" className="h-16 px-10 rounded-2xl bg-primary text-white font-black text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
              Book a Diagnostic Test
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
