import { HeroBackground } from './hero/hero-background'
import { HeroContent } from './hero/hero-content'
import { HeroStats } from './hero/hero-stats'
import { HeroDoctor } from './hero/hero-doctor'
import { HeroPhone } from './hero/hero-phone'
import { HeroConsultation } from './hero/hero-consultation'

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden min-h-screen flex items-center justify-center bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-[#f0f7ff] z-0 opacity-50" />
      
      <HeroBackground />

      {/* ----------------- MAIN LAYOUT CONTAINER (Positioned Content) ----------------- */}
      <div className="relative w-full max-w-7xl mx-auto min-h-screen px-6 flex flex-col justify-center z-10 pt-20">
         
         <HeroContent />

         <HeroStats />

         <HeroDoctor />

         {/* RIGHT SIDE: PHONE & VIRTUAL CONSULTATION */}
         <div className="hidden lg:flex absolute right-0 bottom-0 h-[92vh] flex-col items-end justify-between pt-12 pb-20 w-[400px] z-10 pr-4">
             <HeroPhone />
             <HeroConsultation />
         </div>

      </div>
    </section>
  )
}
