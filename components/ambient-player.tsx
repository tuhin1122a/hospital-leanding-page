'use client'

import { useAmbientSound } from '@/hooks/useSound'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function AmbientPlayer() {
  const { toggle } = useAmbientSound()
  const [isPlaying, setIsPlaying] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  const handleToggle = () => {
    toggle()
    setIsPlaying(prev => !prev)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className="bg-[#0a1b4d] text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap"
          >
            {isPlaying ? '🔇 Turn off ambient sound' : '🎵 Play ambient sound'}
            <div className="absolute bottom-[-5px] right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[#0a1b4d]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.button
        onClick={handleToggle}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className={`relative w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 border-2 ${
          isPlaying
            ? 'bg-gradient-to-br from-[#1a4bde] to-[#4c7cf4] border-[#1a4bde]/30 shadow-[#1a4bde]/30'
            : 'bg-white border-slate-200'
        }`}
        aria-label={isPlaying ? 'Stop ambient sound' : 'Play ambient sound'}
      >
        {/* Pulse rings when playing */}
        {isPlaying && (
          <>
            <motion.span
              className="absolute inset-0 rounded-full bg-[#1a4bde]/20"
              animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.span
              className="absolute inset-0 rounded-full bg-[#1a4bde]/15"
              animate={{ scale: [1, 2.1], opacity: [0.4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
            />
          </>
        )}

        {/* Icon */}
        {isPlaying ? (
          // Sound waves icon (playing)
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
            <path d="M18.5 12c0 2.76-1.64 5.14-4 6.24V17.3c1.93-.98 3.26-2.95 3.26-5.3s-1.33-4.32-3.26-5.3V5.66c2.36 1.1 4 3.48 4 6.34z" opacity="0.7"/>
          </svg>
        ) : (
          // Muted icon
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#1a4bde]" fill="currentColor">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
          </svg>
        )}
      </motion.button>
    </div>
  )
}
