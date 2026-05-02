'use client'

import { motion } from 'framer-motion'

const managementTeam = [
  {
    name: "শামিম আহমেদ",
    title: "ব্যবস্থাপনা পরিচালক",
    image: "/shamim-ahmed.jpg",
    message: "আমাদের মূল লক্ষ্য কুমারখালীর প্রতিটি মানুষের দোরগোড়ায় উন্নত ও সাশ্রয়ী স্বাস্থ্যসেবা পৌঁছে দেওয়া।"
  }
]

export default function Management() {
  return (
    <section id="management" className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 space-y-4">
           <h4 className="text-[13px] font-black text-[#1a4bde] uppercase tracking-[0.3em]">ম্যানেজমেন্ট</h4>
           <h2 className="text-4xl lg:text-5xl font-black text-[#0a1b4d] tracking-tighter" style={{ fontFamily: "'Anek Bangla', sans-serif" }}>
              আমাদের <span className="text-[#005C38]">পরিচালনা পর্ষদ</span>
           </h2>
           <p className="text-[#64748b] font-medium max-w-2xl mx-auto text-lg">
              যাদের নিরলস প্রচেষ্টা এবং দিকনির্দেশনায় নূরজাহান হাসপাতাল আজ সাফল্যের শিখরে।
           </p>
        </div>

        <div className="flex justify-center">
          {managementTeam.map((member, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -8 }}
              className="bg-zinc-50 rounded-[32px] p-8 border border-zinc-100 shadow-sm hover:shadow-xl transition-all duration-300 text-center relative overflow-hidden group max-w-md w-full"
            >
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-[#005C38]/10 to-transparent"></div>
              
              <div className="w-32 h-32 mx-auto rounded-full p-2 bg-white shadow-lg mb-6 relative z-10">
                <div className="w-full h-full rounded-full overflow-hidden bg-zinc-200">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-all duration-500" />
                </div>
              </div>

              <div className="space-y-3 relative z-10">
                <h3 className="text-2xl font-black text-[#0a1b4d]" style={{ fontFamily: "'Anek Bangla', sans-serif" }}>{member.name}</h3>
                <p className="text-[#ff6b35] font-bold text-sm tracking-wider uppercase">{member.title}</p>
                <div className="w-12 h-1 bg-zinc-200 mx-auto rounded-full my-4 group-hover:bg-[#005C38] transition-colors"></div>
                <p className="text-zinc-600 font-medium italic leading-relaxed text-[15px]">
                  "{member.message}"
                </p>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
