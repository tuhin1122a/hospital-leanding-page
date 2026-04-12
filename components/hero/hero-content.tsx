'use client'

import { PhoneCall } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

export function HeroContent() {
  const [showContact, setShowContact] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowContact(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  return (
    <div className="max-w-4xl mb-12 flex flex-col items-center lg:items-start text-center lg:text-left">
      <h1
        className="font-extrabold leading-[1.0] tracking-[-0.03em] mb-5 lg:mb-6"
        style={{ fontSize: 'clamp(32px, 5vw, 68px)' }}
      >
        <span className="text-[#1a4bde] block">Experience</span>
        <span>
          <span className="text-[#0a1b4d]">Healthcare </span>
          <span className="text-[#1a4bde]">Redefined</span>
        </span>
      </h1>
      <p className="text-[#64748b] font-medium text-[15px] lg:text-[17px] leading-relaxed max-w-[540px] mb-8 lg:translate-y-[-5px]">
        Nurjahan Private Hospital & Diagnostic Center 2 provides world-class medical expertise with personalized care. We focus on what matters most—your health—by elevating our clinical excellence and offering advanced diagnostic solutions for everyone.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-5 text-left items-start justify-start w-full">
        {/* EMERGENCY CONTACT DROPDOWN */}
        <div className="relative w-full sm:w-[260px]" ref={menuRef}>
          <button 
            onClick={() => setShowContact(!showContact)}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#ff3b30] via-[#f84f31] to-[#f36424] text-white h-[64px] rounded-md shadow-[0_20px_45px_rgba(255,59,48,0.35)] font-bold text-[18px] border-0 transition-all active:scale-95 group relative overflow-hidden w-full sm:w-[260px] justify-center"
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
              <PhoneCall className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-[22px]">Emergency</span>
          </button>

          {/* DROPDOWN MENU */}
          {showContact && (
            <div className="absolute top-full left-0 mt-3 bg-white w-full sm:w-[320px] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-3 border border-slate-100 z-50 flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
              <a href="tel:01722414025" className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors bg-white group border border-transparent hover:border-slate-100">
                <div className="w-12 h-12 rounded-full bg-[#1a4bde]/10 flex items-center justify-center group-hover:bg-[#1a4bde] transition-colors">
                  <PhoneCall className="w-6 h-6 text-[#1a4bde] group-hover:text-white transition-colors" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-bold text-slate-900 text-[16px]">Direct Phone Call</span>
                  <span className="text-slate-500 font-medium text-[14px]">Dial 01722-414025</span>
                </div>
              </a>

              <a href="https://wa.me/8801722414025" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors bg-white group border border-transparent hover:border-slate-100">
                <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366] transition-colors">
                   <svg className="w-6 h-6 fill-[#25D366] group-hover:fill-white transition-colors" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51h-.57c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-bold text-slate-900 text-[16px]">WhatsApp Message</span>
                  <span className="text-slate-500 font-medium text-[14px]">Chat with our support</span>
                </div>
              </a>
            </div>
          )}
        </div>

        {/* PATIENT PORTAL / EASY BOOKING */}
        <a href="#contact" className="inline-flex items-center gap-3 bg-white border-2 border-[#1a4bde] text-[#1a4bde] h-[64px] rounded-md font-bold text-[18px] transition-all hover:bg-[#1a4bde] hover:text-white active:scale-95 w-full sm:w-[260px] justify-center shadow-sm">
          Doctor Appointment
        </a>
      </div>
    </div>
  )
}
