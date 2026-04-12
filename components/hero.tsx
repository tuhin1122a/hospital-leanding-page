'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HeroContent } from './hero/hero-content'

const bgImages = [
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&q=80", // Modern Hospital
  "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1920&q=80", // Diagnostic / X-ray vibe
  "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1920&q=80", // ICU / Patient bed
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1920&q=80"  // Expert Doctor
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bgImages.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative w-full overflow-hidden min-h-screen flex items-center justify-center bg-slate-100">
      
      {/* BEAUTIFUL BACKGROUND CAROUSEL */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentSlide}
            src={bgImages[currentSlide]}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
            alt="Hospital background"
          />
        </AnimatePresence>
        {/* Gradient overlay to ensure text remains readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/70 lg:via-slate-900/20 to-transparent z-10" />
      </div>

      {/* ----------------- MAIN LAYOUT CONTAINER (Positioned Content) ----------------- */}
      <div className="relative w-full max-w-7xl mx-auto min-h-screen px-6 flex flex-col justify-end z-10 pb-24 lg:pb-32 pt-48">
         
         <HeroContent currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />

      </div>
    </section>
  )
}
