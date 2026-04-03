import Image from 'next/image'
import { Button } from './ui/button'

export default function AboutServices() {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0a1b4d] tracking-tight leading-tight">
                About <span className="text-[#1a4bde]">Nurjahan Hospital</span>
              </h2>
              <p className="text-[#64748b] text-[15px] lg:text-[17px] leading-relaxed font-medium">
                For over 25 years, Nurjahan Private Hospital & Diagnostic Center - 2 has been a cornerstone of healthcare excellence in the Kumarkhali community. Our mission is to provide premium, accessible, and compassionate medical care using the world's most advanced technology.
              </p>
              <p className="text-[#64748b] text-[15px] lg:text-[17px] leading-relaxed font-medium opacity-80">
                We believe in a human-centric approach to medicine, where every patient receives personalized attention from our expert consultants and nursing staff.
              </p>
            </div>

            <Button className="bg-[#1a4bde] hover:bg-[#0a1b4d] text-white font-bold rounded-xl px-12 py-7 transition-all shadow-[0_12px_30px_rgba(26,75,222,0.15)] border-0 text-[16px] h-fit hover:scale-105 active:scale-95 cursor-pointer">
              Learn Our Quality Story
            </Button>
          </div>

          {/* Right Images (Overlapping like in design) */}
          <div className="relative">
             <div className="relative z-10 w-4/5 aspect-[4/3] rounded-xl overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.05)] border-8 border-white">
                <Image src="/medical-team-1.png" alt="Medical Team" fill className="object-cover" />
             </div>
             <div className="absolute -bottom-10 -right-10 w-3/5 aspect-square rounded-xl overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.06)] border-8 border-white z-20">
                <Image src="/medical-team-2.png" alt="Doctors" fill className="object-cover" />
             </div>
             {/* Decorative UI element */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl z-0"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
