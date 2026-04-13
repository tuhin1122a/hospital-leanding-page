'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HeroContent } from './hero/hero-content'

const bgImages = [
  "/hero-hospital.jpg",       // Hospital Design
  "/x_ray_machine_1771847517546.png", // X-ray
  "/ultrasound_machine_1771847580933.png", // Ultrasound
  "/patient-care.jpg",        // ICU Cabin
  "/surgery-room.jpg",         // Operation Cabin (Real and light)
  "/masked-doctor.png"         // Operation Theatre (Focused Surgery)
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
      <div className="relative w-full max-w-7xl mx-auto min-h-screen px-6 flex flex-col justify-end z-10 pb-24 lg:pb-32 pt-64 md:pt-72">
         <HeroContent currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
      </div>
    </section>
  )
}
