'use client'

import { Plus } from 'lucide-react'
import { DnaInteractiveBg } from '../svg-patterns'

export function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <DnaInteractiveBg />
      {/* Main Body Background: Pure White Top */}
      <div className="absolute inset-0 bg-white z-0" />
      <div className="absolute top-[-10%] right-[-15%] w-[1000px] h-[800px] bg-gradient-radial from-[#f0f7ff] to-transparent opacity-100 z-0" />

      {/* --- CONSTRAINED "GARO NIL" (DEEP BLUE) BOTTOM CLOUD --- */}
      <div className="absolute -bottom-[15%] -left-[5%] w-[1200px] h-[450px] bg-[#0c2b8e] opacity-[0.9] rounded-[40%] blur-[120px] z-0" />
      <div className="absolute -bottom-[5%] left-[-10%] w-[900px] h-[400px] bg-[#1a4bde] opacity-[0.7] rounded-[40%] blur-[110px] z-0" />
      <div className="absolute -bottom-[5%] right-[-5%] left-[-5%] h-[28vh] bg-gradient-to-t from-[#0c2b8e]/70 via-[#1a4bde]/25 to-transparent blur-[80px] -rotate-1 z-0" />
      
      <div className="absolute bottom-0 right-0 w-[700px] h-[350px] bg-gradient-radial from-[#1a4bde]/40 to-transparent blur-[120px] z-0" />

      {/* TOP RIGHT: 3D RIBBED PLATES (FAN DESIGN) */}
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

      {/* BOTTOM LEFT: 3D STACKED PLATES (LIQUID DESIGN) */}
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

      {/* LARGE DECORATIVE PLUS LOGO */}
      <div className="absolute bottom-[4%] right-[4%] w-[240px] h-[240px] opacity-[0.08] text-[#1a4bde]">
        <Plus className="w-full h-full" strokeWidth={0.2} />
      </div>
    </div>
  )
}
