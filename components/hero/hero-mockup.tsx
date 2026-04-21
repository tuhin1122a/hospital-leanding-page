'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Download, Play, Youtube, Phone } from 'lucide-react'
import Image from 'next/image'

export function HeroMockup({ data }: { data?: any }) {
  const displaySubtitle = "অত্যাধুনিক প্রযুক্তি এবং বিশেষজ্ঞ চিকিৎসকদের নিবিড় তত্ত্বাবধানে আমরা দিচ্ছি বিশ্বমানের স্বাস্থ্যসেবা। আপনার সুস্থতাই আমাদের সর্বোচ্চ অগ্রাধিকার।"
  const displayBtn = data?.buttonText || "ফ্রি ট্রাই করুন"

  return (
    <section className="relative w-full bg-white overflow-hidden pt-[160px] pb-12 lg:pt-[220px] lg:pb-20" style={{ fontFamily: "'Anek Bangla', sans-serif" }}>
      {/* Premium SVG Deep Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
         {/* Top Right large abstract blob */}
         <motion.svg animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }} transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-[10%] -right-[5%] w-[500px] lg:w-[700px] h-[500px] lg:h-[700px] text-[#1a4bde]/20" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M47.7,-57.2C59.4,-47.3,65,-31.1,68.5,-14.8C72.1,1.5,73.5,17.9,65.3,29.9C57.1,41.9,39.3,49.5,22.3,55.9C5.3,62.3,-10.8,67.6,-26.3,64.2C-41.8,60.8,-56.7,48.7,-64.8,33.5C-72.9,18.3,-74.2,0,-69,-15.5C-63.7,-31,-51.9,-43.7,-38.6,-53.4C-25.3,-63,-12.6,-69.5,1.7,-71.5C16,-73.5,32,-71,47.7,-57.2Z" transform="translate(100 100)" />
         </motion.svg>
         
         {/* Bottom Left intricate grid */}
         <svg className="absolute -bottom-[10%] -left-[5%] w-[400px] h-[400px] opacity-[0.15] text-[#1a4bde]" width="400" height="400" xmlns="http://www.w3.org/2000/svg">
            <defs>
               <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="2.5"/>
               </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
         </svg>

         {/* Medical Crosses Patterns */}
         <svg className="absolute top-[20%] left-[5%] w-[300px] h-[300px] opacity-[0.12] text-[#005C38]" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
            <defs>
               <pattern id="crosses" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M30 10v40M10 30h40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#crosses)" />
         </svg>
         
         {/* Organic floating curvy lines near the center */}
         <motion.svg animate={{ x: [0, -30, 0], y: [0, 20, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[35%] right-[25%] w-[400px] h-[400px] text-[#ff6b35]/30" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="none" stroke="currentColor" strokeWidth="3" d="M23.1,-33.4C33.7,-25.2,48.5,-21.8,51.8,-13.6C55,-5.5,46.6,7.4,41.9,23C37.2,38.6,36.2,56.9,26.4,63C16.5,69.1,-2.3,63,-20.9,56C-39.6,49,-58,41.1,-63.9,27.1C-69.8,13.1,-63.2,-7,-55.3,-24.1C-47.5,-41.2,-38.4,-55.4,-25.4,-62.3C-12.4,-69.1,4.5,-68.6,12.5,-42.6C12.5,-42.6,23.1,-33.4,23.1,-33.4Z" transform="translate(100 100)" />
         </motion.svg>
      </div>

      <div className="absolute top-0 left-0 w-64 h-64 opacity-20 pointer-events-none">
         <Image src="/leaf-decor.png" alt="" width={256} height={256} className="object-contain -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[90rem] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center relative z-10 w-full">
        {/* Left Side: Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 lg:col-span-5 2xl:col-span-4 order-2 lg:order-1"
          style={{ paddingLeft: '1rem' }}
        >
          <div className="hidden lg:inline-flex items-center gap-2 bg-[#ff6b35] text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg">
             <span className="animate-pulse">✨</span> কুমারখালীর মানুষের আস্থার প্রতীক
          </div>

          <div className="hidden lg:block space-y-4">
            <h1 className="text-5xl lg:text-7xl font-black text-[#0a1b4d] leading-[1.1] tracking-tight" style={{ fontFamily: "'Anek Bangla', sans-serif" }}>
               সেরা চিকিৎসা, <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a4bde] to-[#ff6b35]">সুস্থ জীবন</span>
            </h1>
            <p className="text-xl text-slate-600 font-bold max-w-lg leading-relaxed">
               {displaySubtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full mt-6 lg:mt-0">
            <button className="h-14 w-[280px] sm:w-[240px] px-4 justify-center bg-[#1a4bde] text-white rounded-xl font-black text-[15px] sm:text-lg flex items-center gap-2 shadow-xl hover:scale-[1.02] transition-transform">
               অ্যাপয়েন্টমেন্ট বুকিং <ArrowRight size={20} />
            </button>
            <button className="h-14 w-[280px] sm:w-[240px] px-4 justify-center bg-red-600 text-white rounded-xl font-black text-[15px] sm:text-lg flex items-center gap-2 shadow-xl hover:scale-[1.02] transition-transform">
               <Phone size={20} fill="currentColor" /> জরুরি সেবা
            </button>
          </div>
        </motion.div>

        {/* Right Side: Mockup / Video Player */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
           animate={{ opacity: 1, scale: 1, rotateY: 0 }}
           transition={{ duration: 1, delay: 0.2 }}
           className="relative lg:col-span-7 2xl:col-span-8 w-full order-1 lg:order-2"
        >
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] bg-zinc-900 border-[8px] border-zinc-100 group w-[110%] -ml-[5%] lg:w-full lg:ml-0 lg:scale-[1.05] 2xl:scale-[1.15] origin-left lg:origin-center z-20">
             {/* Mock Content */}
             <div className="absolute inset-0 bg-gradient-to-br from-[#1a4bde] to-[#0a1b4d] flex flex-col p-8 text-white">
                <div className="flex justify-between items-start mb-auto">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                         <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center font-bold text-xs italic">V</div>
                      </div>
                      <div>
                         <div className="font-bold text-sm">উন্নত চিকিৎসা সেবা — নূরজাহান হাসপাতাল</div>
                         <div className="text-[10px] opacity-60">Panti Bazar, Kumarkhali</div>
                      </div>
                   </div>
                   <div className="flex gap-4 opacity-70">
                      <Youtube size={20} />
                      <Play size={20} />
                   </div>
                </div>

                <div className="my-auto text-center space-y-4">
                   <h2 className="text-4xl font-black">আমাদের লক্ষ্য</h2>
                   <p className="opacity-80 max-w-sm mx-auto font-medium">অত্যাধুনিক প্রযুক্তি এবং দক্ষ চিকিৎসকদের সমন্বয়ে আমরা আপনার সুস্থতা নিশ্চিত করি। আমাদের প্রতিটি সেবা আপনার সেবায় নিয়োজিত।</p>
                </div>

                <div className="mt-auto flex items-center gap-4">
                   <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "70%" }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="h-full bg-red-500" 
                      />
                   </div>
                   <span className="text-xs font-bold font-mono">1:06 / 2:34</span>
                </div>
             </div>

             {/* Play Button Overlay */}
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:pointer-events-auto">
                <button className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-2 border-white/50 text-white hover:scale-110 transition-transform cursor-pointer">
                   <Play size={32} fill="currentColor" />
                </button>
             </div>
          </div>

          {/* Badges floating around */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-zinc-100 flex items-center gap-3"
          >
             <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                <ArrowRight size={20} />
             </div>
             <div>
                <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Efficiency</div>
                <div className="font-black text-zinc-800 tracking-tight">100% Faster</div>
             </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
