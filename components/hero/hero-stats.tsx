import { Handshake, Search, User } from 'lucide-react'

export function HeroStats() {
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-end gap-6 lg:gap-8 relative z-10 mt-6 lg:mt-10">
      {/* 99% BLUE CARD */}
      <div className="relative w-[170px] lg:w-[190px] h-[220px] lg:h-[250px] bg-[#1a4bde] rounded-xl lg:rounded-2xl p-6 lg:p-7 text-white shadow-[0_15px_35px_rgba(26,75,222,0.18)] flex flex-col justify-between shrink-0 group hover:translate-y-[-8px] transition-all duration-500 border border-white/10">
        <div className="space-y-1">
          <p className="text-[9px] lg:text-[10px] font-bold text-white/70 uppercase tracking-[0.1em]">Advanced treatment</p>
          <h2 className="text-[52px] lg:text-[64px] font-black leading-none tracking-tighter">99%</h2>
          <p className="text-[11px] lg:text-[12px] font-medium text-white/80 leading-relaxed max-w-[110px]">Reliable in health care...</p>
        </div>
        <button className="w-full h-8 lg:h-9 rounded-lg border border-white/50 text-white font-bold hover:bg-white/10 transition-all text-[11px] lg:text-[12px] bg-transparent backdrop-blur-sm">
          See All
        </button>
      </div>

      {/* LARGE GLASS SEARCH CARD */}
      <div className="hidden sm:flex w-[340px] lg:w-[380px] h-[230px] lg:h-[250px] bg-white/40 backdrop-blur-[35px] border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.02)] rounded-xl lg:rounded-2xl p-6 lg:p-8 flex-col justify-between shrink-0 transition-all hover:bg-white/50">
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
  )
}
