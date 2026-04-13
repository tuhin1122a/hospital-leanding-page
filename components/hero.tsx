'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HeroContent } from './hero/hero-content'

const bgImages = [
  "/hero-hospital.jpg",
  "/x_ray_machine_1771847517546.png",
  "/ultrasound_machine_1771847580933.png",
  "/mri_scanner_1771847551526.png",
  "/ct_scan_machine_1771847703067.png",
  "/patient-care.jpg",
  "/surgery-room.jpg"
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
    <section className="relative w-full overflow-hidden h-[100dvh] min-h-[600px] flex items-center justify-center bg-slate-100">
      
      {/* STABLE BACKGROUND IMAGES (With Enhanced Clarity and Vibrancy) */}
      <div className="absolute inset-0 z-0 bg-slate-900">
        {bgImages.map((img, index) => (
          <motion.div
            key={index}
            initial={false}
            animate={{ 
              opacity: currentSlide === index ? 1 : 0,
              scale: currentSlide === index ? 1 : 1.05,
              zIndex: currentSlide === index ? 10 : 0
            }}
            transition={{ 
              duration: 1.5,
              ease: [0.4, 0, 0.2, 1] 
            }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={img}
              alt={`Hospital section ${index + 1}`}
              className="w-full h-full object-cover object-center brightness-[1.05] contrast-[1.05] saturate-[1.1]"
              style={{ imageRendering: 'auto' }}
              loading="eager"
            />
          </motion.div>
        ))}
      </div>

      {/* ----------------- MAIN LAYOUT CONTAINER (Positioned Content) ----------------- */}
      <div className="relative w-full max-w-7xl mx-auto h-full px-6 flex flex-col justify-end z-20 pb-8 sm:pb-12">
         <HeroContent currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
      </div>
    </section>
  )
}
