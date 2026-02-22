'use client'

import { motion } from 'framer-motion'

export default function BackgroundShapes() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Premium Mesh Gradient */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-[#0ea5e9]/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#2dd4bf]/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-[#6366f1]/5 rounded-full blur-[100px]"></div>
      </div>
      
      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.015] contrast-150 brightness-100 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* Hero Specific Grid or Pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Floating abstract paths */}
      <svg className="absolute top-0 right-0 w-[50%] h-full opacity-[0.05]" viewBox="0 0 100 100">
        <motion.path
          d="M0,50 Q25,25 50,50 T100,50"
          fill="none"
          stroke="url(#grad1)"
          strokeWidth="0.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-primary)" />
            <stop offset="100%" stopColor="var(--color-secondary)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
