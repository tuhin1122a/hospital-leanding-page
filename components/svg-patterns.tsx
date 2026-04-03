'use client'

import { motion } from 'framer-motion'
import { useEffect, useId, useRef, useState } from 'react'

export function InteractiveSvgBg() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const id = useId()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden z-0"
    >
      <svg 
        className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" 
        viewBox="0 0 1000 1000" 
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id={`mouseCursor-${id}`}>
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0"/>
          </radialGradient>
          <filter id={`mouseGlow-${id}`}>
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id={`interactiveGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-primary)" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <pattern id={`interDots-${id}`} x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="15" cy="15" r="0.6" fill={`url(#interactiveGrad-${id})`} opacity="0.3"/>
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill={`url(#interDots-${id})`} />

        {/* Mouse position glow circle */}
        <circle 
          cx={mousePos.x} 
          cy={mousePos.y} 
          r="80" 
          fill={`url(#mouseCursor-${id})`}
          opacity="0.6"
          className="transition-all duration-75"
        />
        
        {/* Inner bright circle */}
        <circle 
          cx={mousePos.x} 
          cy={mousePos.y} 
          r="40" 
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="1.5"
          opacity="0.4"
          className="transition-all duration-75"
        />

        {/* Interactive floating orbs that follow mouse */}
        {[0, 1, 2].map((i) => {
          const angle = (mousePos.x / 1000) * Math.PI * 2 + (i * Math.PI * 2 / 3)
          const distance = 120 + (mousePos.y / 1000) * 50
          const x = 500 + Math.cos(angle) * distance
          const y = 500 + Math.sin(angle) * distance
          
          return (
            <g key={i}>
              <circle 
                cx={x} 
                cy={y}
                r="15"
                fill={`url(#interactiveGrad-${id})`}
                opacity="0.25"
                className="transition-all duration-200"
              />
              <circle 
                cx={x} 
                cy={y}
                r="8"
                fill="none"
                stroke={`url(#interactiveGrad-${id})`}
                strokeWidth="1.5"
                opacity="0.5"
                className="transition-all duration-200"
              />
            </g>
          )
        })}

        {/* Animated connecting lines */}
        {mousePos.x > 0 && mousePos.y > 0 && (
          <>
            <line 
              x1={mousePos.x}
              y1={mousePos.y}
              x2="500"
              y2="500"
              stroke="var(--color-primary)"
              strokeWidth="0.8"
              opacity={0.2 + (Math.abs(mousePos.x - 500) / 500) * 0.3}
              className="transition-opacity duration-300"
            />
          </>
        )}

        {/* Static medical elements that respond to mouse angle */}
        <g opacity={0.2 + Math.abs(Math.sin(mousePos.x / 200)) * 0.2}>
          <circle cx="150" cy="150" r="20" fill="none" stroke={`url(#interactiveGrad-${id})`} strokeWidth="1.5"/>
          <path d="M 150 135 L 150 165 M 135 150 L 165 150" stroke={`url(#interactiveGrad-${id})`} strokeWidth="1.5"/>
        </g>

        <g opacity={0.2 + Math.abs(Math.cos(mousePos.y / 200)) * 0.2}>
          <circle cx="850" cy="850" r="25" fill="none" stroke={`url(#interactiveGrad-${id})`} strokeWidth="1.5"/>
          <path d="M 850 825 L 850 875 M 825 850 L 875 850" stroke={`url(#interactiveGrad-${id})`} strokeWidth="1.5"/>
        </g>

        {/* Animated grid that responds to mouse */}
        <g fill="none" stroke={`url(#interactiveGrad-${id})`} strokeWidth="0.8" opacity={0.1 + (mousePos.x / 1000) * 0.15}>
          <rect x="200" y="200" width="400" height="400"/>
          <rect x="250" y="250" width="300" height="300"/>
          <rect x="300" y="300" width="200" height="200"/>
        </g>
      </svg>
    </div>
  )
}

export function HeroSvgBg() {
  const id = useId()
  return (
    <svg 
      className="absolute inset-0 w-full h-full opacity-20 pointer-events-none z-0" 
      viewBox="0 0 1000 1000" 
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`primaryGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-primary)" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <filter id={`heroGlow-${id}`}>
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <pattern id={`heroPattern-${id}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="0.8" fill={`url(#primaryGrad-${id})`} opacity="0.2"/>
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill={`url(#heroPattern-${id})`} />

      {/* Medical cross patterns */}
      <g opacity="0.6">
        <circle cx="100" cy="150" r="20" fill="none" stroke={`url(#primaryGrad-${id})`} strokeWidth="1.5"/>
        <path d="M 100 135 L 100 165 M 85 150 L 115 150" stroke={`url(#primaryGrad-${id})`} strokeWidth="1.5"/>
      </g>

      <g opacity="0.5">
        <circle cx="850" cy="800" r="25" fill="none" stroke={`url(#primaryGrad-${id})`} strokeWidth="1.5"/>
        <path d="M 850 775 L 850 825 M 825 800 L 875 800" stroke={`url(#primaryGrad-${id})`} strokeWidth="1.5"/>
      </g>

      {/* Pulse circles - representing heartbeat */}
      <g opacity="0.5" filter={`url(#heroGlow-${id})`}>
        <circle cx="200" cy="700" r="15" fill="none" stroke={`url(#primaryGrad-${id})`} strokeWidth="1.5"/>
        <circle cx="200" cy="700" r="25" fill="none" stroke={`url(#primaryGrad-${id})`} strokeWidth="1" opacity="0.6"/>
        <circle cx="200" cy="700" r="35" fill="none" stroke={`url(#primaryGrad-${id})`} strokeWidth="0.8" opacity="0.4"/>
      </g>

      {/* Hexagonal medical network */}
      <g opacity="0.4" stroke={`url(#primaryGrad-${id})`} strokeWidth="1.2" fill="none">
        <polygon points="700,100 750,140 720,190 670,190 640,140"/>
        <polygon points="750,200 800,240 770,290 720,290 690,240"/>
        <line x1="700" y1="100" x2="750" y2="200"/>
        <line x1="750" y2="140" x2="800" y2="240"/>
        <line x1="670" y1="190" x2="720" y2="290"/>
      </g>

      {/* Molecular structure patterns */}
      <g opacity="0.4">
        <circle cx="400" cy="300" r="5" fill={`url(#primaryGrad-${id})`}/>
        <circle cx="450" cy="280" r="5" fill={`url(#primaryGrad-${id})`}/>
        <circle cx="420" cy="350" r="5" fill={`url(#primaryGrad-${id})`}/>
        <line x1="400" y1="300" x2="450" y2="280" stroke={`url(#primaryGrad-${id})`} strokeWidth="1" opacity="0.6"/>
        <line x1="400" y1="300" x2="420" y2="350" stroke={`url(#primaryGrad-${id})`} strokeWidth="1" opacity="0.6"/>
      </g>

      {/* Flowing lines */}
      <path d="M 0,500 Q 250,400 500,500 T 1000,500" 
            fill="none" 
            stroke={`url(#primaryGrad-${id})`} 
            strokeWidth="2" 
            opacity="0.4"/>
    </svg>
  )
}

export function SectionSvgBg() {
  const id = useId()
  return (
    <svg 
      className="absolute inset-0 w-full h-full opacity-20 pointer-events-none z-0" 
      viewBox="0 0 1000 1000" 
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`sectionGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-primary)" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <pattern id={`honeycomb-${id}`} x="0" y="0" width="40" height="70" patternUnits="userSpaceOnUse">
          <path d="M 20,0 L 40,10 L 40,30 L 20,40 L 0,30 L 0,10 Z" fill="none" stroke={`url(#sectionGrad-${id})`} strokeWidth="0.8" opacity="0.4"/>
          <path d="M 20,40 L 40,50 L 40,70 L 20,80 L 0,70 L 0,50 Z" fill="none" stroke={`url(#sectionGrad-${id})`} strokeWidth="0.8" opacity="0.4"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#honeycomb-${id})`} />
      
      {/* Decorative large circles for depth */}
      <g stroke={`url(#sectionGrad-${id})`} strokeWidth="1" opacity="0.15">
        <circle cx="10%" cy="20%" r="50"/>
        <circle cx="90%" cy="80%" r="80"/>
      </g>
    </svg>
  )
}

export function WhyChooseUsSvgBg() {
  const id = useId()
  return (
    <svg 
      className="absolute inset-0 w-full h-full opacity-25 pointer-events-none z-0" 
      viewBox="0 0 1000 1000" 
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`trustGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-primary)" opacity="0.8" />
          <stop offset="100%" stopColor="#22d3ee" opacity="1" />
        </linearGradient>
        <pattern id={`shield-${id}`} x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M 50,20 L 80,30 L 80,60 Q 50,90 20,60 L 20,30 Z" fill="none" stroke={`url(#trustGrad-${id})`} strokeWidth="0.8" opacity="0.3"/>
          <circle cx="10" cy="10" r="1.5" fill={`url(#trustGrad-${id})`} opacity="0.2"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#shield-${id})`} />
    </svg>
  )
}

export function ServicesSvgBg() {
  const id = useId()
  return (
    <svg 
      className="absolute inset-0 w-full h-full opacity-25 pointer-events-none z-0" 
      viewBox="0 0 1000 1000" 
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`servicesGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-primary)" />
          <stop offset="100%" stopColor="#818cf8" />
        </linearGradient>
        <pattern id={`dna-${id}`} x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M 20,10 Q 40,40 20,70" fill="none" stroke={`url(#servicesGrad-${id})`} strokeWidth="0.8" opacity="0.3"/>
          <path d="M 40,10 Q 20,40 40,70" fill="none" stroke={`url(#servicesGrad-${id})`} strokeWidth="0.8" opacity="0.3"/>
          <circle cx="60" cy="40" r="2" fill={`url(#servicesGrad-${id})`} opacity="0.2"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#dna-${id})`} />
    </svg>
  )
}

export function HowItWorksSvgBg() {
  const id = useId()
  return (
    <svg 
      className="absolute inset-0 w-full h-full opacity-25 pointer-events-none z-0" 
      viewBox="0 0 1000 1000" 
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`howGrad-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--color-primary)" opacity="0.8"/>
          <stop offset="100%" stopColor="#f471b5" opacity="1"/>
        </linearGradient>
        <pattern id={`dots-${id}`} x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
          <circle cx="25" cy="25" r="1.5" fill={`url(#howGrad-${id})`} opacity="0.3"/>
          <line x1="0" y1="25" x2="50" y2="25" stroke={`url(#howGrad-${id})`} strokeWidth="0.5" opacity="0.1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#dots-${id})`} />
    </svg>
  )
}

export function FeaturesSvgBg() {
  const id = useId()
  return (
    <svg 
      className="absolute inset-0 w-full h-full opacity-25 pointer-events-none z-0" 
      viewBox="0 0 1000 1000" 
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`featuresGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-primary)" />
          <stop offset="50%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <pattern id={`circuit-${id}`} x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M 0,40 L 20,40 L 40,20 L 40,0" fill="none" stroke={`url(#featuresGrad-${id})`} strokeWidth="0.8" opacity="0.3" />
          <circle cx="40" cy="20" r="2" fill={`url(#featuresGrad-${id})`} opacity="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#circuit-${id})`} />
    </svg>
  )
}

export function DepartmentsSvgBg() {
  const id = useId()
  return (
    <svg 
      className="absolute inset-0 w-full h-full opacity-20 pointer-events-none z-0" 
      viewBox="0 0 1000 1000" 
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`deptGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-primary)" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <pattern id={`circles-${id}`} x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <circle cx="50" cy="50" r="40" fill="none" stroke={`url(#deptGrad-${id})`} strokeWidth="0.8" opacity="0.3"/>
          <line x1="0" y1="50" x2="100" y2="50" stroke={`url(#deptGrad-${id})`} strokeWidth="0.5" opacity="0.2"/>
          <line x1="50" y1="0" x2="50" y2="100" stroke={`url(#deptGrad-${id})`} strokeWidth="0.5" opacity="0.2"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#circles-${id})`} />
    </svg>
  )
}

export function StatsSvgBg() {
  const id = useId()
  return (
    <svg 
      className="absolute inset-0 w-full h-full opacity-30 pointer-events-none z-0" 
      viewBox="0 0 1000 1000" 
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`statsGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-primary)" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <pattern id={`statsPattern-${id}`} x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <rect x="10" y="60" width="10" height="30" fill={`url(#statsGrad-${id})`} opacity="0.2"/>
          <rect x="30" y="40" width="10" height="50" fill={`url(#statsGrad-${id})`} opacity="0.2"/>
          <rect x="50" y="20" width="10" height="70" fill={`url(#statsGrad-${id})`} opacity="0.25"/>
          <circle cx="80" cy="50" r="2" fill={`url(#statsGrad-${id})`} opacity="0.3"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#statsPattern-${id})`} />
    </svg>
  )
}

export function FooterSvgBg() {
  const id = useId()
  return (
    <svg 
      className="absolute inset-0 w-full h-full opacity-20 pointer-events-none z-0" 
      viewBox="0 0 1000 1000" 
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`footerGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-primary)" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <pattern id={`footerPattern-${id}`} x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="60" y2="60" stroke={`url(#footerGrad-${id})`} strokeWidth="0.5" opacity="0.2"/>
          <circle cx="30" cy="30" r="1.5" fill={`url(#footerGrad-${id})`} opacity="0.2"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#footerPattern-${id})`} />
    </svg>
  )
}

export function InteractiveSectionBg() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const id = useId()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden z-0"
    >
      <svg 
        className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" 
        viewBox="0 0 1000 1000" 
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={`sectionGlow-${id}`}>
            <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id={`sectionInteractiveGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-primary)" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <radialGradient id={`sectionCursor-${id}`}>
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* Mouse glow effect */}
        <circle 
          cx={mousePos.x} 
          cy={mousePos.y} 
          r="100" 
          fill={`url(#sectionCursor-${id})`}
          opacity="0.5"
          className="transition-all duration-100"
        />

        {/* Glassmorphic dense grid */}
        <defs>
          <pattern id={`interGrid-${id}`} x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <rect width="50" height="50" fill="none" stroke={`url(#sectionInteractiveGrad-${id})`} strokeWidth="0.5" opacity="0.1" />
            <circle cx="0" cy="0" r="1" fill={`url(#sectionInteractiveGrad-${id})`} opacity="0.2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#interGrid-${id})`} />

        {/* Honeycomb pattern with mouse response - more dense */}
        <g fill="none" stroke={`url(#sectionInteractiveGrad-${id})`} strokeWidth="1" opacity={0.3 + (mousePos.x / 1000) * 0.2}>
          {[...Array(5)].map((_, i) => (
            <g key={i} transform={`translate(${i * 150}, 0)`}>
              <polygon points="100,100 130,80 160,100 160,140 130,160 100,140" opacity="0.4"/>
              <polygon points="100,250 130,230 160,250 160,290 130,310 100,290" opacity="0.3"/>
              <polygon points="100,400 130,380 160,400 160,440 130,460 100,440" opacity="0.2"/>
            </g>
          ))}
        </g>

        {/* Floating elements near cursor */}
        <g opacity="0.4">
          <circle cx={mousePos.x + 50} cy={mousePos.y - 50} r="4" fill={`url(#sectionInteractiveGrad-${id})`} />
          <circle cx={mousePos.x - 70} cy={mousePos.y + 30} r="3" fill={`url(#sectionInteractiveGrad-${id})`} />
          <line x1={mousePos.x} y1={mousePos.y} x2={mousePos.x + 50} y2={mousePos.y - 50} stroke={`url(#sectionInteractiveGrad-${id})`} strokeWidth="0.5" opacity="0.3" />
        </g>
      </svg>
    </div>
  )
}
export function DnaInteractiveBg() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const id = useId()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePos({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        })
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const segments = Array.from({ length: 18 }, (_, i) => i)

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <svg 
        className="absolute inset-0 w-full h-full opacity-[0.08]" 
        viewBox="0 0 1000 1000" 
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={`dnaGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a4bde" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <filter id={`dnaBlur-${id}`}>
             <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        {/* LEFT DNA STRAND */}
        <g transform="translate(60, 50) scale(1.2)">
          {segments.map((i) => (
            <motion.g
              key={`left-${i}`}
              animate={{
                y: i * 45,
                x: mousePos.x * 30
              }}
              transition={{ type: 'spring', damping: 15, stiffness: 60 }}
            >
              <motion.line
                animate={{
                  x1: -Math.sin(i * 0.5 + Date.now() / 1500) * 40,
                  x2: Math.sin(i * 0.5 + Date.now() / 1500) * 40
                }}
                stroke={`url(#dnaGrad-${id})`}
                strokeWidth="1.5"
                opacity="0.2"
              />
              <motion.circle
                animate={{
                  cx: Math.sin(i * 0.5 + Date.now() / 1500) * 40
                }}
                r="4"
                fill={`url(#dnaGrad-${id})`}
              />
              <motion.circle
                animate={{
                  cx: -Math.sin(i * 0.5 + Date.now() / 1500) * 40
                }}
                r="4"
                fill={`url(#dnaGrad-${id})`}
              />
            </motion.g>
          ))}
        </g>

        {/* RIGHT DNA STRAND */}
        <g transform="translate(940, 50) scale(1.2)">
          {segments.map((i) => (
            <motion.g
              key={`right-${i}`}
              animate={{
                y: i * 45,
                x: (mousePos.x - 1) * 30
              }}
              transition={{ type: 'spring', damping: 15, stiffness: 60 }}
            >
              <motion.line
                animate={{
                  x1: -Math.sin(i * 0.5 + Date.now() / 1500 + Math.PI) * 40,
                  x2: Math.sin(i * 0.5 + Date.now() / 1500 + Math.PI) * 40
                }}
                stroke={`url(#dnaGrad-${id})`}
                strokeWidth="1.5"
                opacity="0.2"
              />
              <motion.circle
                animate={{
                  cx: Math.sin(i * 0.5 + Date.now() / 1500 + Math.PI) * 40
                }}
                r="4"
                fill={`url(#dnaGrad-${id})`}
              />
              <motion.circle
                animate={{
                  cx: -Math.sin(i * 0.5 + Date.now() / 1500 + Math.PI) * 40
                }}
                r="4"
                fill={`url(#dnaGrad-${id})`}
              />
            </motion.g>
          ))}
        </g>
      </svg>
    </div>
  )
}
