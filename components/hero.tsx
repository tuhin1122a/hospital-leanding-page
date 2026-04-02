import { Handshake, PhoneCall, Plus, Search, User, Volume2 } from 'lucide-react'
import Image from 'next/image'
import { Button } from './ui/button'

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden min-h-screen flex items-center justify-center bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-[#f0f7ff] z-0 opacity-50" />
      
      {/* ----------------- AUTHENTIC BACKGROUND GRADIENTS & PATTERNS ----------------- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        
        {/* Main Body Background: Pure White Top */}
        <div className="absolute inset-0 bg-white z-0" />
        <div className="absolute top-[-10%] right-[-15%] w-[1000px] h-[800px] bg-gradient-radial from-[#f0f7ff] to-transparent opacity-100 z-0" />

        {/* --- CONSTRAINED "GARO NIL" (DEEP BLUE) BOTTOM CLOUD --- */}
        {/* Specifically targeting ONLY the bottom edge area */}
        <div className="absolute -bottom-[15%] -left-[5%] w-[1200px] h-[450px] bg-[#0c2b8e] opacity-[0.9] rounded-[40%] blur-[120px] z-0" />
        <div className="absolute -bottom-[5%] left-[-10%] w-[900px] h-[400px] bg-[#1a4bde] opacity-[0.7] rounded-[40%] blur-[110px] z-0" />
        <div className="absolute -bottom-[5%] right-[-5%] left-[-5%] h-[28vh] bg-gradient-to-t from-[#0c2b8e]/70 via-[#1a4bde]/25 to-transparent blur-[80px] -rotate-1 z-0" />
        
        <div className="absolute bottom-0 right-0 w-[700px] h-[350px] bg-gradient-radial from-[#1a4bde]/40 to-transparent blur-[120px] z-0" />

        {/* TOP RIGHT: 3D RIBBED PLATES (FAN DESIGN) - High Fidelity */}
        <div className="absolute top-[-40px] right-[-120px] w-[750px] h-[750px] opacity-[0.45] rotate-[8deg]">
          <svg viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              {[...Array(12)].map((_, i) => (
                <path 
                  key={i} 
                  d={`M${240 + i*18},0 C${290 + i*18},160 ${160 + i*18},400 ${500 + i*18},600 L${530 + i*18},600 C${190 + i*18},400 ${320 + i*18},160 ${270 + i*18},0 Z`} 
                  fill={`url(#ribbon-grad-${i})`}
                  opacity={0.7 - (i * 0.05)}
                />
              ))}
              <defs>
                {[...Array(12)].map((_, i) => (
                  <linearGradient key={i} id={`ribbon-grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="white" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="white" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                ))}
              </defs>
          </svg>
        </div>

        {/* BOTTOM LEFT: 3D STACKED PLATES (LIQUID DESIGN) - High Fidelity */}
        <div className="absolute bottom-[-20px] left-[-180px] w-[800px] h-[650px] opacity-[0.5] -rotate-[10deg] z-0">
          <svg viewBox="0 0 600 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {[...Array(14)].map((_, i) => (
              <path 
                key={i} 
                d={`M0,${150 + i*12} Q260,${110 + i*10} 600,${190 + i*12} L600,${205 + i*12} Q260,${125 + i*10} 0,${165 + i*12} Z`} 
                fill={`url(#liquid-grad-${i})`}
                opacity={0.6 - (i * 0.04)}
              />
            ))}
            <defs>
               {[...Array(14)].map((_, i) => (
                  <linearGradient key={i} id={`liquid-grad-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="white" stopOpacity="1" />
                    <stop offset="60%" stopColor="white" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                  </linearGradient>
               ))}
            </defs>
          </svg>
        </div>

        {/* LARGE DECORATIVE PLUS LOGO (Right Bottom) */}
        <div className="absolute bottom-[4%] right-[4%] w-[240px] h-[240px] opacity-[0.08] text-[#1a4bde]">
           <Plus className="w-full h-full" strokeWidth={0.2} />
        </div>
      </div>

      {/* ----------------- MAIN LAYOUT CONTAINER (Positioned Content) ----------------- */}
      <div className="relative w-full max-w-7xl mx-auto min-h-screen px-6 flex flex-col justify-center z-10 pt-20">
         
         {/* TOP SECTION: HEADING & MAIN CTA */}
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
            {/* EMERGENCY CTA BUTTON - HIGH IMPACT RED/ORANGE */}
            <a href="tel:999" className="inline-flex items-center gap-4 bg-gradient-to-r from-[#ff3b30] via-[#f84f31] to-[#f36424] hover:bg-[#e05a1f] text-white px-10 h-[64px] rounded-[18px] shadow-[0_20px_45px_rgba(255,59,48,0.35)] font-extrabold text-[20px] border-0 transition-all active:scale-95 group relative overflow-hidden">
               <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
               <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
                  <PhoneCall className="w-5 h-5 text-white fill-white" />
               </div>
               <span>Emergency: <span className="text-[26px] ml-1">999</span></span>
            </a>
         </div>

         {/* BOTTOM SECTION: FLOATING CARDS (Floating on the Deep Blue) */}
         <div className="flex flex-col lg:flex-row items-center lg:items-end gap-6 lg:gap-8 relative z-10 mt-6 lg:mt-10">
            {/* 99% BLUE CARD - Solid Vibrant Blue */}
            <div className="relative w-[170px] lg:w-[190px] h-[220px] lg:h-[250px] bg-[#1a4bde] rounded-[28px] lg:rounded-[32px] p-6 lg:p-7 text-white shadow-[0_20px_40px_rgba(26,75,222,0.25)] flex flex-col justify-between shrink-0 group hover:translate-y-[-8px] transition-all duration-500 border border-white/15">
               <div className="space-y-1">
                 <p className="text-[9px] lg:text-[10px] font-bold text-white/70 uppercase tracking-[0.1em]">Advanced treatment</p>
                 <h2 className="text-[52px] lg:text-[64px] font-black leading-none tracking-tighter">99%</h2>
                 <p className="text-[11px] lg:text-[12px] font-medium text-white/80 leading-relaxed max-w-[110px]">Reliable in health care...</p>
               </div>
               <button className="w-full h-8 lg:h-9 rounded-[9px] lg:rounded-[10px] border border-white/60 text-white font-bold hover:bg-white/10 transition-all text-[11px] lg:text-[12px] bg-transparent backdrop-blur-sm">
                 See All
               </button>
            </div>

            {/* LARGE GLASS SEARCH CARD - Hidden on small mobile heights or scaled */}
            <div className="hidden sm:flex w-[340px] lg:w-[380px] h-[230px] lg:h-[250px] bg-white/40 backdrop-blur-[45px] border border-white/70 shadow-[0_15px_45px_rgba(0,0,0,0.025)] rounded-[28px] lg:rounded-[32px] p-6 lg:p-8 flex-col justify-between shrink-0 transition-all hover:bg-white/50">
                {[
                  { icon: Search, title: "Search The Medical", desc: "With more can options" },
                  { icon: User, title: "Find The Best Doctor", desc: "You can do all the things" },
                  { icon: Handshake, title: "Get Your Solution", desc: "You should be doing" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-5 lg:gap-6">
                    <div className="w-[42px] lg:w-[48px] h-[42px] lg:h-[48px] bg-white shadow-[0_4px_18px_rgba(0,0,0,0.03)] rounded-[12px] lg:rounded-[14px] flex items-center justify-center shrink-0 border border-gray-50/50">
                      <item.icon className="w-4 h-4 lg:w-5 lg:h-5 text-[#1a4bde]" strokeWidth={2.8} />
                    </div>
                    <div>
                      <h3 className="text-[15px] lg:text-[17px] font-bold text-[#0a1b4d] leading-none mb-1">{item.title}</h3>
                      <p className="text-[12px] lg:text-[13px] text-[#64748b] font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
            </div>
         </div>

         {/* DOCTOR IMAGE - MOVED RIGHTWARD FOR GLASS CARD VISIBILITY */}
         <div className="hidden lg:flex absolute left-[62%] -translate-x-1/2 bottom-0 w-[55vw] max-w-[750px] h-[92vh] z-[15] pointer-events-none flex-col justify-end">
            <Image 
              src="/hero-doctor.png" 
              alt="Professional Doctor" 
              fill 
              className="object-contain object-bottom drop-shadow-[0_45px_100px_rgba(0,0,0,0.12)]" 
              priority 
            />
         </div>

         {/* RIGHT SIDE: PHONE & VIRTUAL CONSULTATION */}
         <div className="hidden lg:flex absolute right-0 bottom-0 h-[92vh] flex-col items-end justify-between pt-12 pb-20 w-[400px] z-10 pr-4">
             
             {/* THE PHONE MOCKUP (Video Call UX) - THIN MODERN BEZEL */}
             <div className="relative w-[235px] aspect-[1/1.85] bg-[#0c1a3d] rounded-[36px] shadow-[0_45px_90px_rgba(0,0,0,0.18)] p-[4.5px] overflow-visible transition-transform hover:scale-[1.02] duration-500 translate-y-[-10px] z-10">
                <div className="w-full h-full bg-[#f8faff] rounded-[31.5px] overflow-hidden relative border border-gray-100 flex flex-col">
                   
                   {/* FULL SCREEN VIDEO BACKGROUND */}
                   <div className="absolute inset-0 z-0">
                      <Image src="/hero-doctor.png" alt="Doctor" fill className="object-cover object-top scale-125 translate-y-12" />
                   </div>

                   {/* Phone Top Header (Overlay) */}
                   <div className="pt-5 px-5 pb-3 relative z-20 bg-gradient-to-b from-white/60 to-transparent">
                      <span className="text-[14px] font-bold text-[#2d468e] tracking-tight">Contact</span>
                   </div>

                   {/* INTERNAL PIP AVATAR (Small image inside) */}
                   <div className="absolute top-[8%] right-[10%] w-[62px] h-[62px] rounded-[12px] overflow-hidden border-[2px] border-white shadow-2xl z-20 transition-all hover:scale-110">
                      <Image src="/doctor-1.jpg" fill alt="Self View" className="object-cover"/>
                   </div>
                   
                   <div className="flex-1" />

                   {/* Call Controls at bottom (Overlay) */}
                   <div className="h-20 flex items-center justify-center gap-6 px-6 relative z-20 pb-2 bg-gradient-to-t from-white/40 via-white/10 to-transparent">
                       <div className="w-8 h-8 rounded-full bg-white/30 backdrop-blur-xl flex items-center justify-center border border-white/40 shadow-sm"><Volume2 className="w-3.5 h-3.5 text-[#2d468e]" /></div>
                       <div className="w-[48px] h-[48px] bg-[#ff3b30] rounded-full flex items-center justify-center shadow-xl shadow-red-500/40 hover:scale-110 active:scale-95 transition-transform cursor-pointer border-[2.5px] border-white/20">
                          <PhoneCall className="w-5 h-5 text-white fill-white" />
                       </div>
                       <div className="w-8 h-8 rounded-full bg-white/30 backdrop-blur-xl flex items-center justify-center border border-white/40 shadow-sm"><Handshake className="w-4 h-4 text-[#2d468e]" /></div>
                   </div>
                </div>

                {/* Overlapping Badge: Congratulations */}
                <div className="absolute top-[12%] left-[-90px] bg-white rounded-[20px] shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-4 flex items-center gap-3 z-30 min-w-[210px] border border-gray-50/50">
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
                <div className="absolute bottom-[18%] left-[-80px] bg-white rounded-[18px] shadow-[0_15px_35px_rgba(0,0,0,0.07)] px-4 py-3 flex items-center gap-3 z-30 border border-gray-50/50">
                   <div className="flex -space-x-3">
                      {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-[2.5px] border-white overflow-hidden relative bg-gray-100 shadow-sm"><Image src={i===1?'/medical-team-1.png':i===2?'/medical-team-2.png':'/doctor-1.jpg'} fill alt="t" className="object-cover"/></div>)}
                   </div>
                   <div className="text-[11px] font-bold text-[#0a1b4d] leading-tight pr-2">
                     <p>100k+Satisfied</p>
                     <p className="text-gray-400 font-bold uppercase text-[8px]">Patients</p>
                   </div>
                </div>

                {/* Overlapping Badge: 25% Discount (Blue Square Design) */}
                <div className="absolute top-[32%] right-[-55px] w-[115px] h-[115px] bg-[#1a4bde] rounded-[18px] shadow-2xl p-[11px] z-20 flex flex-col items-center justify-center transition-all hover:rotate-[4deg]">
                   <div className="w-full h-full bg-white rounded-[12px] flex flex-col items-center justify-center relative overflow-hidden">
                      {/* Sub-text background effect */}
                      <div className="absolute inset-x-0 top-0 text-[6px] font-bold opacity-[0.08] text-center leading-none mt-1 uppercase text-[#1a4bde] whitespace-nowrap">The Discount Get The Discount</div>
                      <div className="absolute inset-x-0 bottom-0 text-[6px] font-bold opacity-[0.08] text-center leading-none mb-1 uppercase text-[#1a4bde] whitespace-nowrap translate-y-[2px]">The First Time Visit 25% Get</div>
                      
                      <h2 className="text-[32px] font-black text-[#0a1b4d] leading-none mb-0.5 tracking-tighter">25%</h2>
                      <p className="text-[7.5px] font-bold text-[#64748b] uppercase tracking-tighter text-center px-1">Discount For The First Time Visit</p>
                   </div>
                </div>
             </div>

             {/* VIRTUAL CONSULTATION (Bottom) - MOVED UPWARD */}
             <div className="w-[300px] text-center mb-10 px-4 translate-y-[-20px]">
                <h3 className="text-[23px] font-black text-[#0a1b4d] mb-1.5 tracking-tight">Virtual consultation</h3>
                <p className="text-[14px] font-semibold text-[#475569] leading-relaxed mb-6 max-w-[260px] mx-auto opacity-90">
                  Timely care virtual consultation with typically being scheduled.
                </p>
                <button className="w-[200px] h-[52px] rounded-[16px] bg-white border border-gray-200 text-[#0a1b4d] font-bold text-[16px] shadow-[0_10px_25px_rgba(0,0,0,0.05)] hover:bg-[#1a4bde] hover:text-white hover:border-[#1a4bde] transition-all duration-300 cursor-pointer active:scale-95">
                  Book Now
                </button>
             </div>
         </div>

      </div>


    </section>
  )
}
