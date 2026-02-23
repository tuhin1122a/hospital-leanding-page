'use client'

import { Card, CardContent } from '@/components/ui/card'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { useCallback } from 'react'
import { Button } from './ui/button'

const testimonials = [
  {
    name: 'Md. Abdur Rahman',
    location: 'Kushtia',
    procedure: 'Cardiac Bypass Surgery',
    content: 'Nurjahan Hospital provided world-class cardiac care. The medical team was exceptional. The recovery process was smooth and the entire staff was very supportive. I am now living a healthy life!',
    rating: 5
  },
  {
    name: 'Fatema Begum',
    location: 'Kumarkhali',
    procedure: 'Orthopedic Joint Replacement',
    content: 'I was nervous about my knee replacement, but the Nurjahan team made me feel comfortable. The modern facilities, expert surgeons, and compassionate nursing staff made all the difference. Highly recommended!',
    rating: 5
  },
  {
    name: 'Sohel Rana',
    location: 'Panti',
    procedure: 'Emergency Trauma Care',
    content: 'The 24/7 emergency response was incredible. Within 15 minutes of arriving at Nurjahan after my accident, I was being treated by expert doctors. They saved my life with their quick thinking and expertise.',
    rating: 5
  },
  {
    name: 'Sharmin Akter',
    location: 'Kushtia',
    procedure: 'Cancer Treatment',
    content: 'The personalized cancer treatment plan gave me hope. The oncology team at Nurjahan combines cutting-edge technology with genuine compassion. I am grateful for their excellent care.',
    rating: 5
  }
]

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
  ])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <section id="testimonials" className="py-24 bg-background overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 text-primary mb-6 shadow-sm"
          >
            <Quote size={40} />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-black text-foreground mb-6 tracking-tighter"
          >
            Patient Success Stories
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg leading-relaxed"
          >
            Real testimonials from patients who have experienced our world-class healthcare and expert medical care.
          </motion.p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="embla" ref={emblaRef}>
            <div className="embla__container flex">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="embla__slide flex-[0_0_100%] px-4">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <Card className="border-border/50 shadow-2xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl overflow-hidden relative">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-bl-full -z-0"></div>
                      <CardContent className="pt-20 pb-12 px-8 sm:px-20 text-center relative z-10">
                        <div className="flex justify-center gap-1 mb-8">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        
                        <p className="text-foreground italic mb-12 leading-relaxed text-2xl font-medium text-balance">
                          "{testimonial.content}"
                        </p>
                        
                        <div className="pt-10 border-t border-border inline-block min-w-[200px]">
                          <p className="font-black text-foreground text-2xl mb-1 tracking-tight">{testimonial.name}</p>
                          <p className="text-[10px] text-primary font-black uppercase tracking-[0.2em] mb-3">Procedure: {testimonial.procedure}</p>
                          <p className="text-sm text-muted-foreground font-medium">📍 {testimonial.location}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-6 mt-12">
            <Button onClick={scrollPrev} variant="outline" size="icon" className="rounded-full w-14 h-14 border-primary/20 hover:bg-primary hover:text-white transition-all shadow-xl bg-background/50 backdrop-blur-sm">
              <ChevronLeft size={28} />
            </Button>
            <Button onClick={scrollNext} variant="outline" size="icon" className="rounded-full w-14 h-14 border-primary/20 hover:bg-primary hover:text-white transition-all shadow-xl bg-background/50 backdrop-blur-sm">
              <ChevronRight size={28} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
