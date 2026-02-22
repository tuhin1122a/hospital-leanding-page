'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'
import { Award, Calendar, ChevronLeft, ChevronRight, GraduationCap, Star } from 'lucide-react'
import Image from 'next/image'
import { useCallback } from 'react'
import { Button } from './ui/button'

const doctors = [
  {
    id: 1,
    name: 'Dr. Rajesh Sharma',
    specialty: 'Cardiology',
    experience: '18+ years',
    rating: 4.9,
    reviews: 342,
    bio: 'MD, DM Cardiology | Expert in interventional cardiology & advanced heart procedures',
    image: '/doctor-1.jpg',
    qualifications: ['AIIMS Delhi', 'Fellow ACC', 'Published Researcher']
  },
  {
    id: 2,
    name: 'Dr. Priya Kapoor',
    specialty: 'Neurology',
    experience: '16+ years',
    rating: 4.9,
    reviews: 298,
    bio: 'MD, DM Neurology | Specialist in stroke care and advanced neurological treatments',
    image: '/doctor-2.jpg',
    qualifications: ['CMC Vellore', 'Fellow Neurology', 'Board Certified']
  },
  {
    id: 3,
    name: 'Dr. Arjun Patel',
    specialty: 'Orthopedics',
    experience: '20+ years',
    rating: 4.8,
    reviews: 267,
    bio: 'MS Orthopedics | Leader in joint replacement & sports medicine procedures',
    image: '/doctor-3.jpg',
    qualifications: ['Delhi University', 'Arthroplasty Expert', 'Olympic Committee']
  },
  {
    id: 4,
    name: 'Dr. Anjali Mehta',
    specialty: 'Oncology',
    experience: '17+ years',
    rating: 4.9,
    reviews: 315,
    bio: 'MD, DM Oncology | Comprehensive cancer care with personalized treatment plans',
    image: '/doctor-4.jpg',
    qualifications: ['TATA Memorial', 'Cancer Specialist', 'Research Fellow']
  },
  {
    id: 5,
    name: 'Dr. Vikram Singh',
    specialty: 'Emergency Medicine',
    experience: '19+ years',
    rating: 4.8,
    reviews: 289,
    bio: 'MD Emergency Medicine | Trauma & critical care specialist with ICU expertise',
    image: '/doctor-5.jpg',
    qualifications: ['AIIMS Trauma Center', 'Emergency Expert', 'Disaster Management']
  },
  {
    id: 6,
    name: 'Dr. Sneha Gupta',
    specialty: 'General Medicine',
    experience: '15+ years',
    rating: 4.9,
    reviews: 324,
    bio: 'MD, Fellow Internal Medicine | Holistic healthcare and preventive medicine',
    image: '/doctor-6.jpg',
    qualifications: ['Delhi University', 'Internal Medicine', 'Wellness Expert']
  }
]

export default function Doctors() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', slidesToScroll: 1 },
    [Autoplay({ delay: 3500, playOnInit: true, stopOnInteraction: false, stopOnMouseEnter: true })]
  )

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <section id="doctors" className="py-24 bg-background overflow-hidden relative border-y border-border/40">
      {/* Specific section background detail */}
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="medicalCross" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 40 50 L 60 50 M 50 40 L 50 60" stroke="currentColor" strokeWidth="2" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#medicalCross)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl text-left">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-primary text-white font-black text-[10px] uppercase tracking-[0.2em] mb-4 shadow-xl shadow-primary/20"
            >
              <Award size={14} />
              <span>World-Class Faculty</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-black text-foreground mb-6 tracking-tighter"
            >
              Our Specialist <span className="text-primary italic">Doctors</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg leading-relaxed font-medium"
            >
              Distinguished medical professionals with decades of combined expertise, recognized globally for their excellence in patient care.
            </motion.p>
          </div>

          <div className="flex gap-4">
            <Button onClick={scrollPrev} variant="outline" size="icon" className="rounded-2xl w-14 h-14 border-primary/20 bg-background/50 backdrop-blur-sm hover:bg-primary hover:text-white transition-all shadow-xl">
              <ChevronLeft size={28} />
            </Button>
            <Button onClick={scrollNext} variant="outline" size="icon" className="rounded-2xl w-14 h-14 border-primary/20 bg-background/50 backdrop-blur-sm hover:bg-primary hover:text-white transition-all shadow-xl">
              <ChevronRight size={28} />
            </Button>
          </div>
        </div>

        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex gap-8">
            {doctors.map((doctor, index) => (
              <motion.div 
                key={doctor.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="embla__slide min-w-0 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_31%] py-4"
              >
                <Card className="h-full border-border/50 overflow-hidden hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] transition-all duration-700 group bg-white dark:bg-zinc-900/50 backdrop-blur-xl relative rounded-[3rem]">
                  {/* Doctor Image */}
                  <div className="relative h-[400px] overflow-hidden">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                    
                    {/* Floating Info Overlay */}
                    <div className="absolute bottom-8 left-8 right-8">
                      <div className="flex items-center gap-2 mb-2">
                         {[...Array(5)].map((_, i) => (
                           <Star key={i} className={`w-3 h-3 ${i < Math.floor(doctor.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-white/30'}`} />
                         ))}
                         <span className="text-xs text-white/80 font-bold">{doctor.rating} ({doctor.reviews})</span>
                      </div>
                      <h3 className="text-3xl font-black text-white tracking-tight">{doctor.name}</h3>
                      <p className="text-primary-foreground font-black text-[10px] uppercase tracking-widest mt-1 opacity-80">
                        {doctor.specialty} Specialist
                      </p>
                    </div>
                  </div>

                  <CardContent className="p-10 space-y-8">
                    <div className="flex flex-wrap gap-3">
                      <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary font-black text-[10px] uppercase tracking-widest py-1.5 px-4 rounded-full">
                        <Calendar className="w-3 h-3 mr-2" /> {doctor.experience} Exp
                      </Badge>
                      <Badge variant="outline" className="border-secondary/20 bg-secondary/5 text-secondary font-black text-[10px] uppercase tracking-widest py-1.5 px-4 rounded-full">
                        Available Today
                      </Badge>
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                      {doctor.bio}
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-xs font-black text-foreground uppercase tracking-widest opacity-60">
                        <GraduationCap className="w-4 h-4 text-primary" />
                        Credentials
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {doctor.qualifications.map((qual, idx) => (
                          <span key={idx} className="text-[10px] px-3 py-1 bg-muted/50 rounded-lg font-bold text-muted-foreground border border-border/50">
                            {qual}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full h-16 rounded-2xl bg-zinc-950 dark:bg-primary hover:bg-primary hover:text-white dark:hover:bg-primary/90 text-white font-black text-lg transition-all shadow-2xl group">
                      Book Consultation
                      <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
