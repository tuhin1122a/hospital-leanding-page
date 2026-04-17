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
      
      {/* BACKGROUND SLIDER (CLEAN) */}
      <div className="absolute inset-0 z-0 bg-slate-900">
        <AnimatePresence mode='wait'>
          {activeHeroes.map((hero, index) => (
            index === currentSlide && (
              <motion.div
                key={hero.id}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={hero.bgImage}
                  alt=""
                  className="w-full h-full object-cover object-center"
                />
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      <div className="relative w-full max-w-7xl mx-auto h-full px-6 flex flex-col justify-end z-20 pb-8 sm:pb-12">
         <HeroContent currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
      </div>
    </section>
  )
}



