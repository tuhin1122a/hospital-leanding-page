'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Activity, ArrowRight, Check, Star, Stethoscope } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-black text-[10px] uppercase tracking-[0.2em] border border-primary/20 shadow-sm"
            >
              <Stethoscope size={14} />
              <span>World-Class Healthcare Excellence</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl lg:text-8xl font-black text-foreground leading-[0.95] tracking-tighter text-balance"
            >
              Excellence in <br />
              <span className="text-primary italic">Medical Care</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground leading-relaxed max-w-lg font-medium"
            >
              Transforming lives through cutting-edge medical technology and a human-centric approach. Trusted by millions for over 25 years.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {[
                { title: "500+ Experts", desc: "Top clinical specialists" },
                { title: "Ultra-Modern", desc: "Robotic & AI Diagnostics" },
                { title: "24/7 Response", desc: "Emergency & Critical Unit" },
                { title: "Personalized", desc: "Patient-first Care Plans" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all group">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-black text-foreground text-sm uppercase tracking-tight">{item.title}</h3>
                    <p className="text-xs text-muted-foreground font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Button size="lg" className="h-16 px-10 rounded-2xl bg-primary hover:bg-primary/95 text-white font-black text-lg shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all group">
                Book Appointment
                <ArrowRight size={22} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="h-16 px-10 rounded-2xl border-2 border-primary/20 text-primary font-black text-lg hover:bg-primary/5 transition-all">
                Emergency: 1066
              </Button>
            </motion.div>
          </div>

          {/* Right Image/Visuals */}
          <div className="relative lg:pl-10">
            {/* Visual background details */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle,var(--color-primary)_0%,transparent_70%)] opacity-[0.07] -z-0"></div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10 aspect-[4/5] lg:aspect-square overflow-hidden rounded-[4rem] shadow-2xl border-[12px] border-white/50 dark:border-zinc-900/50 backdrop-blur-md"
            >
              <Image
                src="/hero-hospital.jpg"
                alt="Modern hospital facility"
                fill
                className="object-cover hover:scale-105 transition-transform duration-1000"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </motion.div>

            {/* Floating Badges */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-6 z-20 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/20 flex items-center gap-4"
            >
              <div className="w-14 h-14 bg-yellow-500 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/20">
                <Star className="w-7 h-7 text-white fill-white" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Patient Choice</p>
                <p className="text-xl font-black">Top 1% Rated</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-6 z-20 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/20 flex items-center gap-4"
            >
              <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                <Activity className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Global Standards</p>
                <p className="text-xl font-black">JCI Accredited</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
