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
    name: 'মোঃ আব্দুর রহমান',
    location: 'কুষ্টিয়া',
    procedure: 'কার্ডিয়াক বাইপাস সার্জারি',
    content: 'নূরজাহান হাসপাতাল বিশ্বমানের কার্ডিয়াক সেবা দিয়েছে। এখানকার মেডিকেল টিম এবং তাদের আধুনিক সুযোগ-সুবিধা আমাকে দ্রুত সুস্থ হতে সাহায্য করেছে, যার ফলে আমি এখন সুস্থভাবে জীবনযাপন করছি!',
    rating: 5
  },
  {
    name: 'ফাতেমা বেগম',
    location: 'কুমারখালী',
    procedure: 'অর্থোপেডিক জয়েন্ট রিপ্লেসমেন্ট',
    content: 'আমি আমার হাঁটু রিপ্লেসমেন্টের সময় বেশ নার্ভাস ছিলাম, কিন্তু নূরজাহানের বিশেষজ্ঞ সার্জন এবং চমৎকার নার্সিং স্টাফরা আমাকে সম্পূর্ণ সুস্থ ও স্বাভাবিক জীবনে ফিরিয়ে এনেছে। সবাইকে আমি এটি রেকমেন্ড করছি!',
    rating: 5
  },
  {
    name: 'সোহেল রানা',
    location: 'পান্টি',
    procedure: 'ইমার্জেন্সি ট্রমা কেয়ার',
    content: 'তাদের ২৪/৭ ইমার্জেন্সি রেসপন্স অসাধারণ। দুর্ঘটনার পর নূরজাহানে পৌঁছানোর ১৫ মিনিটের মধ্যেই আমি বিশেষজ্ঞ ডাক্তারের চিকিৎসা পেতে শুরু করি, যারা আমার জীবন বাঁচিয়েছিল।',
    rating: 5
  },
  {
    name: 'শারমিন আক্তার',
    location: 'কুষ্টিয়া',
    procedure: 'ক্যান্সার চিকিৎসা',
    content: 'ক্যান্সারের চিকিৎসার ক্ষেত্রে নূরজাহান হাসপাতালের উন্নত প্রযুক্তি এবং অনকোলজি টিমের দারুণ সহায়তা আমাকে চমৎকার সেবা পেতে সাহায্য করেছে। আমি তাদের কাছে চিরকৃতজ্ঞ।',
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
            style={{ fontFamily: "'Anek Bangla', sans-serif" }}
          >
            রোগীদের সফলতার <span className="text-primary italic">গল্প</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg leading-relaxed"
          >
            আমাদের বিশ্বমানের উন্নত স্বাস্থ্যসেবা ও বিশেষজ্ঞ চিকিৎসকদের চিকিৎসা গ্রহণ করা রোগীদের কিছু বাস্তব অভিজ্ঞতা ও মতামত।
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
