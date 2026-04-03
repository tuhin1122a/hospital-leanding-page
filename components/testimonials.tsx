'use client'

import { SectionSvgBg } from '@/components/svg-patterns'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { useCallback } from 'react'
import { Button } from './ui/button'
import { TestimonialSlide } from './testimonial-slide'

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
    <section id="testimonials" className="relative py-24 bg-background overflow-hidden">
      <SectionSvgBg />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            className="text-5xl lg:text-6xl font-black text-foreground mb-6 tracking-tighter"
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
                <TestimonialSlide key={index} testimonial={testimonial} />
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
