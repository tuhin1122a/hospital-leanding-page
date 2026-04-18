'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HeroContent } from './hero/hero-content'

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activeHeroes, setActiveHeroes] = useState<any[]>([])

  useEffect(() => {
    const fetchHeroes = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hero`)
            if (res.ok) {
                const data = await res.json()
                const activeOnes = data.filter((h: any) => h.isActive)
                if (activeOnes.length > 0) {
                    setActiveHeroes(activeOnes)
                }
            }
        } catch (error) {
            console.error("Failed to fetch heroes", error)
        }
    }
    fetchHeroes()
  }, [])

  useEffect(() => {
    if (activeHeroes.length <= 1) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeHeroes.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [activeHeroes])

  const currentHero = activeHeroes[currentSlide]

  return (
    <section className="relative w-full overflow-hidden h-[100dvh] min-h-[600px] flex items-center justify-center bg-slate-100">
      
      {/* BACKGROUND SLIDER (CLEAN & PREMIUM) */}
      <div className="absolute inset-0 z-0 bg-slate-900">
        <AnimatePresence initial={false}>
          {activeHeroes.length > 0 && (
            <motion.div
              key={activeHeroes[currentSlide]?.id || currentSlide}
              initial={{ opacity: 0, scale: 1.15 }}
              animate={{ opacity: 1, scale: 1.05 }}
              exit={{ opacity: 0, scale: 1 }}
              transition={{ 
                opacity: { duration: 1.8, ease: "easeInOut" },
                scale: { duration: 8, ease: "linear" } 
              }}
              className="absolute inset-0 w-full h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 z-10" />
              <img
                src={activeHeroes[currentSlide]?.bgImage}
                alt=""
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative w-full max-w-7xl mx-auto h-full px-6 flex flex-col justify-end z-20 pb-8 sm:pb-12 text-white">
         <HeroContent currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
         
         {/* NAVIGATION DOTS */}
         <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-30">
            {activeHeroes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 transition-all duration-300 rounded-full ${
                  index === currentSlide 
                  ? "w-8 bg-blue-500" 
                  : "w-2 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
         </div>
      </div>
    </section>
  )
}



