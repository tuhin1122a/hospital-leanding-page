import { Handshake, PhoneCall, Volume2 } from 'lucide-react'
import Image from 'next/image'

export function HeroPhone() {
  return (
    <div className="relative w-[235px] aspect-[1/1.85] bg-[#0c1a3d] rounded-[36px] shadow-[0_45px_90px_rgba(0,0,0,0.18)] p-[4.5px] overflow-visible transition-transform hover:scale-[1.02] duration-500 translate-y-[-10px] z-10">
      <div className="w-full h-full bg-[#f8faff] rounded-[31.5px] overflow-hidden relative border border-gray-100 flex flex-col">
        {/* FULL SCREEN VIDEO BACKGROUND */}
        <div className="absolute inset-0 z-0">
          <Image src="/hero-doctor.png" alt="Doctor" fill className="object-cover object-top scale-125 translate-y-12" />
        </div>

        {/* Phone Top Header */}
        <div className="pt-5 px-5 pb-3 relative z-20 bg-gradient-to-b from-white/60 to-transparent">
          <span className="text-[14px] font-bold text-[#2d468e] tracking-tight">Contact</span>
        </div>

        {/* INTERNAL PIP AVATAR */}
        <div className="absolute top-[8%] right-[10%] w-[62px] h-[62px] rounded-[12px] overflow-hidden border-[2px] border-white shadow-2xl z-20 transition-all hover:scale-110">
          <Image src="/doctor-1.jpg" fill alt="Self View" className="object-cover"/>
        </div>
        
        <div className="flex-1" />

        {/* Call Controls */}
        <div className="h-20 flex items-center justify-center gap-6 px-6 relative z-20 pb-2 bg-gradient-to-t from-white/40 via-white/10 to-transparent">
          <div className="w-8 h-8 rounded-full bg-white/30 backdrop-blur-xl flex items-center justify-center border border-white/40 shadow-sm"><Volume2 className="w-3.5 h-3.5 text-[#2d468e]" /></div>
          <div className="w-[48px] h-[48px] bg-[#ff3b30] rounded-full flex items-center justify-center shadow-xl shadow-red-500/40 hover:scale-110 active:scale-95 transition-transform cursor-pointer border-[2.5px] border-white/20">
            <PhoneCall className="w-5 h-5 text-white fill-white" />
          </div>
          <div className="w-8 h-8 rounded-full bg-white/30 backdrop-blur-xl flex items-center justify-center border border-white/40 shadow-sm"><Handshake className="w-4 h-4 text-[#2d468e]" /></div>
        </div>
      </div>

      <HeroBadges />
    </div>
  )
}

function HeroBadges() {
  return (
    <>
      {/* Overlapping Badge: Congratulations */}
      <div className="absolute top-[12%] left-[-90px] bg-white rounded-[14px] shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-4 flex items-center gap-3 z-30 min-w-[210px] border border-gray-50/50">
        <div className="flex-1">
          <div className="text-[14px] font-bold text-[#1a4bde] flex items-center gap-1.5 leading-none mb-1">
            Congratuation! 
            <div className="w-4 h-4 bg-[#22c55e] rounded-full flex items-center justify-center border-[2px] border-[#22c55e] shrink-0">
              <svg width="8" height="6" viewBox="0 0 10 8" fill="none" className="text-white"><path d="M1 4L4 7L9 1" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
          <p className="text-[10px] text-[#64748b] font-semibold">You have got an appointment</p>
        </div>
      </div>

      {/* Overlapping Badge: Patients */}
      <div className="absolute bottom-[18%] left-[-80px] bg-white rounded-[12px] shadow-[0_15px_35px_rgba(0,0,0,0.07)] px-4 py-3 flex items-center gap-3 z-30 border border-gray-50/50">
        <div className="flex -space-x-3">
          {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-[2.5px] border-white overflow-hidden relative bg-gray-100 shadow-sm"><Image src={i===1?'/medical-team-1.png':i===2?'/medical-team-2.png':'/doctor-1.jpg'} fill alt="t" className="object-cover"/></div>)}
        </div>
        <div className="text-[11px] font-bold text-[#0a1b4d] leading-tight pr-2">
          <p>100k+Satisfied</p>
          <p className="text-gray-400 font-bold uppercase text-[8px]">Patients</p>
        </div>
      </div>

      {/* Overlapping Badge: 25% Discount */}
      <div className="absolute top-[32%] right-[-55px] w-[115px] h-[115px] bg-[#1a4bde] rounded-xl shadow-2xl p-[11px] z-20 flex flex-col items-center justify-center transition-all hover:rotate-[4deg]">
        <div className="w-full h-full bg-white rounded-lg flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 text-[6px] font-bold opacity-[0.08] text-center leading-none mt-1 uppercase text-[#1a4bde] whitespace-nowrap">The Discount Get The Discount</div>
          <div className="absolute inset-x-0 bottom-0 text-[6px] font-bold opacity-[0.08] text-center leading-none mb-1 uppercase text-[#1a4bde] whitespace-nowrap translate-y-[2px]">The First Time Visit 25% Get</div>
          
          <h2 className="text-[32px] font-black text-[#0a1b4d] leading-none mb-0.5 tracking-tighter">25%</h2>
          <p className="text-[7.5px] font-bold text-[#64748b] uppercase tracking-tighter text-center px-1">Discount For The First Time Visit</p>
        </div>
      </div>
    </>
  )
}
