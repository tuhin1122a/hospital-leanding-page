import { PhoneCall } from 'lucide-react'

export function HeroContent() {
  return (
    <div className="max-w-4xl mb-12 flex flex-col items-center lg:items-start text-center lg:text-left">
      <h1
        className="font-extrabold leading-[1.0] tracking-[-0.03em] mb-5 lg:mb-6"
        style={{ fontSize: 'clamp(32px, 5vw, 68px)' }}
      >
        <span className="text-[#1a4bde] block">Transforming</span>
        <span>
          <span className="text-[#0a1b4d]">Specialty </span>
          <span className="text-[#1a4bde]">Pharmacy</span>
        </span>
      </h1>
      <p className="text-[#64748b] font-medium text-[15px] lg:text-[17px] leading-relaxed max-w-[540px] mb-8 lg:translate-y-[-5px]">
        Clearway Health provides transformative Your specialty pharmacy services so you can Focus on who matters most Elevate your clinical programs Create a sustainable asset
      </p>
      {/* EMERGENCY CTA BUTTON */}
      <a href="tel:999" className="inline-flex items-center gap-4 bg-gradient-to-r from-[#ff3b30] via-[#f84f31] to-[#f36424] text-white px-10 h-[64px] rounded-xl shadow-[0_20px_45px_rgba(255,59,48,0.35)] font-extrabold text-[20px] border-0 transition-all active:scale-95 group relative overflow-hidden">
        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
          <PhoneCall className="w-5 h-5 text-white fill-white" />
        </div>
        <span>Emergency: <span className="text-[26px] ml-1">999</span></span>
      </a>
    </div>
  )
}
